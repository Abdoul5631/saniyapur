import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getNewsArticle, newsAreMocked } from "@/lib/news";
import { renderSafeRichText } from "@/lib/rich-text";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return { title: article?.title ?? "Actualité" };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article || !article.published) notFound();
  const date = article.published_at || article.created_at;

  return (
    <>
      <PageHero
        eyebrow={new Date(date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        title={article.title}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Actualités", href: "/actualites" }, { label: article.title }]}
      />
      <article className="py-16 sm:py-20">
        <Container>
          {newsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — cette publication n’est pas une actualité officielle.</p>}
          {article.image && <div className="aspect-[16/8] overflow-hidden rounded-2xl bg-[#eaf2f2] bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />}
          {article.author && <p className="mt-6 text-sm text-[#526259]">Par {article.author}</p>}
          <div className="prose mt-8 max-w-3xl text-lg leading-8 text-[#526259]" dangerouslySetInnerHTML={{ __html: renderSafeRichText(article.content) }} />
          <Link href="/actualites" className="mt-10 inline-block text-sm font-semibold text-[#a85c36] hover:underline">← Toutes les actualités</Link>
        </Container>
      </article>
    </>
  );
}
