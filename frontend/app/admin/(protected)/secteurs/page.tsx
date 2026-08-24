import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FilterSelect } from "@/components/admin/filter-select";
import { PublishedBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminSector } from "@/types/admin";
import { deleteSector } from "./actions";

export default async function AdminSectorsPage({ searchParams }: { searchParams: Promise<{ q?: string; published?: string }> }) {
  const { q, published } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (published) params.set("published", published);

  const data = await adminFetch<PaginatedResponse<AdminSector>>(`/sectors/?${params.toString()}`);

  return (
    <div>
      <AdminHeader
        title="Secteurs"
        description="Secteurs d’intervention affichés sur le site public et utilisés pour classer les réalisations."
        action={<Link href="/admin/secteurs/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Ajouter un secteur</Link>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un secteur…" />
        <FilterSelect paramName="published" label="Statut" allLabel="Tous les statuts" options={[{ value: "true", label: "Publié" }, { value: "false", label: "Brouillon" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={data.results}
          emptyTitle="Aucun secteur ne correspond"
          emptyDescription="Ajoutez un secteur pour pouvoir l’associer à des réalisations."
          columns={[
            { header: "Nom", render: (sector) => <span className="font-medium text-[#16232a]">{sector.name}</span> },
            { header: "Statut", render: (sector) => <PublishedBadge published={sector.published} /> },
            {
              header: "Actions", className: "text-right", render: (sector) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/secteurs/${sector.slug}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link>
                  <DeleteButton action={deleteSector.bind(null, sector.slug)} confirmTitle={`Supprimer « ${sector.name} » ?`} confirmDescription="Impossible si des réalisations sont encore rattachées à ce secteur." />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
