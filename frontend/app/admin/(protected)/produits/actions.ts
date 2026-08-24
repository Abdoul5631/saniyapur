"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { Product, ProductImage } from "@/types/product";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  for (const field of ["name", "slug", "reference", "category", "short_description", "description", "usage", "characteristics"]) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  payload.set("published", formData.get("published") ? "true" : "false");
  for (const field of ["image", "technical_sheet", "safety_sheet"]) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) payload.set(field, file);
  }
  return payload;
}

export async function createProduct(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<Product>("/products/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function updateProduct(slug: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<Product>(`/products/${slug}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/produits");
  redirect("/admin/produits");
}

export async function deleteProduct(slug: string): Promise<void> {
  await adminDelete(`/products/${slug}/`);
  revalidatePath("/admin/produits");
}

export async function addProductImage(productId: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) return { error: "Choisissez une image à ajouter." };
  const payload = new FormData();
  payload.set("product", String(productId));
  payload.set("image", image);
  payload.set("caption", String(formData.get("caption") ?? ""));
  payload.set("order", String(formData.get("order") ?? "0"));
  try {
    await adminMutateForm<ProductImage>("/product-images/", payload, "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/produits");
  return null;
}

export async function deleteProductImage(imageId: number): Promise<void> {
  await adminDelete(`/product-images/${imageId}/`);
  revalidatePath("/admin/produits");
}
