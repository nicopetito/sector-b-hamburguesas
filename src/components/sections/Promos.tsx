import { formatPrice } from "@/lib/menu-data";

type Promo = {
  id: string;
  title: string;
  description: string;
  price: number;
  badge: string;
  condition?: string;
};

const PROMOS: Promo[] = [
  {
    id: "cheese-doble",
    title: "Cheeseburger Doble",
    description: "Smash blend, 4x cheddar.",
    price: 5000,
    badge: "PROMO",
    condition: "Sin papas · No combinable",
  },
  {
    id: "tasty-doble",
    title: "Tasty Doble",
    description: "Smash blend, 4x cheddar, salsa tasty, lechuga, tomate, cebolla morada.",
    price: 5000,
    badge: "PROMO",
    condition: "Sin papas · No combinable",
  },
  {
    id: "american-doble",
    title: "American Doble",
    description: "Doble patty.",
    price: 5000,
    badge: "PROMO",
    condition: "Sin papas · No combinable",
  },
];

export default function Promos() {
  return (
    <section id="promos" className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
            Activas ahora
          </p>
          <h2
            className="mt-2 font-black uppercase leading-none text-text-primary"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Promos
          </h2>
        </div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {PROMOS.map((promo) => (
            <article
              key={promo.id}
              className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-bg-card p-6"
            >
              {/* Badge — sticker rotation (Decathlon style) */}
              <span className="inline-block w-fit -rotate-1 rounded bg-accent-yellow px-2.5 py-0.5 text-[0.65rem] font-black uppercase tracking-wider text-bg-base">
                {promo.badge}
              </span>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-2">
                <h3
                  className="font-black uppercase leading-tight text-text-primary"
                  style={{
                    fontFamily: "var(--font-barlow, var(--font-inter))",
                    fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {promo.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {promo.description}
                </p>
              </div>

              {/* Precio y CTA */}
              <div className="flex items-end justify-between pt-2 border-t border-white/10">
                <div>
                  <p className="text-2xl font-black text-accent-yellow">
                    {formatPrice(promo.price)}
                  </p>
                  {promo.condition && (
                    <p className="mt-0.5 text-[0.6rem] font-medium text-text-secondary/50">
                      {promo.condition}
                    </p>
                  )}
                </div>
                <a
                  href={`https://wa.me/5492255628886?text=Hola!%20Quiero%20la%20promo%20${encodeURIComponent(promo.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-text-primary transition-colors hover:bg-white/5"
                >
                  La quiero
                </a>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
