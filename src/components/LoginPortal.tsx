import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LockOpen, Heart, Sparkles } from "lucide-react";
import { PASSWORD, PASSWORD_HINT, PORTAL } from "@/config";
import { Starfield } from "./effects/Starfield";
import { FloatingParticles } from "./effects/FloatingParticles";

const CUTE_WRONG = [
  "Aww, not quite my love 💔 Try again!",
  "Hmm, that's not it... but I still adore you 🥺",
  "Nope! Hint: think about us 💕",
  "So close! Your heart knows the answer 💖",
];

export function LoginPortal({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim().toLowerCase() === PASSWORD.trim().toLowerCase()) {
      setError("");
      setUnlocking(true);
      setTimeout(onUnlock, 1100);
    } else {
      setError(CUTE_WRONG[Math.floor(Math.random() * CUTE_WRONG.length)]);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden px-4">
      <img
        src="/portal-bg.jpg"
        alt=""
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-[oklch(0.09_0.03_300_/_0.55)]" />
      <Starfield count={80} />
      <FloatingParticles variant="mixed" count={14} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative z-10 w-full max-w-md rounded-[2rem] p-8 text-center sm:p-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-cosmic animate-pulse-glow"
        >
          <AnimatePresence mode="wait">
            {unlocking ? (
              <motion.span key="open" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                <LockOpen className="h-9 w-9 text-primary-foreground" />
              </motion.span>
            ) : (
              <motion.span key="closed" exit={{ scale: 0 }}>
                <Lock className="h-9 w-9 text-primary-foreground" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mb-2 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.35em] text-gold">
          <Sparkles className="h-3 w-3" /> {PORTAL.eyebrow}
        </p>
        <h1 className="font-display text-2xl font-bold leading-tight text-foreground text-glow sm:text-3xl">
          {PORTAL.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{PORTAL.subtitle}</p>

        <form onSubmit={submit} className="mt-8">
          <motion.div
            animate={shake ? { x: [0, -10, 10, -8, 8, 0] } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter the secret numbers..."
              className="w-full rounded-full border border-white/15 bg-white/5 px-6 py-4 text-center text-foreground outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary/60 focus:bg-white/10 focus:glow-rose"
            />
          </motion.div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm font-medium text-primary"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-cosmic px-8 py-4 font-semibold text-primary-foreground glow-rose"
          >
            <Heart className="h-4 w-4" fill="currentColor" />
            {PORTAL.cta}
          </motion.button>
        </form>

        {PASSWORD_HINT && (
          <p className="mt-5 text-xs italic text-muted-foreground">{PASSWORD_HINT}</p>
        )}
      </motion.div>
    </div>
  );
}