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

// Limite les essais ratés par adresse IP (en mémoire : suffisant pour un seul serveur Next).
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; first: number }>();

// nginx ajoute l'IP réelle en dernier dans X-Forwarded-For : les valeurs précédentes peuvent être falsifiées.
function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",").pop()!.trim() : "local";
}

function isBlocked(ip: string): boolean {
  const entry = failures.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(ip);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const entry = failures.get(ip);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    failures.set(ip, { count: 1, first: Date.now() });
  } else {
    entry.count += 1;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isBlocked(ip)) {
    return NextResponse.json({ error: "Trop de tentatives. Réessayez dans 15 minutes." }, { status: 429 });
  }

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
        headers: { "Content-Type": "application/json", "X-Forwarded-For": ip },
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
    recordFailure(ip);
    return NextResponse.json({ error: "Identifiant ou mot de passe incorrect." }, { status: 401 });
  }

  failures.delete(ip);
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
