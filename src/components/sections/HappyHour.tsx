"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const HAPPY_HOUR_START = 18;
const HAPPY_HOUR_END   = 21;
const HAPPY_HOUR_DAYS  = [0, 1, 2, 3, 4, 5, 6];

const DRINKS = [
  {
    name: "Ronton Draft",
    type: "Cerveza tirada",
    price: "$8.000",
    accent: "#e8b84b",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=480&h=600&fit=crop&q=85",
  },
  {
    name: "Heineken",
    type: "Cerveza",
    price: "$6.500",
    accent: "#3a8c3a",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=480&h=600&fit=crop&q=85",
  },
  {
    name: "Gin Blu Tonic",
    type: "Cocktail",
    price: "$9.000",
    accent: "#5a9fd4",
    image: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=480&h=600&fit=crop&q=85",
  },
  {
    name: "Loly Fresh",
    type: "Cocktail",
    price: "$9.500",
    accent: "#d45a8c",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=480&h=600&fit=crop&q=85",
  },
  {
    name: "Citric Smash",
    type: "Cocktail",
    price: "$12.000",
    accent: "#f5a623",
    image: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=480&h=600&fit=crop&q=85",
  },
  {
    name: "Fernet",
    type: "Trago",
    price: "$9.000",
    accent: "#8b6914",
    image: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=480&h=600&fit=crop&q=85",
  },
];

function isHappyHourActive(): boolean {
  const now  = new Date();
  const day  = now.getDay();
  const hour = now.getHours();
  return HAPPY_HOUR_DAYS.includes(day) && hour >= HAPPY_HOUR_START && hour < HAPPY_HOUR_END;
}

export default function HappyHour() {
  const [active, setActive]   = useState(false);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused]   = useState(false);
  const [dir, setDir]         = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((next: number, direction: "next" | "prev") => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = () => goTo((current - 1 + DRINKS.length) % DRINKS.length, "prev");
  const next = useCallback(() => goTo((current + 1) % DRINKS.length, "next"), [current, goTo]);

  useEffect(() => {
    setActive(isHappyHourActive());
    const interval = setInterval(() => setActive(isHappyHourActive()), 60_000);
    return () => clearInterval(interval);
  }, []);

  // Auto-avance cada 3s
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const drink = DRINKS[current];

  return (
    <section className="relative overflow-hidden bg-bg-card">

      {/* Glow activo */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(ellipse 50% 100% at 75% 50%, rgba(0,201,177,0.08) 0%, transparent 70%)" }}
      />

      {/* Logo watermark — entre el texto y la card */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 items-center opacity-[0.05] md:flex">
        <Image
          src="/images/logo/logo.png"
          alt=""
          width={420}
          height={420}
          className="object-contain select-none"
          aria-hidden="true"
        />
      </div>

      {/* Línea superior */}
      <div className={`h-px w-full transition-colors duration-700 ${active ? "bg-turquesa/30" : "bg-white/[0.07]"}`} />

      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-center md:gap-12">

          {/* ── Columna izquierda: info ── */}
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">Todos los días</p>
              <span className={`h-px w-6 ${active ? "bg-turquesa/40" : "bg-white/15"}`} />
              {active ? (
                <span className="flex items-center gap-1.5 rounded-full bg-turquesa/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-turquesa ring-1 ring-turquesa/30">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-turquesa" />
                  Activo ahora
                </span>
              ) : (
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-white/20">Inactivo</span>
              )}
            </div>

            <h2
              className="font-black uppercase leading-[0.9] text-text-primary"
              style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "clamp(3.5rem, 8vw, 6.5rem)", letterSpacing: "-0.03em" }}
            >
              Happy<br />Hour
            </h2>

            {/* Horario */}
            <div className="mt-5 flex items-center gap-3">
              <span
                className={`font-black uppercase transition-colors duration-500 ${active ? "text-turquesa" : "text-white/20"}`}
                style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "0.04em" }}
              >
                {HAPPY_HOUR_START}:00
              </span>
              <span className={`text-lg font-light transition-colors duration-500 ${active ? "text-turquesa/50" : "text-white/15"}`}>—</span>
              <span
                className={`font-black uppercase transition-colors duration-500 ${active ? "text-turquesa" : "text-white/20"}`}
                style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", letterSpacing: "0.04em" }}
              >
                {HAPPY_HOUR_END}:00 hs
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-secondary">
              2×1 en cervezas tiradas y tragos de la carta. Vení temprano y aprovechá.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Cervezas tiradas", "Tragos de la carta"].map((label) => (
                <span
                  key={label}
                  className={`rounded-full border px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider transition-all duration-500 ${
                    active ? "border-turquesa/30 bg-turquesa/10 text-turquesa" : "border-white/10 bg-white/[0.04] text-white/25"
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>

            {active && (
              <a
                href="https://wa.me/5492255628886?text=Hola!%20Quiero%20aprovechar%20el%20happy%20hour"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-turquesa px-8 py-4 text-sm font-bold text-bg-base shadow-[0_0_30px_rgba(0,201,177,0.35)] transition-all hover:bg-turquesa-dark hover:shadow-[0_0_45px_rgba(0,201,177,0.5)]"
              >
                Aprovechar ahora
              </a>
            )}
          </div>

          {/* ── Columna derecha: carrusel de bebidas ── */}
          <div
            className="flex flex-col items-center gap-5"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* Card de bebida */}
            <div
              className="relative h-80 w-56 overflow-hidden rounded-2xl md:h-96 md:w-64"
              style={{ boxShadow: `0 20px 60px ${drink.accent}25` }}
            >
              {/* Foto — full bleed */}
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  animating
                    ? dir === "next" ? "-translate-x-6 opacity-0" : "translate-x-6 opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                <Image
                  src={drink.image}
                  alt={drink.name}
                  fill
                  sizes="(max-width: 768px) 224px, 256px"
                  className="object-cover"
                />
              </div>

              {/* Gradiente inferior para leer el texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Badge 2×1 — arriba a la derecha, GRANDE */}
              <div
                className={`absolute right-3 top-3 flex flex-col items-center justify-center rounded-xl px-3 py-2 transition-all duration-700 ${
                  active
                    ? "bg-turquesa text-bg-base shadow-[0_0_20px_rgba(0,201,177,0.5)]"
                    : "bg-white/10 text-white backdrop-blur-sm"
                }`}
              >
                <span
                  className="font-black leading-none"
                  style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "1.6rem", letterSpacing: "-0.03em" }}
                >
                  2×1
                </span>
                <span className="text-[0.5rem] font-bold uppercase tracking-widest opacity-70">
                  En bebidas
                </span>
              </div>

              {/* Info overlay abajo */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                  animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
              >
                <span
                  className="rounded-full px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: drink.accent + "30", color: drink.accent }}
                >
                  {drink.type}
                </span>
                <p
                  className="mt-1.5 font-black uppercase leading-tight text-white"
                  style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "1.2rem", letterSpacing: "-0.01em" }}
                >
                  {drink.name}
                </p>
                <p className="mt-0.5 font-bold text-accent-yellow" style={{ fontSize: "0.9rem" }}>
                  {drink.price}
                </p>
              </div>
            </div>

            {/* Controles */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/40 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Anterior"
              >
                <ChevronLeft size={15} />
              </button>

              <div className="flex gap-1.5">
                {DRINKS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? "next" : "prev")}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? "w-5 bg-turquesa" : "w-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                    aria-label={`Ir a ${DRINKS[i].name}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/40 transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
                aria-label="Siguiente"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Línea inferior */}
      <div className={`h-px w-full transition-colors duration-700 ${active ? "bg-turquesa/30" : "bg-white/[0.07]"}`} />
    </section>
  );
}
