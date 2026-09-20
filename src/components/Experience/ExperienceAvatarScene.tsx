import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import epModel from "../../assets/models/ep.glb";
import AvatarModel from "../shared/AvatarModel";
import SceneLoader from "../shared/SceneLoader";
import Scroll3DRig from "../shared/Scroll3DRig";
import { useInView } from "../../hooks/useInView";
import ThemeLights, { useThemeLighting } from "../shared/ThemeLights";

export default function ExperienceAvatarScene({ activeSystem }: { activeSystem: string | null }) {
  const { ref: visRef, inView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const lighting = useThemeLighting();

  return (
    <div
      ref={visRef}
      className="relative h-[380px] w-full sm:h-[460px] lg:h-[560px]"
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
          <ThemeLights />
          <pointLight
            position={[-2.5, 2.2, -1.5]}
            color={lighting.rim}
            intensity={activeSystem ? 1.8 : 0.5}
          />

          <Scroll3DRig
            containerRef={visRef}
            rotationRange={[-0.45, 0.65]}
            inertiaSpeed={4.5}
            depthIntensity={0.24}
            pitchIntensity={0.12}
            mouseInfluence={0.1}
            shiftX={activeSystem ? (activeSystem === "csm-portal" ? -0.08 : 0.08) : 0}
          >
            <Suspense fallback={<SceneLoader />}>
              <AvatarModel url={epModel} targetHeight={2.55} idleBob={false} playAnimation />
            </Suspense>
          </Scroll3DRig>

          <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={6} blur={2.4} far={3} />
        </Canvas>
      )}
      <span className="sr-only">
        3D avatar representing focus and determination while tackling engineering challenges
      </span>
    </div>
  );
}
