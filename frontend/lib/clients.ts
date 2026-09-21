import { apiFetchAll } from "@/lib/api";
import type { ClientLogo } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

export async function getClientLogos(): Promise<ClientLogo[]> {
  if (!useApi) return [];
  try {
    return (await apiFetchAll<ClientLogo>("/client-logos/", { next: { revalidate: 60 } }))
      .filter((logo) => Boolean(logo.image))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}
