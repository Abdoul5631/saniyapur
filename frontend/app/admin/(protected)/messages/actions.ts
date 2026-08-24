"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminPatchJson } from "@/lib/admin/api";
import type { ContactMessage } from "@/types/admin";

export async function setContactProcessed(id: number, processed: boolean): Promise<void> {
  await adminPatchJson<ContactMessage>(`/contacts/${id}/`, { processed });
  revalidatePath("/admin/messages");
  revalidatePath(`/admin/messages/${id}`);
  revalidatePath("/admin");
}

export async function deleteContactMessage(id: number): Promise<void> {
  await adminDelete(`/contacts/${id}/`);
  revalidatePath("/admin/messages");
}

export async function deleteContactMessageAndRedirect(id: number): Promise<void> {
  await adminDelete(`/contacts/${id}/`);
  revalidatePath("/admin/messages");
  redirect("/admin/messages");
}
