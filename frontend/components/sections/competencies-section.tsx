import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ServiceSlideshow } from "@/components/ui/service-slideshow";
import { TiltCard } from "@/components/ui/tilt-card";
import { getServiceImage, getServiceVisual } from "@/lib/service-visuals";
import { resolveMediaUrl } from "@/lib/media";
import { getServices } from "@/lib/services";

export async function CompetenciesSection() {
  const services = (await getServices()).slice(0, 7);

  return (
    <section className="relative overflow-hidden border-b border-[#e2eae4]/60 bg-[#f8faf9] py-20 sm:py-28">
      <div aria-hidden className="dots-bg pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="animate-blob pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#a85c36]/10 blur-3xl" />
      <div aria-hidden className="animate-blob-alt pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#1d6fd1]/10 blur-3xl" />
      <Container className="relative z-10">
        <div className="flex flex-col gap-6 border-b border-[#dce5df]/60 pb-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold tracking-[0.18em] text-[#a85c36] uppercase">
              Domaines d’intervention
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.15] tracking-tight text-[#16232a] sm:text-4xl lg:text-5xl">
              Ce que <span className="text-[#a85c36]">SANIYAPUR</span> met en œuvre.
            </h2>
            <p className="mt-4 text-base text-[#526259] sm:text-lg">
              Prestations techniques menées par nos équipes au Burkina Faso, selon des protocoles d’hygiène exigeants.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block">
            <ButtonLink href="/services" variant="secondary" className="px-6 py-3.5 shadow-xs">
              Voir tous les domaines →
            </ButtonLink>
          </Reveal>
        </div>

        {services.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const meta = getServiceVisual(service.slug);
              const images = [
                getServiceImage(service.slug, service.image),
                ...(service.gallery ?? []).map((g) => resolveMediaUrl(g.image, "")),
              ].filter(Boolean);

              return (
                <Reveal key={service.id} delayMs={(index % 3) * 120} duration={800}>
                  <TiltCard className="h-full">
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-luxury svc-card group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce5df] bg-white shadow-xs transition-all duration-300 hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/10"
                  >
                    <div className="relative isolate aspect-16/10 w-full overflow-hidden bg-[#e8eeec]">
                      <div className="svc-img-reveal absolute inset-0" style={{ "--svc-delay": `${(index % 3) * 120 + 150}ms` } as React.CSSProperties}>
                        <ServiceSlideshow
                          images={images}
                          alt={service.name}
                          startDelayMs={index * 450}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        />
                      </div>
                      <div className="svc-shine" />
                      <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/40 via-transparent to-black/10" />
                      <span className="svc-tag absolute top-4 left-4 z-[3] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wider text-[#a85c36] uppercase shadow-sm">
                        {meta.tag}
                      </span>
                      <span className="svc-num absolute top-4 right-4 z-[3] rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                      <div>
                        <p className="text-[11px] font-bold tracking-widest text-[#a85c36] uppercase">{meta.subtitle}</p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-[#16232a] transition-colors group-hover:text-[#a85c36]">
                          {service.name}
                        </h3>
                        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-[#526259]">
                          {service.short_description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-[#f0f4f1] pt-4 text-xs font-bold tracking-wider text-[#a85c36] uppercase">
                        <span className="flex items-center gap-1.5">
                          Découvrir
                          </span>
                        <span className="svc-cta-arrow">→</span>
                      </div>
                    </div>
                    <span className="svc-bar" />
                  </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-[#526259]">Les domaines de compétences seront publiés prochainement.</p>
        )}

        <div className="mt-12 md:hidden">
          <ButtonLink href="/services" variant="secondary" className="w-full justify-center py-4">
            Voir l’ensemble des services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
