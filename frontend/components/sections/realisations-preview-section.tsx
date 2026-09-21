import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { RealisationCard } from "@/components/realisations/realisation-card";
import { getRealisations, realisationsAreMocked } from "@/lib/realisations";

export async function RealisationsPreviewSection() {
  const realisations = await getRealisations();
  const published = realisations.filter((realisation) => realisation.published).slice(0, 3);
  if (!published.length) return null;

  return (
    <section className="border-y border-[#e2eae4]/60 bg-[#f7f8f6] py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Réalisations
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#16232a] sm:text-4xl">
              Un aperçu de nos interventions
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#526259] sm:text-lg">
              Chantiers publiés : photos et dossiers tels qu’ils sont renseignés.
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
            Les fiches présentées sont des données de démonstration.
          </p>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {published.map((realisation, index) => (
            <Reveal key={realisation.id} delayMs={index * 80}>
              <RealisationCard realisation={realisation} isMock={realisationsAreMocked} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <ButtonLink href="/realisations" variant="secondary" className="w-full justify-center">
            Voir toutes les réalisations
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
