"use client";

import { useMemo, useState } from "react";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { Reveal } from "@/components/ui/reveal";
import type { Realisation } from "@/types/realisation";

export function RealisationsGallery({ items, isMock }: { items: Realisation[]; isMock: boolean }) {
  const [sector, setSector] = useState("Tous");
  const filters = useMemo(() => {
    const names = [...new Set(items.map((item) => item.sector).filter(Boolean))];
    return ["Tous", ...names];
  }, [items]);
  const visible = sector === "Tous" ? items : items.filter((item) => item.sector === sector);

  return (
    <div>
      {filters.length > 2 && (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par secteur">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={sector === name}
              onClick={() => setSector(name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                sector === name
                  ? "bg-[#a85c36] text-white"
                  : "border border-[#dce5df] bg-white text-[#526259] hover:border-[#a85c36] hover:text-[#a85c36]"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
      {visible.length ? (
        <div className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 ${filters.length > 2 ? "mt-8" : ""}`}>
          {visible.map((realisation, index) => (
            <Reveal key={realisation.id} delayMs={Math.min(index * 40, 160)}>
              <RealisationCard realisation={realisation} isMock={isMock} />
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-[#526259]">Aucune réalisation publiée pour ce secteur.</p>
      )}
    </div>
  );
}
