import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DataTable } from "@/components/admin/data-table";
import { DeleteButton } from "@/components/admin/delete-button";
import { FilterSelect } from "@/components/admin/filter-select";
import { ReadBadge } from "@/components/admin/status-badge";
import { SearchInput } from "@/components/admin/search-input";
import { adminFetch } from "@/lib/admin/api";
import type { ContactMessage } from "@/types/admin";
import { deleteContactMessage } from "./actions";

export default async function AdminMessagesPage({ searchParams }: { searchParams: Promise<{ q?: string; processed?: string }> }) {
  const { q, processed } = await searchParams;
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (processed) params.set("processed", processed);

  const messages = await adminFetch<ContactMessage[]>(`/contacts/?${params.toString()}`);

  return (
    <div>
      <AdminHeader title="Messages" description="Messages reçus via le formulaire de contact du site public." />

      <div className="flex flex-wrap items-center gap-3">
        <SearchInput placeholder="Rechercher un message…" />
        <FilterSelect paramName="processed" label="Statut" allLabel="Tous" options={[{ value: "false", label: "Non lu" }, { value: "true", label: "Lu" }]} />
      </div>

      <div className="mt-6">
        <DataTable
          rows={messages}
          emptyTitle="Aucun message ne correspond"
          emptyDescription="Ajustez votre recherche ou vos filtres."
          columns={[
            { header: "Nom", render: (message) => <span className="font-medium text-[#16232a]">{message.name}</span> },
            { header: "Entreprise", render: (message) => message.company || "—" },
            { header: "Sujet", render: (message) => message.subject || "—" },
            { header: "Date", render: (message) => new Date(message.created_at).toLocaleDateString("fr-FR") },
            { header: "Statut", render: (message) => <ReadBadge processed={message.processed} /> },
            {
              header: "Actions", className: "text-right", render: (message) => (
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/messages/${message.id}`} className="text-sm font-semibold text-[#a85c36] hover:underline">Ouvrir</Link>
                  <DeleteButton action={deleteContactMessage.bind(null, message.id)} confirmTitle={`Supprimer le message de « ${message.name} » ?`} />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
