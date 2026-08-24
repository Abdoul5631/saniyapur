import type { Metadata } from "next";
import { ProductCard } from "@/components/products/product-card";
import { CorporateFooter } from "@/components/layout/corporate-footer";
import { CorporateHeader } from "@/components/layout/corporate-header";
import { Container } from "@/components/ui/container";
import { getProducts, productsAreMocked } from "@/lib/products";
export const metadata: Metadata = { title: "Produits | J&B SANIYAPUR SARL" };
export default async function ProductsPage() { const products = await getProducts(); const published = products.filter((product) => product.published); return <><CorporateHeader /><main><section className="bg-[#0f2e36] py-20 text-white sm:py-28"><Container><p className="text-sm font-bold uppercase tracking-[.18em] text-[#e8d9cc]">Produits & équipements</p><h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Des solutions professionnelles pour vos besoins d’hygiène.</h1></Container></section><section className="py-16 sm:py-24"><Container>{productsAreMocked && <p className="mb-8 rounded-xl border border-[#e8d9cc] bg-[#f1f6f6] p-4 text-sm text-[#7a4a2e]">Mode développement : les produits ci-dessous sont des données de test et ne constituent pas le catalogue de l’entreprise.</p>}{published.length ? <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{published.map((product) => <ProductCard key={product.id} product={product} isMock={productsAreMocked} />)}</div> : <p className="text-[#526259]">Aucun produit publié pour le moment.</p>}</Container></section></main><CorporateFooter /></>; }
