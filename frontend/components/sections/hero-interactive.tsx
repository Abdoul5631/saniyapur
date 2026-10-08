"use client";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { HeroSlideshow } from "@/components/sections/hero-slideshow";

type Props = {
  images: string[];
  tagline: string;
  title: string;
  text: string;
  primaryLabel: string;
  primaryUrl: string;
  secondaryLabel: string;
  secondaryUrl: string;
};

export function HeroInteractive({
  images,
  tagline,
  title,
  text,
  primaryLabel,
  primaryUrl,
  secondaryLabel,
  secondaryUrl,
}: Props) {
  return (
    <section
      id="accueil-hero"
      className="relative isolate flex min-h-[70vh] items-end overflow-hidden py-16 text-white sm:min-h-[78vh] sm:py-20 lg:min-h-[84vh] lg:items-center lg:py-24"
    >
      <HeroSlideshow
        images={images}
        alt="Équipe J&B SANIYAPUR — nettoyage professionnel et bionettoyage"
      />

      <Container className="relative z-10">
        <div className="max-w-xl [text-shadow:0_1px_12px_rgba(4,18,21,0.45)]">
          <p className="hero-tagline-live text-[11px] font-semibold tracking-[0.28em] text-[#e8d9cc] uppercase">
            {tagline}
          </p>
          <h1
            className="animate-fade-in-up mt-4 text-[1.85rem] font-semibold leading-[1.18] tracking-tight text-white sm:text-4xl lg:text-[2.7rem]"
            style={{ animationDelay: "90ms" }}
          >
            {title}
          </h1>
          <p
            className="animate-fade-in-up mt-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            {text}
          </p>
          <div
            className="animate-fade-in-up mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "260ms" }}
          >
            <ButtonLink href={primaryUrl} className="px-7 py-3.5">
              {primaryLabel}
            </ButtonLink>
            <ButtonLink href={secondaryUrl} variant="onDark" className="px-7 py-3.5">
              {secondaryLabel}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <a
        href="#bandeau-confiance"
        className="absolute bottom-8 right-6 z-20 hidden items-center gap-2 text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase transition hover:text-white md:flex"
      >
        Défiler
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/35 pt-1.5">
          <span className="animate-scroll-down block h-2 w-px bg-white" />
        </span>
      </a>
    </section>
  );
}
