"use client";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }
  return <button type="button" onClick={handleLogout} className="text-left text-sm font-medium text-[#3f5149] transition hover:text-[#a85c36]">Se déconnecter</button>;
}
