"use client";
import { useTransition } from "react";

export function ProcessedToggleButton({ processed, action, onLabel = "Marquer comme traité", offLabel = "Traité ✓" }: { processed: boolean; action: () => Promise<void>; onLabel?: string; offLabel?: string }) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => { action(); })}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${processed ? "bg-[#f1e4dc] text-[#a85c36]" : "bg-[#f2e8d6] text-[#8a6d1c]"}`}
    >
      {pending ? "…" : processed ? offLabel : onLabel}
    </button>
  );
}
