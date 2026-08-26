import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/realisations/before-after";
import { RealisationGallery } from "@/components/realisations/realisation-gallery";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getRealisation, realisationsAreMocked } from "@/lib/realisations";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const realisation = await getRealisation(slug);
  return { title: realisation?.title ?? "Réalisation" };
}

export default async function RealisationDetailPage({ params }: Props) {
  const { slug } = await params;
  const realisation = await getRealisation(slug);
  if (!realisation || !realisation.published) notFound();
  const main = realisation.images.find((image) => image.type === "main") ?? [...realisation.images].sort((a, b) => a.order - b.order)[0];

  return (
    <>
      <PageHero
        eyebrow={realisation.sector}
        title={realisation.title}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Réalisations", href: "/realisations" }, { label: realisation.title }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {realisationsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — cette fiche ne représente pas une réalisation de J&B SANIYAPUR SARL.</p>}
          <div className="grid gap-12 lg:grid-cols-[1fr_.45fr]">
            <Reveal>
              {main && <div className="mb-8 aspect-[16/9] overflow-hidden rounded-2xl bg-[#eaf2f2] bg-cover bg-center" style={{ backgroundImage: `url(${main.image})` }} />}
              <p className="text-lg leading-8 text-[#526259]">{realisation.description}</p>
              <div className="mt-12 grid gap-12">
                <BeforeAfter images={realisation.images} />
                <RealisationGallery images={realisation.images} />
              </div>
              <ButtonLink href="/devis" className="mt-10">Demander un devis</ButtonLink>
            </Reveal>
            <Reveal delayMs={100}>
              <aside className="rounded-2xl bg-[#f1f6f6] p-6">
                <h2 className="text-lg font-semibold text-[#16232a]">Informations</h2>
                <dl className="mt-5 grid gap-4 text-sm">
                  <div><dt className="text-[#526259]">Client</dt><dd className="mt-1 font-medium text-[#16232a]">{realisation.client || "—"}</dd></div>
                  <div><dt className="text-[#526259]">Localisation</dt><dd className="mt-1 font-medium text-[#16232a]">{realisation.location || "—"}</dd></div>
                  <div><dt className="text-[#526259]">Secteur</dt><dd className="mt-1 font-medium text-[#16232a]">{realisation.sector}</dd></div>
                  {realisation.service && <div><dt className="text-[#526259]">Service réalisé</dt><dd className="mt-1 font-medium text-[#16232a]">{realisation.service}</dd></div>}
                  <div><dt className="text-[#526259]">Date</dt><dd className="mt-1 font-medium text-[#16232a]">{new Date(realisation.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long" })}</dd></div>
                </dl>
                <Link href="/realisations" className="mt-6 inline-block text-sm font-semibold text-[#a85c36] hover:underline">← Toutes les réalisations</Link>
              </aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
