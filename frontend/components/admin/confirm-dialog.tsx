"use client";

export function ConfirmDialog({ open, title, description, confirmLabel = "Confirmer", cancelLabel = "Annuler", danger, pending, onConfirm, onCancel }: {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  pending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a1712]/50 p-4" role="presentation" onClick={onCancel}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-dialog-title" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <h2 id="confirm-dialog-title" className="text-lg font-semibold text-[#16232a]">{title}</h2>
        {description && <p className="mt-2 text-sm text-[#526259]">{description}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-full border border-[#dce5df] px-4 py-2 text-sm font-semibold text-[#3f5149] hover:bg-[#f2f5f3]">{cancelLabel}</button>
          <button type="button" disabled={pending} onClick={onConfirm} className={`rounded-full px-4 py-2 text-sm font-semibold text-white disabled:opacity-60 ${danger ? "bg-red-600 hover:bg-red-700" : "bg-[#a85c36] hover:bg-[#8b4a2b]"}`}>{pending ? "…" : confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
