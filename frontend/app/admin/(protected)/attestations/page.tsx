import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";

import { adminFetch } from "@/lib/admin/api";
import { resolveMediaUrl } from "@/lib/media";
import type { Attestation } from "@/types/admin";
import { deleteAttestation } from "./actions";

export const metadata = { title: "Références & Attestations — Administration" };

const typeBadgeLabels: Record<string, { label: string; color: string }> = {
  attestation: { label: "Attestation", color: "bg-[#f1e4dc] text-[#a85c36]" },
  certificate: { label: "Certificat", color: "bg-[#e8f3ee] text-[#16232a]" },
  reference: { label: "Référence", color: "bg-[#eef2f6] text-[#3b5998]" },
  other: { label: "Autre", color: "bg-gray-100 text-gray-700" },
};

export default async function AdminAttestationsPage() {
  const data = await adminFetch<{ results: Attestation[]; count: number } | Attestation[]>(
    "/attestations/"
  ).catch(() => []);

  const attestations: Attestation[] = Array.isArray(data)
    ? data
    : (data as { results: Attestation[] })?.results ?? [];

  return (
    <div>
      <AdminHeader
        title="Références & Attestations Officielles"
        description="Gérez, publiez et réorganisez les attestations de bonne exécution et références clients."
        action={
          <Link
            href="/admin/attestations/nouveau"
            className="rounded-full bg-[#a85c36] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#8b4a2b]"
          >
            + Ajouter une attestation
          </Link>
        }
      />

      <div className="mt-6 rounded-2xl border border-[#dce5df] bg-white p-6 shadow-xs">
        {attestations.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#8a9a92]">
            Aucune attestation enregistrée pour le moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#eef2ef] bg-[#f7f8f6] text-[#8a9a92]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Document</th>
                  <th className="px-4 py-3 font-semibold">Client / Organisme</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Ordre</th>
                  <th className="px-4 py-3 font-semibold">Statut</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eef2ef] text-[#3f5149]">
                {attestations.map((item) => {
                  const badge = typeBadgeLabels[item.type] ?? typeBadgeLabels.other;
                  return (
                    <tr key={item.id} className="hover:bg-[#f8faf9]">
                      <td className="px-4 py-3 font-medium text-[#16232a]">
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <img
                              src={resolveMediaUrl(item.image)}
                              alt={item.title}
                              className="size-10 rounded-lg object-cover border border-[#dce5df]"
                            />
                          ) : (
                            <div className="grid size-10 place-items-center rounded-lg border border-[#dce5df] bg-[#f7f8f6] text-xs font-bold text-[#a85c36]">
                              📄
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-[#16232a] block">{item.title}</span>
                            {item.pdf_file && (
                              <a
                                href={resolveMediaUrl(item.pdf_file)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[10px] text-[#a85c36] underline"
                              >
                                PDF Joint ↗
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#16232a]">
                        {item.client_organisation}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.date || "—"}</td>
                      <td className="px-4 py-3 font-mono font-semibold">{item.order}</td>
                      <td className="px-4 py-3">
                        {item.published ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <span className="size-1.5 rounded-full bg-emerald-600" /> Publié
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                            <span className="size-1.5 rounded-full bg-amber-500" /> Brouillon
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/attestations/${item.id}/modifier`}
                            className="rounded-lg border border-[#dce5df] bg-white px-3 py-1 text-xs font-semibold text-[#16232a] hover:bg-[#f7f8f6] hover:text-[#a85c36]"
                          >
                            Modifier
                          </Link>
                          <DeleteButton action={deleteAttestation.bind(null, item.id)} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
