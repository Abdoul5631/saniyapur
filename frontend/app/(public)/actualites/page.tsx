import type { Metadata } from "next";
import { NewsCard } from "@/components/news/news-card";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getNews, newsAreMocked } from "@/lib/news";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Publications officielles de J&B SANIYAPUR SARL.",
};

export default async function NewsPage() {
  const articles = (await getNews()).filter((article) => article.published);

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Informations et publications"
        description="Les articles publiés par SANIYAPUR : interventions, organisation et vie de l’entreprise."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
      />
      <section className="bg-white py-16 sm:py-20">
        <Container>
          {newsAreMocked && (
            <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">
              Mode démonstration : l’article ci-dessous est un exemple de test.
            </p>
          )}
          {articles.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Reveal key={article.id} delayMs={Math.min(index * 40, 160)}>
                  <NewsCard article={article} isMock={newsAreMocked} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-[#dce5df] bg-[#f8faf9] p-8 text-[#526259]">
              Aucune actualité publiée pour le moment.
            </p>
          )}
        </Container>
      </section>
      <ContactCtaSection title="Une question ? Écrivons-nous." />
    </>
  );
}
