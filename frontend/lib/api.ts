/** Client prêt pour l’API Django REST — configure NEXT_PUBLIC_API_URL à son déploiement. */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  let base = apiUrl || "/api";
  if (typeof window === "undefined") {
    base = process.env.INTERNAL_API_URL || "http://backend:8000/api";
  }
  const cleanBase = base.replace(/\/$/, "");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);
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
