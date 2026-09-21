"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AdminLogoutButton } from "@/components/admin/logout-button";

const roleLabels: Record<string, string> = {
  admin: "Administrateur",
  editor: "Éditeur",
  commercial: "Commercial",
};

const navGroups = [
  { label: null, items: [["Tableau de bord", "/admin"]] },
  {
    label: "Contenu",
    items: [
      ["À propos", "/admin/a-propos"],
      ["Services", "/admin/services"],
      ["Secteurs", "/admin/secteurs"],
      ["Réalisations", "/admin/realisations"],
      ["Produits", "/admin/produits"],
      ["Actualités", "/admin/actualites"],
      ["Équipe", "/admin/equipe"],
      ["Attestations", "/admin/attestations"],
    ],
  },
  {
    label: "Demandes",
    items: [
      ["Messages", "/admin/messages"],
      ["Devis", "/admin/devis"],
    ],
  },
  {
    label: "Configuration",
    items: [
      ["Paramètres", "/admin/parametres"],
      ["Utilisateurs", "/admin/utilisateurs"],
    ],
  },
] as const;

function isActive(pathname: string, href: string): boolean {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Navigation admin" className="grid gap-6">
      {navGroups.map((group, index) => (
        <div key={group.label ?? `group-${index}`}>
          {group.label && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">{group.label}</p>
          )}
          <div className={group.label ? "mt-2 grid gap-0.5" : "grid gap-0.5"}>
            {group.items.map(([label, href]) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    active ? "bg-[#a85c36] text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`}
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
      <aside className="hidden w-64 shrink-0 flex-col bg-[#0f2e36] p-5 text-white lg:flex">
        <Link href="/admin" className="flex items-center gap-3 px-1">
          <Image src="/images/logo-transparent.png" alt="J&B SANIYAPUR" width={160} height={72} className="h-10 w-auto" />
        </Link>
        <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-[.18em] text-white/40">Administration</p>
        <div className="mt-8 flex-1 overflow-y-auto">
          <NavLinks />
        </div>
        <div className="grid gap-3 border-t border-white/10 pt-5">
          {user && (
            <p className="truncate px-1 text-xs text-white/50">
              {user.username}
              <span className="text-white/30"> · {roleLabels[user.role] ?? user.role}</span>
            </p>
          )}
          <Link href="/" className="px-1 text-xs font-medium text-white/60 hover:text-white">
            Voir le site public
          </Link>
          <AdminLogoutButton />
        </div>
      </aside>

      <header className="flex items-center justify-between border-b border-[#dce5df] bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2 text-[#16232a]">
          <Image src="/images/logo.png" alt="J&B SANIYAPUR" width={160} height={72} className="h-8 w-auto" />
        </Link>
        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="grid size-9 place-items-center rounded-lg border border-[#dce5df] text-lg text-[#16232a]"
        >
          ☰
        </button>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-[#0a1712]/50" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col overflow-y-auto bg-[#0f2e36] p-5 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[.16em] text-white/60">Administration</span>
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-lg border border-white/20 text-lg"
              >
                ×
              </button>
            </div>
            <div className="mt-6 flex-1">
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <div className="mt-8 grid gap-3 border-t border-white/10 pt-5">
              <Link href="/" onClick={() => setOpen(false)} className="text-xs font-medium text-white/60">
                Voir le site public
              </Link>
              <AdminLogoutButton />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
