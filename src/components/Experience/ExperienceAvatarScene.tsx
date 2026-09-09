import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import epModel from "../../assets/models/ep.glb";
import AvatarModel from "../shared/AvatarModel";
import SceneLoader from "../shared/SceneLoader";
import { useInView } from "../../hooks/useInView";
import ThemeLights from "../shared/ThemeLights";

function ProgressRig({
  containerRef,
  children,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 when section top hits bottom of viewport, 1 when it exits the top
    const progress = THREE.MathUtils.clamp(
      1 - (rect.top + rect.height * 0.5) / (vh * 0.9),
      0,
      1
    );
    const targetY = THREE.MathUtils.degToRad(-14) + progress * THREE.MathUtils.degToRad(14);
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.06;
  });

  return <group ref={group}>{children}</group>;
}

export default function ExperienceAvatarScene() {
  const { ref: visRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={visRef}
      className="relative h-[380px] sm:h-[460px] lg:h-[560px] w-full"
      aria-hidden="true"
    >
      {inView && (
        <Canvas
          shadows
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          className="!absolute inset-0"
        >
          <PerspectiveCamera makeDefault fov={30} position={[0, 1.3, 6.2]} />
          <OrbitControls
            target={[0, 1.05, 0]}
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 2.4}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.65}
          />
          <ThemeLights />

          <ProgressRig containerRef={visRef}>
            <Suspense fallback={<SceneLoader />}>
              <AvatarModel url={epModel} targetHeight={2.55} idleBob={false} playAnimation />
            </Suspense>
          </ProgressRig>

          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={6} blur={2.4} far={3} />
        </Canvas>
      )}
      <span className="sr-only">
        3D avatar representing focus and determination while tackling engineering challenges
      </span>
    </div>
  );
}
