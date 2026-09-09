import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { profile } from "../../data/portfolio";
import HeroBackground from "./HeroBackground";
import HeroAvatarScene from "./HeroAvatarScene";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16"
    >
      <HeroBackground />

      <div className="section-container relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 lg:col-span-6"
        >
          <div className="mb-6 flex items-center gap-2 font-mono text-sm text-accent-indigo">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-indigo" />
            Available for Software Engineer / SDE roles
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
            {profile.name}
          </h1>
          <p className="mt-3 font-display text-xl text-accent-indigo sm:text-2xl">
            {profile.title}
          </p>

          <p className="body-lead mt-6 max-w-lg">{profile.statement}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button className="btn-primary" onClick={() => scrollTo("experience")}>
              View Experience
              <ArrowRight size={16} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("projects")}>
              View Projects
            </button>
            <button className="btn-secondary" onClick={() => scrollTo("contact")}>
              <Mail size={16} />
              Contact Me
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-ink-faint">
            <span>Backend</span>
            <span aria-hidden="true">·</span>
            <span>Cloud</span>
            <span aria-hidden="true">·</span>
            <span>Distributed Systems</span>
            <span aria-hidden="true">·</span>
            <span>Security</span>
            <span aria-hidden="true">·</span>
            <span>AI</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative z-0 lg:col-span-6"
        >
          <HeroAvatarScene />
        </motion.div>
      </div>
    </section>
  );
}
