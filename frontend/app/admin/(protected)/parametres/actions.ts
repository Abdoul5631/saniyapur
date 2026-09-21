"use server";
import { revalidatePath } from "next/cache";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { ClientLogo, SiteSettings } from "@/types/admin";

const TEXT_FIELDS = [
  "company_name", "tagline", "slogan", "description", "address",
  "phone", "whatsapp", "email", "opening_hours",
  "facebook_url", "linkedin_url", "instagram_url", "whatsapp_url",
  "hero_title", "hero_text", "hero_primary_button_label", "hero_primary_button_url", "hero_secondary_button_label", "hero_secondary_button_url",
  "stats_since_year",
  "stat_1_value", "stat_1_suffix", "stat_1_label", "stat_1_description",
  "stat_2_value", "stat_2_suffix", "stat_2_label", "stat_2_description",
  "stat_3_value", "stat_3_suffix", "stat_3_label", "stat_3_description",
  "stat_4_value", "stat_4_suffix", "stat_4_label", "stat_4_description",
  "stat_5_value", "stat_5_suffix", "stat_5_label", "stat_5_description",
];

export async function updateSiteSettings(_prevState: FormState, formData: FormData): Promise<FormState> {
  const payload = new FormData();
  for (const field of TEXT_FIELDS) payload.set(field, String(formData.get(field) ?? ""));
  for (const field of ["logo", "hero_image", "hero_image_2", "hero_image_3"]) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) payload.set(field, file);
  }
  try {
    await adminMutateForm<SiteSettings>("/settings/", payload, "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/parametres");
  revalidatePath("/");
  return { success: true };
}

function revalidateClientLogos() {
  revalidatePath("/admin/parametres");
  revalidatePath("/");
}

export async function addClientLogos(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const files = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
  if (!files.length) return { error: "Choisissez au moins un logo." };

  const name = String(formData.get("name") ?? "");
  const startOrder = Number(formData.get("order") ?? "0") || 0;

  try {
    for (let i = 0; i < files.length; i += 1) {
      const payload = new FormData();
      payload.set("image", files[i]);
      payload.set("name", name);
      payload.set("order", String(startOrder + i));
      await adminMutateForm<ClientLogo>("/client-logos/", payload, "POST");
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidateClientLogos();
  return { success: true };
}

export async function deleteClientLogo(id: number): Promise<void> {
  await adminDelete(`/client-logos/${id}/`);
  revalidateClientLogos();
}
