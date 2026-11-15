import type { Metadata, Viewport } from "next";
import { Anton, Inter, EB_Garamond, Oswald, Tinos } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// EB Garamond: serifada clássica, da mesma família visual do logo, para frases de destaque
const serif = EB_Garamond({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal"],
});
// Tinos: clone métrico da Times, a mesma família do logo — usado no wordmark grande
const logoFont = Tinos({ variable: "--font-logo", subsets: ["latin"], weight: "400" });
// Anton: condensada pesada para os títulos gigantes (direção Brim)
const display = Anton({ variable: "--font-display-condensed", subsets: ["latin"], weight: "400" });
// Oswald: condensada da loja Nuvemshop, para etiquetas, botões e preços
const mono = Oswald({ variable: "--font-mono-label", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: { default: "FeaT&Co · Lote 001", template: "%s · FeaT&Co" },
  description:
    "Camisetas oversized de corte boxy com bordado FT&Co desfiado à mão. Primeiro lote, edição limitada.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#efeae1" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${serif.variable} ${mono.variable} ${logoFont.variable} ${display.variable} antialiased`}>
      <body className="grain flex min-h-svh flex-col">
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Preloader />
        </SmoothScroll>
      </body>
    </html>
  );
}
