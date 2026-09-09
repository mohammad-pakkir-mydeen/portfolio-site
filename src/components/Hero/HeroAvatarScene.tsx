import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import introModel from "../../assets/models/intro.glb";
import AvatarModel from "../shared/AvatarModel";
import SceneLoader from "../shared/SceneLoader";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useGLTF } from "@react-three/drei";
import ThemeLights from "../shared/ThemeLights";

// Hero avatar is above the fold — warm the cache as soon as this module loads.
useGLTF.preload(introModel);

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault fov={32} position={[0, 1.35, 6.4]} />
      <OrbitControls
        target={[0, 1.05, 0]}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.8}
        rotateSpeed={0.65}
      />
      <ThemeLights />

      <Suspense fallback={<SceneLoader />}>
        <AvatarModel url={introModel} targetHeight={2.55} />
      </Suspense>

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

  return (
    <div
      className="relative h-[420px] sm:h-[500px] md:h-[600px] lg:h-[660px] w-full"
      aria-hidden="true"
    >
      <Canvas
        shadows
        dpr={[1, isTouch ? 1.5 : 2]}
        gl={{ antialias: true, alpha: true }}
        className="!absolute inset-0"
      >
        <Scene />
      </Canvas>
      <span className="sr-only">3D avatar of Mohammad Pakkir Mydeen</span>
    </div>
  );
}
