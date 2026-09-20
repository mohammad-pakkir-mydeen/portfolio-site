import { motion, useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export default function Reveal({ children, delay = 0, className, y = 18 }: RevealProps) {
  const prefersReduced = useFramerReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ transformStyle: "preserve-3d" }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
