import { achievement } from "../../data/portfolio";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";
import CountUp from "../shared/CountUp";
import AlgorithmPath from "./AlgorithmPath";
import GraphMotif from "./GraphMotif";

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          eyebrow="06 · Achievement"
          title="I continuously strengthen my problem-solving ability through DSA."
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="card-surface relative grid grid-cols-1 items-center gap-10 overflow-hidden p-8 md:grid-cols-2 md:p-12">
            <div className="pointer-events-none absolute -bottom-14 -left-14 h-56 w-56 rounded-full bg-accent-indigo/10 blur-3xl" />

            <div className="relative flex flex-col items-start gap-3">
              <GraphMotif />
              <div className="font-display text-6xl font-bold tracking-tight text-ink sm:text-7xl md:text-8xl">
                <CountUp value={achievement.count} duration={1400} />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ink-muted md:text-base">
                {achievement.label}
              </p>
              <p className="font-mono text-xs text-accent-indigo">{achievement.platforms}</p>
            </div>

            <div className="relative flex justify-center md:justify-end">
              <AlgorithmPath />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
