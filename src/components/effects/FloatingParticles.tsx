import { useMemo } from "react";

type Variant = "hearts" | "petals" | "sparkles" | "mixed";

const EMOJIS: Record<Variant, string[]> = {
  hearts:   ["❤️", "💕", "💖", "💗", "🩷"],
  petals:   ["🌸", "🌹", "🌷", "🪷"],
  sparkles: ["✨", "⭐", "💫", "🌟"],
  mixed:    ["❤️", "🌸", "✨", "💖", "🌹", "💫", "🌟", "🩷"],
};

/* ─── Seeded PRNG — stable across renders / SSR ──────────── */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ─── One-time keyframe injection ────────────────────────── */
const KEYFRAME_ID = "__fp2_kf__";
function ensureKeyframes() {
  if (typeof document === "undefined" || document.getElementById(KEYFRAME_ID)) return;
  const s = document.createElement("style");
  s.id = KEYFRAME_ID;
  // Only transform + opacity — both compositor-only, zero paint cost.
  s.textContent = `
    @keyframes fp-fly {
      0%   { transform: translate(0, 0)                                        rotate(0deg);                    opacity: 0;           }
      6%   {                                                                                                     opacity: var(--fp-op); }
      35%  { transform: translate(var(--fp-dx),  -35vh)                        rotate(calc(var(--fp-spin) * 0.5deg));                  }
      65%  { transform: translate(var(--fp-dx2), -65vh)                        rotate(calc(var(--fp-spin) * -0.25deg));                }
      90%  {                                                                                                     opacity: var(--fp-op); }
      100% { transform: translate(var(--fp-dx3), -104vh)                       rotate(calc(var(--fp-spin) * 1deg));  opacity: 0;       }
    }
    @media (prefers-reduced-motion: reduce) {
      .fp { animation: none !important; opacity: 0 !important; }
    }
  `;
  document.head.appendChild(s);
}

export function FloatingParticles({
  variant   = "hearts",
  count     = 16,
  className = "",
  seed      = 7,
}: {
  variant?:   Variant;
  count?:     number;
  className?: string;
  /** Change to shuffle particle layout without re-randomising every render */
  seed?:      number;
}) {
  ensureKeyframes();

  const particles = useMemo(() => {
    const rand  = mulberry32(seed ^ (variant.charCodeAt(0) * 31) ^ count);
    const chars = EMOJIS[variant];
    return Array.from({ length: count }, (_, i) => ({
      id:       i,
      char:     chars[i % chars.length],
      left:     rand() * 100,
      delay:    rand() * 15,
      duration: 12 + rand() * 13,
      size:     0.9 + rand() * 1.4,
      dx:       ((rand() - 0.5) * 90).toFixed(1),
      dx2:      ((rand() - 0.5) * 60).toFixed(1),
      dx3:      ((rand() - 0.5) * 40).toFixed(1),
      spin:     ((rand() - 0.5) * 36).toFixed(1),
      op:       (0.6 + rand() * 0.4).toFixed(2),
      large:    false as boolean, // set below
    })).map((p) => ({ ...p, large: p.size > 1.8 }));
  }, [variant, count, seed]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
      style={{ contain: "layout style paint" }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="fp absolute select-none leading-none"
          style={{
            bottom:    "-8%",
            left:      `${p.left}%`,
            fontSize:  `${p.size}rem`,
            "--fp-dx":   `${p.dx}px`,
            "--fp-dx2":  `${p.dx2}px`,
            "--fp-dx3":  `${p.dx3}px`,
            "--fp-spin": p.spin,
            "--fp-op":   p.op,
            animation:   `fp-fly ${p.duration}s cubic-bezier(0.33, 0, 0.66, 1) ${p.delay}s infinite`,
            // Only promote large particles — too many will-change layers = GPU pressure
            willChange:  p.large ? "transform, opacity" : "auto",
          } as React.CSSProperties}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
}