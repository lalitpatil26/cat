import { useMemo } from "react";

/** Twinkling star layer. Pure CSS, SSR-safe (positions seeded on client).
 *  Reduced count defaults + will-change for smoother compositing. */
export function Starfield({ count = 90 }: { count?: number }) {
  // Cap star count for performance — no visible difference above ~60
  const cappedCount = Math.min(count, 60);

  const stars = useMemo(
    () =>
      Array.from({ length: cappedCount }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
        dur: 2 + Math.random() * 3,
      })),
    [cappedCount],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
      style={{ contain: "layout style paint" }}
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
            boxShadow: "0 0 6px 1px rgba(255,255,255,0.7)",
            willChange: "transform, opacity",
            contain: "layout style",
          }}
        />
      ))}
    </div>
  );
}