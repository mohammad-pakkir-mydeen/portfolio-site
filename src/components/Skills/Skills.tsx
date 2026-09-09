import { useState } from "react";
import { skillGroups } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import SkillCard from "./SkillCard";
import EngineeringStackScene, { categories } from "./EngineeringStackScene";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("core");
  const activeItems = categories.find((category) => category.id === activeCategory)?.items ?? [];

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="04 · Skills"
          title="Here is the technical foundation behind my work."
        />

        <Reveal delay={0.1} className="mt-10">
          <EngineeringStackScene
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {skillGroups.map((group, i) => {
            const category = categories.find((item) => item.items.includes(group.items[0]));
            const selected = category?.id === activeCategory;
            return (
            <Reveal key={group.id} delay={i * 0.05}>
              <div
                className={`card-surface p-6 transition-colors md:p-7 ${
                  selected ? "border-accent-indigo/60 shadow-glow" : ""
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-3.5 w-0.5 rounded-full bg-accent-indigo" />
                  <h3 className="font-display text-base font-semibold text-ink">
                    {group.title}
                  </h3>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {group.items.map((item) => (
                    <SkillCard
                      key={item}
                      name={item}
                      highlighted={activeItems.includes(item)}
                      onClick={() => category && setActiveCategory(category.id)}
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
