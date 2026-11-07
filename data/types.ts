export type Social = { label: string; href: string };
export type Profile = { name: string; status: string; role: string; headline: string; intro: string; email: string; availability: string; socials: Social[] };
export type Stat = { value: number; suffix: string; label: string };
export type Service = { slug: string; title: string; text: string; points: string[] };
export type Project = {
  slug: string; title: string; client: string; year: number; summary: string; tags: string[];
  context: string; solution: string[]; outcomes: string[];
  demoUrl?: string; // lien vers une démo en ligne (facultatif)
  repoUrl?: string; // lien vers le dépôt de code (facultatif)
};
export type StackGroup = { group: string; items: string[] };
export type Step = { title: string; text: string };
export type NavChild = { label: string; desc: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };
export type Post = { slug: string; title: string; category: string; date: string; readTime: string; excerpt: string; body: string[] };
export type ProductFeature = { title: string; text: string };
export type Product = {
  slug: "docs" | "sheet" | "call" | "poster";
  name: string; short: string; tagline: string; description: string;
  features: ProductFeature[];
  url: string;     // adresse réelle de l'application
  accent: string;  // couleur d'accent du produit
  tint: string;    // couleur de fond associée
};
