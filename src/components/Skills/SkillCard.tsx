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
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-2.5 rounded-xl border p-3.5 text-center transition-all duration-200 ease-out hover:-translate-y-1 hover:border-accent-indigo/60 hover:bg-panel-raised hover:shadow-md active:scale-95 sm:p-4 ${
        highlighted
          ? "border-accent-indigo bg-accent-indigo/10 shadow-glow"
          : "border-panel-border bg-panel-raised/50"
      }`}
    >
      <span className="flex h-8 w-8 items-center justify-center text-ink-muted transition-all duration-200 group-hover:scale-110 group-hover:text-accent-indigo sm:h-9 sm:w-9">
        {Icon ? <Icon size={24} /> : <span className="font-mono text-xs">{name[0]}</span>}
      </span>
      <span className="text-[11px] font-medium leading-tight text-ink-muted transition-colors duration-200 group-hover:text-ink sm:text-xs">
        {name}
      </span>
    </button>
  );
}
