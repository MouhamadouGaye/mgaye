"use client";
import { useState } from "react";
import s from "./Demos.module.css";

const COLS = ["A", "B", "C", "D"];
const ROWS = [1, 2, 3, 4, 5];
const INIT: Record<string, string> = {
  A1: "Mois", B1: "Ventes", C1: "Coûts", D1: "Marge",
  A2: "Janv.", B2: "12400", C2: "8200", D2: "=B2-C2",
  A3: "Févr.", B3: "15800", C3: "9100", D3: "=B3-C3",
  A4: "Mars", B4: "14200", C4: "9800", D4: "=B4-C4",
  A5: "Total", B5: "=SOMME(B2:B4)", C5: "=SOMME(C2:C4)", D5: "=SOMME(D2:D4)",
};

type Cells = Record<string, string>;

function evaluate(raw: string, cells: Cells, depth = 0): string | number {
  if (!raw.startsWith("=")) {
    const n = Number(raw.replace(",", "."));
    return raw.trim() !== "" && !Number.isNaN(n) ? n : raw;
  }
  if (depth > 8) return "#CYCLE";
  const f = raw.slice(1).trim().toUpperCase();
  const num = (ref: string) => { const v = evaluate(cells[ref] ?? "", cells, depth + 1); return typeof v === "number" ? v : 0; };
  const m = f.match(/^(SOMME|SUM|MOYENNE|AVERAGE|MAX|MIN)\(([A-D])(\d):([A-D])(\d)\)$/);
  if (m) {
    const [, fn, c1, r1, c2, r2] = m;
    const vals: number[] = [];
    for (let c = c1.charCodeAt(0); c <= c2.charCodeAt(0); c++) for (let r = +r1; r <= +r2; r++) vals.push(num(String.fromCharCode(c) + r));
    if (!vals.length) return 0;
    if (fn === "MAX") return Math.max(...vals);
    if (fn === "MIN") return Math.min(...vals);
    const sum = vals.reduce((a, b) => a + b, 0);
    return fn === "MOYENNE" || fn === "AVERAGE" ? Math.round((sum / vals.length) * 100) / 100 : sum;
  }
  const expr = f.replace(/[A-D]\d/g, (r) => String(num(r)));
  if (!/^[\d+\-*/().\s]+$/.test(expr)) return "#ERREUR";
  try {
    const r = Function(`"use strict"; return (${expr});`)();
    return typeof r === "number" && Number.isFinite(r) ? Math.round(r * 100) / 100 : "#ERREUR";
  } catch { return "#ERREUR"; }
}

export default function SheetDemo() {
  const [cells, setCells] = useState<Cells>(INIT);
  const [edit, setEdit] = useState<string | null>(null);
  const [chart, setChart] = useState(false);
  const show = (k: string) => { const v = evaluate(cells[k] ?? "", cells); return typeof v === "number" ? v.toLocaleString("fr-FR") : v; };
  const commit = (k: string, v: string) => { setCells((c) => ({ ...c, [k]: v })); setEdit(null); };
  const margins = [2, 3, 4].map((r) => { const v = evaluate(cells[`D${r}`] ?? "", cells); return typeof v === "number" ? v : 0; });
  const max = Math.max(...margins, 1);

  return (
    <div className={s.sheet}>
      <div className={s.formulaBar}><b>{edit ?? "fx"}</b><span>{edit ? cells[edit] : "Cliquez une cellule, modifiez un chiffre ou tapez =SOMME(B2:B4)"}</span></div>
      <table>
        <thead><tr><th />{COLS.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>
          {ROWS.map((r) => (
            <tr key={r}>
              <th>{r}</th>
              {COLS.map((c) => {
                const k = `${c}${r}`;
                const isFormula = (cells[k] ?? "").startsWith("=");
                return (
                  <td key={k} className={`${r === 1 ? s.head : ""} ${isFormula ? s.formula : ""} ${c !== "A" && r > 1 ? s.numCell : ""}`}>
                    {edit === k ? (
                      <input autoFocus defaultValue={cells[k]} onBlur={(e) => commit(k, e.currentTarget.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") e.currentTarget.blur(); if (e.key === "Escape") setEdit(null); }} aria-label={`Cellule ${k}`} />
                    ) : (
                      <button onClick={() => setEdit(k)} aria-label={`Cellule ${k}`}>{show(k)}</button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.sheetFoot}>
        <button className={s.pill} onClick={() => setChart(!chart)} aria-pressed={chart}>Graphique en un clic</button>
        {chart && (
          <div className={s.miniBars}>
            {margins.map((v, i) => (
              <div key={i}><i style={{ height: `${Math.max(6, (v / max) * 100)}%` }} /><span>{cells[`A${i + 2}`]}</span></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
