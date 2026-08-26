import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export async function RealisationsPreviewSection() {
  const realisations = await getRealisations();
  const published = realisations.filter((realisation) => realisation.published).slice(0, 4);
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Quelques réalisations</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Un aperçu de nos interventions.</h2>
        </Reveal>
        {realisationsAreMocked && <p className="mt-6 text-sm text-[#526259]">Les contenus affichés sont des données de test, en attente de connexion à l’API.</p>}
        {published.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {published.map((realisation, index) => (
              <Reveal key={realisation.id} delayMs={index * 80}>
                <RealisationCard realisation={realisation} isMock={realisationsAreMocked} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[#526259]">Aucune réalisation publiée pour le moment.</p>
        )}
        <div className="mt-10"><ButtonLink href="/realisations" variant="secondary">Voir toutes nos réalisations</ButtonLink></div>
      </Container>
    </section>
  );
}
