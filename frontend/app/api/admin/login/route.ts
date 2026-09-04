import { NextResponse } from "next/server";
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME } from "@/lib/admin/session";

function getUpstreamApiUrl(): string {
  if (process.env.INTERNAL_API_URL) {
    return process.env.INTERNAL_API_URL.replace(/\/$/, "");
  }
  const publicUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicUrl && !publicUrl.startsWith("/")) {
    return publicUrl.replace(/\/$/, "");
  }
  return "http://backend:8000/api";
}

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (!username || !password) {
    return NextResponse.json({ error: "Identifiant et mot de passe requis." }, { status: 400 });
  }

  const urlsToTry = [
    `${getUpstreamApiUrl()}/auth/login/`,
    "http://backend:8000/api/auth/login/",
    "http://nginx/api/auth/login/",
  ];

  let upstream: Response | null = null;
  let lastErr: unknown = null;

  for (const url of Array.from(new Set(urlsToTry))) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      upstream = res;
      break;
    } catch (err) {
      lastErr = err;
    }
  }

  if (!upstream) {
    console.error("Login upstream failed all endpoints. Last error:", lastErr);
    return NextResponse.json({ error: "Erreur de connexion au serveur d'authentification." }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  const { access } = (await upstream.json()) as { access: string };
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, access, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ADMIN_COOKIE_MAX_AGE,
  });
  return response;
}
