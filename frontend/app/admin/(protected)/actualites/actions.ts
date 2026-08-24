"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { AdminNews } from "@/types/admin";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  for (const field of ["title", "slug", "excerpt", "content", "author"]) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  payload.set("published", formData.get("published") ? "true" : "false");
  const publishedAt = formData.get("published_at");
  if (publishedAt) payload.set("published_at", String(publishedAt));
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) payload.set("image", image);
  return payload;
}

export async function createNews(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminNews>("/news/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/actualites");
  redirect("/admin/actualites");
}

export async function updateNews(slug: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminNews>(`/news/${slug}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/actualites");
  redirect("/admin/actualites");
}

export async function deleteNews(slug: string): Promise<void> {
  await adminDelete(`/news/${slug}/`);
  revalidatePath("/admin/actualites");
}
