import Image from "next/image";

const GALLERY_CELLS = [
  { label: "El bar",     objectPosition: "20% center" },
  { label: "El salón",   objectPosition: "50% center" },
  { label: "Los juegos", objectPosition: "80% center" },
];

export default function GallerySection() {
  return (
    <section className="bg-bg-base py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">

        {/* ── Header ── */}
        <div className="mb-10 text-center md:text-left">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/25">
            El lugar
          </p>
          <h2
            className="mt-2 font-black uppercase leading-none text-text-primary"
            style={{
              fontFamily: "var(--font-barlow, var(--font-inter))",
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Así es Sector&nbsp;B
          </h2>
        </div>

        {/* ── Layout ── */}
        <div className="flex flex-col gap-3">

          {/* Foto principal — cinematic */}
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: "21/9" }}
          >
            <Image
              src="/images/hero/fotolinda-original.png"
              alt="Interior Sector B — Villa Gesell"
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-center"
            />
            {/* Gradient bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-5 left-6">
              <p
                className="font-black uppercase text-white/70"
                style={{
                  fontFamily: "var(--font-barlow, var(--font-inter))",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                  letterSpacing: "0.08em",
                }}
              >
                Av. 3 #140 · Villa Gesell
              </p>
            </div>
          </div>

          {/* Celdas placeholder — donde irían fotos del bar, salón y juegos */}
          <div className="grid grid-cols-3 gap-3">
            {GALLERY_CELLS.map(({ label, objectPosition }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-xl"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src="/images/hero/fotolinda-original.png"
                  alt={`Sector B — ${label}`}
                  fill
                  sizes="(max-width: 768px) 33vw, 400px"
                  className="object-cover"
                  style={{ objectPosition }}
                />
                {/* Gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p
                  className="absolute bottom-3 left-4 font-black uppercase text-white/70"
                  style={{
                    fontFamily: "var(--font-barlow, var(--font-inter))",
                    fontSize: "clamp(0.7rem, 1.5vw, 0.9rem)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
