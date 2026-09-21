import { getAdminToken } from "@/lib/admin/session";
import type { PaginatedResponse } from "@/types/realisation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function baseUrl(): string {
  if (typeof window === "undefined") {
    return (process.env.INTERNAL_API_URL || "http://backend:8000/api").replace(/\/$/, "");
  }
  return (apiUrl || "/api").replace(/\/$/, "");
}

async function authHeaders(): Promise<HeadersInit> {
  const token = await getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function assertOk(response: Response): Promise<void> {
  if (response.ok) return;
  const detail = await response.text().catch(() => "");
  throw new Error(`Erreur API (${response.status}) : ${detail || response.statusText}`);
}

export function normaliseAdminList<T>(data: T[] | PaginatedResponse<T> | null | undefined): T[] {
  if (Array.isArray(data)) return data;
  return Array.isArray(data?.results) ? data.results : [];
}

/** Suit les pages Django REST jusqu’à avoir tous les éléments. */
export async function adminFetchAll<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  let next: string | null = path;
  const seen = new Set<string>();

  while (next && !seen.has(next)) {
    seen.add(next);
    const data: T[] | PaginatedResponse<T> = await adminFetch<T[] | PaginatedResponse<T>>(
      toRelativeApiPath(next),
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

function toRelativeApiPath(urlOrPath: string): string {
  if (!urlOrPath.startsWith("http")) return urlOrPath;
  const parsed = new URL(urlOrPath);
  const path = parsed.pathname.replace(/^\/api(?=\/|$)/, "") || "/";
  return `${path}${parsed.search}`;
}

export async function adminCount(path: string): Promise<number> {
  try {
    const data = await adminFetch<PaginatedResponse<unknown> | unknown[]>(path);
    if (Array.isArray(data)) return data.length;
    return data.count ?? data.results?.length ?? 0;
  } catch {
    return 0;
  }
}

/** Lecture authentifiée (GET) — utilisée par les pages serveur de l’admin. */
export async function adminFetch<T>(path: string): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(`${baseUrl()}${path}`, {
      signal: controller.signal,
      headers: { Accept: "application/json", ...(await authHeaders()) },
      cache: "no-store",
    });
    await assertOk(response);
    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeoutId);
  }
}

/** Création/mise à jour avec fichiers (multipart) — utilisée par les Server Actions des formulaires. */
export async function adminMutateForm<T>(path: string, formData: FormData, method: "POST" | "PATCH" = "POST"): Promise<T> {
  const response = await fetch(`${baseUrl()}${path}`, { method, body: formData, headers: { Accept: "application/json", ...(await authHeaders()) } });
  await assertOk(response);
  return response.json() as Promise<T>;
}

/** Création/mise à jour sans fichier (payload JSON). */
export async function adminMutateJson<T>(path: string, data: Record<string, unknown>, method: "POST" | "PATCH" = "POST"): Promise<T> {
  const response = await fetch(`${baseUrl()}${path}`, { method, headers: { Accept: "application/json", "Content-Type": "application/json", ...(await authHeaders()) }, body: JSON.stringify(data) });
  await assertOk(response);
  return response.json() as Promise<T>;
}

/** Mise à jour légère sans fichier (ex. marquer un message comme traité). */
export async function adminPatchJson<T>(path: string, data: Record<string, unknown>): Promise<T> {
  return adminMutateJson<T>(path, data, "PATCH");
}

export async function adminDelete(path: string): Promise<void> {
  const response = await fetch(`${baseUrl()}${path}`, { method: "DELETE", headers: await authHeaders() });
  if (!response.ok && response.status !== 204) await assertOk(response);
}
