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
// L'ancienne photo « atelier » (IMG_2560) montrait le comptoir pare-brise, couvert de
// « ICI REMPLACEZ VOTRE PARE-BRISE / Franchise offerte ». Prestation abandonnée : elle
// a été retirée du site, où elle servait au hero, au diagnostic ET à la boutique.
export const photos = {
  devanture: '/img/photos/devanture.jpg',
  atelier: '/img/photos/atelier-machines.jpg',
  pneus: '/img/photos/pneus.jpg',
  essuie: '/img/photos/IMG_2528.jpg',
  batteries: '/img/photos/IMG_2534.jpg',
  huiles: '/img/photos/IMG_2550.jpg',
};

/** Badges du hero. « Sans rendez-vous » remplacé par « Diagnostic en photos » (cahier §10). */
export const heroBadges = ['Toutes marques', 'Diagnostic en photos', 'Paiement 3x / 4x', 'Devis gratuit'];

/** Message affiché après envoi du formulaire — texte imposé par le gérant (cahier §11). */
export const CONFIRMATION_DEVIS =
  'Votre demande a bien été transmise à l’équipe ROADY Solliès-Pont. Nous revenons vers vous pendant nos horaires d’ouverture.';

/**
 * « Par où commencer ? » — les trois portes d'entrée du cahier (§12).
 * Elles convergent toutes vers une demande qualifiée.
 */
export const portes = [
  {
    titre: 'Nos prestations',
    desc: 'Ce que nous faisons, avec les tarifs quand ils sont fixes.',
    href: '#prestations',
    cta: 'Voir les prestations',
    icon: 'oil',
  },
  {
    titre: 'J’ai un problème avec ma voiture',
    desc: 'Un bruit, un voyant, une vibration ? Partez du symptôme.',
    href: '#problemes',
    cta: 'Décrire mon problème',
    icon: 'diag',
  },
  {
    titre: 'Devis gratuit',
    desc: 'Une estimation immédiate, puis un prix exact après contrôle.',
    href: '#contact',
    cta: 'Demander mon devis',
    icon: 'brake',
  },
];

/**
 * « Quel problème rencontrez-vous ? » (cahier §6 et §12).
 * `categorie` correspond à une clé de lib/estimator-data.json : cliquer sur une
 * tuile présélectionne cette catégorie dans le formulaire de devis.
 */
export const problemes = [
  { symptome: 'Ma climatisation ne fait plus de froid', piste: 'Diagnostic climatisation', categorie: 'climatisation' },
  { symptome: 'Un voyant s’est allumé', piste: 'Diagnostic électronique', categorie: 'autre' },
  { symptome: 'Ma voiture tire à droite ou à gauche', piste: 'Pneus, géométrie, train roulant', categorie: 'geometrie' },
  { symptome: 'Mon volant vibre', piste: 'Pneus, équilibrage, géométrie', categorie: 'geometrie' },
  { symptome: 'Bruit au freinage', piste: 'Contrôle du freinage', categorie: 'freinage' },
  { symptome: 'Démarrage difficile', piste: 'Batterie, alternateur, démarreur', categorie: 'batterie' },
  { symptome: 'Manque de puissance', piste: 'Diagnostic, dépollution', categorie: 'autre' },
  { symptome: 'Bruit inhabituel', piste: 'Diagnostic mécanique', categorie: 'autre' },
  { symptome: 'Je ne sais pas ce qu’a ma voiture', piste: 'Décrire mon problème', categorie: 'autre' },
];

/**
 * Hiérarchisation des travaux présentée au client (cahier §5).
 * Bloc explicatif : le diagnostic en photos se fait en atelier sur la tablette
 * Lemonauto, ce n'est pas une fonctionnalité du site.
 */
export const urgences = [
  {
    niveau: 'Urgent',
    desc: 'Intervention à réaliser rapidement, pour votre sécurité ou pour éviter que la panne ne s’aggrave.',
  },
  {
    niveau: 'À prévoir',
    desc: 'Intervention non urgente : à surveiller, ou à programmer lors d’un prochain passage.',
  },
];

export const services = [
  // « contrôle 24 points » retiré ici aussi : le chiffre n'est fondé sur rien,
  // il avait déjà été enlevé de la bande de statistiques.
  { t: 'Révision & vidange', d: 'Forfaits entretien toutes marques, filtres et contrôle inclus.', icon: 'oil' },
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

// AVIS — volontairement VIDE.
// Les trois avis qui figuraient ici (Julien M., Sophie R., Karim B.) étaient inventés
// par le scaffold initial. Publier de faux témoignages est interdit (pratique
// commerciale trompeuse) autant que contraire à BRIEF-Garde-fous.md.
// La section affiche donc la vraie note Google et renvoie vers les avis réels.
// Pour en afficher : copier-coller ici de VRAIS avis (prénom + texte), rien d'autre.
export const reviews: { name: string; stars: number; text: string }[] = [];

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
    // Bulles courtes : le détail (UV, contrôle technique) est développé dans la
    // section « preuve en images » juste sous le carrousel, inutile de le répéter.
    points: ['Phares oxydés comme neufs', 'Vous récupérez votre éclairage', 'Utile avant le contrôle technique'],
    icon: 'diag',
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

/**
 * Informations légales de l'éditeur (mentions légales, LCEN art. 6).
 * Fournies par Enzo le 14/08/2026. Le siège social diffère de l'adresse du centre :
 * le siège est au lieu-dit La Poulasse, le magasin au 6 bis avenue du Lion.
 */
export const legalInfo = {
  forme: 'SAS',
  denomination: 'SUNCAR',
  capital: '40 000 €',
  siege: 'Lieu-dit La Poulasse, 83210 Solliès-Pont',
  rcs: 'Toulon 490 492 782',
  siren: '490 492 782',
  /** SIRET = SIREN + NIC (5 chiffres) de l'établissement. À compléter. */
  siret: null as string | null,
  tva: 'FR95490492782',
  directeur: 'Éric Leroux',
  directeurQualite: 'Président',
};

// Chiffres SOURÇABLES uniquement (BRIEF-Garde-fous.md).
// « 24 points de contrôle » et « 8 métiers sous un même toit » ont été retirés :
// aucune donnée ne les fonde. Remplacés par deux chiffres tirés de l'export de
// caisse 2026, donc vérifiables : interventions réalisées et références vendues.
export const stats = [
  { n: 3829, suffix: '', label: 'interventions depuis janvier 2026' },
  { n: 2129, suffix: '', label: 'références différentes vendues' },
  { n: 400, suffix: ' m²', label: 'de boutique & atelier' },
  { n: 6, suffix: 'j/7', label: 'ouvert du lundi au samedi' },
];

export const faq = [
  { q: 'Faut-il prendre rendez-vous ?', a: 'Non, nous travaillons avec ou sans rendez-vous. Pour les grosses interventions (distribution, embrayage), un rendez-vous permet d’aller plus vite.' },
  { q: 'Puis-je payer en plusieurs fois ?', a: 'Oui, nous proposons le paiement en 3x ou 4x par carte, sans démarche compliquée. Idéal pour étaler une grosse réparation.' },
  { q: 'Entretenez-vous toutes les marques ?', a: 'Oui, toutes marques — sans perdre la garantie constructeur. Nous utilisons des pièces et huiles aux normes du constructeur.' },
  { q: 'Le devis est-il gratuit ?', a: 'Toujours. Décrivez votre besoin via le formulaire ou par téléphone, et nous revenons vers vous rapidement avec un prix clair, aux horaires d’ouverture.' },
  { q: 'C’est quoi le “diagnostic en photo” ?', a: 'À chaque contrôle, nous prenons des photos de l’usure réelle de votre véhicule. Vous voyez de vos yeux ce qui est à changer — aucune décision à l’aveugle.' },
];

export const zones = ['Solliès-Pont', 'Solliès-Ville', 'Solliès-Toucas', 'La Farlède', 'La Crau', 'Cuers', 'Belgentier', 'Hyères', 'La Valette', 'Toulon Est'];
