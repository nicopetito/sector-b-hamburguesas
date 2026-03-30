import { Star, ExternalLink } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Martina G.",
    location: "Villa Gesell",
    stars: 5,
    text: "La Sector es una locura. El bacon jam con la mayo ahumada... no volvés a comer otra burger. Delivery rápido y caliente, increíble.",
    date: "Hace 2 semanas",
  },
  {
    name: "Lucas P.",
    location: "Buenos Aires",
    stars: 5,
    text: "Fui en verano y se convirtió en el plan fijo de toda la temporada. La Crispy 2.0 con las papas de la casa, 10/10. El salón está muy bueno también.",
    date: "Hace 1 mes",
  },
  {
    name: "Sofía R.",
    location: "Villa Gesell",
    stars: 5,
    text: "El smash está perfecto de punto. Se nota que usan ingredientes de calidad. Ya somos habitués del happy hour, las mejores tardes.",
    date: "Hace 3 semanas",
  },
  {
    name: "Tomás V.",
    location: "Mar del Plata",
    stars: 5,
    text: "Vine de visita y me mandé la Tasty. Esa salsa es adictiva. Los tequeños de entrada también. Vuelvo el finde que pueda.",
    date: "Hace 1 semana",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="fill-accent-yellow text-accent-yellow" />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
              Lo que dicen
            </p>
            <h2
              className="mt-2 font-black uppercase leading-none text-text-primary"
              style={{
                fontFamily: "var(--font-barlow, var(--font-inter))",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Reseñas
            </h2>
          </div>

          {/* Google aggregate badge */}
          <div className="flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-bg-card px-5 py-4">
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent-yellow text-accent-yellow" />
                ))}
              </div>
              <p
                className="font-black leading-none text-text-primary"
                style={{ fontFamily: "var(--font-barlow, var(--font-inter))", fontSize: "1.6rem" }}
              >
                4.8
              </p>
              <p className="text-[0.62rem] font-semibold uppercase tracking-wide text-white/30">
                120+ reseñas
              </p>
            </div>
            <div className="h-12 w-px bg-white/10" />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-text-secondary">Calificado en</p>
              <div className="flex items-center gap-1.5">
                {/* Google "G" icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-sm font-bold text-text-primary">Google</span>
              </div>
              <a
                href="https://g.co/kgs/sectorb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[0.6rem] text-turquesa transition-opacity hover:opacity-70"
              >
                Ver todas
                <ExternalLink size={9} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-bg-card p-6 transition-colors hover:border-white/15"
            >
              <StarRating count={t.stars} />

              <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-end justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-text-primary">{t.name}</p>
                  <p className="text-[0.65rem] text-white/30">{t.location}</p>
                </div>
                <span className="shrink-0 text-[0.58rem] text-white/20">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
