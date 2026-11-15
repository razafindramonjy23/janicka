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
    image: "/images/premiere-randonnee.jpg",
    alt: "Nous deux assis sur un rocher, face au lac",
    date: "Lac Andranotoraha",
    caption: "Assis au bord de l’eau, sans rien dire. Je n’avais besoin de rien d’autre.",
    layout: "featured",
    focus: "50% 70%",
  },
  {
    id: 2,
    image: "/images/memory-02.jpg",
    alt: "Nous deux après l’église",
    date: "Après l’église",
    caption: "Le cœur léger, et toi tout près de moi.",
    layout: "polaroid",
  },
  {
    id: 3,
    image: "/images/memory-03.jpg",
    alt: "Toi sur le ponton, entre les cocotiers",
    date: "Toi, tout simplement",
    caption: "Tu avances, et tout le décor devient un détail.",
    layout: "editorial",
  },
  {
    id: 4,
    image: "/images/memory-04.jpg",
    alt: "Nous deux en train de faire des grimaces",
    date: "Nos grimaces",
    caption: "On ne sait pas poser sérieusement. Tant mieux.",
    layout: "polaroid",
    focus: "50% 55%",
  },
  {
    id: 5,
    image: "/images/memory-05.jpg",
    alt: "Nous deux debout devant le lac",
    date: "Au bord du lac",
    caption: "Une longue montée, et cette vue rien que pour nous deux.",
    layout: "editorial",
  },
  {
    id: 6,
    image: "/images/memory-06.jpg",
    alt: "Nous deux à la salle de sport",
    date: "À la salle",
    caption: "Même les journées les plus dures passent mieux avec toi.",
    layout: "polaroid",
  },
  {
    id: 7,
    image: "/images/memory-07.jpg",
    alt: "Nous deux, tout près l’un de l’autre",
    date: "Juste nous",
    caption: "Mon endroit préféré au monde : à côté de toi.",
    layout: "polaroid",
  },
];
