import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { EmptyState } from "@/components/admin/empty-state";
import { QuoteStatusBadge, ReadBadge } from "@/components/admin/status-badge";
import { StatCard } from "@/components/admin/stat-card";
import { Reveal } from "@/components/ui/reveal";
import { adminCount, adminFetch, normaliseAdminList } from "@/lib/admin/api";
import { resolveMediaUrl } from "@/lib/media";
import type { ContactMessage, QuoteRequest } from "@/types/admin";
import type { PaginatedResponse, Realisation } from "@/types/realisation";

function Icon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={path} />
    </svg>
  );
}

const icons = {
  services: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5",
  realisations: "M4 7h16v12H4zM8 7V5h8v2M4 13h16",
  produits: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8",
  actualites: "M5 4h11v16H5zM16 8h3v10a2 2 0 01-2 2M8 8h5M8 12h5M8 16h3",
  messages: "M4 5h16v11H8l-4 4V5z",
  devis: "M7 3h8l4 4v14H7zM15 3v4h4M10 12h6M10 16h6",
};

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

  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todo = unreadMessages + newQuotes;

  return (
    <div>
      <AdminHeader
        title="Tableau de bord"
        description={today.charAt(0).toUpperCase() + today.slice(1)}
        action={
          <Link
            href="/"
            target="_blank"
            className="rounded-full border border-[#dce5df] bg-white px-4 py-2.5 text-sm font-semibold text-[#a85c36] transition hover:border-[#a85c36] hover:bg-[#fcf9f7]"
          >
            Voir le site ↗
          </Link>
        }
      />

      <Reveal>
        <div
          className={`mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-5 py-4 ${
            todo ? "border-[#ecd9a8] bg-[#fbf4e0]" : "border-[#dce5df] bg-white"
          }`}
        >
          <p className="text-sm font-medium text-[#16232a]">
            {todo
              ? `À traiter : ${unreadMessages} message${unreadMessages > 1 ? "s" : ""} non lu${unreadMessages > 1 ? "s" : ""} et ${newQuotes} nouveau${newQuotes > 1 ? "x" : ""} devis.`
              : "Tout est à jour : aucune demande en attente."}
          </p>
          {todo > 0 && (
            <div className="flex gap-4 text-sm font-semibold text-[#a85c36]">
              {unreadMessages > 0 && <Link href="/admin/messages">Voir les messages →</Link>}
              {newQuotes > 0 && <Link href="/admin/devis?status=new">Voir les devis →</Link>}
            </div>
          )}
        </div>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {[
          <StatCard key="m" label="Messages non lus" value={unreadMessages} href="/admin/messages" icon={<Icon path={icons.messages} />} tone={unreadMessages > 0 ? "warning" : "default"} hint={unreadMessages > 0 ? "À traiter" : "Rien en attente"} />,
          <StatCard key="d" label="Nouveaux devis" value={newQuotes} href="/admin/devis?status=new" icon={<Icon path={icons.devis} />} tone={newQuotes > 0 ? "warning" : "default"} hint={newQuotes > 0 ? "À traiter" : "Rien en attente"} />,
          <StatCard key="s" label="Services" value={servicesCount} href="/admin/services" icon={<Icon path={icons.services} />} />,
          <StatCard key="r" label="Réalisations" value={realisationsCount} href="/admin/realisations" icon={<Icon path={icons.realisations} />} />,
          <StatCard key="p" label="Produits" value={productsCount} href="/admin/produits" icon={<Icon path={icons.produits} />} />,
          <StatCard key="a" label="Actualités" value={newsCount} href="/admin/actualites" icon={<Icon path={icons.actualites} />} />,
        ].map((card, index) => (
          <Reveal key={index} delayMs={index * 60}>
            {card}
          </Reveal>
        ))}
      </div>

      <section className="mt-6 rounded-2xl border border-[#dce5df] bg-white p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="mr-2 text-sm font-semibold uppercase tracking-wider text-[#8a9a92]">Actions rapides</h2>
          {[
            ["+ Nouveau service", "/admin/services/nouveau"],
            ["+ Nouvelle réalisation", "/admin/realisations/nouveau"],
            ["+ Nouvelle actualité", "/admin/actualites/nouveau"],
            ["Modifier À propos", "/admin/a-propos"],
            ["Paramètres", "/admin/parametres"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full border border-[#dce5df] px-4 py-2 text-sm font-semibold text-[#a85c36] transition hover:-translate-y-0.5 hover:border-[#a85c36] hover:bg-[#fcf9f7]"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
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
                  <div className="aspect-video overflow-hidden bg-[#e8eeec]">
                    {image ? (
                      // eslint-disable-next-line @next/next/no-img-element -- médias Django
                      <img src={image} alt={realisation.title} className="size-full object-cover transition-transform duration-500 hover:scale-105" />
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
    </div>
  );
}
