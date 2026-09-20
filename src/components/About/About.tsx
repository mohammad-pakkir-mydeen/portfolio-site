import { aboutCards, aboutBackground } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import { engineeringIconMap, EngineeringIconKey } from "../shared/EngineeringIcons";
import SystemFlowDiagram from "./SystemFlowDiagram";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="01 · About"
          title="Here is the kind of engineering I care about."
          description="A software engineer with a background in AI and Data Science, working across backend engineering, cloud, and distributed systems to build modern applications."
        />

        <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-2">
          {aboutBackground.map((item) => (
            <span key={item} className="tag-chip">
              {item}
            </span>
          ))}
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {aboutCards.map((card, i) => {
              const Icon = engineeringIconMap[card.id as EngineeringIconKey];
              return (
                <Reveal key={card.id} delay={i * 0.08}>
                  <div className="group card-surface h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-indigo/40">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-panel-border bg-panel-raised text-accent-indigo transition-transform duration-300 group-hover:scale-110">
                      <Icon size={20} strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {card.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2} className="lg:col-span-5">
            <SystemFlowDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
