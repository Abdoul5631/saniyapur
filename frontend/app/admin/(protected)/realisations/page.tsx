import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FilterSelect } from "@/components/admin/filter-select";
import { Pagination } from "@/components/admin/pagination";
import { PublishedBadge, StatusBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse, Realisation } from "@/types/realisation";
import type { AdminSector } from "@/types/admin";
import { deleteRealisation } from "./actions";

export default async function AdminRealisationsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; sector?: string; location?: string; published?: string; featured?: string }> }) {
  const { page, q, sector, location, published, featured } = await searchParams;

  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (q) params.set("q", q);
  if (sector) params.set("sector", sector);
  if (location) params.set("location", location);
  if (published) params.set("published", published);
  if (featured) params.set("featured", featured);

  const [data, sectorsData] = await Promise.all([
    adminFetch<PaginatedResponse<Realisation>>(`/realisations/?${params.toString()}`),
    adminFetch<PaginatedResponse<AdminSector>>("/sectors/"),
  ]);

  return (
    <div>
      <AdminHeader
        title="Réalisations"
        description="Chantiers et interventions réellement effectués. Aucune réalisation ou aucun client ne doit être inventé."
        action={<Link href="/admin/realisations/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Ajouter une réalisation</Link>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un titre, un client…" />
        <SearchInput paramName="location" placeholder="Localisation…" />
        <FilterSelect paramName="sector" label="Secteur" allLabel="Tous les secteurs" options={sectorsData.results.map((s) => ({ value: s.name, label: s.name }))} />
        <FilterSelect paramName="published" label="Statut" allLabel="Tous les statuts" options={[{ value: "true", label: "Publié" }, { value: "false", label: "Brouillon" }]} />
        <FilterSelect paramName="featured" label="Mis en avant" allLabel="Toutes" options={[{ value: "true", label: "Mis en avant uniquement" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={data.results}
          emptyTitle="Aucune réalisation ne correspond"
          emptyDescription="Ajustez votre recherche ou vos filtres, ou ajoutez une réalisation."
          columns={[
            { header: "Titre", render: (realisation) => <span className="font-medium text-[#16232a]">{realisation.title}</span> },
            { header: "Secteur", render: (realisation) => realisation.sector },
            { header: "Localisation", render: (realisation) => realisation.location || "—" },
            { header: "Mis en avant", render: (realisation) => realisation.featured ? <StatusBadge label="Oui" tone="blue" /> : "—" },
            { header: "Statut", render: (realisation) => <PublishedBadge published={realisation.published} /> },
            {
              header: "Actions", className: "text-right", render: (realisation) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/realisations/${realisation.slug}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link>
                  <DeleteButton action={deleteRealisation.bind(null, realisation.slug)} confirmTitle={`Supprimer « ${realisation.title} » ?`} />
                </div>
              ),
            },
          ]}
        />
      </div>

      <Pagination page={Number(page ?? 1)} hasNext={Boolean(data.next)} hasPrevious={Boolean(data.previous)} basePath="/admin/realisations" searchParams={{ q, sector, location, published, featured }} />
    </div>
  );
}
