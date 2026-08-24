import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { ProcessedToggleButton } from "@/components/admin/processed-toggle-button";
import { adminFetch } from "@/lib/admin/api";
import type { ContactMessage } from "@/types/admin";
import { deleteContactMessageAndRedirect, setContactProcessed } from "../actions";

export default async function ContactMessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let message: ContactMessage;
  try {
    message = await adminFetch<ContactMessage>(`/contacts/${id}/`);
  } catch {
    notFound();
  }

  const replyHref = `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.subject || "Votre message à J&B SANIYAPUR"}`)}`;

  return (
    <div className="max-w-2xl">
      <Link href="/admin/messages" className="text-sm font-semibold text-[#a85c36]">← Retour aux messages</Link>
      <AdminHeader
        title={message.subject || "Message sans sujet"}
        description={`Reçu le ${new Date(message.created_at).toLocaleString("fr-FR")}`}
        action={<ProcessedToggleButton processed={message.processed} action={setContactProcessed.bind(null, message.id, !message.processed)} onLabel="Marquer comme lu" offLabel="Marquer comme non lu" />}
      />

      <div className="rounded-2xl border border-[#dce5df] bg-white p-6">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Nom</dt><dd className="mt-1 text-sm text-[#16232a]">{message.name}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Entreprise</dt><dd className="mt-1 text-sm text-[#16232a]">{message.company || "—"}</dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">E-mail</dt><dd className="mt-1 text-sm text-[#16232a]"><a href={`mailto:${message.email}`} className="hover:text-[#a85c36]">{message.email}</a></dd></div>
          <div><dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Téléphone</dt><dd className="mt-1 text-sm text-[#16232a]">{message.phone || "—"}</dd></div>
        </dl>
        <div className="mt-6 border-t border-[#eef2ef] pt-6">
          <dt className="text-xs font-semibold uppercase tracking-[.1em] text-[#8a9a92]">Message</dt>
          <dd className="mt-2 whitespace-pre-line text-sm leading-7 text-[#16232a]">{message.message}</dd>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-[#eef2ef] pt-6">
          <a href={replyHref} className="rounded-full bg-[#a85c36] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#8b4a2b]">Répondre par e-mail</a>
          <DeleteButton action={deleteContactMessageAndRedirect.bind(null, message.id)} label="Supprimer ce message" confirmTitle="Supprimer ce message ?" />
        </div>
        <p className="mt-3 text-xs text-[#8a9a92]">« Répondre » ouvre votre logiciel de messagerie habituel. L’envoi n’est pas géré depuis cette interface.</p>
      </div>
    </div>
  );
}
