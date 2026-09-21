"use server";
import { revalidatePath } from "next/cache";
import { adminDelete } from "@/lib/admin/api";

export async function deleteNews(slug: string): Promise<void> {
  await adminDelete(`/news/${slug}/`);
  revalidatePath("/admin/actualites");
}
