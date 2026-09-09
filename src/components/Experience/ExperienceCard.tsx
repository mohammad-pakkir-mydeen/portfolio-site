import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "../../data/portfolio";
import { experienceSymbolMap, ExperienceSymbolKey } from "./ExperienceSymbols";
import CountUp from "../shared/CountUp";
import Reveal from "../shared/Reveal";

type Project = (typeof experience.projects)[number];

export default function ExperienceCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <Reveal delay={index * 0.1}>
      <div className="card-surface overflow-hidden">
        <button
          className="flex w-full items-start justify-between gap-4 p-6 text-left md:p-8"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <div>
            <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
              {project.summary}
            </p>
          </div>
          <span
            className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-panel-border text-ink transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={16} />
          </span>
        </button>

        <div className="flex flex-wrap gap-3 px-6 pb-6 md:px-8">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-panel-border bg-panel-raised/70 px-4 py-2.5"
            >
              <div className="font-display text-lg font-semibold text-accent-indigo">
                <CountUp value={m.value} />
              </div>
              <div className="text-[11px] uppercase tracking-wide text-ink-faint">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-panel-border px-6 py-6 md:px-8">
                <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                  {project.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-indigo" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {project.symbols.map((key) => {
                    const symbol = experienceSymbolMap[key as ExperienceSymbolKey];
                    const Icon = symbol.icon;
                    return (
                      <span
                        key={key}
                        className="group flex items-center gap-1.5 rounded-full border border-panel-border bg-panel/60 px-3 py-1.5 text-xs text-ink-muted transition-all duration-300 hover:border-accent-indigo/50 hover:text-ink"
                      >
                        <Icon
                          size={14}
                          className="text-accent-indigo transition-transform duration-300 group-hover:scale-110"
                        />
                        {symbol.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
