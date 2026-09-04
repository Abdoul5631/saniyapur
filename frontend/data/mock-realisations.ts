import type { Realisation } from "@/types/realisation";

/** Données de développement uniquement. Elles ne représentent aucune réalisation de J&B SANIYAPUR SARL. */
export const mockRealisations: Realisation[] = [
  {
    id: 1, title: "Exemple de démonstration — Hygiène industrielle", slug: "exemple-hygiene-industrielle", description: "Fiche de démonstration destinée à valider l’affichage de plusieurs photos, d’un secteur et d’un comparatif avant / après. À remplacer par une réalisation validée via l’API.", client: "Donnée de test", location: "Donnée de test", sector: "Industrie", service: null, date: "2026-01-01", featured: true, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z",
    images: [
      { id: 1, realisation: 1, image: "/images/services/decapage.jpg", caption: "Intervention — Traitement de surface", type: "before", order: 1 },
      { id: 2, realisation: 1, image: "/images/realisation-hygiene.jpg", caption: "Intervention — Résultat après lustrage", type: "after", order: 2 },
      { id: 3, realisation: 1, image: "/images/services/personnel.jpg", caption: "Équipe technique en mission", type: "gallery", order: 3 },
    ],
  },
];

