"use client";
import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";

export function DeleteButton({ action, label = "Supprimer", confirmTitle = "Supprimer définitivement cet élément ?", confirmDescription = "Cette action est irréversible." }: {
  action: () => Promise<void>;
  label?: string;
  confirmTitle?: string;
  confirmDescription?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="text-sm font-semibold text-red-600 transition hover:text-red-700">{label}</button>
      <ConfirmDialog
        open={open}
        title={confirmTitle}
        description={confirmDescription}
        confirmLabel="Supprimer"
        danger
        pending={pending}
        onCancel={() => setOpen(false)}
        onConfirm={() => startTransition(async () => { await action(); setOpen(false); })}
      />
    </>
  );
}
