"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sections } from "@/data/content";
import { timeline, type TimelineEvent } from "@/data/timeline";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/cn";

export function StoryTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const s = sections.story;

  return (
    <section aria-labelledby="story-title" className="bg-cream px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading id="story-title" index={s.index} eyebrow={s.eyebrow} title={s.title} titleAccent={s.titleAccent} />

      <ol ref={listRef} className="relative mx-auto mt-20 max-w-5xl sm:mt-24">
        {/* Track + progress line */}
        <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-mute/25 md:left-1/2" />
        <motion.span
          aria-hidden
          style={{ scaleY: progress }}
          className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-rose md:left-1/2"
        />

        {timeline.map((event, i) => (
          <TimelineItem key={event.id} event={event} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </ol>
    </section>
  );
}

function TimelineItem({ event, side }: { event: TimelineEvent; side: "left" | "right" }) {
  const isLeft = side === "left";

  return (
    <li className="relative pb-16 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-20 md:pl-0">
      {/* Node */}
      <motion.span
        aria-hidden
        className="absolute top-1 left-0 grid h-10 w-10 place-items-center rounded-full border border-rose/30 bg-cream text-rose md:left-1/2 md:-translate-x-1/2"
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <Heart className="h-3.5 w-3.5" fill="currentColor" strokeWidth={0} />
      </motion.span>

      <motion.article
        className={cn(isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2")}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-rose">{event.date}</p>
        <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink sm:text-[2rem]">{event.title}</h3>
        <p className={cn("mt-3 max-w-md text-pretty leading-relaxed text-mute-ink", isLeft && "md:ml-auto")}>
          {event.description}
        </p>

        {event.image && (
          <div
            className={cn(
              "relative mt-6 aspect-[4/3] w-full max-w-sm overflow-hidden rounded-2xl bg-petal",
              isLeft && "md:ml-auto",
            )}
          >
            <Image
              src={event.image}
              alt={event.imageAlt ?? event.title}
              fill
              sizes="(max-width: 768px) 80vw, 384px"
              className="object-cover"
            />
          </div>
        )}
      </motion.article>
    </li>
  );
}
