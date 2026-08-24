"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export function SearchInput({ paramName = "q", placeholder = "Rechercher…" }: { paramName?: string; placeholder?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentValue = searchParams.get(paramName) ?? "";

  function updateUrl(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (next) params.set(paramName, next); else params.delete(paramName);
    params.delete("page");
    router.replace(`?${params.toString()}`, { scroll: false });
  }

  function handleChange(next: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => updateUrl(next), 350);
  }

  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 fill-none stroke-[#8a9a92]" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
      <input
        key={currentValue}
        type="search"
        defaultValue={currentValue}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-lg border border-[#dce5df] py-2.5 pl-10 pr-3 text-sm text-[#16232a] outline-none focus:border-[#a85c36] sm:w-64"
      />
    </div>
  );
}
