/** Client prêt pour l’API Django REST — configure NEXT_PUBLIC_API_URL à son déploiement. */
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> { if (!apiUrl) throw new Error("NEXT_PUBLIC_API_URL n’est pas configurée."); const response = await fetch(`${apiUrl.replace(/\/$/, "")}${path}`, { ...options, headers: { Accept: "application/json", ...options?.headers } }); if (!response.ok) throw new Error(`Erreur API : ${response.status}`); return response.json() as Promise<T>; }
