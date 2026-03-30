"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { formatPrice, MENU_ITEMS } from "@/lib/menu-data";
import { useCart } from "@/context/CartContext";

// ── Datos del combo ────────────────────────────────────────────────────────────

const BURGERS = [
  { id: "la-sector",    name: "La Sector",       price: 19500, emoji: "🥩" },
  { id: "crispy-2",     name: "Crispy 2.0",       price: 19500, emoji: "🥓" },
  { id: "chimicream",   name: "ChimiCream",       price: 19500, emoji: "🌶️" },
  { id: "barrio",       name: "Barrio Burger",    price: 19500, emoji: "🧅" },
  { id: "tasty",        name: "Tasty",            price: 19500, emoji: "🧀" },
  { id: "cheeseburger", name: "Cheeseburger",     price: 17500, emoji: "🍔" },
];

const PAPAS = [
  { id: "standard",          name: "Papas incluidas",       note: "Estándar — van con la burger",   price: 0 },
  { id: "papas-tasty-bacon",  name: "Papas Tasty y Bacon",  note: "Upgrade +$4.500",               price: 4500 },
  { id: "papas-sector-bacon", name: "Papas Sector y Bacon", note: "Upgrade +$4.500",               price: 4500 },
  { id: "papas-cheddar-bacon",name: "Papas Cheddar y Bacon",note: "Upgrade +$4.500",               price: 4500 },
];

type BebidaTab = "gaseosas" | "cervezas" | "tragos";

// IDs deben coincidir exactamente con MENU_ITEMS para el lookup del carrito
const BEBIDAS: Record<BebidaTab, { id: string; name: string; price: number }[]> = {
  gaseosas: [
    { id: "coca-cola",   name: "Coca Cola",      price: 5000 },
    { id: "sprite-fanta",name: "Sprite / Fanta", price: 5000 },
    { id: "agua",        name: "Agua",           price: 4500 },
    { id: "aquarius",    name: "Aquarius",       price: 4500 },
  ],
  cervezas: [
    { id: "ronton-draft",name: "Ronton Draft",   price: 8000 },
    { id: "heineken",    name: "Heineken",       price: 6500 },
    { id: "imperial",    name: "Imperial",       price: 6500 },
    { id: "stella-artois",name:"Stella Sin TACC",price: 9500 },
  ],
  tragos: [
    { id: "fernet",      name: "Fernet",         price: 9000 },
    { id: "gin-blu-tonic",name:"Gin Blu Tonic",  price: 9000 },
    { id: "loly-fresh",  name: "Loly Fresh",     price: 9500 },
    { id: "citric-smash",name: "Citric Smash",   price: 12000 },
  ],
};

const BEBIDA_TAB_LABELS: Record<BebidaTab, string> = {
  gaseosas: "Gaseosas",
  cervezas: "Cervezas",
  tragos: "Tragos",
};

// ── Component ─────────────────────────────────────────────────────────────────

type SelectedBurger  = (typeof BURGERS)[number] | null;
type SelectedPapas   = (typeof PAPAS)[number] | null;
type SelectedBebida  = { id: string; name: string; price: number } | null;

// ── Animación burger CSS-only ─────────────────────────────────────────────────

function BurgerVisual({
  hasBurger,
  hasPapasUpgrade,
  hasBebida,
  complete,
}: {
  hasBurger: boolean;
  hasPapasUpgrade: boolean;
  hasBebida: boolean;
  complete: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center select-none py-4 transition-all duration-700 ${
        complete ? "drop-shadow-[0_0_16px_rgba(0,201,177,0.35)]" : ""
      }`}
    >
      {/* ─ Burger stack ─ */}
      <div className="flex flex-col items-center gap-[3px]">

        {/* Bun top */}
        <div
          className={`h-7 w-[72px] transition-all duration-500 ${
            hasBurger ? "bg-amber-500" : "bg-white/10"
          }`}
          style={{ borderRadius: "40px 40px 3px 3px" }}
        />

        {/* Semillas (3 puntitos) */}
        <div
          className={`-mt-5 mb-1 flex gap-1.5 transition-all duration-300 ${
            hasBurger ? "opacity-60" : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-1 w-1.5 rounded-full bg-amber-200" />
          ))}
        </div>

        {/* Lechuga / toppings — verde — upgrade */}
        <div
          className={`h-[5px] w-[78px] rounded-sm bg-green-600 transition-all duration-500 ${
            hasPapasUpgrade
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        />

        {/* Cheddar — amarillo, más ancho que el pan */}
        <div
          className={`h-[6px] w-[82px] bg-yellow-400 transition-all duration-500 delay-75 ${
            hasBurger
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
          style={{ borderRadius: "1px 1px 0 0" }}
        />

        {/* Patty — sube desde abajo */}
        <div
          className={`h-5 w-[68px] bg-stone-700 transition-all duration-500 delay-[150ms] ${
            hasBurger
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
          style={{ borderRadius: "3px" }}
        />

        {/* Bun bottom */}
        <div
          className={`h-[18px] w-[72px] transition-all duration-500 ${
            hasBurger ? "bg-amber-600" : "bg-white/10"
          }`}
          style={{ borderRadius: "3px 3px 28px 28px" }}
        />
      </div>

      {/* ─ Bebida ─ */}
      <div
        className={`mt-4 transition-all duration-500 ${
          hasBebida ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {/* Vaso / lata estilizada */}
        <div
          className="flex flex-col items-center gap-px"
          style={{ width: 22 }}
        >
          {/* Tapa */}
          <div
            className="h-1 w-full bg-turquesa/50"
            style={{ borderRadius: "4px 4px 0 0" }}
          />
          {/* Cuerpo */}
          <div
            className="h-8 w-full border border-turquesa/30 bg-turquesa/20"
            style={{ borderRadius: "0 0 5px 5px" }}
          >
            {/* Reflejo */}
            <div className="mx-auto mt-1.5 h-full w-[3px] rounded-full bg-turquesa/20" />
          </div>
        </div>
      </div>

      {/* Label "completo" */}
      <p
        className={`mt-3 text-[0.58rem] font-bold uppercase tracking-widest transition-all duration-500 ${
          complete ? "opacity-100 text-turquesa" : "opacity-0 text-transparent"
        }`}
      >
        Combo listo
      </p>
    </div>
  );
}

function StepHeader({
  number,
  title,
  selected,
  done,
}: {
  number: number;
  title: string;
  selected?: string;
  done: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
          done
            ? "bg-turquesa text-bg-base"
            : "bg-white/10 text-white/50"
        }`}
      >
        {done ? <Check size={14} strokeWidth={3} /> : number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Paso {number}
        </p>
        <p className="font-bold text-text-primary">{title}</p>
      </div>
      {done && selected && (
        <span className="shrink-0 rounded-full bg-turquesa/15 px-3 py-1 text-xs font-semibold text-turquesa">
          {selected}
        </span>
      )}
    </div>
  );
}

export default function ComboBuilder() {
  const { addItem } = useCart();
  const [burger, setBurger]   = useState<SelectedBurger>(null);
  const [papas, setPapas]     = useState<SelectedPapas>(null);
  const [bebida, setBebida]   = useState<SelectedBebida>(null);
  const [bebidaTab, setBebidaTab] = useState<BebidaTab>("gaseosas");
  const [added, setAdded] = useState(false);

  const total = (burger?.price ?? 0) + (papas?.price ?? 0) + (bebida?.price ?? 0);
  const allSelected = burger && papas && bebida;

  const handleAgregar = () => {
    if (!allSelected) return;

    // Burger — variante Simple
    const burgerItem = MENU_ITEMS.find((m) => m.id === burger.id);
    if (burgerItem) {
      const simpleVariant = burgerItem.variants.find((v) => v.label === "Simple") ?? burgerItem.variants[0];
      addItem(burgerItem, simpleVariant);
    }

    // Papas upgrade (solo si eligió uno distinto al estándar)
    if (papas.id !== "standard") {
      const papasItem = MENU_ITEMS.find((m) => m.id === papas.id);
      if (papasItem) addItem(papasItem, papasItem.variants[0]);
    }

    // Bebida
    const bebidaItem = MENU_ITEMS.find((m) => m.id === bebida.id);
    if (bebidaItem) addItem(bebidaItem, bebidaItem.variants[0]);

    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setBurger(null);
      setPapas(null);
      setBebida(null);
    }, 2000);
  };

  const resetCombo = () => {
    setBurger(null);
    setPapas(null);
    setBebida(null);
    setAdded(false);
  };

  return (
    <section className="bg-bg-card py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-12">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
            Configurá el tuyo
          </p>
          <h2
            className="mt-2 font-black uppercase leading-none text-text-primary"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Armá tu combo
          </h2>
          <p className="mt-3 max-w-sm text-sm text-text-secondary">
            Elegí tu burger, el upgrade de papas y algo para tomar. Te mandamos el pedido listo a WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

          {/* ── Steps ── */}
          <div className="flex flex-col gap-4">

            {/* Step 1: Burger */}
            <div className="rounded-2xl border border-white/10 bg-bg-base p-5">
              <StepHeader
                number={1}
                title="Elegí tu burger"
                selected={burger?.name}
                done={!!burger}
              />
              <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {BURGERS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setBurger(b);
                      if (!papas) setPapas(PAPAS[0]);
                    }}
                    className={`flex flex-col gap-1 rounded-xl border p-3 text-left transition-all active:scale-[0.98] ${
                      burger?.id === b.id
                        ? "border-turquesa bg-turquesa/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <span className="text-xl">{b.emoji}</span>
                    <span
                      className={`text-xs font-bold uppercase leading-tight ${
                        burger?.id === b.id ? "text-turquesa" : "text-text-primary"
                      }`}
                      style={{ fontFamily: "var(--font-barlow, var(--font-inter))" }}
                    >
                      {b.name}
                    </span>
                    <span className="text-[0.65rem] text-text-secondary">
                      {formatPrice(b.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Papas */}
            <div
              className={`rounded-2xl border p-5 transition-colors ${
                burger
                  ? "border-white/10 bg-bg-base"
                  : "border-white/5 bg-bg-base/50 opacity-50 pointer-events-none"
              }`}
            >
              <StepHeader
                number={2}
                title="¿Cómo querés las papas?"
                selected={papas?.id === "standard" ? "Incluidas" : papas?.name}
                done={!!papas}
              />
              <div className="mt-5 flex flex-col gap-2">
                {PAPAS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPapas(p)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all active:scale-[0.99] ${
                      papas?.id === p.id
                        ? "border-turquesa bg-turquesa/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-sm font-bold uppercase ${
                          papas?.id === p.id ? "text-turquesa" : "text-text-primary"
                        }`}
                        style={{ fontFamily: "var(--font-barlow, var(--font-inter))" }}
                      >
                        {p.name}
                      </p>
                      <p className="text-xs text-text-secondary">{p.note}</p>
                    </div>
                    {papas?.id === p.id && (
                      <Check size={16} className="shrink-0 text-turquesa" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Bebida */}
            <div
              className={`rounded-2xl border p-5 transition-colors ${
                burger && papas
                  ? "border-white/10 bg-bg-base"
                  : "border-white/5 bg-bg-base/50 opacity-50 pointer-events-none"
              }`}
            >
              <StepHeader
                number={3}
                title="Elegí tu bebida"
                selected={bebida?.name}
                done={!!bebida}
              />

              {/* Tabs */}
              <div className="mt-5 flex gap-1 rounded-xl bg-white/5 p-1">
                {(Object.keys(BEBIDA_TAB_LABELS) as BebidaTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setBebidaTab(tab)}
                    className={`flex-1 rounded-lg py-1.5 text-xs font-semibold transition-colors ${
                      bebidaTab === tab
                        ? "bg-bg-card text-text-primary shadow"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    {BEBIDA_TAB_LABELS[tab]}
                  </button>
                ))}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {BEBIDAS[bebidaTab].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBebida(b)}
                    className={`flex flex-col gap-0.5 rounded-xl border px-3 py-2.5 text-left transition-all active:scale-[0.98] ${
                      bebida?.id === b.id
                        ? "border-turquesa bg-turquesa/10"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold uppercase leading-tight ${
                        bebida?.id === b.id ? "text-turquesa" : "text-text-primary"
                      }`}
                      style={{ fontFamily: "var(--font-barlow, var(--font-inter))" }}
                    >
                      {b.name}
                    </span>
                    <span className="text-[0.65rem] text-text-secondary">
                      {formatPrice(b.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* ── Resumen / CTA ── */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-white/10 bg-bg-base p-6">
              <BurgerVisual
                hasBurger={!!burger}
                hasPapasUpgrade={!!papas && papas.id !== "standard"}
                hasBebida={!!bebida}
                complete={!!allSelected}
              />

              <div className="my-2 h-px bg-white/8" />

              <p className="mb-4 mt-4 text-xs font-semibold uppercase tracking-widest text-white/30">
                Tu combo
              </p>

              <div className="flex flex-col gap-3">
                {/* Burger */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      burger ? "bg-turquesa/20 text-turquesa" : "bg-white/5 text-white/20"
                    }`}
                  >
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate text-sm font-semibold ${burger ? "text-text-primary" : "text-white/20"}`}>
                      {burger ? burger.name : "Sin elegir"}
                    </p>
                    {burger && (
                      <p className="text-xs text-text-secondary">{formatPrice(burger.price)}</p>
                    )}
                  </div>
                </div>

                {/* Papas */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      papas ? "bg-turquesa/20 text-turquesa" : "bg-white/5 text-white/20"
                    }`}
                  >
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate text-sm font-semibold ${papas ? "text-text-primary" : "text-white/20"}`}>
                      {papas ? papas.name : "Sin elegir"}
                    </p>
                    {papas && (
                      <p className="text-xs text-text-secondary">
                        {papas.price === 0 ? "Incluidas" : `+${formatPrice(papas.price)}`}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bebida */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                      bebida ? "bg-turquesa/20 text-turquesa" : "bg-white/5 text-white/20"
                    }`}
                  >
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`truncate text-sm font-semibold ${bebida ? "text-text-primary" : "text-white/20"}`}>
                      {bebida ? bebida.name : "Sin elegir"}
                    </p>
                    {bebida && (
                      <p className="text-xs text-text-secondary">{formatPrice(bebida.price)}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Separador */}
              <div className="my-5 h-px bg-white/10" />

              {/* Total */}
              <div className="flex items-baseline justify-between mb-5">
                <span className="text-sm text-text-secondary">Total estimado</span>
                <span
                  className="font-black text-text-primary"
                  style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "1.5rem" }}
                >
                  {allSelected ? formatPrice(total) : "—"}
                </span>
              </div>

              {/* CTA */}
              <button
                onClick={handleAgregar}
                disabled={!allSelected || added}
                className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-all active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-30 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-turquesa text-bg-base hover:bg-turquesa-dark"
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} strokeWidth={3} />
                    Combo agregado al pedido
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    Agregar combo al carrito
                  </>
                )}
              </button>
              <p className="mt-2 text-center text-xs text-text-secondary">
                {added ? "Revisá tu pedido en la barra de abajo" : `Total estimado: ${allSelected ? formatPrice(total) : "—"}`}
              </p>

              {/* Reset */}
              {(burger || papas || bebida) && (
                <button
                  onClick={resetCombo}
                  className="mt-3 w-full text-xs text-white/25 transition-colors hover:text-white/50 underline-offset-2 hover:underline"
                >
                  Empezar de nuevo
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
