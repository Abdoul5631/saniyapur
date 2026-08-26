import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const image = "/images/hero-industrial-cleaning.jpg";

export function CorporateHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0f2e36] py-20 text-white sm:py-28 lg:min-h-[640px] lg:py-36">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image src={image} alt="Intervention de nettoyage professionnel dans un environnement de travail" fill priority sizes="100vw" className="hero-zoom object-cover object-center opacity-45" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,34,28,.98)_0%,rgba(13,54,43,.9)_43%,rgba(13,54,43,.25)_100%)]" />
      <Container>
        <div className="max-w-3xl">
          <p className="mb-5 animate-fade-in-up text-sm font-bold uppercase tracking-[.2em] text-[#e8d9cc]">J&B SANIYAPUR SARL</p>
          <p className="mb-6 inline-flex animate-fade-in-up rounded-full border border-white/20 bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-[#f1e4dc] [animation-delay:100ms]">« PROPRETÉ SUR ORDONNANCE »</p>
          <h1 className="animate-fade-in-up text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl [animation-delay:200ms]">La propreté et l’hygiène qui protègent, la qualité qui rassure.</h1>
          <div className="mt-10 flex animate-fade-in-up flex-col gap-3 sm:flex-row [animation-delay:400ms]">
            <ButtonLink href="/services">Découvrir nos services</ButtonLink>
            <ButtonLink href="/devis" variant="onDark">Demander un devis</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
