import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { resolveMediaUrl } from "@/lib/media";
import { getSectors } from "@/lib/sectors";

// Visuels dédiés et badges par secteur d'intervention
const sectorMeta: Record<string, { image: string; tag: string }> = {
  sante: { image: "/images/services/bionettoyage.jpg", tag: "Cliniques & Hôpitaux" },
  industrie: { image: "/images/services/decapage.jpg", tag: "Usines & Plateaux" },
  hotellerie: { image: "/images/services/sanitaires.jpg", tag: "Hôtels & Complexes" },
  commerce: { image: "/images/services/personnel.jpg", tag: "Bureaux & Commerces" },
};

export async function SectorsSection() {
  const sectors = await getSectors();
  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#e2eae4]/60">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#dce5df]/60">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Environnements d’Intervention
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-tight">
              Des secteurs aux exigences distinctes.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#526259]">
              Santé, industrie, hôtellerie, commerce : une maîtrise complète des protocoles propres à chaque filière.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block">
            <ButtonLink href="/secteurs" variant="secondary" className="px-6 py-3.5 shadow-xs">
              Explorer tous les secteurs →
            </ButtonLink>
          </Reveal>
        </div>

        {sectors.length ? (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => {
              const meta = sectorMeta[sector.slug] || {
                image: "/images/services/bionettoyage.jpg",
                tag: "Secteur Pro",
              };
              const imageSrc = sector.image ? resolveMediaUrl(sector.image) : meta.image;

              return (
                <Reveal key={sector.id} delayMs={index * 80}>
                  <Link
                    href={`/secteurs/${sector.slug}`}
                    className="card-luxury group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-3xl bg-[#091f24] p-8 text-white shadow-xl transition-all duration-500 hover:shadow-2xl border border-[#dce5df] hover:border-[#a85c36]"
                  >
                    {/* Photo réelle avec haute visibilité & zoom fluide */}
                    <div className="absolute inset-0 -z-20 overflow-hidden bg-[#07181c]">
                      <Image
                        src={imageSrc}
                        alt={sector.name}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center opacity-85 transition-transform duration-700 ease-out group-hover:scale-110 group-hover:opacity-95"
                      />
                    </div>

                    {/* Gradient léger pour garder la photo bien claire et le texte lisible */}
                    <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#041215]/95 via-[#041215]/40 to-black/25" />

                    {/* Haut : Badge sectoriel */}
                    <div>
                      <span className="inline-block rounded-full bg-white/95 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#a85c36] shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                        {meta.tag}
                      </span>
                    </div>

                    {/* Bas : Titre & description */}
                    <div className="relative z-10">
                      <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white group-hover:text-[#e8d9cc] transition-colors">
                        {sector.name}
                      </h3>
                      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/90 font-normal">
                        {sector.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 text-xs font-bold uppercase tracking-wider text-[#e8d9cc]">
                        <span>Explorer le secteur</span>
                        <span className="grid size-7 place-items-center rounded-full bg-white/15 text-white transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#a85c36]">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-[#526259]">Les secteurs d’intervention seront publiés prochainement.</p>
        )}

        <div className="mt-10 md:hidden">
          <ButtonLink href="/secteurs" variant="secondary" className="w-full justify-center py-4">
            Explorer tous les secteurs
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
