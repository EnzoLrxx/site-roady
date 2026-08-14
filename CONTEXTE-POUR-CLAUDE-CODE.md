# 🧭 Contexte pour Claude Code — Site Roady Solliès-Pont

> **Lis ce fichier en premier.** Il te met au niveau instantanément pour continuer le site
> **directement dans ce repo** (édition en place, git). Le scaffold a été fait dans une session
> Cowork ; à partir d'ici, tout se passe ici, dans VS Code.

## Quoi / pour qui
Site vitrine du garage **Roady Solliès-Pont** (SAS SUNCAR), à refaire pour remplacer un vieux
WordPress. Objectif n°1 : **capter des demandes de devis** et inspirer confiance. Le propriétaire
(Enzo) est ingénieur info — code lisible, pas de WordPress.

## Stack
- **Next.js 14 (App Router) + TypeScript + Tailwind** (même stack que son autre projet `code-devis`/Lemonauto).
- Police système (pas de `next/font/google` — build sans réseau). Animations maison (CSS + IntersectionObserver, `components/Reveal.tsx`, `components/CountUp.tsx`).
- Déploiement cible : **Railway** (`railway.toml` présent). Domaine **garage-auto-sollies.fr** gardé chez **IONOS** (repointer le DNS en CNAME vers Railway).

## Lancer
```bash
npm install && npm run dev   # http://localhost:3000
npm run build                # vérifie la prod
```

## Structure
```
app/            layout.tsx (SEO + JSON-LD LocalBusiness), page.tsx (accueil = one-page à ancres),
                mentions-legales/, confidentialite/, sitemap.ts, robots.ts,
                api/devis/route.ts   ← proxy serveur qui forwarde le formulaire vers Lemonauto
components/     Header, Hero, Stats, Services, Diagnostic, Boutique, WhyUs, PaymentBand,
                Brands, Reviews, FAQ, Infos (devis+map), Footer, Reveal, CountUp, Icons
lib/site.ts     ⭐ SOURCE UNIQUE : coordonnées, services, marques(+logos), avis, stats, FAQ, zones, IMAGE_BASE
```
Tout le contenu se règle dans **`lib/site.ts`**. Couleurs dans `tailwind.config.ts` (rouge Roady #e2001a, navy).

## État : ce qui est FAIT
- Page d'accueil complète et animée : hero (photo atelier + note Google), stats animées, prestations,
  section « la preuve en photo » (diagnostic), galerie boutique 400 m², « pourquoi nous »,
  bandeau paiement 3x/4x, carrousel de marques (vrais logos), avis + note Google, FAQ (accordéon),
  zone d'intervention (SEO local), formulaire de devis, accès + carte, footer.
- SEO : metas, OpenGraph, **JSON-LD AutoRepair/LocalBusiness**, sitemap.xml, robots.txt, redirections 301 (à compléter).
- Formulaire → `/api/devis` (proxy). En « stub » tant que Lemonauto pas câblé (le site marche déjà).

## Ce qui RESTE À FAIRE (par ordre)
1. **Vrais avis + note Google** : remplacer les 3 exemples et `googleRating/googleCount` dans `lib/site.ts`
   (les vrais sont dans l'espace Goodays/Google d'Enzo).
2. **Images** : elles pointent aujourd'hui vers le WordPress (`IMAGE_BASE` dans `lib/site.ts`).
   **AVANT la bascule DNS** : télécharger `/wp-content/uploads` (SFTP IONOS), le mettre dans `/public`,
   et passer `IMAGE_BASE = ''`. Sinon les images casseront une fois le domaine sur Railway.
3. **Liaison devis → Lemonauto** : voir la spec **`SPEC-Liaison-Site-Lemonauto.md`** (livrée à part).
   Côté site, il suffit de renseigner `NEXT_PUBLIC_DEVIS_API_URL` + `DEVIS_API_TOKEN` (voir `.env.example`).
   Côté Lemonauto (`code-devis`), implémenter la route publique + l'écran caisse (détaillé dans la spec).
4. **Redirections 301** : compléter `next.config.mjs` avec les vraies anciennes URLs (voir `REDIRECTIONS-301.md`).
5. **Déploiement Railway** : repo GitHub → Railway (lit `railway.toml`) → env vars → custom domain + CNAME IONOS.
6. **Options** : pages dédiées par prestation (SEO), vidéo de fond hero, page boutique détaillée, favicon + og.jpg.

## Conventions & garde-fous
- `Reveal` = apparition au scroll (visible par défaut si pas de JS, filet de sécurité 2,5 s).
- Images externes = balises `<img>` simples (pas `next/image`, pour éviter la config de domaines).
- Le token Lemonauto reste **côté serveur** (`DEVIS_API_TOKEN`, jamais `NEXT_PUBLIC_`).
- `package.json` : Next `^14.2.33` (version patchée).

## Docs liées (dans le dossier Roady)
- `SPEC-Liaison-Site-Lemonauto.md` — cahier des charges de la liaison devis.
- `README-DEPLOIEMENT.md` — pas-à-pas Railway + IONOS.
- `REDIRECTIONS-301.md` — préserver le SEO.
- `public/README-ASSETS.md` — gestion des visuels.
