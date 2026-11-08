import type { Product } from "./types";

// Les applications SenFile. Les textes viennent des pages publiques (docs, sheet, call)
// et de ta description pour poster : ajuste-les librement (TODO).
export const products: Product[] = [
  {
    slug: "docs",
    name: "SenFile Docs",
    short: "Éditeur de documents",
    tagline: "Écrivez, mettez en page, composez.",
    description:
      "Un éditeur qui réunit le texte, l’image, le tableau et le graphique dans un seul document, avec une mise en page soignée par défaut. Pensé pour des rapports, des propositions et des notes prêts à publier.",
    features: [
      {
        title: "Texte riche",
        text: "Titres, listes, citations, alignement et couleurs, avec une frappe fluide.",
      },
      {
        title: "Images et graphiques",
        text: "Glissez une image ou insérez un graphique directement dans le fil du document.",
      },
      {
        title: "Tableaux",
        text: "Tableaux redimensionnables, avec en-têtes et cellules fusionnables.",
      },
    ],
    url: "https://senfile.com",
    accent: "#3B4CCA",
    tint: "#ECEEFB",
  },
  {
    slug: "sheet",
    name: "SenFile Sheet",
    short: "Tableur et analyse",
    tagline: "Vos données, enfin simples.",
    description:
      "Un tableur plus clair et plus rapide à prendre en main : calculs guidés, graphiques en un clic et tableaux de bord. Importez un fichier CSV, Excel ou JSON et travaillez tout de suite.",
    features: [
      {
        title: "Calculez en tapant =",
        text: "Suggestions, aide sur chaque argument et résultat en direct.",
      },
      {
        title: "Recherche Ctrl + K",
        text: "Trouvez n’importe quelle action : doublons, tri, majuscules, graphique.",
      },
      {
        title: "Collez depuis Excel",
        text: "Les en-têtes sont détectés et les décimales respectées, sans réglage.",
      },
    ],
    url: "https://senfile.com/sheet",
    accent: "#1F7A5A",
    tint: "#E8F3EE",
  },
  {
    slug: "call",
    name: "SenFile Call",
    short: "Visioconférence",
    tagline: "Le point net sur vos réunions.",
    description:
      "Un espace de visioconférence pour équipes et webinaires : vidéo, audio, chat et partage d’écran dans une seule pièce, sans compte à créer.",
    features: [
      {
        title: "Vidéo et audio",
        text: "Une grille claire où chaque participant pilote son micro et sa caméra.",
      },
      {
        title: "Partage d’écran",
        text: "Partagez un onglet, une fenêtre ou tout l’écran en un clic, sans plugin.",
      },
      {
        title: "Webinaire",
        text: "Chat, main levée et salle d’attente, de 3 à 50 participants.",
      },
    ],
    url: "https://senfile.com/call",
    accent: "#7A3FD1",
    tint: "#F1EBFB",
  },
  {
    slug: "poster",
    name: "SenFile Poster",
    short: "Affiches et annonces",
    tagline: "Affichez, annoncez, publiez.",
    description:
      "Créez des affiches et des annonces, puis publiez-les en ligne pour qu’elles soient visibles et faciles à partager.",
    features: [
      {
        title: "Affiches",
        text: "Composez une affiche soignée pour un événement ou une campagne.",
      },
      {
        title: "Annonces",
        text: "Rédigez une annonce claire, dans le bon format.",
      },
      {
        title: "Publication",
        text: "Publiez en ligne, puis partagez le lien.",
      },
    ],
    url: "https://senfile.com",
    accent: "#E4572E",
    tint: "#FCEEE8",
  },
];
