"use client";
import { useEffect, useState, type CSSProperties } from "react";
import s from "./Demos.module.css";

const PEOPLE = [
  { n: "Aïcha", c: "#E57373", muted: false, me: false },
  { n: "Moussa", c: "#64B5F6", muted: true, me: false },
  { n: "Camille", c: "#81C784", muted: false, me: false },
  { n: "Vous", c: "#FFB74D", muted: false, me: true },
];

export default function CallDemo() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [share, setShare] = useState(false);
  const [hand, setHand] = useState(false);
  const [sp, setSp] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSp((x) => (x + 1) % (mic ? 4 : 3)), 1700);
    return () => clearInterval(id);
  }, [mic]);

  const tiles = PEOPLE.map((p, i) => {
    const muted = p.me ? !mic : p.muted;
    const camOn = p.me ? cam : true;
    return (
      <div key={p.n} className={`${s.tile} ${sp === i && !muted ? s.speak : ""}`} style={{ "--c": p.c } as CSSProperties}>
        {camOn ? <span className={s.video} /> : <span className={s.avatar}>{p.n[0]}</span>}
        <span className={s.pname}>{p.n}{muted ? ", micro coupé" : ""}</span>
        {hand && p.me && <span className={s.hand}>Main levée</span>}
      </div>
    );
  });

  return (
    <div className={s.call}>
      {share ? (
        <div className={s.shared}>
          <div className={s.slide}>
            <b>Votre écran</b>
            <div className={s.slideBars}><i /><i /><i /><i /></div>
          </div>
          <div className={s.strip}>{tiles}</div>
        </div>
      ) : (
        <div className={s.grid}>{tiles}</div>
      )}
      <div className={s.controls} role="toolbar" aria-label="Commandes de la réunion">
        <button aria-pressed={!mic} onClick={() => setMic(!mic)}>{mic ? "Couper le micro" : "Activer le micro"}</button>
        <button aria-pressed={!cam} onClick={() => setCam(!cam)}>{cam ? "Couper la caméra" : "Activer la caméra"}</button>
        <button aria-pressed={share} onClick={() => setShare(!share)}>{share ? "Arrêter le partage" : "Partager l’écran"}</button>
        <button aria-pressed={hand} onClick={() => setHand(!hand)}>{hand ? "Baisser la main" : "Lever la main"}</button>
      </div>
    </div>
  );
}
