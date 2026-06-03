import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { STATS } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";
import { useCountUp } from "@/hooks/useCountUp";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const HEARTBEAT = Array.from({ length: 14 }, (_, i) => ({
  t: `${i}`,
  bpm: 70 + Math.round(Math.sin(i / 1.5) * 30 + i * 4),
}));

function StatCard({ label, value, suffix, active, delay }: { label: string; value: number; suffix: string; active: boolean; delay: number }) {
  const n = useCountUp(value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="glass rounded-2xl p-6 text-center"
    >
      <p className="font-display text-3xl font-bold text-gradient sm:text-4xl">
        {n.toLocaleString()}{suffix}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export function Stats() {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, amount: 0.3 });
  return (
    <SectionWrap id="stats">
      <SectionTitle eyebrow="Love Statistics" title="The Numbers Don't Lie" subtitle="Scientifically proven facts about loving you." />
      <div ref={ref} className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={i} {...s} active={active} delay={i * 0.1} />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass mx-auto mt-6 w-full max-w-4xl rounded-2xl p-5"
      >
        <p className="mb-3 text-center text-sm text-muted-foreground">My heartbeat acceleration every time I see you 💓</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={HEARTBEAT}>
            <defs>
              <linearGradient id="hb" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff4d8d" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#b06ab3" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <Tooltip contentStyle={{ background: "rgba(30,10,40,0.9)", border: "none", borderRadius: 12, color: "#fff" }} />
            <Area type="monotone" dataKey="bpm" stroke="#ff4d8d" strokeWidth={3} fill="url(#hb)" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </SectionWrap>
  );
}