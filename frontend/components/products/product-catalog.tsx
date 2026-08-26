"use client";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/products/product-card";
import type { Product } from "@/types/product";

export function ProductCatalog({ products, isMock }: { products: Product[]; isMock: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Toutes");
  const categories = useMemo(() => ["Toutes", ...new Set(products.map((product) => product.category).filter(Boolean))], [products]);
  const visible = products.filter((product) => {
    const matchCategory = category === "Toutes" || product.category === category;
    const haystack = `${product.name} ${product.short_description} ${product.reference}`.toLowerCase();
    const matchQuery = haystack.includes(query.trim().toLowerCase());
    return matchCategory && matchQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <label className="block max-w-md flex-1 text-sm font-medium text-[#16232a]">
          Recherche
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Nom, référence…"
            className="mt-1.5 w-full rounded-lg border border-[#dce5df] px-3 py-2.5 text-sm outline-none focus:border-[#a85c36]"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Catégories">
          {categories.map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={category === name}
              onClick={() => setCategory(name)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${category === name ? "bg-[#a85c36] text-white" : "border border-[#dce5df] bg-white text-[#526259] hover:border-[#a85c36] hover:text-[#a85c36]"}`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      {visible.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => <ProductCard key={product.id} product={product} isMock={isMock} />)}
        </div>
      ) : (
        <p className="mt-10 text-[#526259]">Aucun produit ne correspond à votre recherche.</p>
      )}
    </div>
  );
}
