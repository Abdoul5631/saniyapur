import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { adminFetch } from "@/lib/admin/api";
import { getAdminToken } from "@/lib/admin/session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const token = await getAdminToken();
  if (!token) redirect("/admin/login");

  const user = await adminFetch<{ username: string; role: string }>("/auth/me/").catch(() => null);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f6] lg:flex-row">
      <AdminSidebar user={user} />
      <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
    </div>
  );
}
