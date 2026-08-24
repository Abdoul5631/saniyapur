"use client";
import { useTransition } from "react";
import { QUOTE_STATUSES, type QuoteStatus } from "@/types/admin";

const labels: Record<QuoteStatus, string> = { new: "Nouveau", in_progress: "En cours", done: "Traité", archived: "Archivé" };

export function QuoteStatusSelect({ quoteId, status, action }: { quoteId: number; status: QuoteStatus; action: (id: number, status: QuoteStatus) => Promise<void> }) {
  const [pending, startTransition] = useTransition();
  return (
    <label className="flex items-center gap-2 text-sm font-medium text-[#16232a]">
      Statut :
      <select
        value={status}
        disabled={pending}
        onChange={(event) => startTransition(() => { action(quoteId, event.target.value as QuoteStatus); })}
        className="rounded-lg border border-[#dce5df] bg-white px-3 py-2 text-sm text-[#16232a] outline-none focus:border-[#a85c36] disabled:opacity-60"
      >
        {QUOTE_STATUSES.map((value) => <option key={value} value={value}>{labels[value]}</option>)}
      </select>
    </label>
  );
}
