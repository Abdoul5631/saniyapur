import { apiFetch, apiFetchAll } from "@/lib/api";
import type { AdminNews } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

const mockNews: AdminNews[] = [
  {
    id: 1,
    title: "Exemple d’actualité",
    slug: "exemple-actualite",
    excerpt:
      "Fiche de démonstration destinée à valider l’affichage des actualités. Elle sera remplacée par les publications validées depuis l’administration.",
    content:
      "Cette actualité de démonstration ne constitue pas une publication officielle de J&B SANIYAPUR SARL.\n\nLe contenu complet des articles sera géré depuis l’interface d’administration.",
    category: "Actualités",
    author: "Direction J&B SANIYAPUR",
    image: "/images/realisation-hygiene.jpg",
    featured: false,
    published: true,
    published_at: "2026-01-01T00:00:00Z",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

export async function getNews(): Promise<AdminNews[]> {
  if (!useApi) return mockNews;
  try {
    return await apiFetchAll<AdminNews>("/news/", { next: { revalidate: 60 } });
  } catch (err) {
    console.error("getNews error:", err);
    return [];
  }
}

export async function getNewsArticle(slug: string): Promise<AdminNews | undefined> {
  if (!useApi) return mockNews.find((article) => article.slug === slug);
  try {
    return await apiFetch<AdminNews>(`/news/${encodeURIComponent(slug)}/`, { next: { revalidate: 60 } });
  } catch {
    return (await getNews()).find((article) => article.slug === slug && article.published);
  }
}

export const newsAreMocked = !useApi;
