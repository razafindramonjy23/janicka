/** Notre histoire — modifie librement les dates, titres et textes. `image` est optionnelle. */

export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  /** Optionnel : position du recadrage (CSS object-position), ex. "50% 30%". */
  focus?: string;
}

export const timeline: TimelineEvent[] = [
  {
    id: 1,
    date: "7 juillet 2026",
    title: "Le jour de notre rencontre",
    description:
      "Je ne le savais pas encore, mais tout mon monde allait changer. Tu as souri, et quelque chose en moi a murmuré : c’est elle.",
    image: "/images/rencontre.jpg",
    imageAlt: "Nous deux, au tout début",
  },
  {
    id: 2,
    date: "8 août 2026",
    title: "Tu es venue à mon concert",
    description:
      "Un mois à peine après notre rencontre, tu étais là, dans le public. Parmi tous ces visages, c’est le tien que je cherchais — et chaque note, ce soir-là, avait un peu ton nom.",
    image: "/images/concert.jpg",
    imageAlt: "Nous deux le soir de mon concert",
    focus: "50% 12%",
  },
  {
    id: 3,
    date: "9 août 2026",
    title: "Notre première randonnée",
    description:
      "Des sentiers qui grimpent, des pauses pour reprendre notre souffle, et ton rire tout au long du chemin. Ce jour-là, j’ai su que je te suivrais n’importe où.",
    image: "/images/premiere-randonnee.jpg",
    imageAlt: "Nous deux au bord du lac Andranotoraha",
    focus: "50% 72%",
  },
  {
    id: 4,
    date: "8 novembre 2026",
    title: "Prier ensemble",
    description:
      "Nos mains jointes, nos cœurs tournés dans la même direction. Ce moment-là m’a touché plus que je ne saurais le dire — merci à Dieu de t’avoir mise sur mon chemin.",
    image: "/images/priere.jpg",
    imageAlt: "Nos mains jointes",
  },
  {
    id: 5,
    date: "Aujourd’hui",
    title: "Te célébrer",
    description:
      "Une année de plus de toi sur cette terre — et j’ai la chance immense d’être à tes côtés pour la fêter.",
    image: "/images/memory-02.jpg",
    imageAlt: "Nous deux aujourd’hui",
  },
];
