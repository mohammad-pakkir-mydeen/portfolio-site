import { Briefcase, MapPin, Calendar } from "lucide-react";
import { experience } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import ExperienceCard from "./ExperienceCard";
import ExperienceAvatarScene from "./ExperienceAvatarScene";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="02 · Experience"
          title="I've worked on authorization, production systems, security, compliance and large-scale backend services."
        />

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ExperienceAvatarScene />

              <Reveal delay={0.1}>
                <div className="card-surface mt-6 p-6">
                  <div className="flex items-center gap-2.5 text-accent-indigo">
                    <Briefcase size={16} />
                    <span className="font-display text-base font-semibold text-ink">
                      {experience.role}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-muted">{experience.company}</p>
                  <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-ink-faint">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} /> {experience.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} /> {experience.period}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-7">
            {experience.projects.map((project, i) => (
              <ExperienceCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
