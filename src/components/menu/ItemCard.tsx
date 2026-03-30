import Image from "next/image";
import { UtensilsCrossed } from "lucide-react";
import type { MenuItem } from "@/lib/menu-data";
import { formatPrice } from "@/lib/menu-data";

interface Props {
  item: MenuItem;
  onClick: () => void;
}

export default function ItemCard({ item, onClick }: Props) {
  const basePrice = item.variants[0].price;
  const hasVariants = item.variants.length > 1;

  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl bg-bg-card p-3.5 text-left transition-all hover:bg-white/5 active:scale-[0.99]"
    >
      {/* Imagen */}
      <div className="relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-bg-base">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="72px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-transparent">
            <UtensilsCrossed size={18} className="text-white/15" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-0.5 overflow-hidden">
        <p
          className="truncate font-black uppercase leading-tight text-text-primary"
          style={{
            fontFamily: "var(--font-barlow, var(--font-inter))",
            fontSize: "1.05rem",
            letterSpacing: "-0.01em",
          }}
        >
          {item.name}
        </p>
        {item.description && (
          <p className="truncate text-xs leading-relaxed text-text-secondary/70">
            {item.description}
          </p>
        )}
        {item.includesFries && (
          <p className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-white/25">
            ✓ Con papas
          </p>
        )}
      </div>

      {/* Precio */}
      <div className="shrink-0 text-right">
        {hasVariants && (
          <p className="text-[0.58rem] font-semibold uppercase tracking-widest text-text-secondary/50">
            Desde
          </p>
        )}
        <p className="font-bold text-text-primary">{formatPrice(basePrice)}</p>
      </div>
    </button>
  );
}
