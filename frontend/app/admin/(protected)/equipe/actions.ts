"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { TeamGalleryPhoto, TeamGallerySettings, TeamMember } from "@/types/admin";

function revalidateTeam() {
  revalidatePath("/admin/equipe");
  revalidatePath("/a-propos");
  revalidatePath("/");
}

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
  revalidateTeam();
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
  revalidateTeam();
  redirect("/admin/equipe");
}

export async function deleteTeamMember(id: number): Promise<void> {
  await adminDelete(`/team/${id}/`);
  revalidateTeam();
}

export async function updateTeamGallerySettings(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const payload = new FormData();
  payload.set("title", String(formData.get("title") ?? ""));
  payload.set("description", String(formData.get("description") ?? ""));
  try {
    await adminMutateForm<TeamGallerySettings>("/team-gallery/", payload, "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidateTeam();
  return { success: true };
}

export async function addTeamGalleryPhotos(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const files = formData.getAll("images").filter((file): file is File => file instanceof File && file.size > 0);
  if (!files.length) return { error: "Choisissez au moins une photo." };

  const caption = String(formData.get("caption") ?? "");
  const startOrder = Number(formData.get("order") ?? "0") || 0;

  try {
    for (let i = 0; i < files.length; i += 1) {
      const payload = new FormData();
      payload.set("image", files[i]);
      payload.set("caption", caption);
      payload.set("order", String(startOrder + i));
      await adminMutateForm<TeamGalleryPhoto>("/team-gallery-photos/", payload, "POST");
    }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidateTeam();
  return { success: true };
}

export async function deleteTeamGalleryPhoto(id: number): Promise<void> {
  await adminDelete(`/team-gallery-photos/${id}/`);
  revalidateTeam();
}
