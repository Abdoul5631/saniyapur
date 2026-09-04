"use client";

import Image from "next/image";
import { useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import type { Attestation } from "@/types/admin";

const typeBadgeLabels: Record<string, { label: string; color: string }> = {
  attestation: { label: "Attestation", color: "bg-[#f1e4dc] text-[#a85c36] border-[#e8d9cc]" },
  certificate: { label: "Certificat", color: "bg-[#0f2e36] text-white border-[#0f2e36]" },
  reference: { label: "Référence Client", color: "bg-[#e8f3ee] text-[#16232a] border-[#c6d7d0]" },
  other: { label: "Document Officiel", color: "bg-gray-100 text-gray-700 border-gray-200" },
};

export function AttestationCard({ attestation }: { attestation: Attestation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const imageUrl = attestation.image ? resolveMediaUrl(attestation.image) : null;
  const pdfUrl = attestation.pdf_file ? resolveMediaUrl(attestation.pdf_file) : null;
  const badge = typeBadgeLabels[attestation.type] ?? typeBadgeLabels.other;

  return (
    <>
      <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#a85c36]/40 hover:shadow-xl">
        <div>
          {/* Aperçu Image du document */}
          {imageUrl ? (
            <div
              onClick={() => setModalOpen(true)}
              className="relative aspect-4/3 w-full cursor-pointer overflow-hidden rounded-xl border border-[#dce5df] bg-[#f7f8f6] shadow-inner group-hover:opacity-95"
            >
              <Image
                src={imageUrl}
                alt={attestation.title}
                fill
                unoptimized
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a1712]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-[#16232a] shadow-md backdrop-blur-xs">
                  🔍 Agrandir l'aperçu
                </span>
              </div>
            </div>
          ) : (
            <div className="flex aspect-4/3 w-full items-center justify-center rounded-xl border border-[#dce5df] bg-[#f8faf9] text-[#a85c36]">
              <span className="text-4xl">📄</span>
            </div>
          )}

          {/* En-tête / Badge & Date */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-block rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${badge.color}`}
            >
              {badge.label}
            </span>
            {attestation.date && (
              <span className="text-xs font-semibold text-[#8a9a92]">
                🗓 {attestation.date}
              </span>
            )}
          </div>

          {/* Titre & Organisme */}
          <h3 className="mt-3 text-lg font-bold text-[#16232a] tracking-tight transition-colors group-hover:text-[#a85c36]">
            {attestation.title}
          </h3>

          <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#a85c36]">
            {attestation.client_organisation}
          </p>

          {/* Description */}
          {attestation.description && (
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#526259] line-clamp-3">
              {attestation.description}
            </p>
          )}
        </div>

        {/* Bouton d'action */}
        <div className="mt-6 border-t border-[#f0f4f1] pt-4">
          {pdfUrl ? (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0f2e36] px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0a2328]"
            >
              <span>📄 Consulter le document PDF ↗</span>
            </a>
          ) : imageUrl ? (
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#dce5df] bg-[#f7f8f6] px-4 py-2.5 text-xs font-bold text-[#16232a] shadow-xs transition hover:border-[#a85c36] hover:bg-white hover:text-[#a85c36]"
            >
              <span>🔍 Voir l'attestation numérisée</span>
            </button>
          ) : (
            <div className="text-center text-xs font-semibold text-[#8a9a92]">
              Document justificatif vérifié
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Modal Agrandissement Document */}
      {modalOpen && imageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1712]/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative max-h-[90vh] max-w-4xl w-full overflow-hidden rounded-2xl bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#eef2ef] pb-3 mb-3">
              <div>
                <h4 className="text-sm font-bold text-[#16232a]">{attestation.title}</h4>
                <p className="text-xs text-[#a85c36] font-semibold">{attestation.client_organisation}</p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="grid size-8 place-items-center rounded-full bg-[#f1e4dc] text-sm font-bold text-[#a85c36] hover:bg-[#e8d9cc]"
              >
                ×
              </button>
            </div>
            <div className="relative max-h-[75vh] min-h-[300px] w-full overflow-auto rounded-xl border border-[#dce5df] bg-[#f7f8f6]">
              <img
                src={imageUrl}
                alt={attestation.title}
                className="mx-auto h-auto max-w-full object-contain"
              />
            </div>
            {pdfUrl && (
              <div className="mt-3 flex justify-end">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#a85c36] px-4 py-2 text-xs font-bold text-white hover:bg-[#8b4a2b]"
                >
                  Télécharger le document PDF original ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
