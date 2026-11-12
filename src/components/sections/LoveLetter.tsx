"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { letter, sections, site } from "@/data/content";
import { EASE } from "@/lib/animations";

const line = (i: number) => ({
  initial: { opacity: 0, y: 14, filter: "blur(4px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 1.1, ease: EASE, delay: i * 0.08 },
});

export function LoveLetter() {
  const s = sections.letter;

  return (
    <section aria-labelledby="letter-title" className="bg-cream px-4 py-28 sm:px-8 sm:py-36">
      <SectionHeading id="letter-title" index={s.index} eyebrow={s.eyebrow} title={s.title} titleAccent={s.titleAccent} />

      <motion.article
        className="paper relative mx-auto mt-20 max-w-2xl rounded-[4px] px-7 pt-16 pb-14 shadow-paper sm:mt-24 sm:px-16 sm:pt-20 sm:pb-16"
        initial={{ opacity: 0, y: 40, rotate: 0 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* Wax seal */}
        <span
          aria-hidden
          className="absolute -top-7 left-1/2 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full bg-wine text-blush shadow-[inset_0_-3px_6px_rgba(0,0,0,0.25),0_6px_14px_-6px_rgba(115,29,53,0.6)]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full border border-blush/40">
            <Heart className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          </span>
        </span>

        <motion.p {...line(0)} className="font-script text-[2.6rem] leading-none text-rose sm:text-5xl">
          {letter.greeting}
        </motion.p>

        <div className="mt-8 space-y-6 font-quote text-[1.3rem] leading-[1.75] text-ink sm:text-[1.4rem]">
          {letter.paragraphs.map((p, i) => (
            <motion.p key={i} {...line(i + 1)} className="text-pretty">
              {p}
            </motion.p>
          ))}
          <motion.p {...line(letter.paragraphs.length + 1)} className="italic text-wine">
            {letter.closing}
          </motion.p>
        </div>

        <motion.div {...line(letter.paragraphs.length + 2)} className="mt-12 text-right">
          <p className="font-quote text-xl italic text-mute-ink">{letter.signOff}</p>
          <p className="mt-4 inline-flex items-center gap-3 font-script text-5xl leading-none text-wine sm:text-6xl">
            {site.myName}
            <Heart aria-hidden className="h-5 w-5 text-rose" fill="currentColor" strokeWidth={0} />
          </p>
          <svg aria-hidden viewBox="0 0 220 20" className="mt-1 ml-auto h-4 w-44 text-rose/60">
            <motion.path
              d="M2 14 C 50 4, 90 18, 130 9 S 200 6, 218 11"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.2}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 1.6, ease: "easeInOut", delay: 0.4 }}
            />
          </svg>
        </motion.div>
      </motion.article>
    </section>
  );
}
