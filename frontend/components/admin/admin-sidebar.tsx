"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminLogoutButton } from "@/components/admin/logout-button";

const roleLabels: Record<string, string> = { admin: "Administrateur", editor: "Éditeur", commercial: "Commercial" };

const navGroups = [
  { label: null, items: [["Tableau de bord", "/admin"]] },
  { label: "Contenu", items: [["Produits", "/admin/produits"], ["Services", "/admin/services"], ["Secteurs", "/admin/secteurs"], ["Réalisations", "/admin/realisations"], ["Actualités", "/admin/actualites"]] },
  { label: "Commercial", items: [["Messages", "/admin/messages"], ["Demandes de devis", "/admin/devis"]] },
  { label: "Configuration", items: [["Paramètres du site", "/admin/parametres"], ["Utilisateurs", "/admin/utilisateurs"]] },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation admin" className="grid gap-5">
      {navGroups.map((group, index) => (
        <div key={group.label ?? `group-${index}`}>
          {group.label && <p className="px-3 text-xs font-bold uppercase tracking-[.12em] text-[#8a9a92]">{group.label}</p>}
          <div className={group.label ? "mt-2 grid gap-1" : "grid gap-1"}>
            {group.items.map(([label, href]) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-[#a85c36] text-white" : "text-[#3f5149] hover:bg-[#eaf2f2] hover:text-[#a85c36]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AdminSidebar({ user }: { user?: { username: string; role: string } | null }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#dce5df] bg-white p-6 lg:flex">
        <Link href="/admin" className="flex items-center gap-2 text-[#16232a]">
          <Image src="/images/logo.png" alt="J&amp;B SANIYAPUR SARL" width={220} height={128} className="h-9 w-auto" />
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a9a92]">Administration</span>
        </Link>
        <div className="mt-10 flex-1 overflow-y-auto"><NavLinks /></div>
        <div className="grid gap-3 border-t border-[#eef2ef] pt-6">
          {user && <p className="truncate text-xs text-[#8a9a92]">Connecté : <span className="font-semibold text-[#3f5149]">{user.username}</span> · {roleLabels[user.role] ?? user.role}</p>}
          <Link href="/" className="text-xs font-medium text-[#3f5149] hover:text-[#a85c36]">← Retour au site public</Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <header className="flex items-center justify-between border-b border-[#dce5df] bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 text-[#16232a]">
          <Image src="/images/logo.png" alt="J&amp;B SANIYAPUR SARL" width={220} height={128} className="h-8 w-auto" />
        </Link>
        <button type="button" aria-label="Ouvrir le menu" aria-expanded={open} onClick={() => setOpen(true)} className="grid size-9 place-items-center rounded-lg border border-[#dce5df] text-lg text-[#16232a]">☰</button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#0a1712]/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-[0.08em] text-[#16232a]">Administration</span>
              <button type="button" aria-label="Fermer le menu" onClick={() => setOpen(false)} className="grid size-8 place-items-center rounded-lg border border-[#dce5df] text-lg text-[#16232a]">×</button>
            </div>
            <div className="mt-6"><NavLinks onNavigate={() => setOpen(false)} /></div>
            <div className="mt-8 grid gap-3 border-t border-[#eef2ef] pt-6">
              <Link href="/" onClick={() => setOpen(false)} className="text-xs font-medium text-[#3f5149]">← Retour au site public</Link>
              <AdminLogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
