import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getSectors } from "@/lib/sectors";

export async function SectorsSection() {
  const sectors = await getSectors();
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Nos secteurs d’intervention</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Des environnements aux exigences distinctes.</h2>
        </Reveal>
        {sectors.length ? (
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sectors.map((sector, index) => (
              <Reveal key={sector.id} delayMs={index * 80}>
                <Link href={`/secteurs/${sector.slug}`} className="group relative flex min-h-52 flex-col justify-end overflow-hidden rounded-2xl bg-[#16232a] p-6 text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
                  {sector.image && <div className="absolute inset-0 bg-cover bg-center opacity-40 transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${sector.image})` }} />}
                  <div className="relative">
                    <p className="text-xl font-semibold">{sector.name}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-white/70">{sector.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-[#526259]">Les secteurs d’intervention seront publiés prochainement.</p>
        )}
        <div className="mt-10"><ButtonLink href="/secteurs" variant="secondary">Découvrir nos secteurs</ButtonLink></div>
      </Container>
    </section>
  );
}
