import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FilterSelect } from "@/components/admin/filter-select";
import { PublishedBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { ServiceIcon } from "@/components/admin/service-icon";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminService } from "@/types/admin";
import { deleteService, moveServiceOrder } from "./actions";

function ReorderButtons({ slug, disableUp, disableDown }: { slug: string; disableUp: boolean; disableDown: boolean }) {
  return (
    <div className="flex flex-col">
      <form action={moveServiceOrder.bind(null, slug, "up")}><button type="submit" disabled={disableUp} className="grid size-6 place-items-center text-[#526259] hover:text-[#a85c36] disabled:opacity-30" aria-label="Monter">▲</button></form>
      <form action={moveServiceOrder.bind(null, slug, "down")}><button type="submit" disabled={disableDown} className="grid size-6 place-items-center text-[#526259] hover:text-[#a85c36] disabled:opacity-30" aria-label="Descendre">▼</button></form>
    </div>
  );
}

export default async function AdminServicesPage({ searchParams }: { searchParams: Promise<{ q?: string; published?: string }> }) {
  const { q, published } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (published) params.set("published", published);

  const data = await adminFetch<PaginatedResponse<AdminService>>(`/services/?${params.toString()}`);
  const services = [...data.results].sort((a, b) => a.order - b.order);

  return (
    <div>
      <AdminHeader
        title="Services"
        description="Domaines de compétence officiels de J&B SANIYAPUR. Aucun domaine ne doit être inventé."
        action={<Link href="/admin/services/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Ajouter un service</Link>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un service…" />
        <FilterSelect paramName="published" label="Statut" allLabel="Tous les statuts" options={[{ value: "true", label: "Publié" }, { value: "false", label: "Brouillon" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={services}
          emptyTitle="Aucun service ne correspond"
          emptyDescription="Ajustez votre recherche ou ajoutez un service."
          columns={[
            { header: "Ordre", render: (service, index) => <ReorderButtons slug={service.slug} disableUp={index === 0} disableDown={index === services.length - 1} /> },
            { header: "Service", render: (service) => <span className="flex items-center gap-3 font-medium text-[#16232a]"><ServiceIcon icon={service.icon} className="size-5 text-[#a85c36]" />{service.name}</span> },
            { header: "Statut", render: (service) => <PublishedBadge published={service.published} /> },
            {
              header: "Actions", className: "text-right", render: (service) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/services/${service.slug}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link>
                  <DeleteButton action={deleteService.bind(null, service.slug)} confirmTitle={`Supprimer « ${service.name} » ?`} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
