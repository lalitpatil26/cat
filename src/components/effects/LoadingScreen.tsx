import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Starfield } from "./Starfield";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/* Phrases that shimmer in one by one while loading */
const PHRASES = [
  "Gathering stardust…",
  "Weaving memories…",
  "Pouring in the love…",
  "Almost ready…",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  /* ── Smooth eased progress (rAF-driven) ─────────────────── */
  useEffect(() => {
    const DURATION = 4800;
    const start = Date.now();
    let raf = 0;

    const tick = () => {
      const t = Math.min(1, (Date.now() - start) / DURATION);
      // Ease-out-expo feel: fast start, lingers near 100
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(onDone, 500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  /* ── Cycle through hint phrases ─────────────────────────── */
  useEffect(() => {
    const id = setInterval(
      () => setPhraseIdx((i) => Math.min(i + 1, PHRASES.length - 1)),
      1200
    );
    return () => clearInterval(id);
  }, []);

  /* ── Heartbeat pulse ring ref ────────────────────────────── */
  const ringRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: "blur(14px)" }}
      transition={{ duration: 0.65, ease: EASE_EXPO }}
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
      style={{ background: "oklch(0.07 0.025 295)" }}
    >
      {/* ── Stars ─────────────────────────────────────────── */}
      <Starfield count={80} />

      {/* ── Ambient glow blobs ───────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ contain: "layout style paint" }}
      >
        {/* Rose-gold center bloom */}
        <motion.div
          animate={{ opacity: [0.18, 0.30, 0.18], scale: [1, 1.12, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.70 0.20 15 / 0.55) 0%, transparent 70%)" }}
        />
        {/* Cool violet offset */}
        <motion.div
          animate={{ opacity: [0.10, 0.20, 0.10], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          className="absolute left-[58%] top-[42%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.55 0.22 290 / 0.45) 0%, transparent 70%)" }}
        />
      </div>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-6 text-center">

        {/* Heart with pulse ring */}
        <div className="relative flex items-center justify-center">
          {/* Expanding ring */}
          <motion.div
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut" }}
            className="absolute h-16 w-16 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.70 0.22 15 / 0.5) 0%, transparent 70%)" }}
          />
          {/* Second ring, offset phase */}
          <motion.div
            animate={{ scale: [1, 1.9], opacity: [0.35, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeOut", delay: 0.45 }}
            className="absolute h-16 w-16 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.75 0.18 30 / 0.45) 0%, transparent 70%)" }}
          />
          {/* Heart emoji */}
          <motion.div
            animate={{ scale: [1, 1.22, 0.96, 1.14, 1] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "3.5rem", lineHeight: 1, display: "block", filter: "drop-shadow(0 0 18px oklch(0.70 0.22 15 / 0.7))" }}
          >
            ❤️
          </motion.div>
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_EXPO }}
          className="font-serif text-2xl italic text-gradient sm:text-3xl"
        >
          Preparing something magical…
        </motion.h1>

        {/* Progress bar */}
        <div className="flex w-64 flex-col items-center gap-3 sm:w-72">
          {/* Track */}
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            {/* Fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, oklch(0.72 0.20 15), oklch(0.78 0.18 340), oklch(0.85 0.16 55))",
              }}
              transition={{ duration: 0.15 }}
            />
            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ["-100%", "400%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.3 }}
              className="absolute inset-y-0 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)" }}
            />
          </div>

          {/* Percentage + phrase row */}
          <div className="flex w-full items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.span
                key={phraseIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-xs tracking-wide text-white/45"
              >
                {PHRASES[phraseIdx]}
              </motion.span>
            </AnimatePresence>
            <span
              className="tabular-nums text-xs font-medium tracking-widest"
              style={{ color: "oklch(0.85 0.12 55)" }}
            >
              {Math.round(progress)}%
            </span>
          </div>
        </div>

      </div>

      {/* ── Bottom vignette ──────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to top, oklch(0.07 0.025 295), transparent)" }}
      />
    </motion.div>
  );
}