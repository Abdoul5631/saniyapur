import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getServiceImage, getServiceVisual } from "@/lib/service-visuals";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Domaines d’intervention de J&B SANIYAPUR SARL : bionettoyage, décapage, gestion des déchets, hygiène publique, sanitaires, formation et produits professionnels.",
};

export default async function ServicesPage() {
  const services = await getServices();
  const [featured, ...others] = services;

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Nos domaines de compétence"
        description="Ce que SANIYAPUR met en œuvre — bionettoyage, maintenance et hygiène professionnelle pour des environnements sains et conformes."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
              Prestations
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
              Des protocoles adaptés à chaque terrain
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#526259] sm:text-lg">
              Chaque domaine dispose de ses propres protocoles, équipements et équipes spécialisées.
              Découvrez le détail des prestations depuis chaque fiche.
            </p>
          </Reveal>

          {featured ? (
            <Reveal className="mt-10">
              <FeaturedServiceCard service={featured} />
            </Reveal>
          ) : (
            <div className="mt-16 py-16 text-center">
              <p className="text-[#526259]">Nos services et domaines d’intervention seront bientôt disponibles.</p>
            </div>
          )}

          {others.length > 0 && (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {others.map((service, index) => (
                <Reveal key={service.id} delayMs={Math.min(index * 50, 200)}>
                  <ServiceCard service={service} index={index + 2} />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-5 rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-7 sm:flex-row sm:items-center sm:p-8">
              <div>
                <p className="font-bold text-[#16232a]">Un besoin précis sur un site ?</p>
                <p className="mt-1 text-sm text-[#526259]">
                  Décrivez votre établissement : nous proposons une étude adaptée.
                </p>
              </div>
              <ButtonLink href="/devis" className="shrink-0">
                Demander une étude
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactCtaSection title="Échangeons autour de votre projet de bionettoyage et maintenance." />
    </>
  );
}

function FeaturedServiceCard({
  service,
}: {
  service: Awaited<ReturnType<typeof getServices>>[number];
}) {
  const visual = getServiceVisual(service.slug);
  const imageSrc = getServiceImage(service.slug, service.image);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-luxury group relative isolate flex min-h-[320px] flex-col justify-end overflow-hidden rounded-3xl bg-[#e8eeec] shadow-lg sm:min-h-[400px] lg:min-h-[460px]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={service.name}
          fill
          unoptimized
          priority
          sizes="100vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-linear-to-t from-[#041215]/80 via-[#041215]/25 to-black/5" />

      <div className="relative z-10 max-w-3xl p-6 sm:p-8 lg:p-10">
        <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm">
          {visual.tag}
        </span>
        <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
          {service.name}
        </h3>
        {service.short_description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            {service.short_description}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white">
          Découvrir les prestations
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Awaited<ReturnType<typeof getServices>>[number];
  index: number;
}) {
  const visual = getServiceVisual(service.slug);
  const imageSrc = getServiceImage(service.slug, service.image);

  return (
    <Link
      href={`/services/${service.slug}`}
      className="card-luxury group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce5df] bg-white shadow-xs hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/10"
    >
      <div className="relative isolate aspect-[16/10] overflow-hidden bg-[#e8eeec]">
        <Image
          src={imageSrc}
          alt={service.name}
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="z-0 object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 z-[1] bg-linear-to-t from-black/30 via-transparent to-black/5" />
        <span className="absolute top-4 left-4 z-[2] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold tracking-wider text-[#a85c36] uppercase shadow-sm">
          {visual.tag}
        </span>
        <span className="absolute top-4 right-4 z-[2] font-mono text-[11px] font-bold text-white/90">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[11px] font-bold tracking-widest text-[#a85c36] uppercase">{visual.subtitle}</p>
        <h3 className="mt-2 text-xl font-extrabold tracking-tight text-[#16232a] transition-colors group-hover:text-[#a85c36]">
          {service.name}
        </h3>
        {service.short_description ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[#526259] line-clamp-3">
            {service.short_description}
          </p>
        ) : null}
        <div className="mt-5 flex items-center justify-between border-t border-[#f0f4f1] pt-4">
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#a85c36]">
            Voir la fiche
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
