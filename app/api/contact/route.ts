import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
const FILE = path.join(process.cwd(), "data", "contacts.json");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
let queue = Promise.resolve(); // sérialise les écritures pour éviter les collisions

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Requête invalide." }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // champ piège pour les robots

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    message: clean(body.message, 5000),
  };
  if (!entry.name || !EMAIL.test(entry.email) || entry.message.length < 10) {
    return NextResponse.json({ error: "Vérifiez votre nom, votre e-mail et votre message (10 caractères minimum)." }, { status: 422 });
  }

  const job = queue.then(async () => {
    let list: unknown[] = [];
    try { list = JSON.parse(await fs.readFile(FILE, "utf8")); } catch {}
    list.push(entry);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(list, null, 2));
  });
  queue = job.catch(() => {});
  try { await job; } catch { return NextResponse.json({ error: "Enregistrement impossible, écrivez-moi par e-mail." }, { status: 500 }); }

  // Copie optionnelle vers le backend FastAPI (n'échoue jamais la requête)
  if (process.env.API_URL) {
    fetch(`${process.env.API_URL}/contacts`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(entry) }).catch(() => {});
  }
  return NextResponse.json({ ok: true });
}
