import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface CountUpProps {
  value: string; // e.g. "40+", "700+", "10K+", "1M+", "Millions", "Multi-region"
  duration?: number;
}

export default function CountUp({ value, duration = 1100 }: CountUpProps) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6, once: true });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(match ? "0" + match[2] : value);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    if (!match || reduced) {
      setDisplay(value);
      return;
    }

    const target = parseFloat(match[1]);
    const suffix = match[2];
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;
      const formatted = Number.isInteger(target)
        ? Math.round(current).toString()
        : current.toFixed(1);
      setDisplay(formatted + suffix);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, match, value, duration, reduced]);

  return <span ref={ref}>{display}</span>;
}
