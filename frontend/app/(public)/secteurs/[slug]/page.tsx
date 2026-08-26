import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
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
  const [sector, services, realisations] = await Promise.all([getSector(slug), getServices(), getRealisations()]);
  if (!sector) notFound();
  const related = realisations.filter((item) => item.published && item.sector === sector.name).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Secteur"
        title={sector.name}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Secteurs", href: "/secteurs" }, { label: sector.name }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              {sector.image && (
                <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eaf2f2]">
                  <Image src={sector.image} alt="" fill className="object-cover" sizes="(min-width: 1024px) 55vw, 100vw" />
                </div>
              )}
              <h2 className="text-xl font-semibold text-[#16232a]">Présentation</h2>
              <p className="mt-4 text-lg leading-8 text-[#526259]">{sector.description || "La présentation détaillée de ce secteur sera publiée depuis l’administration."}</p>
              <section className="mt-10 border-t border-[#dce5df] pt-8">
                <h2 className="text-xl font-semibold text-[#16232a]">Besoins spécifiques</h2>
                <p className="mt-3 leading-7 text-[#526259]">Les besoins propres à ce type d’environnement seront précisés depuis l’administration.</p>
              </section>
            </div>
            <aside className="h-fit rounded-2xl bg-[#f1f6f6] p-6">
              <h2 className="text-lg font-semibold text-[#16232a]">Services SANIYAPUR</h2>
              <p className="mt-3 text-sm leading-6 text-[#526259]">Domaines de compétence de l’entreprise. L’association précise à ce secteur se gère depuis l’administration.</p>
              <ul className="mt-5 grid gap-2 text-sm">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="font-medium text-[#a85c36] hover:underline">{service.name}</Link>
                  </li>
                ))}
              </ul>
              <ButtonLink href="/devis" className="mt-8 w-full">Demander un devis</ButtonLink>
            </aside>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold tracking-tight text-[#16232a]">Réalisations liées</h2>
            {related.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((realisation) => <RealisationCard key={realisation.id} realisation={realisation} isMock={realisationsAreMocked} />)}
              </div>
            ) : (
              <p className="mt-4 text-[#526259]">Aucune réalisation publiée pour ce secteur pour le moment.</p>
            )}
          </div>
        </Container>
      </section>
      <ContactCtaSection />
    </>
  );
}
