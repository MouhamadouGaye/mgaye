"use client";
import { useState, type FormEvent } from "react";
import s from "./ContactForm.module.css";

export default function ContactForm() {
  const [state, setState] = useState<{ status: "idle" | "loading" | "ok" | "error"; msg: string }>({ status: "idle", msg: "" });

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState({ status: "loading", msg: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Envoi impossible.");
      form.reset();
      setState({ status: "ok", msg: "Message envoyé. Je vous réponds sous 48 h." });
    } catch (err) {
      setState({ status: "error", msg: err instanceof Error ? err.message : "Envoi impossible." });
    }
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <div className={s.row}>
        <label className={s.field}><input name="name" required placeholder=" " autoComplete="name" /><span>Nom</span></label>
        <label className={s.field}><input name="email" type="email" required placeholder=" " autoComplete="email" /><span>E-mail</span></label>
      </div>
      <label className={s.field}><input name="company" placeholder=" " autoComplete="organization" /><span>Entreprise (facultatif)</span></label>
      <label className={s.field}><textarea name="message" required rows={5} placeholder=" " /><span>Votre projet</span></label>
      <input name="website" tabIndex={-1} autoComplete="off" className={s.trap} aria-hidden="true" />
      <button className={s.submit} disabled={state.status === "loading"}>
        {state.status === "loading" ? "Envoi en cours" : "Envoyer le message"}
      </button>
      <p className={`${s.msg} ${state.status === "ok" ? s.ok : ""} ${state.status === "error" ? s.err : ""}`} role="status">{state.msg}</p>
    </form>
  );
}
