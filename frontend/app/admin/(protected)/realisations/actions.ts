"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateForm, adminMutateJson } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { Realisation, RealisationImage } from "@/types/realisation";

function buildPayload(formData: FormData): Record<string, unknown> {
  const service = String(formData.get("service") ?? "");
  return {
    title: String(formData.get("title") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    client: String(formData.get("client") ?? ""),
    location: String(formData.get("location") ?? ""),
    sector: String(formData.get("sector") ?? ""),
    service: service || null,
    date: String(formData.get("date") ?? ""),
    featured: Boolean(formData.get("featured")),
    published: Boolean(formData.get("published")),
  };
}

export async function createRealisation(_prevState: FormState, formData: FormData): Promise<FormState> {
  let slug: string;
  try {
    const created = await adminMutateJson<Realisation>("/realisations/", buildPayload(formData), "POST");
    slug = created.slug;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/realisations");
  redirect(`/admin/realisations/${slug}/modifier`);
}

export async function updateRealisation(slug: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateJson<Realisation>(`/realisations/${slug}/`, buildPayload(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/realisations");
  redirect("/admin/realisations");
}

export async function deleteRealisation(slug: string): Promise<void> {
  await adminDelete(`/realisations/${slug}/`);
  revalidatePath("/admin/realisations");
}

export async function addRealisationImage(realisationId: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) return { error: "Choisissez une image à ajouter." };
  const payload = new FormData();
  payload.set("realisation", String(realisationId));
  payload.set("image", image);
  payload.set("caption", String(formData.get("caption") ?? ""));
  payload.set("type", String(formData.get("type") ?? "gallery"));
  payload.set("order", String(formData.get("order") ?? "0"));
  try {
    await adminMutateForm<RealisationImage>("/realisation-images/", payload, "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/realisations");
  return null;
}

export async function deleteRealisationImage(imageId: number): Promise<void> {
  await adminDelete(`/realisation-images/${imageId}/`);
  revalidatePath("/admin/realisations");
}

export async function setRealisationImageAsMain(imageId: number): Promise<void> {
  await adminMutateJson<RealisationImage>(`/realisation-images/${imageId}/`, { type: "main" }, "PATCH");
  revalidatePath("/admin/realisations");
}
