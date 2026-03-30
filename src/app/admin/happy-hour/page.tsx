import { createClient } from "@/lib/supabase/server";
import HappyHourForm from "@/components/admin/HappyHourForm";

export default async function AdminHappyHourPage() {
  const supabase = await createClient();
  const { data: config } = await supabase
    .from("happy_hour_config")
    .select("*")
    .single();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Happy Hour</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Configurá el horario y días del happy hour.
        </p>
      </div>
      <HappyHourForm config={config ?? null} />
    </div>
  );
}
