"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { resolveMediaUrl } from "@/lib/media";
import type { RealisationImage } from "@/types/realisation";

function sortedPhotos(images: RealisationImage[]) {
  return [...images].sort((a, b) => {
    if (a.type === "main" && b.type !== "main") return -1;
    if (b.type === "main" && a.type !== "main") return 1;
    return a.order - b.order || a.id - b.id;
  });
}

const INTERVAL_MS = 3000;

const REDUCE_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduceMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCE_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReduceMotion() {
  return window.matchMedia(REDUCE_MOTION_QUERY).matches;
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
  const [paused, setPaused] = useState(false);
  const thumbs = useRef<HTMLDivElement>(null);
  const count = photos.length;
  const active = Math.min(index, Math.max(count - 1, 0));
  const reduceMotion = useSyncExternalStore(subscribeReduceMotion, getReduceMotion, () => false);
  const autoplay = count > 1 && !paused && !reduceMotion;


  // Défilement automatique toutes les 3 s ; le minuteur repart à zéro après chaque changement (clic compris).
  useEffect(() => {
    if (!autoplay) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [autoplay, active, count]);

  // Garde la miniature active visible dans la bande (sans faire défiler la page).
  useEffect(() => {
    const strip = thumbs.current;
    const el = strip?.children[active] as HTMLElement | undefined;
    if (strip && el) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  if (!count) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <figure
      className="group relative isolate overflow-hidden rounded-3xl bg-[#e8eeec] shadow-xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[260px] overflow-hidden sm:h-[380px] lg:h-[460px]">
        {photos.map((photo, i) => {
          const src = resolveMediaUrl(photo.image, "");
          return src ? (
            <div
              key={photo.id}
              className={`absolute inset-0 transition-opacity duration-[1100ms] ease-out ${
                i === active ? "z-[1] opacity-100" : "z-0 opacity-0"
              }`}
            >
              {/* Fond flou : comble les côtés quand la photo n'a pas le même format que le cadre */}
              <Image src={src} alt="" aria-hidden fill unoptimized sizes="100vw" className="scale-110 object-cover object-center opacity-70 blur-2xl" />
              <Image
                src={src}
                alt={photo.caption || title}
                fill
                unoptimized
                priority={i === 0}
                className={`object-contain object-center transition-transform duration-[3500ms] ease-out ${
                  i === active ? "scale-[1.03]" : "scale-100"
                }`}
                sizes="100vw"
              />
            </div>
          ) : null;
        })}
        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(active - 1)}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 z-[2] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-[#a85c36] group-hover:opacity-100 focus-visible:opacity-100"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 z-[2] grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition hover:bg-[#a85c36] group-hover:opacity-100 focus-visible:opacity-100"
            >
              →
            </button>
            <div className="absolute inset-x-0 bottom-0 z-[2] h-1 bg-white/20">
              <div
                key={`${active}-${autoplay}`}
                className="h-full origin-left bg-[#a85c36]"
                style={autoplay ? { animation: `hero-progress ${INTERVAL_MS}ms linear forwards` } : { transform: "scaleX(0)" }}
              />
            </div>
          </>
        ) : null}
      </div>
      {sector ? (
        <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm sm:left-6 sm:top-6">
          {sector}
        </span>
      ) : null}
      {count > 1 ? (
        <p className="absolute right-4 top-4 z-[1] rounded-full bg-black/50 px-3 py-1 text-[11px] font-semibold text-white sm:right-6 sm:top-6">
          {active + 1} / {count}
        </p>
      ) : null}
      {photos[active].caption ? (
        <figcaption className={`absolute inset-x-0 z-[1] ${count > 1 ? "bottom-[88px]" : "bottom-0"} bg-linear-to-t from-black/70 px-5 py-4 text-sm text-white`}>
          {photos[active].caption}
        </figcaption>
      ) : null}
      {count > 1 ? (
        <div ref={thumbs} className="relative flex gap-2 overflow-x-auto bg-[#16232a] p-3">
          {photos.map((image, i) => {
            const thumb = resolveMediaUrl(image.image, "");
            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Photo ${i + 1}`}
                aria-current={i === active ? "true" : undefined}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  i === active ? "border-white" : "border-transparent opacity-70 hover:opacity-100"
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
