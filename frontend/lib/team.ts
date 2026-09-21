import { apiFetch, apiFetchAll } from "@/lib/api";
import type { TeamGalleryPhoto, TeamGallerySettings, TeamMember } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!useApi) return [];
  try {
    return (await apiFetchAll<TeamMember>("/team/", { next: { revalidate: 60 } }))
      .filter((m) => m.published)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}

export const fallbackTeamGallerySettings: TeamGallerySettings = {
  id: 1,
  title: "Galerie de l’équipe",
  description: "",
  updated_at: "",
};

export async function getTeamGallerySettings(): Promise<TeamGallerySettings> {
  if (!useApi) return fallbackTeamGallerySettings;
  try {
    return await apiFetch<TeamGallerySettings>("/team-gallery/", { next: { revalidate: 60 } });
  } catch {
    return fallbackTeamGallerySettings;
  }
}

export async function getTeamGalleryPhotos(): Promise<TeamGalleryPhoto[]> {
  if (!useApi) return [];
  try {
    return (await apiFetchAll<TeamGalleryPhoto>("/team-gallery-photos/", { next: { revalidate: 60 } })).sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );
  } catch {
    return [];
  }
}
