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
import type { Product } from "@/types/product";
import { deleteProduct } from "./actions";

export default async function AdminProductsPage({ searchParams }: { searchParams: Promise<{ page?: string; q?: string; category?: string; published?: string }> }) {
  const { page, q, category, published } = await searchParams;

  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  if (published) params.set("published", published);

  const [data, allForCategories] = await Promise.all([
    adminFetch<PaginatedResponse<Product>>(`/products/?${params.toString()}`),
    adminFetch<PaginatedResponse<Product>>("/products/"),
  ]);
  const categories = Array.from(new Set(allForCategories.results.map((product) => product.category).filter(Boolean))).sort();

  return (
    <div>
      <AdminHeader
        title="Produits"
        description="Catalogue des produits et équipements professionnels."
        action={<Link href="/admin/produits/nouveau" className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Ajouter un produit</Link>}
      />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un produit…" />
        <FilterSelect paramName="category" label="Catégorie" allLabel="Toutes les catégories" options={categories.map((value) => ({ value, label: value }))} />
        <FilterSelect paramName="published" label="Statut" allLabel="Tous les statuts" options={[{ value: "true", label: "Publié" }, { value: "false", label: "Brouillon" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={data.results}
          emptyTitle="Aucun produit ne correspond"
          emptyDescription="Ajustez votre recherche ou vos filtres, ou ajoutez un nouveau produit."
          columns={[
            { header: "Nom", render: (product) => <span className="font-medium text-[#16232a]">{product.name}</span> },
            { header: "Référence", render: (product) => product.reference || "—" },
            { header: "Catégorie", render: (product) => product.category },
            { header: "Statut", render: (product) => <PublishedBadge published={product.published} /> },
            {
              header: "Actions", className: "text-right", render: (product) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/produits/${product.slug}/modifier`} className="text-sm font-semibold text-[#a85c36] hover:underline">Modifier</Link>
                  <DeleteButton action={deleteProduct.bind(null, product.slug)} confirmTitle={`Supprimer « ${product.name} » ?`} />
                </div>
              ),
            },
          ]}
        />
      </div>

      <Pagination page={Number(page ?? 1)} hasNext={Boolean(data.next)} hasPrevious={Boolean(data.previous)} basePath="/admin/produits" searchParams={{ q, category, published }} />
    </div>
  );
}
