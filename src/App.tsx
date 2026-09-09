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

export type ThemeName = "red-white" | "paper" | "crimson" | "light";

const themeNames: ThemeName[] = ["red-white", "paper", "crimson", "light"];

function getInitialTheme(): ThemeName {
  const saved = window.localStorage.getItem("portfolio-theme") as ThemeName | null;
  return saved && themeNames.includes(saved) ? saved : "red-white";
}

export default function App() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <div className="relative min-h-screen bg-base" data-theme={theme}>
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
