import Link from "next/link";
import { ProductCard } from "@/components/products/product-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { getProducts, productsAreMocked } from "@/lib/products";

export async function ProductsPreviewSection() {
  const products = await getProducts();
  const published = products.filter((product) => product.published).slice(0, 3);
  return <section id="produits" className="bg-[#f1f6f6] py-20 sm:py-28"><Container>
    <Reveal className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <p className="text-sm font-bold uppercase tracking-[.18em] text-[#a85c36]">Produits & équipements</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#16232a] sm:text-4xl">Des solutions professionnelles pour l’hygiène et la maintenance.</h2>
        <p className="mt-5 leading-7 text-[#526259]">Un catalogue de produits et d’équipements professionnels, connecté à terme au catalogue validé de l’entreprise.</p>
      </div>
      <Link href="/produits" className="text-sm font-semibold text-[#a85c36]">Tous les produits →</Link>
    </Reveal>
    {productsAreMocked && <p className="mt-8 text-sm text-[#526259]">Les contenus affichés sont des données de test, en attente de connexion à l’API.</p>}
    {published.length ? <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{published.map((product, index) => <Reveal key={product.id} delayMs={index * 90}><ProductCard product={product} isMock={productsAreMocked} /></Reveal>)}</div> : <p className="mt-8 text-[#526259]">Aucun produit publié pour le moment.</p>}
  </Container></section>;
}
