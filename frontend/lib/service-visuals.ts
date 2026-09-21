import { resolveMediaUrl } from "@/lib/media";

/** Visuels locaux — équipe et terrains africains (pas de photos stock européennes). */

export type ServiceVisual = {
  image: string;
  tag: string;
  subtitle: string;
};

const africanVisuals: Record<string, ServiceVisual> = {
  "bionettoyage": {
    image: "/images/services/bionettoyage.png",
    tag: "Milieux médicaux",
    subtitle: "Désinfection hospitalière",
  },
  "decapage": {
    image: "/images/services/decapage.png",
    tag: "Plateaux techniques",
    subtitle: "Autolaveuses & préservation des sols",
  },
  "dechets": {
    image: "/images/services/dechets.png",
    tag: "Environnement",
    subtitle: "Tri, collecte & conformité",
  },
  "produits": {
    image: "/images/services/produits.png",
    tag: "Produits & matériel",
    subtitle: "Équipements professionnels",
  },
  "personnel": {
    image: "/images/services/personnel.png",
    tag: "Formation & équipes",
    subtitle: "Agents formés et encadrés",
  },
  "sanitaires": {
    image: "/images/services/hygiene-publique.png",
    tag: "Hygiène des sanitaires",
    subtitle: "Détartrage & assainissement",
  },
  "hygiene": {
    image: "/images/services/hygiene-publique.png",
    tag: "Espaces publics",
    subtitle: "Salubrité urbaine & collective",
  },
  "nettoyage": {
    image: "/images/services/nettoyage-equipe.png",
    tag: "Nettoyage professionnel",
    subtitle: "Interventions sur site",
  },
};

const slugAliases: Record<string, keyof typeof africanVisuals> = {
  "bionettoyage-desinfection": "bionettoyage",
  "bionettoyage-et-desinfection": "bionettoyage",
  "decapage-entretien-plateaux-techniques": "decapage",
  "decapage-et-entretien-des-plateaux-techniques": "decapage",
  "gestion-des-dechets-industriels": "dechets",
  "produits-equipements-professionnels": "produits",
  "formation-placement-du-personnel": "personnel",
  "traitement-des-sanitaires": "sanitaires",
  "hygiene-publique-environnementale": "hygiene",
  "hygiene-publique-et-environnementale": "hygiene",
  "nettoyage-securise": "nettoyage",
};

const fallbackVisual: ServiceVisual = {
  image: "/images/services/nettoyage-equipe.png",
  tag: "Prestation SANIYAPUR",
  subtitle: "Intervention professionnelle",
};

export function getServiceVisual(slug: string): ServiceVisual {
  const key = slugAliases[slug] ?? slugAliases[slug.replace(/-et-/g, "-")];
  if (key) return africanVisuals[key];
  if (slug.includes("bionet")) return africanVisuals.bionettoyage;
  if (slug.includes("decap")) return africanVisuals.decapage;
  if (slug.includes("dechet")) return africanVisuals.dechets;
  if (slug.includes("produit") || slug.includes("equip")) return africanVisuals.produits;
  if (slug.includes("personnel") || slug.includes("formation")) return africanVisuals.personnel;
  if (slug.includes("sanitaire")) return africanVisuals.sanitaires;
  if (slug.includes("hygiene") || slug.includes("environnement")) return africanVisuals.hygiene;
  if (slug.includes("nettoyage")) return africanVisuals.nettoyage;
  return fallbackVisual;
}

/** Image CMS si elle existe, sinon visuel local — jamais un fond noir vide. */
export function getServiceImage(slug: string, uploaded?: string | null) {
  return resolveMediaUrl(uploaded, getServiceVisual(slug).image);
}
