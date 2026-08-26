import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { Container } from "@/components/ui/container";
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
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-sm text-[#526259]">
          <Link href="/" className="hover:text-[#a85c36]">Accueil</Link>
          <span className="mx-2 text-[#dce5df]">/</span>
          <Link href="/produits" className="hover:text-[#a85c36]">Produits</Link>
          <span className="mx-2 text-[#dce5df]">/</span>
          <span className="text-[#16232a]">{product.name}</span>
        </p>
        {productsAreMocked && <p className="mt-6 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — produit non commercialisé par J&B SANIYAPUR SARL.</p>}
        <Reveal className="mt-8"><ProductDetail product={product} /></Reveal>
      </Container>
    </section>
  );
}
