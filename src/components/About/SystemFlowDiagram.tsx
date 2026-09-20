import { useReducedMotion } from "../../hooks/useReducedMotion";

const nodes = [
  { label: "Frontend" },
  { label: "API" },
  { label: "Backend" },
  { label: "Database" },
  { label: "Cloud" },
];

export default function SystemFlowDiagram() {
  const reduced = useReducedMotion();

  return (
    <div className="card-surface relative h-full min-h-[360px] p-6">
      <span className="eyebrow">Conceptual view</span>
      <p className="mt-1 text-xs text-ink-faint">
        A generic illustration of how these layers relate — not a specific architecture.
      </p>

      <div className="relative mt-8 flex flex-col items-center gap-0">
        {nodes.map((node, i) => (
          <div key={node.label} className="flex flex-col items-center">
            <div className="relative z-10 w-40 rounded-xl border border-panel-border bg-panel-raised px-4 py-2.5 text-center text-sm text-ink shadow-card">
              {node.label}
            </div>
            {i < nodes.length - 1 && (
              <svg width="2" height="34" className="my-0.5" aria-hidden="true">
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="34"
                  stroke="rgb(var(--accent))"
                  strokeWidth="2"
                  strokeDasharray="4 5"
                  className={reduced ? "" : "animate-pulse-soft"}
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-accent-indigo/10 blur-3xl" />
      <div className="absolute -top-8 -left-8 h-28 w-28 rounded-full bg-accent-indigo/10 blur-3xl" />
    </div>
  );
}
