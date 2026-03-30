import { Truck, Clock, CreditCard, Star } from "lucide-react";
import OpenStatusBadge from "@/components/ui/OpenStatusBadge";

const WHATSAPP_URL =
  "https://wa.me/5492255628886?text=Hola!%20Quiero%20hacer%20un%20pedido";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* ── Background: video con fallback a imagen poster ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/burgers/lasector.png"
          className="absolute inset-0 h-full w-full object-cover object-center md:object-right"
          style={{ filter: "brightness(0.55)" }}
          suppressHydrationWarning
        >
          {/* Agregar /videos/hero.mp4 para activar el video — el poster se muestra hasta entonces */}
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* Desktop: oscuro a la izquierda, transparente a la derecha → burger visible */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-bg-base/95 via-bg-base/75 to-bg-base/10 md:block" />
        {/* Mobile: overlay uniforme */}
        <div className="absolute inset-0 bg-bg-base/75 md:hidden" />
        {/* Bottom fade universal */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-base to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-10 pb-12 md:pt-14 md:pb-16">
        <div className="max-w-3xl">

          {/* ── Wordmark ── */}
          <p
            className="mb-3 font-black uppercase text-turquesa"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
              letterSpacing: "0.22em",
            }}
          >
            Sector B
          </p>

          {/* Eyebrow */}
          <p className="mb-4 text-[0.62rem] font-bold uppercase tracking-[0.35em] text-white/35">
            Villa Gesell &nbsp;·&nbsp; Buenos Aires
          </p>

          {/* ── Headline ── */}
          <h1
            className="font-black uppercase text-white"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(3rem, 8vw, 9rem)",
              lineHeight: "0.86",
              letterSpacing: "-0.025em",
            }}
          >
            <span className="block">Smashed.</span>
            <span className="block text-accent-yellow">Cargadas.</span>
            <span className="block">Listas.</span>
          </h1>

          {/* Descriptor */}
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50 md:text-base">
            Smash burgers de autor. Blend propio, papas incluidas y delivery
            sin cargo a toda Villa&nbsp;Gesell.
          </p>

          {/* ── CTAs ── */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="#menu"
              className="flex items-center justify-center rounded-full bg-turquesa px-8 py-4 text-sm font-bold text-bg-base transition-colors hover:bg-turquesa-dark"
            >
              Ver el menú
            </a>
            <div className="flex flex-col gap-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white transition-colors hover:border-white/40 hover:bg-white/5"
              >
                Pedir por WhatsApp
              </a>
              <p className="text-center text-[0.58rem] font-semibold tracking-wide text-white/25">
                Respondemos en menos de 5 min
              </p>
            </div>
          </div>

          {/* ── Trust strip ── */}
          <div className="mt-7 flex flex-wrap items-center gap-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/30">
            <span className="flex items-center gap-1.5">
              <Truck size={11} strokeWidth={2.5} />
              Delivery sin cargo
            </span>
            <span className="text-white/15" aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={11} strokeWidth={2.5} />
              Lun–Dom 11–00hs
            </span>
            <span className="text-white/15" aria-hidden>·</span>
            <span className="flex items-center gap-1.5">
              <CreditCard size={11} strokeWidth={2.5} />
              Efectivo · Transf · MP
            </span>
            <span className="text-white/15" aria-hidden>·</span>
            <span className="flex items-center gap-1.5 text-accent-yellow/70">
              <Star size={11} strokeWidth={0} fill="currentColor" />
              4.8 en Google · 120+ reseñas
            </span>
            <OpenStatusBadge />
          </div>

        </div>
      </div>
    </section>
  );
}
