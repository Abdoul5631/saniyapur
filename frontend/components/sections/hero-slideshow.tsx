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
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      if (slides.length === 0) return;
      setIndex(((next % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPaused(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const id = window.setInterval(() => goTo(index + 1), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [goTo, index, paused, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {slides.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <Image
            src={src}
            alt={i === index ? alt : ""}
            fill
            priority={i === 0}
            unoptimized
            quality={90}
            sizes="100vw"
            className="object-cover object-top"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-[#071d22]/38 via-[#071d22]/14 to-[#071d22]/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#071d22]/22 via-transparent to-[#071d22]/6" />

      {slides.length > 1 && (
        <div className="pointer-events-auto absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Afficher l’image ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
