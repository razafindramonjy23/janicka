"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type AudioStatus = "checking" | "ready" | "unavailable";

export interface AudioControls {
  status: AudioStatus;
  playing: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
}

/**
 * Background music that never autoplays: `play()` must be called from a user gesture.
 * If the file is missing or can't be decoded, `status` becomes "unavailable".
 */
export function useAudio(src: string, volume = 0.55): AudioControls {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<AudioStatus>("checking");
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = "metadata";
    audio.volume = volume;

    const onReady = () => setStatus("ready");
    const onError = () => {
      setStatus("unavailable");
      setPlaying(false);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    audio.addEventListener("loadedmetadata", onReady);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.src = src;
    audioRef.current = audio;

    return () => {
      audio.removeEventListener("loadedmetadata", onReady);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.pause();
      audioRef.current = null;
    };
  }, [src, volume]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch {
      // Blocked by the browser or file missing — the player simply stays paused.
      setPlaying(false);
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void play();
    else audio.pause();
  }, [play]);

  return { status, playing, play, pause, toggle };
}
