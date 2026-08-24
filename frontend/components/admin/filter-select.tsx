"use client";
import { useRouter, useSearchParams } from "next/navigation";

type Option = { value: string; label: string };

export function FilterSelect({ paramName, label, options, allLabel = "Tous" }: { paramName: string; label: string; options: Option[]; allLabel?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramName) ?? "";

  function handleChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set(paramName, next); else params.delete(paramName);
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  return (
    <label className="flex items-center gap-2 text-sm text-[#526259]">
      <span className="sr-only">{label}</span>
      <select value={current} onChange={(event) => handleChange(event.target.value)} className="rounded-lg border border-[#dce5df] bg-white py-2.5 px-3 text-sm text-[#16232a] outline-none focus:border-[#a85c36]">
        <option value="">{allLabel}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
