import type { Metadata } from "next";
import Link from "next/link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getServices } from "@/lib/services";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Nos domaines de compétence"
        description="Ce que SANIYAPUR met en œuvre — chaque domaine dispose de sa propre page de détail."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Services" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {services.length ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Reveal key={service.id} delayMs={index * 60}>
                  <Link href={`/services/${service.slug}`} className="group flex h-full flex-col rounded-2xl border border-[#d6e3da] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/8">
                    {service.image ? (
                      <div className="mb-5 aspect-[16/9] overflow-hidden rounded-xl bg-[#eaf2f2] bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                    ) : (
                      <span className="grid size-11 place-items-center rounded-xl bg-[#f1e4dc] text-[#a85c36]"><ServiceIcon icon={service.icon} /></span>
                    )}
                    <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#16232a]">{service.name}</h2>
                    <p className="mt-3 flex-1 leading-7 text-[#526259]">{service.short_description}</p>
                    <span className="mt-5 text-sm font-semibold text-[#a85c36]">Voir le service →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-[#526259]">Les services seront publiés depuis l’administration.</p>
          )}
        </Container>
      </section>
      <ContactCtaSection />
    </>
  );
}
