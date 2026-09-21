import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { EmptyState } from "@/components/admin/empty-state";
import { QuoteStatusBadge, ReadBadge } from "@/components/admin/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { adminCount, adminFetch, normaliseAdminList } from "@/lib/admin/api";
import { resolveMediaUrl } from "@/lib/media";
import type { ContactMessage, QuoteRequest } from "@/types/admin";
import type { PaginatedResponse, Realisation } from "@/types/realisation";

function coverImage(realisation: Realisation): string {
  const sorted = [...(realisation.images ?? [])].sort((a, b) =>
    a.type === "main" ? -1 : b.type === "main" ? 1 : a.order - b.order,
  );
  return sorted[0]?.image ? resolveMediaUrl(sorted[0].image, "") : "";
}

export default async function AdminDashboardPage() {
  const [productsCount, servicesCount, realisationsCount, newsCount, contactsRaw, quotesRaw, realisationsRaw] =
    await Promise.all([
      adminCount("/products/"),
      adminCount("/services/"),
      adminCount("/realisations/"),
      adminCount("/news/"),
      adminFetch<ContactMessage[] | PaginatedResponse<ContactMessage>>("/contacts/").catch(() => []),
      adminFetch<QuoteRequest[] | PaginatedResponse<QuoteRequest>>("/quotes/").catch(() => []),
      adminFetch<Realisation[] | PaginatedResponse<Realisation>>("/realisations/").catch(() => []),
    ]);

  const messages = normaliseAdminList(contactsRaw);
  const quotes = normaliseAdminList(quotesRaw);
  const realisations = normaliseAdminList(realisationsRaw);

  const unreadMessages = messages.filter((message) => !message.processed).length;
  const newQuotes = quotes.filter((quote) => quote.status === "new").length;
  const latestQuotes = quotes.slice(0, 5);
  const latestMessages = messages.slice(0, 5);
  const latestRealisations = realisations.filter((item) => item.published).slice(0, 3);

  return (
    <div>
      <AdminHeader
        title="Tableau de bord"
        description="Contenu du site et demandes reçues depuis les formulaires publics."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Services" value={servicesCount} href="/admin/services" />
        <StatCard label="Réalisations" value={realisationsCount} href="/admin/realisations" />
        <StatCard label="Produits" value={productsCount} href="/admin/produits" />
        <StatCard label="Actualités" value={newsCount} href="/admin/actualites" />
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <StatCard
          label="Messages non lus"
          value={unreadMessages}
          href="/admin/messages"
          tone={unreadMessages > 0 ? "warning" : "default"}
        />
        <StatCard
          label="Nouveaux devis"
          value={newQuotes}
          href="/admin/devis?status=new"
          tone={newQuotes > 0 ? "warning" : "default"}
        />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#16232a]">Devis récents</h2>
            <Link href="/admin/devis" className="text-sm font-semibold text-[#a85c36]">
              Tout voir
            </Link>
          </div>
          {latestQuotes.length ? (
            <ul className="mt-4 grid gap-2">
              {latestQuotes.map((quote) => (
                <li key={quote.id}>
                  <Link
                    href={`/admin/devis/${quote.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#eef2ef] p-3 transition hover:border-[#a85c36]/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#16232a]">
                        {quote.name}
                        {quote.organisation ? ` — ${quote.organisation}` : ""}
                      </p>
                      <p className="truncate text-xs text-[#8a9a92]">
                        {quote.service || "Service non précisé"} ·{" "}
                        {new Date(quote.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <QuoteStatusBadge status={quote.status} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Aucune demande de devis" />
          )}
        </section>

        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-[#16232a]">Messages récents</h2>
            <Link href="/admin/messages" className="text-sm font-semibold text-[#a85c36]">
              Tout voir
            </Link>
          </div>
          {latestMessages.length ? (
            <ul className="mt-4 grid gap-2">
              {latestMessages.map((message) => (
                <li key={message.id}>
                  <Link
                    href={`/admin/messages/${message.id}`}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#eef2ef] p-3 transition hover:border-[#a85c36]/40"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#16232a]">{message.name}</p>
                      <p className="truncate text-xs text-[#8a9a92]">
                        {message.subject || "Sans sujet"} · {new Date(message.created_at).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <ReadBadge processed={message.processed} />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Aucun message" />
          )}
        </section>
      </div>

      <section className="mt-4 rounded-2xl border border-[#dce5df] bg-white p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#16232a]">Réalisations publiées</h2>
          <Link href="/admin/realisations" className="text-sm font-semibold text-[#a85c36]">
            Tout voir
          </Link>
        </div>
        {latestRealisations.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {latestRealisations.map((realisation) => {
              const image = coverImage(realisation);
              return (
                <Link
                  key={realisation.id}
                  href={`/admin/realisations/${realisation.slug}/modifier`}
                  className="overflow-hidden rounded-xl border border-[#eef2ef] transition hover:border-[#a85c36]"
                >
                  <div className="aspect-video bg-[#e8eeec]">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- médias Django
                      <img src={image} alt={realisation.title} className="size-full object-cover" />
                    ) : null}
                  </div>
                  <p className="truncate p-3 text-sm font-semibold text-[#16232a]">{realisation.title}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="Aucune réalisation publiée"
            description="Publiez un chantier pour qu’il apparaisse ici."
            action={
              <Link href="/admin/realisations/nouveau" className="text-sm font-semibold text-[#a85c36]">
                Ajouter une réalisation
              </Link>
            }
          />
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-[#dce5df] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#16232a]">Actions rapides</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {[
            ["Modifier À propos", "/admin/a-propos"],
            ["Nouveau service", "/admin/services/nouveau"],
            ["Nouvelle réalisation", "/admin/realisations/nouveau"],
            ["Nouvelle actualité", "/admin/actualites/nouveau"],
            ["Paramètres", "/admin/parametres"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-[#dce5df] px-4 py-2.5 text-sm font-semibold text-[#a85c36] transition hover:border-[#a85c36] hover:bg-[#fcf9f7]"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
