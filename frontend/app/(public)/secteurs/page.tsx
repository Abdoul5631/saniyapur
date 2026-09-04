import type { Metadata } from "next";
import Link from "next/link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getSectors } from "@/lib/sectors";

export const metadata: Metadata = { title: "Secteurs" };

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
      <section className="py-16 sm:py-20">
        <Container>
          {sectors.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {sectors.map((sector, index) => (
                <Reveal key={sector.id} delayMs={index * 80}>
                  <Link href={`/secteurs/${sector.slug}`} className="group relative flex min-h-64 flex-col justify-end overflow-hidden rounded-2xl bg-[#16232a] p-7 text-white transition hover:-translate-y-1 hover:shadow-xl">
                    {sector.image && <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${sector.image})` }} />}
                    <div className="relative">
                      <h2 className="text-2xl font-semibold">{sector.name}</h2>
                      <p className="mt-3 text-white/75">{sector.description}</p>
                      <span className="mt-5 inline-block text-sm font-semibold text-[#e8d9cc]">Découvrir le secteur →</span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-[#526259]">Les secteurs d’intervention seront bientôt présentés ici.</p>
          )}
        </Container>
      </section>
      <ContactCtaSection />
    </>
  );
}
