"use client";
import { useMemo, useState } from "react";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { officialSectorNames } from "@/lib/sectors";
import type { Realisation } from "@/types/realisation";

export function RealisationsGallery({ items, isMock }: { items: Realisation[]; isMock: boolean }) {
  const [sector, setSector] = useState("Tous");
  const filters = useMemo(() => {
    const extra = [...new Set(items.map((item) => item.sector))].filter((name) => !officialSectorNames.includes(name as (typeof officialSectorNames)[number]));
    return ["Tous", ...officialSectorNames, ...extra];
  }, [items]);
  const visible = sector === "Tous" ? items : items.filter((item) => item.sector === sector);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par secteur">
        {filters.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={sector === name}
            onClick={() => setSector(name)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${sector === name ? "bg-[#a85c36] text-white" : "border border-[#dce5df] bg-white text-[#526259] hover:border-[#a85c36] hover:text-[#a85c36]"}`}
          >
            {name}
          </button>
        ))}
      </div>
      {visible.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((realisation) => <RealisationCard key={realisation.id} realisation={realisation} isMock={isMock} />)}
        </div>
      ) : (
        <p className="mt-10 text-[#526259]">Aucune réalisation publiée pour ce secteur.</p>
      )}
    </div>
  );
}
