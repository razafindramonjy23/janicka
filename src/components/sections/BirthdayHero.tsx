"use client";

import { animate, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { FloatingHearts } from "@/components/ui/FloatingHearts";
import { hero, site, ui } from "@/data/content";
import { EASE } from "@/lib/animations";

interface BirthdayHeroProps {
  /** Starts the entrance choreography (true once the intro opens). */
  active: boolean;
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, ease: EASE, delay },
});

/** Whole days since we met, in local time (computed on the client so it is never stale). */
function daysTogether() {
  const { year, month, day } = site.metOn;
  const met = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(0, Math.round((today.getTime() - met.getTime()) / 86_400_000));
}

/** Counts up from 0 to the number of days once the hero is revealed. */
function useDaysCounter(active: boolean) {
  const reduce = useReducedMotion();
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    const target = daysTogether();
    if (reduce) {
      setValue(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 2.2,
      ease: EASE,
      delay: 1.1,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, reduce]);

  return value;
}

export function BirthdayHero({ active }: BirthdayHeroProps) {
  const reduce = useReducedMotion();
  const days = useDaysCounter(active);
  const go = <T extends { animate: object }>(m: T) => ({ ...m, animate: active ? m.animate : undefined });

  const scrollToMemories = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("souvenirs");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden px-5 pt-10 pb-24 sm:px-8 md:pt-20"
    >
      <div
        aria-hidden
        className="absolute -top-40 -right-40 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(244,166,184,0.32),transparent_65%)]"
      />
      <div
        aria-hidden
        className="absolute -bottom-48 -left-48 -z-10 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(244,166,184,0.2),transparent_65%)]"
      />
      <FloatingHearts count={10} variant="petals" className="-z-10" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-12 md:gap-8">
        {/* Text */}
        <div className="md:col-span-6">
          <motion.p
            {...go(rise(0.3))}
            className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-mute-ink"
          >
            <span aria-hidden className="h-px w-8 bg-rose" />
            {hero.eyebrow}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(2.6rem,11vw,4.5rem)] leading-[0.98] tracking-[-0.01em] text-ink md:text-[clamp(3rem,6.4vw,5.5rem)]"
          >
            <motion.span {...go(rise(0.45))} className="block">
              {hero.heading}
            </motion.span>
            <motion.em {...go(rise(0.6))} className="block text-rose">
              {hero.headingAccent}
              <motion.span
                aria-hidden
                className="ml-3 inline-block align-middle"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={active ? { opacity: 1, scale: 1 } : undefined}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: 1.3 }}
              >
                <Heart
                  className="h-[0.42em] w-[0.42em] animate-heartbeat text-rose"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.span>
            </motion.em>
          </h1>

          <motion.p
            {...go(rise(0.8))}
            className="mt-8 max-w-md text-pretty font-quote text-[1.4rem] italic leading-[1.5] text-mute-ink sm:text-2xl"
          >
            {hero.message}
          </motion.p>

          {/* Days together counter */}
          <motion.div {...go(rise(1))} className="mt-10 flex items-center gap-5">
            <p className="flex items-baseline gap-2 text-rose">
              <span className="min-w-[2ch] font-display text-5xl leading-none tabular-nums sm:text-6xl">
                {days ?? "—"}
              </span>
              <span className="font-script text-3xl leading-none">{hero.togetherUnit}</span>
            </p>
            <span aria-hidden className="h-12 w-px bg-rose/25" />
            <p className="max-w-[12rem] text-xs font-medium leading-relaxed tracking-[0.14em] text-mute-ink uppercase">
              {hero.togetherLabel}
            </p>
          </motion.div>

          {/* CTA */}
          <motion.div {...go(rise(1.15))} className="mt-10">
            <a
              href="#souvenirs"
              onClick={scrollToMemories}
              className="group inline-flex items-center gap-3 rounded-full bg-rose px-6 py-3.5 text-sm font-medium tracking-wide text-cream shadow-soft transition-colors duration-300 hover:bg-wine"
            >
              {hero.cta}
              <ArrowDown
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>
          </motion.div>
        </div>

        {/* Portrait — first on mobile so her photo is visible without scrolling */}
        <motion.div
          className="order-first mx-auto w-full max-w-[14rem] sm:max-w-[20rem] md:order-none md:col-span-5 md:col-start-8 md:max-w-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={active ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        >
          <figure className="relative">
            <div aria-hidden className="absolute -inset-3 translate-x-3 translate-y-3 rounded-t-full border border-rose/25" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-petal shadow-soft">
              <Image
                src={hero.image}
                alt={hero.imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 70vw, 460px"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute -bottom-6 -left-6 rotate-[-5deg] rounded-full bg-cream px-5 py-1.5 font-script text-[1.6rem] leading-tight text-wine shadow-paper sm:-left-10 sm:text-[1.85rem]">
              {hero.imageCaption}
            </figcaption>
          </figure>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:flex flex-col items-center gap-3 text-[0.6rem] tracking-[0.35em] text-mute-ink uppercase"
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : undefined}
        transition={{ duration: 1, delay: 1.8 }}
      >
        {ui.scroll}
        <span className="scroll-line" />
      </motion.div>
    </section>
  );
}
