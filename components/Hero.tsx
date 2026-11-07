"use client";
import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { profile } from "@/data/site";
import Magnetic from "./Magnetic";
import s from "./Hero.module.css";

const W = 560,
  H = 300,
  PAD = 18,
  N = 56;

// Courbe déterministe (même rendu serveur/client)
function series(): number[] {
  let seed = 7,
    v = 100;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  return Array.from({ length: N }, (_, i) => {
    v += (rnd() - 0.42) * 6 + 0.35;
    return v;
  });
}

export default function Hero() {
  const data = useMemo(series, []);
  const [idx, setIdx] = useState(N - 1);
  const svg = useRef<SVGSVGElement>(null);

  const { line, area, pts } = useMemo(() => {
    const min = Math.min(...data),
      max = Math.max(...data);
    const pts = data.map((d, i) => [
      PAD + (i / (N - 1)) * (W - PAD * 2),
      H - PAD - ((d - min) / (max - min)) * (H - PAD * 2),
    ]);
    const line = pts
      .map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
      .join(" ");
    return {
      line,
      area: `${line} L${pts[N - 1][0]} ${H} L${pts[0][0]} ${H} Z`,
      pts,
    };
  }, [data]);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const r = svg.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * W;
    setIdx(
      Math.max(
        0,
        Math.min(N - 1, Math.round(((x - PAD) / (W - PAD * 2)) * (N - 1))),
      ),
    );
  };
  const perf = ((data[idx] / data[0] - 1) * 100).toFixed(1).replace(".", ",");
  const [px, py] = pts[idx];

  return (
    <section className={s.hero}>
      <div className={s.blobs} aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className={`wrap ${s.grid}`}>
        <div className={s.copy}>
          <p className={s.status}>
            <span className={s.dot} />
            {profile.availability}
          </p>
          <h1 className={s.title} aria-label={profile.headline}>
            {profile.headline.split(" ").map((w, i) => (
              <span key={i} className={s.word} aria-hidden="true">
                <span style={{ "--i": i } as CSSProperties}>{w}&nbsp;</span>
              </span>
            ))}
          </h1>
          <p className={s.intro}>{profile.intro}</p>
          <div className={s.actions}>
            <Magnetic href="/#contact" className="primary">
              Discuter de votre projet
            </Magnetic>
            <Magnetic href="/#produits" className="ghost">
              Essayer mes applications
            </Magnetic>
          </div>
        </div>

        <figure className={s.chart}>
          <figcaption>
            <span>Simulation de rendement cumulé</span>
            <b className={s.readout}>
              {Number(perf.replace(",", ".")) >= 0 ? "+" : ""}
              {perf} %
            </b>
          </figcaption>
          <svg
            ref={svg}
            viewBox={`0 0 ${W} ${H}`}
            onPointerMove={onMove}
            onPointerLeave={() => setIdx(N - 1)}
            role="img"
            aria-label="Courbe financière interactive"
          >
            <defs>
              <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6F8FFF" stopOpacity=".45" />
                <stop offset="1" stopColor="#6F8FFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1="0"
                x2={W}
                y1={H * g}
                y2={H * g}
                className={s.gridline}
              />
            ))}
            <path d={area} fill="url(#fill)" className={s.area} />
            <path d={line} pathLength="1" className={s.line} />
            <line x1={px} x2={px} y1="0" y2={H} className={s.cross} />
            <circle cx={px} cy={py} r="6" className={s.pt} />
            <circle cx={px} cy={py} r="14" className={s.halo} />
          </svg>
          <p className={s.hint}>Survolez la courbe pour la parcourir</p>
        </figure>
      </div>
    </section>
  );
}
