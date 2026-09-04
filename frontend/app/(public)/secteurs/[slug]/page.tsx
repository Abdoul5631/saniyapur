import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { resolveMediaUrl } from "@/lib/media";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";
import { getSector } from "@/lib/sectors";
import { getServices } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const sector = await getSector(slug);
  return { title: sector?.name ?? "Secteur" };
}

export default async function SectorDetailPage({ params }: Props) {
  const { slug } = await params;
  const [sector, services, realisations] = await Promise.all([
    getSector(slug),
    getServices(),
    getRealisations(),
  ]);
  if (!sector) notFound();

  const relatedRealisations = realisations.filter(
    (item) => item.published && item.sector === sector.name
  ).slice(0, 3);

  // Filtrer les services liés à ce secteur ou lister l'ensemble des services disponibles
  const associatedServices = services.filter((s) => {
    if (s.sectors && sector.id) return s.sectors.includes(sector.id);
    if (s.sector_details && sector.id) return s.sector_details.some((sd) => sd.id === sector.id);
    return true;
  });

  const displayServices = associatedServices.length > 0 ? associatedServices : services;

  // Parser les besoins spécifiques si renseignés
  const parseBesoins = (text?: string) => {
    if (!text) return [];
    return text
      .split("\n")
      .map((l) => l.trim().replace(/^[-•*]\s*/, ""))
      .filter(Boolean);
  };

  const besoinsList = parseBesoins(sector.besoins_specifiques);

  return (
    <>
      <PageHero
        eyebrow="Secteur d'activité"
        title={sector.name}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Secteurs", href: "/secteurs" },
          { label: sector.name },
        ]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              {sector.image && (
                <div className="relative mb-8 aspect-16/9 overflow-hidden rounded-2xl bg-[#eaf2f2]">
                  <Image
                    src={resolveMediaUrl(sector.image)}
                    alt={sector.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 55vw, 100vw"
                  />
                </div>
              )}

              <h2 className="text-xl font-semibold text-[#16232a]">Présentation du secteur</h2>
              <div className="mt-4 space-y-3 text-lg leading-8 text-[#526259]">
                {sector.description
                  ? sector.description.split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)
                  : <p>Interventions spécialisées adaptées aux normes et contraintes spécifiques de ce secteur.</p>}
              </div>

              {besoinsList.length > 0 ? (
                <section className="mt-10 border-t border-[#dce5df] pt-8">
                  <h2 className="text-xl font-semibold text-[#16232a]">Besoins spécifiques & Exigences</h2>
                  <ul className="mt-4 grid gap-3">
                    {besoinsList.map((besoin, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#3f5149]">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a85c36]/15 text-xs font-bold text-[#a85c36]">
                          ✓
                        </span>
                        <span className="leading-6">{besoin}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : (
                <section className="mt-10 border-t border-[#dce5df] pt-8">
                  <h2 className="text-xl font-semibold text-[#16232a]">Besoins spécifiques</h2>
                  <p className="mt-3 leading-7 text-[#526259]">
                    Protocoles d’hygiène renforcés, traçabilité des opérations et respect strict des réglementations en vigueur.
                  </p>
                </section>
              )}
            </div>

            <aside className="h-fit rounded-2xl bg-[#f1f6f6] p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-[#16232a]">Services adaptés</h2>
              <p className="mt-2 text-sm leading-6 text-[#526259]">
                Prestations recommandées pour les environnements de type {sector.name} :
              </p>
              <ul className="mt-5 grid gap-2.5 text-sm">
                {displayServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="flex items-center justify-between rounded-xl bg-white px-4 py-3 font-medium text-[#16232a] shadow-2xs transition hover:text-[#a85c36] hover:shadow-xs"
                    >
                      <span>{service.name}</span>
                      <span className="text-xs text-[#a85c36]">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/devis" className="mt-8 w-full justify-center">
                Demander un devis pour ce secteur
              </ButtonLink>
            </aside>
          </div>

          <div className="mt-16 border-t border-[#dce5df] pt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-[#16232a]">Réalisations associées</h2>
            {relatedRealisations.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {relatedRealisations.map((realisation) => (
                  <RealisationCard
                    key={realisation.id}
                    realisation={realisation}
                    isMock={realisationsAreMocked}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-[#526259]">
                Découvrez prochainement nos réalisations et retours d'expérience dans ce secteur.
              </p>
            )}
          </div>
        </Container>
      </section>
      <ContactCtaSection />
    </>
  );
}
