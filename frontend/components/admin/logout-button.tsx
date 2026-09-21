"use client";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <button
      type="button"
      onClick={handleLogout}
      className="px-1 text-left text-sm font-medium text-white/70 transition hover:text-white"
    >
      Se déconnecter
    </button>
  );
}
