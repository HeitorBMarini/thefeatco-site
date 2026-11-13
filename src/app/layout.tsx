import type { Metadata, Viewport } from "next";
import { Anton, Inter, Instrument_Serif, JetBrains_Mono, Tinos } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
// Tinos: clone métrico da Times, a mesma família do logo — usado no wordmark grande
const logoFont = Tinos({ variable: "--font-logo", subsets: ["latin"], weight: "400" });
// Anton: condensada pesada para os títulos gigantes (direção Brim)
const display = Anton({ variable: "--font-display-condensed", subsets: ["latin"], weight: "400" });
const mono = JetBrains_Mono({ variable: "--font-mono-label", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "FeaT&Co · Lote 001", template: "%s · FeaT&Co" },
  description:
    "Camisetas oversized de corte boxy com bordado FT&Co desfiado à mão. Primeiro lote, edição limitada.",
  robots: { index: false, follow: false },
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
          <CartDrawer />
          <Preloader />
        </SmoothScroll>
      </body>
    </html>
  );
}
