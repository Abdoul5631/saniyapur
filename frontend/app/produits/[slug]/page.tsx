import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getProduct, productsAreMocked } from "@/lib/products";
type ProductDetailProps = { params: Promise<{ slug: string }> };
export default async function ProductPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product || !product.published) notFound();
  return (
    <>
      <CorporateHeader />
      <main>
        <section className="py-16 sm:py-24">
          <Container>
            <Link href="/produits" className="text-sm font-semibold text-[#a85c36] hover:underline">← Tous les produits</Link>
            {productsAreMocked && <p className="mt-6 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — produit non commercialisé par J&amp;B SANIYAPUR SARL.</p>}
            <Reveal className="mt-8"><ProductDetail product={product} /></Reveal>
          </Container>
        </section>
      </main>
      <CorporateFooter />
    </>
  );
}
