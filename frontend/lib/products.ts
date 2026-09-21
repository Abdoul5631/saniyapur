import { mockProducts } from "@/data/mock-products";
import { apiFetch, apiFetchAll } from "@/lib/api";
import type { Product } from "@/types/product";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
export async function getProducts(): Promise<Product[]> {
  try {
    const list = await apiFetchAll<Product>("/products/?page_size=200", { next: { revalidate: 60 } });
    if (list.length > 0) return list.filter((product) => product.published);
  } catch (err) {
    console.error("getProducts error:", err);
  }
  return mockProducts;
}
export async function getProduct(slug: string): Promise<Product | undefined> {
  if (!useApi) return mockProducts.find((product) => product.slug === slug);
  try {
    return await apiFetch<Product>(`/products/${slug}/`, { next: { revalidate: 60 } });
  } catch {
    return undefined;
  }
}
export const productsAreMocked = !useApi;

