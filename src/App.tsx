import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import Education from "./components/Education/Education";
import Achievements from "./components/Achievements/Achievements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import EnvelopeIntro, { shouldShowIntro } from "./components/shared/EnvelopeIntro";
// Preload all 3D models at module level so they warm the cache during the intro
import { useGLTF } from "@react-three/drei";
import introModel from "./assets/models/intro.glb";
import backflipModel from "./assets/models/backflip.glb";
import epModel from "./assets/models/ep.glb";
useGLTF.preload(introModel);
useGLTF.preload(backflipModel);
useGLTF.preload(epModel);

export type ThemeName = "red-white" | "paper" | "crimson" | "light";

const themeNames: ThemeName[] = ["red-white", "paper", "crimson", "light"];

function getInitialTheme(): ThemeName {
  const saved = window.localStorage.getItem("portfolio-theme") as ThemeName | null;
  return saved && themeNames.includes(saved) ? saved : "red-white";
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [showIntro, setShowIntro] = useState(shouldShowIntro);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-base" data-theme={theme}>
      {/* Envelope intro — plays once per session, unmounts when done */}
      {showIntro && (
        <EnvelopeIntro onDone={() => setShowIntro(false)} />
      )}

      {/* Subtle cursor-following ambient spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgb(var(--accent) / 0.045), transparent 80%)`,
        }}
        aria-hidden="true"
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-base"
      >
        Skip to content
      </a>

      <Navbar theme={theme} onThemeChange={setTheme} />

      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
