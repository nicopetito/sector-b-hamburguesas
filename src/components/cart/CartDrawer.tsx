"use client";

import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, MENU_ITEMS } from "@/lib/menu-data";

const UPSELL_IDS = ["extra-cheddar", "extra-bacon", "extra-patty", "extra-huevo"];
const UPSELL_ITEMS = MENU_ITEMS.filter((m) => UPSELL_IDS.includes(m.id));

interface Props {
  onClose: () => void;
}

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>["items"],
  totalPrice: number,
  name: string,
  address: string,
  notes: string
): string {
  const lines = items.map((i) => {
    const variantLabel =
      i.item.variants.length > 1 ? ` (${i.variant.label})` : "";
    return `- ${i.quantity}x ${i.item.name}${variantLabel} ${formatPrice(i.variant.price * i.quantity)}`;
  });

  const greeting = name.trim() ? `Hola, soy ${name.trim()}!` : "Hola!";

  const parts = [
    `${greeting} Mi pedido:`,
    "",
    ...lines,
    "",
    `Total: ${formatPrice(totalPrice)}`,
  ];

  if (address.trim()) {
    parts.push("", `Dirección: ${address.trim()}`);
  }

  if (notes.trim()) {
    parts.push("", `Aclaraciones: ${notes.trim()}`);
  }

  return parts.join("\n");
}

export default function CartDrawer({ onClose }: Props) {
  const { items, totalPrice, addItem, updateQuantity, removeItem, clearCart } =
    useCart();
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
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

  const handlePedir = () => {
    const message = buildWhatsAppMessage(items, totalPrice, name, address, notes);
    const url = `https://wa.me/5492255628886?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[85svh] flex-col rounded-t-3xl bg-bg-card md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-full md:max-w-md md:rounded-none md:rounded-l-3xl"
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle mobile */}
        <div className="mx-auto mt-3 h-1 w-10 shrink-0 rounded-full bg-white/20 md:hidden" />

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-turquesa" />
            <h2 className="text-lg font-bold text-text-primary">Tu pedido</h2>
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-text-secondary underline-offset-2 hover:text-text-primary hover:underline"
              >
                Vaciar
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-full bg-white/10 p-1.5 text-text-secondary transition-colors hover:bg-white/20 hover:text-text-primary"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <ShoppingBag size={40} className="text-white/20" />
              <p className="text-sm text-text-secondary">
                Todavía no agregaste nada.
                <br />
                Explorá el menú y elegí lo tuyo.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((cartItem) => {
                const key = `${cartItem.item.id}-${cartItem.variant.label}`;
                const variantLabel =
                  cartItem.item.variants.length > 1
                    ? cartItem.variant.label
                    : null;

                return (
                  <div
                    key={key}
                    className="flex items-center gap-3 rounded-xl bg-bg-base p-3"
                  >
                    {/* Info */}
                    <div className="flex-1 overflow-hidden">
                      <p
                        className="truncate font-bold uppercase text-text-primary"
                        style={{
                          fontFamily: "var(--font-barlow, var(--font-inter))",
                          fontSize: "0.95rem",
                        }}
                      >
                        {cartItem.item.name}
                      </p>
                      {variantLabel && (
                        <p className="text-xs text-text-secondary">
                          {variantLabel}
                        </p>
                      )}
                      <p className="mt-0.5 text-sm font-semibold text-turquesa">
                        {formatPrice(cartItem.variant.price * cartItem.quantity)}
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            cartItem.item.id,
                            cartItem.variant.label,
                            -1
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-text-primary transition-colors hover:bg-white/20"
                        aria-label="Quitar uno"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-bold text-text-primary">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            cartItem.item.id,
                            cartItem.variant.label,
                            1
                          )
                        }
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-text-primary transition-colors hover:bg-white/20"
                        aria-label="Agregar uno"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Eliminar */}
                    <button
                      onClick={() =>
                        removeItem(cartItem.item.id, cartItem.variant.label)
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-red-500/20 hover:text-red-400"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upsell extras */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-white/5 px-5 py-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/25">
              ¿Querés agregar algo más?
            </p>
            <div className="flex flex-wrap gap-2">
              {UPSELL_ITEMS.map((extra) => (
                <button
                  key={extra.id}
                  onClick={() => addItem(extra, extra.variants[0])}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-bg-base px-3 py-1.5 text-xs font-semibold text-text-secondary transition-all hover:border-turquesa/40 hover:text-turquesa active:scale-[0.97]"
                >
                  <span className="text-turquesa font-bold">+</span>
                  {extra.name}
                  <span className="text-white/35">{formatPrice(extra.variants[0].price)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Footer con total y CTA */}
        {items.length > 0 && (
          <div className="shrink-0 border-t border-white/10 px-5 py-4">
            {/* Nombre y dirección */}
            <div className="mb-3 grid grid-cols-2 gap-2">
              <div>
                <label
                  htmlFor="cart-name"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-text-secondary"
                >
                  Tu nombre
                </label>
                <input
                  id="cart-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Nico"
                  className="w-full rounded-xl border border-white/10 bg-bg-base px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none focus:border-turquesa/50 focus:ring-1 focus:ring-turquesa/30"
                />
              </div>
              <div>
                <label
                  htmlFor="cart-address"
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-text-secondary"
                >
                  Dirección
                </label>
                <input
                  id="cart-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej: Av. 3 #140"
                  className="w-full rounded-xl border border-white/10 bg-bg-base px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none focus:border-turquesa/50 focus:ring-1 focus:ring-turquesa/30"
                />
              </div>
            </div>

            {/* Aclaraciones */}
            <div className="mb-4">
              <label
                htmlFor="cart-notes"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-text-secondary"
              >
                Aclaraciones
              </label>
              <textarea
                id="cart-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Sin cebolla, punto de cocción, alergias..."
                rows={2}
                className="w-full resize-none rounded-xl border border-white/10 bg-bg-base px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none focus:border-turquesa/50 focus:ring-1 focus:ring-turquesa/30"
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-text-secondary">Total estimado</span>
              <span className="text-xl font-bold text-text-primary">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <button
              onClick={handlePedir}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-turquesa py-4 text-sm font-bold text-bg-base transition-colors hover:bg-turquesa-dark active:scale-[0.99]"
            >
              Terminar y pedir por WhatsApp
            </button>
            <p className="mt-2 text-center text-xs text-text-secondary">
              Te va a abrir WhatsApp con el pedido listo para enviar
            </p>
          </div>
        )}
      </div>
    </>
  );
}
