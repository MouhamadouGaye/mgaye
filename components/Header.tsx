"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, profile } from "@/data/site";
import s from "./Header.module.css";

export default function Header() {
  const [open, setOpen] = useState<number | null>(null);
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => { if (root.current && !root.current.contains(e.target as Node)) { setOpen(null); } };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setMenu(false); } };
    const onScroll = () => setScrolled(window.scrollY > 12);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => { setOpen(null); setMenu(false); };

  return (
    <header ref={root} className={`${s.header} ${scrolled ? s.scrolled : ""}`}>
      <div className={`wrap ${s.bar}`}>
        <Link href="/" className={s.brand} onClick={close}>
          <span className={s.mark} aria-hidden="true">MG</span>
          <span>{profile.name}</span>
        </Link>

        <button className={s.burger} aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>
          <i /><i />
        </button>

        <nav className={`${s.nav} ${menu ? s.navOpen : ""}`} aria-label="Navigation principale">
          <ul>
            {nav.map((item, i) => (
              <li
                key={item.label}
                className={s.item}
                onMouseEnter={() => item.children && window.matchMedia("(hover:hover)").matches && setOpen(i)}
                onMouseLeave={() => window.matchMedia("(hover:hover)").matches && setOpen(null)}
              >
                {item.children ? (
                  <>
                    <button className={s.trigger} aria-expanded={open === i} aria-haspopup="true" onClick={() => setOpen(open === i ? null : i)}>
                      {item.label}
                      <svg className={s.caret} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                    <div className={`${s.panel} ${open === i ? s.panelOpen : ""}`}>
                      <ul>
                        {item.children.map((c, k) => (
                          <li key={c.label} style={{ "--k": k } as CSSProperties}>
                            <Link href={c.href} onClick={close} className={s.sub}>
                              <strong>{c.label}</strong>
                              <span>{c.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link href={item.href} className={s.trigger} onClick={close}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
