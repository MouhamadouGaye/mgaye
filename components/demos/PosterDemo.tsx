"use client";
import { useState, type CSSProperties } from "react";
import s from "./Demos.module.css";

const COLORS = ["#E4572E", "#2B59FF", "#1F7A5A", "#7A3FD1"];
const TEMPLATES = ["Centré", "Bandeau", "Éditorial"] as const;

export default function PosterDemo() {
  const [head, setHead] = useState("Soirée portes ouvertes");
  const [sub, setSub] = useState("Samedi à 14 h, entrée libre");
  const [tpl, setTpl] = useState(0);
  const [color, setColor] = useState(0);
  const [wide, setWide] = useState(false);
  const [published, setPublished] = useState(false);
  const touch = (fn: () => void) => { fn(); setPublished(false); };

  return (
    <div className={s.posterDemo}>
      <div className={s.pcontrols}>
        <label>Titre<input value={head} maxLength={44} onChange={(e) => touch(() => setHead(e.target.value))} /></label>
        <label>Détails<input value={sub} maxLength={48} onChange={(e) => touch(() => setSub(e.target.value))} /></label>
        <div className={s.seg} role="group" aria-label="Modèle">
          {TEMPLATES.map((t, i) => <button key={t} aria-pressed={tpl === i} onClick={() => touch(() => setTpl(i))}>{t}</button>)}
        </div>
        <div className={s.seg} role="group" aria-label="Format">
          <button aria-pressed={!wide} onClick={() => touch(() => setWide(false))}>Affiche</button>
          <button aria-pressed={wide} onClick={() => touch(() => setWide(true))}>Annonce</button>
        </div>
        <div className={s.swatches} role="group" aria-label="Couleur">
          {COLORS.map((c, i) => <button key={c} aria-pressed={color === i} aria-label={`Couleur ${i + 1}`} style={{ background: c }} onClick={() => touch(() => setColor(i))} />)}
        </div>
        <button className={s.publish} onClick={() => setPublished(true)}>{published ? "Publiée (démo)" : "Publier"}</button>
        <p className={s.note} role="status">{published ? "Démonstration : sur SenFile Poster, l’affiche serait maintenant en ligne avec un lien à partager." : "Modifiez l’affiche, puis publiez-la."}</p>
      </div>
      <div className={s.stageP}>
        <div className={`${s.poster} ${wide ? s.wide : ""} ${s[`t${tpl}`]}`} style={{ "--pc": COLORS[color] } as CSSProperties}>
          <span className={s.shape} />
          <h4>{head || "Votre titre"}</h4>
          <p>{sub}</p>
        </div>
      </div>
    </div>
  );
}
