"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { Attestation } from "@/types/admin";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  for (const field of ["title", "client_organisation", "type", "date", "description", "order"]) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  payload.set("published", formData.get("published") ? "true" : "false");
  payload.set("featured", formData.get("featured") ? "true" : "false");

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) payload.set("image", image);

  const pdf = formData.get("pdf_file");
  if (pdf instanceof File && pdf.size > 0) payload.set("pdf_file", pdf);

  return payload;
}

export async function createAttestation(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await adminMutateForm<Attestation>("/attestations/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/attestations");
  revalidatePath("/realisations");
  revalidatePath("/a-propos");
  redirect("/admin/attestations");
}

export async function updateAttestation(
  id: number,
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    await adminMutateForm<Attestation>(`/attestations/${id}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/attestations");
  revalidatePath("/realisations");
  revalidatePath("/a-propos");
  redirect("/admin/attestations");
}

export async function deleteAttestation(id: number): Promise<void> {
  await adminDelete(`/attestations/${id}/`);
  revalidatePath("/admin/attestations");
  revalidatePath("/realisations");
  revalidatePath("/a-propos");
}
