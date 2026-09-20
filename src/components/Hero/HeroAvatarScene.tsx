import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera } from "@react-three/drei";
import introModel from "../../assets/models/intro.glb";
import AvatarModel from "../shared/AvatarModel";
import SceneLoader from "../shared/SceneLoader";
import Scroll3DRig from "../shared/Scroll3DRig";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useGLTF } from "@react-three/drei";
import ThemeLights from "../shared/ThemeLights";

// Hero avatar is above the fold — warm the cache as soon as this module loads.
useGLTF.preload(introModel);

function Scene({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <>
      <PerspectiveCamera makeDefault fov={30} position={[0, 1.35, 6.2]} />
      <ThemeLights />

      <Scroll3DRig
        containerRef={containerRef}
        isHero={true}
        rotationRange={[-0.3, 0.75]}
        inertiaSpeed={4.4}
        depthIntensity={0.25}
        pitchIntensity={0.15}
        mouseInfluence={0.12}
      >
        <Suspense fallback={<SceneLoader />}>
          <AvatarModel url={introModel} targetHeight={2.55} />
        </Suspense>
      </Scroll3DRig>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.55}
        scale={6}
        blur={2.6}
        far={3}
        color="#000000"
      />
    </>
  );
}

export default function HeroAvatarScene() {
  const isTouch = useIsTouchDevice();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] sm:h-[580px] md:h-[680px] lg:h-[780px] w-full"
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={[1, isTouch ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <Scene containerRef={containerRef} />
      </Canvas>
      <span className="sr-only">3D avatar of Mohammad Pakkir Mydeen</span>
    </div>
  );
}
