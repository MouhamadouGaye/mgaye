import Link from "next/link";
import { profile, nav } from "@/data/site";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`wrap ${s.grid}`}>
        <div>
          <p className={s.name}>{profile.name}</p>
          <p className={s.role}>{profile.role}, {profile.status.toLowerCase()}</p>
        </div>
        <ul className={s.cols}>
          {nav.map((n) => <li key={n.label}><Link href={n.href}>{n.label}</Link></li>)}
          <li><Link href="/mentions-legales">Mentions légales</Link></li>
          {profile.socials.map((l) => <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a></li>)}
        </ul>
      </div>
      <p className={`wrap ${s.legal}`}>© {new Date().getFullYear()} {profile.name}. Tous droits réservés.</p>
    </footer>
  );
}
