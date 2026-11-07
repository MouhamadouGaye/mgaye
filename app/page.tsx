import Link from "next/link";
import Hero from "@/components/Hero";
import Counter from "@/components/Counter";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import ContactForm from "@/components/ContactForm";
import Products from "@/components/Products";
import { Services, Projects, Stack, Process } from "@/components/Sections";
import { stats, profile, showClientProjects } from "@/data/site";
import { posts } from "@/data/posts";
import s from "./page.module.css";

export default function Home() {
  return (
    <>
      <Hero />
      <section className={`wrap ${s.stats}`}>
        {stats.map((x, i) => (
          <Reveal key={x.label} delay={i * 100} className={s.stat}>
            <b><Counter to={x.value} suffix={x.suffix} /></b>
            <span>{x.label}</span>
          </Reveal>
        ))}
      </section>
      <Products />
      <Services />
      {showClientProjects && <Projects />}
      <Stack />
      <Process />

      <section id="articles" className={s.blog}>
        <div className="wrap">
          <Reveal className={s.blogHead}>
            <h2>Derniers articles</h2>
            <Link href="/blog" className={s.all}>Tous les articles</Link>
          </Reveal>
          <ul className={s.posts}>
            {posts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 100}>
                <Link href={`/blog/${p.slug}`} className={s.post}>
                  <span className={s.cat}>{p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <small>{new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}, {p.readTime} de lecture</small>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className={s.contact}>
        <div className={`wrap ${s.contactGrid}`}>
          <Reveal>
            <h2>Parlons de votre projet</h2>
            <p>Décrivez votre besoin en quelques lignes. Je vous réponds sous 48 h avec une première analyse et une proposition de cadrage.</p>
            <Magnetic href={`mailto:${profile.email}`} className="light">{profile.email}</Magnetic>
          </Reveal>
          <Reveal delay={150}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
