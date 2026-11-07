"use client";
import { useRef, type AnchorHTMLAttributes, type PointerEvent, type ReactNode } from "react";
import s from "./Magnetic.module.css";

type Props = { children: ReactNode; href: string; className?: string; strength?: number } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

export default function Magnetic({ children, href, className = "", strength = 0.35, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
    el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <a ref={ref} href={href} className={`${s.btn} ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <span>{children}</span>
    </a>
  );
}
