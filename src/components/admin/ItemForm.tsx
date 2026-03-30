"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Variant = { id?: string; label: string; price: number; display_order: number };

type Category = { id: string; name: string };

interface Props {
  categories: Category[];
  item?: {
    id: string;
    name: string;
    description: string | null;
    category_id: string;
    includes_fries: boolean;
    featured: boolean;
    active: boolean;
    image_url: string | null;
    display_order: number;
    menu_item_variants: Variant[];
  };
}

export default function ItemForm({ categories, item }: Props) {
  const router = useRouter();
  const isEdit = !!item;

  const [name, setName] = useState(item?.name ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [categoryId, setCategoryId] = useState(item?.category_id ?? "");
  const [includesFries, setIncludesFries] = useState(item?.includes_fries ?? false);
  const [featured, setFeatured] = useState(item?.featured ?? false);
  const [active, setActive] = useState(item?.active ?? true);
  const [imageUrl, setImageUrl] = useState(item?.image_url ?? "");
  const [variants, setVariants] = useState<Variant[]>(
    item?.menu_item_variants ?? [{ label: "Único", price: 0, display_order: 0 }]
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  function addVariant() {
    setVariants((prev) => [
      ...prev,
      { label: "", price: 0, display_order: prev.length },
    ]);
  }

  function removeVariant(index: number) {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  }

  function updateVariant(index: number, field: keyof Variant, value: string | number) {
    setVariants((prev) =>
      prev.map((v, i) => (i === index ? { ...v, [field]: value } : v))
    );
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop();
    const path = `menu/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (error) {
      toast.error("Error al subir la imagen");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Imagen subida");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim()) { toast.error("El nombre es obligatorio"); return; }
    if (!categoryId) { toast.error("Seleccioná una categoría"); return; }
    if (variants.length === 0) { toast.error("Agregá al menos una variante"); return; }
    if (variants.some((v) => !v.label.trim())) { toast.error("Completá el nombre de todas las variantes"); return; }
    if (variants.some((v) => v.price <= 0)) { toast.error("El precio de cada variante debe ser mayor a 0"); return; }

    setSaving(true);
    const supabase = createClient();

    if (isEdit) {
      const { error } = await supabase
        .from("menu_items")
        .update({ name, description, category_id: categoryId, includes_fries: includesFries, featured, active, image_url: imageUrl || null })
        .eq("id", item.id);

      if (error) { toast.error("Error al guardar"); setSaving(false); return; }

      // Upsert variantes
      await supabase.from("menu_item_variants").delete().eq("item_id", item.id);
      await supabase.from("menu_item_variants").insert(
        variants.map((v, i) => ({ item_id: item.id, label: v.label, price: v.price, display_order: i }))
      );
    } else {
      const { data: newItem, error } = await supabase
        .from("menu_items")
        .insert({ name, description, category_id: categoryId, includes_fries: includesFries, featured, active, image_url: imageUrl || null })
        .select()
        .single();

      if (error || !newItem) { toast.error("Error al crear producto"); setSaving(false); return; }

      await supabase.from("menu_item_variants").insert(
        variants.map((v, i) => ({ item_id: newItem.id, label: v.label, price: v.price, display_order: i }))
      );
    }

    await fetch("/api/revalidate", { method: "POST" }).catch(() => null);
    toast.success(isEdit ? "Producto actualizado" : "Producto creado");
    router.push("/admin/menu");
    router.refresh();
  }

  async function handleDelete() {
    if (!isEdit) return;
    if (!confirm(`¿Eliminar "${name}"?`)) return;

    const supabase = createClient();
    await supabase.from("menu_items").delete().eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" }).catch(() => null);
    toast.success("Producto eliminado");
    router.push("/admin/menu");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
      {/* Nombre */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="La Sector" />
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ingredientes separados por coma" rows={3} />
      </div>

      {/* Categoría */}
      <div className="flex flex-col gap-1.5">
        <Label>Categoría</Label>
        <Select value={categoryId} onValueChange={(v) => setCategoryId(v ?? "")}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Imagen */}
      <div className="flex flex-col gap-1.5">
        <Label>Imagen</Label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => { if (e.target.files?.[0]) uploadImage(e.target.files[0]); }}
          className="text-sm text-text-secondary"
          disabled={uploading}
        />
        {imageUrl && (
          <p className="text-xs text-turquesa truncate">{imageUrl}</p>
        )}
        {uploading && <p className="text-xs text-text-secondary">Subiendo...</p>}
      </div>

      {/* Variantes */}
      <div className="flex flex-col gap-3">
        <Label>Variantes y precios</Label>
        {variants.map((v, i) => (
          <div key={i} className="flex items-center gap-3">
            <Input
              value={v.label}
              onChange={(e) => updateVariant(i, "label", e.target.value)}
              placeholder="Simple / Doble / Único"
              className="w-36"
            />
            <Input
              type="number"
              value={v.price}
              onChange={(e) => updateVariant(i, "price", Number(e.target.value))}
              placeholder="0"
              className="w-28"
            />
            <span className="text-xs text-text-secondary">$</span>
            {variants.length > 1 && (
              <button type="button" onClick={() => removeVariant(i)} className="text-text-secondary hover:text-destructive">
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addVariant} className="flex w-fit items-center gap-1 text-sm text-turquesa hover:text-turquesa-dark">
          <Plus size={14} /> Agregar variante
        </button>
      </div>

      {/* Switches */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Label>Incluye papas fritas</Label>
          <Switch checked={includesFries} onCheckedChange={setIncludesFries} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Producto destacado</Label>
          <Switch checked={featured} onCheckedChange={setFeatured} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Activo en el menú</Label>
          <Switch checked={active} onCheckedChange={setActive} />
        </div>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={saving || uploading} className="bg-turquesa text-bg-base hover:bg-turquesa-dark">
          {saving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()} className="text-text-secondary">
          Cancelar
        </Button>
        {isEdit && (
          <Button type="button" variant="ghost" onClick={handleDelete} className="ml-auto text-destructive hover:text-destructive">
            <Trash2 size={16} className="mr-1" /> Eliminar
          </Button>
        )}
      </div>
    </form>
  );
}
