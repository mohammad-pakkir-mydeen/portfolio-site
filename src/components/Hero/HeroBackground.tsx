import { useReducedMotion } from "../../hooks/useReducedMotion";

const glyphs = [
  { symbol: "{ }", top: "18%", left: "6%", size: "text-2xl", delay: "0s" },
  { symbol: "</>", top: "68%", left: "10%", size: "text-xl", delay: "0.6s" },
  { symbol: "λ", top: "40%", left: "3%", size: "text-3xl", delay: "1.2s" },
];

export default function HeroBackground() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base gradient wash */}
      <div className="absolute inset-0 bg-grid-fade" />

      {/* faint engineering grid */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.05]" aria-hidden="true">
        <defs>
          <pattern id="hero-grid" width="46" height="46" patternUnits="userSpaceOnUse">
            <path d="M 46 0 L 0 0 0 46" fill="none" stroke="rgb(var(--accent))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* minimal floating glyphs, left column only, kept sparse per brief */}
      <div className="absolute inset-0 hidden md:block">
        {glyphs.map((g) => (
          <span
            key={g.symbol}
            className={`absolute font-mono ${g.size} text-accent-indigo/25 ${
              reduced ? "" : "animate-pulse-soft"
            }`}
            style={{ top: g.top, left: g.left, animationDelay: g.delay }}
          >
            {g.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}
