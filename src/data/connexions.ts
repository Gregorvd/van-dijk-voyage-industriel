/**
 * Supply chain connections between visited companies.
 * Defined centrally so both the overview page and detail pages can reference them.
 */

export interface Connexion {
  source: string;
  cible: string;
  type: 'fournisseur' | 'partenaire';
  description: string;
  descriptionEn: string;
}

export interface Cluster {
  nom: string;
  nomEn: string;
  description: string;
  descriptionEn: string;
  etudes: string[];
}

export const connexions: Connexion[] = [
  {
    source: 'rolf-prima',
    cible: 'co-motion',
    type: 'fournisseur',
    description: 'Fournit des jeux de roues artisanales haut de gamme pour les tandems et vélos de touring',
    descriptionEn: 'Supplies hand-built premium wheelsets for tandems and touring bikes',
  },
  {
    source: 'rolf-prima',
    cible: 'bike-friday',
    type: 'fournisseur',
    description: 'Fournit des roues légères adaptées au format pliant 20 pouces',
    descriptionEn: 'Supplies lightweight wheels adapted for 20-inch folding format',
  },
  {
    source: 'co-motion',
    cible: 'bike-friday',
    type: 'partenaire',
    description: 'Partagent le même écosystème fournisseurs titane et acier à Eugene',
    descriptionEn: 'Share the same titanium and steel supplier ecosystem in Eugene',
  },
  {
    source: 'paragon',
    cible: 'circa',
    type: 'fournisseur',
    description: 'Fournit des pièces usinées (pattes, passages de câbles) pour les cadreurs artisanaux comme CIRCA',
    descriptionEn: 'Supplies machined parts (dropouts, cable guides) for artisan frame builders like CIRCA',
  },
];

export const clusters: Cluster[] = [
  {
    nom: 'Cluster vélo d\'Eugene',
    nomEn: 'Eugene Bicycle Cluster',
    description: 'Trois fabricants de vélos artisanaux dans un rayon de 5 km à Eugene, Oregon. Cet écosystème industriel unique favorise le partage de savoir-faire, de fournisseurs et de main-d\'œuvre qualifiée — un exemple concret de district industriel marshallien à l\'échelle micro.',
    descriptionEn: 'Three artisan bicycle manufacturers within 5 km of each other in Eugene, Oregon. This unique industrial ecosystem fosters the sharing of expertise, suppliers and skilled labor — a concrete example of a Marshallian industrial district at micro scale.',
    etudes: ['co-motion', 'rolf-prima', 'bike-friday'],
  },
  {
    nom: 'Californie — Composants & sous-traitance',
    nomEn: 'California — Components & subcontracting',
    description: 'White Industries (Petaluma) et Paragon Machine Works (Richmond) forment un pôle de compétences CNC en Californie du Nord. Fournisseurs de référence pour les cadreurs artisanaux américains.',
    descriptionEn: 'White Industries (Petaluma) and Paragon Machine Works (Richmond) form a CNC competence hub in Northern California. Reference suppliers for American artisan frame builders.',
    etudes: ['white-industries', 'paragon'],
  },
];

/**
 * Get all connections for a given study (as source or target).
 */
export function getConnexionsForStudy(studyId: string): Array<Connexion & { direction: 'outgoing' | 'incoming' }> {
  const result: Array<Connexion & { direction: 'outgoing' | 'incoming' }> = [];
  for (const c of connexions) {
    if (c.source === studyId) {
      result.push({ ...c, direction: 'outgoing' });
    } else if (c.cible === studyId) {
      result.push({ ...c, direction: 'incoming' });
    }
  }
  return result;
}
