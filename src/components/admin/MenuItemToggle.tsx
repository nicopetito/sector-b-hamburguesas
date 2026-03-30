"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface Props {
  id: string;
  active: boolean;
}

export default function MenuItemToggle({ id, active }: Props) {
  const [checked, setChecked] = useState(active);
  const [loading, setLoading] = useState(false);

  async function toggle(value: boolean) {
    setLoading(true);
    setChecked(value);
    const supabase = createClient();
    const { error } = await supabase
      .from("menu_items")
      .update({ active: value })
      .eq("id", id);

    if (error) {
      setChecked(!value);
      toast.error("No se pudo actualizar");
    } else {
      toast.success(value ? "Producto activado" : "Producto desactivado");
      // Revalidar ISR
      await fetch("/api/revalidate", { method: "POST" }).catch(() => null);
    }
    setLoading(false);
  }

  return (
    <Switch
      checked={checked}
      onCheckedChange={toggle}
      disabled={loading}
      aria-label="Activar/desactivar producto"
    />
  );
}
