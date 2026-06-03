import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % GALLERY.length));

  return (
    <SectionWrap id="gallery">
      <SectionTitle
        eyebrow=" Gallery"
        title="Every Moment With You"
        subtitle="A collection of memories I'll treasure forever. Tap a photo to relive it."
      />

      <div className="mx-auto w-full max-w-6xl columns-2 gap-3 sm:columns-3 lg:columns-4 [&>*]:mb-3">
        {GALLERY.map((photo, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (i % 8) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03, rotate: i % 2 ? 1.5 : -1.5 }}
            onClick={() => setActive(i)}
            className="group relative block w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 p-2 shadow-lg"
          >
            <img
              src={photo.src}
              alt={photo.caption}
              loading="lazy"
              className="w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:glow-rose" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[120] grid place-items-center bg-black/80 p-4 backdrop-blur-md"
          >
            <button
              onClick={close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground sm:left-8"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 grid h-11 w-11 place-items-center rounded-full glass-strong text-foreground sm:right-8"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <motion.div
              key={active}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl p-3"
            >
              <img
                src={GALLERY[active].src}
                alt={GALLERY[active].caption}
                className="max-h-[70vh] w-full rounded-xl object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrap>
  );
}