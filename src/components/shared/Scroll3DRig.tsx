import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";

interface Scroll3DRigProps {
  containerRef: React.RefObject<HTMLElement | HTMLDivElement>;
  children: React.ReactNode;
  /** Range of Y-axis rotation in radians [startRad, endRad] */
  rotationRange?: [number, number];
  /** Rotational inertia response speed (higher = faster, lower = more glide) */
  inertiaSpeed?: number;
  /** Maximum Z-axis depth displacement */
  depthIntensity?: number;
  /** Dynamic pitch tilt based on scroll velocity */
  pitchIntensity?: number;
  /** Cursor parallax influence */
  mouseInfluence?: number;
  /** Horizontal shift offset (e.g. for active state transitions) */
  shiftX?: number;
  /** Whether the container starts at top of document (e.g. Hero) */
  isHero?: boolean;
}

/**
 * High-performance 3D Scroll Rig.
 * Smoothly rotates a 3D scene around its vertical Y-axis as the user scrolls,
 * with physical inertia, subtle depth translation, and dynamic perspective.
 *
 * Runs entirely inside the Three.js useFrame render loop with zero React re-renders.
 */
export default function Scroll3DRig({
  containerRef,
  children,
  rotationRange = [-0.35, 0.75], // -20deg to +43deg
  inertiaSpeed = 4.6,
  depthIntensity = 0.28,
  pitchIntensity = 0.12,
  mouseInfluence = 0.1,
  shiftX = 0,
  isHero = false,
}: Scroll3DRigProps) {
  const group = useRef<THREE.Group>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const pointer = useThree((state) => state.pointer);

  // Physics targets and smoothed current values (mutable refs = 0 re-renders)
  const targetRotY = useRef(rotationRange[0]);
  const currentRotY = useRef(rotationRange[0]);
  const targetRotX = useRef(0);
  const currentRotX = useRef(0);
  const targetPosZ = useRef(0);
  const currentPosZ = useRef(0);
  const targetPosY = useRef(0);
  const currentPosY = useRef(0);
  const targetPosX = useRef(shiftX);
  const currentPosX = useRef(shiftX);
  const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    if (reducedMotion) return;

    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // Calculate scroll velocity for dynamic pitch and inertia
      const dy = scrollY - lastScrollY.current;
      scrollVelocity.current = dy;
      lastScrollY.current = scrollY;

      let progress = 0;

      if (isHero) {
        // Hero: progress is 0 at top of page, reaching 1 when hero scrolls past
        const heroHeight = containerRef.current?.offsetHeight || vh;
        progress = THREE.MathUtils.clamp(scrollY / heroHeight, 0, 1);
      } else if (containerRef.current) {
        // Section: progress is 0 when entering bottom of viewport, 1 when exiting top
        const rect = containerRef.current.getBoundingClientRect();
        const totalTravel = vh + rect.height;
        const currentTravel = vh - rect.top;
        progress = THREE.MathUtils.clamp(currentTravel / totalTravel, 0, 1);
      }

      // Map progress to target Y rotation (continuous progressive rotation)
      const [startAngle, endAngle] = rotationRange;
      targetRotY.current = startAngle + progress * (endAngle - startAngle);

      // Depth translation: subtle arc in Z as it rotates (pushes back slightly at mid-turn)
      targetPosZ.current = -Math.sin(progress * Math.PI) * depthIntensity;

      // Subtle vertical breathing arc
      targetPosY.current = (progress - 0.5) * 0.1;

      // Pitch tilt: subtle forward tilt during active downward scroll, backward on upward
      const pitch = THREE.MathUtils.clamp(-dy * 0.003 * pitchIntensity, -0.06, 0.06);
      targetRotX.current = pitch;
    };

    updateScrollProgress();

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, [containerRef, rotationRange, isHero, depthIntensity, pitchIntensity, reducedMotion]);

  // Update target shiftX when prop changes
  useEffect(() => {
    targetPosX.current = shiftX;
  }, [shiftX]);

  useFrame((_, delta) => {
    if (!group.current) return;

    if (reducedMotion) {
      group.current.rotation.y = rotationRange[0];
      return;
    }

    // Critically damped spring interpolation for natural inertia and mass
    const dt = Math.min(delta, 0.08);
    const easeFactor = 1 - Math.exp(-inertiaSpeed * dt);

    currentRotY.current += (targetRotY.current - currentRotY.current) * (isTouch ? easeFactor * 0.7 : easeFactor);
    currentRotX.current += (targetRotX.current - currentRotX.current) * (isTouch ? easeFactor * 0.8 : easeFactor);
    currentPosZ.current += (targetPosZ.current - currentPosZ.current) * easeFactor;
    currentPosY.current += (targetPosY.current - currentPosY.current) * easeFactor;
    currentPosX.current += (targetPosX.current - currentPosX.current) * easeFactor;

    // Decay scroll pitch smoothly back to zero when scrolling stops
    targetRotX.current *= 0.92;

    // Layer subtle cursor parallax on top (desktop only)
    const mouseX = isTouch ? 0 : pointer.x * mouseInfluence;
    const mouseY = isTouch ? 0 : pointer.y * (mouseInfluence * 0.5);

    // Apply synchronized rotations and positions directly to Three.js group
    group.current.rotation.y = currentRotY.current + mouseX;
    group.current.rotation.x = currentRotX.current - mouseY;
    group.current.position.z = currentPosZ.current;
    group.current.position.y = currentPosY.current;
    group.current.position.x = currentPosX.current + (isTouch ? 0 : pointer.x * 0.04);
  });

  return <group ref={group}>{children}</group>;
}

