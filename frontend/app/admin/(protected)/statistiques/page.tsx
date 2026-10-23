import Link from "next/link";
import { AdminHeader } from "@/components/admin/admin-header";
import { EmptyState } from "@/components/admin/empty-state";
import { StatCard } from "@/components/admin/stat-card";
import { VisitsChart } from "@/components/admin/visits-chart";
import { adminFetch } from "@/lib/admin/api";
import type { VisitsSummary } from "@/types/admin";

const RANGES = [7, 30, 90] as const;

const PAGE_LABELS: Record<string, string> = {
  "/": "Accueil",
  "/a-propos": "À propos",
  "/services": "Services",
  "/secteurs": "Secteurs",
  "/produits": "Catalogue produits",
  "/realisations": "Réalisations",
  "/actualites": "Actualités",
  "/attestations": "Attestations",
  "/engagement-social": "Engagement social",
  "/contact": "Contact",
  "/devis": "Demande de devis",
};

function pageLabel(path: string): string {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  const [, section, slug] = path.split("/");
  const parent = PAGE_LABELS[`/${section}`];
  return parent && slug ? `${parent} › ${slug.replace(/-/g, " ")}` : path;
}

export default async function StatisticsPage({ searchParams }: { searchParams: Promise<{ jours?: string }> }) {
  const { jours } = await searchParams;
  const days = RANGES.find((value) => String(value) === jours) ?? 30;
  const summary = await adminFetch<VisitsSummary>(`/analytics/summary/?days=${days}`).catch(() => null);

  if (!summary) {
    return (
      <div>
        <AdminHeader title="Statistiques" />
        <EmptyState title="Statistiques indisponibles" description="Le serveur n'a pas pu renvoyer les visites. Réessayez dans un instant." />
      </div>
    );
  }

  const sourceTotal = summary.sources.reduce((sum, row) => sum + row.visits, 0);
  const maxPage = Math.max(...summary.top_pages.map((page) => page.views), 1);

  return (
    <div>
      <AdminHeader
        title="Statistiques"
        description="Visites du site public. Seuls les administrateurs voient ces chiffres ; aucune donnée personnelle n'est conservée."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Aujourd'hui" value={summary.today.visitors} hint={`${summary.today.views} pages vues`} />
        <StatCard label="Hier" value={summary.yesterday.visitors} hint={`${summary.yesterday.views} pages vues`} />
        <StatCard label="7 derniers jours" value={summary.last_7.visitors} hint={`${summary.last_7.views} pages vues`} />
        <StatCard label="30 derniers jours" value={summary.last_30.visitors} hint={`${summary.last_30.views} pages vues`} />
      </div>

      <section className="mt-6 rounded-2xl border border-[#dce5df] bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-[#16232a]">Visiteurs par jour</h2>
            <p className="text-sm text-[#526259]">Un visiteur compte une fois par jour, même s&apos;il consulte plusieurs pages.</p>
          </div>
          <div className="flex gap-1 rounded-full border border-[#dce5df] p-1 text-sm font-semibold">
            {RANGES.map((value) => (
              <Link
                key={value}
                href={`/admin/statistiques?jours=${value}`}
                className={`rounded-full px-3 py-1 transition ${value === days ? "bg-[#a85c36] text-white" : "text-[#526259] hover:text-[#a85c36]"}`}
              >
                {value} j
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-6">
          {summary.range.views === 0 ? (
            <EmptyState title="Pas encore de visites" description="Les visites apparaissent ici dès que le site public est consulté." />
          ) : (
            <VisitsChart daily={summary.daily} />
          )}
        </div>
      </section>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#16232a]">Pages les plus vues</h2>
          <p className="text-sm text-[#526259]">Sur les {days} derniers jours.</p>
          {summary.top_pages.length ? (
            <ol className="mt-4 grid gap-3">
              {summary.top_pages.map((page) => (
                <li key={page.path}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="truncate font-medium text-[#16232a]">{pageLabel(page.path)}</span>
                    <span className="shrink-0 tabular-nums text-[#526259]">{page.views}</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[#eef2ef]">
                    <div className="h-full rounded-full bg-[#a85c36]" style={{ width: `${(page.views / maxPage) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState title="Aucune page vue" />
          )}
        </section>

        <section className="rounded-2xl border border-[#dce5df] bg-white p-6">
          <h2 className="text-lg font-semibold text-[#16232a]">D&apos;où viennent les visiteurs</h2>
          <p className="text-sm text-[#526259]">Première page de chaque visite, sur les {days} derniers jours.</p>
          {summary.sources.length ? (
            <ul className="mt-4 grid gap-3">
              {summary.sources.map((row) => (
                <li key={row.source}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium text-[#16232a]">{row.source}</span>
                    <span className="tabular-nums text-[#526259]">
                      {row.visits} · {Math.round((row.visits / sourceTotal) * 100)} %
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-[#eef2ef]">
                    <div className="h-full rounded-full bg-[#a85c36]" style={{ width: `${(row.visits / sourceTotal) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="Aucune donnée" />
          )}
        </section>
      </div>
    </div>
  );
}
