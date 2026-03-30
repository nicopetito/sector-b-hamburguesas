import { createClient } from "@/lib/supabase/server";
import { UtensilsCrossed, Tag, Clock, Eye } from "lucide-react";
import Link from "next/link";

async function getStats() {
  const supabase = await createClient();

  const [itemsRes, promosRes, happyHourRes] = await Promise.all([
    supabase.from("menu_items").select("id, active", { count: "exact" }),
    supabase.from("promos").select("id, active", { count: "exact" }),
    supabase.from("happy_hour_config").select("active").single(),
  ]);

  const items = (itemsRes.data ?? []) as { id: string; active: boolean }[];
  const promos = (promosRes.data ?? []) as { id: string; active: boolean }[];
  const hhConfig = happyHourRes.data as { active: boolean } | null;

  const totalItems = items.length;
  const activeItems = items.filter((i) => i.active).length;
  const activePromos = promos.filter((p) => p.active).length;
  const happyHourActive = hhConfig?.active ?? false;

  return { totalItems, activeItems, activePromos, happyHourActive };
}

export default async function AdminDashboard() {
  const stats = await getStats().catch(() => ({
    totalItems: 0,
    activeItems: 0,
    activePromos: 0,
    happyHourActive: false,
  }));

  const cards = [
    {
      label: "Items en el menú",
      value: `${stats.activeItems} / ${stats.totalItems}`,
      sublabel: "activos",
      icon: UtensilsCrossed,
      href: "/admin/menu",
      color: "text-turquesa",
    },
    {
      label: "Promos activas",
      value: stats.activePromos,
      sublabel: "en curso",
      icon: Tag,
      href: "/admin/promos",
      color: "text-accent-yellow",
    },
    {
      label: "Happy Hour",
      value: stats.happyHourActive ? "Activo" : "Inactivo",
      sublabel: "configuración",
      icon: Clock,
      href: "/admin/happy-hour",
      color: stats.happyHourActive ? "text-turquesa" : "text-text-secondary",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Resumen del estado actual del sitio.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, sublabel, icon: Icon, href, color }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col gap-4 rounded-xl border border-white/10 bg-bg-card p-5 transition-colors hover:border-white/20"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">{label}</p>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="mt-0.5 text-xs text-text-secondary">{sublabel}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Accesos rápidos */}
      <div className="flex flex-col gap-3">
        <p className="text-sm font-semibold text-text-secondary">Accesos rápidos</p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/menu"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-white/20 hover:text-text-primary"
          >
            + Agregar producto
          </Link>
          <Link
            href="/admin/promos"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-white/20 hover:text-text-primary"
          >
            + Nueva promo
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary transition-colors hover:border-white/20 hover:text-text-primary"
          >
            <Eye size={14} />
            Ver el sitio
          </a>
        </div>
      </div>
    </div>
  );
}
