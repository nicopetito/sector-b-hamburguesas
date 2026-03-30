import { createClient } from "@/lib/supabase/server";
import PromosList from "@/components/admin/PromosList";

export default async function AdminPromosPage() {
  const supabase = await createClient();
  const { data: promos } = await supabase
    .from("promos")
    .select("*")
    .order("active", { ascending: false });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Promos</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Activá o desactivá promos en tiempo real.
        </p>
      </div>
      <PromosList promos={promos ?? []} />
    </div>
  );
}
