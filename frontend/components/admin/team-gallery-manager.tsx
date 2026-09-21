"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DeleteButton } from "@/components/admin/delete-button";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { resolveMediaUrl } from "@/lib/media";
import type { TeamGalleryPhoto } from "@/types/admin";

const MAX_EDGE = 1920;
const JPEG_QUALITY = 0.82;

async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
  });
  if (!blob) return file;

  const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
  return new File([blob], name, { type: "image/jpeg" });
}

export function TeamGalleryManager({
  photos,
  deleteAction,
}: {
  photos: TeamGalleryPhoto[];
  addAction?: unknown;
  deleteAction: (id: number) => Promise<void>;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState("");
  const sorted = [...photos].sort((a, b) => a.order - b.order);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const files = [...((form.elements.namedItem("images") as HTMLInputElement).files ?? [])];
    if (!files.length) {
      setError("Choisissez au moins une photo.");
      return;
    }

    const caption = String(new FormData(form).get("caption") ?? "");
    const startOrder = Number(new FormData(form).get("order") ?? sorted.length) || sorted.length;

    setPending(true);
    try {
      setProgress("Préparation des photos…");
      const prepared: File[] = [];
      for (const file of files) {
        try {
          prepared.push(await compressImage(file));
        } catch {
          prepared.push(file);
        }
      }

      for (let i = 0; i < prepared.length; i += 1) {
        setProgress(`Envoi ${i + 1} / ${prepared.length}…`);
        const payload = new FormData();
        payload.set("image", prepared[i]);
        payload.set("caption", caption);
        payload.set("order", String(startOrder + i));
        const response = await fetch("/api/admin/team-gallery-photos", {
          method: "POST",
          body: payload,
        });
        if (!response.ok) {
          const data = (await response.json().catch(() => null)) as { error?: string } | null;
          throw new Error(data?.error || "L’ajout de la photo a échoué.");
        }
      }
      form.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "L’ajout de la photo a échoué.");
    } finally {
      setPending(false);
      setProgress("");
    }
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-[#16232a]">Photos</h3>
      <p className="mt-1 text-sm text-[#526259]">
        Vous pouvez envoyer les photos telles quelles : elles sont allégées automatiquement avant l’enregistrement.
      </p>

      {sorted.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((photo) => (
            <li key={photo.id} className="overflow-hidden rounded-xl border border-[#dce5df] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- aperçu admin, médias Django. */}
              <img
                src={resolveMediaUrl(photo.image)}
                alt={photo.caption || "Photo de l’équipe"}
                className="aspect-4/3 w-full bg-[#f7f8f6] object-contain"
              />
              <div className="flex items-center justify-between gap-3 p-3">
                <p className="min-w-0 truncate text-sm text-[#526259]">{photo.caption || "Sans légende"}</p>
                <DeleteButton
                  action={deleteAction.bind(null, photo.id)}
                  label="Retirer"
                  confirmTitle="Retirer cette photo ?"
                  confirmDescription="Elle disparaîtra de la galerie publique."
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#526259]">Aucune photo pour le moment.</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-xl border border-dashed border-[#dce5df] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="team-gallery-images" className="text-sm font-medium text-[#16232a]">
            Ajouter des photos
          </label>
          <input
            id="team-gallery-images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="mt-1.5 w-full text-sm text-[#526259]"
          />
        </div>
        <FormField label="Légende (optionnelle)" htmlFor="team-gallery-caption">
          <input id="team-gallery-caption" name="caption" className={inputClassName} />
        </FormField>
        <FormField label="Ordre de départ" htmlFor="team-gallery-order">
          <input
            id="team-gallery-order"
            name="order"
            type="number"
            defaultValue={sorted.length}
            className={inputClassName}
          />
        </FormField>
        {error && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60 sm:col-span-2"
        >
          {pending ? progress || "Ajout…" : "Ajouter les photos"}
        </button>
      </form>
    </div>
  );
}
