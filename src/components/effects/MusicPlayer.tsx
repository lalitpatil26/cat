import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play, Volume2 } from "lucide-react";
import { CONFIG } from "@/config";

/** Floating glass music control with fade in/out + volume. */
export function MusicPlayer({ autoStart }: { autoStart?: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    const audio = new Audio(CONFIG.music.src);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const step = () => {
      if (!audioRef.current) return;
      const diff = target - audio.volume;
      if (Math.abs(diff) < 0.02) {
        audio.volume = target;
        onDone?.();
        return;
      }
      audio.volume = Math.min(1, Math.max(0, audio.volume + diff * 0.08));
      fadeRef.current = requestAnimationFrame(step);
    };
    step();
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      fadeTo(0, () => audio.pause());
      setPlaying(false);
    } else {
      try {
        await audio.play();
        fadeTo(volume);
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  useEffect(() => {
    if (autoStart) void toggle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoStart]);

  useEffect(() => {
    if (audioRef.current && playing) fadeTo(volume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volume]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="glass-strong flex items-center gap-2 overflow-hidden rounded-full px-4 py-2"
          >
            <Volume2 className="h-4 w-4 text-primary" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1 w-24 cursor-pointer accent-[oklch(0.72_0.2_350)]"
              aria-label="Volume"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((o) => !o)}
        className="glass-strong grid h-11 w-11 place-items-center rounded-full text-gold"
        aria-label="Music settings"
        title="Music settings"
      >
        <Music className={`h-4 w-4 ${playing ? "animate-pulse" : ""}`} />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="grid h-12 w-12 place-items-center rounded-full bg-cosmic text-primary-foreground animate-pulse-glow"
        aria-label={playing ? "Pause music" : "Play music"}
        title={playing ? "Pause music" : "Play romantic music"}
      >
        {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
      </motion.button>
    </div>
  );
}