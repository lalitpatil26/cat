import { useState } from "react";
import { motion } from "framer-motion";
import { REASONS } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";
import { heartBurst } from "@/lib/celebrate";

export function Reasons() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const flip = (i: number, e: React.MouseEvent) => {
    setRevealed((r) => ({ ...r, [i]: !r[i] }));
    if (!revealed[i]) void heartBurst(e.clientX, e.clientY);
  };

  return (
    <SectionWrap id="reasons">
      <SectionTitle eyebrow="Why You're Special" title="♾️ Reasons I Love You" subtitle="Tap each card to reveal a little piece of my heart." />
      <div className="perspective mx-auto grid w-full max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {REASONS.map((reason, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotateX: -8, rotateY: 8, scale: 1.04 }}
            onClick={(e) => flip(i, e)}
            className="preserve-3d group relative grid aspect-[4/5] place-items-center rounded-2xl glass p-3 text-center"
          >
            {revealed[i] ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="font-serif text-sm italic text-foreground"
              >
                {reason}
              </motion.p>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <span className="text-3xl transition-transform group-hover:scale-125">💖</span>
                <span className="text-xs uppercase tracking-widest text-gold">Reason #{i + 1}</span>
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </SectionWrap>
  );
}