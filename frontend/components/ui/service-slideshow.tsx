"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type ServiceSlideshowProps = {
  images: string[];
  alt: string;
  sizes: string;
  /** Décalage de départ pour que les cartes ne changent pas toutes en même temps. */
  startDelayMs?: number;
  intervalMs?: number;
  dotsClassName?: string;
};

/** Diaporama automatique : fondu + zoom lent, démarre quand la carte est visible. */
export function ServiceSlideshow({ images, alt, sizes, startDelayMs = 0, intervalMs = 3000, dotsClassName = "bottom-3 left-1/2 -translate-x-1/2" }: ServiceSlideshowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const count = images.length;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval>;
    const starter = setTimeout(() => {
      setActive((i) => (i + 1) % count);
      timer = setInterval(() => setActive((i) => (i + 1) % count), intervalMs);
    }, intervalMs + startDelayMs);
    return () => {
      clearTimeout(starter);
      clearInterval(timer);
    };
  }, [inView, count, intervalMs, startDelayMs]);

  return (
    <div ref={ref} className="absolute inset-0">
      {images.map((src, i) => (
        <Image
          key={src + i}
          src={src}
          alt={i === 0 ? alt : ""}
          fill
          unoptimized
          sizes={sizes}
          className={`object-cover object-center transition-all duration-[1100ms] ease-out ${
            i === active ? "z-[1] scale-[1.08] opacity-100" : "z-0 scale-100 opacity-0"
          } group-hover:scale-[1.14]`}
        />
      ))}
      {count > 1 && (
        <div className={`absolute z-[4] flex gap-1.5 ${dotsClassName}`}>
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full bg-white transition-all duration-500 ${
                i === active ? "w-6 opacity-100" : "w-1.5 opacity-60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
