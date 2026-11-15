/**
 * Tous les textes du site sont ici.
 * Modifie les prénoms, dates, la lettre et le message final sans toucher aux composants.
 * Astuce typographique : " " = espace insécable (avant « : ? ! » et à l’intérieur des guillemets).
 */

export const site = {
  lang: "fr",
  title: "Pour toi, Janicka",
  description: "Quelques souvenirs, quelques mots et beaucoup d’amour — rien que pour toi.",
  /** Ton prénom, utilisé pour les signatures. */
  myName: "Tahina",
  /** Son prénom et son surnom. */
  herName: "Janicka",
  herNicknames: ["Ja", "Jaja"],
  /** Petite étiquette de date dans la section d’anniversaire. */
  birthdayLabel: "12 · novembre · 2026",
  /** Date de notre rencontre (année, mois 1-12, jour) — sert au compteur de jours du hero. */
  metOn: { year: 2026, month: 7, day: 7 },
};

export const intro = {
  label: "Une petite surprise pour toi, Jaja",
  heading: "Quelqu’un de spécial mérite quelque chose de",
  headingAccent: "spécial.",
  subtitle: "J’ai rassemblé quelques souvenirs, quelques mots et tout ce que je ressens, rien que pour toi.",
  cta: "Ouvre ta surprise",
};

export const hero = {
  eyebrow: "Aujourd’hui, c’est ton jour",
  heading: "Joyeux anniversaire,",
  headingAccent: "Janicka",
  message:
    "Aujourd’hui, tout est pour toi : ton sourire, et toutes ces belles choses qui font de toi la personne que tu es.",
  image: "/images/hero.jpg",
  imageAlt: "Toi, en robe jaune, face à la mer",
  imageCaption: "ma vue préférée",
  /** Compteur : « 97 jours » + cette phrase. */
  togetherUnit: "jours",
  togetherLabel: "à tes côtés, depuis le 7\u00a0juillet\u00a02026",
  cta: "Découvrir nos souvenirs",
};

export const sections = {
  memories: {
    index: "01",
    eyebrow: "Nos souvenirs",
    title: "De petits moments,",
    titleAccent: "des souvenirs infinis.",
    subtitle: "Chaque photo raconte une histoire. Chaque instant me rappelle la chance que j’ai.",
  },
  story: {
    index: "02",
    eyebrow: "Notre histoire",
    title: "Notre histoire, un beau",
    titleAccent: "moment à la fois.",
  },
  reasons: {
    index: "03",
    eyebrow: "Pourquoi toi",
    title: "Ces petites choses",
    titleAccent: "que j’aime chez toi.",
    subtitle: "Touche une carte pour l’ouvrir.",
  },
  letter: {
    index: "04",
    eyebrow: "Une lettre",
    title: "À celle qui m’attendait",
    titleAccent: "sans me connaître…",
  },
};

export const letter = {
  greeting: "Si seulement tu savais…",
  paragraphs: [
    "Pendant que tu écrivais ces mots, j’existais quelque part. Je ne savais même pas à quoi tu ressemblais, qui tu étais, ni même si nos chemins s’étaient déjà croisés sans que nous le sachions.",
    "Tout ce que je savais, c’est que tu étais quelque part dans ce monde et que, tôt ou tard, je finirais par te trouver. Parce que c’est une rencontre que j’avais toujours demandée dans mes prières au Seigneur.",
    "Tu te demandais où j’étais, si j’existais vraiment… Et aujourd’hui, je suis là.",
    "Je ne vais pas prétendre être l’homme parfait que tu imaginais dans tes pensées à cette époque. J’ai mes faiblesses, mes peurs et mes imperfections. Mais je veux être celui qui te prouvera que tu n’as pas attendu pour rien.",
    "J’aurais aimé pouvoir remonter le temps, te prendre dans mes bras au moment où tu écrivais cette lettre et te murmurer : « Patiente encore un peu, je suis quelque part, à quelques pas de chez toi, hihi… Et un jour, nos chemins finiront par se croiser. »",
    "Je ne sais pas ce que l’avenir nous réserve, mais une chose est certaine : je remercie Dieu d’avoir permis à nos chemins de se rencontrer.",
    "Et j’espère qu’un jour, nous aurons le bonheur de nous tenir côte à côte devant l’autel, entourés de nos familles, pour Le remercier ensemble de nous avoir réunis.",
  ],
  closing: "Tu te demandais si j’existais vraiment… Aujourd’hui, j’aimerais être la réponse à toutes ces questions que tu te posais autrefois. ❤️",
  signOff: "À toi, pour toujours,",
};

export const finalSurprise = {
  eyebrow: "05 — Pour toi",
  heading: "Et une dernière chose…",
  hint: "Respire un grand coup. Prête ?",
  cta: "Ouvre ta dernière surprise",
  image: "/images/final-photo.jpg",
  imageAlt: "Notre collage « Toi & Moi » : trois photos de nous, avec quelques mots écrits à la main",
  photoCaption: "toi & moi, toujours",
  message: ["Si je pouvais choisir à nouveau, dans chaque vie,", "je te choisirais encore."],
  closing: "Joyeux anniversaire, mon amour.",
  footer: "Fait main, avec tout mon amour — rien que pour toi.",
  replay: "Tout relire depuis le début",
};

export const music = {
  /** Place ta chanson dans /public/music/our-song.mp3 — le lecteur se masque si le fichier est absent. */
  src: "/music/our-song.mp3",
  title: "Notre chanson",
  artist: "Nom de l’artiste",
};

/** Petits textes d’interface (boutons, libellés pour lecteurs d’écran). */
export const ui = {
  scroll: "Défiler",
  carousel: {
    previous: "Souvenir précédent",
    next: "Souvenir suivant",
    goTo: (n: number) => `Aller au souvenir ${n}`,
    open: (title: string) => `Ouvrir « ${title} » en plein écran`,
    show: (title: string) => `Afficher « ${title} »`,
    /** Gabarit Swiper : {{index}} et {{slidesLength}} sont remplacés automatiquement. */
    slideLabel: "Souvenir {{index}} sur {{slidesLength}}",
  },
  lightbox: {
    close: "Fermer la photo",
    previous: "Photo précédente",
    next: "Photo suivante",
    swipe: "glisse",
    label: (title: string, n: number, total: number) => `${title} — photo ${n} sur ${total}`,
  },
  reasons: {
    tapToOpen: "Touche pour ouvrir",
    reveal: (title: string) => `${title} — découvrir le message`,
  },
  music: {
    play: (title: string) => `Lire « ${title} »`,
    pause: (title: string) => `Mettre « ${title} » en pause`,
  },
};
