"use client";
import { useState } from "react";
import s from "./Demos.module.css";

export default function DocDemo() {
  const [title, setTitle] = useState("Proposition commerciale");
  const [text, setText] = useState("Notre offre réunit la conception, le développement et la formation de vos équipes, livrées par étapes courtes.");
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [center, setCenter] = useState(false);
  const [chart, setChart] = useState(true);
  const [bars, setBars] = useState([42, 68, 55, 80]);
  const bump = (i: number) => setBars((b) => b.map((v, j) => (j === i ? ((v + 27) % 80) + 20 : v)));

  return (
    <div>
      <div className={s.toolbar} role="toolbar" aria-label="Mise en forme">
        <button className={s.tb} aria-pressed={bold} onClick={() => setBold(!bold)} aria-label="Gras"><b>G</b></button>
        <button className={s.tb} aria-pressed={italic} onClick={() => setItalic(!italic)} aria-label="Italique"><i>I</i></button>
        <button className={s.tb} aria-pressed={center} onClick={() => setCenter(!center)} aria-label="Centrer">Centrer</button>
        <span className={s.sep} />
        <button className={s.tb} aria-pressed={chart} onClick={() => setChart(!chart)}>Graphique</button>
      </div>
      <div className={s.page}>
        <input className={s.docTitle} value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Titre du document" style={{ textAlign: center ? "center" : "left" }} />
        <textarea className={s.docText} rows={3} value={text} onChange={(e) => setText(e.target.value)} aria-label="Texte du document"
          style={{ fontWeight: bold ? 700 : 400, fontStyle: italic ? "italic" : "normal", textAlign: center ? "center" : "left" }} />
        {chart && (
          <div className={s.docChart}>
            <p>Chiffre d’affaires par trimestre. Cliquez une barre pour la modifier.</p>
            <div className={s.bars}>
              {bars.map((v, i) => (
                <button key={i} onClick={() => bump(i)} aria-label={`Trimestre ${i + 1}, valeur ${v}`}>
                  <i style={{ height: `${v}%` }} /><span>T{i + 1}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
