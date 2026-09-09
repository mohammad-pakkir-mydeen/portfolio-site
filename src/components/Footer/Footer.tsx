import { profile } from "../../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-panel-border py-8">
      <div className="section-container flex flex-col items-center justify-between gap-3 text-xs text-ink-faint md:flex-row">
        <span>
          &copy; {new Date().getFullYear()} {profile.name}
        </span>
        <span className="font-mono">Built with React Three Fiber &amp; Tailwind CSS</span>
      </div>
    </footer>
  );
}
