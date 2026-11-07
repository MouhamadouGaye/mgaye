# Portfolio Mouhamadou Gaye

Next.js 15 (App Router) + TypeScript + CSS Modules. Données hardcodées et typées dans `data/`.

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # vérification TypeScript
```

## Produits SenFile
- `data/products.ts` : les 4 applications (Docs, Sheet, Call, Poster) avec URL réelle, couleurs et fonctionnalités
- `components/demos/` : une démo jouable par application (document, tableur avec formules, visio, affiche)
- Section d'accueil `Products` (défilement collant) et pages `/produits/<slug>`
- Les textes de Poster viennent de ta description : à ajuster. Les projets clients d'exemple sont masqués
  tant que `showClientProjects` vaut `false` dans `data/site.ts`.
- `/mentions-legales` : modèle à compléter (SIRET, hébergeur).

## Contenu
- `data/types.ts` : types partagés (Profile, Project, Post, NavItem...)
- `data/site.ts` : profil, services, **projets**, stack, méthode, menus (remplacer les TODO)
- `data/posts.ts` : articles du blog
- Chaque projet de `projects` est cliquable et ouvre `/realisations/<slug>`.
  Ajouter `demoUrl` et/ou `repoUrl` pour afficher les boutons « Voir la démo » / « Voir le code ».

## Contact
`app/api/contact/route.ts` valide le message et l'enregistre dans `data/contacts.json`
(serveur Node, VPS ou Docker ; pas sur un hébergement serverless en lecture seule).

## Backend optionnel : Spring Boot ou FastAPI, avec PostgreSQL
Les deux exposent le même contrat : `POST /contacts`, `POST /newsletter`,
`POST /posts/{slug}/view`, `GET /posts/{slug}/views`, `GET /health`.

```bash
docker compose --profile spring  up --build   # Spring Boot 3 / Java 21 sur :8080
docker compose --profile fastapi up --build   # FastAPI sur :8000 (docs sur /docs)
```
Puis dans `.env` : `API_URL=http://localhost:8080` (ou `:8000`) pour copier chaque message en base.
Lancez une seule API à la fois : elles partagent les mêmes tables.
