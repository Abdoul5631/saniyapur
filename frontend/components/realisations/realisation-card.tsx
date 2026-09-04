import Link from "next/link";
import type { Realisation } from "@/types/realisation";

type Props = { realisation: Realisation; isMock?: boolean };

export function RealisationCard({ realisation, isMock = false }: Props) {
  const cover = [...realisation.images].sort((a, b) => a.order - b.order)[0];
  return (
    <article className="card-luxury group overflow-hidden rounded-3xl border border-[#dce5df] bg-white shadow-xs transition hover:border-[#a85c36]">
      <Link href={`/realisations/${realisation.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-[#16232a] overflow-hidden">
          {cover && (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${cover.image})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e272d]/80 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm">
            {realisation.sector}
          </span>
          {isMock && (
            <span className="absolute right-4 top-4 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white">
              Démo
            </span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold tracking-tight text-[#16232a] group-hover:text-[#a85c36] transition-colors line-clamp-1">
            {realisation.title}
          </h3>
          {realisation.location && (
            <p className="mt-1.5 text-xs text-[#8a9a92] flex items-center gap-1.5">
              <span>📍</span> {realisation.location}
            </p>
          )}
          <div className="mt-5 flex items-center gap-2 border-t border-[#f0f4f1] pt-3.5 text-xs font-bold uppercase tracking-wider text-[#a85c36]">
            <span>Consulter le projet</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

