import { ShieldCheck, Workflow, Activity, Waypoints } from "lucide-react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const chain = ["Frontend", "REST API", "Backend", "Database", "Cloud"];
const orbit = [
  { label: "Security", icon: ShieldCheck },
  { label: "CI/CD", icon: Workflow },
  { label: "Monitoring", icon: Activity },
  { label: "Distributed Systems", icon: Waypoints },
];

export default function SkillVisualization() {
  const reduced = useReducedMotion();

  return (
    <div className="card-surface relative overflow-hidden p-6 md:p-8">
      <span className="eyebrow">System view</span>
      <p className="mt-1 max-w-md text-xs text-ink-faint">
        A conceptual layering of the technical foundation — not a claim about one specific
        deployed architecture.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:gap-3">
        {chain.map((step, i) => (
          <div key={step} className="flex items-center gap-2 md:gap-3">
            <span className="rounded-full border border-panel-border bg-panel-raised px-3.5 py-2 text-xs font-medium text-ink md:text-sm">
              {step}
            </span>
            {i < chain.length - 1 && (
              <svg width="26" height="2" aria-hidden="true">
                <line
                  x1="0"
                  y1="1"
                  x2="26"
                  y2="1"
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

      <div className="mt-8 flex flex-wrap justify-center gap-3 border-t border-panel-border pt-6">
        {orbit.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="flex items-center gap-1.5 rounded-full border border-panel-border bg-panel/60 px-3 py-1.5 text-xs text-ink-muted"
          >
            <Icon size={13} className="text-accent-indigo" />
            {label}
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-accent-indigo/10 blur-3xl" />
    </div>
  );
}
