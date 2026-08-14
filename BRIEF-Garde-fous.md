# BRIEF Claude Code — Garde-fous « véracité » sur tout le site

> Règle d'or, valable **partout sur le site** : on n'affiche **QUE du vrai et du vérifié**.
> Aucune donnée inventée, aucun prix approximatif présenté comme ferme, aucun avis fictif.
> À appliquer sur toutes les pages (accueil, catalogue, estimateur, avis, footer).

## 1. Catalogue (`/catalogue`, source `lib/catalogue-roady.json`)
- **Prestations** : afficher **uniquement** les entrées de `prestations` du JSON. Ce sont les services
  **vérifiés** (vendus en 2026, prix réels de la grille). **N'invente aucune prestation**, n'en ajoute pas
  « pour faire joli », ne modifie pas les prix.
- Chaque prix est un **TTC réel** ; affiche-le tel quel, avec la mention **« tarif indicatif — peut varier
  selon le véhicule ; devis gratuit »**. Pour une catégorie, tu peux montrer « à partir de {prix mini réel} ».
- **Pièces** (`pieces`) : c'est le catalogue complet des références vendues en 2026. Affiche-les **par
  catégorie + largeur de gamme + marques** (Michelin, Fiamm, Bosch, Osram, Ferodo… depuis `lib/site.ts`).
  **N'affiche pas** les codes fournisseurs bruts aux clients (ex. « FER FDB5025 ») ni de **prix produit**
  (on ne les a pas) — dis « X références en stock, toutes marques », pas un prix inventé.

## 2. Estimateur de devis
- Toujours la mention **« Estimation indicative — devis définitif après contrôle gratuit. »**
- Jamais présenter la fourchette comme un prix ferme. Le prix vient des vraies données ; si repli, pas de
  libellé « affinée ».

## 3. Avis & note Google
- **Aucun avis fictif.** Les 3 exemples dans `lib/site.ts` sont des **placeholders à remplacer** par les
  vrais avis Google/Goodays. Tant qu'ils ne sont pas remplacés, ne surjoue pas dessus.
- `googleRating` / `googleCount` doivent être la **vraie note** (à confirmer par Enzo). Ne pas afficher un
  chiffre inventé comme s'il était certain.

## 4. Affirmations marketing (claims)
- Ne garde une affirmation que si elle est **vraie et tenable** : « toutes marques », « avec ou sans RDV »,
  « paiement 3x/4x », « réponse sous 24h ». Si une n'est pas garantie, adoucis (« généralement… ») ou retire.
- Tout « **dès X €** » doit correspondre à un **vrai prix mini** du catalogue (ex. clim dès 64,90 € = réel).
- Pas de statistique inventée (« +X clients/an ») sans source. Les chiffres de la bande stats doivent être
  vrais/justifiables (400 m², 6j/7 = OK ; ne pas ajouter de chiffre non fondé).

## 5. Principe transverse : une condition à côté de chaque promesse
Dès qu'un prix, une estimation, un délai ou une garantie est affiché → **une micro-mention de condition**
à côté (« indicatif », « selon véhicule », « après contrôle », « aux horaires d'ouverture »…). Le client
n'est jamais induit en erreur.

## 6. Légal
- Compléter **mentions légales** (SIRET, RCS, TVA, directeur de publication) et **politique de confidentialité**
  (RGPD) avant mise en ligne. Formulaire de devis = consentement + « données jamais revendues » (déjà présent).

## En résumé
Si une info n'est pas dans les données fournies (JSON, `lib/site.ts`) ou pas confirmée par Enzo →
**on ne l'affiche pas, ou on la marque clairement comme à confirmer**. Mieux vaut sobre et vrai que
beau et faux.
