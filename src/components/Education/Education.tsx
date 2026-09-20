import { GraduationCap, Building2, CalendarRange } from "lucide-react";
import { education } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <SectionHeading eyebrow="05 · Education" title="Academic foundation." />

        <Reveal delay={0.1} className="mt-12">
          <div className="card-surface relative p-8 md:p-10">
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-accent-violet/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-panel-border bg-panel-raised text-accent-indigo">
                  <GraduationCap size={22} strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">
                    {education.degree}
                  </h3>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-muted">
                    <Building2 size={14} />
                    {education.institution}
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-ink-faint">
                    <CalendarRange size={13} />
                    {education.period}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-panel-border bg-panel-raised/60 px-6 py-4 md:flex-col md:items-end md:text-right">
                <span className="font-display text-3xl font-semibold text-accent-indigo md:text-4xl">
                  {education.score}
                </span>
                <span className="text-xs text-ink-faint">Academic score</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
