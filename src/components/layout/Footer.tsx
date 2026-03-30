import Link from "next/link";
import { Phone } from "lucide-react";

const navLinks = [
  { label: "Menú",      href: "/#menu" },
  { label: "Promos",    href: "/#promos" },
  { label: "Nosotros",  href: "/#experiencia" },
  { label: "Ubicación", href: "/#ubicacion" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-bg-base">
      <div className="mx-auto max-w-6xl px-4 py-16">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">

          {/* ── Brand ── */}
          <div className="flex flex-col gap-3">
            <span
              className="font-black uppercase leading-none tracking-tight text-text-primary"
              style={{
                fontFamily: "var(--font-barlow, var(--font-inter))",
                fontSize: "1.5rem",
                letterSpacing: "-0.02em",
              }}
            >
              SECTOR B
            </span>
            <p className="text-sm leading-relaxed text-text-secondary">
              Smash burgers artesanales
              <br />
              Av. 3 #140, Villa Gesell
            </p>
            <a
              href="tel:+5492255628886"
              className="mt-1 flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <Phone size={13} className="text-white/30" />
              +54 2255 628886
            </a>
          </div>

          {/* ── Nav ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white/30">
              Navegación
            </p>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Info ── */}
          <div className="flex flex-col gap-4">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white/30">
              Horario
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Lunes a Domingo
              <br />
              11:00 a 00:00 hs
            </p>
            <a
              href="https://www.instagram.com/sectorb.gesell/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              @sectorb.gesell
            </a>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white/25 sm:flex-row">
          <span>© {new Date().getFullYear()} Sector B</span>
          <span>Villa Gesell · Buenos Aires</span>
        </div>

      </div>
    </footer>
  );
}
