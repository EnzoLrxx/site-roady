import raw from './catalogue-roady.json';

/**
 * Couche de présentation du catalogue W-Contact.
 *
 * Le JSON est un export de caisse : il contient des lignes de gestion interne et des
 * libellés en majuscules abrégées. Rien n'est corrigé dans le JSON lui-même — il est
 * régénérable depuis W-Contact — tout le nettoyage se fait ici, à l'affichage.
 */

export type Prestation = { designation: string; prix_ttc: number };

/**
 * Lignes de caisse à ne jamais montrer au client. Une « REMISE VIDANGE 10 EUROS »
 * affichée à 10 € laisserait croire à une vidange à 10 €.
 */
const LIGNES_INTERNES =
  /^(REMISE\b|BON ACHAT\b|PRODUITS CONNEXES|FRAIS DE\b|TARIF HORAIRE\b|PRISE EN CHARGE\b|MAIN D'OEUVRE MECANIQUE)/i;

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
  controle: 'contrôle', boitier: 'boîtier', boite: 'boîte', eco: 'éco',
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

export type Categorie = { nom: string; items: (Prestation & { label: string })[]; aPartirDe: number };

/** Catégories de prestations, nettoyées, dédoublonnées et triées par prix croissant. */
export const prestations: Categorie[] = Object.entries(
  raw.prestations as Record<string, Prestation[]>
)
  .map(([nom, items]) => {
    const vus = new Set<string>();
    const nettoyes = items
      .filter((it) => !LIGNES_INTERNES.test(it.designation))
      .filter((it) => {
        // Le même forfait apparaît parfois plusieurs fois dans l'export.
        const cle = `${it.designation}|${it.prix_ttc}`;
        if (vus.has(cle)) return false;
        vus.add(cle);
        return true;
      })
      .map((it) => ({ ...it, label: lisible(it.designation) }))
      .sort((a, b) => a.prix_ttc - b.prix_ttc);
    return { nom, items: nettoyes, aPartirDe: nettoyes[0]?.prix_ttc ?? 0 };
  })
  .filter((c) => c.items.length > 0)
  .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));

export const totalPrestations = prestations.reduce((n, c) => n + c.items.length, 0);

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
  'Batteries': { desc: 'Du 50 au 100 Ah, standard, AGM et Start & Stop, en stock.', marques: ['Fiamm', 'Bosch'], icon: 'battery' },
  'Ampoules & éclairage': { desc: 'H7, H4, W5W, LED — remplacement possible immédiatement au comptoir.', marques: ['Osram', 'Neolux'], icon: 'diag' },
  'Essuie-glaces': { desc: 'Balais plats de 400 à 650 mm, avant et arrière, posés gratuitement.', marques: ['Bosch', 'Valeo'], icon: 'diag' },
  'Bougies': { desc: 'Allumage et préchauffage, nickel et iridium.', marques: ['NGK', 'Bosch'], icon: 'engine' },
  'Liquides & entretien': { desc: 'Lave-glace, liquide de refroidissement -20 °C à -37 °C, en 5 L.', marques: ['Carex'], icon: 'oil' },
  'Produits d’entretien & additifs': { desc: 'Nettoyants freins, dégrippants, nettoyants injecteurs, soins intérieurs.', marques: ['Textar', 'Bardahl'], icon: 'engine' },
  'Recharge climatisation': { desc: 'Gaz R134A et nouveau gaz R1234YF, recharge réalisée sur place.', marques: [], icon: 'ac' },
};

export type CategorieBoutique = {
  nom: string;
  nbReferences: number;
  desc: string;
  marques: string[];
  icon: string;
};

export const boutique: CategorieBoutique[] = Object.entries(
  raw.produits_boutique as Record<string, { nb_references: number }>
)
  .map(([nom, v]) => ({
    nom,
    nbReferences: v.nb_references,
    desc: EDITO[nom]?.desc ?? '',
    marques: EDITO[nom]?.marques ?? [],
    icon: EDITO[nom]?.icon ?? 'diag',
  }))
  .sort((a, b) => b.nbReferences - a.nbReferences);

export const totalReferences = boutique.reduce((n, c) => n + c.nbReferences, 0);
