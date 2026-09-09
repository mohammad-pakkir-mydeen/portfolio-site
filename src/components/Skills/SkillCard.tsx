import { skillIconMap } from "./SkillIcons";

export default function SkillCard({
  name,
  highlighted = false,
  onClick,
}: {
  name: string;
  highlighted?: boolean;
  onClick?: () => void;
}) {
  const Icon = skillIconMap[name];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-center gap-3 rounded-xl border bg-panel/60 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent-indigo/50 hover:bg-panel-raised hover:shadow-glow ${
        highlighted ? "border-accent-cyan/50 bg-accent-cyan/5" : "border-panel-border"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center text-ink-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-accent-indigo">
        {Icon ? <Icon size={26} /> : <span className="font-mono text-xs">{name[0]}</span>}
      </span>
      <span className="text-xs font-medium text-ink-muted transition-colors duration-300 group-hover:text-ink">
        {name}
      </span>
    </button>
  );
}
