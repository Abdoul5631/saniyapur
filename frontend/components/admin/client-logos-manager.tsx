"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { DeleteButton } from "@/components/admin/delete-button";
import { FormField, inputClassName } from "@/components/admin/form-field";
import { compressImage } from "@/lib/admin/compress-image";
import { formatAdminApiError } from "@/lib/admin/prepare-form-data";
import { resolveMediaUrl } from "@/lib/media";
import type { ClientLogo } from "@/types/admin";

export function ClientLogosManager({
  logos,
  deleteAction,
}: {
  logos: ClientLogo[];
  deleteAction: (id: number) => Promise<void>;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const sorted = [...logos].sort((a, b) => a.order - b.order);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const files = [...((form.elements.namedItem("images") as HTMLInputElement).files ?? [])];
    if (!files.length) {
      setError("Choisissez au moins un logo.");
      return;
    }
    const name = String(new FormData(form).get("name") ?? "");
    const startOrder = Number(new FormData(form).get("order") ?? sorted.length) || sorted.length;

    setPending(true);
    try {
      for (let i = 0; i < files.length; i += 1) {
        const payload = new FormData();
        payload.set("image", await compressImage(files[i]));
        payload.set("name", name);
        payload.set("order", String(startOrder + i));
        const response = await fetch("/api/admin/django?path=%2Fclient-logos%2F&method=POST", {
          method: "POST",
          body: payload,
        });
        const body = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(formatAdminApiError(body, "L’ajout du logo a échoué."));
        }
      }
      form.reset();
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "L’ajout du logo a échoué.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-[#16232a]">Logos</h3>
      <p className="mt-1 text-sm text-[#526259]">
        Facultatif. Sans logo, rien ne s’affiche sur l’accueil — aucun placeholder n’est inventé.
      </p>

      {sorted.length ? (
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((logo) => (
            <li key={logo.id} className="overflow-hidden rounded-xl border border-[#dce5df] bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element -- aperçu admin, médias Django. */}
              <img
                src={resolveMediaUrl(logo.image)}
                alt={logo.name || "Logo client"}
                className="aspect-2/1 w-full bg-[#f7f8f6] object-contain p-3"
              />
              <div className="flex items-center justify-between gap-3 p-3">
                <p className="min-w-0 truncate text-sm text-[#526259]">{logo.name || "Sans nom"}</p>
                <DeleteButton
                  action={deleteAction.bind(null, logo.id)}
                  label="Retirer"
                  confirmTitle="Retirer ce logo ?"
                  confirmDescription="Il disparaîtra de la bande « Ils nous font confiance »."
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-sm text-[#526259]">Aucun logo pour le moment. La bande reste masquée sur le site.</p>
      )}

      <form onSubmit={onSubmit} className="mt-6 grid gap-3 rounded-xl border border-dashed border-[#dce5df] p-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="client-logo-images" className="text-sm font-medium text-[#16232a]">
            Ajouter des logos
          </label>
          <input
            id="client-logo-images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required
            className="mt-1.5 w-full text-sm text-[#526259]"
          />
        </div>
        <FormField label="Nom (optionnel, accessibilité)" htmlFor="client-logo-name">
          <input id="client-logo-name" name="name" className={inputClassName} />
        </FormField>
        <FormField label="Ordre de départ" htmlFor="client-logo-order">
          <input id="client-logo-order" name="order" type="number" defaultValue={sorted.length} className={inputClassName} />
        </FormField>
        {error ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60 sm:col-span-2"
        >
          {pending ? "Ajout…" : "Ajouter les logos"}
        </button>
      </form>
    </div>
  );
}
