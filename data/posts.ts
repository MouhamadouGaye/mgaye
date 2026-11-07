import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "limites-du-modele-excel",
    title: "Quand un modèle Excel ne suffit plus",
    category: "Ingénierie financière",
    date: "2026-10-14",
    readTime: "5 min",
    excerpt: "Versions multiples, formules fragiles, aucune trace des hypothèses : les signes qu’il est temps de passer à un vrai outil.",
    body: [
      "Excel reste le meilleur outil de prototypage financier. Le problème commence quand le fichier devient l’outil de production : plusieurs versions circulent, personne n’ose toucher aux formules et les hypothèses ne sont écrites nulle part.",
      "Trois signaux doivent alerter. Le premier : une seule personne comprend le fichier. Le deuxième : les chiffres changent selon qui ouvre le modèle. Le troisième : la mise à jour mensuelle prend plus d’une journée.",
      "La bonne approche n’est pas de tout jeter. On garde la logique financière validée, on la sort dans un code testé, et on laisse Excel ou un tableau de bord afficher les résultats.",
    ],
  },
  {
    slug: "concevoir-un-outil-de-tresorerie",
    title: "Concevoir un outil de trésorerie : par où commencer",
    category: "Conception d’outils",
    date: "2026-09-30",
    readTime: "6 min",
    excerpt: "Les données à collecter, les trois scénarios à modéliser et les erreurs qui rendent une projection inutilisable.",
    body: [
      "Un outil de trésorerie utile répond à une question simple : aurons-nous assez de cash dans trois mois ? Tout le reste est secondaire.",
      "Commencez par les flux certains : salaires, loyers, échéances fiscales. Ajoutez ensuite les encaissements clients avec leur délai de paiement réel, pas le délai contractuel.",
      "Modélisez trois scénarios, et rendez les hypothèses modifiables par les utilisateurs. Un outil que l’on ne peut pas questionner ne sera jamais adopté.",
    ],
  },
  {
    slug: "fastapi-postgresql-outil-interne",
    title: "FastAPI et PostgreSQL : l’ossature d’un outil interne",
    category: "Technologie",
    date: "2026-09-12",
    readTime: "7 min",
    excerpt: "Pourquoi cette combinaison est un excellent point de départ pour un outil métier, et comment la structurer.",
    body: [
      "FastAPI apporte la validation des données et une documentation d’API générée automatiquement. PostgreSQL apporte l’intégrité, les transactions et un excellent support du SQL analytique.",
      "Structurez le projet en trois couches : modèles de données, logique métier, routes. La logique financière vit dans la deuxième couche, testée sans base de données.",
      "Ajoutez dès le début des migrations et un journal des modifications. Dans un contexte financier, savoir qui a changé quoi n’est pas un luxe.",
    ],
  },
];
