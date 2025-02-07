import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import QueryProvider from "./components/QueryProvider"; // ✅ Importa el provider separado
//Fuente local
const Raleway = localFont({
  src: [
    { path: "./fonts/Raleway-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/Raleway-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Raleway-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Raleway-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Raleway-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Raleway-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/Raleway-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/Raleway-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/Raleway-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-raleway",
});
//Metadatos
export const metadata: Metadata = {
  title: "Chancay 360 - El Nuevo Epicentro Logístico de Latinoamérica",
  description:
    "Descubre las oportunidades de inversión, infraestructura y empleo en Chancay, el nuevo megapuerto que conecta Asia y Sudamérica.",
  openGraph: {
    title: "Chancay 360 - El Nuevo Epicentro Logístico de Latinoamérica",
    description: "Explora el impacto del Megapuerto de Chancay en el comercio, inversión y desarrollo económico.",
    url: "https://chancay360.com",
    siteName: "Chancay 360",
    images: [{ url: "/assets/images/chancay.png", width: 1200, height: 630, alt: "Vista aérea del Puerto de Chancay" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chancay 360 - Inversiones y Desarrollo",
    description: "Conoce cómo el Puerto de Chancay está transformando la economía y conectividad de la región.",
    images: ["/assets/images/chancay.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${Raleway.variable} min-h-screen flex flex-col bg-[var(--background-light)] text-[var(--foreground-light)]`}>
        <QueryProvider> 
          <Navbar />
          <main className="flex-grow w-full">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
