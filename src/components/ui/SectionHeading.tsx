import { cn } from "@/lib/cn";
import { Reveal } from "./RevealAnimation";

interface SectionHeadingProps {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  className?: string;
}

/** Editorial chapter heading: "01 — Eyebrow", serif title with an italic accent, quote subtitle. */
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  titleAccent,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("mx-auto max-w-3xl text-center", className)}>
      <Reveal>
        <p className="flex items-center justify-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-mute-ink">
          <span className="font-display text-base normal-case italic tracking-normal text-rose">
            {index}
          </span>
          <span aria-hidden className="h-px w-8 bg-mute/50" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2
          id={id}
          className="mt-5 text-balance font-display text-[clamp(2.1rem,7vw,3.9rem)] leading-[1.06] text-ink"
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <em className="text-rose">{titleAccent}</em>
            </>
          )}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-balance font-quote text-xl italic text-mute-ink sm:text-2xl">
            {subtitle}
          </p>
        </Reveal>
      )}
    </header>
  );
}
