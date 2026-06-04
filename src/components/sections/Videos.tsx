import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";
import { VIDEOS } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";

export function Videos() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SectionWrap id="videos">
      <SectionTitle eyebrow="Video Memories" title="Moments In Motion" subtitle="Some memories deserve to be relived." />
      <div className="mx-auto grid w-full max-w-5xl gap-5 sm:grid-cols-3">
        {VIDEOS.map((v, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            onClick={() => v.src && setOpen(i)}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10"
          >
            <img src={v.poster} alt={v.title} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 grid place-items-center bg-black/40">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-cosmic glow-rose">
                <Play className="ml-1 h-6 w-6 text-primary-foreground" />
              </span>
            </div>
            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-left font-display text-sm text-foreground">
              {v.title}
            </span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && VIDEOS[open].src && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[120] grid place-items-center bg-black/90 p-6 backdrop-blur-md"
          >
            <button onClick={() => setOpen(null)} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground"><X className="h-5 w-5" /></button>
            <video src={VIDEOS[open].src} controls autoPlay onClick={(e) => e.stopPropagation()} className="max-h-[80vh] w-full max-w-3xl rounded-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrap>
  );
}