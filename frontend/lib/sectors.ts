import { apiFetch } from "@/lib/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminSector } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: AdminSector[] | PaginatedResponse<AdminSector>) => Array.isArray(data) ? data : data.results;

/** Repli local si l'API n'est pas configurée. */
const mockSectors: AdminSector[] = [
  { id: 1, name: "Santé", slug: "sante", description: "Des exigences d’hygiène renforcées.", image: null, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 2, name: "Industrie", slug: "industrie", description: "Des espaces et équipements à préserver.", image: null, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 3, name: "Hôtellerie", slug: "hotellerie", description: "Des environnements accueillants et maîtrisés.", image: null, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
  { id: 4, name: "Commerce", slug: "commerce", description: "Des espaces fréquentés où l’image et l’hygiène comptent.", image: null, published: true, created_at: "2026-01-01T00:00:00Z", updated_at: "2026-01-01T00:00:00Z" },
];

export const officialSectorNames = ["Santé", "Industrie", "Hôtellerie", "Commerce"] as const;

export async function getSectors(): Promise<AdminSector[]> {
  if (!useApi) return mockSectors.filter((sector) => sector.published);
  try {
    return normaliseList(await apiFetch<AdminSector[] | PaginatedResponse<AdminSector>>("/sectors/", { next: { revalidate: 60 } })).filter((sector) => sector.published);
  } catch {
    return [];
  }
}

export async function getSector(slug: string): Promise<AdminSector | undefined> {
  if (!useApi) return mockSectors.find((sector) => sector.slug === slug && sector.published);
  try {
    const sector = await apiFetch<AdminSector>(`/sectors/${slug}/`, { next: { revalidate: 60 } });
    return sector.published ? sector : undefined;
  } catch {
    return undefined;
  }
}
