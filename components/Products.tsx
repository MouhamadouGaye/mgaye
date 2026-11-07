"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { products } from "@/data/products";
import ProductDemo from "./demos";
import s from "./Products.module.css";

const N = products.length;

export default function Products() {
  const track = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = track.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      if (total <= 0) return;
      setProg(Math.min(0.9999, Math.max(0, -r.top / total)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const active = Math.floor(prog * N);
  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / N) * total, behavior: "smooth" });
  };

  return (
    <section id="produits" className={s.section} style={{ "--accent": products[active].accent, "--tint": products[active].tint } as CSSProperties}>
      <div className={`wrap ${s.intro}`}>
        <h2>Quatre applications, en ligne et à essayer</h2>
        <p>SenFile est la suite d’outils que j’ai conçue et que je fais évoluer. Chaque démo ci-dessous est jouable : modifiez, cliquez, testez.</p>
      </div>

      <div ref={track} className={s.track} style={{ "--n": N } as CSSProperties}>
        <div className={s.stage}>
          <div className={`wrap ${s.tabs}`} role="group" aria-label="Applications">
            {products.map((p, i) => {
              const fill = i < active ? 1 : i === active ? prog * N - i : 0;
              return (
                <button key={p.slug} aria-current={i === active} className={s.tab}
                  style={{ "--fill": fill } as CSSProperties} onClick={() => goTo(i)}>
                  {p.name}
                </button>
              );
            })}
          </div>

          <div className={`wrap ${s.panels}`}>
            {products.map((p, i) => (
              <article key={p.slug} className={`${s.panel} ${i === active ? s.on : ""}`}
                style={{ "--accent": p.accent, "--tint": p.tint } as CSSProperties}>
                <div className={s.copy}>
                  <h3>{p.name}</h3>
                  <p className={s.tag}>{p.tagline}</p>
                  <p className={s.desc}>{p.description}</p>
                  <ul className={s.feats}>
                    {p.features.map((f) => <li key={f.title}><b>{f.title}</b> {f.text}</li>)}
                  </ul>
                  <div className={s.actions}>
                    <a className={s.open} href={p.url} target="_blank" rel="noopener noreferrer">Ouvrir l’application</a>
                    <Link className={s.more} href={`/produits/${p.slug}`}>En savoir plus</Link>
                  </div>
                </div>
                <div className={s.demo}><ProductDemo product={p} /></div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
