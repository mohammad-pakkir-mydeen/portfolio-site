import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { profile } from "../../data/portfolio";
import Reveal from "../shared/Reveal";

const links = [
  {
    key: "email",
    href: profile.links.email,
    label: "mohammadpakkirmydeen@gmail.com",
    icon: Mail,
  },
  {
    key: "github",
    href: profile.links.github,
    label: "GitHub",
    icon: Github,
  },
  {
    key: "linkedin",
    href: profile.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    key: "leetcode",
    href: profile.links.leetcode,
    label: "LeetCode",
    icon: SiLeetcode,
  },
].filter((l) => l.href);

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-24"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="section-container">
        <Reveal className="card-surface relative px-8 py-16 text-center md:px-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-grid-fade rounded-lg" />

          <div className="relative">
            <span className="eyebrow">07 · Contact</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Let&apos;s build something meaningful.
            </h2>
            <p className="body-lead mx-auto mt-6 max-w-xl">
              Open to conversations with recruiters, engineers and collaborators about backend,
              cloud and distributed-systems work.
            </p>

            {links.length > 0 ? (
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {links.map(({ key, href, label, icon: Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target={key === "email" ? undefined : "_blank"}
                    rel={key === "email" ? undefined : "noreferrer"}
                    className="btn-secondary"
                  >
                    <Icon size={16} />
                    {label}
                    <ArrowUpRight size={14} className="text-ink-faint" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-10 font-mono text-xs text-ink-faint">
                Add an email, GitHub and LinkedIn link in{" "}
                <code className="text-accent-indigo">src/data/portfolio.ts</code> to show contact
                options here.
              </p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
