import { useState } from "react";
import { skillGroups } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import SkillCard from "./SkillCard";
import EngineeringStackScene, { categories } from "./EngineeringStackScene";

export default function Skills() {
  // null = nothing selected / highlighted on initial load
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="04 · Skills"
          title="Here is the technical foundation behind my work."
        />

        <Reveal delay={0.1} className="mt-10">
          <EngineeringStackScene
            activeCategory={activeCategory ?? ""}
            onSelect={setActiveCategory}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {skillGroups.map((group, i) => {
            const category = categories.find((item) => item.items.includes(group.items[0]));
            const highlightedItems = activeCategory
              ? (categories.find((c) => c.id === activeCategory)?.items ?? [])
              : [];
            const isGroupActive = category?.id === activeCategory;

            return (
              <Reveal key={group.id} delay={i * 0.05}>
                <div
                  className={`rounded-2xl border bg-panel-raised/50 p-6 shadow-card transition-all duration-300 md:p-7 ${
                    isGroupActive
                      ? "border-accent-indigo/40 bg-panel-raised"
                      : "border-panel-border hover:border-panel-border/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`h-3.5 w-0.5 rounded-full transition-colors duration-300 ${
                        isGroupActive ? "bg-accent-indigo" : "bg-ink-faint"
                      }`}
                    />
                    <h3 className="font-display text-base font-semibold text-ink">
                      {group.title}
                    </h3>
                  </div>
                  <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {group.items.map((item) => (
                      <SkillCard
                        key={item}
                        name={item}
                        highlighted={highlightedItems.includes(item)}
                        onClick={() => category && setActiveCategory(
                          activeCategory === category.id ? null : category.id
                        )}
                      />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
