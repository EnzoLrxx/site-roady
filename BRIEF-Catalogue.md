# BRIEF Claude Code — Page « Catalogue » (magasin + web) sur le site

But : une page **`/catalogue`** qui montre aux clients **ce que le garage vend et fait**. Double usage :
en **magasin** (ouverte en plein écran sur une tablette/un écran = borne) ET en ligne (les clients la voient).
Même style que le site (Tailwind, rouge #e2001a / navy), animations fluides, **mobile + tactile**.

## Source de données
`lib/catalogue-roady.json` (déposé). Structure :
- `prestations` : objet `{ "Catégorie": [ { "designation", "prix_ttc" }, … ] }` — **298 prestations avec prix TTC**.
- `produits_boutique` : `{ "Catégorie": { "nb_references", "exemples": [ { "exemple", "ventes_an_approx" } ] } }`.

## Ce qu'il faut construire
1. **Route `/catalogue`** + lien dans le header/footer (« Catalogue »).
2. **Deux univers en onglets** : **« Nos prestations »** (avec prix) et **« La boutique »** (produits).
3. **Prestations** : une **tuile par catégorie** (Entretien & vidange, Freinage, Pneumatiques, Climatisation,
   Distribution & moteur, Bioéthanol & reprogrammation, Attelage & remorque, Esthétique & protection,
   Diagnostic & électricité, Boîte de vitesses, Accessoires & pose, Autres). Au clic → la liste des
   `designation` + `prix_ttc` (format « 119,90 € », ou « dès X € » pour les entrées d'appel).
4. **Boutique** : une tuile par catégorie (Filtres, Freinage, Huiles & lubrifiants, Batteries, Ampoules,
   Essuie-glaces, Distribution, Bougies, Liquides, Additifs, Recharge clim). Affiche le **nombre de références**
   et, pour la crédibilité, les **grandes marques** (Michelin, Bridgestone, Total, Motul, Fiamm, Bosch, Osram,
   Valeo, NGK, Ferodo — réutilise `lib/site.ts` brands). **N'affiche PAS les codes fournisseurs bruts**
   (ex. « FER FDB5025 ») aux clients — ils servent juste de preuve de largeur de gamme ; montre plutôt
   « 363 références de filtres, toutes marques ».
5. **Recherche** : un champ qui filtre en direct prestations + produits (utile en borne).
6. **Mode borne** : gros titres, grosses tuiles, cible tactile ≥ 48 px, un bouton « Demander un devis »
   toujours visible qui renvoie vers `#contact` de l'accueil.
7. **SEO** : `<title>`/description « Catalogue & tarifs — Roady Solliès-Pont », données structurées si simple.

## Détails
- Trie les prestations par prix croissant dans chaque catégorie (déjà trié dans le JSON).
- Certaines prestations sont très spécifiques (ex. boîtiers éthanol par nombre de cylindres) — garde-les,
  mais tu peux regrouper les variantes proches sous un libellé court + « à partir de X € ».
- Le JSON est régénérable depuis W-Contact ; ne code pas les prix en dur, lis toujours le JSON.

## Reste à la charge d'Enzo (hors code)
- Relire l'Excel `Catalogue-Roady.xlsx` : retirer les prestations qu'il ne veut pas montrer, corriger un prix.
- (Option) fournir un vrai export complet du catalogue produits W-Contact (avec prix boutique) si on veut
  afficher les prix des produits, pas seulement des prestations.
