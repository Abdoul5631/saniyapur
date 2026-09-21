"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DeleteButton } from "@/components/admin/delete-button";
import { compressImage } from "@/lib/admin/compress-image";
import { formatAdminApiError } from "@/lib/admin/prepare-form-data";

export type GalleryImage = { id: number; image: string; caption?: string; order: number };

export function ImageGalleryUploader({
  images,
  parentKey,
  parentId,
  djangoPath,
  deleteAction,
}: {
  images: GalleryImage[];
  parentKey: string;
  parentId: number;
  djangoPath: string;
  deleteAction: (imageId: number) => Promise<void>;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const data = new FormData(form);
    const image = data.get("image");
    if (!(image instanceof File) || image.size === 0) {
      setError("Choisissez une image à ajouter.");
      return;
    }
    setPending(true);
    try {
      const payload = new FormData();
      payload.set(parentKey, String(parentId));
      payload.set("image", await compressImage(image));
      payload.set("caption", String(data.get("caption") ?? ""));
      payload.set("order", String(data.get("order") ?? "0"));
      const response = await fetch(
        `/api/admin/django?path=${encodeURIComponent(djangoPath)}&method=POST`,
        { method: "POST", body: payload },
      );
      const body = await response.json().catch(() => null);
      if (!response.ok) throw new Error(formatAdminApiError(body, "L’ajout de l’image a échoué."));
      form.reset();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "L’ajout de l’image a échoué.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#16232a]">Galerie d’images</h2>
      {sorted.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((image) => (
            <li key={image.id} className="overflow-hidden rounded-xl border border-[#dce5df]">
              {/* eslint-disable-next-line @next/next/no-img-element -- médias Django cross-origin, next/image non configuré pour ce host. */}
              <img src={image.image} alt={image.caption || "Image de la galerie"} className="aspect-video w-full object-cover" />
              <div className="flex items-center justify-between gap-3 p-3">
                <p className="min-w-0 truncate text-sm text-[#526259]">{image.caption || "Sans légende"}</p>
                <DeleteButton action={deleteAction.bind(null, image.id)} label="Retirer" confirmTitle="Retirer cette image ?" confirmDescription="Elle sera définitivement supprimée de la galerie." />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#526259]">Aucune image dans la galerie pour le moment.</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-xl border border-dashed border-[#dce5df] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="gallery-image" className="text-sm font-medium text-[#16232a]">Ajouter une image</label>
          <input id="gallery-image" name="image" type="file" accept="image/*" required className="mt-1.5 w-full text-sm text-[#526259]" />
        </div>
        <div>
          <label htmlFor="gallery-caption" className="text-sm font-medium text-[#16232a]">Légende</label>
          <input id="gallery-caption" name="caption" className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
        </div>
        <div>
          <label htmlFor="gallery-order" className="text-sm font-medium text-[#16232a]">Ordre d’affichage</label>
          <input id="gallery-order" name="order" type="number" defaultValue={0} className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
        </div>
        {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{error}</p>}
        <button type="submit" disabled={pending} className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60 sm:col-span-2">{pending ? "Ajout…" : "Ajouter l’image"}</button>
      </form>
    </div>
  );
}
