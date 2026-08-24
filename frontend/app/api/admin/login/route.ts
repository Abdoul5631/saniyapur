import { NextResponse } from "next/server";
import { ADMIN_COOKIE_MAX_AGE, ADMIN_COOKIE_NAME } from "@/lib/admin/session";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  if (!apiUrl) return NextResponse.json({ error: "API non configurée." }, { status: 500 });
  const { username, password } = await request.json();
  if (!username || !password) return NextResponse.json({ error: "Identifiant et mot de passe requis." }, { status: 400 });

  const upstream = await fetch(`${apiUrl.replace(/\/$/, "")}/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!upstream.ok) return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });

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
