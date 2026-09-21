import { compressImage } from "@/lib/admin/compress-image";

export async function prepareAdminFormData(source: FormData): Promise<FormData> {
  const next = new FormData();
  for (const [key, value] of source.entries()) {
    if (value instanceof File) {
      if (value.size === 0) continue;
      next.append(key, value.type.startsWith("image/") ? await compressImage(value) : value);
    } else {
      next.append(key, value);
    }
  }
  return next;
}

export function formatAdminApiError(payload: unknown, fallback = "Enregistrement impossible."): string {
  if (!payload || typeof payload !== "object") return fallback;
  const data = payload as Record<string, unknown>;
  if (typeof data.error === "string") {
    try {
      return formatAdminApiError(JSON.parse(data.error), data.error);
    } catch {
      return data.error;
    }
  }
  if (typeof data.detail === "string") return data.detail;
  const fields = Object.entries(data)
    .map(([key, value]) => `${key} : ${Array.isArray(value) ? value.map(String).join(", ") : String(value)}`)
    .join(" ");
  return fields || fallback;
}
