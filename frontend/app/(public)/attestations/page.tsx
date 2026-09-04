import type { Metadata } from "next";
import { AttestationsSection } from "@/components/sections/attestations-section";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { PageHero } from "@/components/ui/page-hero";
import { getAttestations } from "@/lib/attestations";

export const metadata: Metadata = {
  title: "Références & Attestations | J&B SANIYAPUR SARL",
  description:
    "Consultez les attestations de bonne exécution, certificats de conformité et références clients officiels de J&B SANIYAPUR SARL.",
};

export default async function AttestationsPage() {
  const attestations = await getAttestations();

  return (
    <>
      <PageHero
        eyebrow="Justificatifs Officiels & Références"
        title="Nos Références & Attestations de Bonne Exécution"
        description="Retrouvez les preuves numérisées de nos interventions hospitalières, hôtelières et industrielles délivrées par nos clients et partenaires."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Références & Attestations" }]}
      />

      <AttestationsSection attestations={attestations} />

      <ContactCtaSection title="Besoin d'un accompagnement certifié pour vos installations ?" />
    </>
  );
}
