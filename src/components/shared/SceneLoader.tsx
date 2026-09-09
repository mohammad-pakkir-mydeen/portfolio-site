import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeLighting } from "./ThemeLights";

export default function SceneLoader() {
  const ring = useRef<THREE.Mesh>(null);
  const lighting = useThemeLighting();

  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.z += delta * 1.4;
  });

  return (
    <mesh ref={ring} position={[0, 1.2, 0]}>
      <torusGeometry args={[0.4, 0.03, 16, 48, Math.PI * 1.4]} />
      <meshBasicMaterial color={lighting.rim} transparent opacity={0.7} />
    </mesh>
  );
}
