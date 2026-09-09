import { Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ThemeName } from "../../App";

export type ThemeLighting = {
  ambient: number;
  key: string;
  keyIntensity: number;
  rim: string;
  rimIntensity: number;
  fill: string;
  fillIntensity: number;
  environment: "city" | "apartment" | "studio" | "warehouse";
  environmentIntensity: number;
};

const lightingByTheme: Record<ThemeName, ThemeLighting> = {
  "red-white": {
    ambient: 0.55,
    key: "#fffaf7",
    keyIntensity: 1.55,
    rim: "#b4232f",
    rimIntensity: 9,
    fill: "#f3e8df",
    fillIntensity: 5,
    environment: "city",
    environmentIntensity: 0.42,
  },
  paper: {
    ambient: 0.62,
    key: "#fff8e9",
    keyIntensity: 1.35,
    rim: "#a44e3d",
    rimIntensity: 6,
    fill: "#e8d3b9",
    fillIntensity: 4,
    environment: "apartment",
    environmentIntensity: 0.32,
  },
  crimson: {
    ambient: 0.5,
    key: "#fff6f2",
    keyIntensity: 1.45,
    rim: "#8f1828",
    rimIntensity: 10,
    fill: "#e5c4c1",
    fillIntensity: 4,
    environment: "studio",
    environmentIntensity: 0.36,
  },
  light: {
    ambient: 0.7,
    key: "#ffffff",
    keyIntensity: 1.1,
    rim: "#c2323d",
    rimIntensity: 4,
    fill: "#e9e9e9",
    fillIntensity: 3,
    environment: "warehouse",
    environmentIntensity: 0.24,
  },
};

export function useThemeLighting() {
  const [theme, setTheme] = useState<ThemeName>("red-white");

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-theme]");
    if (!root) return;

    const update = () => {
      const next = root.dataset.theme as ThemeName;
      if (next in lightingByTheme) setTheme(next);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return lightingByTheme[theme];
}

export default function ThemeLights() {
  const lighting = useThemeLighting();
  const ambient = useRef<THREE.AmbientLight>(null);
  const key = useRef<THREE.DirectionalLight>(null);
  const rim = useRef<THREE.PointLight>(null);
  const fill = useRef<THREE.PointLight>(null);
  const targetKey = new THREE.Color(lighting.key);
  const targetRim = new THREE.Color(lighting.rim);
  const targetFill = new THREE.Color(lighting.fill);

  useFrame((_, delta) => {
    const easing = 1 - Math.exp(-4 * delta);
    if (ambient.current) ambient.current.intensity = THREE.MathUtils.lerp(ambient.current.intensity, lighting.ambient, easing);
    if (key.current) {
      key.current.intensity = THREE.MathUtils.lerp(key.current.intensity, lighting.keyIntensity, easing);
      key.current.color.lerp(targetKey, easing);
    }
    if (rim.current) {
      rim.current.intensity = THREE.MathUtils.lerp(rim.current.intensity, lighting.rimIntensity, easing);
      rim.current.color.lerp(targetRim, easing);
    }
    if (fill.current) {
      fill.current.intensity = THREE.MathUtils.lerp(fill.current.intensity, lighting.fillIntensity, easing);
      fill.current.color.lerp(targetFill, easing);
    }
  });

  return (
    <>
      <ambientLight ref={ambient} intensity={lighting.ambient} />
      <directionalLight
        ref={key}
        position={[3, 5, 4]}
        intensity={lighting.keyIntensity}
        color={lighting.key}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight ref={rim} position={[-3, 2, -2]} intensity={lighting.rimIntensity} color={lighting.rim} />
      <pointLight ref={fill} position={[3, 1.2, -3]} intensity={lighting.fillIntensity} color={lighting.fill} />
      <Environment preset={lighting.environment} environmentIntensity={lighting.environmentIntensity} />
    </>
  );
}

export { lightingByTheme };