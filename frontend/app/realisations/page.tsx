import type { Metadata } from "next";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";
export const metadata: Metadata = { title: "Réalisations | J&B SANIYAPUR SARL" };
export default async function RealisationsPage() {
  const realisations = await getRealisations();
  const published = realisations.filter((realisation) => realisation.published);
  return (
    <>
      <CorporateHeader />
      <main>
        <section className="bg-[#0f2e36] py-20 text-white sm:py-28">
          <Container>
            <p className="animate-fade-in-up text-sm font-bold uppercase tracking-[.18em] text-[#e8d9cc]">Réalisations</p>
            <h1 className="animate-fade-in-up mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl [animation-delay:100ms]">Les interventions de J&amp;B SANIYAPUR.</h1>
          </Container>
        </section>
        <section className="py-16 sm:py-24">
          <Container>
            {realisationsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Mode développement : les fiches ci-dessous sont des données de test et ne représentent pas des réalisations de l’entreprise.</p>}
            {published.length ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {published.map((realisation, index) => <Reveal key={realisation.id} delayMs={index * 80}><RealisationCard realisation={realisation} isMock={realisationsAreMocked} /></Reveal>)}
              </div>
            ) : <p className="text-[#526259]">Aucune réalisation publiée pour le moment.</p>}
          </Container>
        </section>
      </main>
      <CorporateFooter />
    </>
  );
}
