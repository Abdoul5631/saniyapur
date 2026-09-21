import { NextRequest } from "next/server";
import { proxyAdminFormData } from "@/lib/admin/upstream";

export const runtime = "nodejs";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return proxyAdminFormData(request, `/news/${encodeURIComponent(slug)}/`, "PATCH");
}
