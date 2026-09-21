"use client";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { formatAdminApiError, prepareAdminFormData } from "@/lib/admin/prepare-form-data";

export type FormState = { error?: string; success?: boolean } | null;
export type AdminAction = (prevState: FormState, formData: FormData) => Promise<FormState>;

type Props = {
  children: ReactNode;
  submitLabel?: string;
  action?: AdminAction;
  djangoPath?: string;
  method?: "POST" | "PATCH";
  redirectTo?: string;
  relatedImage?: { field: string; path: string; parentKey: string; parentId?: number };
};

export function AdminForm({
  action,
  djangoPath,
  method = "POST",
  children,
  submitLabel = "Enregistrer",
  redirectTo,
  relatedImage,
}: Props) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [state, formAction, actionPending] = useActionState(action ?? fallbackAction, null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!djangoPath) return;
    setPending(true);
    setError(null);
    setSuccess(false);
    try {
      const form = event.currentTarget;
      const payload = await prepareAdminFormData(new FormData(form));
      if (form.querySelector('[name="published"]')) {
        payload.set("published", form.querySelector<HTMLInputElement>('[name="published"]')?.checked ? "true" : "false");
      }
      if (form.querySelector('[name="featured"]')) {
        payload.set("featured", form.querySelector<HTMLInputElement>('[name="featured"]')?.checked ? "true" : "false");
      }
      const serviceBoxes = form.querySelectorAll<HTMLInputElement>('input[name="services"][type="checkbox"]');
      if (serviceBoxes.length) {
        payload.delete("services");
        serviceBoxes.forEach((box) => {
          if (box.checked) payload.append("services", box.value);
        });
        if (![...serviceBoxes].some((box) => box.checked)) {
          payload.append("services", "");
        }
      }
      let relatedFile: File | null = null;
      if (relatedImage) {
        const value = payload.get(relatedImage.field);
        if (value instanceof File && value.size > 0) relatedFile = value;
        payload.delete(relatedImage.field);
      }
      const response = await fetch(
        `/api/admin/django?path=${encodeURIComponent(djangoPath)}&method=${method}`,
        { method: "POST", body: payload },
      );
      const body = await response.json().catch(() => null);
      if (!response.ok) {
        throw new Error(formatAdminApiError(body, `Erreur API (${response.status}).`));
      }
      if (relatedFile && relatedImage) {
        const parentId =
          relatedImage.parentId ??
          (body && typeof body === "object" && "id" in body ? Number((body as { id: number }).id) : 0);
        if (parentId) {
          const imagePayload = new FormData();
          imagePayload.set(relatedImage.parentKey, String(parentId));
          imagePayload.set("image", relatedFile);
          imagePayload.set("type", "main");
          imagePayload.set("order", "0");
          const imageResponse = await fetch(
            `/api/admin/django?path=${encodeURIComponent(relatedImage.path)}&method=POST`,
            { method: "POST", body: imagePayload },
          );
          if (!imageResponse.ok) {
            const imageBody = await imageResponse.json().catch(() => null);
            throw new Error(formatAdminApiError(imageBody, "L’enregistrement de l’image a échoué."));
          }
        }
      }
      setSuccess(true);
      router.refresh();
      if (redirectTo) router.push(redirectTo);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Erreur inconnue.");
    } finally {
      setPending(false);
    }
  }

  if (djangoPath) {
    return (
      <form onSubmit={onSubmit} className="grid gap-5">
        {children}
        {error ? (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
        {success && !error ? (
          <p role="status" className="rounded-lg bg-[#f1e4dc] px-4 py-3 text-sm text-[#a85c36]">
            Modifications enregistrées.
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

  return (
    <form action={formAction} className="grid gap-5">
      {children}
      {state?.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      )}
      {state?.success && !state.error && (
        <p role="status" className="rounded-lg bg-[#f1e4dc] px-4 py-3 text-sm text-[#a85c36]">
          Modifications enregistrées.
        </p>
      )}
      <button
        type="submit"
        disabled={actionPending}
        className="justify-self-start rounded-full bg-[#a85c36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60"
      >
        {actionPending ? "Enregistrement…" : submitLabel}
      </button>
    </form>
  );
}

async function fallbackAction(): Promise<FormState> {
  return { error: "Formulaire mal configuré." };
}
