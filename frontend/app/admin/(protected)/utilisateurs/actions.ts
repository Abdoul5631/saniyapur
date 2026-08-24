"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminMutateJson } from "@/lib/admin/api";
import type { FormState } from "@/components/admin/admin-form";
import type { AdminUser } from "@/types/admin";

function buildPayload(formData: FormData): Record<string, unknown> {
  const payload: Record<string, unknown> = {
    username: String(formData.get("username") ?? ""),
    email: String(formData.get("email") ?? ""),
    first_name: String(formData.get("first_name") ?? ""),
    last_name: String(formData.get("last_name") ?? ""),
    role: String(formData.get("role") ?? "editor"),
    is_active: Boolean(formData.get("is_active")),
  };
  const password = String(formData.get("password") ?? "");
  if (password) payload.password = password;
  return payload;
}

export async function createUser(_prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateJson<AdminUser>("/users/", buildPayload(formData), "POST");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/utilisateurs");
  redirect("/admin/utilisateurs");
}

export async function updateUser(id: number, _prevState: FormState, formData: FormData): Promise<FormState> {
  try {
    await adminMutateJson<AdminUser>(`/users/${id}/`, buildPayload(formData), "PATCH");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue." };
  }
  revalidatePath("/admin/utilisateurs");
  redirect("/admin/utilisateurs");
}

export async function toggleUserActive(id: number, isActive: boolean): Promise<void> {
  await adminMutateJson<AdminUser>(`/users/${id}/`, { is_active: isActive }, "PATCH");
  revalidatePath("/admin/utilisateurs");
}

export async function deleteUser(id: number): Promise<void> {
  await adminDelete(`/users/${id}/`);
  revalidatePath("/admin/utilisateurs");
}
