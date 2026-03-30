import { Zap, Beer, Gamepad2, Users, PawPrint } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Rápido",
    description: "Smash burgers en minutos. Sin tiempos de espera interminables.",
  },
  {
    icon: Beer,
    title: "Bar completo",
    description: "Cervezas tiradas, tragos de autor y happy hour todos los días.",
  },
  {
    icon: Gamepad2,
    title: "Juegos",
    description: "Mesa de pool, metegol y más para la noche que se alarga.",
  },
  {
    icon: Users,
    title: "Salón propio",
    description: "Espacio amplio para grupos. Reservas por WhatsApp.",
  },
  {
    icon: PawPrint,
    title: "Pet friendly",
    description: "Venís con tu perro, te esperamos. Mascotas bienvenidas.",
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="bg-bg-card py-14 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-8 text-center md:mb-14 md:text-left">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
            Por qué Sector B
          </p>
          <h2
            className="mt-2 font-black uppercase leading-none text-text-primary"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            La experiencia
          </h2>
        </div>

        {/* ── Feature list — Yucca-style: líneas horizontales, espaciado generoso ── */}
        <div className="divide-y divide-white/10">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="flex items-center gap-4 py-5 first:pt-2 last:pb-0 active:bg-white/5 sm:gap-6 sm:py-7 sm:first:pt-0"
            >
              {/* Ícono */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5">
                <Icon size={20} className="text-accent-yellow" strokeWidth={2} />
              </div>

              {/* Texto */}
              <div className="flex-1">
                <h3
                  className="font-black uppercase leading-none text-text-primary"
                  style={{
                    fontFamily: "var(--font-barlow, var(--font-inter))",
                    fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {title}
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-text-secondary">
                  {description}
                </p>
              </div>

              {/* Número decorativo */}
              <span
                className="hidden shrink-0 font-black text-white/10 md:block"
                style={{
                  fontFamily: "var(--font-barlow, var(--font-inter))",
                  fontSize: "3.5rem",
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
