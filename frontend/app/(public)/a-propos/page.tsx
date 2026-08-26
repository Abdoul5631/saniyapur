import type { Metadata } from "next";
import { aboutIntro, aboutSections } from "@/data/about-content";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "À propos" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="J&B SANIYAPUR SARL"
        description="L’entreprise, son exigence et son ancrage professionnel — sans dupliquer le reste du site."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "À propos" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">{aboutIntro.title}</p>
            {aboutIntro.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-lg leading-8 text-[#526259]">{paragraph}</p>
            ))}
          </Reveal>
          <div className="mt-16 grid gap-12">
            {aboutSections.map((section, index) => (
              <Reveal key={section.id} delayMs={index * 40} className="max-w-3xl border-t border-[#dce5df] pt-10">
                <h2 className="text-2xl font-semibold tracking-tight text-[#16232a]">{section.title}</h2>
                {section.pending && <p className="mt-3 text-xs font-semibold uppercase tracking-[.14em] text-[#a85c36]">Contenu à renseigner depuis l’administration</p>}
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mt-4 leading-7 text-[#526259]">{paragraph}</p>
                ))}
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <ContactCtaSection title="Échangeons autour de votre projet." />
    </>
  );
}
