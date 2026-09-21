import type { Metadata } from "next";
import { RealisationsGallery } from "@/components/realisations/realisations-gallery";
import { AttestationsSection } from "@/components/sections/attestations-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getAttestations } from "@/lib/attestations";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export const metadata: Metadata = {
  title: "Réalisations & Attestations",
  description:
    "Chantiers et interventions de J&B SANIYAPUR SARL, avec attestations de bonne exécution lorsqu’elles sont publiées.",
};

export default async function RealisationsPage() {
  const [realisations, attestations] = await Promise.all([getRealisations(), getAttestations()]);

  const published = realisations.filter((item) => item.published);

  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos interventions sur le terrain"
        description="Chantiers, bionettoyage et maintenance — des dossiers publiés, avec attestations de bonne exécution lorsqu’elles sont disponibles."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-[#a85c36]">
              Chantiers
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
              Ce que les équipes mettent en œuvre
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#526259] sm:text-lg">
              Photos de chantiers et attestations de bonne exécution, telles qu’elles sont publiées.
            </p>
          </Reveal>

          {realisationsAreMocked && (
            <p className="mt-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">
              Mode démonstration : les fiches ci-dessous sont des exemples de test, pas des chantiers SANIYAPUR.
            </p>
          )}

          {published.length > 0 ? (
            <div className="mt-10">
              <RealisationsGallery items={published} isMock={realisationsAreMocked} />
            </div>
          ) : (
            <p className="mt-12 text-[#526259]">Aucune réalisation publiée pour le moment.</p>
          )}
        </Container>
      </section>

      {attestations.length > 0 && <AttestationsSection attestations={attestations} />}

      <ContactCtaSection title="Un chantier similaire à lancer sur votre site ?" />
    </>
  );
}
