"use client";

import { useState } from "react";
import { AttestationCard } from "@/components/attestations/attestation-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import type { Attestation } from "@/types/admin";

export function AttestationsSection({ attestations }: { attestations: Attestation[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: "Toutes les attestations" },
    { id: "attestation", label: "Attestations" },
    { id: "certificate", label: "Certificats" },
    { id: "reference", label: "Références Clients" },
  ];

  const filtered = attestations.filter((item) => {
    if (activeFilter === "all") return true;
    return item.type === activeFilter;
  });

  return (
    <section className="py-16 sm:py-24 bg-[#f8faf9] border-t border-[#dce5df]">
      <Container>
        <Reveal className="max-w-3xl">
          <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
            Preuves d'Excellence & Justificatifs
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
            Nos références & attestations de bonne exécution
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#526259]">
            Retrouvez les attestations officielles et certificats délivrés par nos partenaires hospitaliers, hôteliers et institutionnels.
          </p>
        </Reveal>

        {/* Filtres par type */}
        <div className="mt-8 flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveFilter(opt.id)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition-all shadow-xs ${
                activeFilter === opt.id
                  ? "bg-[#a85c36] text-white shadow-md"
                  : "bg-white text-[#3f5149] border border-[#dce5df] hover:border-[#a85c36] hover:text-[#a85c36]"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grille d'attestations */}
        {filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((att, idx) => (
              <Reveal key={att.id} delayMs={idx * 70}>
                <AttestationCard attestation={att} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-[#8a9a92] py-8 border border-dashed border-[#dce5df] rounded-2xl bg-white">
            Aucun document correspondant à ce filtre.
          </p>
        )}
      </Container>
    </section>
  );
}
