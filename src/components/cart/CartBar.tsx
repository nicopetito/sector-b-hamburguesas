"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/menu-data";

interface Props {
  onOpen: () => void;
}

export default function CartBar({ onOpen }: Props) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-bg-base/95 p-3 backdrop-blur-md">
      <button
        onClick={onOpen}
        className="flex w-full items-center justify-between rounded-full bg-turquesa px-5 py-3.5 text-bg-base transition-colors hover:bg-turquesa-dark active:scale-[0.99]"
      >
        <span className="flex items-center gap-2 text-sm font-semibold">
          <ShoppingBag size={18} />
          {totalItems} {totalItems === 1 ? "item" : "items"}
        </span>
        <span className="text-sm font-bold">{formatPrice(totalPrice)}</span>
        <span className="text-sm font-semibold">Ver pedido →</span>
      </button>
    </div>
  );
}
