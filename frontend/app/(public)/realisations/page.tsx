import type { Metadata } from "next";
import { RealisationsGallery } from "@/components/realisations/realisations-gallery";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export const metadata: Metadata = { title: "Réalisations" };

export default async function RealisationsPage() {
  const realisations = await getRealisations();
  const published = realisations.filter((realisation) => realisation.published);
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Les interventions de J&B SANIYAPUR"
        description="Une galerie visuelle des opérations publiées depuis l’administration."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Réalisations" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {realisationsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Mode développement : les fiches ci-dessous sont des données de test et ne représentent pas des réalisations de l’entreprise.</p>}
          {published.length ? (
            <RealisationsGallery items={published} isMock={realisationsAreMocked} />
          ) : (
            <p className="text-[#526259]">Aucune réalisation publiée pour le moment.</p>
          )}
        </Container>
      </section>
    </>
  );
}
