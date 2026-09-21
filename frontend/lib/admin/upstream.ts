import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/session";

export function getUpstreamApiUrl(): string {
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL.replace(/\/$/, "");
  }
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicUrl && !publicUrl.startsWith("/")) {
    return publicUrl.replace(/\/$/, "");
  }
  return "http://127.0.0.1:8000/api";
}

export async function proxyAdminFormData(request: NextRequest, path: string, method: "POST" | "PATCH") {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Session expirée. Reconnectez-vous." }, { status: 401 });
  }

  const incoming = await request.formData();
  const payload = new FormData();
  for (const [key, value] of incoming.entries()) {
    if (value instanceof File && value.size === 0) continue;
    payload.append(key, value);
  }

  const upstream = await fetch(`${getUpstreamApiUrl()}${path}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
    body: payload,
  });

  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      { error: text || `Erreur API (${upstream.status})` },
      { status: upstream.status },
    );
  }

  return new NextResponse(text, {
    status: upstream.status,
    headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
  });
}
