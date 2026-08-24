import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { StatCard } from "@/components/admin/stat-card";
import { EmptyState } from "@/components/admin/empty-state";
import { QuoteStatusBadge, ReadBadge } from "@/components/admin/status-badge";
import { adminFetch } from "@/lib/admin/api";
import type { PaginatedResponse, Realisation } from "@/types/realisation";
import type { ContactMessage, QuoteRequest } from "@/types/admin";

async function countPaginated(path: string): Promise<number> {
  try {
    const data = await adminFetch<PaginatedResponse<unknown>>(path);
    return data.count ?? data.results.length;
  } catch {
    return 0;
  }
}

async function safeList<T>(path: string): Promise<T[]> {
  try {
    return await adminFetch<T[]>(path);
  } catch {
    return [];
  }
}

function coverImage(realisation: Realisation): string | null {
  const sorted = [...realisation.images].sort((a, b) => (a.type === "main" ? -1 : b.type === "main" ? 1 : a.order - b.order));
  return sorted[0]?.image ?? null;
}

export default async function AdminDashboardPage() {
  const [productsCount, servicesCount, realisationsCount, newsCount, messages, quotes] = await Promise.all([
    countPaginated("/products/"),
    countPaginated("/services/"),
    countPaginated("/realisations/"),
    countPaginated("/news/"),
    safeList<ContactMessage>("/contacts/"),
    safeList<QuoteRequest>("/quotes/"),
  ]);

  const unreadMessages = messages.filter((message) => !message.processed).length;
  const newQuotes = quotes.filter((quote) => quote.status === "new").length;
  const latestQuotes = quotes.slice(0, 5);
  const latestMessages = messages.slice(0, 5);

  let latestRealisations: Realisation[] = [];
  try {
    const realisationsData = await adminFetch<PaginatedResponse<Realisation>>("/realisations/");
    latestRealisations = realisationsData.results.filter((realisation) => realisation.published).slice(0, 3);
  } catch {
    latestRealisations = [];
  }

  const stats = [
    ["Produits", productsCount, "/admin/produits"],
    ["Services", servicesCount, "/admin/services"],
    ["Réalisations", realisationsCount, "/admin/realisations"],
    ["Actualités", newsCount, "/admin/actualites"],
  ] as const;

  const quickActions = [
    ["Ajouter un produit", "/admin/produits/nouveau"],
    ["Ajouter une réalisation", "/admin/realisations/nouveau"],
    ["Ajouter une actualité", "/admin/actualites/nouveau"],
    ["Voir les demandes de devis", "/admin/devis"],
  ] as const;

  return (
    <div>
      <AdminHeader title="Tableau de bord" description="Vue d’ensemble du contenu et de l’activité commerciale du site J&B SANIYAPUR." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, href]) => <StatCard key={href} label={label} value={value} href={href} />)}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <StatCard label="Messages non lus" value={unreadMessages} href="/admin/messages" tone={unreadMessages > 0 ? "warning" : "default"} />
        <StatCard label="Demandes de devis" value={quotes.length} href="/admin/devis" />
        <StatCard label="Nouvelles demandes de devis" value={newQuotes} href="/admin/devis?status=new" tone={newQuotes > 0 ? "warning" : "default"} />
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#16232a]">Dernières demandes de devis</h2>
            <Link href="/admin/devis" className="text-sm font-semibold text-[#a85c36]">Tout voir →</Link>
          </div>
          {latestQuotes.length ? (
            <ul className="mt-4 grid gap-3">
              {latestQuotes.map((quote) => (
                <li key={quote.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#eef2ef] p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#16232a]">{quote.name}{quote.organisation && ` — ${quote.organisation}`}</p>
                    <p className="truncate text-xs text-[#8a9a92]">{quote.service || "Service non précisé"} · {new Date(quote.created_at).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <QuoteStatusBadge status={quote.status} />
                </li>
              ))}
            </ul>
          ) : <EmptyState title="Aucune demande de devis" />}
        </section>

        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#16232a]">Derniers messages</h2>
            <Link href="/admin/messages" className="text-sm font-semibold text-[#a85c36]">Tout voir →</Link>
          </div>
          {latestMessages.length ? (
            <ul className="mt-4 grid gap-3">
              {latestMessages.map((message) => (
                <li key={message.id} className="flex items-center justify-between gap-3 rounded-xl border border-[#eef2ef] p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#16232a]">{message.name}</p>
                    <p className="truncate text-xs text-[#8a9a92]">{message.subject || "Sans sujet"} · {new Date(message.created_at).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <ReadBadge processed={message.processed} />
                </li>
              ))}
            </ul>
          ) : <EmptyState title="Aucun message" />}
        </section>
      </div>

      <section className="mt-4 rounded-2xl border border-[#dce5df] bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#16232a]">Dernières réalisations publiées</h2>
          <Link href="/admin/realisations" className="text-sm font-semibold text-[#a85c36]">Tout voir →</Link>
        </div>
        {latestRealisations.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {latestRealisations.map((realisation) => {
              const image = coverImage(realisation);
              return (
                <Link key={realisation.id} href={`/admin/realisations/${realisation.slug}`} className="overflow-hidden rounded-xl border border-[#eef2ef] transition hover:border-[#a85c36]">
                  <div className="aspect-video bg-[#f1f6f6]">
                    {/* eslint-disable-next-line @next/next/no-img-element -- médias Django cross-origin */}
                    {image && <img src={image} alt={realisation.title} className="size-full object-cover" />}
                  </div>
                  <p className="truncate p-3 text-sm font-semibold text-[#16232a]">{realisation.title}</p>
                </Link>
              );
            })}
          </div>
        ) : <EmptyState title="Aucune réalisation publiée" description="Publiez une réalisation pour qu’elle apparaisse ici." />}
      </section>

      <section className="mt-4 rounded-2xl border border-[#dce5df] bg-white p-6">
        <h2 className="text-lg font-semibold text-[#16232a]">Actions rapides</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {quickActions.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-full border border-[#dce5df] px-4 py-2.5 text-sm font-semibold text-[#a85c36] transition hover:border-[#a85c36] hover:bg-[#eaf2f2]">{label}</Link>
          ))}
        </div>
      </section>
    </div>
  );
}
