/** Animated aurora + gradient blobs that sit behind everything.
 *  Uses will-change and contain for GPU compositing. */
export function AuroraBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[oklch(0.1_0.035_300)]"
      style={{ contain: "strict" }}
    >
      <div
        className="absolute left-1/2 top-0 h-[60vmax] w-[60vmax] -translate-x-1/2 rounded-full animate-aurora"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.26 330 / 0.35), transparent 60%)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute -left-1/4 bottom-0 h-[55vmax] w-[55vmax] rounded-full animate-aurora [animation-delay:-7s]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 295 / 0.32), transparent 60%)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute -right-1/4 top-1/3 h-[50vmax] w-[50vmax] rounded-full animate-aurora [animation-delay:-14s]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.2 350 / 0.3), transparent 60%)",
          willChange: "transform",
        }}
      />
      <div
        className="absolute right-0 bottom-1/4 h-[40vmax] w-[40vmax] rounded-full animate-aurora [animation-delay:-3s]"
        style={{
          background:
            "radial-gradient(circle, oklch(0.84 0.14 88 / 0.18), transparent 60%)",
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-[oklch(0.1_0.035_300_/_0.4)]" />
    </div>
  );
}