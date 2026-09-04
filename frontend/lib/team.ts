import { apiFetch } from "@/lib/api";
import type { TeamMember } from "@/types/admin";
import type { PaginatedResponse } from "@/types/realisation";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: TeamMember[] | PaginatedResponse<TeamMember>) =>
  Array.isArray(data) ? data : (data.results ?? []);

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!useApi) return [];
  try {
    const data = await apiFetch<TeamMember[] | PaginatedResponse<TeamMember>>("/team/", {
      next: { revalidate: 60 },
    });
    return normaliseList(data)
      .filter((m) => m.published)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}
