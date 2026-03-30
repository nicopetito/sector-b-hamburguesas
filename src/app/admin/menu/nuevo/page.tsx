import { createClient } from "@/lib/supabase/server";
import ItemForm from "@/components/admin/ItemForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function NewMenuItemPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("id, name")
    .eq("active", true)
    .order("display_order");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/menu" className="text-text-secondary hover:text-text-primary">
          <ChevronLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-text-primary">Nuevo producto</h1>
      </div>
      <ItemForm categories={categories ?? []} />
    </div>
  );
}
