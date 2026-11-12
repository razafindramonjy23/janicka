"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sections, ui } from "@/data/content";
import { reasons, type Reason } from "@/data/reasons";
import { EASE } from "@/lib/animations";

export function ReasonsSection() {
  const s = sections.reasons;

  return (
    <section aria-labelledby="reasons-title" className="bg-petal/45 px-5 py-28 sm:px-8 sm:py-36">
      <SectionHeading
        id="reasons-title"
        index={s.index}
        eyebrow={s.eyebrow}
        title={s.title}
        titleAccent={s.titleAccent}
        subtitle={s.subtitle}
      />

      <ul className="mx-auto mt-16 grid max-w-5xl gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {reasons.map((reason, i) => (
          <motion.li
            key={reason.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE, delay: (i % 3) * 0.08 }}
          >
            <ReasonCard reason={reason} index={i} />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const [open, setOpen] = useState(false);
  const number = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-pressed={open}
      aria-label={open ? `${reason.title} : ${reason.message}` : ui.reasons.reveal(reason.title)}
      className="group block h-60 w-full cursor-pointer rounded-[1.5rem] text-left [perspective:1200px] sm:h-64"
    >
      <motion.span
        className="relative block h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: open ? 180 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        {/* Front */}
        <span className="absolute inset-0 flex flex-col justify-between rounded-[1.5rem] border border-ink/[0.07] bg-white p-7 transition-[box-shadow,transform] duration-300 [backface-visibility:hidden] group-hover:-translate-y-1 group-hover:shadow-soft">
          <span className="flex items-start justify-between">
            <span className="font-display text-2xl italic text-blush">{number}</span>
            <Heart aria-hidden className="h-4 w-4 text-rose/70 transition-colors duration-300 group-hover:text-rose" strokeWidth={1.5} />
          </span>
          <span>
            <span className="block text-balance font-quote text-[1.7rem] leading-tight text-ink">{reason.title}</span>
            <span className="mt-3 block text-[0.65rem] font-medium uppercase tracking-[0.28em] text-mute-ink">
              {ui.reasons.tapToOpen}
            </span>
          </span>
        </span>

        {/* Back */}
        <span className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col justify-between rounded-[1.5rem] bg-wine p-7 text-cream [backface-visibility:hidden]">
          <Heart aria-hidden className="h-4 w-4 text-blush" fill="currentColor" strokeWidth={0} />
          <span className="block text-pretty font-quote text-[1.45rem] italic leading-snug">{reason.message}</span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-blush">{number} · {reason.title}</span>
        </span>
      </motion.span>
    </button>
  );
}
