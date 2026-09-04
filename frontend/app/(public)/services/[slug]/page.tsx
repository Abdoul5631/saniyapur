import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getSectors } from "@/lib/sectors";
import { getService } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return { title: service?.name ?? "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, allSectors] = await Promise.all([getService(slug), getSectors()]);
  if (!service) notFound();

  // Déterminer les secteurs concernés liés spécifiquement ou l'ensemble des secteurs disponibles
  const linkedSectors = (service.sector_details && service.sector_details.length > 0)
    ? service.sector_details
    : service.sectors && service.sectors.length > 0
    ? allSectors.filter((s) => service.sectors?.includes(s.id))
    : allSectors;

  const prestationsList = service.prestations
    ? service.prestations.split("\n").map((line) => line.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
    : [];

  const avantagesList = service.avantages
    ? service.avantages.split("\n").map((line) => line.trim().replace(/^[-*•]\s*/, "")).filter(Boolean)
    : [];

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Services", href: "/services" }, { label: service.name }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
            <div>
              {service.image && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eaf2f2]">
                  <Image src={service.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
              )}
              <p className="text-lg leading-8 text-[#526259]">{service.description}</p>

              <section className="mt-10 border-t border-[#dce5df] pt-8">
                <h2 className="text-xl font-semibold text-[#16232a]">Prestations associées</h2>
                {prestationsList.length > 0 ? (
                  <ul className="mt-4 grid gap-3">
                    {prestationsList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#3f5149]">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0f2e36]/10 text-xs font-bold text-[#0f2e36]">✓</span>
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-7 text-[#526259]">
                    Le détail des prestations sur mesure associées à ce domaine peut être personnalisé lors de l’étude de vos besoins.
                  </p>
                )}
              </section>

              <section className="mt-10 border-t border-[#dce5df] pt-8">
                <h2 className="text-xl font-semibold text-[#16232a]">Avantages</h2>
                {avantagesList.length > 0 ? (
                  <ul className="mt-4 grid gap-3">
                    {avantagesList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[#3f5149]">
                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a85c36]/15 text-xs font-bold text-[#a85c36]">★</span>
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 leading-7 text-[#526259]">
                    Protocoles rigoureux, personnel formé, matériel professionnel certifié et traçabilité continue.
                  </p>
                )}
              </section>

              <div className="mt-10"><ButtonLink href="/devis">Demander un devis</ButtonLink></div>
            </div>

            <aside className="h-fit rounded-2xl bg-[#f1f6f6] p-6">
              <h2 className="text-lg font-semibold text-[#16232a]">Secteurs concernés</h2>
              <p className="mt-3 text-sm leading-6 text-[#526259]">
                {service.sector_details?.length || service.sectors?.length
                  ? "Secteurs d’intervention privilégiés pour cette prestation :"
                  : "Les environnements d’intervention adaptés aux prestations de SANIYAPUR :"}
              </p>
              <ul className="mt-5 grid gap-2">
                {linkedSectors.map((sector) => (
                  <li key={sector.slug}>
                    <ButtonLink href={`/secteurs/${sector.slug}`} variant="secondary" className="w-full justify-between flex items-center">
                      <span>{sector.name}</span>
                      <span className="text-xs opacity-60">→</span>
                    </ButtonLink>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>
      <ContactCtaSection />
    </>
  );
}
