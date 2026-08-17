import raw from './catalogue-roady.json';
import tiers from './catalogue-tiers.json';
import estimateur from './estimator-data.json';
import { marquesConfirmees } from './site';

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
export type Tier = 'vitrine' | 'apartir' | 'devis';

function sansAccents(s: string) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

type Vitrine = { motif: string; label: string; prix: number; unite: string; apartir?: boolean };
const VITRINES = tiers.vitrines as Vitrine[];

/** p25 réel d'une famille, lu depuis l'estimateur. `null` si l'échantillon est trop faible. */
function p25(cle: string): number | null {
  const c = (estimateur.categories as { key: string; low: number | null; n?: number }[])
    .find((x) => x.key === cle);
  if (!c || c.low == null) return null;
  // Un « à partir de » adossé à une poignée de devis ne vaut rien : on préfère
  // « sur devis » à un chiffre que le comptoir ne pourra pas tenir.
  if ((c.n ?? 0) < tiers.n_min) return null;
  return c.low;
}

type Classement =
  | { tier: 'vitrine'; vitrine: Vitrine }
  | { tier: 'apartir'; prix: number; famille: string }
  | { tier: 'devis' };

/**
 * Classe une prestation. Ordre : vitrine (choix du gérant), puis « à partir de »
 * adossé à un p25 réel, sinon « sur devis ».
 * Le défaut est volontairement « devis » : mieux vaut ne pas afficher de prix
 * qu'un prix susceptible d'induire en erreur.
 */
export function classer(designation: string): Classement {
  const d = sansAccents(designation);

  const v = VITRINES.find((x) => d.includes(sansAccents(x.motif)));
  if (v) return { tier: 'vitrine', vitrine: v };

  for (const f of tiers.apartir) {
    if (f.motifs.some((m) => d.includes(sansAccents(m)))) {
      const prix = p25(f.estimateur);
      return prix == null ? { tier: 'devis' } : { tier: 'apartir', prix, famille: f.label };
    }
  }
  return { tier: 'devis' };
}

/** Famille corrigée quand l'export range la prestation dans une catégorie aberrante. */
function familleCorrigee(designation: string, defaut: string): string {
  const d = sansAccents(designation);
  const r = tiers.taxonomie.find((t) => t.motifs.some((m) => d.includes(sansAccents(m))));
  return r ? r.famille : defaut;
}

export type Item = Prestation & {
  label: string;
  tier: Tier;
  affiche: string;
  /** p25 de la famille, porté par l'item pour être remonté au niveau catégorie. */
  p25?: number;
};
export type Categorie = {
  nom: string;
  items: Item[];
  ventes: number;
  /** « à partir de » de la FAMILLE, quand un p25 réel existe. `null` sinon. */
  aPartirDe: number | null;
};

/**
 * Rendu du prix, LIGNE par ligne.
 *
 * Règle du cahier : on n'affiche un prix que sur les prix vitrines ; tout le
 * reste est « Sur devis », sans prix. Le p25 d'une famille n'est donc jamais
 * répété sur chaque ligne — ce serait absurde (une révision à 305 € annoncée
 * « à partir de 165 € ») — il est remonté au niveau de la famille.
 */
function afficher(designation: string): { tier: Tier; affiche: string; p25?: number; libelle?: string } {
  const c = classer(designation);
  if (c.tier === 'vitrine') {
    const p = prix(c.vitrine.prix) + c.vitrine.unite;
    // Le libellé validé par le gérant prime sur celui de la caisse : « Recharge
    // climatisation (R134A) » plutôt que « Forfait clim charge "promo" ».
    return {
      tier: 'vitrine',
      affiche: c.vitrine.apartir ? `à partir de ${p}` : p,
      libelle: c.vitrine.label,
    };
  }
  if (c.tier === 'apartir') return { tier: 'apartir', affiche: 'Sur devis', p25: c.prix };
  return { tier: 'devis', affiche: 'Sur devis' };
}

/**
 * Prestations regroupées par famille. Aucun « dès {prix mini} » n'est calculé au
 * niveau catégorie : le minimum d'une famille n'est pas un prix d'appel honnête
 * (le plus bas de « Moteur & distribution » était une pose de silencieux à 35 €).
 */
const parFamille = new Map<string, Item[]>();
for (const [famille, items] of Object.entries(raw.prestations as Record<string, Prestation[]>)) {
  const vus = new Set<string>();
  for (const it of items) {
    // Le même forfait apparaît parfois plusieurs fois dans l'export.
    const cle = `${it.designation}|${it.prix_ttc}`;
    if (vus.has(cle)) continue;
    vus.add(cle);
    const nom = familleCorrigee(it.designation, famille);
    const rendu = afficher(it.designation);
    const liste = parFamille.get(nom) ?? [];
    // Plusieurs lignes de caisse peuvent pointer vers un même prix vitrine
    // (« RENOVATION OPTIQUE X2 » et « RÉNOVATION OPTIQUE PHARE X2 ») : on n'en
    // publie qu'une, sous son libellé validé.
    if (rendu.libelle && liste.some((x) => x.label === rendu.libelle)) continue;
    liste.push({ ...it, label: rendu.libelle ?? lisible(it.designation), ...rendu });
    parFamille.set(nom, liste);
  }
}

export const prestations: Categorie[] = [...parFamille.entries()]
  .map(([nom, items]) => {
    const p25s = items.map((i) => i.p25).filter((v): v is number => typeof v === 'number');
    return {
      nom,
      items: items.sort((a, b) => a.prix_ttc - b.prix_ttc),
      ventes: items.reduce((n, it) => n + (it.ventes_2026 ?? 0), 0),
      aPartirDe: p25s.length ? Math.min(...p25s) : null,
    };
  })
  .filter((c) => c.items.length > 0)
  // Les catégories les plus demandées en premier : c'est ce que le client cherche.
  .sort((a, b) => b.ventes - a.ventes);

export const totalPrestations = prestations.reduce((n, c) => n + c.items.length, 0);

/**
 * « Les plus demandés » : uniquement des prix vitrines. Un prix mini trompeur
 * (« vidange dès 19 € ») n'a rien à faire en tête de page.
 */
export const populaires: (Item & { categorie: string })[] = prestations
  .flatMap((c) => c.items.map((it) => ({ ...it, categorie: c.nom })))
  .filter((it) => it.tier === 'vitrine')
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
    // Filtre volontaire : une marque non confirmée par Enzo n'est pas affichée.
    marques: (EDITO[nom]?.marques ?? []).filter((m) => marquesConfirmees.includes(m)),
    icon: EDITO[nom]?.icon ?? 'diag',
  }))
  .sort((a, b) => b.nbReferences - a.nbReferences);

export const totalReferences = boutique.reduce((n, c) => n + c.nbReferences, 0);
