import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { getProduct, productsAreMocked } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product?.name ?? "Produit" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || !product.published) notFound();
  return (
    <>
      <PageHero
        eyebrow={product.category || "Produit"}
        title={product.name}
        crumbs={[{ label: "Accueil", href: "/" }, { label: "Produits", href: "/produits" }, { label: product.name }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          {productsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — produit non commercialisé par J&B SANIYAPUR SARL.</p>}
          <Reveal><ProductDetail product={product} /></Reveal>
        </Container>
      </section>
    </>
  );
}
