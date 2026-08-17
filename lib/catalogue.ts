import raw from './catalogue-roady.json';
import tiers from './catalogue-tiers.json';

/**
 * Couche de présentation du catalogue W-Contact.
 *
 * Le JSON est un export de caisse : il contient des lignes de gestion interne et des
 * libellés en majuscules abrégées. Rien n'est corrigé dans le JSON lui-même — il est
 * régénérable depuis W-Contact — tout le nettoyage se fait ici, à l'affichage.
 */

export type Prestation = { designation: string; prix_ttc: number; ventes_2026?: number };

/** Période couverte par l'export (ex. « ventes 2026 (janv.→10 août) »). */
export const periode: string = (raw as { periode?: string }).periode ?? '';

/**
 * Mention obligatoire à côté de tout prix affiché (cf. BRIEF-Garde-fous.md) :
 * ces tarifs sont des forfaits réels, mais ils dépendent du véhicule.
 */
export const MENTION_PRIX = 'Tarif indicatif — peut varier selon le véhicule ; devis gratuit.';

/**
 * L'export ne contient plus que des prestations vérifiées (≥ 3 ventes en 2026,
 * prix réels de la grille) : le filtrage des écritures de caisse est fait en amont,
 * il n'y a donc plus rien à masquer ici. On n'ajoute et on ne retire aucune ligne.
 */

/** Sigles métier à garder tels quels une fois le libellé remis en minuscules. */
const SIGLES = new Set([
  'FAP', 'EGR', 'VL', 'VUL', 'ABS', 'ATF', 'ISO', 'AV', 'AR', '4X4', 'R134A', 'R1234YF',
  'S&S', 'GPS', 'LED', 'TTC',
]);

/** Abréviations de caisse -> mots lisibles. Appliquées mot à mot. */
const ABREVIATIONS: Record<string, string> = {
  ECHANGE: 'Échange', REMP: 'Remplacement', FORF: 'Forfait', FORFAIT: 'Forfait',
  CIRC: 'circuit', REFROID: 'refroidissement', LIQ: 'liquide', PLAQ: 'plaquettes',
  BTE: 'boîte', VEH: 'véhicule', 'VÉH': 'véhicule', ELEC: 'électrique',
  CYL: 'cylindres', INJ: 'injection', IND: 'indirecte', DIR: 'directe',
  DEPOSE: 'dépose', BATT: 'batterie', PAE: 'pompe à eau', NETT: 'nettoyage',
  HAB: 'habitacle', GD: 'grand', SPE: 'spécifique', UNIV: 'universelle',
  PROG: 'programmation', PB: 'pare-brise', DBE: 'double',
};

const MOTS_ACCENTUES: Record<string, string> = {
  'AV': 'avant', 'AR': 'arrière',
};

/**
 * L'export W-Contact est saisi sans accents et comporte quelques coquilles.
 * Corrigé ici, jamais dans le JSON : il est régénéré depuis la caisse.
 */
const ORTHOGRAPHE: Record<string, string> = {
  echappement: 'échappement', element: 'élément', cremailliere: 'crémaillère',
  preeq: 'pré-équipé', regharge: 'recharge', securite: 'sécurité',
  geometrie: 'géométrie', parallelisme: 'parallélisme', reparation: 'réparation',
  decalaminage: 'décalaminage', hydrogene: 'hydrogène', prechauffage: 'préchauffage',
  electronique: 'électronique', eligibilite: 'éligibilité', realisation: 'réalisation',
  revision: 'révision', renovation: 'rénovation', degrippant: 'dégrippant',
  degraissant: 'dégraissant', prevfectif: 'préventif', preventif: 'préventif',
  curatif: 'curatif', ethanol: 'éthanol', pre: 'pré', deposee: 'déposée',
  depose: 'déposée', defaut: 'défaut', refroidissement: 'refroidissement',
  rectification: 'rectification', bielette: 'biellette', manu: 'manuelle',
  jusqu: 'jusqu', poussee: 'poussée', regulateur: 'régulateur',
  demarrage: 'démarrage', prealable: 'préalable', complementaire: 'complémentaire',
  arriere: 'arrière', controle: 'contrôle', boitier: 'boîtier', boite: 'boîte', eco: 'éco',
  systeme: 'système', numero: 'numéro', cerine: 'cérine', emplatre: 'emplâtre',
  permutation: 'permutation', equilibrage: 'équilibrage', valve: 'valve',
  electrique: 'électrique', electronique2: 'électronique', tres: 'très',
  interieur: 'intérieur', vehicule: 'véhicule', reglage: 'réglage',
  remplacement: 'remplacement', gardiennage: 'gardiennage', lavage: 'lavage',
};

/** « ECHANGE DISQUES + PLAQ FREIN AR ELEC » -> « Échange disques + plaquettes frein arrière électrique » */
export function lisible(designation: string): string {
  const mots = designation.trim().replace(/\s*=>\s*/g, ' — ').split(/\s+/).map((mot) => {
    const nu = mot.replace(/[(),.]/g, '');
    if (MOTS_ACCENTUES[nu]) return mot.replace(nu, MOTS_ACCENTUES[nu]);
    if (SIGLES.has(nu.toUpperCase()) && nu === nu.toUpperCase()) return mot;
    if (ABREVIATIONS[nu.toUpperCase()]) return mot.replace(nu, ABREVIATIONS[nu.toUpperCase()]);
    if (/^X\d$/i.test(nu)) return mot.replace(nu, '×' + nu.slice(1));
    if (/^\d/.test(nu)) return mot; // dimensions, viscosités (5W30, 18 POUCES)
    const bas = nu.toLowerCase();
    if (ORTHOGRAPHE[bas]) return mot.toLowerCase().replace(bas, ORTHOGRAPHE[bas]);
    return mot.toLowerCase();
  });
  const phrase = mots.join(' ');
  return phrase.charAt(0).toUpperCase() + phrase.slice(1);
}

/** 119.9 -> « 119,90 € » ; 65 -> « 65 € » */
export function prix(v: number): string {
  return Number.isInteger(v)
    ? `${v} €`
    : `${v.toFixed(2).replace('.', ',')} €`;
}

/** Niveau de transparence tarifaire (cf. lib/catalogue-tiers.json). */
export type Tier = 'vert' | 'orange' | 'rouge';

function sansAccents(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Le tier d'une prestation, déduit des motifs du fichier de règles. */
export function tierDe(designation: string): Tier {
  const d = sansAccents(designation);
  for (const regle of tiers.regles) {
    if (regle.motifs.some((m) => d.includes(sansAccents(m)))) return regle.tier as Tier;
  }
  return tiers.defaut as Tier;
}

export type Item = Prestation & { label: string; tier: Tier };
export type Categorie = {
  nom: string;
  items: Item[];
  /** Plus petit prix RÉELLEMENT affichable (hors « sur devis »). 0 si aucun. */
  aPartirDe: number;
  ventes: number;
};

/** Catégories de prestations, nettoyées, dédoublonnées et triées par prix croissant. */
export const prestations: Categorie[] = Object.entries(
  raw.prestations as Record<string, Prestation[]>
)
  .map(([nom, items]) => {
    const vus = new Set<string>();
    const nettoyes = items
      .filter((it) => {
        // Le même forfait apparaît parfois plusieurs fois dans l'export.
        const cle = `${it.designation}|${it.prix_ttc}`;
        if (vus.has(cle)) return false;
        vus.add(cle);
        return true;
      })
      .map((it) => ({ ...it, label: lisible(it.designation), tier: tierDe(it.designation) }))
      .sort((a, b) => a.prix_ttc - b.prix_ttc);
    // « dès X € » ne doit jamais reprendre le prix d'une prestation sur devis :
    // ce serait annoncer un tarif qu'on a précisément choisi de ne pas publier.
    const affichables = nettoyes.filter((it) => it.tier !== 'rouge');
    return {
      nom,
      items: nettoyes,
      aPartirDe: affichables[0]?.prix_ttc ?? 0,
      ventes: nettoyes.reduce((n, it) => n + (it.ventes_2026 ?? 0), 0),
    };
  })
  .filter((c) => c.items.length > 0)
  // Les catégories les plus demandées en premier : c'est ce que le client cherche.
  .sort((a, b) => b.ventes - a.ventes);

export const totalPrestations = prestations.reduce((n, c) => n + c.items.length, 0);

/** Rendu du prix selon le niveau de transparence retenu pour la prestation. */
export function prixAffiche(it: { prix_ttc: number; tier: Tier }): string {
  if (it.tier === 'rouge') return 'Sur devis';
  if (it.tier === 'orange') return `dès ${prix(it.prix_ttc)}`;
  return prix(it.prix_ttc);
}

/**
 * Les forfaits les plus vendus, toutes catégories confondues. L'export porte
 * désormais les volumes réels : autant s'en servir pour mettre en avant ce que
 * les clients demandent vraiment, plutôt qu'un choix éditorial arbitraire.
 */
export const populaires: (Item & { categorie: string })[] = prestations
  .flatMap((c) => c.items.map((it) => ({ ...it, categorie: c.nom })))
  .filter((it) => (it.ventes_2026 ?? 0) > 0)
  .sort((a, b) => (b.ventes_2026 ?? 0) - (a.ventes_2026 ?? 0))
  .slice(0, 6);

/**
 * Boutique : on ne montre PAS les codes fournisseurs (« Fer Jeu De Plaquettes Fdb5025 »),
 * illisibles pour un client. On montre la largeur de gamme et les marques — c'est ce qui
 * rassure. Les descriptions et les marques ci-dessous sont éditoriales, pas extraites
 * de l'export : les exemples bruts ne s'y prêtent pas.
 */
const EDITO: Record<string, { desc: string; marques: string[]; icon: string }> = {
  'Filtres': { desc: 'Habitacle, air, huile, gazole — pour la quasi-totalité du parc courant.', marques: ['Purflux', 'Fiaam'], icon: 'diag' },
  'Huiles & lubrifiants': { desc: 'Du 0W20 au 10W40, en bidon ou au fût, normes constructeur respectées.', marques: ['Total', 'Motul', 'Mannol'], icon: 'oil' },
  'Freinage (pièces)': { desc: 'Plaquettes et disques avant et arrière, qualité première monte.', marques: ['Ferodo'], icon: 'brake' },
  'Distribution (pièces)': { desc: 'Kits complets courroie + galets + pompe à eau, et courroies accessoires.', marques: ['Gates'], icon: 'belt' },
  'Batteries': { desc: 'Du 44 au 100 Ah, standard, AGM et Start & Stop, auto et moto.', marques: ['Fiamm', 'Bosch'], icon: 'battery' },
  'Ampoules & éclairage': { desc: 'H7, H4, W5W, LED — remplacement possible immédiatement au comptoir.', marques: ['Osram', 'Neolux'], icon: 'diag' },
  'Essuie-glaces': { desc: 'Balais plats de 400 à 650 mm, avant et arrière, posés gratuitement.', marques: ['Bosch', 'Valeo'], icon: 'diag' },
  'Bougies': { desc: 'Allumage et préchauffage, nickel et iridium.', marques: ['NGK', 'Bosch'], icon: 'engine' },
  'Liquides & entretien': { desc: 'Lave-glace, liquide de refroidissement -20 °C à -37 °C, en 5 L.', marques: ['Carex'], icon: 'oil' },
  'Produits d’entretien & additifs': { desc: 'Nettoyants freins, dégrippants, nettoyants injecteurs, soins intérieurs.', marques: ['Textar', 'Bardahl'], icon: 'engine' },
  'Recharge climatisation': { desc: 'Gaz R134A et nouveau gaz R1234YF, recharge réalisée sur place.', marques: [], icon: 'ac' },
  'Gaz & recharge clim': { desc: 'Gaz R134A et nouveau gaz R1234YF, recharge réalisée sur place.', marques: [], icon: 'ac' },
  'Additifs & entretien': { desc: 'Nettoyants freins, dégrippants, nettoyants injecteurs, soins intérieurs.', marques: ['Textar', 'Bardahl'], icon: 'engine' },
  'Pièces train roulant': { desc: 'Amortisseurs, rotules, biellettes, triangles, roulements et soufflets.', marques: ['TRW', 'SKF', 'Moog'], icon: 'tire' },
  'Autres pièces & accessoires': { desc: 'Pneumatiques toutes dimensions, balais, accessoires d’habitacle, produits de lavage.', marques: ['Firestone', 'Michelin', 'Bridgestone', 'Valeo'], icon: 'tire' },
};

/** Ancre de lien vers une catégorie boutique : « Huiles & lubrifiants » -> « huiles-lubrifiants ». */
export function slug(nom: string): string {
  return nom
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export type CategorieBoutique = {
  nom: string;
  slug: string;
  /** Nombre de références DIFFÉRENTES vendues sur la période — ce n'est pas le stock. */
  nbReferences: number;
  desc: string;
  marques: string[];
  icon: string;
};

export const boutique: CategorieBoutique[] = Object.entries(
  raw.pieces as Record<string, { nb_references: number }>
)
  .map(([nom, v]) => ({
    nom,
    slug: slug(nom),
    nbReferences: v.nb_references,
    desc: EDITO[nom]?.desc ?? '',
    marques: EDITO[nom]?.marques ?? [],
    icon: EDITO[nom]?.icon ?? 'diag',
  }))
  .sort((a, b) => b.nbReferences - a.nbReferences);

export const totalReferences = boutique.reduce((n, c) => n + c.nbReferences, 0);
