"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ui } from "@/data/content";
import type { Memory } from "@/data/memories";
import { cn } from "@/lib/cn";

interface PhotoCarouselProps {
  items: Memory[];
  onOpen: (index: number) => void;
}

const CARD_WIDTH: Record<Memory["layout"], string> = {
  featured: "w-[84vw] max-w-[560px]",
  polaroid: "w-[70vw] max-w-[340px]",
  editorial: "w-[64vw] max-w-[320px]",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function PhotoCarousel({ items, onOpen }: PhotoCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);

  const handleSlideClick = (index: number) => {
    if (!swiper) return;
    if (index === active) {
      swiper.autoplay?.stop();
      onOpen(index);
    } else {
      swiper.slideToLoop(index);
    }
  };

  return (
    <div className="memories">
      <Swiper
        modules={[A11y, Autoplay]}
        onSwiper={setSwiper}
        onSlideChange={(s) => setActive(s.realIndex)}
        slidesPerView="auto"
        centeredSlides
        loop
        spaceBetween={20}
        speed={reduceMotion ? 0 : 800}
        grabCursor
        autoplay={
          reduceMotion ? false : { delay: 4800, disableOnInteraction: true, pauseOnMouseEnter: true }
        }
        a11y={{
          prevSlideMessage: ui.carousel.previous,
          nextSlideMessage: ui.carousel.next,
          slideLabelMessage: ui.carousel.slideLabel,
        }}
        breakpoints={{ 768: { spaceBetween: 40 } }}
        className="!overflow-visible"
      >
        {items.map((memory, i) => (
          <SwiperSlide key={memory.id} className="!w-auto">
            <MemoryCard memory={memory} index={i} isActive={i === active} onClick={() => handleSlideClick(i)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls: counter · dots · arrows */}
      <div className="mx-auto mt-12 flex max-w-5xl items-center justify-between gap-6 px-5 sm:px-8">
        <p className="font-display text-sm tabular-nums text-mute-ink" aria-live="polite">
          <span className="text-lg italic text-rose">{pad(active + 1)}</span>
          <span className="mx-1.5">/</span>
          {pad(items.length)}
        </p>

        <div className="hidden items-center gap-1 sm:flex">
          {items.map((m, i) => (
            <button
              key={m.id}
              type="button"
              onClick={() => swiper?.slideToLoop(i)}
              aria-label={ui.carousel.goTo(i + 1)}
              aria-current={i === active}
              className="group grid h-11 w-7 cursor-pointer place-items-center"
            >
              <span
                className={cn(
                  "block h-[3px] rounded-full transition-all duration-500",
                  i === active ? "w-6 bg-rose" : "w-2 bg-mute/40 group-hover:bg-mute",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            aria-label={ui.carousel.previous}
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:border-rose hover:bg-rose hover:text-cream"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            aria-label={ui.carousel.next}
            className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/15 text-ink transition-colors duration-200 hover:border-rose hover:bg-rose hover:text-cream"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface MemoryCardProps {
  memory: Memory;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

function MemoryCard({ memory, index, isActive, onClick }: MemoryCardProps) {
  const label = isActive ? ui.carousel.open(memory.date) : ui.carousel.show(memory.date);
  const image = (
    <Image
      src={memory.image}
      alt={memory.alt}
      fill
      sizes="(max-width: 768px) 84vw, 560px"
      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      style={memory.focus ? { objectPosition: memory.focus } : undefined}
      priority={index === 0}
    />
  );

  if (memory.layout === "polaroid") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn("memory-card group block cursor-pointer text-left", CARD_WIDTH.polaroid)}
      >
        <figure
          className={cn(
            "bg-white p-3 pb-5 shadow-soft transition-transform duration-700 sm:p-4",
            index % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]",
            isActive && "rotate-0",
          )}
        >
          <div className="relative aspect-square overflow-hidden bg-petal">
            {image}
            <ZoomHint visible={isActive} />
          </div>
          <figcaption className="px-1 pt-4">
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.28em] text-rose">
              {memory.date}
            </span>
            <span className="mt-1 block font-script text-[1.9rem] leading-tight text-ink">
              {memory.caption}
            </span>
          </figcaption>
        </figure>
      </button>
    );
  }

  const aspect = memory.layout === "featured" ? "aspect-[3/2]" : "aspect-[4/5]";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn("memory-card group block cursor-pointer text-left", CARD_WIDTH[memory.layout])}
    >
      <figure>
        <div className={cn("relative overflow-hidden rounded-[1.25rem] bg-petal", aspect)}>
          {image}
          <ZoomHint visible={isActive} />
        </div>
        <figcaption className="mt-4 flex items-baseline gap-4">
          <span className="font-display text-sm italic text-mute">{pad(index + 1)}</span>
          <span>
            <span className="block text-[0.65rem] font-medium uppercase tracking-[0.28em] text-rose">
              {memory.date}
            </span>
            <span className="mt-1 block font-quote text-xl italic leading-snug text-ink">
              {memory.caption}
            </span>
          </span>
        </figcaption>
      </figure>
    </button>
  );
}

function ZoomHint({ visible }: { visible: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/85 text-wine backdrop-blur transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0",
      )}
    >
      <Expand className="h-3.5 w-3.5" strokeWidth={1.75} />
    </span>
  );
}
