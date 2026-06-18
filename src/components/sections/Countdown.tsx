import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { CONFIG } from "@/config";
import { SectionWrap, SectionTitle } from "./SectionWrap";
import { FloatingParticles } from "../effects/FloatingParticles";

// ─── Easing & physics constants ───────────────────────────────────────────────
const SILK   = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring", stiffness: 280, damping: 26, mass: 0.9 } as const;

// ─── Time diff helper ─────────────────────────────────────────────────────────
function diff(target: number) {
  const d = Math.max(0, target - Date.now());
  return {
    days:    Math.floor(d / 86400000),
    hours:   Math.floor((d / 3600000) % 24),
    minutes: Math.floor((d / 60000) % 60),
    seconds: Math.floor((d / 1000) % 60),
  };
}

// ─── Single animating digit with a drum-roll flip ─────────────────────────────
function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-flex h-[1.1em] items-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block leading-none"
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)", rotateX: 60 }}
          animate={{ y: "0%",   opacity: 1, filter: "blur(0px)", rotateX: 0  }}
          exit={{    y: "-100%", opacity: 0, filter: "blur(4px)", rotateX: -50 }}
          transition={SPRING}
          style={{ display: "inline-block" }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

// Two-digit display with individual digit animation
function FlipNumber({ value }: { value: number }) {
  const [tens, ones] = String(value).padStart(2, "0").split("");
  return (
    <span
      className="inline-flex gap-[0.04em] tabular-nums"
      style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
    >
      <Digit value={tens} />
      <Digit value={ones} />
    </span>
  );
}

// ─── Animated separator dot ───────────────────────────────────────────────────
function Separator() {
  return (
    <motion.span
      className="mb-4 self-end pb-2 text-2xl font-thin text-white/20 sm:text-4xl"
      animate={{ opacity: [0.15, 0.7, 0.15] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      ·
    </motion.span>
  );
}

// ─── Individual countdown tile ────────────────────────────────────────────────
function Tile({
  label,
  value,
  index,
}: {
  label: string;
  value: number;
  index: number;
}) {
  // Subtle magnetic hover
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-30, 30], [4, -4]);
  const rotateY = useTransform(x, [-30, 30], [-4, 4]);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const tileRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = tileRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width  / 2);
    y.set(e.clientY - rect.top  - rect.height / 2);
  }
  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={tileRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 48, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ ...SILK, duration: 0.75, delay: 0.1 + index * 0.09, ease: SILK }}
      whileHover={{ scale: 1.045 }}
      className="group relative flex flex-col items-center justify-center"
    >
      {/* Glow bloom behind tile */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: "radial-gradient(ellipse at 50% 80%, rgba(212,175,55,0.18) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Card face */}
      <div
        className="relative flex flex-col items-center justify-center rounded-2xl border border-white/[0.07] px-4 pb-4 pt-5 sm:px-7 sm:pb-5 sm:pt-6"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          boxShadow: "0 2px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Top shimmer line */}
        <span
          className="pointer-events-none absolute inset-x-4 top-0 h-px rounded-full"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        />

        {/* The number */}
        <span
          className="text-4xl font-bold leading-none tracking-tight text-white sm:text-6xl"
          style={{ textShadow: "0 0 40px rgba(212,175,55,0.35)" }}
        >
          <FlipNumber value={value} />
        </span>

        {/* Label */}
        <motion.span
          className="mt-2.5 text-[9px] uppercase tracking-[0.28em] sm:text-[10px]"
          style={{ color: "rgba(212,175,55,0.7)" }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
}

// ─── Balloon with natural drift ───────────────────────────────────────────────
const BALLOONS = ["🎈", "🎀", "🎈", "✨", "🎈"];

function Balloon({ index }: { index: number }) {
  const xPath = index % 2 === 0
    ? [0, 18, -12, 20, 0]
    : [0, -20, 14, -18, 0];

  return (
    <motion.span
      className="pointer-events-none absolute text-3xl sm:text-4xl"
      style={{ left: `${8 + index * 21}%`, bottom: "-8%" }}
      animate={{
        y:       [0, -(680 + index * 60)],
        x:       xPath,
        opacity: [0, 0.9, 0.9, 0.9, 0],
        rotate:  [0, index % 2 ? 12 : -12, 0],
        scale:   [0.85, 1, 0.95, 1, 0.9],
      }}
      transition={{
        duration: 16 + index * 2.5,
        repeat:   Infinity,
        delay:    index * 2.2,
        ease:     [0.25, 0.46, 0.45, 0.94],
        times:    [0, 0.1, 0.5, 0.9, 1],
      }}
    >
      {BALLOONS[index]}
    </motion.span>
  );
}

// ─── Birthday Message revealed after countdown ────────────────────────────────
function BirthdayMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 mt-14 w-full max-w-xl"
    >
      {/* Glow behind card */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-3xl opacity-40"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.3) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      <div
        className="relative rounded-3xl border border-white/10 p-8 text-left"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Decorative quote */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-6 top-4 select-none font-serif text-7xl leading-none"
          style={{ color: "rgba(212,175,55,0.15)" }}
        >"</span>

        {/* Corner accent */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full"
          style={{ background: "rgba(212,175,55,0.15)", filter: "blur(20px)" }}
        />

        <div className="relative font-serif text-base italic leading-relaxed text-white/90 sm:text-lg whitespace-pre-line">
{`My Gubu Gubu Savi ❤️🎂,
Sarvat pahile, Happy Birthday Bacha! 🎂🥳❤️
Aaj tujha birthday aahe ani kharach sangaycha tar mala kalat nahi ki kutun start karu. 🥹❤️ Karan tujhya baddal bolayla gelo ki words kami padtat ani feelings jast hotat. 💖

Aajcha divas fakt tujha aahe, pan kharach tar aajcha divas majhyasathi pn special aahe. ❤️ Karan ya divshi ti mulgi janmala aali ji pudhe jaun majhya life madhli sarvat important person bannar hoti. 🥹✨

Savi, tu majhya life madhye aali ani saglach halka vatayla lagla. ❤️ Jithe mi ektach sagla handle karaycha prayatna karat hoto, tithe tu sobat rahili ani mala kalala ki "apla" mhanje kay asta. 🫂💕

Tujha hasan 😊, tujha rag 😤❤️, tujha possessive honan 🤭, tujha care karan 🥹 ani kadhikadhi majhyavar chidnan pn 😅... saglach mala khup avadta. Karan te sagla "majhi Savi" aahe. ❤️

Kadhi kadhi mala vatta ki devane kharach extra time gheun tula banavla asel. 😌✨ Karan ekach vyaktit itki sweetness 🍫, care 💕, madness 😂 ani love ❤️ kasa kay asu shakta?

Aaj mi tujhyasathi motha gift deu shakto ki nahi mahit nahi 🎁, pan ek goshta nakki deu shakto... ki jithe jithe majhi garaj asel tithe tithe mi tujhyasobat asen. 🤝❤️

Tujha pratyek smile majhyasathi achievement aahe 😊🏆 ani tujha pratyek ashru mala harvalyasarkha vatato. 🥺❤️ Mhanun nehemi hasta raha, karan tu hasta tevha jag khup sundar vatata. 🌸✨

Mala mahit aahe ki aapan perfect nahi. Kadhikadhi bhandto, misunderstandings hotat, rag yeto. 😅❤️ Pan ek goshta mala khup avadte ki divsacha shevat kuthla hi asla tari aapan ekmekanchech rahto. 🫂💖

Aaj tujha birthday aahe mhanun ek wish karto... 🌠❤️
Tujhya ayushyat je kahi changla aahe te ajun vadhat jao, ani je kahi tension aahe te majhyakade transfer hovo. 😂❤️ Tu fakt happy raha, healthy raha ani nehemi asich cute raha. 🥰✨

Ani ho, age kitihi vadhla tari majhyasathi tu nehemi majhi gubu gubu Savi ch rahnar ahes. 🤭💕🎀

Shevati fakt evdhach sangto...
Tujhyavar prem karan hi majhya ayushyatil sarvat sundar goshta aahe. ❤️🥹

Happy Birthday My Princess, My Best Friend, My Love, My Home, My Gubu Gubu Savi. 🎂👑❤️
I Love You Infinite Times. ❤️♾️🫂

– Tujha Labbu ❤️ 🥹✨💕`}
        </div>

        {/* Signature row */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <span className="h-px w-10" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "rgba(212,175,55,0.8)" }}>Labbu ❤️</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Countdown() {
  // Countdown starts from 10 minutes after page load
  const targetRef = useRef(Date.now() + 10 * 60 * 1000);
  const target = targetRef.current;

  const [time, setTime] = useState(() => diff(target));

  const isDone =
    time.days === 0 &&
    time.hours === 0 &&
    time.minutes === 0 &&
    time.seconds === 0;

  useEffect(() => {
    const update = () => {
      const remaining = diff(target);
      setTime(remaining);
    };

    update();

    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];



  return (
    <SectionWrap id="countdown">
      <FloatingParticles variant="sparkles" count={14} />

      {/* Balloons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {BALLOONS.map((_, i) => <Balloon key={i} index={i} />)}
      </div>

      {/* Ambient gold orb */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.6) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <SectionTitle
        eyebrow="Birthday Countdown"
        title="The Big Day Is Coming"
        subtitle="Counting every second until I get to celebrate you.Wait for 00:00:00 . Something special is coming for you here 🎁"
      />

      {/* Tiles row */}
      <div
        className="relative z-10 flex items-center gap-2 sm:gap-3"
        style={{ perspective: "900px" }}
      >
        {units.map((u, i) => (
          <>
            <Tile key={u.label} label={u.label} value={u.value} index={i} />
            {i < units.length - 1 && <Separator key={`sep-${i}`} />}
          </>
        ))}
      </div>

      {/* Birthday message revealed when countdown ends */}
      <AnimatePresence>
        {isDone && <BirthdayMessage />}
      </AnimatePresence>
    </SectionWrap>
  );
}
