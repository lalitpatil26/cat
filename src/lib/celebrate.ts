/** Client-only celebration helpers (confetti, fireworks, heart bursts). */

const COLORS = ["#ff7eb3", "#ff4d8d", "#b06ab3", "#f6c453", "#ffd6e7"];

export async function fireConfetti() {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  confetti({
    particleCount: 160,
    spread: 90,
    origin: { y: 0.6 },
    colors: COLORS,
    scalar: 1.1,
  });
}

export async function heartBurst(x: number, y: number) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const heart = confetti.shapeFromText
    ? confetti.shapeFromText({ text: "❤️", scalar: 2 })
    : undefined;
  confetti({
    particleCount: 40,
    spread: 70,
    startVelocity: 30,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: COLORS,
    shapes: heart ? [heart] : undefined,
    scalar: heart ? 2 : 1,
  });
}

export async function fireworks(durationMs = 6000) {
  if (typeof window === "undefined") return;
  const confetti = (await import("canvas-confetti")).default;
  const end = Date.now() + durationMs;
  const frame = () => {
    confetti({
      particleCount: 6,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
    });
    confetti({
      particleCount: 6,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
    });
    if (Math.random() > 0.7) {
      confetti({
        particleCount: 30,
        spread: 360,
        startVelocity: 35,
        origin: { x: Math.random(), y: Math.random() * 0.5 },
        colors: COLORS,
      });
    }
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

export async function bigCelebration() {
  await Promise.all([fireConfetti(), fireworks(8000)]);
}