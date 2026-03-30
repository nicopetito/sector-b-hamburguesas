"use client";

import { useState } from "react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const DAYS = [
  { value: 0, label: "Dom" },
  { value: 1, label: "Lun" },
  { value: 2, label: "Mar" },
  { value: 3, label: "Mié" },
  { value: 4, label: "Jue" },
  { value: 5, label: "Vie" },
  { value: 6, label: "Sáb" },
];

type Config = {
  id: string;
  start_time: string;
  end_time: string;
  days_of_week: number[];
  description: string | null;
  active: boolean;
};

export default function HappyHourForm({ config }: { config: Config | null }) {
  const [startTime, setStartTime] = useState(config?.start_time?.slice(0, 5) ?? "18:00");
  const [endTime, setEndTime] = useState(config?.end_time?.slice(0, 5) ?? "21:00");
  const [days, setDays] = useState<number[]>(config?.days_of_week ?? [0, 1, 2, 3, 4, 5, 6]);
  const [description, setDescription] = useState(config?.description ?? "2x1 en cervezas tiradas y tragos de la carta.");
  const [active, setActive] = useState(config?.active ?? true);
  const [saving, setSaving] = useState(false);

  function toggleDay(day: number) {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (days.length === 0) { toast.error("Seleccioná al menos un día"); return; }
    if (startTime >= endTime) { toast.error("El horario de fin debe ser posterior al de inicio"); return; }
    setSaving(true);

    const supabase = createClient();
    const payload = {
      start_time: startTime,
      end_time: endTime,
      days_of_week: days,
      description,
      active,
    };

    if (config?.id) {
      await supabase.from("happy_hour_config").update(payload).eq("id", config.id);
    } else {
      await supabase.from("happy_hour_config").insert(payload);
    }

    await fetch("/api/revalidate", { method: "POST" }).catch(() => null);
    toast.success("Happy hour actualizado");
    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-6">
      {/* Activo */}
      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-bg-card p-4">
        <div>
          <p className="font-medium text-text-primary">Activo</p>
          <p className="text-xs text-text-secondary">Mostrar el bloque en el sitio</p>
        </div>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>

      {/* Horario */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="start">Desde</Label>
          <Input id="start" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="end">Hasta</Label>
          <Input id="end" type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        </div>
      </div>

      {/* Días */}
      <div className="flex flex-col gap-2">
        <Label>Días</Label>
        <div className="flex flex-wrap gap-2">
          {DAYS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleDay(value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                days.includes(value)
                  ? "bg-turquesa text-bg-base"
                  : "border border-white/10 text-text-secondary hover:border-white/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Descripción visible en el sitio</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
      </div>

      <Button type="submit" disabled={saving} className="w-fit bg-turquesa text-bg-base hover:bg-turquesa-dark">
        {saving ? "Guardando..." : "Guardar configuración"}
      </Button>
    </form>
  );
}
