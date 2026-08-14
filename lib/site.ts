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
  // Note Google réelle, relevée sur la fiche d'établissement le 14/08/2026.
  googleRating: 4.3,
  googleCount: 444,
  googleReviewsUrl: 'https://www.google.com/search?q=Roady+Solli%C3%A8s-Pont+avis',
} as const;

// IMAGES : rapatriées du WordPress dans /public/img (14/08/2026).
// Elles sont désormais servies par le site lui-même : la bascule DNS ne les casse plus.
export const photos = {
  atelier: '/img/photos/IMG_2560.jpg',
  essuie: '/img/photos/IMG_2528.jpg',
  batteries: '/img/photos/IMG_2534.jpg',
  huiles: '/img/photos/IMG_2550.jpg',
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

// Logos réels (rapatriés du WordPress dans /public/img/marques).
export const brands = [
  { name: 'Michelin', logo: '/img/marques/pneu-michelin.png' },
  { name: 'Bridgestone', logo: '/img/marques/pneu-bridgestone.png' },
  { name: 'Firestone', logo: '/img/marques/Pneu-firestone.png' },
  { name: 'Total', logo: '/img/marques/total-huile.png' },
  { name: 'Motul', logo: '/img/marques/huiles-motul.png' },
  { name: 'Valeo', logo: '/img/marques/valeo.png' },
  { name: 'NGK', logo: '/img/marques/ngk.png' },
  { name: 'Osram', logo: '/img/marques/Osram.png' },
];

// ⚠️ AVIS : remplace ces 3 exemples par tes VRAIS avis Google/Goodays (copier-coller).
export const reviews = [
  { name: 'Julien M.', stars: 5, text: 'Accueil au top, devis clair et pas de mauvaise surprise. On voit qu’ils sont sérieux et honnêtes.' },
  { name: 'Sophie R.', stars: 5, text: 'Rapide pour la recharge de clim, prix correct. Je recommande sans hésiter, équipe sympa.' },
  { name: 'Karim B.', stars: 5, text: 'Ils m’ont montré en photo les pièces usées de ma voiture — franchement ça change tout côté confiance.' },
];

// Offres du moment — reprises des visuels réels du garage (bannières WordPress/Facebook).
// Un seul style de carte pour toutes : c'est ce qui manquait à l'ancien carrousel,
// où chaque offre avait sa propre couleur criarde.
// `kind: 'compare'` déclenche le comparateur avant/après (rénovation de phares).
export type Offer = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  /** Prix affiché en gros. `null` quand l'offre n'a pas de prix (ex. la fidélité). */
  price: string | null;
  unit: string;
  /** Remplace le prix quand celui-ci est `null`. */
  headline?: string;
  points: string[];
  icon?: string;
  kind?: 'compare';
  before?: string;
  after?: string;
};

export const offers: Offer[] = [
  {
    id: 'clim',
    tag: 'Le plus demandé',
    title: 'Recharge climatisation',
    subtitle: 'Gaz R134A',
    price: '69',
    unit: '€',
    points: ['Diagnostic de fonctionnement', 'Recharge complète du circuit', 'Sans limite de quantité de gaz'],
    icon: 'ac',
  },
  {
    id: 'phares',
    tag: 'Avant / après',
    title: 'Rénovation d’optique de phares',
    subtitle: 'Auto, moto, camping-car, poids lourd',
    price: '39',
    unit: '€ / phare',
    points: ['Phares oxydés et opaques comme neufs', 'Vous récupérez votre capacité d’éclairage', 'Plus de 10 % des refus au contrôle technique viennent des optiques'],
    kind: 'compare',
    before: '/img/offres/phare-avant.jpg',
    after: '/img/offres/phare-apres.jpg',
  },
  {
    id: 'depollution',
    tag: 'Nouveau',
    title: 'Dépollution moteur',
    subtitle: 'Éco-nettoyage Bardahl 360 Hybrid',
    price: '99',
    unit: '€',
    points: ['Retrouvez les performances d’origine', 'Vanne EGR et FAP décalaminés', 'Évite des réparations coûteuses'],
    icon: 'engine',
  },
  {
    id: 'fidelite',
    tag: 'Gratuit',
    title: 'Carte de fidélité Roady',
    subtitle: 'Votre programme de fidélité',
    price: null,
    unit: '',
    headline: '1 € dépensé = 1 point',
    points: ['250 points = 10 € offerts', 'Valable en atelier comme en boutique', 'Adhésion gratuite au comptoir'],
    icon: 'battery',
  },
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
