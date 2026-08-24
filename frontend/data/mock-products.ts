import type { Product } from "@/types/product";

/** Données de développement uniquement. Elles ne correspondent pas au catalogue de J&B SANIYAPUR SARL. */
export const mockProducts: Product[] = [
  { id: 1, name: "Produit de démonstration", slug: "produit-de-demonstration", reference: "", category: "Donnée de test", short_description: "Exemple technique servant à valider l’affichage du futur catalogue.", description: "Cette fiche de démonstration ne représente pas un produit commercialisé par J&B SANIYAPUR SARL. Elle sera remplacée par les informations validées depuis l’API Django.", usage: "Donnée de test — usage à renseigner depuis le catalogue officiel.", characteristics: "", image: "/images/realisation-hygiene.jpg", technical_sheet: null, safety_sheet: null, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z", gallery: [{ id: 1, image: "/images/realisation-hygiene.jpg", caption: "Visuel de test", order: 1 }] },
];
