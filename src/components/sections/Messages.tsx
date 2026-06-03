import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
import { MESSAGES } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";

export function Messages() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SectionWrap id="messages">
      <SectionTitle eyebrow="Hidden Messages" title="Secret Love Notes" subtitle="Open each envelope for a little whisper from my heart." />
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {MESSAGES.map((msg, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, rotate: i % 2 ? 2 : -2 }}
            onClick={() => setOpen(i)}
            className="flex flex-col items-center gap-3 rounded-2xl glass p-6"
          >
            <Mail className="h-9 w-9 text-gold" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Note #{i + 1}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-6 backdrop-blur-md"
          >
            <motion.div
              initial={{ scaleY: 0.1, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              exit={{ scaleY: 0.1, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong max-w-md rounded-2xl p-8 text-center"
            >
              <p className="font-serif text-xl italic leading-relaxed text-foreground">{MESSAGES[open]}</p>
              <button onClick={() => setOpen(null)} className="mt-6 rounded-full bg-cosmic px-6 py-2 text-sm font-semibold text-primary-foreground">
                My Savi 💕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrap>
  );
}