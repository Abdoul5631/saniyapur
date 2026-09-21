import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { resolveMediaUrl } from "@/lib/media";
import { getSectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Secteurs",
  description:
    "SANIYAPUR intervient en santé, industrie, hôtellerie et commerce : des protocoles d’hygiène adaptés à chaque environnement.",
};

const sectorMeta: Record<string, { image: string; tag: string }> = {
  sante: { image: "/images/services/bionettoyage.png", tag: "Cliniques & Hôpitaux" },
  industrie: { image: "/images/services/decapage.png", tag: "Usines & Plateaux" },
  hotellerie: { image: "/images/services/hygiene-publique.png", tag: "Hôtels & Complexes" },
  commerce: { image: "/images/services/personnel.png", tag: "Bureaux & Commerces" },
};

export default async function SectorsPage() {
  const sectors = await getSectors();

  return (
    <>
      <PageHero
        eyebrow="Secteurs"
        title="Dans quels environnements SANIYAPUR intervient-il ?"
        description="Santé, industrie, hôtellerie, commerce : des contextes distincts, une même exigence d’hygiène."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Secteurs" }]}
      />

      <section className="py-16 sm:py-24 bg-[#f8faf9]">
        <Container>
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-base sm:text-lg leading-relaxed text-[#526259]">
              Chaque filière impose ses normes, ses horaires et ses zones sensibles. Cliquez sur un secteur pour voir les protocoles et services adaptés.
            </p>
          </Reveal>

          {sectors.length ? (
            <div className="grid gap-6 md:grid-cols-2">
              {sectors.map((sector, index) => {
                const meta = sectorMeta[sector.slug] || {
                  image: "/images/services/nettoyage-equipe.png",
                  tag: "Secteur Pro",
                };
                const imageSrc = sector.image ? resolveMediaUrl(sector.image, meta.image) : meta.image;

                return (
                  <Reveal key={sector.id} delayMs={index * 70}>
                    <Link
                      href={`/secteurs/${sector.slug}`}
                      className="card-luxury group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-[#091f24] p-7 text-white shadow-lg"
                    >
                      <div className="absolute inset-0 z-0 overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={sector.name}
                          fill
                          unoptimized
                          sizes="(min-width: 768px) 50vw, 100vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 z-[1] bg-linear-to-t from-[#041215]/80 via-[#041215]/25 to-black/10" />

                      <div className="relative z-10">
                        <span className="inline-block rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm">
                          {meta.tag}
                        </span>
                        <h2 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight">
                          {sector.name}
                        </h2>
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/80">
                          {sector.description}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#e8d9cc]">
                          Découvrir le secteur
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                        </span>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <p className="py-16 text-center text-[#526259]">
              Les secteurs d’intervention seront bientôt présentés ici.
            </p>
          )}
        </Container>
      </section>

      <ContactCtaSection />
    </>
  );
}
