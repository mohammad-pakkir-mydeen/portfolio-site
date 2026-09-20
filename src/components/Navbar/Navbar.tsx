import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Palette, X } from "lucide-react";
import { nav } from "../../data/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { ThemeName } from "../../App";

const ids = nav.map((n) => n.id);

const themes: { id: ThemeName; label: string; swatch: string }[] = [
  { id: "red-white", label: "Red & White", swatch: "#b4232f" },
  { id: "paper", label: "Paper", swatch: "#a4513f" },
  { id: "crimson", label: "Crimson", swatch: "#8f1828" },
  { id: "light", label: "Light", swatch: "#c43a43" },
];

export default function Navbar({
  theme,
  onThemeChange,
}: {
  theme: ThemeName;
  onThemeChange: (theme: ThemeName) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`section-container transition-all duration-300 ${
          scrolled ? "pt-3" : "pt-6"
        }`}
      >
        <nav
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300 ${
            scrolled
              ? "border border-panel-border bg-canvas/70 shadow-card backdrop-blur-md"
              : "border border-transparent bg-transparent"
          }`}
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
            className="font-display text-sm font-semibold tracking-tight text-ink"
          >
            MPM<span className="text-accent-indigo">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    active === item.id
                      ? "text-ink"
                      : "text-ink-muted hover:text-ink"
                  }`}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-panel-raised"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                className="theme-switch flex items-center gap-2 border border-accent-indigo px-2 py-1.5 text-xs text-ink transition-colors hover:bg-accent-indigo hover:text-canvas"
                onClick={() => setThemeOpen((v) => !v)}
                aria-label="Change visual environment"
                aria-expanded={themeOpen}
              >
                <Palette size={14} />
                <span className="hidden font-mono uppercase tracking-[0.16em] sm:inline">
                  THEME {themes.find((item) => item.id === theme)?.label}
                </span>
              </button>
              {themeOpen && (
                <div className="theme-panel absolute right-0 top-12 z-50 w-56 border border-panel-border p-2 shadow-card">
                  <div className="mb-2 flex items-center justify-between px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    <span>Choose theme</span>
                    <span>{themes.findIndex((item) => item.id === theme) + 1}/4</span>
                  </div>
                  <div className="relative flex flex-col gap-1">
                    {themes.map((item) => {
                      const selected = item.id === theme;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onThemeChange(item.id);
                            setThemeOpen(false);
                          }}
                          className="relative flex items-center gap-3 overflow-hidden rounded-md px-3 py-2 text-left text-xs text-ink-muted transition-colors hover:text-ink"
                        >
                          {selected && (
                            <motion.span
                              layoutId="theme-selection"
                              className="absolute inset-0 border border-accent-indigo/50 bg-accent-indigo/10"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <span
                            className="relative z-10 h-2.5 w-2.5 rounded-full border border-white/40"
                            style={{ backgroundColor: item.swatch }}
                          />
                          <span className="relative z-10 font-mono uppercase tracking-[0.12em]">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <button
              className="rounded-full border border-panel-border p-2 text-ink md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="section-container mt-2 md:hidden"
          >
            <div className="flex flex-col gap-1 rounded-2xl border border-panel-border bg-canvas/95 p-3 shadow-card backdrop-blur-md">
              {nav.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                                    className={`rounded-xl px-4 py-3 text-left text-sm ${
                    active === item.id ? "bg-panel-raised text-ink" : "text-ink-muted"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
