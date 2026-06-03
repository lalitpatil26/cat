import { motion } from "framer-motion";
import { TIMELINE } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";

export function Timeline() {
  return (
    <SectionWrap id="timeline">
      <SectionTitle eyebrow="Memory Timeline" title="Our Journey So Far" subtitle="Every milestone that led me closer to you." />
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-px bg-cosmic sm:left-1/2" />
        {TIMELINE.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`relative mb-10 pl-12 sm:w-1/2 sm:pl-0 ${i % 2 ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:text-right"}`}
          >
            <span className={`absolute top-2 grid h-7 w-7 place-items-center rounded-full bg-cosmic text-xs glow-rose left-[2px] ${i % 2 ? "sm:-left-[14px]" : "sm:left-auto sm:-right-[14px]"}`}>
              ❤
            </span>
            <div className="glass rounded-2xl p-5">
              <p className="text-xs uppercase tracking-widest text-gold">{m.date}</p>
              <h3 className="mt-1 font-display text-xl text-foreground">{m.title}</h3>
              <img src={m.img} alt={m.title} loading="lazy" decoding="async" className="my-3 h-40 w-full rounded-lg object-cover" />
              <p className="text-sm text-muted-foreground">{m.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrap>
  );
}