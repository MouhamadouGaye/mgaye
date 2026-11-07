"use client";
import { useRef, type ElementType, type PointerEvent, type ReactNode } from "react";
import s from "./Spotlight.module.css";

type Props = { children: ReactNode; className?: string; as?: ElementType; tilt?: boolean };

// Carte avec halo qui suit le curseur et légère inclinaison 3D
export default function Spotlight({ children, className = "", as: Tag = "div", tilt = true }: Props) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--x", `${px * 100}%`);
    el.style.setProperty("--y", `${py * 100}%`);
    if (tilt) {
      el.style.setProperty("--rx", `${(0.5 - py) * 5}deg`);
      el.style.setProperty("--ry", `${(px - 0.5) * 6}deg`);
    }
  };
  const leave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };
  return (
    <Tag ref={ref} className={`${s.card} ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </Tag>
  );
}
