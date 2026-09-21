"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { NewsFields } from "@/components/admin/news-fields";
import { compressImage } from "@/lib/admin/compress-image";
import type { AdminNews } from "@/types/admin";

function formatApiError(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") return fallback;
  const data = payload as Record<string, unknown>;
  if (typeof data.error === "string") {
    try {
      const nested = JSON.parse(data.error) as Record<string, unknown>;
      return formatApiError(nested, data.error);
    } catch {
      return data.error;
    }
  }
  if (typeof data.detail === "string") return data.detail;
  const fields = Object.entries(data)
    .map(([key, value]) => {
      const text = Array.isArray(value) ? value.map(String).join(", ") : String(value);
      return `${key} : ${text}`;
    })
    .join(" ");
  return fields || fallback;
}

export function NewsAdminForm({
  article,
  submitLabel,
}: {
  article?: AdminNews;
  submitLabel: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const payload = new FormData(event.currentTarget);
      const image = payload.get("image");
      if (image instanceof File && image.size > 0) {
        payload.set("image", await compressImage(image));
      } else {
        payload.delete("image");
      }
      payload.set("published", payload.get("published") ? "true" : "false");
      payload.set("featured", payload.get("featured") ? "true" : "false");

      const publishedAt = String(payload.get("published_at") ?? "").trim();
      if (publishedAt && publishedAt.length === 16) {
        payload.set("published_at", `${publishedAt}:00`);
      }

      const url = article?.slug ? `/api/admin/news/${encodeURIComponent(article.slug)}` : "/api/admin/news";
      const response = await fetch(url, { method: article?.slug ? "PATCH" : "POST", body: payload });
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(formatApiError(body, `Erreur API (${response.status}).`));
      }

      router.push("/admin/actualites");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erreur inconnue.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <NewsFields article={article} />
      {error ? (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="justify-self-start rounded-full bg-[#a85c36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60"
      >
        {pending ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}
