"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, UtensilsCrossed, Tag, Clock, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menú", icon: UtensilsCrossed, exact: false },
  { href: "/admin/promos", label: "Promos", icon: Tag, exact: false },
  { href: "/admin/happy-hour", label: "Happy Hour", icon: Clock, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-white/10 bg-bg-card">
      {/* Brand */}
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/" className="text-lg font-bold text-turquesa" style={{ fontFamily: "var(--font-barlow, var(--font-inter))" }}>
          SECTOR B
        </Link>
        <p className="mt-0.5 text-xs text-text-secondary">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              isActive(href, exact)
                ? "bg-turquesa/10 text-turquesa"
                : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
            }`}
          >
            <Icon size={18} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
        >
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
