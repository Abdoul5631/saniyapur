/** Client prêt pour l’API Django REST — configure NEXT_PUBLIC_API_URL à son déploiement. */

import type { PaginatedResponse } from "@/types/realisation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function toRelativeApiPath(urlOrPath: string): string {
  if (!urlOrPath.startsWith("http")) return urlOrPath;
  const parsed = new URL(urlOrPath);
  const path = parsed.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
  return `${path}${parsed.search}`;
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  let base = apiUrl || "/api";
  if (typeof window === "undefined") {
    base = process.env.INTERNAL_API_URL || "http://backend:8000/api";
  }
  const cleanBase = base.replace(/\/$/, "");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${cleanBase}${path}`, {
      ...options,
      signal: controller.signal,
      headers: { Accept: "application/json", ...options?.headers },
    });
    if (!response.ok) throw new Error(`Erreur API : ${response.status}`);
    return (await response.json()) as T;
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Charge toutes les pages d’une liste Django REST (évite de n’afficher que les 12/24 premiers). */
export async function apiFetchAll<T>(path: string, options?: RequestInit): Promise<T[]> {
  const items: T[] = [];
  let next: string | null = path;
  const seen = new Set<string>();
  while (next && !seen.has(next)) {
    seen.add(next);
    const data: T[] | PaginatedResponse<T> = await apiFetch<T[] | PaginatedResponse<T>>(
      toRelativeApiPath(next),
      options,
    );
    if (Array.isArray(data)) {
      items.push(...data);
      break;
    }
    items.push(...(data.results ?? []));
    next = data.next ?? null;
  }
  return items;
}
