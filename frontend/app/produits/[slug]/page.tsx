import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/products/product-detail";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { getProduct, productsAreMocked } from "@/lib/products";
type ProductDetailProps = { params: Promise<{ slug: string }> };
export default async function ProductPage({ params }: ProductDetailProps) { const { slug } = await params; const product = await getProduct(slug); if (!product || !product.published) notFound(); return <><CorporateHeader /><main><section className="py-16 sm:py-24"><Container>{productsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Données de test — produit non commercialisé par J&B SANIYAPUR SARL.</p>}<ProductDetail product={product} /></Container></section></main><CorporateFooter /></>; }
