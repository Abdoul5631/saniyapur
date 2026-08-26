import type { Metadata } from "next";
import { NewsCard } from "@/components/news/news-card";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getNews, newsAreMocked } from "@/lib/news";

export const metadata: Metadata = { title: "Actualités" };

export default async function NewsPage() {
  const articles = (await getNews()).filter((article) => article.published);
  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Informations et publications"
        description="Les articles publiés depuis l’interface d’administration."
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités" }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {newsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Mode développement : article de démonstration en attente de connexion à l’API.</p>}
          {articles.length ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article, index) => (
                <Reveal key={article.id} delayMs={index * 80}>
                  <NewsCard article={article} isMock={newsAreMocked} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="text-[#526259]">Aucune actualité publiée pour le moment.</p>
          )}
        </Container>
      </section>
    </>
  );
}
