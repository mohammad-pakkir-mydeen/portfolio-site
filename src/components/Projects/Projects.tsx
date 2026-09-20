import { projects } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <SectionHeading
          eyebrow="03 · Independent & AI Projects"
          title="Beyond Amazon, I build intelligent applications using AI and modern software engineering."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              flow={project.flow}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
