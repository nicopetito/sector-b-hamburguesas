import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import ItemForm from "@/components/admin/ItemForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type ItemRow = {
  id: string;
  name: string;
  description: string | null;
  category_id: string;
  includes_fries: boolean;
  featured: boolean;
  active: boolean;
  image_url: string | null;
  display_order: number;
  menu_item_variants: { id: string; label: string; price: number; display_order: number }[];
};

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: rawItem } = await supabase
    .from("menu_items")
    .select("*, menu_item_variants(*)")
    .eq("id", id)
    .single();

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("active", true)
    .order("display_order");

  const item = rawItem as ItemRow | null;
  if (!item) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/menu" className="text-text-secondary hover:text-text-primary">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Editar — {item.name}</h1>
      </div>
      <ItemForm categories={categories ?? []} item={item} />
    </div>
  );
}
