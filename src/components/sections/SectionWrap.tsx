import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function SectionWrap({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-5 py-24 sm:px-8 ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-12 max-w-2xl text-center"
    >
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-bold text-foreground text-glow sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </motion.div>
  );
}