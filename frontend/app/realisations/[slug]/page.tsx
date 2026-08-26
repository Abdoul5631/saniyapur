import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/realisations/before-after";
import { RealisationGallery } from "@/components/realisations/realisation-gallery";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getRealisation, realisationsAreMocked } from "@/lib/realisations";
type RealisationDetailProps = { params: Promise<{ slug: string }> };
export default async function RealisationDetailPage({ params }: RealisationDetailProps) {
  const { slug } = await params;
  const realisation = await getRealisation(slug);
  if (!realisation || !realisation.published) notFound();
  return (
    <>
      <CorporateHeader />
      <main>
        <section className="bg-[#0f2e36] py-20 text-white sm:py-28">
          <Container>
            <Link href="/realisations" className="animate-fade-in-up inline-block text-sm font-semibold text-[#e8d9cc] hover:text-white">← Toutes les réalisations</Link>
            {realisationsAreMocked && <p className="animate-fade-in-up mt-6 inline-block rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.15em] text-[#e8d9cc]">Données de test</p>}
            <p className="animate-fade-in-up mt-6 text-sm font-bold uppercase tracking-[.18em] text-[#e8d9cc] [animation-delay:80ms]">{realisation.sector}</p>
            <h1 className="animate-fade-in-up mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl [animation-delay:150ms]">{realisation.title}</h1>
          </Container>
        </section>
        <section className="py-16 sm:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-[1fr_.45fr]">
              <Reveal>
                <p className="text-lg leading-8 text-[#526259]">{realisation.description}</p>
                <div className="mt-12 grid gap-12">
                  <BeforeAfter images={realisation.images} />
                  <RealisationGallery images={realisation.images} />
                </div>
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
                </aside>
              </Reveal>
            </div>
          </Container>
        </section>
      </main>
      <CorporateFooter />
    </>
  );
}
