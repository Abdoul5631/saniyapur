import Image from "next/image";
import Link from "next/link";
import { resolveMediaUrl } from "@/lib/media";
import type { Realisation } from "@/types/realisation";

type Props = {
  realisation: Realisation;
  isMock?: boolean;
};

export function getRealisationCover(realisation: Realisation) {
  const images = [...(realisation.images ?? [])].sort((a, b) => a.order - b.order);
  return images.find((image) => image.type === "main") ?? images[0];
}

export function RealisationCard({ realisation, isMock = false }: Props) {
  const cover = getRealisationCover(realisation);
  const imageSrc = cover?.image ? resolveMediaUrl(cover.image, "") : "";

  return (
    <article className="card-luxury group relative isolate overflow-hidden rounded-2xl bg-[#e8eeec] shadow-sm">
      <Link href={`/realisations/${realisation.slug}`} className="block">
        <div className="relative aspect-[16/10]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={cover?.caption || realisation.title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <div className="absolute inset-0 bg-[#e8eeec]" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#041215]/85 via-[#041215]/20 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-[1] p-4 sm:p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#a85c36]">
                {realisation.sector}
              </span>
              {isMock && (
                <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold text-white">Démo</span>
              )}
            </div>
            <h3 className="mt-2 line-clamp-2 text-base font-extrabold tracking-tight text-white sm:text-lg">
              {realisation.title}
            </h3>
            {(realisation.client || realisation.location) ? (
              <p className="mt-1 truncate text-xs text-white/75">
                {[realisation.client, realisation.location].filter(Boolean).join(" · ")}
              </p>
            ) : null}
          </div>
        </div>
      </Link>
    </article>
  );
}
