import type { ReactNode } from "react";
import s from "./Demos.module.css";

// Fenêtre de navigateur avec l'adresse réelle de l'application
export default function Frame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className={s.frame}>
      <div className={s.chrome}><span className={s.url}>{url}</span></div>
      <div className={s.screen}>{children}</div>
    </div>
  );
}
