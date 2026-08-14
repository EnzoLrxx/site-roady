// ── Configuration centrale du site ──────────────────────────────────────────
// Tout se change ici : coordonnées, visuels, marques, avis, FAQ, zones.

export const site = {
  name: 'Roady Solliès-Pont',
  legal: 'SAS SUNCAR',
  phone: '04 94 28 81 42',
  phoneHref: 'tel:+33494288142',
  email: 'contact@garage-auto-sollies.fr',
  address: { street: '6 bis avenue du Lion — ZAC de la Poulasse', zip: '83210', city: 'Solliès-Pont' },
  hours: 'Du lundi au samedi · 8h30–12h et 14h–17h30',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://garage-auto-sollies.fr',
  mapQuery: '6 bis avenue du Lion 83210 Solliès-Pont',
  // Note Google — ⚠️ mets ta vraie note + nb d'avis (visible dans ton espace Goodays/Google).
  googleRating: 4.6,
  googleCount: 120,
  googleReviewsUrl: 'https://www.google.com/search?q=Roady+Solli%C3%A8s-Pont+avis',
} as const;

// ⚠️ IMAGES : elles pointent aujourd'hui vers ton WordPress (le temps qu'il est en ligne).
// AVANT la bascule DNS vers Railway : copie /wp-content/uploads dans le dossier /public
// et remplace IMAGE_BASE par '' (chaîne vide). Voir public/README-ASSETS.md.
export const IMAGE_BASE = 'https://garage-auto-sollies.fr';

export const photos = {
  atelier: `${IMAGE_BASE}/wp-content/uploads/2019/02/IMG_2560.jpg`,
  essuie: `${IMAGE_BASE}/wp-content/uploads/2019/02/IMG_2528.jpg`,
  batteries: `${IMAGE_BASE}/wp-content/uploads/2019/02/IMG_2534.jpg`,
  huiles: `${IMAGE_BASE}/wp-content/uploads/2019/02/IMG_2550.jpg`,
};

export const services = [
  { t: 'Révision & vidange', d: 'Forfaits entretien toutes marques, filtres et contrôle 24 points inclus.', icon: 'oil' },
  { t: 'Pneus & géométrie', d: 'Montage, équilibrage, parallélisme et réparation de crevaison au champignon.', icon: 'tire' },
  { t: 'Freinage', d: 'Plaquettes, disques, purge du circuit — votre sécurité avant tout.', icon: 'brake' },
  { t: 'Climatisation', d: 'Recharge et entretien clim — notre spécialité maison, en 30 min.', icon: 'ac' },
  { t: 'Distribution & embrayage', d: 'Courroie, kit de distribution, embrayage — les grosses réparations.', icon: 'belt' },
  { t: 'Batteries & démarrage', d: 'Démarreur, alternateur, batterie — diagnostic et remplacement immédiat.', icon: 'battery' },
  { t: 'Décrassage moteur', d: 'Dépollution moteur pour retrouver performances, sobriété et passer au contrôle.', icon: 'engine' },
  { t: 'Diagnostic électronique', d: 'Lecture des défauts et contrôle complet, avec photos de l’usure réelle.', icon: 'diag' },
] as const;

// Logos réels (hébergés sur ton WordPress).
export const brands = [
  { name: 'Michelin', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-pneu-michelin.png` },
  { name: 'Bridgestone', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-pneu-bridgestone.png` },
  { name: 'Firestone', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-Pneu-firestone.png` },
  { name: 'Total', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-total-huile.png` },
  { name: 'Motul', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-huiles-motul.png` },
  { name: 'Valeo', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-valeo.png` },
  { name: 'NGK', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-ngk.png` },
  { name: 'Osram', logo: `${IMAGE_BASE}/wp-content/uploads/2019/01/Logo-Marque-garage-auto-Sollies-Var-Osram.png` },
];

// ⚠️ AVIS : remplace ces 3 exemples par tes VRAIS avis Google/Goodays (copier-coller).
export const reviews = [
  { name: 'Julien M.', stars: 5, text: 'Accueil au top, devis clair et pas de mauvaise surprise. On voit qu’ils sont sérieux et honnêtes.' },
  { name: 'Sophie R.', stars: 5, text: 'Rapide pour la recharge de clim, prix correct. Je recommande sans hésiter, équipe sympa.' },
  { name: 'Karim B.', stars: 5, text: 'Ils m’ont montré en photo les pièces usées de ma voiture — franchement ça change tout côté confiance.' },
];

export const stats = [
  { n: 400, suffix: ' m²', label: 'de boutique & atelier' },
  { n: 24, suffix: ' pts', label: 'de contrôle à chaque visite' },
  { n: 8, suffix: '', label: 'métiers sous un même toit' },
  { n: 6, suffix: 'j/7', label: 'ouvert du lundi au samedi' },
];

export const faq = [
  { q: 'Faut-il prendre rendez-vous ?', a: 'Non, nous travaillons avec ou sans rendez-vous. Pour les grosses interventions (distribution, embrayage), un rendez-vous permet d’aller plus vite.' },
  { q: 'Puis-je payer en plusieurs fois ?', a: 'Oui, nous proposons le paiement en 3x ou 4x par carte, sans démarche compliquée. Idéal pour étaler une grosse réparation.' },
  { q: 'Entretenez-vous toutes les marques ?', a: 'Oui, toutes marques — sans perdre la garantie constructeur. Nous utilisons des pièces et huiles aux normes du constructeur.' },
  { q: 'Le devis est-il gratuit ?', a: 'Toujours. Décrivez votre besoin via le formulaire ou par téléphone, et nous revenons vers vous avec un prix clair sous 24h ouvrées.' },
  { q: 'C’est quoi le “diagnostic en photo” ?', a: 'À chaque contrôle, nous prenons des photos de l’usure réelle de votre véhicule. Vous voyez de vos yeux ce qui est à changer — aucune décision à l’aveugle.' },
];

export const zones = ['Solliès-Pont', 'Solliès-Ville', 'Solliès-Toucas', 'La Farlède', 'La Crau', 'Cuers', 'Belgentier', 'Hyères', 'La Valette', 'Toulon Est'];
