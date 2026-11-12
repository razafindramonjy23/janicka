import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface FloatingHeartsProps {
  count?: number;
  variant?: "hearts" | "petals" | "mixed";
  className?: string;
  /** Tailwind text color class, e.g. "text-blush". */
  tone?: string;
}

const HEART =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.6 2.7 4.5 6.6 4.1c2.2-.2 4 1 5.4 2.9 1.4-1.9 3.2-3.1 5.4-2.9 3.9.4 5.7 4.5 4.2 7.7C19.5 16.4 12 21 12 21z";
const PETAL = "M12 2C16 6 18 10 16 15c-1.2 3-3 5-4 7-1-2-2.8-4-4-7C6 10 8 6 12 2z";

/**
 * Deterministic pseudo-random (integer hash, 2 decimals) so server and client render identical
 * markup — Math.sin differs slightly between engines and would break hydration.
 */
function seeded(i: number, salt: number) {
  let h = Math.imul(i + 1, 0x9e3779b1) ^ Math.imul(salt + 1, 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
  h ^= h >>> 13;
  return ((h >>> 0) % 100) / 100;
}

/**
 * Decorative floating hearts / petals, drawn with CSS animations (cheap, GPU-friendly).
 * Hidden entirely for visitors who prefer reduced motion.
 */
export function FloatingHearts({ count = 12, variant = "mixed", className, tone = "text-blush" }: FloatingHeartsProps) {
  return (
    <div aria-hidden className={cn("floaters pointer-events-none absolute inset-0 overflow-hidden", tone, className)}>
      {Array.from({ length: count }, (_, i) => {
        const isHeart = variant === "hearts" || (variant === "mixed" && i % 3 === 0);
        const size = 8 + Math.round(seeded(i, 1) * 14);
        const style = {
          left: `${Math.round(seeded(i, 2) * 96)}%`,
          width: size,
          height: size,
          opacity: (0.25 + seeded(i, 3) * 0.45).toFixed(2),
          "--dur": `${(14 + seeded(i, 4) * 14).toFixed(1)}s`,
          "--delay": `${(-seeded(i, 5) * 24).toFixed(1)}s`,
          "--drift": `${Math.round((seeded(i, 6) - 0.5) * 120)}px`,
          "--spin": `${Math.round((seeded(i, 7) - 0.5) * 360)}deg`,
        } as CSSProperties;
        return (
          <svg key={i} viewBox="0 0 24 24" className="floater" style={style}>
            <path d={isHeart ? HEART : PETAL} fill="currentColor" />
          </svg>
        );
      })}
    </div>
  );
}
