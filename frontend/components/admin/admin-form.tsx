"use client";
import { useActionState } from "react";
import type { ReactNode } from "react";

export type FormState = { error?: string; success?: boolean } | null;
export type AdminAction = (prevState: FormState, formData: FormData) => Promise<FormState>;

export function AdminForm({ action, children, submitLabel = "Enregistrer" }: { action: AdminAction; children: ReactNode; submitLabel?: string }) {
  const [state, formAction, pending] = useActionState(action, null);
  return (
    <form action={formAction} className="grid gap-5">
      {children}
      {state?.error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}
      {state?.success && !state.error && <p role="status" className="rounded-lg bg-[#f1e4dc] px-4 py-3 text-sm text-[#a85c36]">Modifications enregistrées.</p>}
      <button type="submit" disabled={pending} className="justify-self-start rounded-full bg-[#a85c36] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4a2b] disabled:opacity-60">{pending ? "Enregistrement…" : submitLabel}</button>
    </form>
  );
}
