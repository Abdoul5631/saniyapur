import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export async function RealisationsPreviewSection() {
  const realisations = await getRealisations();
  const published = realisations.filter((realisation) => realisation.published).slice(0, 4);
  return (
    <section className="py-20 sm:py-28 bg-[#f7f8f6] border-y border-[#e2eae4]/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Nos Réalisations
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-tight">
              Un aperçu de nos interventions sur le terrain.
            </h2>
            <p className="mt-4 text-lg text-[#526259]">
              Chantiers techniques, bionettoyage et maintenance : des résultats concrets et vérifiables.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block">
            <ButtonLink href="/realisations" variant="secondary">
              Voir toutes les réalisations →
            </ButtonLink>
          </Reveal>
        </div>

        {realisationsAreMocked && (
          <p className="mt-6 text-xs text-[#8a9a92] italic">
            Note : Les fiches présentées sont des données de démonstration.
          </p>
        )}

        {published.length ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {published.map((realisation, index) => (
              <Reveal key={realisation.id} delayMs={index * 80}>
                <RealisationCard realisation={realisation} isMock={realisationsAreMocked} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-[#526259]">Aucune réalisation publiée pour le moment.</p>
        )}

        <div className="mt-10 md:hidden">
          <ButtonLink href="/realisations" variant="secondary" className="w-full justify-center">
            Voir toutes les réalisations
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

