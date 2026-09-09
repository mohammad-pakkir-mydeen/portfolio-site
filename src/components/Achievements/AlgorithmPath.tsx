import { HelpCircle, Brain, Code2, CheckCircle2 } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const stages = [
  { label: "Problem", icon: HelpCircle },
  { label: "Think", icon: Brain },
  { label: "Code", icon: Code2 },
  { label: "Solve", icon: CheckCircle2 },
];

export default function AlgorithmPath() {
  const reduced = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-1">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex flex-col items-center">
          <div className="flex items-center gap-2.5 rounded-full border border-panel-border bg-panel-raised px-4 py-2">
            <stage.icon size={15} className="text-accent-indigo" />
            <span className="text-sm text-ink">{stage.label}</span>
          </div>
          {i < stages.length - 1 && (
            <svg width="2" height="26" className="my-0.5" aria-hidden="true">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="26"
                stroke="rgb(var(--accent))"
                strokeWidth="2"
                strokeDasharray="3 4"
                className={reduced ? "" : "animate-pulse-soft"}
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
