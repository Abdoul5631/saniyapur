"use client";
import { useState } from "react";

export const SERVICE_ICONS = {
  droplet: "M12 3c-3.5 4-6 7.4-6 10.5A6 6 0 0 0 12 20a6 6 0 0 0 6-6.5C18 10.4 15.5 7 12 3z",
  grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  box: "M3 8l9-5 9 5-9 5-9-5zM3 8v9l9 5 9-5V8M12 13v9",
  tap: "M4 10h9a4 4 0 0 1 4 4v1M17 8v3M9 8v10",
  shield: "M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z",
  people: "M4 20c0-3.3 3.1-6 7-6s7 2.7 7 6M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM17 9.5A2.5 2.5 0 1 0 17 4.5M19 15.2c1.8.6 3 2 3 4.3",
} as const;

export type ServiceIconKey = keyof typeof SERVICE_ICONS;

export function ServiceIcon({ icon, className = "size-5" }: { icon: string; className?: string }) {
  const path = SERVICE_ICONS[icon as ServiceIconKey] ?? SERVICE_ICONS.droplet;
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-none stroke-current`} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

export function ServiceIconPicker({ defaultValue = "droplet" }: { defaultValue?: string }) {
  const [selected, setSelected] = useState<string>(defaultValue in SERVICE_ICONS ? defaultValue : "droplet");
  return (
    <div>
      <input type="hidden" name="icon" value={selected} />
      <div className="flex flex-wrap gap-2">
        {(Object.keys(SERVICE_ICONS) as ServiceIconKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSelected(key)}
            aria-pressed={selected === key}
            aria-label={`Icône ${key}`}
            className={`grid size-11 place-items-center rounded-xl border transition ${selected === key ? "border-[#a85c36] bg-[#f1e4dc] text-[#a85c36]" : "border-[#dce5df] bg-white text-[#526259] hover:border-[#a85c36]"}`}
          >
            <ServiceIcon icon={key} />
          </button>
        ))}
      </div>
    </div>
  );
}
