"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ui } from "@/data/content";
import type { Memory } from "@/data/memories";
import { EASE } from "@/lib/animations";

interface PhotoLightboxProps {
  items: Memory[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}

const SWIPE_THRESHOLD = 60;

/** Fullscreen photo viewer: Esc / arrows / swipe, focus kept inside while open. */
export function PhotoLightbox({ items, index, onClose, onChange }: PhotoLightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onChange],
  );

  // Focus management + scroll lock
  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open]);

  // Keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Only buttons that are actually rendered (mobile/desktop controls differ).
        const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button")).filter(
          (el) => el.offsetParent !== null,
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  };

  const memory = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {memory && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={ui.lightbox.label(memory.date, index + 1, items.length)}
          className="fixed inset-0 z-[60] flex flex-col bg-[#1d1216]/95 text-cream backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45, ease: EASE } }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 sm:pt-6">
            <p className="font-display text-sm tabular-nums text-cream/70">
              <span className="italic text-blush">{String(index + 1).padStart(2, "0")}</span> /{" "}
              {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={ui.lightbox.close}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-cream/20 transition-colors duration-200 hover:bg-cream hover:text-wine"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={ui.lightbox.previous}
              className="absolute left-6 z-10 hidden h-12 w-12 cursor-pointer place-items-center rounded-full border border-cream/20 transition-colors duration-200 hover:bg-cream hover:text-wine sm:grid"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.figure
                key={memory.id}
                className="flex h-full w-full max-w-4xl cursor-grab flex-col items-center justify-center active:cursor-grabbing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.55, ease: EASE } }}
                exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={onDragEnd}
              >
                <div className="relative h-[62svh] w-full sm:h-[68svh]">
                  <Image
                    src={memory.image}
                    alt={memory.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    className="pointer-events-none object-contain"
                    style={memory.focus ? { objectPosition: memory.focus } : undefined}
                  />
                </div>
                <figcaption className="mt-6 px-2 text-center">
                  <span className="block text-[0.65rem] font-medium uppercase tracking-[0.3em] text-blush">
                    {memory.date}
                  </span>
                  <span className="mt-2 block text-balance font-quote text-2xl italic text-cream sm:text-3xl">
                    {memory.caption}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => go(1)}
              aria-label={ui.lightbox.next}
              className="absolute right-6 z-10 hidden h-12 w-12 cursor-pointer place-items-center rounded-full border border-cream/20 transition-colors duration-200 hover:bg-cream hover:text-wine sm:grid"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center justify-center gap-3 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={ui.lightbox.previous}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-cream/20"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <span className="text-xs text-cream/60">{ui.lightbox.swipe}</span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={ui.lightbox.next}
              className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-cream/20"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
