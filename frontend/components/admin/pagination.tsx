import Link from "next/link";

/** Pagination basée sur l’URL (?page=N), pensée pour la PageNumberPagination de Django REST Framework. */
export function Pagination({ page, hasNext, hasPrevious, basePath, searchParams }: { page: number; hasNext: boolean; hasPrevious: boolean; basePath: string; searchParams?: Record<string, string | undefined> }) {
  if (!hasNext && !hasPrevious) return null;

  function hrefFor(targetPage: number): string {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(searchParams ?? {})) if (value) params.set(key, value);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  }

  return (
    <div className="mt-4 flex items-center justify-between">
      <p className="text-sm text-[#8a9a92]">Page {page}</p>
      <div className="flex gap-3">
        {hasPrevious ? <Link href={hrefFor(page - 1)} className="rounded-lg border border-[#dce5df] px-4 py-2 text-sm font-semibold text-[#a85c36] hover:border-[#a85c36]">← Précédent</Link> : <span className="rounded-lg border border-[#eef2ef] px-4 py-2 text-sm font-semibold text-[#c3cdc7]">← Précédent</span>}
        {hasNext ? <Link href={hrefFor(page + 1)} className="rounded-lg border border-[#dce5df] px-4 py-2 text-sm font-semibold text-[#a85c36] hover:border-[#a85c36]">Suivant →</Link> : <span className="rounded-lg border border-[#eef2ef] px-4 py-2 text-sm font-semibold text-[#c3cdc7]">Suivant →</span>}
      </div>
    </div>
  );
}
