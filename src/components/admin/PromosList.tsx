"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type Promo = {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  badge_text: string | null;
  active: boolean;
  expires_at: string | null;
};

export default function PromosList({ promos: initial }: { promos: Promo[] }) {
  const [promos, setPromos] = useState(initial);

  async function toggle(id: string, value: boolean) {
    setPromos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: value } : p))
    );
    const supabase = createClient();
    const { error } = await supabase
      .from("promos")
      .update({ active: value })
      .eq("id", id);

    if (error) {
      setPromos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, active: !value } : p))
      );
      toast.error("Error al actualizar");
    } else {
      toast.success(value ? "Promo activada" : "Promo desactivada");
      await fetch("/api/revalidate", { method: "POST" }).catch(() => null);
    }
  }

  if (promos.length === 0) {
    return (
      <p className="text-sm text-text-secondary">No hay promos cargadas todavía.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {promos.map((promo) => (
        <div
          key={promo.id}
          className="flex items-center gap-4 rounded-xl border border-white/10 bg-bg-card px-4 py-3"
        >
          <div className="flex flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-text-primary">{promo.title}</span>
              {promo.badge_text && (
                <Badge variant="outline" className="border-accent-yellow/40 text-accent-yellow text-xs">
                  {promo.badge_text}
                </Badge>
              )}
            </div>
            {promo.description && (
              <span className="text-xs text-text-secondary">{promo.description}</span>
            )}
            {promo.price && (
              <span className="text-sm font-bold text-turquesa">
                ${promo.price.toLocaleString("es-AR")}
              </span>
            )}
            {promo.expires_at && (
              <span className="text-xs text-text-secondary/60">
                Vence: {new Date(promo.expires_at).toLocaleDateString("es-AR")}
              </span>
            )}
          </div>
          <Switch
            checked={promo.active}
            onCheckedChange={(v) => toggle(promo.id, v)}
            aria-label={`Activar ${promo.title}`}
          />
        </div>
      ))}
    </div>
  );
}
