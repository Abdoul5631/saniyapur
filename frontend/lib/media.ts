/**
 * Résout une URL de média Django (relative ou absolue) vers une URL accessible par le frontend.
 */
export function resolveMediaUrl(url?: string | null, fallback: string = "/images/logo.png"): string {
  if (!url || typeof url !== "string" || url.trim() === "") {
    return fallback;
  }

  let trimmed = url.trim();

  // Si l'URL contient un hôte backend interne ou local, on le supprime pour avoir une URL publique relative
  trimmed = trimmed.replace(/^https?:\/\/(backend|127\.0\.0\.1|localhost):8000/, "");

  // URL média relative renvoyée par Django (/media/...)
  if (trimmed.startsWith("/media/")) {
    return trimmed;
  }

  // Déjà une URL absolue externe (ex: Cloudinary, S3, etc.) ou data URI
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("data:")) {
    return trimmed;
  }

  if (!trimmed.startsWith("/")) {
    return `/media/${trimmed}`;
  }

  return trimmed;
}
