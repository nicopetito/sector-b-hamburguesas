"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, CheckCircle } from "lucide-react";
import type { MenuItem, Variant } from "@/lib/menu-data";
import { formatPrice } from "@/lib/menu-data";
import { useCart } from "@/context/CartContext";

interface Props {
  item: MenuItem;
  onClose: () => void;
}

export default function ItemModal({ item, onClose }: Props) {
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    item.variants[0]
  );
  const [added, setAdded] = useState(false);
  const touchStartY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.changedTouches[0].clientY - touchStartY.current > 80) onClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleAdd = () => {
    addItem(item, selectedVariant);
    setAdded(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[90svh] overflow-y-auto rounded-t-3xl bg-bg-card md:left-1/2 md:top-1/2 md:bottom-auto md:right-auto md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={item.name}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle mobile */}
        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-white/20 md:hidden" />

        {/* Imagen */}
        {item.image && (
          <div className="relative h-52 w-full overflow-hidden rounded-t-3xl md:rounded-t-2xl">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card/60 to-transparent" />
          </div>
        )}

        {/* Contenido */}
        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          <h2
            className="text-2xl font-bold uppercase text-text-primary"
            style={{ fontFamily: "var(--font-barlow, var(--font-inter))" }}
          >
            {item.name}
          </h2>

          {item.description && (
            <p className="mt-2 text-sm text-text-secondary">{item.description}</p>
          )}

          {item.includesFries && (
            <p className="mt-3 text-xs text-turquesa">✓ Incluye papas fritas</p>
          )}

          {/* Variantes de precio */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-secondary">
              {item.variants.length > 1 ? "Elegí el tamaño" : "Precio"}
            </p>
            <div className="flex flex-wrap gap-3">
              {item.variants.map((v) => {
                const isSelected = selectedVariant.label === v.label;
                return (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariant(v)}
                    className={`flex flex-col items-center rounded-xl border px-5 py-3 transition-colors ${
                      isSelected
                        ? "border-turquesa bg-turquesa/10 text-turquesa"
                        : "border-white/10 bg-bg-base text-text-primary hover:border-white/30"
                    }`}
                  >
                    <span className="text-xs opacity-70">{v.label}</span>
                    <span className="mt-0.5 text-base font-bold">
                      {formatPrice(v.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA Agregar al carrito */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all active:scale-[0.99] ${
              added
                ? "bg-green-500 text-white"
                : "bg-turquesa text-bg-base hover:bg-turquesa-dark"
            }`}
          >
            {added ? (
              <>
                <CheckCircle size={18} />
                Agregado al pedido
              </>
            ) : (
              `Agregar — ${formatPrice(selectedVariant.price)}`
            )}
          </button>
        </div>
      </div>
    </>
  );
}
