import { Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import ThemeLights, { useThemeLighting } from "../shared/ThemeLights";
import { useGLTF } from "@react-three/drei";
import backflipModel from "../../assets/models/backflip.glb";
import AvatarModel from "../shared/AvatarModel";

type StackCategory = {
  id: string;
  label: string;
  items: readonly string[];
};

const categories: readonly StackCategory[] = [
  { id: "core", label: "Core", items: ["Java", "Python", "JavaScript", "C"] },
  {
    id: "backend",
    label: "Backend",
    items: ["Spring Boot", "Flask", "Node.js", "REST APIs"],
  },
  { id: "frontend", label: "Frontend", items: ["React", "HTML", "CSS"] },
  {
    id: "cloud",
    label: "Cloud & Infra",
    items: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "AWS Lambda",
      "CloudFormation",
      "CloudWatch",
      "IAM",
    ],
  },
  { id: "data", label: "Data", items: ["MySQL", "MongoDB", "DynamoDB"] },
  { id: "testing", label: "Testing", items: ["JUnit", "Mockito"] },
  {
    id: "cs",
    label: "Core CS",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "OS",
      "Computer Networks",
      "Distributed Systems",
    ],
  },
];

const nodePositions: readonly [number, number, number][] = [
  [-2.35, 1.1, 0.2],
  [-1.1, 1.8, 0],
  [0.45, 1.85, 0.1],
  [2.15, 1.1, 0],
  [2.25, -0.45, 0.1],
  [1.05, -1.45, 0],
  [-0.55, -1.7, 0.15],
  [-2.1, -1.05, 0],
];

useGLTF.preload(backflipModel);

function EngineeringCore({
  reduced,
  activeCategory,
}: {
  reduced: boolean;
  activeCategory: string;
}) {
  const group = useRef<THREE.Group>(null);
  const lighting = useThemeLighting();

  useFrame((state, delta) => {
    if (!group.current) return;
    const targetY = reduced ? 0 : state.pointer.x * 0.12;
    const targetX = reduced ? 0 : -state.pointer.y * 0.06;
    const categoryLift = activeCategory === "core" ? 0 : 0.025;
    group.current.position.y +=
      (categoryLift - group.current.position.y) * Math.min(delta * 2.5, 1);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3, 1);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3, 1);
  });

  return (
    <group ref={group}>
      <AvatarModel
        url={backflipModel}
        targetHeight={2.35}
        animationIndex={0}
        idleBob={false}
        mouseInfluence={0.06}
      />
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0.05, -0.2]}>
        <boxGeometry args={[2.4, 2.4, 2.4]} />
        <meshBasicMaterial color={lighting.rim} wireframe transparent opacity={0.18} />
      </mesh>
      <Html center position={[0, -1.35, 0]} distanceFactor={6}>
        <div className="pointer-events-none whitespace-nowrap rounded-md border border-accent-cyan/40 bg-base/90 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-accent-cyan">
          ENGINEERING CORE
        </div>
      </Html>
    </group>
  );
}

function StackNodes({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  const lighting = useThemeLighting();
  const lines = useMemo(
    () =>
      nodePositions.flatMap((position, index) => {
        const [x, y, z] = position;
        return [
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(x, y, z),
        ];
      }),
    []
  );

  return (
    <>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(lines.flatMap((point) => point.toArray())), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={lighting.rim} transparent opacity={0.3} />
      </lineSegments>
      {categories.map((category, index) => {
        const [x, y, z] = nodePositions[index];
        const selected = activeCategory === category.id;
        return (
          <group key={category.id} position={[x, y, z]}>
            <mesh
              onClick={(event) => {
                event.stopPropagation();
                onSelect(category.id);
              }}
              onPointerOver={(event) => {
                event.stopPropagation();
                onSelect(category.id);
              }}
            >
              <sphereGeometry args={[selected ? 0.14 : 0.1, 16, 16]} />
              <meshStandardMaterial
                color={selected ? lighting.fill : lighting.rim}
                emissive={selected ? lighting.fill : lighting.rim}
                emissiveIntensity={selected ? 1.5 : 0.65}
              />
            </mesh>
            <Html center distanceFactor={6}>
              <button
                type="button"
                onClick={() => onSelect(category.id)}
                className={`whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] transition-colors ${
                  selected
                    ? "border-accent-cyan/70 bg-accent-cyan/15 text-ink"
                    : "border-panel-border bg-base/85 text-ink-muted hover:border-accent-indigo/70 hover:text-ink"
                }`}
              >
                {category.label}
              </button>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default function EngineeringStackScene({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (id: string) => void;
}) {
  const isTouch = useIsTouchDevice();
  const reduced = useReducedMotion();

  return (
    <div className="relative h-[430px] w-full overflow-hidden rounded-2xl border border-panel-border bg-base md:h-[520px]">
      <Canvas
        dpr={[1, isTouch ? 1.25 : 1.75]}
        gl={{ antialias: !isTouch, alpha: true, powerPreference: "high-performance" }}
        onPointerMissed={() => onSelect("core")}
      >
        <PerspectiveCamera makeDefault fov={38} position={[0, 0, 7.4]} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={isTouch ? 0.45 : 0.7}
          minPolarAngle={Math.PI / 2.7}
          maxPolarAngle={Math.PI / 1.7}
        />
        <ThemeLights />
        <EngineeringCore reduced={reduced} activeCategory={activeCategory} />
        <StackNodes activeCategory={activeCategory} onSelect={onSelect} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-cyan">
            Interactive system map
          </p>
          <p className="mt-1 max-w-[220px] text-xs text-ink-faint">
            Drag to inspect the stack. Select a layer to trace its connections.
          </p>
        </div>
        <span className="rounded-full border border-panel-border bg-base/70 px-2 py-1 font-mono text-[10px] text-ink-faint">
          {isTouch ? "TOUCH ENABLED" : "ORBIT ENABLED"}
        </span>
      </div>
    </div>
  );
}

export { categories };
