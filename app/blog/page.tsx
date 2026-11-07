import Link from "next/link";
import type { CSSProperties } from "react";
import { posts } from "@/data/posts";
import s from "./blog.module.css";

export const metadata = { title: "Blog | Mouhamadou Gaye", description: "Articles sur l’ingénierie financière, la conception d’outils et la technologie." };

export default function Blog() {
  return (
    <div className={`wrap ${s.page}`}>
      <h1 className={s.title}>Le blog</h1>
      <p className={s.lead}>Ingénierie financière, conception d’outils et technologie, expliquées simplement.</p>
      <ul className={s.list}>
        {posts.map((p, i) => (
          <li key={p.slug} style={{ "--i": i } as CSSProperties}>
            <Link href={`/blog/${p.slug}`} className={s.row}>
              <span className={s.meta}>{p.category}<br />{new Date(p.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span><h2>{p.title}</h2><p>{p.excerpt}</p></span>
              <span className={s.time}>{p.readTime}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
