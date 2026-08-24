import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { FilterSelect } from "@/components/admin/filter-select";
import { QuoteStatusBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { adminFetch } from "@/lib/admin/api";
import { QUOTE_STATUSES, type QuoteRequest } from "@/types/admin";

const statusLabels: Record<string, string> = { new: "Nouveau", in_progress: "En cours", done: "Traité", archived: "Archivé" };

export default async function AdminQuotesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string; service?: string }> }) {
  const { q, status, service } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  if (service) params.set("service", service);

  const quotes = await adminFetch<QuoteRequest[]>(`/quotes/?${params.toString()}`);
  const services = Array.from(new Set(quotes.map((quote) => quote.service).filter(Boolean))).sort();

  return (
    <div>
      <AdminHeader title="Demandes de devis" description="Gestion commerciale des demandes reçues depuis le site public." />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un client, une entreprise…" />
        <FilterSelect paramName="status" label="Statut" allLabel="Tous les statuts" options={QUOTE_STATUSES.map((value) => ({ value, label: statusLabels[value] }))} />
        <FilterSelect paramName="service" label="Service" allLabel="Tous les services" options={services.map((value) => ({ value, label: value }))} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={quotes}
          emptyTitle="Aucune demande de devis ne correspond"
          emptyDescription="Ajustez votre recherche ou vos filtres."
          columns={[
            { header: "Client", render: (quote) => <span className="font-medium text-[#16232a]">{quote.name}</span> },
            { header: "Entreprise", render: (quote) => quote.organisation || "—" },
            { header: "Service", render: (quote) => quote.service || "—" },
            { header: "Date", render: (quote) => new Date(quote.created_at).toLocaleDateString("fr-FR") },
            { header: "Statut", render: (quote) => <QuoteStatusBadge status={quote.status} /> },
            { header: "Actions", className: "text-right", render: (quote) => <Link href={`/admin/devis/${quote.id}`} className="text-sm font-semibold text-[#a85c36] hover:underline">Ouvrir</Link> },
          ]}
        />
      </div>
    </div>
  );
}
