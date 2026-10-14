"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import type { TeamGalleryPhoto } from "@/types/admin";

export function TeamPhotoGrid({ photos, marquee = false }: { photos: TeamGalleryPhoto[]; marquee?: boolean }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? photos[active] : null;
  // Deux moitiés identiques (la piste glisse de -50 %) ; chaque moitié doit dépasser la largeur de l'écran.
  const half = Array.from({ length: Math.max(1, Math.ceil(8 / Math.max(photos.length, 1))) }, () => photos).flat();
  const loop = [...half, ...half];

  useEffect(() => {
    if (active === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((i) => (i === null ? i : (i + 1) % photos.length));
      if (event.key === "ArrowLeft") setActive((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, photos.length]);

  return (
    <>
      {marquee ? (
        <div
          className="group/marquee relative -mx-4 overflow-hidden py-3 sm:-mx-6 lg:-mx-8"
          style={{ maskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)" }}
        >
          <ul
            className="animate-marquee-slow flex w-max group-hover/marquee:[animation-play-state:paused]"
            style={{ animationDuration: `${half.length * 7}s` }}
          >
            {loop.map((photo, i) => {
              const index = i % photos.length;
              return (
                <li key={`${photo.id}-${i}`} aria-hidden={i >= loop.length / 2 || undefined} className="mr-5 w-[280px] shrink-0 sm:w-[340px]">
                  <button
                    type="button"
                    tabIndex={i >= loop.length / 2 ? -1 : 0}
                    onClick={() => setActive(index)}
                    className="group w-full overflow-hidden rounded-2xl border border-[#dce5df] bg-white text-left shadow-xs transition duration-300 hover:-translate-y-1 hover:border-[#a85c36]/40 hover:shadow-lg"
                  >
                    <span className="relative block aspect-4/3 overflow-hidden">
                      <Image
                        src={resolveMediaUrl(photo.image)}
                        alt={photo.caption || "Photo de l’équipe J&B SANIYAPUR"}
                        fill
                        unoptimized
                        sizes="340px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </span>
                    {photo.caption ? (
                      <span className="block truncate px-3 py-2 text-sm text-[#526259]">{photo.caption}</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <li key={photo.id}>
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group w-full overflow-hidden rounded-2xl border border-[#dce5df] bg-white text-left shadow-xs transition hover:-translate-y-0.5 hover:border-[#a85c36]/40 hover:shadow-md"
            >
              <span className="relative block aspect-4/3">
                <Image
                  src={resolveMediaUrl(photo.image)}
                  alt={photo.caption || "Photo de l’équipe J&B SANIYAPUR"}
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-contain p-2"
                />
              </span>
              {photo.caption ? (
                <span className="block truncate px-3 py-2 text-sm text-[#526259]">{photo.caption}</span>
              ) : null}
            </button>
          </li>
        ))}
      </ul>
      )}

      {current && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071d22]/88 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={current.caption || "Photo de l’équipe"}
          onClick={() => setActive(null)}
        >
          <div className="relative max-h-[90vh] w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative mx-auto h-[min(80vh,720px)] w-full">
              <Image
                src={resolveMediaUrl(current.image)}
                alt={current.caption || "Photo de l’équipe J&B SANIYAPUR"}
                fill
                unoptimized
                className="object-contain"
                sizes="100vw"
              />
            </div>
            {current.caption ? (
              <p className="mt-3 text-center text-sm text-white/80">{current.caption}</p>
            ) : null}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-2 right-0 rounded-full bg-white/15 px-3 py-1 text-sm text-white hover:bg-white/25"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
