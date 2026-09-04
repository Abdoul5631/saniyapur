import { mockRealisations } from "@/data/mock-realisations";
import { apiFetch } from "@/lib/api";
import type { PaginatedResponse, Realisation } from "@/types/realisation";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: Realisation[] | PaginatedResponse<Realisation>) => Array.isArray(data) ? data : data.results;

export async function getRealisations(): Promise<Realisation[]> {
  try {
    const list = normaliseList(await apiFetch<Realisation[] | PaginatedResponse<Realisation>>("/realisations/", { cache: "no-store" }));
    if (list.length > 0) return list;
  } catch (err) {
    console.error("getRealisations error:", err);
  }
  return mockRealisations;
}

export async function getRealisation(slug: string): Promise<Realisation | undefined> {
  if (!useApi) return mockRealisations.find((realisation) => realisation.slug === slug);
  try { return await apiFetch<Realisation>(`/realisations/${slug}/`, { next: { revalidate: 60 } }); } catch { return undefined; }
}

export const realisationsAreMocked = !useApi;
