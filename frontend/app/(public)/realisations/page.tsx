import type { Metadata } from "next";
import { RealisationsGallery } from "@/components/realisations/realisations-gallery";
import { AttestationsSection } from "@/components/sections/attestations-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getAttestations } from "@/lib/attestations";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export const metadata: Metadata = {
  title: "Réalisations & Attestations | J&B SANIYAPUR SARL",
  description:
    "Galerie visuelle de nos chantiers, interventions de bionettoyage hospitalier, attestations de bonne exécution et références clients officielles.",
};

export default async function RealisationsPage() {
  const [realisations, attestations] = await Promise.all([
    getRealisations(),
    getAttestations(),
  ]);

  const publishedRealisations = realisations.filter((item) => item.published);

  return (
    <>
      <PageHero
        eyebrow="Réalisations & Preuves d'Excellence"
        title="Interventions & Attestations Officielles"
        description="Une galerie complète de nos chantiers sur le terrain accompagnée de nos attestations de bonne exécution et références certifiées."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Réalisations & Attestations" }]}
      />

      <section className="py-16 sm:py-20">
        <Container>
          {realisationsAreMocked && (
            <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">
              Mode démonstration : certaines fiches ci-dessous sont des exemples de test.
            </p>
          )}

          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-[#16232a] sm:text-3xl">
              Interventions & Chantiers sur le terrain
            </h2>
            <p className="mt-1 text-sm text-[#526259]">
              Découvrez en images nos opérations de bionettoyage, décapage et désinfection.
            </p>
          </div>

          {publishedRealisations.length ? (
            <RealisationsGallery items={publishedRealisations} isMock={realisationsAreMocked} />
          ) : (
            <p className="text-[#526259]">Aucune réalisation publiée pour le moment.</p>
          )}
        </Container>
      </section>

      {/* Section Officielle Attestations & Références Clients */}
      {attestations.length > 0 && <AttestationsSection attestations={attestations} />}
    </>
  );
}
