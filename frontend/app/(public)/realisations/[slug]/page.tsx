import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/realisations/before-after";
import { getRealisationCover, RealisationCard } from "@/components/realisations/realisation-card";
import { RealisationGallery } from "@/components/realisations/realisation-gallery";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { resolveMediaUrl } from "@/lib/media";
import { getRealisation, getRealisations, realisationsAreMocked } from "@/lib/realisations";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const realisation = await getRealisation(slug);
  return {
    title: realisation?.title ?? "Réalisation",
    description: realisation?.description || undefined,
  };
}

export default async function RealisationDetailPage({ params }: Props) {
  const { slug } = await params;
  const [realisation, all] = await Promise.all([getRealisation(slug), getRealisations()]);
  if (!realisation || !realisation.published) notFound();

  const cover = getRealisationCover(realisation);
  const coverSrc = cover?.image ? resolveMediaUrl(cover.image, "") : "";
  const othersSameClient = realisation.client
    ? all.filter(
        (item) =>
          item.published &&
          item.id !== realisation.id &&
          item.client?.trim().toLowerCase() === realisation.client.trim().toLowerCase(),
      )
    : [];
  const others = [
    ...othersSameClient,
    ...all.filter(
      (item) => item.published && item.id !== realisation.id && !othersSameClient.some((same) => same.id === item.id),
    ),
  ].slice(0, 4);

  const serviceNames =
    realisation.services?.length
      ? realisation.services
      : realisation.service
        ? [realisation.service]
        : [];

  const facts = [
    realisation.client ? ["Client", realisation.client] : null,
    realisation.location ? ["Localisation", realisation.location] : null,
    realisation.sector ? ["Secteur", realisation.sector] : null,
    serviceNames.length ? ["Services réalisés", serviceNames.join(", ")] : null,
    realisation.date
      ? [
          "Date",
          new Date(realisation.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long" }),
        ]
      : null,
  ].filter((row): row is [string, string] => Boolean(row));

  return (
    <>
      <PageHero
        eyebrow={realisation.sector}
        title={realisation.title}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Réalisations", href: "/realisations" },
          { label: realisation.title },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          {realisationsAreMocked && (
            <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">
              Données de test — cette fiche ne représente pas une réalisation de J&B SANIYAPUR SARL.
            </p>
          )}

          {coverSrc ? (
            <Reveal>
              <figure className="relative isolate overflow-hidden rounded-3xl bg-[#e8eeec] shadow-xl">
                <div className="relative h-[260px] sm:h-[380px] lg:h-[460px]">
                  <Image
                    src={coverSrc}
                    alt={cover?.caption || realisation.title}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                  />
                </div>
                <span className="absolute left-4 top-4 z-[1] rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#a85c36] shadow-sm sm:left-6 sm:top-6">
                  {realisation.sector}
                </span>
              </figure>
            </Reveal>
          ) : null}

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-14">
            <div>
              {realisation.description ? (
                <p className="max-w-3xl text-base leading-relaxed text-[#526259] sm:text-lg">
                  {realisation.description}
                </p>
              ) : null}

              <div className={`grid gap-12 ${realisation.description ? "mt-12" : ""}`}>
                <BeforeAfter images={realisation.images} />
                <RealisationGallery images={realisation.images} />
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href="/devis">Demander un devis</ButtonLink>
                <ButtonLink href="/realisations" variant="secondary">
                  Toutes les réalisations
                </ButtonLink>
              </div>
            </div>

            {facts.length > 0 ? (
              <aside className="rounded-3xl border border-[#dce5df] bg-[#f8faf9] p-6 shadow-xs sm:p-8">
                <h2 className="text-lg font-extrabold text-[#16232a]">Informations</h2>
                <dl className="mt-5 grid gap-4 text-sm">
                  {facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[#526259]">{label}</dt>
                      <dd className="mt-1 font-medium text-[#16232a]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href="/realisations" className="mt-6 inline-block text-sm font-semibold text-[#a85c36] hover:underline">
                  ← Toutes les réalisations
                </Link>
              </aside>
            ) : null}
          </div>

          {others.length > 0 && (
            <div className="mt-16 border-t border-[#dce5df] pt-12">
              <h2 className="text-xl font-extrabold text-[#16232a]">
                {othersSameClient.length > 0 && realisation.client
                  ? `Autres interventions chez ${realisation.client}`
                  : "Autres interventions"}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item) => (
                  <RealisationCard key={item.id} realisation={item} isMock={realisationsAreMocked} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      <ContactCtaSection title="Un chantier similaire à lancer sur votre site ?" />
    </>
  );
}
