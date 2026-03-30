const ITEMS = [
  "SMASH BLEND",
  "DOBLE CHEDDAR",
  "BACON JAM",
  "ONION RINGS",
  "MAYO AHUMADA",
  "PAPAS INCLUIDAS",
  "DELIVERY SIN CARGO",
  "VILLA GESELL",
  "SMASH BURGERS",
  "HAPPY HOUR DIARIO",
  "CRISPY ONION",
  "BLEND PROPIO",
];

const REPEATED = [...ITEMS, ...ITEMS];

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-bg-card py-3.5">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 28s linear infinite" }}
        aria-hidden="true"
      >
        {REPEATED.map((item, i) => (
          <span
            key={i}
            className="mx-5 text-[0.62rem] font-bold uppercase tracking-[0.25em] text-white/30"
          >
            {item}
            <span className="ml-5 text-accent-yellow/50">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
