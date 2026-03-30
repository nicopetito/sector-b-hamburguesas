"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFAB from "@/components/layout/WhatsAppFAB";
import MobileStickyBar from "@/components/layout/MobileStickyBar";
import { CartProvider, useCart } from "@/context/CartContext";
import CartBar from "@/components/cart/CartBar";
import CartDrawer from "@/components/cart/CartDrawer";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* FAB solo en desktop cuando el carrito está vacío */}
      {totalItems === 0 && (
        <span className="hidden md:contents">
          <WhatsAppFAB />
        </span>
      )}

      {/* Barra sticky mobile — aparece al scrollear el hero, solo sin carrito */}
      <MobileStickyBar />

      {/* Barra del carrito */}
      <CartBar onOpen={() => setDrawerOpen(true)} />

      {/* Drawer del carrito */}
      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} />}
    </>
  );
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  );
}
