import { CATEGORIES, MENU_ITEMS } from "@/lib/menu-data";
import type { MenuItem } from "@/lib/menu-data";
import MenuTabs from "@/components/menu/MenuTabs";

export default function MenuSection() {
  const itemsByCategory = CATEGORIES.reduce<Record<string, MenuItem[]>>(
    (acc, cat) => {
      acc[cat.id] = MENU_ITEMS.filter((item) => item.category === cat.id);
      return acc;
    },
    {}
  );

  return (
    <section id="menu" className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
              Todo el menú
            </p>
            <h2
              className="mt-2 font-black uppercase leading-none text-text-primary"
              style={{
                fontFamily: "var(--font-barlow, var(--font-inter))",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              ¿Qué vas a pedir?
            </h2>
          </div>
          <a
            href="https://www.yamenu.online/sectorb"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-white/15 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-widest text-text-secondary/60 transition-colors hover:border-white/30 hover:text-text-primary"
          >
            Ver en yaMenu →
          </a>
        </div>

        <MenuTabs categories={CATEGORIES} itemsByCategory={itemsByCategory} />
      </div>
    </section>
  );
}
