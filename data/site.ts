import { products } from "./products";
import type {
  Profile,
  Stat,
  Service,
  Project,
  StackGroup,
  Step,
  NavItem,
} from "./types";

// Toutes les données du site sont structurées ici (hardcodées) pour être
// réutilisées telles quelles dans ton stack mouhamadougaye.com.
// ⚠️ Les éléments marqués TODO sont des exemples à remplacer par tes vrais contenus.

export const profile: Profile = {
  name: "Mouhamadou Gaye",
  status: "Auto-entrepreneur",
  role: "Ingénieur financier & logiciel",
  headline:
    "On conçoit les outils financiers que vos équipes utilisent vraiment.",
  intro:
    // "MBA en finance, développeur JavaScript, Python et Java. Je conçois et j’édite SenFile, une suite d’applications en ligne (documents, tableur, visioconférence, affiches), et j’aide les entreprises à bâtir leurs propres outils.",
    "MBA en finance, développeur senior maîtrisant JavaScript, Python et Java, il associe expertise financière et compétences technologiques. Concepteur et éditeur de **SenFile**, une suite d’applications en ligne intégrant des outils de traitement documentaire, de tableur, de visioconférence et de création graphique, il accompagne également les entreprises dans la conception et le développement de solutions numériques sur mesure, adaptées à leurs besoins et à leurs ambitions.",
  email: "contact@mouhamadougaye.com", // TODO
  availability: "Disponible pour de nouvelles missions",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO
    { label: "GitHub", href: "https://github.com/MouhamadouGaye" }, // TODO
  ],
};

export const stats: Stat[] = [
  { value: 4, suffix: "", label: "applications SenFile en ligne, à essayer" },
  {
    value: 3,
    suffix: "",
    label: "langages maîtrisés : JavaScript, Python, Java",
  },
  { value: 48, suffix: " h", label: "délai de réponse à un nouveau projet" },
];

export const services: Service[] = [
  {
    slug: "conception-outils",
    title: "Conception d’outils métier",
    text: "Applications web internes, back-offices et portails clients, conçus avec vos équipes et livrés par itérations courtes.",
    points: [
      "Next.js, FastAPI, PostgreSQL",
      "Interfaces claires, formation incluse",
      "Code documenté et transmissible",
    ],
  },
  {
    slug: "ingenierie-financiere",
    title: "Ingénierie financière",
    text: "Modèles de valorisation, budgets prévisionnels, simulations de scénarios et indicateurs de pilotage.",
    points: [
      "Business plans et prévisionnels",
      "Scénarios et analyses de sensibilité",
      "Reporting automatisé",
    ],
  },
  {
    slug: "automatisation",
    title: "Automatisation des processus",
    text: "Fin des ressaisies : imports, rapprochements, relances et contrôles exécutés sans intervention.",
    points: [
      "Scripts Python planifiés",
      "Connecteurs API et fichiers",
      "Contrôles et alertes",
    ],
  },
  {
    slug: "data-api",
    title: "Data & API",
    text: "Bases de données structurées, pipelines et API pour que vos données circulent entre vos outils.",
    points: [
      "Modélisation PostgreSQL",
      "API REST documentées",
      "Tableaux de bord",
    ],
  },
];

// Passe à true quand tu as de vraies missions clients à montrer (section + pages détail).
export const showClientProjects = false;

// TODO : remplace ces exemples par tes vraies réalisations.
// Chaque projet est cliquable : il ouvre la page /realisations/<slug>.
// Ajoute demoUrl et/ou repoUrl pour afficher des boutons vers la démo ou le code.
export const projects: Project[] = [
  {
    slug: "simulateur-tresorerie",
    title: "Simulateur de trésorerie",
    client: "PME de services",
    year: 2026,
    summary:
      "Projection à 12 mois avec scénarios optimiste, central et prudent, mise à jour depuis les exports comptables.",
    tags: ["Next.js", "Python", "PostgreSQL"],
    context:
      "La direction financière pilotait son cash dans un classeur Excel copié chaque mois, avec des écarts entre versions et aucune trace des hypothèses.",
    solution: [
      "Import automatique des exports comptables et bancaires",
      "Trois scénarios modifiables par les utilisateurs",
      "Historique des hypothèses et comparaison entre deux versions",
      "Tableau de bord web avec alertes de seuil de trésorerie",
    ],
    outcomes: [
      "Une seule source de vérité pour toute l’équipe",
      "Mise à jour mensuelle ramenée de plusieurs heures à quelques minutes",
      "Décisions de financement documentées",
    ],
    // demoUrl: "https://...",
  },
  {
    slug: "moteur-valorisation",
    title: "Moteur de valorisation",
    client: "Cabinet de conseil",
    year: 2025,
    summary:
      "Outil de DCF et de multiples avec historique des hypothèses et export du rapport en PDF.",
    tags: ["Java", "Spring Boot", "API REST"],
    context:
      "Chaque consultant refaisait son propre modèle de valorisation, ce qui rendait les rapports difficiles à comparer et à relire.",
    solution: [
      "Moteur de calcul DCF et multiples testé unitairement",
      "API REST consommée par l’interface du cabinet",
      "Bibliothèque d’hypothèses partagée et versionnée",
      "Génération automatique du rapport PDF",
    ],
    outcomes: [
      "Méthodologie homogène entre les dossiers",
      "Calculs vérifiables et reproductibles",
      "Relecture des rapports plus rapide",
    ],
  },
  {
    slug: "rapprochement-bancaire",
    title: "Rapprochement bancaire automatique",
    client: "Distributeur",
    year: 2025,
    summary:
      "Lecture des relevés, appariement des écritures et file d’exceptions à valider par la comptabilité.",
    tags: ["Python", "FastAPI"],
    context:
      "Le rapprochement bancaire mobilisait deux comptables plusieurs jours par mois, pour une majorité d’écritures évidentes.",
    solution: [
      "Lecture des relevés aux formats courants",
      "Appariement par montant, date et référence",
      "File d’exceptions à valider en un clic",
      "Journal complet des décisions pour l’audit",
    ],
    outcomes: [
      "Les comptables ne traitent plus que les cas ambigus",
      "Traçabilité complète pour les commissaires aux comptes",
    ],
  },
  {
    slug: "tableau-de-bord-pilotage",
    title: "Tableau de bord de pilotage",
    client: "Scale-up",
    year: 2026,
    summary:
      "Marge, cash, ARR et délais de paiement dans une seule vue, alimentée par plusieurs sources.",
    tags: ["JavaScript", "PostgreSQL"],
    context:
      "Les indicateurs clés vivaient dans quatre outils différents et étaient assemblés à la main avant chaque comité de direction.",
    solution: [
      "Entrepôt PostgreSQL alimenté chaque nuit",
      "Indicateurs définis une fois, utilisés partout",
      "Vues par équipe avec droits d’accès",
      "Export automatique du support de comité",
    ],
    outcomes: [
      "Mêmes chiffres pour toutes les équipes",
      "Préparation du comité de direction sans ressaisie",
    ],
  },
];

export const stack: StackGroup[] = [
  { group: "Langages", items: ["JavaScript", "Python", "Java", "SQL"] },
  {
    group: "Web & API",
    items: ["Next.js", "React", "FastAPI", "Spring Boot", "Node.js"],
  },
  {
    group: "Données",
    items: ["PostgreSQL", "pandas", "Excel avancé", "Power BI"],
  },
  {
    group: "Finance",
    items: [
      "Valorisation",
      "Budget & forecast",
      "Gestion des risques",
      "Analyse financière",
    ],
  },
  {
    group: "Livraison",
    items: ["Docker", "Git", "CI/CD", "Tests automatisés"],
  },
];

export const process: Step[] = [
  {
    title: "Cadrage",
    text: "Un atelier pour comprendre le besoin, les données disponibles et ce qui définit le succès.",
  },
  {
    title: "Prototype",
    text: "Une première version cliquable sous deux semaines, testée par vos futurs utilisateurs.",
  },
  {
    title: "Livraison",
    text: "Mise en production, documentation et formation de vos équipes.",
  },
  {
    title: "Suivi",
    text: "Corrections, évolutions et support, au forfait ou à la demande.",
  },
];

export const nav: NavItem[] = [
  {
    label: "Services",
    href: "/#services",
    children: services.map((s) => ({
      label: s.title,
      desc: s.text.split(".")[0],
      href: "/#services",
    })),
  },
  {
    label: "Produits",
    href: "/#produits",
    children: [
      ...products.map((p) => ({
        label: p.name,
        desc: p.short,
        href: `/produits/${p.slug}`,
      })),
      ...(showClientProjects
        ? projects.map((p) => ({
            label: p.title,
            desc: p.client,
            href: `/realisations/${p.slug}`,
          }))
        : []),
      { label: "Méthode", desc: "Du cadrage au suivi", href: "/#methode" },
      {
        label: "Technologies",
        desc: "Langages et outils utilisés",
        href: "/#stack",
      },
    ],
  },
  {
    label: "Ressources",
    href: "/blog",
    children: [
      {
        label: "Tous les articles",
        desc: "Finance, outils et technologie",
        href: "/blog",
      },
      {
        label: "Derniers articles",
        desc: "Sur la page d’accueil",
        href: "/#articles",
      },
    ],
  },
  { label: "Contact", href: "/#contact" },
];
