import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin/session";

function getUpstreamApiUrl(): string {
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL.replace(/\/$/, "");
  }
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicUrl && !publicUrl.startsWith("/")) {
    return publicUrl.replace(/\/$/, "");
  }
  return "http://127.0.0.1:8000/api";
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Session expirée. Reconnectez-vous." }, { status: 401 });
  }

  const incoming = await request.formData();
  const image = incoming.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return NextResponse.json({ error: "Choisissez une photo." }, { status: 400 });
  }

  const payload = new FormData();
  payload.set("image", image);
  payload.set("caption", String(incoming.get("caption") ?? ""));
  payload.set("order", String(incoming.get("order") ?? "0"));

  const upstream = await fetch(`${getUpstreamApiUrl()}/team-gallery-photos/`, {
    method: "POST",
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
    status: 201,
    headers: { "Content-Type": upstream.headers.get("Content-Type") || "application/json" },
  });
}
