import { apiFetchAll, PUBLIC_REVALIDATE } from "@/lib/api";
import type { ClientLogo } from "@/types/admin";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);

export async function getClientLogos(): Promise<ClientLogo[]> {
  if (!useApi) return [];
  try {
    return (await apiFetchAll<ClientLogo>("/client-logos/", { next: { revalidate: PUBLIC_REVALIDATE } }))
      .filter((logo) => Boolean(logo.image))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  } catch {
    return [];
  }
}
