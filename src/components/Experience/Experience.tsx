import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import { experience } from "../../data/portfolio";
import CountUp from "../shared/CountUp";
import { useInView } from "../../hooks/useInView";
import ExperienceCard from "./ExperienceCard";
import ExperienceAvatarScene from "./ExperienceAvatarScene";
import AmazonSmileMark from "./AmazonSmileMark";

export default function Experience() {
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.12, once: true });
  const [activeSystem, setActiveSystem] = useState<string | null>(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-visible py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <p className="eyebrow">02 / Experience</p>
        <div className="mt-5 max-w-3xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink md:text-6xl">
            Engineering at scale.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
            A production engineering story across authorization, security, compliance, and distributed backend systems.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <div className="relative rounded-2xl border border-panel-border bg-panel p-6 shadow-card transition-all duration-300 hover:border-accent-indigo/40 sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-amber-500/10 blur-3xl" />
              
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="w-52 sm:w-60 text-ink">
                  <AmazonSmileMark variant="logo" className="w-full h-auto drop-shadow-sm" smileColor="#FF9900" />
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-amber-500/35 bg-amber-500/10 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-amber-600 sm:self-auto">
                  Amazon Retail
                </span>
              </div>

              <div className="mt-7 border-t border-panel-border/70 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent-indigo">
                  {experience.company}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink sm:text-3xl">
                  {experience.role}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  B2C engineering experience supporting Amazon Retail production systems.
                </p>
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.16em] text-ink-faint">
                  <span className="flex items-center gap-2">
                    <Calendar size={13} className="text-accent-indigo" /> {experience.period}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={13} className="text-accent-indigo" /> {experience.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-indigo">
              <span className="h-px w-12 bg-accent-indigo" /> Amazon SDE Internship Experience <span className="h-px w-12 bg-accent-indigo" />
            </div>
          </div>

          <ExperienceAvatarScene activeSystem={activeSystem} />
        </div>

        {/* Amazon Internship Projects Subsection */}
        <div className="mt-16">
          {/* Amazon Technologies & Competencies Strip */}
          <div className="mb-8 flex flex-wrap items-center gap-2 border-y border-panel-border/70 py-4">
            <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-indigo">
              Core Tech & Focus:
            </span>
            {[
              "Java",
              "Spring Boot",
              "AWS",
              "DynamoDB Global Tables",
              "Distributed Systems",
              "REST APIs",
              "Burp Suite",
              "Eventual Consistency",
              "Regulatory Compliance",
              "B2C Retail Scale",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-panel-border bg-panel-raised px-3 py-1 font-mono text-xs text-ink-muted transition-colors duration-200 hover:border-accent-indigo/40 hover:text-ink"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 border-b border-panel-border pb-6 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent-indigo">
                <span className="h-2 w-2 rounded-full bg-accent-indigo animate-pulse" />
                Amazon SDE Internship Deliverables
              </div>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink md:text-3xl">
                Projects Worked on During My Amazon Internship
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted md:text-base">
                Production systems, high-scale authorization, and compliance frameworks engineered and deployed at Amazon Development Centre India.
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-ink-faint">
              <span className="rounded-full border border-panel-border bg-panel-raised px-3.5 py-1.5">
                2 Core Production Projects
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {experience.projects.map((project, i) => (
              <ExperienceCard
                key={project.id}
                project={project}
                index={i}
                active={activeSystem === project.id}
                onHover={setActiveSystem}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-panel-border pt-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">Measured impact at Amazon</p>
          <div className="mt-5 grid grid-cols-2 gap-6 md:grid-cols-5">
            {["$11M", "Millions", "1M+", "700+", "40+"].map((value, index) => (
              <div key={value} className="group">
                <p className="font-display text-3xl font-semibold text-accent-indigo transition-transform duration-300 group-hover:-translate-y-0.5 md:text-4xl">
                  <CountUp value={value} />
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  {["regulatory risk mitigated", "customer profiles", "requests / second", "users supported", "internal teams"][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
