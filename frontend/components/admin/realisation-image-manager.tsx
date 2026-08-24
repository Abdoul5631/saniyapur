"use client";
import { useActionState, useTransition } from "react";
import { addRealisationImage, deleteRealisationImage, setRealisationImageAsMain } from "@/app/admin/(protected)/realisations/actions";
import { DeleteButton } from "@/components/admin/delete-button";
import type { FormState } from "@/components/admin/admin-form";
import type { RealisationImage } from "@/types/realisation";

const typeLabels: Record<string, string> = { main: "Principale", before: "Avant", after: "Après", gallery: "Galerie" };

function SetMainButton({ imageId }: { imageId: number }) {
  const [pending, startTransition] = useTransition();
  return (
    <button type="button" disabled={pending} onClick={() => startTransition(() => { setRealisationImageAsMain(imageId); })} className="text-sm font-semibold text-[#a85c36] transition hover:underline disabled:opacity-60">
      {pending ? "…" : "Définir comme principale"}
    </button>
  );
}

export function RealisationImageManager({ realisationId, images }: { realisationId: number; images: RealisationImage[] }) {
  const boundAdd = addRealisationImage.bind(null, realisationId);
  const [state, formAction, pending] = useActionState<FormState, FormData>(boundAdd, null);
  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#16232a]">Galerie, avant/après et image principale</h2>
      <p className="mt-1 text-sm text-[#526259]">Une seule image « avant » et une seule image « après » sont affichées côté site public.</p>
      {sorted.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((image) => (
            <li key={image.id} className="overflow-hidden rounded-xl border border-[#dce5df]">
              {/* eslint-disable-next-line @next/next/no-img-element -- médias Django cross-origin, next/image non configuré pour ce host. */}
              <img src={image.image} alt={image.caption || "Image de la réalisation"} className="aspect-video w-full object-cover" />
              <div className="p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[.1em] text-[#a85c36]">{typeLabels[image.type] ?? image.type}</p>
                  <DeleteButton action={deleteRealisationImage.bind(null, image.id)} label="Retirer" confirmTitle="Retirer cette image ?" confirmDescription="Elle sera définitivement supprimée de la fiche." />
                </div>
                <p className="mt-1 truncate text-sm text-[#526259]">{image.caption || "Sans légende"}</p>
                {image.type !== "main" && <div className="mt-2"><SetMainButton imageId={image.id} /></div>}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#526259]">Aucune image pour le moment.</p>
      )}

      <form action={formAction} className="mt-6 grid gap-3 rounded-xl border border-dashed border-[#dce5df] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="image" className="text-sm font-medium text-[#16232a]">Ajouter une image</label>
          <input id="image" name="image" type="file" accept="image/*" required className="mt-1.5 w-full text-sm text-[#526259]" />
        </div>
        <div>
          <label htmlFor="caption" className="text-sm font-medium text-[#16232a]">Légende</label>
          <input id="caption" name="caption" className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
        </div>
        <div>
          <label htmlFor="type" className="text-sm font-medium text-[#16232a]">Type</label>
          <select id="type" name="type" defaultValue="gallery" className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]">
            <option value="gallery">Galerie</option>
            <option value="before">Avant</option>
            <option value="after">Après</option>
            <option value="main">Principale</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="order" className="text-sm font-medium text-[#16232a]">Ordre d’affichage</label>
          <input id="order" name="order" type="number" defaultValue={0} className="mt-1.5 w-32 rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
        </div>
        {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{state.error}</p>}
        <button type="submit" disabled={pending} className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60 sm:col-span-2">{pending ? "Ajout…" : "Ajouter l’image"}</button>
      </form>
    </div>
  );
}
