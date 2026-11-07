import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { products } from "@/data/products";
import ProductDemo from "@/components/demos";
import s from "./product.module.css";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  return p ? { title: `${p.name} | Mouhamadou Gaye`, description: p.description } : {};
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const i = products.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = products[i];
  const next = products[(i + 1) % products.length];

  return (
    <article className={s.page} style={{ "--accent": p.accent, "--tint": p.tint } as CSSProperties}>
      <header className={`wrap ${s.header}`}>
        <Link href="/#produits" className={s.back}>Toutes les applications</Link>
        <h1>{p.name}</h1>
        <p className={s.tag}>{p.tagline}</p>
        <p className={s.desc}>{p.description}</p>
        <a className={s.open} href={p.url} target="_blank" rel="noopener noreferrer">Ouvrir l’application</a>
      </header>

      <div className={`wrap ${s.demo}`}><ProductDemo product={p} /></div>

      <div className={`wrap ${s.features}`}>
        <h2>Ce que fait l’application</h2>
        <ul>
          {p.features.map((f) => <li key={f.title}><h3>{f.title}</h3><p>{f.text}</p></li>)}
        </ul>
      </div>

      <nav className={`wrap ${s.next}`} aria-label="Application suivante">
        <Link href={`/produits/${next.slug}`}><span>Application suivante</span><strong>{next.name}</strong></Link>
        <Link href="/#contact" className={s.cta}>Un outil sur mesure ? Parlons-en</Link>
      </nav>
    </article>
  );
}
