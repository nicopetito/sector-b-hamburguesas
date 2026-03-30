const CELL_COUNT = 6;

function IgIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function InstagramSection() {
  const cells = Array.from({ length: CELL_COUNT }, (_, i) => i);

  return (
    <section className="bg-bg-card py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header row ── */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/8">
              <IgIcon size={16} className="text-white/50" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none text-text-primary">
                @sectorb.gesell
              </p>
              <p className="mt-0.5 text-[0.68rem] text-text-secondary/60">
                Seguinos en Instagram
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/sectorb.gesell/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white/15 px-5 py-2 text-xs font-bold uppercase tracking-widest text-text-secondary/70 transition-colors hover:border-white/30 hover:text-text-primary sm:block"
          >
            Ver perfil →
          </a>
        </div>

        {/* ── Grid de fotos / placeholders ── */}
        <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
          {cells.map((i) => (
            <a
              key={i}
              href="https://www.instagram.com/sectorb.gesell/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-xl border border-white/[0.06] bg-bg-base transition-all hover:border-white/20"
              style={{ aspectRatio: "1/1" }}
              aria-label="Ver Instagram de Sector B"
            >
              {/* Fondo con gradiente sutil por celda */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background: `radial-gradient(ellipse at ${i % 2 === 0 ? "30% 30%" : "70% 70%"}, rgba(0,201,177,0.04) 0%, transparent 70%)`,
                }}
              />

              {/* Ícono centrado */}
              <div className="flex h-full items-center justify-center">
                <IgIcon size={14} className="text-white/[0.12] transition-all group-hover:text-white/25" />
              </div>

              {/* Overlay hover */}
              <div className="absolute inset-0 bg-turquesa/0 transition-all group-hover:bg-turquesa/5" />
            </a>
          ))}
        </div>

        {/* CTA mobile */}
        <div className="mt-5 flex justify-center sm:hidden">
          <a
            href="https://www.instagram.com/sectorb.gesell/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-text-secondary/70 transition-colors hover:border-white/30 hover:text-text-primary"
          >
            Ver perfil →
          </a>
        </div>

      </div>
    </section>
  );
}
