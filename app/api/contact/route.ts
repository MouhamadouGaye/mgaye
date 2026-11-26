// import { promises as fs } from "fs";
// import path from "path";
// import { NextRequest, NextResponse } from "next/server";

// export const runtime = "nodejs";
// const FILE = path.join(process.cwd(), "data", "contacts.json");
// const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// const API_URL = process.env.API_URL || "https://api.mouhamadougaye.com"; // URL du backend FastAPI (optionnel)
// let queue = Promise.resolve(); // sérialise les écritures pour éviter les collisions

// const clean = (v: unknown, max: number) =>
//   String(v ?? "")
//     .trim()
//     .slice(0, max);

// export async function POST(req: NextRequest) {
//   let body: Record<string, unknown>;
//   try {
//     body = await req.json();
//   } catch {
//     return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
//   }

//   if (body.website) return NextResponse.json({ ok: true }); // champ piège pour les robots

//   const entry = {
//     id: crypto.randomUUID(),
//     createdAt: new Date().toISOString(),
//     name: clean(body.name, 120),
//     email: clean(body.email, 200),
//     company: clean(body.company, 160),
//     message: clean(body.message, 5000),
//   };
//   if (!entry.name || !EMAIL.test(entry.email) || entry.message.length < 10) {
//     return NextResponse.json(
//       {
//         error:
//           "Vérifiez votre nom, votre e-mail et votre message (10 caractères minimum).",
//       },
//       { status: 422 },
//     );
//   }

//   const job = queue.then(async () => {
//     let list: unknown[] = [];
//     try {
//       list = JSON.parse(await fs.readFile(FILE, "utf8"));
//     } catch {}
//     list.push(entry);
//     await fs.mkdir(path.dirname(FILE), { recursive: true });
//     await fs.writeFile(FILE, JSON.stringify(list, null, 2));
//   });
//   queue = job.catch(() => {});
//   try {
//     await job;
//   } catch {
//     return NextResponse.json(
//       { error: "Enregistrement impossible, écrivez-moi par e-mail." },
//       { status: 500 },
//     );
//   }

//   // Copie optionnelle vers le backend FastAPI (n'échoue jamais la requête)
//   if (API_URL) {
//     fetch(`${API_URL}/contacts`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(entry),
//     }).catch(() => {});
//   }
//   return NextResponse.json({ ok: true });
// }

// // import { promises as fs } from "fs";
// // import path from "path";
// // import { NextRequest, NextResponse } from "next/server";
// // import crypto from "crypto";

// // export const runtime = "nodejs";

// // const FILE = "/tmp/contacts.json";
// // const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// // const clean = (v: unknown, max: number) =>
// //   String(v ?? "")
// //     .trim()
// //     .slice(0, max);

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json();

// //     if (body.website) {
// //       return NextResponse.json({ ok: true });
// //     }

// //     const entry = {
// //       id: crypto.randomUUID(),
// //       createdAt: new Date().toISOString(),
// //       name: clean(body.name, 120),
// //       email: clean(body.email, 200),
// //       company: clean(body.company, 160),
// //       message: clean(body.message, 5000),
// //     };

// //     if (!entry.name || !EMAIL.test(entry.email) || entry.message.length < 10) {
// //       return NextResponse.json(
// //         { error: "Informations invalides." },
// //         { status: 422 },
// //       );
// //     }

// //     await fs.mkdir(path.dirname(FILE), { recursive: true });

// //     let contacts = [];

// //     try {
// //       contacts = JSON.parse(await fs.readFile(FILE, "utf8"));
// //     } catch {
// //       contacts = [];
// //     }

// //     contacts.push(entry);

// //     await fs.writeFile(FILE, JSON.stringify(contacts, null, 2), "utf8");

// //     return NextResponse.json({ ok: true });
// //   } catch (error) {
// //     console.error("CONTACT_FORM_ERROR:", error);

// //     return NextResponse.json(
// //       { error: "Impossible d'enregistrer le message." },
// //       { status: 500 },
// //     );
// //   }
// // }

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const API_URL = process.env.API_URL || "https://api.mouhamadougaye.com";
const API_SECRET = process.env.API_SECRET;

const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .trim()
    .slice(0, max);

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège pour les robots
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const entry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    company: clean(body.company, 160),
    message: clean(body.message, 5000),
  };

  if (!entry.name || !EMAIL.test(entry.email) || entry.message.length < 10) {
    return NextResponse.json(
      {
        error:
          "Vérifiez votre nom, votre e-mail et votre message (10 caractères minimum).",
      },
      { status: 422 },
    );
  }

  if (!API_SECRET) {
    console.error("API_SECRET manquant dans les variables d'environnement.");
    return NextResponse.json(
      { error: "Service temporairement indisponible." },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(`${API_URL}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": API_SECRET,
      },
      body: JSON.stringify(entry),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error("FastAPI a répondu avec le statut :", response.status);
      return NextResponse.json(
        { error: "Enregistrement impossible. Réessayez plus tard." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur de connexion à FastAPI :", error);
    return NextResponse.json(
      { error: "Impossible de contacter le serveur. Réessayez plus tard." },
      { status: 502 },
    );
  }
}
