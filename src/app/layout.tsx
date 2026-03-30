import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Cabinet Grotesk es de Fontshare (no Google Fonts).
// Por ahora Inter actúa de fallback; en etapa 2 se agrega el archivo local.
const cabinetGrotesk = Inter({
  variable: "--font-cabinet",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sector B — Smash Burgers | Villa Gesell",
  description:
    "Smash burgers artesanales en Villa Gesell. Salón, delivery sin cargo y take away. Pedí por WhatsApp.",
  keywords: [
    "smash burger", "hamburguesas", "Villa Gesell", "delivery", "Sector B",
    "hamburguesas Villa Gesell", "delivery Villa Gesell", "burger Villa Gesell",
    "comida Villa Gesell", "restaurante Villa Gesell", "smash burger argentina",
    "qué comer en Villa Gesell", "mejor hamburguesa costa atlántica",
    "delivery hamburguesas costa", "burger costa atlántica",
    "hamburguesas temporada Villa Gesell", "dónde comer Villa Gesell verano",
  ],
  openGraph: {
    title: "Sector B — Smash Burgers | Villa Gesell",
    description: "Smash burgers artesanales. Delivery sin cargo a toda Villa Gesell. Pedí por WhatsApp.",
    siteName: "Sector B",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${barlowCondensed.variable} ${cabinetGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary">
        {children}
      </body>
    </html>
  );
}
