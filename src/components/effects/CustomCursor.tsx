import { useEffect, useRef, useState } from "react";

/**
 * Mouse-follow cursor with:
 * - Instant dot tracking (no lerp delay)
 * - Smooth glow trail (GPU-accelerated via translate3d + will-change)
 * - Lighter glow using radial-gradient instead of massive blur
 * Desktop only.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let rx = gx;
    let ry = gy;
    let tx = gx;
    let ty = gy;

    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // Dot tracks instantly — zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      }
    };

    const raf = () => {
      // Glow follows with smooth lerp
      gx += (tx - gx) * 0.18;
      gy += (ty - gy) * 0.18;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      }
      // Ring follows with slightly slower lerp for trail effect
      rx += (tx - rx) * 0.1;
      ry += (ty - ry) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      id = requestAnimationFrame(raf);
    };

    let id = requestAnimationFrame(raf);
    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(id);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient glow — lightweight radial gradient instead of blur */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9997]"
        style={{
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, oklch(0.72 0.2 350 / 0.35) 0%, oklch(0.55 0.22 295 / 0.15) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* Trail ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: "1.5px solid oklch(0.72 0.2 350 / 0.45)",
          willChange: "transform",
          mixBlendMode: "screen",
          transition: "width 0.15s, height 0.15s, margin 0.15s",
        }}
      />
      {/* Precise dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: "50%",
          background: "oklch(0.82 0.18 350)",
          boxShadow: "0 0 10px 2px oklch(0.72 0.2 350 / 0.7)",
          willChange: "transform",
        }}
      />
    </>
  );
}