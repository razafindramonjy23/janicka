/**
 * Contenu du carrousel photo.
 * Remplace les fichiers de /public/images par tes propres photos (n’importe quel format — elles sont recadrées joliment).
 *
 * layout :
 *  - "featured"  → grande carte paysage
 *  - "polaroid"  → photo carrée dans un cadre blanc type instantané, légende manuscrite
 *  - "editorial" → carte portrait, légende en dessous
 */

export type MemoryLayout = "featured" | "polaroid" | "editorial";

export interface Memory {
  id: number;
  image: string;
  alt: string;
  date: string;
  caption: string;
  layout: MemoryLayout;
  /** Optionnel : position du recadrage (CSS object-position), ex. "50% 30%". */
  focus?: string;
}

export const memories: Memory[] = [
  {
    id: 1,
    image: "/images/memory-01.jpg",
    alt: "Nous deux lors de notre première aventure",
    date: "Notre première aventure",
    caption: "Un moment que je garderai toujours dans mon cœur.",
    layout: "featured",
  },
  {
    id: 2,
    image: "/images/memory-02.jpg",
    alt: "Un dimanche matin tout doux, ensemble",
    date: "Un dimanche paresseux",
    caption: "Du café, des plaids et toi. Parfait.",
    layout: "polaroid",
  },
  {
    id: 3,
    image: "/images/memory-03.jpg",
    alt: "Toi dans la lumière dorée du soir",
    date: "L’heure dorée",
    caption: "La lumière était belle. Toi, encore plus.",
    layout: "editorial",
  },
  {
    id: 4,
    image: "/images/memory-04.jpg",
    alt: "Toi, en train de rire",
    date: "Ton rire",
    caption: "Je ferais n’importe quoi pour l’entendre encore et encore.",
    layout: "polaroid",
  },
  {
    id: 5,
    image: "/images/memory-05.jpg",
    alt: "La route pendant notre voyage",
    date: "Le road trip",
    caption: "Des mauvais virages, les meilleurs souvenirs.",
    layout: "featured",
  },
  {
    id: 6,
    image: "/images/memory-06.jpg",
    alt: "Notre dîner en tête-à-tête",
    date: "Dîner pour deux",
    caption: "On est restés jusqu’à ce qu’ils empilent les chaises.",
    layout: "editorial",
  },
  {
    id: 7,
    image: "/images/memory-07.jpg",
    alt: "Nous deux",
    date: "Juste nous",
    caption: "Mon endroit préféré au monde : à côté de toi.",
    layout: "polaroid",
  },
];
