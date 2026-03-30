// Datos del menú — fuente: yaMenu
// Cuando Supabase esté configurado, reemplazar los imports de este archivo
// por el fetch desde lib/supabase/server.ts

export type Variant = { label: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image?: string;
  variants: Variant[];
  includesFries?: boolean;
  featured?: boolean;
  category: "burgers" | "papas" | "gaseosas" | "cervezas" | "tragos" | "extras";
};

export type Category = {
  id: "burgers" | "papas" | "gaseosas" | "cervezas" | "tragos" | "extras";
  label: string;
};

export const CATEGORIES: Category[] = [
  { id: "burgers", label: "Burgers" },
  { id: "papas", label: "Papas & Guarniciones" },
  { id: "gaseosas", label: "Gaseosas" },
  { id: "cervezas", label: "Cervezas" },
  { id: "tragos", label: "Tragos" },
  { id: "extras", label: "Extras" },
];

export const MENU_ITEMS: MenuItem[] = [
  // ── BURGERS ──────────────────────────────────────────────────────────
  {
    id: "la-sector",
    name: "La Sector",
    description: "Smash blend, cheddar, bacon jam, onion rings, lechuga, mayo ahumada",
    image: "/images/burgers/lasector.png",
    includesFries: true,
    featured: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 19500 },
      { label: "Doble", price: 22000 },
      { label: "Triple", price: 24500 },
    ],
  },
  {
    id: "crispy-2",
    name: "Crispy 2.0",
    description: "Smash blend, doble bacon, cheddar, crispy onion, pickles, aioli especial",
    image: "/images/burgers/lacrispy.png",
    includesFries: true,
    featured: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 19500 },
      { label: "Doble", price: 22000 },
      { label: "Triple", price: 24000 },
    ],
  },
  {
    id: "chimicream",
    name: "ChimiCream Burger",
    description: "Smash blend, cheddar, salsa chimicream, morrones asados, panceta",
    image: "/images/burgers/chimicream.png",
    includesFries: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 19500 },
      { label: "Doble", price: 22000 },
      { label: "Triple", price: 24000 },
    ],
  },
  {
    id: "barrio",
    name: "Barrio Burger",
    description: "Smash blend, cheddar, cebolla caramelizada, panceta",
    image: "/images/burgers/barrio.png",
    includesFries: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 19500 },
      { label: "Doble", price: 22000 },
      { label: "Triple", price: 24000 },
    ],
  },
  {
    id: "tasty",
    name: "Tasty",
    description: "Smash blend, 4x cheddar, salsa tasty, lechuga, tomate, cebolla morada",
    image: "/images/burgers/tasty.png",
    includesFries: true,
    featured: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 19500 },
      { label: "Doble", price: 21500 },
      { label: "Triple", price: 23500 },
    ],
  },
  {
    id: "cheeseburger",
    name: "Cheeseburger",
    description: "Smash blend, 4x cheddar",
    image: "/images/burgers/cheese.png",
    includesFries: true,
    category: "burgers",
    variants: [
      { label: "Simple", price: 17500 },
      { label: "Doble", price: 18500 },
      { label: "Triple", price: 19500 },
    ],
  },

  // ── PAPAS & GUARNICIONES ──────────────────────────────────────────────
  {
    id: "papas-fritas",
    name: "Papas fritas 500g",
    description: "Papas fritas crocantes",
    category: "papas",
    variants: [{ label: "Único", price: 6500 }],
  },
  {
    id: "papas-tasty-bacon",
    name: "Papas Tasty y Bacon",
    description: "Papas con salsa tasty y bacon crocante",
    category: "papas",
    variants: [{ label: "Único", price: 16500 }],
  },
  {
    id: "papas-sector-bacon",
    name: "Papas Sector y Bacon",
    description: "Papas con mayo ahumada y bacon",
    category: "papas",
    variants: [{ label: "Único", price: 16500 }],
  },
  {
    id: "papas-cheddar-bacon",
    name: "Papas Cheddar y Bacon",
    description: "Papas con cheddar fundido y bacon",
    category: "papas",
    variants: [{ label: "Único", price: 16500 }],
  },
  {
    id: "aros-cebolla",
    name: "Aros de cebolla",
    description: "Aros de cebolla crocantes",
    category: "papas",
    variants: [{ label: "Único", price: 19300 }],
  },
  {
    id: "tequenos",
    name: "Tequeños",
    description: "Con papas y dips",
    category: "papas",
    variants: [{ label: "Único", price: 16500 }],
  },
  {
    id: "chicken-fingers",
    name: "Chicken Fingers",
    description: "Con papas y dips",
    category: "papas",
    variants: [{ label: "Único", price: 17100 }],
  },
  {
    id: "ensalada-sector",
    name: "Ensalada Sector",
    description: "Ensalada fresca de la casa",
    category: "papas",
    variants: [{ label: "Único", price: 15000 }],
  },

  // ── GASEOSAS ─────────────────────────────────────────────────────────
  {
    id: "coca-cola",
    name: "Coca Cola 500cc",
    description: "Classic / Zero",
    category: "gaseosas",
    variants: [{ label: "Único", price: 5000 }],
  },
  {
    id: "sprite-fanta",
    name: "Sprite / Fanta",
    description: "500cc",
    category: "gaseosas",
    variants: [{ label: "Único", price: 5000 }],
  },
  {
    id: "agua",
    name: "Agua",
    description: "Sin gas / con gas",
    category: "gaseosas",
    variants: [{ label: "Único", price: 4500 }],
  },
  {
    id: "aquarius",
    name: "Aquarius",
    description: "Uva / pera / pomelo / manzana",
    category: "gaseosas",
    variants: [{ label: "Único", price: 4500 }],
  },

  // ── CERVEZAS ─────────────────────────────────────────────────────────
  {
    id: "ronton-draft",
    name: "Ronton Draft",
    description: "Session IPA, Scottish, Cream Ale, Jack Honey, Combi",
    category: "cervezas",
    variants: [
      { label: "Pinta", price: 8000 },
      { label: "Combi", price: 8500 },
    ],
  },
  {
    id: "heineken",
    name: "Heineken",
    description: "Regular / Sin alcohol",
    category: "cervezas",
    variants: [{ label: "Botella", price: 6500 }],
  },
  {
    id: "imperial",
    name: "Imperial",
    description: "IPA, APA, Red, Extra Lager, Cream Stout",
    category: "cervezas",
    variants: [{ label: "Botella", price: 6500 }],
  },
  {
    id: "stella-artois",
    name: "Stella Artois Sin TACC",
    description: "Botella",
    category: "cervezas",
    variants: [{ label: "Botella", price: 9500 }],
  },

  // ── TRAGOS ───────────────────────────────────────────────────────────
  {
    id: "fernet",
    name: "Fernet",
    description: "Fernet con Coca",
    category: "tragos",
    variants: [{ label: "Único", price: 9000 }],
  },
  {
    id: "gin-blu-tonic",
    name: "Gin Blu Tonic",
    description: "Spirito Blu gin, tónica",
    category: "tragos",
    variants: [{ label: "Único", price: 9000 }],
  },
  {
    id: "sernova-orange",
    name: "Sernova Orange",
    description: "Sernova + jugo de naranja",
    category: "tragos",
    variants: [{ label: "Único", price: 8900 }],
  },
  {
    id: "carpano-soda",
    name: "Carpano & Soda",
    description: "Carpano Rosso, soda",
    category: "tragos",
    variants: [{ label: "Único", price: 9000 }],
  },
  {
    id: "carpano-orange",
    name: "Carpano Orange",
    description: "Carpano Rosso, soda, rodaja naranja",
    category: "tragos",
    variants: [{ label: "Único", price: 9000 }],
  },
  {
    id: "loly-fresh",
    name: "Loly Fresh",
    description: "Frutos rojos, Sprite, cereza",
    category: "tragos",
    variants: [{ label: "Único", price: 9500 }],
  },
  {
    id: "apple-candy",
    name: "Apple Candy",
    description: "Pera manzana sweet, Sprite, sweet chili",
    category: "tragos",
    variants: [{ label: "Único", price: 9500 }],
  },
  {
    id: "citric-smash",
    name: "Citric Smash",
    description: "Naranja, pomelo, lima, maracuyá",
    category: "tragos",
    variants: [{ label: "Único", price: 12000 }],
  },

  // ── EXTRAS ───────────────────────────────────────────────────────────
  {
    id: "extra-patty",
    name: "Extra patty",
    description: "Patty de smash blend",
    category: "extras",
    variants: [{ label: "Único", price: 4000 }],
  },
  {
    id: "extra-cheddar",
    name: "Extra cheddar x2",
    description: "",
    category: "extras",
    variants: [{ label: "Único", price: 4000 }],
  },
  {
    id: "extra-bacon",
    name: "Extra bacon",
    description: "",
    category: "extras",
    variants: [{ label: "Único", price: 4000 }],
  },
  {
    id: "extra-huevo",
    name: "Extra huevo",
    description: "",
    category: "extras",
    variants: [{ label: "Único", price: 2000 }],
  },
  {
    id: "extra-tomate",
    name: "Extra tomate / cebolla / lechuga / pickles / crujiente",
    description: "Por ingrediente",
    category: "extras",
    variants: [{ label: "c/u", price: 1000 }],
  },
  {
    id: "dip-aioli-tasty",
    name: "Dip aioli / tasty",
    description: "",
    category: "extras",
    variants: [{ label: "c/u", price: 1000 }],
  },
  {
    id: "papas-upgrade",
    name: "Papas con tasty, sector o cheddar y bacon",
    description: "Upgrade de papas incluidas",
    category: "extras",
    variants: [{ label: "c/u", price: 4500 }],
  },
  {
    id: "papas-cheddar-solo",
    name: "Papas con cheddar",
    description: "Upgrade de papas incluidas",
    category: "extras",
    variants: [{ label: "Único", price: 3500 }],
  },
];

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("es-AR")}`;
}

export function getByCategory(category: MenuItem["category"]): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.category === category);
}

export function getFeatured(): MenuItem[] {
  return MENU_ITEMS.filter((item) => item.featured);
}
