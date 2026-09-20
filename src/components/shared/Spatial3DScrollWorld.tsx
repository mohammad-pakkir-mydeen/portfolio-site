import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";

interface Spatial3DScrollWorldProps {
  children: React.ReactNode;
}

/**
 * Spatial3DScrollWorld v2
 *
 * Rotates the ENTIRE portfolio composition — cards, text, buttons, avatar,
 * images, panels — as a single unified 3D world around the X-axis.
 *
 * Everything inside feels attached to the same physical 3D space.
 * CSS preserve-3d propagates from the world div down through every child,
 * so translateZ on cards / buttons / text creates real depth within the
 * rotating world.
 *
 * Scroll physics:
 *  - Velocity component: fast scroll → momentary forward/backward tilt
 *  - Position component: subtle constant tilt based on page progress
 *  - Inertia: exponential lerp → currentAngle approaches targetAngle smoothly
 */
export default function Spatial3DScrollWorld({ children }: Spatial3DScrollWorldProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    if (reducedMotion || !worldRef.current) return;

    const world = worldRef.current;

    // ── Config ─────────────────────────────────────────────────────────────
    const MAX_ANGLE  = isTouch ? 8    : 12;   // max degrees of X tilt
    const VEL_SCALE  = isTouch ? 0.14 : 0.20; // how strongly velocity drives tilt
    const POS_SCALE  = isTouch ? 2.5  : 4;    // max degrees from position component
    const LERP_SPEED = isTouch ? 0.06 : 0.075; // inertia (lower = more floaty)
    const VEL_DECAY  = 0.72;                  // velocity exponential decay per frame
    const VEL_SMOOTH = 0.18;                  // how fast smooth velocity tracks raw

    // ── State ──────────────────────────────────────────────────────────────
    let animId: number | null = null;
    let lastScrollY = window.scrollY;
    let rawVelocity = 0;
    let smoothVelocity = 0;
    let currentAngle = 0;
    let targetAngle = 0;

    const render = () => {
      const scrollY   = window.scrollY;
      const docH      = document.documentElement.scrollHeight;
      const vh        = window.innerHeight;
      const maxScroll = Math.max(1, docH - vh);

      // Instantaneous velocity
      const dy = scrollY - lastScrollY;
      lastScrollY = scrollY;

      // Two-level velocity smoothing for natural feel
      rawVelocity    = rawVelocity    * VEL_DECAY       + dy * (1 - VEL_DECAY);
      smoothVelocity = smoothVelocity * (1 - VEL_SMOOTH) + rawVelocity * VEL_SMOOTH;

      // Velocity-driven tilt: scrolling down tilts top of world away from viewer
      const velocityComponent = -smoothVelocity * VEL_SCALE;

      // Position-driven tilt: subtle lean based on page progress
      // Top of page → slight forward lean; bottom → slight backward lean
      const progress = scrollY / maxScroll;          // 0 → 1
      const positionComponent = (0.5 - progress) * POS_SCALE;

      // Combined target, clamped
      const raw = velocityComponent + positionComponent;
      targetAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw));

      // Exponential lerp for buttery inertia
      currentAngle += (targetAngle - currentAngle) * LERP_SPEED;

      // Only write to DOM if meaningful change (perf guard)
      if (Math.abs(currentAngle) > 0.008 || Math.abs(targetAngle) > 0.008) {
        world.style.transform = `rotateX(${currentAngle.toFixed(3)}deg)`;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      world.style.transform = "";
    };
  }, [reducedMotion, isTouch]);

  return (
    <div
      ref={outerRef}
      className="relative w-full"
      style={{
        // Perspective applied here — one unified vanishing point for all children
        perspective: isTouch ? "1000px" : "1400px",
        perspectiveOrigin: "50% 38%",
      }}
    >
      <div
        ref={worldRef}
        style={{
          // All children live inside this div — rotating it rotates EVERYTHING
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

