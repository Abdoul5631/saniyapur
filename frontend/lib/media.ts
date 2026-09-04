/**
 * Résout une URL de média Django (relative ou absolue) vers une URL accessible par le frontend.
 */
export function resolveMediaUrl(url?: string | null, fallback: string = "/images/logo.png"): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return fallback;
  }

  const trimmed = url.trim();

  // Déjà une URL absolue ou data URI
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  // URL média relative renvoyée par Django (/media/...)
  if (trimmed.startsWith("/media/")) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl) {
      const backendOrigin = apiUrl.replace(/\/api\/?$/, "");
      return `${backendOrigin}${trimmed}`;
    }
    return `http://127.0.0.1:8000${trimmed}`;
  }

  return trimmed;
}
