"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { TeamMember } from "@/types/admin";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  for (const field of ["name", "role", "phone", "bio", "order"]) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  payload.set("published", formData.get("published") ? "true" : "false");
  const photo = formData.get("photo");
  if (photo instanceof File && photo.size > 0) payload.set("photo", photo);
  return payload;
}

export async function createTeamMember(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await adminMutateForm<TeamMember>("/team/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/equipe");
  revalidatePath("/a-propos");
  redirect("/admin/equipe");
}

export async function updateTeamMember(
  id: number,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await adminMutateForm<TeamMember>(`/team/${id}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/equipe");
  revalidatePath("/a-propos");
  redirect("/admin/equipe");
}

export async function deleteTeamMember(id: number): Promise<void> {
  await adminDelete(`/team/${id}/`);
  revalidatePath("/admin/equipe");
  revalidatePath("/a-propos");
}
