import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { QuoteStatusSelect } from "@/components/admin/quote-status-select";
import { adminFetch } from "@/lib/admin/api";
import type { QuoteRequest } from "@/types/admin";
import { deleteQuote, setQuoteNotes, setQuoteStatus } from "../actions";

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let quote: QuoteRequest;
  try {
    quote = await adminFetch<QuoteRequest>(`/quotes/${id}/`);
  } catch {
    notFound();
  }
  const boundSetNotes = setQuoteNotes.bind(null, quote.id);

  return (
    <div className="max-w-2xl">
      <Link href="/admin/devis" className="text-sm font-semibold text-[#a85c36]">← Retour aux demandes de devis</Link>
      <AdminHeader
        title={`${quote.name}${quote.organisation ? ` — ${quote.organisation}` : ""}`}
        description={`Reçue le ${new Date(quote.created_at).toLocaleString("fr-FR")}`}
        action={<QuoteStatusSelect quoteId={quote.id} status={quote.status} action={setQuoteStatus} />}
      />

      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">E-mail</dt><dd className="mt-1 text-sm text-[#16232a]"><a href={`mailto:${quote.email}`} className="hover:text-[#a85c36]">{quote.email}</a></dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Téléphone</dt><dd className="mt-1 text-sm text-[#16232a]">{quote.phone}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Localisation</dt><dd className="mt-1 text-sm text-[#16232a]">{quote.location || "—"}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Secteur d’activité</dt><dd className="mt-1 text-sm text-[#16232a]">{quote.sector || "—"}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Service recherché</dt><dd className="mt-1 text-sm text-[#16232a]">{quote.service || "—"}</dd></div>
        </dl>
        <div className="mt-6 border-t border-[#eef2ef] pt-6">
          <dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Description du besoin</dt>
          <dd className="mt-2 whitespace-pre-line text-sm leading-7 text-[#16232a]">{quote.message}</dd>
        </div>
        {quote.attachment && (
          <div className="mt-6 border-t border-[#eef2ef] pt-6">
            <dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Pièce jointe</dt>
            <dd className="mt-2"><a href={quote.attachment} target="_blank" rel="noreferrer" className="text-sm font-semibold text-[#a85c36] hover:underline">📎 Télécharger la pièce jointe</a></dd>
          </div>
        )}
        <div className="mt-6 border-t border-[#eef2ef] pt-6">
          <p className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Notes internes</p>
          <p className="mt-1 text-xs text-[#8a9a92]">Réservées à l’équipe — jamais visibles côté public.</p>
          <form action={boundSetNotes} className="mt-3 grid gap-3">
            <textarea name="notes" defaultValue={quote.notes} rows={4} className="w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm text-[#16232a] outline-none focus:border-[#a85c36]" />
            <button type="submit" className="justify-self-start rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Enregistrer les notes</button>
          </form>
        </div>
        <div className="mt-8 border-t border-[#eef2ef] pt-6">
          <DeleteButton action={deleteQuote.bind(null, quote.id)} label="Supprimer cette demande" confirmTitle="Supprimer cette demande de devis ?" />
        </div>
      </div>
    </div>
  );
}
