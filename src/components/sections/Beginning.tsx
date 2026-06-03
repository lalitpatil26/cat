import { motion } from "framer-motion";
import { BEGINNING } from "@/config";
import { SectionWrap } from "./SectionWrap";
import { Starfield } from "../effects/Starfield";
import { FloatingParticles } from "../effects/FloatingParticles";

export function Beginning() {
  return (
    <SectionWrap id="beginning">
      <Starfield count={60} />
      <FloatingParticles variant="sparkles" count={10} />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8 text-xs uppercase tracking-[0.4em] text-gold"
        >
          The Beginning
        </motion.p>
        {BEGINNING.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: i * 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-4 font-serif text-2xl italic leading-snug text-foreground sm:text-4xl"
          >
            {line}
          </motion.p>
        ))}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: BEGINNING.lines.length * 0.8 }}
          className="mx-auto mt-10 h-px w-40 bg-cosmic"
        />
      </div>
    </SectionWrap>
  );
}