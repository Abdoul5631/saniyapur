"use client";

import Image from "next/image";
import { useState } from "react";
import { resolveMediaUrl } from "@/lib/media";
import type { RealisationImage } from "@/types/realisation";

function sortedPhotos(images: RealisationImage[]) {
  return [...images].sort((a, b) => {
    if (a.type === "main" && b.type !== "main") return -1;
    if (b.type === "main" && a.type !== "main") return 1;
    return a.order - b.order || a.id - b.id;
  });
}

export function RealisationPhotoViewer({
  images,
  title,
  sector,
}: {
  images: RealisationImage[];
  title: string;
  sector?: string;
}) {
  const photos = sortedPhotos(images).filter((image) => Boolean(resolveMediaUrl(image.image, "")));
  const [index, setIndex] = useState(0);

  if (!photos.length) return null;

  const current = photos[Math.min(index, photos.length - 1)];
  const src = resolveMediaUrl(current.image, "");

  return (
    <figure className="relative isolate overflow-hidden rounded-3xl bg-[#e8eeec] shadow-xl">
      <div className="relative h-[260px] sm:h-[380px] lg:h-[460px]">
        {src ? (
          <Image
            key={current.id}
            src={src}
            alt={current.caption || title}
            fill
            unoptimized
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : null}
      </div>
      {sector ? (
        <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm sm:left-6 sm:top-6">
          {sector}
        </span>
      ) : null}
      {photos.length > 1 ? (
        <p className="absolute right-4 top-4 z-[1] rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white sm:right-6 sm:top-6">
          {Math.min(index, photos.length - 1) + 1} / {photos.length}
        </p>
      ) : null}
      {current.caption ? (
        <figcaption className="absolute inset-x-0 bottom-0 z-[1] bg-linear-to-t from-black/70 px-5 py-4 text-sm text-white">
          {current.caption}
        </figcaption>
      ) : null}
      {photos.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto bg-[#16232a] p-3">
          {photos.map((image, i) => {
            const thumb = resolveMediaUrl(image.image, "");
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === index ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {thumb ? (
                  // eslint-disable-next-line @next/next/no-img-element -- miniatures Django
                  <img src={thumb} alt="" className="size-full object-cover" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </figure>
  );
}
