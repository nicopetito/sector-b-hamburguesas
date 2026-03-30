"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Navigation, Map } from "lucide-react";

const INFO = [
  {
    icon: MapPin,
    label: "Dirección",
    content: "Av. 3 #140\nVilla Gesell, Buenos Aires",
  },
  {
    icon: Clock,
    label: "Horario",
    content: "Lunes a Domingo\n11:00 a 00:00 hs",
  },
  {
    icon: Phone,
    label: "Contacto",
    content: "+54 2255 628886",
    href: "tel:+5492255628886",
  },
];

export default function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="ubicacion" className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-10">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
            Dónde estamos
          </p>
          <h2
            className="mt-2 font-black uppercase leading-none text-text-primary"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Ubicación
          </h2>
        </div>

        {/* ── Layout: mapa + info ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Mapa — facade hasta el primer click */}
          <div className="overflow-hidden rounded-2xl" style={{ height: 360 }}>
            {mapLoaded ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5!2d-56.9726!3d-37.2627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE1JzQ1LjciUyA1NsKwNTgnMTMuNCJX!5e0!3m2!1ses!2sar!4v1"
                width="100%"
                height="360"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Sector B — Av. 3 #140, Villa Gesell"
                className="grayscale"
              />
            ) : (
              <button
                onClick={() => setMapLoaded(true)}
                className="relative flex h-full w-full flex-col items-center justify-center gap-5 bg-bg-card transition-colors hover:bg-white/5"
                aria-label="Cargar mapa de Google Maps"
              >
                {/* Grid pattern decorativo */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-turquesa/15 ring-1 ring-turquesa/30">
                    <MapPin size={28} className="text-turquesa" strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-text-primary">Av. 3 #140</p>
                    <p className="text-sm text-text-secondary">Villa Gesell, Buenos Aires</p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-turquesa/30 bg-turquesa/10 px-4 py-2 text-xs font-semibold text-turquesa">
                    <Map size={12} />
                    Ver en mapa
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">

            {/* Lista con separadores */}
            <div className="divide-y divide-white/8">
              {INFO.map(({ icon: Icon, label, content, href }) => (
                <div key={label} className="flex items-start gap-5 py-6 first:pt-0">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                    <Icon size={18} className="text-accent-yellow" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/30">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-sm leading-relaxed text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {content}
                      </a>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-sm leading-relaxed text-text-secondary">
                        {content}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Av.+3+%23140,+Villa+Gesell,+Buenos+Aires"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-turquesa px-6 py-3.5 text-sm font-bold text-bg-base transition-colors hover:bg-turquesa-dark"
              >
                <Navigation size={15} strokeWidth={2.5} />
                Cómo llegar
              </a>
              <a
                href="https://wa.me/5492255628886?text=Hola!%20Quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-text-primary transition-colors hover:border-white/40 hover:bg-white/5"
              >
                WhatsApp
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
