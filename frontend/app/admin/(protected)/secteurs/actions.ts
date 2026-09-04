"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { AdminSector } from "@/types/admin";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  payload.set("name", String(formData.get("name") ?? ""));
  payload.set("slug", String(formData.get("slug") ?? ""));
  payload.set("description", String(formData.get("description") ?? ""));
  payload.set("besoins_specifiques", String(formData.get("besoins_specifiques") ?? ""));
  payload.set("order", String(formData.get("order") ?? "0"));
  payload.set("featured", formData.get("featured") ? "true" : "false");
  payload.set("published", formData.get("published") ? "true" : "false");
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) payload.set("image", image);
  return payload;
}

export async function createSector(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminSector>("/sectors/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/secteurs");
  redirect("/admin/secteurs");
}

export async function updateSector(slug: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminSector>(`/sectors/${slug}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/secteurs");
  redirect("/admin/secteurs");
}

export async function deleteSector(slug: string): Promise<void> {
  await adminDelete(`/sectors/${slug}/`);
  revalidatePath("/admin/secteurs");
}
