import Link from "next/link";
import { services, projects, stack, process } from "@/data/site";
import Reveal from "./Reveal";
import Spotlight from "./Spotlight";
import s from "./Sections.module.css";

const Head = ({ title, text }: { title: string; text?: string }) => (
  <Reveal className={s.head}>
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </Reveal>
);

export function Services() {
  return (
    <section id="services" className={s.section}>
      <div className="wrap">
        <Head title="Pour vos propres outils" text="Je mets la même exigence au service de vos besoins métier." />
        <ul className={s.svcList}>
          {services.map((x, i) => (
            <Reveal as="li" key={x.slug} delay={i * 80}>
              <div className={s.svc}>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
                <ul>{x.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="realisations" className={`${s.section} ${s.dark}`}>
      <div className="wrap">
        <Head title="Réalisations" text="Quelques outils conçus et livrés. Ouvrez un projet pour voir le contexte, la solution et les résultats." />
        <ul className={s.projects}>
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80}>
              <Spotlight className={s.project} tilt={false}>
                <div>
                  <h3><Link href={`/realisations/${p.slug}`} className={s.stretch}>{p.title}</Link></h3>
                  <span className={s.client}>{p.client}, {p.year}</span>
                </div>
                <p>{p.summary}</p>
                <div className={s.side}>
                  <ul className={s.tags}>{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                  <span className={s.go}>
                    Voir le projet
                    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11l6-6M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </span>
                </div>
              </Spotlight>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Stack() {
  const all = stack.flatMap((g) => g.items);
  return (
    <section id="stack" className={s.section}>
      <div className="wrap">
        <Head title="Technologies et compétences" text="Un socle technique solide, associé à une vraie culture financière." />
      </div>
      <div className={s.marquee} aria-hidden="true">
        <div>{[...all, ...all].map((t, i) => <span key={i}>{t}</span>)}</div>
      </div>
      <div className={`wrap ${s.stackGrid}`}>
        {stack.map((g, i) => (
          <Reveal key={g.group} delay={i * 70}>
            <h3>{g.group}</h3>
            <ul>{g.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="methode" className={`${s.section} ${s.tint}`}>
      <div className="wrap">
        <Head title="Une méthode en quatre étapes" />
        <ol className={s.steps}>
          {process.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 140}>
              <span className={s.num}>{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
