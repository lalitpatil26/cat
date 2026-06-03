import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { FINALE, CONFIG } from "@/config";
import { Starfield } from "../effects/Starfield";
import { FloatingParticles } from "../effects/FloatingParticles";
import { bigCelebration } from "@/lib/celebrate";

// Easing curve for a luxurious, weighted feel
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;

function AnimatedLetter({ text }: { text: string }) {
  const tokens = text.split(/(\s+)/);
  let wordCount = 0;

  return (
    <div className="whitespace-pre-line">
      {tokens.map((token, i) => {
        if (token.match(/^\s+$/)) {
          return <span key={i}>{token}</span>;
        }
        wordCount++;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: wordCount * 0.008,
            }}
            className="inline-block"
          >
            {token}
          </motion.span>
        );
      })}
    </div>
  );
}

export function Finale() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      id="finale"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-28 text-center"
    >
      {/* ── Atmospheric background layers ─────────────────── */}
      <Starfield count={prefersReducedMotion ? 60 : 140} />
      <FloatingParticles variant="hearts" count={prefersReducedMotion ? 10 : 24} />

      {/* Radial bloom behind the headline */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE_OUT_EXPO }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-[540px] w-[540px] rounded-full bg-gold/10 blur-[120px]" />
      </motion.div>

      {/* Secondary soft halo */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 3, delay: 0.4, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
      >
        <div className="h-[320px] w-[700px] rounded-full bg-rose/8 blur-[100px]" />
      </motion.div>



      {/* ── Letter card ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.1, delay: 0.3, ease: EASE_OUT_EXPO }}
        className="glass-strong relative z-10 mt-14 max-w-xl rounded-3xl p-8 text-left shadow-[0_8px_48px_rgba(0,0,0,0.18)] ring-1 ring-white/10"
      >
        {/* Corner accent glow */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/15 blur-2xl"
        />

        {/* Decorative quote mark */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 top-4 select-none font-serif text-7xl leading-none text-gold/20"
        >
          "
        </span>

        <div className="relative font-serif text-lg italic leading-relaxed text-foreground">
          {prefersReducedMotion ? (
            <div className="whitespace-pre-line">
              {new Date().getMonth() === 5 && new Date().getDate() === 26 ? FINALE.birthdayLetter : FINALE.letter}
            </div>
          ) : (
            <AnimatedLetter text={new Date().getMonth() === 5 && new Date().getDate() === 26 ? FINALE.birthdayLetter : FINALE.letter} />
          )}
        </div>

        {/* Signature row */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2, ease: EASE_OUT_EXPO }}
          className="mt-8 flex items-center justify-end gap-3"
        >
          {/* Small decorative line */}
          <span aria-hidden className="h-px w-10 bg-gradient-to-r from-transparent to-gold/50" />
          <p className="text-sm uppercase tracking-[0.3em] text-gold">{CONFIG.yourName}</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
