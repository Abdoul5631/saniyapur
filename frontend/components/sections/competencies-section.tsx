import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getServices } from "@/lib/services";

// Mapping des photos réelles et tags métier pour chaque domaine
const serviceMeta: Record<string, { image: string; tag: string; subtitle: string }> = {
  "bionettoyage-desinfection": {
    image: "/images/services/bionettoyage.jpg",
    tag: "Milieux Médicaux & Santé",
    subtitle: "Désinfection hospitalière & salles blanches",
  },
  "decapage-entretien-plateaux-techniques": {
    image: "/images/services/decapage.jpg",
    tag: "Industrie & Sols Techniques",
    subtitle: "Lustrage, autolaveuses & préservation",
  },
  "gestion-des-dechets-industriels": {
    image: "/images/services/dechets.jpg",
    tag: "Écologie & Traçabilité",
    subtitle: "Tri sélectif & conformité environnementale",
  },
  "produits-equipements-professionnels": {
    image: "/images/services/produits.jpg",
    tag: "Produits & Équipements Normés",
    subtitle: "Détergents certifiés & matériel pro",
  },
  "formation-placement-du-personnel": {
    image: "/images/services/personnel.jpg",
    tag: "Ressources & Qualification",
    subtitle: "Agents formés, discrets et encadrés",
  },
  "traitement-des-sanitaires": {
    image: "/images/services/sanitaires.jpg",
    tag: "Hygiène & Traitement",
    subtitle: "Détartrage & assainissement complet",
  },
  "hygiene-publique-environnementale": {
    image: "/images/services/environnement.jpg",
    tag: "Espaces Publics & Collectifs",
    subtitle: "Salubrité publique & espaces verts",
  },
};

export async function CompetenciesSection() {
  const services = (await getServices()).slice(0, 7);

  return (
    <section className="py-20 sm:py-28 bg-[#f8faf9] relative overflow-hidden border-b border-[#e2eae4]/60">
      <Container className="relative z-10">
        {/* En-tête de section en mode clair */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-[#dce5df]/60">
          <Reveal className="max-w-2xl">
            <span className="inline-block rounded-full bg-[#f1e4dc] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#a85c36]">
              Domaines d’Intervention
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16232a] leading-[1.15]">
              Ce que SANIYAPUR met en œuvre.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#526259]">
              Une gamme complète de prestations techniques conçues pour répondre aux normes d’hygiène les plus strictes.
            </p>
          </Reveal>

          <Reveal delayMs={100} className="hidden md:block">
            <ButtonLink href="/services" variant="secondary" className="px-6 py-3.5 shadow-xs">
              Voir tous les 7 domaines →
            </ButtonLink>
          </Reveal>
        </div>

        {/* Grille de cartes lumineuses avec photos réelles */}
        {services.length ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const meta = serviceMeta[service.slug] || {
                image: "/images/services/decapage.jpg",
                tag: "Prestation Pro",
                subtitle: "Intervention sur mesure",
              };

              return (
                <Reveal key={service.id} delayMs={index * 60}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="card-luxury group flex h-full flex-col overflow-hidden rounded-3xl border border-[#dce5df] bg-white shadow-xs transition-all duration-300 hover:border-[#a85c36] hover:shadow-xl hover:shadow-[#a85c36]/10"
                  >
                    {/* Photo d'illustration nette & lumineuse */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#16232a]">
                      <Image
                        src={meta.image}
                        alt={service.name}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                      {/* Tag sectoriel */}
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm backdrop-blur-md">
                        {meta.tag}
                      </span>

                      {/* Numéro du domaine */}
                      <span className="absolute right-4 top-4 rounded-full bg-black/40 px-2.5 py-0.5 font-mono text-[11px] font-bold text-white backdrop-blur-md">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Contenu textuel clair & structuré */}
                    <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-[#a85c36]">
                          {meta.subtitle}
                        </p>
                        <h3 className="mt-2 text-xl font-bold tracking-tight text-[#16232a] group-hover:text-[#a85c36] transition-colors">
                          {service.name}
                        </h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#526259] line-clamp-2">
                          {service.short_description}
                        </p>
                      </div>

                      {/* Pied de carte interactif */}
                      <div className="mt-6 flex items-center justify-between border-t border-[#f0f4f1] pt-4 text-xs font-bold uppercase tracking-wider text-[#a85c36]">
                        <span className="flex items-center gap-1.5">
                          <span>Découvrir les prestations</span>
                          <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                            →
                          </span>
                        </span>
                        <span className="grid size-7 place-items-center rounded-full bg-[#f1e4dc] text-[#a85c36] transition-all duration-300 group-hover:bg-[#a85c36] group-hover:text-white">
                          ↗
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <p className="mt-10 text-[#526259]">Les domaines de compétences seront publiés prochainement.</p>
        )}

        {/* Bouton mobile */}
        <div className="mt-12 md:hidden">
          <ButtonLink href="/services" variant="secondary" className="w-full justify-center py-4">
            Voir l’ensemble des 7 services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}




