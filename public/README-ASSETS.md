# Visuels à ajouter

Le site est volontairement **léger en images** (design propre en dégradés + icônes SVG),
il fonctionne parfaitement tel quel. Pour le personnaliser avec tes vrais visuels :

- **Photos atelier / boutique** : dépose-les ici (`public/`) et référence-les dans les composants
  (ex. une galerie dans `components/`). Formats conseillés : `.webp` ou `.jpg` optimisés.
- **Logos de marques** : aujourd'hui affichés en texte dans le carrousel (`components/Brands.tsx`
  via `lib/site.ts`). Pour de vrais logos, dépose les fichiers ici et remplace le texte par des `<Image>`.
- **`og.jpg`** : une image 1200×630 (partage réseaux sociaux) — référencée dans `app/layout.tsx`.
- **`favicon.ico`** : à déposer à la racine de `public/` ou `app/`.

Récupération des visuels de l'ancien site : ils sont accessibles sur
`https://garage-auto-sollies.fr/wp-content/uploads/…` — on peut les rapatrier quand tu veux.
