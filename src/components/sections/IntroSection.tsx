"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { intro } from "@/data/content";
import { EASE } from "@/lib/animations";

interface IntroSectionProps {
  /** Called synchronously on click (inside the user gesture — safe to start audio). */
  onOpen: () => void;
  /** Called once the curtain has fully opened. */
  onDone: () => void;
}

const HEART_PATH =
  "M50 86C50 86 12 62 8 36C5 18 18 6 32 8C41 9 47 16 50 23C53 16 59 9 68 8C82 6 95 18 92 36C88 62 50 86 50 86Z";

/**
 * Opening screen. On click: the content dissolves, a fine rose line draws across the seam,
 * then the two cream panels part like an envelope to reveal the birthday hero.
 */
export function IntroSection({ onOpen, onDone }: IntroSectionProps) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    onOpen();
    setOpening(true);
  };

  const panel = { duration: 1.15, ease: EASE, delay: 0.85 };

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="intro-title" className="fixed inset-0 z-50">
      {/* Curtain panels */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1/2 bg-cream"
        animate={{ y: opening ? "-100%" : "0%" }}
        transition={panel}
      />
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2 bg-cream"
        animate={{ y: opening ? "100%" : "0%" }}
        transition={panel}
        onAnimationComplete={() => {
          if (opening) onDone();
        }}
      />

      {/* Seam line */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-px origin-center bg-rose"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={opening ? { scaleX: 1, opacity: [0, 1, 1, 0] } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.35, times: [0, 0.2, 0.7, 1] }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center overflow-hidden px-6 text-center"
        animate={opening ? { opacity: 0, y: -14, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(244,166,184,0.28)_0%,rgba(252,228,236,0.18)_35%,transparent_68%)]"
        />
        <FloatingHearts count={14} variant="petals" />

        {/* Fine-line heart drawn in */}
        <motion.svg
          viewBox="0 0 100 92"
          className="relative h-14 w-14 text-rose sm:h-16 sm:w-16"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.path
            d={HEART_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.2, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>

        <motion.p
          className="relative mt-8 flex items-center gap-3 text-[0.7rem] font-medium whitespace-nowrap uppercase tracking-[0.22em] text-mute-ink sm:tracking-[0.34em]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
        >
          <span aria-hidden className="hidden h-px w-6 bg-mute/50 sm:block" />
          {intro.label}
          <span aria-hidden className="hidden h-px w-6 bg-mute/50 sm:block" />
        </motion.p>

        <motion.h1
          id="intro-title"
          className="relative mt-6 max-w-3xl text-balance font-display text-[clamp(2.35rem,8.5vw,5.25rem)] leading-[1.05] text-ink"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.7 }}
        >
          {intro.heading} <em className="text-rose">{intro.headingAccent}</em>
        </motion.h1>

        <motion.p
          className="relative mt-6 max-w-md text-balance font-quote text-xl italic text-mute-ink sm:text-2xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
        >
          {intro.subtitle}
        </motion.p>

        <motion.div
          className="relative mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="group relative inline-flex h-14 cursor-pointer items-center gap-3 overflow-hidden rounded-full bg-wine px-8 text-[0.95rem] font-medium tracking-wide text-cream shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-rose transition-transform duration-500 ease-out group-hover:translate-x-0"
            />
            <span className="relative">{intro.cta}</span>
            <Heart aria-hidden className="relative h-4 w-4 animate-heartbeat" fill="currentColor" strokeWidth={0} />
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
