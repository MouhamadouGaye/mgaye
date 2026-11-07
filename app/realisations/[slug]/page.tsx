import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, showClientProjects } from "@/data/site";
import Magnetic from "@/components/Magnetic";
import s from "./project.module.css";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return showClientProjects ? projects.map((p) => ({ slug: p.slug })) : []; }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: `${p.title} | Mouhamadou Gaye`, description: p.summary } : {};
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className={s.page}>
      <header className={`wrap ${s.header}`}>
        <Link href="/#realisations" className={s.back}>Toutes les réalisations</Link>
        <h1>{p.title}</h1>
        <p className={s.meta}>{p.client}, {p.year}</p>
        <p className={s.summary}>{p.summary}</p>
        <ul className={s.tags}>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
        {(p.demoUrl || p.repoUrl) && (
          <div className={s.actions}>
            {p.demoUrl && <Magnetic href={p.demoUrl} className="primary" target="_blank" rel="noopener noreferrer">Voir la démo</Magnetic>}
            {p.repoUrl && <Magnetic href={p.repoUrl} className="ghost" target="_blank" rel="noopener noreferrer">Voir le code</Magnetic>}
          </div>
        )}
      </header>

      <div className={`wrap ${s.body}`}>
        <section><h2>Contexte</h2><p>{p.context}</p></section>
        <section><h2>Solution</h2><ul>{p.solution.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section><h2>Résultats</h2><ul>{p.outcomes.map((x) => <li key={x}>{x}</li>)}</ul></section>
      </div>

      <nav className={`wrap ${s.next}`} aria-label="Projet suivant">
        <Link href={`/realisations/${next.slug}`}>
          <span>Projet suivant</span>
          <strong>{next.title}</strong>
        </Link>
        <Magnetic href="/#contact" className="primary">Un projet similaire ? Parlons-en</Magnetic>
      </nav>
    </article>
  );
}
