# Site Roady Solliès-Pont — dev & déploiement

Site vitrine en **Next.js 14 (App Router) + Tailwind**, prêt pour **Railway**.
Aucune dépendance réseau au build (police système). Domaine gardé chez IONOS.

## 1. Lancer en local (30 s)

```bash
cd code-site
npm install
npm run dev        # http://localhost:3000
```

Build de prod : `npm run build && npm run start`.

## 2. Structure

```
app/            page.tsx (accueil), layout (SEO + JSON-LD LocalBusiness),
                mentions-legales, confidentialite, sitemap.ts, robots.ts,
                api/devis/route.ts (proxy serveur vers Lemonauto)
components/     Header, Hero, Services, WhyUs, Brands, Reviews, DevisForm, Infos, Footer, Reveal, Icons
lib/site.ts     ⭐ TOUT se change ici : coordonnées, services, marques, avis
```

Pour modifier textes/coordonnées/marques : **`lib/site.ts`**. Les couleurs : `tailwind.config.ts`.

## 3. Déployer sur Railway

1. Mettre ce dossier dans un **repo GitHub** (`git init && git add . && git commit && git push`).
2. Sur Railway : **New Project → Deploy from GitHub repo** → sélectionner le repo.
   Railway lit `railway.toml` (build `npm ci && npm run build`, start `npm run start`). Rien à configurer.
3. **Variables d'environnement** (onglet Variables) :
   ```
   NEXT_PUBLIC_SITE_URL=https://garage-auto-sollies.fr
   # (plus tard, pour la liaison devis :)
   NEXT_PUBLIC_DEVIS_API_URL=<domaine Lemonauto>
   DEVIS_API_TOKEN=<le token>
   ```
4. **Domaine** : Railway → Settings → **Custom Domain** → `garage-auto-sollies.fr`.
   Railway te donne une cible **CNAME**. Chez **IONOS** (account.1and1.fr → Domaines → DNS) :
   - crée/édite un enregistrement **CNAME** (ou ALIAS/ANAME sur le domaine racine) vers la cible Railway.
   - le SSL est géré automatiquement par Railway.
   > Astuce : garde WordPress en ligne jusqu'à ce que le nouveau site soit validé, puis bascule le DNS.

## 4. SEO — ne pas perdre le référencement

- **Domaine identique** : conservé (garage-auto-sollies.fr). ✔
- **Redirections 301** : voir `REDIRECTIONS-301.md` et le bloc `redirects()` dans `next.config.mjs`.
  → complète-le avec tes anciennes URLs WordPress avant la bascule.
- **Données structurées LocalBusiness** : déjà injectées (`app/layout.tsx`).
- **sitemap.xml** et **robots.txt** : générés automatiquement.
- Après bascule : soumettre le sitemap dans **Google Search Console** et vérifier les redirections.

## 5. Sécurité

- `package.json` pointe Next `^14.2.33` (version patchée — la faille de la 14.2.15 est corrigée).
- Le token Lemonauto reste **côté serveur** (`DEVIS_API_TOKEN`, jamais `NEXT_PUBLIC_`).

## 6. Formulaire de devis

Le formulaire poste vers `/api/devis` (route serveur incluse). Tant que
`NEXT_PUBLIC_DEVIS_API_URL` + `DEVIS_API_TOKEN` ne sont pas définis, il accepte la demande en
« stub » (le site marche déjà). Quand Lemonauto est prêt (cf. `SPEC-Liaison-Site-Lemonauto.md`),
on renseigne ces 2 variables et c'est câblé.

## 7. À personnaliser avant mise en ligne

- Compléter `lib/site.ts` (avis clients réels, ajuster services).
- Ajouter tes **vraies photos** (atelier, boutique) et **logos de marques** — voir `public/README-ASSETS.md`.
- Compléter les **mentions légales** (SIRET, RCS, TVA, directeur de publication).
