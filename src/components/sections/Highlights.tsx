import Image from "next/image";
import { Camera } from "lucide-react";
import { getFeatured, formatPrice } from "@/lib/menu-data";

const BADGES = ["01", "02", "03"];

export default function Highlights() {
  const featured = getFeatured();

  return (
    <section id="highlights" className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
              Las imperdibles
            </p>
            <h2
              className="mt-2 font-black uppercase leading-none text-text-primary"
              style={{
                fontFamily: "var(--font-barlow, var(--font-inter))",
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Burgers estrella
            </h2>
          </div>
          <a
            href="#menu"
            className="hidden text-[0.7rem] font-semibold uppercase tracking-widest text-white/30 transition-colors hover:text-text-primary md:block"
          >
            Ver todas →
          </a>
        </div>

        {/* ── Cards ── */}
        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
          {featured.map((item, idx) => (
            <article
              key={item.id}
              className="group relative min-w-[78vw] flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-bg-card transition-all duration-500 ease-out sm:min-w-0
                         hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,201,177,0.18),0_0_0_1px_rgba(0,201,177,0.25)]"
              style={{ aspectRatio: "3/4" }}
            >
              {/* Full-bleed image */}
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 78vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-bg-card">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Camera size={16} className="text-white/20" strokeWidth={1.5} />
                  </div>
                  <p className="text-[0.55rem] font-semibold uppercase tracking-[0.15em] text-white/15">
                    Foto próximamente
                  </p>
                </div>
              )}

              {/* Gradient — se aclara en hover para revelar más imagen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/85 group-hover:via-black/10" />

              {/* Badge numérico top-left */}
              <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:border-turquesa/60 group-hover:bg-turquesa/20">
                <span
                  className="font-black text-white/40 transition-colors duration-300 group-hover:text-turquesa"
                  style={{
                    fontFamily: "var(--font-barlow, var(--font-inter))",
                    fontSize: "0.6rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {BADGES[idx]}
                </span>
              </div>

              {/* ── Overlay content — sube en hover ── */}
              <div className="absolute bottom-0 left-0 right-0 translate-y-1 p-5 transition-transform duration-500 ease-out group-hover:translate-y-0">

                {/* Descripción: oculta → visible en hover */}
                <p className="mb-2 line-clamp-2 translate-y-2 text-[0.68rem] leading-relaxed text-white/0 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:text-white/55 group-hover:opacity-100">
                  {item.description}
                </p>

                <h3
                  className="font-black uppercase leading-none text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                  style={{
                    fontFamily: "var(--font-barlow, var(--font-inter))",
                    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.name}
                </h3>

                {item.includesFries && (
                  <p className="mt-1.5 text-[0.58rem] font-semibold uppercase tracking-widest text-turquesa/60 transition-colors duration-300 group-hover:text-turquesa/80">
                    ✓ Incluye papas fritas
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[0.58rem] font-bold uppercase tracking-widest text-white/35">
                      Desde
                    </p>
                    <p className="text-xl font-black text-accent-yellow drop-shadow-[0_0_12px_rgba(245,200,66,0.4)] transition-all duration-300 group-hover:drop-shadow-[0_0_20px_rgba(245,200,66,0.65)]">
                      {formatPrice(item.variants[0].price)}
                    </p>
                  </div>
                  <a
                    href={`https://wa.me/5492255628886?text=Hola!%20Quiero%20pedir%20una%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-turquesa px-4 py-2 text-[0.7rem] font-bold uppercase tracking-wide text-bg-base opacity-0 shadow-[0_0_20px_rgba(0,201,177,0.4)] transition-all duration-300
                               group-hover:opacity-100 group-hover:shadow-[0_0_30px_rgba(0,201,177,0.6)]
                               hover:bg-turquesa-dark"
                  >
                    Pedir este
                  </a>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
