import { NextRequest } from "next/server";
import { proxyAdminFormData } from "@/lib/admin/upstream";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  return proxyAdminFormData(request, "/news/", "POST");
}
