# For you, my love

A small, cinematic birthday website — a digital love letter.
Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Swiper · canvas-confetti.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Make it yours (no component changes needed)

| What | Where |
| --- | --- |
| Names, date, intro, hero, letter, final message, song title | `src/data/content.ts` |
| Carousel photos, captions, dates, card style | `src/data/memories.ts` |
| Story timeline | `src/data/timeline.ts` |
| "Little things I love about you" cards | `src/data/reasons.ts` |
| Colors & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

### Photos
Replace the files in `public/images/` keeping the same names (or point the data files to new names):
`hero.jpg`, `memory-01.jpg` … `memory-07.jpg`, `final-photo.jpg`.
Any ratio works — images are cropped to their frame. Use `focus: "50% 30%"` on a memory to choose the crop.
Tip: export at ~1600px on the long side, JPEG quality ~80 — Next.js optimises the rest.

Memory card styles (`layout`): `featured` (wide), `polaroid` (white frame, handwritten caption), `editorial` (tall portrait).

### Music
Drop your song at `public/music/our-song.mp3`. It starts when she clicks **Ouvre ta surprise**
(never before — browsers forbid autoplay). If the file is missing, the player simply doesn't appear.

## Experience
1. Opening screen — the content dissolves and the page opens like an envelope.
2. Birthday hero — arched portrait, editorial typography.
3. Memories — centered carousel (swipe, arrows, dots, gentle autoplay) + fullscreen lightbox (swipe / ← → / Esc).
4. Our story — timeline with a line that draws as you scroll.
5. Little things — cards that flip to reveal a message.
6. The letter — paper texture, wax seal, line-by-line reveal, signature.
7. Final surprise — heart confetti, polaroid reveal, last words.

Respects `prefers-reduced-motion`, keyboard focus, and is designed mobile-first (375 → 1440px).
