"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { MenuItem, Variant } from "@/lib/menu-data";

export type CartItem = {
  item: MenuItem;
  variant: Variant;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: MenuItem, variant: Variant) => void;
  removeItem: (itemId: string, variantLabel: string) => void;
  updateQuantity: (itemId: string, variantLabel: string, delta: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((item: MenuItem, variant: Variant) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.item.id === item.id && i.variant.label === variant.label
      );
      if (existing) {
        return prev.map((i) =>
          i.item.id === item.id && i.variant.label === variant.label
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { item, variant, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((itemId: string, variantLabel: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.item.id === itemId && i.variant.label === variantLabel)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (itemId: string, variantLabel: string, delta: number) => {
      setItems((prev) =>
        prev
          .map((i) =>
            i.item.id === itemId && i.variant.label === variantLabel
              ? { ...i, quantity: i.quantity + delta }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.variant.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
