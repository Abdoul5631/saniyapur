import { apiFetch } from "@/lib/api";
import type { AdminNews } from "@/types/admin";
import type { PaginatedResponse } from "@/types/realisation";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: AdminNews[] | PaginatedResponse<AdminNews>) => (Array.isArray(data) ? data : data.results);

const mockNews: AdminNews[] = [
  {
    id: 1,
    title: "Exemple d’actualité",
    slug: "exemple-actualite",
    excerpt: "Fiche de démonstration destinée à valider l’affichage des actualités. Elle sera remplacée par les publications validées depuis l’administration.",
    content: "Cette actualité de démonstration ne constitue pas une publication officielle de J&B SANIYAPUR SARL.\n\nLe contenu complet des articles sera géré depuis l’interface d’administration.",
    author: "",
    image: "/images/realisation-hygiene.jpg",
    published: true,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export async function getNews(): Promise<AdminNews[]> {
  if (!useApi) return mockNews;
  try {
    return normaliseList(await apiFetch<AdminNews[] | PaginatedResponse<AdminNews>>("/news/", { next: { revalidate: 60 } }));
  } catch {
    return [];
  }
}

export async function getNewsArticle(slug: string): Promise<AdminNews | undefined> {
  if (!useApi) return mockNews.find((article) => article.slug === slug);
  try {
    return await apiFetch<AdminNews>(`/news/${slug}/`, { next: { revalidate: 60 } });
  } catch {
    return undefined;
  }
}

export const newsAreMocked = !useApi;
