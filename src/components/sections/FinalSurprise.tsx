"use client";

import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { finalSurprise, site } from "@/data/content";
import { EASE } from "@/lib/animations";

const COLORS = ["#F4A6B8", "#FCE4EC", "#B4233A", "#FFFFFF", "#E58FA4"];
const HEART_SHAPE_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.6 2.7 4.5 6.6 4.1c2.2-.2 4 1 5.4 2.9 1.4-1.9 3.2-3.1 5.4-2.9 3.9.4 5.7 4.5 4.2 7.7C19.5 16.4 12 21 12 21z";

function celebrate() {
  const heart = confetti.shapeFromPath({ path: HEART_SHAPE_PATH });
  const base = {
    colors: COLORS,
    shapes: [heart, "circle"] as confetti.Shape[],
    scalar: 1.1,
    ticks: 260,
    disableForReducedMotion: true,
    zIndex: 70,
  };
  confetti({ ...base, particleCount: 90, spread: 80, startVelocity: 42, origin: { x: 0.5, y: 0.6 } });
  window.setTimeout(() => {
    confetti({ ...base, particleCount: 50, angle: 60, spread: 60, origin: { x: 0, y: 0.75 } });
    confetti({ ...base, particleCount: 50, angle: 120, spread: 60, origin: { x: 1, y: 0.75 } });
  }, 280);
}

export function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  const open = () => {
    setRevealed(true);
    celebrate();
  };

  return (
    <section
      aria-labelledby="final-title"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-wine px-5 pt-28 pb-10 text-cream sm:px-8"
    >
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -z-10 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(180,35,58,0.55),transparent_65%)]"
      />
      {revealed && <FloatingHearts count={18} variant="hearts" tone="text-blush" className="-z-10" />}

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center text-center">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.32em] text-blush">{finalSurprise.eyebrow}</p>
        <h2 id="final-title" className="mt-5 font-display text-[clamp(2.4rem,8vw,4.5rem)] italic leading-[1.05]">
          {finalSurprise.heading}
        </h2>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="cta"
              className="mt-10 flex flex-col items-center"
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.3 } }}
            >
              <p className="font-quote text-xl italic text-cream/75">{finalSurprise.hint}</p>
              <button
                type="button"
                onClick={open}
                className="group mt-8 inline-flex h-14 cursor-pointer items-center gap-3 rounded-full bg-cream px-8 font-medium tracking-wide text-wine shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white active:translate-y-0"
              >
                {finalSurprise.cta}
                <Heart aria-hidden className="h-4 w-4 animate-heartbeat text-rose" fill="currentColor" strokeWidth={0} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              className="mt-12 flex flex-col items-center"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.35, delayChildren: 0.2 } } }}
            >
              <motion.figure
                variants={{
                  hidden: { opacity: 0, y: 40, rotate: 6, scale: 0.9 },
                  show: { opacity: 1, y: 0, rotate: -2, scale: 1, transition: { duration: 1.4, ease: EASE } },
                }}
                className="w-[86vw] max-w-[420px] bg-white p-3 pb-12 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]"
              >
                <div className="relative aspect-[1214/1295] overflow-hidden bg-petal">
                  <Image
                    src={finalSurprise.image}
                    alt={finalSurprise.imageAlt}
                    fill
                    sizes="(max-width: 520px) 86vw, 420px"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-3 font-script text-3xl text-wine">{finalSurprise.photoCaption}</figcaption>
              </motion.figure>

              <div aria-live="polite" className="mt-14">
                {finalSurprise.message.map((m, i) => (
                  <motion.p
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.3, ease: EASE } },
                    }}
                    className={
                      i === finalSurprise.message.length - 1
                        ? "mt-2 font-display text-[clamp(2.1rem,7vw,3.6rem)] italic leading-tight text-blush"
                        : "text-balance font-quote text-[clamp(1.4rem,4.5vw,2rem)] italic leading-snug text-cream/90"
                    }
                  >
                    {m}
                  </motion.p>
                ))}
                <motion.p
                  variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 1.2 } } }}
                  className="mt-8 font-quote text-xl italic text-cream/80"
                >
                  {finalSurprise.closing}
                </motion.p>
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 1.2 } } }}
                  className="mt-3 font-script text-5xl text-blush sm:text-6xl"
                >
                  {site.myName}
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mx-auto mt-20 flex w-full max-w-5xl flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/70 sm:flex-row">
        <p>{finalSurprise.footer}</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-3 transition-colors duration-200 hover:text-cream"
        >
          {finalSurprise.replay}
          <ArrowUp aria-hidden className="h-3.5 w-3.5" />
        </button>
      </footer>
    </section>
  );
}
