import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MAZE } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";

export function Maze() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SectionWrap id="maze">
      <SectionTitle eyebrow="Memory Maze" title="Choose a Path" subtitle="Each door hides a secret memory. Which will you open first?" />
      <div className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
        {MAZE.map((node, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, scale: 1.03 }}
            onClick={() => setOpen(i)}
            className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl glass p-4 text-center animate-pulse-glow"
          >
            <span className="text-4xl">{node.emoji}</span>
            <span className="font-display text-base text-foreground">{node.label}</span>
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
              initial={{ scale: 0.85, rotateX: 30, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong max-w-md rounded-3xl p-8 text-center"
            >
              <span className="text-5xl">{MAZE[open].emoji}</span>
              <h3 className="mt-4 font-display text-2xl text-gradient">{MAZE[open].label}</h3>
              <p className="mt-4 font-serif text-lg italic text-foreground">{MAZE[open].memory}</p>
              <button onClick={() => setOpen(null)} className="mt-6 rounded-full bg-cosmic px-6 py-2 text-sm font-semibold text-primary-foreground">
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrap>
  );
}