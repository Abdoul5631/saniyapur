import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsCard } from "@/components/news/news-card";
import { ContactCtaSection } from "@/components/sections/contact-cta-section";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getNews, getNewsArticle, newsAreMocked } from "@/lib/news";
import { resolveMediaUrl } from "@/lib/media";
import { renderSafeRichText } from "@/lib/rich-text";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return {
    title: article?.title ?? "Actualité",
    description: article?.excerpt || undefined,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, all] = await Promise.all([getNewsArticle(slug), getNews()]);
  if (!article || !article.published) notFound();

  const date = article.published_at || article.created_at;
  const dateLabel = date
    ? new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
    : "";
  const imageSrc = article.image ? resolveMediaUrl(article.image, "") : "";
  const others = all.filter((item) => item.published && item.id !== article.id).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={article.category || "Actualité"}
        title={article.title}
        description={dateLabel || undefined}
        crumbs={[
          { label: "Accueil", href: "/" },
          { label: "Actualités", href: "/actualites" },
          { label: article.title },
        ]}
      />
      <article className="bg-white py-16 sm:py-20">
        <Container>
          {newsAreMocked && (
            <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">
              Données de test — cette publication n’est pas une actualité officielle.
            </p>
          )}

          {imageSrc ? (
            <figure className="relative isolate overflow-hidden rounded-3xl bg-[#e8eeec] shadow-xl">
              <div className="relative h-[240px] sm:h-[360px] lg:h-[420px]">
                <Image
                  src={imageSrc}
                  alt={article.title}
                  fill
                  unoptimized
                  priority
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </figure>
          ) : null}

          {article.author ? (
            <p className={`text-sm text-[#526259] ${imageSrc ? "mt-6" : ""}`}>Par {article.author}</p>
          ) : null}

          <div
            className="prose mt-8 max-w-3xl text-base leading-relaxed text-[#526259] sm:text-lg"
            dangerouslySetInnerHTML={{ __html: renderSafeRichText(article.content) }}
          />

          <Link href="/actualites" className="mt-10 inline-block text-sm font-semibold text-[#a85c36] hover:underline">
            ← Toutes les actualités
          </Link>

          {others.length > 0 && (
            <div className="mt-16 border-t border-[#dce5df] pt-12">
              <h2 className="text-xl font-extrabold text-[#16232a]">Autres publications</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item) => (
                  <NewsCard key={item.id} article={item} isMock={newsAreMocked} />
                ))}
              </div>
            </div>
          )}
        </Container>
      </article>
      <ContactCtaSection title="Une question après lecture ? Écrivons-nous." />
    </>
  );
}
