"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { ui } from "@/data/content";
import type { AudioControls } from "@/hooks/useAudio";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/cn";

interface MusicPlayerProps {
  audio: AudioControls;
  title: string;
  artist: string;
  visible: boolean;
}

/** Small floating player. Renders nothing when the song file is missing. */
export function MusicPlayer({ audio, title, artist, visible }: MusicPlayerProps) {
  const show = visible && audio.status === "ready";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:right-6 sm:bottom-6"
        >
          <div className="flex items-center gap-3 rounded-full border border-ink/10 bg-white/80 py-1.5 pr-5 pl-1.5 shadow-soft backdrop-blur-md">
            <button
              type="button"
              onClick={audio.toggle}
              aria-label={audio.playing ? ui.music.pause(title) : ui.music.play(title)}
              className="grid h-11 w-11 shrink-0 cursor-pointer place-items-center rounded-full bg-wine text-cream transition-colors duration-200 hover:bg-rose"
            >
              {audio.playing ? (
                <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play className="ml-0.5 h-4 w-4" fill="currentColor" strokeWidth={0} />
              )}
            </button>

            <div className="min-w-0 leading-tight">
              <p className="max-w-[9.5rem] truncate text-sm font-medium text-ink">{title}</p>
              <p className="max-w-[9.5rem] truncate text-xs text-mute-ink">{artist}</p>
            </div>

            <span aria-hidden className={cn("equalizer", audio.playing && "is-playing")}>
              <span />
              <span />
              <span />
              <span />
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
