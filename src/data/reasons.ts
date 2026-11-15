/** « Ces petites choses que j’aime chez toi » — chaque carte révèle `message` quand on l’ouvre. */

export interface Reason {
  id: number;
  title: string;
  message: string;
}

export const reasons: Reason[] = [
  {
    id: 1,
    title: "Ton magnifique sourire",
    message:
      "C’est la première chose à laquelle je pense le matin, et la dernière que j’ai envie de voir le soir.",
  },
  {
    id: 2,
    title: "Ta façon de rire",
    message: "Sincère, un peu fort, terriblement contagieux. Il transforme mes pires journées en belles journées.",
  },
  {
    id: 3,
    title: "Ta gentillesse",
    message:
      "Tu me gardes toujours ces petits biscuits que j’aime tant — et c’est dans ces petites attentions, bien plus que dans les grandes, que je te reconnais.",
  },
  {
    id: 4,
    title: "Ta façon de rendre chaque jour spécial",
    message:
      "Un composé avec des nems, une balade, une soirée tranquille — avec toi, tout ressemble à une petite fête.",
  },
  {
    id: 5,
    title: "Ta belle personnalité",
    message: "Curieuse, courageuse, un peu têtue, et tellement, merveilleusement toi.",
  },
  {
    id: 6,
    title: "Le bonheur que tu m’apportes",
    message: "Depuis que tu es dans ma vie, tout est plus léger, plus lumineux, et ressemble enfin à un chez-moi.",
  },
];
