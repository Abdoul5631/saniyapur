"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import type { TeamGalleryPhoto } from "@/types/admin";

export function TeamPhotoGrid({ photos }: { photos: TeamGalleryPhoto[] }) {
  const [active, setActive] = useState<number | null>(null);
  const current = active !== null ? photos[active] : null;

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
