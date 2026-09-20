import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "../../data/portfolio";

/**
 * EnvelopeIntro
 *
 * A full-screen cinematic intro that plays once per session:
 *  1. Closed envelope appears in the centre
 *  2. Envelope flap lifts open
 *  3. Name card slides up out of the envelope
 *  4. Name zooms to fill the viewport
 *  5. Everything fades out, revealing the portfolio
 *
 * After the animation the component unmounts completely.
 * Uses sessionStorage so it only plays once per browser tab.
 */

const SEEN_KEY = "portfolio-intro-seen";

interface Props {
  /** Called when the intro finishes so App can reveal the portfolio */
  onDone: () => void;
}

export default function EnvelopeIntro({ onDone }: Props) {
  const [phase, setPhase] = useState<
    "envelope" | "open" | "card" | "zoom" | "exit"
  >("envelope");

  useEffect(() => {
    // Timeline (ms from mount):
    //   0   → envelope visible
    //   600 → flap opens
    //  1200 → card slides up
    //  2400 → name zooms
    //  3400 → fade exit
    //  4000 → call onDone

    const t1 = setTimeout(() => setPhase("open"),     600);
    const t2 = setTimeout(() => setPhase("card"),    1200);
    const t3 = setTimeout(() => setPhase("zoom"),    2400);
    const t4 = setTimeout(() => setPhase("exit"),    3400);
    const t5 = setTimeout(() => {
      sessionStorage.setItem(SEEN_KEY, "1");
      onDone();
    }, 4200);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const firstName = profile.name.split(" ")[0];
  const lastName  = profile.name.split(" ").slice(1).join(" ");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-base"
      initial={{ opacity: 1 }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      {/* ── subtle grid texture ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--ink)/0.025) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink)/0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── envelope body ── */}
      <AnimatePresence>
        {phase !== "zoom" && phase !== "exit" && (
          <motion.div
            key="envelope"
            className="relative flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: -60 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* envelope svg */}
            <svg
              width="280"
              height="200"
              viewBox="0 0 280 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))" }}
            >
              {/* envelope body */}
              <rect
                x="2" y="60" width="276" height="138"
                rx="8"
                fill="rgb(var(--panel))"
                stroke="rgb(var(--panel-border))"
                strokeWidth="1.5"
              />

              {/* V-flap (bottom part always visible) */}
              <path
                d="M2 60 L140 140 L278 60"
                fill="rgb(var(--panel-raised))"
                stroke="rgb(var(--panel-border))"
                strokeWidth="1.5"
              />

              {/* flap lid — rotates open from top */}
              <motion.path
                d="M2 60 L140 130 L278 60 L278 68 L2 68 Z"
                fill="rgb(var(--panel-raised))"
                stroke="rgb(var(--panel-border))"
                strokeWidth="1.5"
                style={{ transformOrigin: "140px 60px" }}
                initial={{ rotateX: 0 }}
                animate={
                  phase === "open" || phase === "card"
                    ? { rotateX: -155 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* accent seal dot */}
              <circle cx="140" cy="140" r="7" fill="rgb(var(--accent))" />
            </svg>

            {/* name card sliding up from envelope */}
            <AnimatePresence>
              {phase === "card" && (
                <motion.div
                  key="namecard"
                  className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                  style={{ bottom: "56px" }}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="rounded-xl border border-panel-border bg-panel px-8 py-4 shadow-2xl text-center whitespace-nowrap">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-indigo mb-1">
                      Portfolio
                    </p>
                    <p className="font-display text-2xl font-semibold tracking-tight text-ink">
                      {profile.name}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── zoomed name (phase: zoom) ── */}
      <AnimatePresence>
        {(phase === "zoom" || phase === "exit") && (
          <motion.div
            key="zoomname"
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.p
              className="font-mono text-[11px] uppercase tracking-[0.45em] text-accent-indigo mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Portfolio
            </motion.p>
            <motion.h1
              className="font-display font-bold tracking-tight text-ink text-center leading-none"
              style={{ fontSize: "clamp(2.4rem, 9vw, 7rem)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block">{firstName}</span>
              <span className="block text-accent-indigo">{lastName}</span>
            </motion.h1>
            <motion.p
              className="mt-4 font-display text-lg text-ink-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.4 }}
            >
              {profile.title}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Returns true if the intro should play this session */
export function shouldShowIntro(): boolean {
  return !sessionStorage.getItem(SEEN_KEY);
}

