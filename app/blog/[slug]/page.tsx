import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import s from "./article.module.css";

export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: `${p.title} | Mouhamadou Gaye`, description: p.excerpt } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  const others = posts.filter((x) => x.slug !== slug);
  return (
    <article className={s.article}>
      <header className={s.header}>
        <Link href="/blog" className={s.back}>Retour au blog</Link>
        <span className={s.cat}>{p.category}</span>
        <h1>{p.title}</h1>
        <p className={s.meta}>{new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}, {p.readTime} de lecture</p>
      </header>
      <div className={s.body}>{p.body.map((t, i) => <p key={i}>{t}</p>)}</div>
      <aside className={s.more}>
        <h2>À lire aussi</h2>
        <ul>{others.map((o) => <li key={o.slug}><Link href={`/blog/${o.slug}`}>{o.title}</Link></li>)}</ul>
        <Link href="/#contact" className={s.cta}>Un projet en tête ? Parlons-en</Link>
      </aside>
    </article>
  );
}
