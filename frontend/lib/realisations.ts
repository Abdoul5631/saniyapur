import { mockRealisations } from "@/data/mock-realisations";
import { apiFetch, apiFetchAll } from "@/lib/api";
import type { Realisation } from "@/types/realisation";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

function withImages(item: Realisation): Realisation {
  return { ...item, images: Array.isArray(item.images) ? item.images : [] };
}

export async function getRealisations(): Promise<Realisation[]> {
  if (!useApi) return mockRealisations.map(withImages);
  try {
    return (await apiFetchAll<Realisation>("/realisations/", { next: { revalidate: 60 } })).map(withImages);
  } catch (err) {
    console.error("getRealisations error:", err);
    return [];
  }
}

export async function getRealisation(slug: string): Promise<Realisation | undefined> {
  const safeSlug = encodeURIComponent(slug);
  if (!useApi) return mockRealisations.map(withImages).find((realisation) => realisation.slug === slug);
  try {
    return withImages(await apiFetch<Realisation>(`/realisations/${safeSlug}/`, { next: { revalidate: 60 } }));
  } catch {
    const fromList = (await getRealisations()).find((item) => item.slug === slug && item.published);
    return fromList;
  }
}

export const realisationsAreMocked = !useApi;
