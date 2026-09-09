import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-3">{title}</h2>
      {description && <p className="body-lead mt-4">{description}</p>}
    </Reveal>
  );
}
