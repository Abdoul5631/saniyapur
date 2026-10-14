"use server";

import { revalidatePath } from "next/cache";
import { adminDelete } from "@/lib/admin/api";

export async function deleteExtraPhoto(endpoint: "service-images" | "sector-images", imageId: number): Promise<void> {
  await adminDelete(`/${endpoint}/${imageId}/`);
  revalidatePath("/admin/services");
  revalidatePath("/admin/secteurs");
  revalidatePath("/", "layout");
}

export async function refreshPublicPhotos(): Promise<void> {
  revalidatePath("/", "layout");
}
