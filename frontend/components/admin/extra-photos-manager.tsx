"use client";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { deleteExtraPhoto, refreshPublicPhotos } from "@/app/admin/(protected)/extra-photos-actions";
import { DeleteButton } from "@/components/admin/delete-button";
import { compressImage } from "@/lib/admin/compress-image";
import { formatAdminApiError } from "@/lib/admin/prepare-form-data";

type Photo = { id: number; image: string; order: number };

type Props = {
  endpoint: "service-images" | "sector-images";
  parentField: "service" | "sector";
  parentId: number;
  photos?: Photo[];
};

/** Photos supplémentaires d'une carte (diaporama public : image principale + ces photos, 3 s chacune). */
export function ExtraPhotosManager({ endpoint, parentField, parentId, photos = [] }: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const sorted = [...photos].sort((a, b) => a.order - b.order);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const files = Array.from(new FormData(form).getAll("image")).filter((f): f is File => f instanceof File && f.size > 0);
    if (!files.length) {
      setError("Choisissez au moins une image à ajouter.");
      return;
    }
    setPending(true);
    try {
      let order = sorted.length ? sorted[sorted.length - 1].order + 1 : 0;
      for (const file of files) {
        const payload = new FormData();
        payload.set(parentField, String(parentId));
        payload.set("image", await compressImage(file));
        payload.set("order", String(order++));
        const response = await fetch(`/api/admin/django?path=${encodeURIComponent(`/${endpoint}/`)}&method=POST`, {
          method: "POST",
          body: payload,
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) throw new Error(formatAdminApiError(body, "L’ajout de la photo a échoué."));
      }
      await refreshPublicPhotos();
      form.reset();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "L’ajout de la photo a échoué.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#dce5df] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#16232a]">Photos du diaporama</h2>
      <p className="mt-1 text-sm text-[#526259]">
        Sur le site, la carte affiche l’image principale puis ces photos, en défilement automatique toutes les 3 secondes.
        Ajoutez-en 2 ou plus pour activer le diaporama.
      </p>

      {sorted.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((photo, index) => (
            <li key={photo.id} className="overflow-hidden rounded-xl border border-[#dce5df]">
              {/* eslint-disable-next-line @next/next/no-img-element -- médias Django cross-origin. */}
              <img src={photo.image} alt={`Photo ${index + 2}`} className="aspect-video w-full object-cover" />
              <div className="flex items-center justify-between gap-2 p-3">
                <p className="text-xs font-bold uppercase tracking-[.1em] text-[#a85c36]">Photo {index + 2}</p>
                <DeleteButton
                  action={deleteExtraPhoto.bind(null, endpoint, photo.id)}
                  label="Retirer"
                  confirmTitle="Retirer cette photo ?"
                  confirmDescription="Elle sera supprimée du diaporama."
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#526259]">Aucune photo supplémentaire pour le moment.</p>
      )}

      <form onSubmit={onSubmit} className="mt-5 grid gap-3 rounded-xl border border-dashed border-[#dce5df] p-4">
        <label htmlFor="extra-photos" className="text-sm font-medium text-[#16232a]">
          Ajouter des photos (plusieurs possibles)
        </label>
        <input id="extra-photos" name="image" type="file" accept="image/*" multiple className="w-full text-sm text-[#526259]" />
        {error ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60"
        >
          {pending ? "Envoi…" : "Ajouter au diaporama"}
        </button>
      </form>
    </div>
  );
}
