"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import OpenStatusBadge from "@/components/ui/OpenStatusBadge";

const WHATSAPP_URL = "https://wa.me/5492255628886";

const YAMENU_URL = "https://www.yamenu.online/sectorb";

const navLinks = [
  { label: "Menú",      href: "/#menu" },
  { label: "Promos",    href: "/#promos" },
  { label: "Nosotros",  href: "/#experiencia" },
  { label: "Ubicación", href: "/#ubicacion" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-bg-base/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span
            className="font-black uppercase leading-none tracking-tight text-turquesa"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "1.35rem",
              letterSpacing: "-0.02em",
            }}
          >
            SECTOR B
          </span>
          <OpenStatusBadge showClosed={false} />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.8rem] font-medium text-text-secondary/70 transition-colors hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={YAMENU_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-3 py-1 text-[0.72rem] font-semibold text-text-secondary/60 transition-colors hover:border-white/30 hover:text-text-primary"
          >
            yaMenu ↗
          </a>
        </nav>

        {/* ── CTA desktop ── */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-turquesa px-5 py-2 text-sm font-bold text-bg-base transition-colors hover:bg-turquesa-dark md:block"
        >
          Pedir ahora
        </a>

        {/* ── Mobile toggle ── */}
        <button
          className="text-text-primary md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div className="border-t border-white/10 bg-bg-base px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-base text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 rounded-full bg-turquesa px-5 py-3 text-center text-sm font-bold text-bg-base"
              onClick={() => setOpen(false)}
            >
              Pedir ahora
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
