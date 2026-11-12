/**
 * Tous les textes du site sont ici.
 * Modifie les prénoms, dates, la lettre et le message final sans toucher aux composants.
 * Astuce typographique : " " = espace insécable (avant « : ? ! » et à l’intérieur des guillemets).
 */

export const site = {
  lang: "fr",
  title: "Pour toi, mon amour",
  description: "Quelques souvenirs, quelques mots et beaucoup d’amour — rien que pour toi.",
  /** Ton prénom, utilisé pour les signatures. */
  myName: "Tahina",
  /** Petite étiquette de date dans la section d’anniversaire. */
  birthdayLabel: "12 · novembre · 2026",
  /** Date de notre rencontre (année, mois 1-12, jour) — sert au compteur de jours du hero. */
  metOn: { year: 2026, month: 8, day: 7 },
};

export const intro = {
  label: "Une petite surprise pour toi",
  heading: "Quelqu’un de spécial mérite quelque chose de",
  headingAccent: "spécial.",
  subtitle: "J’ai rassemblé quelques souvenirs, quelques mots et tout ce que je ressens, rien que pour toi.",
  cta: "Ouvre ta surprise",
};

export const hero = {
  eyebrow: "Aujourd’hui, c’est ton jour",
  heading: "Joyeux anniversaire,",
  headingAccent: "mon amour",
  message:
    "Aujourd’hui, tout est pour toi : ton sourire, et toutes ces belles choses qui font de toi la personne que tu es.",
  image: "/images/hero.jpg",
  imageAlt: "Ton portrait, tout sourire",
  imageCaption: "ma vue préférée",
  /** Compteur : « 97 jours » + cette phrase. */
  togetherUnit: "jours",
  togetherLabel: "à tes côtés, depuis le 7\u00a0août\u00a02026",
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
    title: "Quelques mots",
    titleAccent: "venus du cœur.",
  },
};

export const letter = {
  greeting: "Mon amour,",
  paragraphs: [
    "Aujourd’hui, c’est ton jour, et je veux simplement que tu saches à quel point tu comptes pour moi.",
    "Chaque souvenir que nous avons créé ensemble a une place toute particulière dans mon cœur.",
    "Merci d’être toi, pour ton sourire, pour ta gentillesse, et pour tous ces petits moments qui rendent notre histoire unique.",
    "J’espère que ce nouveau chapitre t’apportera du bonheur, de belles opportunités, et tout ce que ton cœur désire.",
  ],
  closing: "Joyeux anniversaire, mon amour.",
  signOff: "À toi, pour toujours,",
};

export const finalSurprise = {
  eyebrow: "05 — Pour toi",
  heading: "Et une dernière chose…",
  hint: "Respire un grand coup. Prête ?",
  cta: "Ouvre ta dernière surprise",
  image: "/images/final-photo.jpg",
  imageAlt: "Nous deux, ensemble",
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
