import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONFIG } from "@/config";
import { LoadingScreen } from "@/components/effects/LoadingScreen";
import { LoginPortal } from "@/components/LoginPortal";
import { AuroraBackground } from "@/components/effects/AuroraBackground";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { FloatingParticles } from "@/components/effects/FloatingParticles";
import { MusicPlayer } from "@/components/effects/MusicPlayer";
import { Navigation } from "@/components/Navigation";
import { Beginning } from "@/components/sections/Beginning";
import { Gallery } from "@/components/sections/Gallery";
import { Timeline } from "@/components/sections/Timeline";
import { Reasons } from "@/components/sections/Reasons";
import { Maze } from "@/components/sections/Maze";
import { Stats } from "@/components/sections/Stats";
import { Messages } from "@/components/sections/Messages";
import { Countdown } from "@/components/sections/Countdown";
import { Dreams } from "@/components/sections/Dreams";
import { Videos } from "@/components/sections/Videos";
import { Finale } from "@/components/sections/Finale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Universe Made For You — A Birthday Surprise" },
      { name: "description", content: "A magical, cinematic love-story experience created as a birthday surprise." },
      { property: "og:title", content: "A Universe Made For You" },
      { property: "og:description", content: "A magical, cinematic love-story experience created as a birthday surprise." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="relative min-h-screen text-foreground">
      <AuroraBackground />
      <CustomCursor />

      <AnimatePresence>
        {loading && <LoadingScreen key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && !unlocked && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <LoginPortal onUnlock={() => setUnlocked(true)} />
        </motion.div>
      )}

      {unlocked && (
        <motion.main
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <FloatingParticles variant="mixed" count={12} className="fixed inset-0 z-0" />
          <Navigation />
          <MusicPlayer autoStart />
          <div className="relative z-10">
            <Beginning />
            <Gallery />
            <Timeline />
            <Reasons />
            <Maze />
            <Stats />
            <Messages />
            <Finale />
            <Dreams />
            <Videos />
            <Countdown />
          </div>
        </motion.main>
      )}

      <noscript>This birthday surprise needs JavaScript enabled. 💖</noscript>
    </div>
  );
}
