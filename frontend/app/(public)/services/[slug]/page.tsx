import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button-link";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getService, getServices } from "@/lib/services";
import { getServiceImage, getServiceVisual } from "@/lib/service-visuals";

type Props = { params: Promise<{ slug: string }> };

function parseLines(text?: string) {
  if (!text) return [] as string[];
  return text
    .split("\n")
    .map((line) => line.trim().replace(/^[-*•]\s*/, ""))
    .filter(Boolean);
}

function parseParagraphs(text?: string) {
  return (text || "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  return {
    title: service?.name ?? "Service",
    description: service?.short_description || service?.description || undefined,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getService(slug), getServices()]);
  if (!service) notFound();

  const visual = getServiceVisual(service.slug);
  const heroImage = getServiceImage(service.slug, service.image);

  const linkedSectors = service.sector_details?.length
    ? service.sector_details
    : [];

  const prestationsList = parseLines(service.prestations);
  const avantagesList = parseLines(service.avantages);
  const descriptionParagraphs = parseParagraphs(service.description).filter(
    (para) => para !== (service.short_description || "").trim()
  );

  const otherServices = allServices.filter((item) => item.slug !== service.slug).slice(0, 5);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.name}
        description={service.short_description || visual.subtitle}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <Reveal>
            <figure className="relative isolate overflow-hidden rounded-3xl bg-[#e8eeec] shadow-xl">
              <div className="relative h-[260px] sm:h-[360px] lg:h-[440px]">
                <Image
                  src={heroImage}
                  alt={service.name}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
              <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm sm:left-6 sm:top-6">
                {visual.tag}
              </span>
            </figure>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14">
            <div>
              {descriptionParagraphs.length > 0 && (
                <div className="max-w-3xl space-y-4 text-base leading-relaxed text-[#526259] sm:text-lg">
                  {descriptionParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {prestationsList.length > 0 && (
                <section
                  className={`rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-6 shadow-xs sm:p-8 ${
                    descriptionParagraphs.length > 0 ? "mt-10" : ""
                  }`}
                >
                  <h2 className="text-xl font-extrabold text-[#16232a]">Prestations associées</h2>
                  <ul className="mt-5 grid gap-3">
                    {prestationsList.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-[#dce5df] bg-white p-3.5 text-[#3f5149]"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0f2e36]/10 text-xs font-bold text-[#0f2e36]">
                          ✓
                        </span>
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {avantagesList.length > 0 && (
                <section className="mt-6 rounded-3xl border border-[#dce5df] bg-white p-6 shadow-xs sm:p-8">
                  <h2 className="text-xl font-extrabold text-[#16232a]">Avantages</h2>
                  <ul className="mt-5 grid gap-3">
                    {avantagesList.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 rounded-xl border border-[#f0f4f1] bg-[#fcf9f7] p-3.5 text-[#3f5149]"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#a85c36]/15 text-xs font-bold text-[#a85c36]">
                          •
                        </span>
                        <span className="leading-6">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/devis">Demander un devis pour ce service</ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Tous les services
                </ButtonLink>
              </div>
            </div>

            <aside className="space-y-6">
              {linkedSectors.length > 0 && (
                <div className="rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-6 shadow-xs">
                  <h2 className="text-lg font-extrabold text-[#16232a]">Secteurs concernés</h2>
                  <ul className="mt-5 grid gap-2">
                    {linkedSectors.map((sector) => (
                      <li key={sector.slug}>
                        <Link
                          href={`/secteurs/${sector.slug}`}
                          className="flex items-center justify-between rounded-xl border border-[#dce5df] bg-white px-4 py-3 text-sm font-semibold text-[#16232a] transition hover:border-[#a85c36] hover:text-[#a85c36]"
                        >
                          <span>{sector.name}</span>
                          <span className="text-xs opacity-60">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {otherServices.length > 0 && (
                <div className="rounded-3xl border border-[#dce5df] bg-white p-6 shadow-xs">
                  <h2 className="text-lg font-extrabold text-[#16232a]">Autres domaines</h2>
                  <ul className="mt-4 grid gap-3">
                    {otherServices.map((item) => {
                      const thumb = getServiceImage(item.slug, item.image);
                      return (
                        <li key={item.slug}>
                          <Link
                            href={`/services/${item.slug}`}
                            className="group flex items-center gap-3 rounded-xl p-1.5 transition hover:bg-[#f8faf9]"
                          >
                            <span className="relative isolate size-14 shrink-0 overflow-hidden rounded-xl bg-[#e8eeec]">
                              <Image
                                src={thumb}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                                sizes="56px"
                              />
                            </span>
                            <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-[#16232a] group-hover:text-[#a85c36]">
                              {item.name}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      <ContactCtaSection title="Échangeons autour de votre projet de bionettoyage et maintenance." />
    </>
  );
}
