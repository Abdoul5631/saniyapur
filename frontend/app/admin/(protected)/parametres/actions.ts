"use server";
import { revalidatePath } from "next/cache";
import { adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { SiteSettings } from "@/types/admin";

const TEXT_FIELDS = [
  "company_name", "tagline", "slogan", "description", "address",
  "phone", "whatsapp", "email", "opening_hours",
  "facebook_url", "linkedin_url", "instagram_url", "whatsapp_url",
  "hero_title", "hero_text", "hero_primary_button_label", "hero_primary_button_url", "hero_secondary_button_label", "hero_secondary_button_url",
];

export async function updateSiteSettings(_prevState: FormState, formData: FormData): Promise<FormState> {
  const payload = new FormData();
  for (const field of TEXT_FIELDS) payload.set(field, String(formData.get(field) ?? ""));
  for (const field of ["logo", "hero_image"]) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) payload.set(field, file);
  }
  try {
    await adminMutateForm<SiteSettings>("/settings/", payload, "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/parametres");
  return { success: true };
}
