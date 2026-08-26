import { apiFetch } from "@/lib/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminService } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: AdminService[] | PaginatedResponse<AdminService>) => Array.isArray(data) ? data : data.results;

/** Repli local si l'API n'est pas configurée — mêmes libellés que les 7 domaines officiels. */
const mockServices: AdminService[] = [
  { id: 1, name: "Bionettoyage et désinfection", slug: "bionettoyage-desinfection", short_description: "Des protocoles d’hygiène pensés pour des environnements maîtrisés.", description: "Le bionettoyage et la désinfection s’adressent aux espaces où la maîtrise de l’hygiène est déterminante. Le détail des protocoles, des prestations et des environnements concernés est renseigné depuis l’administration.", image: null, icon: "droplet", order: 1, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 2, name: "Décapage et entretien des plateaux techniques", slug: "decapage-entretien-plateaux-techniques", short_description: "L’entretien professionnel des espaces et équipements techniques.", description: "Le décapage et l’entretien des plateaux techniques visent la préservation des espaces et équipements professionnels. Les prestations associées seront précisées depuis l’administration.", image: null, icon: "grid", order: 2, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 3, name: "Gestion des déchets industriels", slug: "gestion-des-dechets-industriels", short_description: "Une gestion adaptée aux déchets issus des activités industrielles.", description: "La gestion des déchets industriels s’inscrit dans une démarche de propreté, de sécurité et de responsabilité environnementale. Le détail opérationnel est publié depuis l’administration.", image: null, icon: "trash", order: 3, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 4, name: "Produits et équipements professionnels", slug: "produits-equipements-professionnels", short_description: "Des produits et équipements dédiés aux usages professionnels.", description: "SANIYAPUR propose des produits et équipements professionnels d’hygiène. Le catalogue détaillé est disponible dans la rubrique Produits, gérée depuis l’administration.", image: null, icon: "box", order: 4, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 5, name: "Formation et placement du personnel", slug: "formation-placement-du-personnel", short_description: "La formation et le placement de personnel.", description: "La formation et le placement du personnel accompagnent les organisations dans la montée en compétence et la mise à disposition de personnels. Le contenu détaillé sera précisé depuis l’administration.", image: null, icon: "people", order: 5, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 6, name: "Traitement des sanitaires", slug: "traitement-des-sanitaires", short_description: "Des solutions dédiées au traitement des sanitaires.", description: "Le traitement des sanitaires vise des espaces propres, sains et maîtrisés. Les prestations associées sont renseignées depuis l’administration.", image: null, icon: "tap", order: 6, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 7, name: "Hygiène publique et environnementale", slug: "hygiene-publique-environnementale", short_description: "Des actions en faveur d’environnements propres et sains.", description: "L’hygiène publique et environnementale contribue à des espaces collectifs plus sains. Le détail des interventions est publié depuis l’administration.", image: null, icon: "shield", order: 7, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
];

export async function getServices(): Promise<AdminService[]> {
  if (!useApi) return mockServices.filter((service) => service.published);
  try {
    const data = normaliseList(await apiFetch<AdminService[] | PaginatedResponse<AdminService>>("/services/", { next: { revalidate: 60 } }));
    return [...data].filter((service) => service.published).sort((a, b) => a.order - b.order);
  } catch {
    return [];
  }
}

export async function getService(slug: string): Promise<AdminService | undefined> {
  if (!useApi) return mockServices.find((service) => service.slug === slug && service.published);
  try {
    const service = await apiFetch<AdminService>(`/services/${slug}/`, { next: { revalidate: 60 } });
    return service.published ? service : undefined;
  } catch {
    return undefined;
  }
}
