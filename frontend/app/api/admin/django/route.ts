import { NextRequest, NextResponse } from "next/server";
import { proxyAdminFormData } from "@/lib/admin/upstream";

export const runtime = "nodejs";

function isSafeApiPath(path: string): boolean {
  return /^\/[A-Za-z0-9/_-]+\/$/.test(path) && !path.includes("..");
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path") ?? "";
  const method = url.searchParams.get("method") === "PATCH" ? "PATCH" : "POST";
  if (!isSafeApiPath(path)) {
    return NextResponse.json({ error: "Chemin API invalide." }, { status: 400 });
  }
  return proxyAdminFormData(request, path, method);
}
