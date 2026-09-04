"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminFetch, adminMutateForm, adminPatchJson } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { PaginatedResponse } from "@/types/realisation";
import type { AdminService } from "@/types/admin";

function buildFormData(formData: FormData): FormData {
  const payload = new FormData();
  for (const field of ["name", "slug", "short_description", "description", "prestations", "avantages", "icon"]) {
    payload.set(field, String(formData.get(field) ?? ""));
  }
  payload.set("order", String(formData.get("order") ?? "0"));
  payload.set("published", formData.get("published") ? "true" : "false");
  const selectedSectors = formData.getAll("sectors");
  for (const sectorId of selectedSectors) {
    if (sectorId) payload.append("sectors", String(sectorId));
  }
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) payload.set("image", image);
  return payload;
}

export async function createService(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminService>("/services/", buildFormData(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function updateService(slug: string, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateForm<AdminService>(`/services/${slug}/`, buildFormData(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/services");
  redirect("/admin/services");
}

export async function deleteService(slug: string): Promise<void> {
  await adminDelete(`/services/${slug}/`);
  revalidatePath("/admin/services");
}

export async function toggleServicePublished(slug: string, published: boolean): Promise<void> {
  await adminPatchJson<AdminService>(`/services/${slug}/`, { published });
  revalidatePath("/admin/services");
}

export async function moveServiceOrder(slug: string, direction: "up" | "down"): Promise<void> {
  const data = await adminFetch<PaginatedResponse<AdminService>>("/services/");
  const sorted = [...data.results].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((service) => service.slug === slug);
  if (index === -1) return;
  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= sorted.length) return;
  const current = sorted[index];
  const target = sorted[targetIndex];
  await adminPatchJson<AdminService>(`/services/${current.slug}/`, { order: target.order });
  await adminPatchJson<AdminService>(`/services/${target.slug}/`, { order: current.order });
  revalidatePath("/admin/services");
}
