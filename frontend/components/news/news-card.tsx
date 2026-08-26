import Link from "next/link";
import type { AdminNews } from "@/types/admin";

export function NewsCard({ article, isMock = false }: { article: AdminNews; isMock?: boolean }) {
  const date = article.published_at || article.created_at;
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#dce5df] bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#a85c36]/8">
      <Link href={`/actualites/${article.slug}`} className="block">
        <div className="relative aspect-[16/10] bg-[#eaf2f2]">
          {article.image && <div className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${article.image})` }} />}
          {isMock && <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#a85c36]">Données de test</span>}
        </div>
        <div className="p-6">
          <p className="text-xs font-bold uppercase tracking-[.14em] text-[#a85c36]">
            {new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#16232a]">{article.title}</h2>
          <p className="mt-3 line-clamp-3 leading-7 text-[#526259]">{article.excerpt}</p>
          <span className="mt-5 inline-block text-sm font-semibold text-[#a85c36]">Lire la suite →</span>
        </div>
      </Link>
    </article>
  );
}
