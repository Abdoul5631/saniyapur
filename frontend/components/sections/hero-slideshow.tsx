"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const INTERVAL_MS = 5000;

type Props = {
  images: string[];
  alt: string;
};

export function HeroSlideshow({ images, alt }: Props) {
  const slides = images.filter(Boolean);
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduceMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [index, reduceMotion, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="absolute inset-0 z-0">
      {slides.map((src, i) => {
        const active = i === index;
        return (
          <div
            key={`${src}-${i}`}
            className={`absolute inset-0 overflow-hidden ${
              active ? "z-[1] opacity-100" : "z-0 opacity-0"
            } ${active && !reduceMotion ? "hero-slide-enter" : ""} ${
              reduceMotion ? "transition-opacity duration-500" : ""
            }`}
            aria-hidden={!active}
          >
            <Image
              src={src}
              alt={active ? alt : ""}
              fill
              priority={i === 0}
              unoptimized
              quality={90}
              sizes="100vw"
              className={`object-cover object-top ${active && !reduceMotion ? "hero-kenburns" : ""}`}
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#071d22]/42 via-[#071d22]/16 to-[#071d22]/6" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#071d22]/28 via-transparent to-[#071d22]/8" />

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Image précédente"
            onClick={() => goTo(index - 1)}
            className="absolute top-1/2 left-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 sm:flex"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Image suivante"
            onClick={() => goTo(index + 1)}
            className="absolute top-1/2 right-3 z-20 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/45 sm:flex"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Afficher l’image ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
                onClick={() => goTo(i)}
                className={`relative h-1.5 overflow-hidden rounded-full bg-white/35 transition-all duration-300 ${
                  i === index ? "w-10" : "w-2.5 hover:bg-white/70"
                }`}
              >
                {i === index && !reduceMotion ? (
                  <span
                    key={index}
                    className="hero-progress absolute inset-y-0 left-0 w-full rounded-full bg-white"
                  />
                ) : i === index ? (
                  <span className="absolute inset-0 rounded-full bg-white" />
                ) : null}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
