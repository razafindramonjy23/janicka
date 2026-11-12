"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import { BirthdayHero } from "@/components/sections/BirthdayHero";
import { FinalSurprise } from "@/components/sections/FinalSurprise";
import { IntroSection } from "@/components/sections/IntroSection";
import { LoveLetter } from "@/components/sections/LoveLetter";
import { MemoriesSection } from "@/components/sections/MemoriesSection";
import { ReasonsSection } from "@/components/sections/ReasonsSection";
import { StoryTimeline } from "@/components/sections/StoryTimeline";
import { MusicPlayer } from "@/components/ui/MusicPlayer";
import { music } from "@/data/content";
import { useAudio } from "@/hooks/useAudio";

type Stage = "intro" | "opening" | "open";

export function Experience() {
  const [stage, setStage] = useState<Stage>("intro");
  const audio = useAudio(music.src);

  // Always start the story from the top.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    if (stage === "open") return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = "";
    };
  }, [stage]);

  const handleOpen = () => {
    setStage("opening");
    // Called inside the click handler, so browsers allow playback.
    if (audio.status !== "unavailable") void audio.play();
  };

  return (
    <MotionConfig reducedMotion="user">
      <main inert={stage !== "open"}>
        <BirthdayHero active={stage !== "intro"} />
        <MemoriesSection />
        <StoryTimeline />
        <ReasonsSection />
        <LoveLetter />
        <FinalSurprise />
      </main>

      {stage !== "open" && <IntroSection onOpen={handleOpen} onDone={() => setStage("open")} />}

      <MusicPlayer audio={audio} title={music.title} artist={music.artist} visible={stage !== "intro"} />
    </MotionConfig>
  );
}
