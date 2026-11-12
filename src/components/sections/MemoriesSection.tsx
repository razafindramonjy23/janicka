"use client";

import { useState } from "react";
import { PhotoCarousel } from "@/components/ui/PhotoCarousel";
import { PhotoLightbox } from "@/components/ui/PhotoLightbox";
import { Reveal } from "@/components/ui/RevealAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sections } from "@/data/content";
import { memories } from "@/data/memories";

export function MemoriesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const s = sections.memories;

  return (
    <section id="souvenirs" aria-labelledby="memories-title" className="scroll-mt-4 overflow-hidden bg-white py-28 sm:py-36">
      <SectionHeading
        id="memories-title"
        index={s.index}
        eyebrow={s.eyebrow}
        title={s.title}
        titleAccent={s.titleAccent}
        subtitle={s.subtitle}
        className="px-5"
      />

      <Reveal className="mt-16 sm:mt-20" y={40} amount={0.15}>
        <PhotoCarousel items={memories} onOpen={setOpenIndex} />
      </Reveal>

      <PhotoLightbox
        items={memories}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onChange={setOpenIndex}
      />
    </section>
  );
}
