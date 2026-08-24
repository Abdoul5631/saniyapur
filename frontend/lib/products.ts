import { mockProducts } from "@/data/mock-products";
import { apiFetch } from "@/lib/api";
import type { PaginatedResponse } from "@/types/realisation";
import type { Product } from "@/types/product";

const useApi = Boolean(process.env.NEXT_PUBLIC_API_URL);
const normaliseList = (data: Product[] | PaginatedResponse<Product>) => Array.isArray(data) ? data : data.results;
export async function getProducts(): Promise<Product[]> { if (!useApi) return mockProducts; return normaliseList(await apiFetch<Product[] | PaginatedResponse<Product>>("/products/", { next: { revalidate: 60 } })); }
export async function getProduct(slug: string): Promise<Product | undefined> { if (!useApi) return mockProducts.find((product) => product.slug === slug); try { return await apiFetch<Product>(`/products/${slug}/`, { next: { revalidate: 60 } }); } catch { return undefined; } }
export const productsAreMocked = !useApi;
