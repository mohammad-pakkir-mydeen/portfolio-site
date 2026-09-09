import { useEffect, useMemo, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

interface AvatarModelProps {
  url: string;
  targetHeight?: number;
  playAnimation?: boolean;
  animationIndex?: number;
  idleBob?: boolean;
  mouse?: { x: number; y: number };
  mouseInfluence?: number;
}

/**
 * Loads a GLB, centers it on its own footprint, and scales it to a
 * consistent target height so intro.glb and ep.glb read at the same
 * visual scale despite being separate exports.
 */
export default function AvatarModel({
  url,
  targetHeight = 2.4,
  playAnimation = true,
  animationIndex = 0,
  idleBob = true,
  mouse,
  mouseInfluence = 0.12,
}: AvatarModelProps) {
  const group = useRef<THREE.Group>(null);
  const pointer = useThree((state) => state.pointer);
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, group);

  // Clone skinned meshes with their bones so animation clips affect the visible model.
  const cloned = useMemo(() => clone(scene), [scene]);

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const height = size.y || 1;
    const s = targetHeight / height;
    return {
      scale: s,
      offset: new THREE.Vector3(-center.x, -box.min.y, -center.z),
    };
  }, [cloned, targetHeight]);

  useEffect(() => {
    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (material && "envMapIntensity" in material) {
          material.envMapIntensity = 1.1;
        }
      }
    });
  }, [cloned]);

  useEffect(() => {
    if (!playAnimation || names.length === 0) return;
    const name = names[Math.min(animationIndex, names.length - 1)];
    const action = actions[name];
    action?.reset().fadeIn(0.4).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names, playAnimation, animationIndex]);

  const hasClipMotion = names.length > 0;
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current += delta;
    if (!group.current) return;

    // Gentle idle motion when the GLB has no baked animation clip.
    if (idleBob && !hasClipMotion) {
      group.current.position.y = Math.sin(t.current * 1.1) * 0.045;
    }

    // Subtle mouse-reactive tilt (desktop only — caller passes {0,0} on touch).
    const baseRotY = idleBob && !hasClipMotion ? Math.sin(t.current * 0.35) * 0.08 : 0;
    const pointerX = mouse?.x ?? pointer.x;
    const pointerY = mouse?.y ?? pointer.y;
    const targetRotY = baseRotY + pointerX * mouseInfluence;
    const targetRotX = -pointerY * (mouseInfluence * 0.5);
    group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.06;
    group.current.rotation.x += (targetRotX - group.current.rotation.x) * 0.06;
  });

  return (
    <group ref={group}>
      <group scale={scale}>
        <primitive object={cloned} position={[offset.x, offset.y, offset.z]} />
      </group>
    </group>
  );
}
