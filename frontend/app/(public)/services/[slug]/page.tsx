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
  const [service, sectors] = await Promise.all([getService(slug), getSectors()]);
  if (!service) notFound();

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
                <p className="mt-3 leading-7 text-[#526259]">Le détail des prestations associées à ce domaine sera précisé depuis l’administration.</p>
              </section>
              <section className="mt-10 border-t border-[#dce5df] pt-8">
                <h2 className="text-xl font-semibold text-[#16232a]">Avantages</h2>
                <p className="mt-3 leading-7 text-[#526259]">Les avantages spécifiques de cette prestation seront publiés depuis l’administration.</p>
              </section>
              <div className="mt-10"><ButtonLink href="/devis">Demander un devis</ButtonLink></div>
            </div>
            <aside className="h-fit rounded-2xl bg-[#f1f6f6] p-6">
              <h2 className="text-lg font-semibold text-[#16232a]">Secteurs concernés</h2>
              <p className="mt-3 text-sm leading-6 text-[#526259]">Les environnements d’intervention de SANIYAPUR. Le rattachement précis de ce service à un secteur se gère depuis l’administration.</p>
              <ul className="mt-5 grid gap-2">
                {sectors.map((sector) => (
                  <li key={sector.slug}><ButtonLink href={`/secteurs/${sector.slug}`} variant="secondary" className="w-full">{sector.name}</ButtonLink></li>
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
