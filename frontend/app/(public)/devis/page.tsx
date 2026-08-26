import type { Metadata } from "next";
import { QuoteForm } from "@/components/forms/quote-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getSectors } from "@/lib/sectors";
import { getServices } from "@/lib/services";

export const metadata: Metadata = { title: "Demander un devis" };

export default async function QuotePage() {
  const [services, sectors] = await Promise.all([getServices(), getSectors()]);
  return (
    <>
      <PageHero
        eyebrow="Devis"
        title="Demander un devis"
        description="Décrivez votre besoin. La demande est transmise à l’équipe et apparaît dans l’administration."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Demander un devis" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <QuoteForm
              services={services.map((service) => ({ name: service.name, slug: service.slug }))}
              sectors={sectors.map((sector) => ({ name: sector.name, slug: sector.slug }))}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
