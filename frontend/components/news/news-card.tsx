import Image from "next/image";
import Link from "next/link";
import { resolveMediaUrl } from "@/lib/media";
import type { AdminNews } from "@/types/admin";

function formatNewsDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function NewsCard({ article, isMock = false }: { article: AdminNews; isMock?: boolean }) {
  const date = formatNewsDate(article.published_at || article.created_at);
  const imageSrc = article.image ? resolveMediaUrl(article.image, "") : "";

  return (
    <article className="card-luxury group overflow-hidden rounded-2xl border border-[#dce5df] bg-white shadow-xs">
      <Link href={`/actualites/${article.slug}`} className="block">
        <div className="relative isolate aspect-[16/10] bg-[#e8eeec]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={article.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : null}
          {isMock && (
            <span className="absolute left-3 top-3 z-[1] rounded-full bg-white px-2.5 py-0.5 text-[10px] font-bold text-[#a85c36]">
              Démo
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#a85c36]">
            {article.category ? <span>{article.category}</span> : null}
            {date ? <span className="text-[#8a9a92]">{date}</span> : null}
          </div>
          <h2 className="mt-2 line-clamp-2 text-lg font-extrabold tracking-tight text-[#16232a] group-hover:text-[#a85c36]">
            {article.title}
          </h2>
          {article.excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#526259]">{article.excerpt}</p>
          ) : null}
          <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-[#a85c36]">
            Lire →
          </span>
        </div>
      </Link>
    </article>
  );
}
