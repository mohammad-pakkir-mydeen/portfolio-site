import { achievements } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import CountUp from "../shared/CountUp";
import AlgorithmPath from "./AlgorithmPath";
import GraphMotif from "./GraphMotif";
import AmazonSmileMark from "../Experience/AmazonSmileMark";
import { ShieldCheck, Award } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

export default function Achievements() {
  const { regulatory, dsa } = achievements;

  return (
    <section
      id="achievements"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="06 · Achievements & Impact"
          title="From high-stakes production compliance at Amazon scale to algorithmic rigor."
        />

        <div className="mt-14 space-y-8">
          {/* Flagship Achievement: $11 Million Regulatory Risk Mitigation at Amazon */}
          <Reveal delay={0.1}>
            <div className="card-surface relative p-8 md:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 right-8 hidden w-64 opacity-[0.06] lg:block">
                <AmazonSmileMark variant="smile" smileColor="currentColor" />
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600">
                      <ShieldCheck size={16} />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-indigo">
                      {regulatory.badge}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                    <Award size={13} /> {regulatory.tagline}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <div className="font-display text-6xl font-bold tracking-tight text-ink sm:text-7xl md:text-8xl">
                      {regulatory.metric}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted sm:text-sm">
                      {regulatory.metricLabel}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl md:text-3xl">
                    {regulatory.title}
                  </h3>
                </div>

                {/* Exact narrative requested by the user */}
                <div className="rounded-xl border border-panel-border bg-panel-raised/80 p-5 sm:p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-indigo">
                    Contribution &amp; Impact Statement
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                    "{regulatory.narrative}"
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {regulatory.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-panel-border bg-panel px-3 py-1 font-mono text-xs text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* DSA Problem Solving Achievement */}
          <Reveal delay={0.2}>
            <div className="card-surface relative grid grid-cols-1 items-center gap-10 p-8 md:grid-cols-2 md:p-12">
              <div className="pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 rounded-full bg-accent-indigo/10 blur-3xl" />

              <div className="relative flex flex-col items-start gap-3">
                <GraphMotif />
                <div className="font-display text-6xl font-bold tracking-tight text-ink sm:text-7xl md:text-8xl">
                  <CountUp value={dsa.count} duration={1400} />
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-base">
                  {dsa.label}
                </p>
                <div className="flex items-center gap-2 font-mono text-xs text-accent-indigo">
                  <SiLeetcode size={14} />
                  <span>{dsa.platforms}</span>
                </div>
              </div>

              <div className="relative flex justify-center md:justify-end">
                <AlgorithmPath />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
