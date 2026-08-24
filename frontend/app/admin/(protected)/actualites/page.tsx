import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FilterSelect } from "@/components/admin/filter-select";
import { Pagination } from "@/components/admin/pagination";
import { PublishedBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminNews } from "@/types/admin";
import { deleteNews } from "./actions";

export default async function AdminNewsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; published?: string }> }) {
  const { page, q, published } = await searchParams;
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (q) params.set("q", q);
  if (published) params.set("published", published);

  const data = await adminFetch<PaginatedResponse<AdminNews>>(`/news/?${params.toString()}`);

  return (
    <div>
      <AdminHeader
        title="Actualités"
        action={<Link href="/admin/actualites/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Nouvel article</Link>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un article…" />
        <FilterSelect paramName="published" label="Statut" allLabel="Tous les statuts" options={[{ value: "true", label: "Publié" }, { value: "false", label: "Brouillon" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={data.results}
          emptyTitle="Aucun article ne correspond"
          emptyDescription="Ajustez votre recherche ou ajoutez un article."
          columns={[
            { header: "Titre", render: (article) => <span className="font-medium text-[#16232a]">{article.title}</span> },
            { header: "Auteur", render: (article) => article.author || "—" },
            { header: "Statut", render: (article) => <PublishedBadge published={article.published} /> },
            {
              header: "Actions", className: "text-right", render: (article) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/actualites/${article.slug}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link>
                  <DeleteButton action={deleteNews.bind(null, article.slug)} confirmTitle={`Supprimer « ${article.title} » ?`} />
                </div>
              ),
            },
          ]}
        />
      </div>

      <Pagination page={Number(page ?? 1)} hasNext={Boolean(data.next)} hasPrevious={Boolean(data.previous)} basePath="/admin/actualites" searchParams={{ q, published }} />
    </div>
  );
}
