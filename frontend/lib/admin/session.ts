import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_token";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 8; // 8h — aligné sur ACCESS_TOKEN_LIFETIME côté Django.

export async function getAdminToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ADMIN_COOKIE_NAME)?.value ?? null;
}
