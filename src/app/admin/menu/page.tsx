import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import MenuItemToggle from "@/components/admin/MenuItemToggle";

type ItemRow = {
  id: string;
  name: string;
  featured: boolean;
  active: boolean;
  categories: { name: string } | null;
  menu_item_variants: { id: string }[];
};

export default async function AdminMenuPage() {
  const supabase = await createClient();

  const { data: rawItems } = await supabase
    .from("menu_items")
    .select("id, name, featured, active, categories(name), menu_item_variants(id)")
    .order("display_order");

  const items = (rawItems ?? []) as unknown as ItemRow[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Menú</h1>
          <p className="mt-1 text-sm text-text-secondary">
            {items.length} productos en total
          </p>
        </div>
        <Link
          href="/admin/menu/nuevo"
          className="rounded-full bg-turquesa px-5 py-2 text-sm font-semibold text-bg-base transition-colors hover:bg-turquesa-dark"
        >
          + Nuevo producto
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-bg-card p-8 text-center text-sm text-text-secondary">
            No hay productos todavía.{" "}
            <Link href="/admin/menu/nuevo" className="text-turquesa hover:underline">
              Agregar el primero
            </Link>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-bg-card px-4 py-3"
            >
              <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="truncate font-medium text-text-primary">
                    {item.name}
                  </span>
                  {item.featured && (
                    <Badge variant="outline" className="border-turquesa/40 text-turquesa text-xs">
                      Destacado
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-text-secondary">
                  {item.categories?.name ?? "Sin categoría"} ·{" "}
                  {item.menu_item_variants.length} variante/s
                </span>
              </div>

              <MenuItemToggle id={item.id} active={item.active} />

              <Link
                href={`/admin/menu/${item.id}`}
                className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                Editar
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
