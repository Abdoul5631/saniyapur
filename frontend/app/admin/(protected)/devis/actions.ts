"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { adminDelete, adminPatchJson } from "@/lib/admin/api";
import type { QuoteRequest, QuoteStatus } from "@/types/admin";

export async function setQuoteStatus(id: number, status: QuoteStatus): Promise<void> {
  await adminPatchJson<QuoteRequest>(`/quotes/${id}/`, { status });
  revalidatePath("/admin/devis");
  revalidatePath(`/admin/devis/${id}`);
  revalidatePath("/admin");
}

export async function setQuoteNotes(id: number, formData: FormData): Promise<void> {
  const notes = String(formData.get("notes") ?? "");
  await adminPatchJson<QuoteRequest>(`/quotes/${id}/`, { notes });
  revalidatePath(`/admin/devis/${id}`);
}

export async function deleteQuote(id: number): Promise<void> {
  await adminDelete(`/quotes/${id}/`);
  revalidatePath("/admin/devis");
  redirect("/admin/devis");
}
