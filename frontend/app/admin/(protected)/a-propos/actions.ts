"use server";
import { revalidatePath } from "next/cache";
import { adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { AboutSettings } from "@/types/admin";

const TEXT_FIELDS = [
  "presentation_title",
  "presentation_devise",
  "presentation_content",
  "presentation_legal_info",
  "team_presentation_title",
  "team_presentation_content",
  "operational_team_title",
  "operational_team_content",
  "social_commitment_title",
  "social_commitment_content",
  "bionettoyage_title",
  "bionettoyage_content",
  "competencies_title",
  "competencies_content",
  "mission_title",
  "mission_content",
  "objectives_title",
  "objectives_content",
  "specific_objectives_content",
  "bionettoyage_advantages_content",
  "vision_title",
  "vision_content",
  "vision_paradox_content",
  "vision_execution_content",
  "vision_impact_content",
  "international_expertise_title",
  "international_expertise_content",
  "references_title",
  "references_content",
  "engagements_title",
  "engagements_content",
  "dg_name",
  "dg_role",
  "dg_message",
];

const IMAGE_FIELDS = ["presentation_image", "international_expertise_image", "dg_photo"];

export async function updateAboutSettings(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const payload = new FormData();
  for (const field of TEXT_FIELDS) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  for (const field of IMAGE_FIELDS) {
    const file = formData.get(field);
    if (file instanceof File && file.size > 0) {
      payload.set(field, file);
    }
  }
  try {
    await adminMutateForm<AboutSettings>("/about/", payload, "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/a-propos");
  revalidatePath("/a-propos");
  revalidatePath("/");
  return { success: true };
}
