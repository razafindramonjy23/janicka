/** Notre histoire — modifie librement les dates, titres et textes. `image` est optionnelle. */

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export const timeline: TimelineEvent[] = [
  {
    id: 1,
    date: "7 août 2026",
    title: "Le jour de notre rencontre",
    description:
      "Je ne le savais pas encore, mais tout mon monde allait changer. Tu as souri, et quelque chose en moi a murmuré : c’est elle.",
    image: "/images/memory-03.jpg",
    imageAlt: "L’endroit où l’on s’est rencontrés",
  },
  {
    id: 2,
    date: "Quelques semaines plus tard",
    title: "Notre premier rendez-vous",
    description:
      "J’avais tellement le trac que j’en ai oublié ce que je voulais commander. Tu as ri, et plus rien d’autre ne comptait.",
  },
  {
    id: 3,
    date: "Été 2026",
    title: "Notre première aventure",
    description:
      "Des mauvais virages, beaucoup trop de grignotages et le plus beau coucher de soleil. Je me perdrais avec toi n’importe où.",
    image: "/images/memory-01.jpg",
    imageAlt: "Notre premier voyage ensemble",
  },
  {
    id: 4,
    date: "Ce soir-là",
    title: "Un moment que je n’oublierai jamais",
    description:
      "Tu m’as pris la main sans rien dire, et j’ai enfin compris ce que voulait dire « se sentir chez soi ».",
  },
  {
    id: 5,
    date: "Aujourd’hui",
    title: "Te célébrer",
    description:
      "Une année de plus de toi sur cette terre — et j’ai la chance immense d’être à tes côtés pour la fêter.",
    image: "/images/memory-07.jpg",
    imageAlt: "Nous deux aujourd’hui",
  },
];
