import { ArrowRight } from "lucide-react";
import Reveal from "../shared/Reveal";

interface ProjectCardProps {
  title: string;
  description: string;
  flow: string[];
  index: number;
}

export default function ProjectCard({ title, description, flow, index }: ProjectCardProps) {
  return (
    <Reveal delay={index * 0.1}>
      <div className="card-surface group relative p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-indigo/40 md:p-9">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-indigo/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />

        <h3 className="relative font-display text-xl font-semibold text-ink md:text-2xl">
          {title}
        </h3>
        <p className="relative mt-3 max-w-xl text-sm leading-relaxed text-ink-muted md:text-base">
          {description}
        </p>

        <div className="relative mt-8 flex flex-wrap items-center gap-2">
          {flow.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-panel-border bg-panel-raised/70 px-3.5 py-1.5 text-xs font-medium text-ink">
                {step}
              </span>
              {i < flow.length - 1 && (
                <ArrowRight size={14} className="text-accent-indigo/70" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
