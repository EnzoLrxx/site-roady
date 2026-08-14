# BRIEF Claude Code — Site (`code-site-v2`) : estimateur instantané + envoi devis

> Contexte projet : lis `CONTEXTE-POUR-CLAUDE-CODE.md`. Stack Next.js 14 + Tailwind.
> On ajoute un **estimateur de devis instantané** au formulaire, branché sur Lemonauto (fourchette live),
> avec **repli** sur les valeurs statiques si l'API n'est pas joignable. Garde le style (rouge #e2001a / navy),
> les animations fluides, l'accessibilité et le mobile. `npm run build` OK à la fin.

## 1. Données & repli
- `lib/estimator-data.json` est déjà présent (fourchettes par catégorie). Il sert de **repli** (fallback)
  si l'API d'estimation n'est pas configurée ou échoue.
- La liste des catégories affichées vient de ce JSON (`categories[]` : `key`, `label`, `from?`, `low`, `high`, `note`).

## 2. Proxy serveur pour l'estimation (token côté serveur)
Crée `app/api/estimate/route.ts` (POST), sur le modèle de `app/api/devis/route.ts` :
- Reçoit `{ category?, freetext?, vehicle? }` depuis le front (même origine).
- Si `NEXT_PUBLIC_DEVIS_API_URL` + `DEVIS_API_TOKEN` sont définis → forward vers
  `${NEXT_PUBLIC_DEVIS_API_URL}/api/public/estimate` avec header `x-api-key: DEVIS_API_TOKEN`, renvoie la réponse.
- Sinon (non câblé) ou en cas d'erreur upstream → **repli** : renvoie la fourchette depuis `estimator-data.json`
  pour la `category` demandée (`{ ...range, source: "default" }`). Le front marche donc **avant même** le branchement Lemonauto.

## 3. Formulaire en 3 étapes (remplace le formulaire actuel de `components/DevisForm.tsx`)
- **Étape 1 — Besoin** : des **chips** cliquables (une par `categories[]` du JSON, `autre` en dernier).
  Au clic sur une catégorie ≠ `autre` → appelle `POST /api/estimate` `{ category }` et affiche une **carte animée** :
  > **« Estimation indicative : entre {low} et {high} € »** — « dès {from} € » si présent
  > petite ligne : *« Estimation indicative — devis définitif après contrôle gratuit. »*
  Pour `autre` (low/high null) → champ texte « Décrivez votre problème » + message « estimation après description »
  (et on peut envoyer le `freetext` à `/api/estimate` pour tenter un classement).
- **Étape 2 — Véhicule** : marque, modèle, immatriculation. (Option : re-appeler `/api/estimate` avec `vehicle`
  pour affiner la fourchette.)
- **Étape 3 — Contact** : nom, téléphone (requis), email (optionnel). Bouton « Recevez le devis exact ».
- Barre de progression discrète (1/3 → 3/3). Transitions douces entre étapes. Honeypot `website` conservé.

## 4. Envoi
À la soumission, POST vers `/api/devis` (proxy existant) avec, **en plus** des champs actuels :
`category`, `estimateLow`, `estimateHigh` (les valeurs affichées). Ainsi la demande arrive **pré-qualifiée**
dans Lemonauto (catégorie + estimation visibles à la caisse). Écran de confirmation animé après succès (déjà en place).

## 5. UX / détails
- L'estimation doit apparaître **en < 300 ms** ressenti : montre un mini-loader, puis la carte en `fadeUp`.
- Toujours afficher le **disclaimer**. Ne jamais présenter un prix ferme.
- Garder un **bouton d'appel** et le lien devis visibles.
- Accessibilité : labels, focus, navigation clavier sur les chips et étapes.

## 6. Variables d'env (`.env.local`, plus tard sur Railway)
```
NEXT_PUBLIC_DEVIS_API_URL=<domaine Lemonauto>   # donné par le Claude Code de Lemonauto
DEVIS_API_TOKEN=<WEBSITE_INTAKE_TOKEN>          # idem, reste côté serveur
```
Tant qu'elles sont vides : le formulaire ET l'estimateur marchent en **mode repli** (JSON statique + stub devis).
