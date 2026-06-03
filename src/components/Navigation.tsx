import { useEffect, useState } from "react";
import { SECTIONS } from "@/config";

/** Right-side dot navigation that highlights the section in view. */
export function Navigation() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.5 },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-3 lg:flex" aria-label="Section navigation">
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center justify-end gap-2"
          title={s.label}
        >
          <span className="pointer-events-none rounded-full glass px-2 py-0.5 text-xs text-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {s.label}
          </span>
          <span
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              active === s.id ? "scale-150 bg-cosmic glow-rose" : "bg-white/30 group-hover:bg-white/60"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}