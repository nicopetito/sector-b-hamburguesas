"use client";

import { useState, useRef } from "react";
import type { MenuItem, Category } from "@/lib/menu-data";
import ItemCard from "./ItemCard";
import ItemModal from "./ItemModal";

interface Props {
  categories: Category[];
  itemsByCategory: Record<string, MenuItem[]>;
}

export default function MenuTabs({ categories, itemsByCategory }: Props) {
  const [activeTab, setActiveTab] = useState<string>(categories[0].id);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  const items = itemsByCategory[activeTab] ?? [];

  return (
    <>
      {/* Tabs sticky */}
      <div
        ref={tabsRef}
        className="sticky top-16 z-30 -mx-4 overflow-x-auto bg-bg-base/95 px-4 pb-0 pt-2 backdrop-blur-md [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-1 border-b border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`shrink-0 rounded-t-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === cat.id
                  ? "border-b-2 border-accent-yellow text-text-primary"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de items */}
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedItem && (
        <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </>
  );
}
