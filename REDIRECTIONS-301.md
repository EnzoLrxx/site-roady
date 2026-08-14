# Redirections 301 — préserver le SEO de l'ancien site WordPress

Quand on remplace le WordPress, chaque **ancienne URL indexée par Google** doit renvoyer (301)
vers la nouvelle, sinon on perd le jus SEO et on crée des 404.

## Comment récupérer la liste exacte des anciennes URLs
1. Ouvrir l'ancien sitemap : `https://garage-auto-sollies.fr/sitemap.xml` (ou `/sitemap_index.xml`).
2. Ou dans **Google Search Console** → Pages → exporter les URLs indexées.
3. Noter chaque slug WordPress (ex. `/nos-services/`, `/climatisation/`…).

## Où les déclarer
Dans **`next.config.mjs`**, bloc `async redirects()`. Exemple déjà en place :

```js
{ source: '/offres', destination: '/#prestations', permanent: true }
```

`permanent: true` = **301** (transmet le SEO). Le nouveau site étant une page unique à ancres,
la plupart des anciennes pages renvoient vers une **ancre** de l'accueil.

## Table à compléter (d'après les pages vues sur l'actuel)

| Ancienne URL WordPress (à vérifier) | Nouvelle destination |
|---|---|
| `/offres` | `/#prestations` |
| `/prestations-atelier` | `/#prestations` |
| `/boutique` | `/#prestations` (ou une future page boutique) |
| `/galerie` | `/#pourquoi` |
| `/marques` | `/#marques` |
| `/avis-clients` | `/#avis` |
| `/contact` | `/#contact` |
| `/decrassage-moteur` (page dédiée) | `/#prestations` |
| `/batteries` (page dédiée) | `/#prestations` |

> ⚠️ Les slugs ci-dessus sont **supposés** — remplace-les par les **vrais** repérés dans le sitemap
> avant la bascule. Un slug qui ne correspond pas = un 301 qui ne sert à rien.

## Après la bascule
- Vérifier chaque redirection (taper l'ancienne URL → doit arriver sur la bonne section).
- Soumettre le nouveau `sitemap.xml` dans Search Console.
- Surveiller les 404 dans Search Console les 2-3 semaines suivantes.
