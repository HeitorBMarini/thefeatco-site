// Conteúdo copiado da loja Nuvemshop original (thefeatco.lojavirtualnuvem.com.br) em 13/11/2026.
// Não há categorias na loja original: só a página "Produtos" com duas camisetas.

export const STORE_URL = "https://thefeatco.lojavirtualnuvem.com.br";
export const INSTAGRAM_URL = "https://instagram.com/thefeat.co";
export const DIRECT_URL = "https://ig.me/m/thefeat.co";
export const INSTAGRAM_HANDLE = "@thefeat.co";

export const ADBAR = ["LOTE 001", "FEITO À MÃO · NÃO EM MASSA", "6% OFF NO PIX"];

export const WELCOME = {
  title: ["Ela chega pronta", "Você termina"],
  text: "O patch já vem desfiado e continua desfiando a cada uso e a cada lavagem. Quanto mais você vive com ela, mais ela fica com a sua personalidade.",
};

export const INSTITUTIONAL = {
  kicker: "FeaT&Co · Lote 001",
  title: "Toda grande faixa tem um feat.",
};

export const COPYRIGHT = "Copyright FeaT&Co - 2026. Todos os direitos reservados.";

export const BANNERS = [
  { src: "/img/banner-1.webp", w: 1800, h: 1005, alt: "Dupla de costas com camisetas FeaT&Co off-white e preta" },
  { src: "/img/banner-2.webp", w: 1450, h: 1800, alt: "Camiseta off-white com o patch FT&Co desfiado, em preto e branco" },
  { src: "/img/banner-3.webp", w: 1080, h: 1350, alt: "Detalhe do patch FT&Co bordado na camiseta off-white" },
  { src: "/img/banner-4.webp", w: 1800, h: 1005, alt: "Quatro pessoas com camisetas FeaT&Co pretas e off-white" },
];

export const HERO = { src: "/img/slide-a.webp", w: 1920, h: 800, alt: "Três pessoas em movimento vestindo FeaT&Co" };

export type Size = "P" | "M" | "G";

export type Product = {
  slug: string;
  name: string;
  color: "Off-White" | "Preta";
  price: number;
  pixPrice: number;
  installments: { count: number; value: number };
  description: string[];
  sizes: { size: Size; sku: string; available: boolean }[];
  images: { src: string; alt: string }[];
  storeUrl: string;
};

const DESCRIPTION = [
  "Camiseta oversized corte boxy, reto e estruturado. Off-white com bordado FT&Co em preto, desfiado à mão, cada peça sai única.",
  "Primeiro lote, edição limitada.",
  "Modelagem: oversized",
];

export const PRODUCTS: Product[] = [
  {
    slug: "camiseta-boxy-off-white",
    name: "Camiseta Boxy Off-White FeaT&Co",
    color: "Off-White",
    price: 148,
    pixPrice: 139.12,
    installments: { count: 2, value: 74 },
    description: DESCRIPTION,
    sizes: [
      { size: "P", sku: "FTC-CAM-OW-P", available: true },
      { size: "M", sku: "FTC-CAM-OW-M", available: true },
      { size: "G", sku: "FTC-CAM-OW-G", available: true },
    ],
    images: [
      { src: "/img/ow-1.webp", alt: "Camiseta Boxy Off-White, frente" },
      { src: "/img/ow-2.webp", alt: "Camiseta Boxy Off-White, detalhe do patch FT&Co desfiado" },
      { src: "/img/ow-3.webp", alt: "Camiseta Boxy Off-White, outra vista" },
      { src: "/img/ow-4.webp", alt: "Camiseta Boxy Off-White, etiqueta FeaT & Co nas costas" },
    ],
    storeUrl: `${STORE_URL}/produtos/camiseta-boxy-off-white/`,
  },
  {
    slug: "camiseta-boxy-preta",
    name: "Camiseta Boxy Preta FeaT&Co",
    color: "Preta",
    price: 148,
    pixPrice: 139.12,
    installments: { count: 2, value: 74 },
    description: DESCRIPTION,
    sizes: [
      { size: "P", sku: "FTC-CAM-PT-P", available: true },
      { size: "M", sku: "FTC-CAM-PT-M", available: true },
      { size: "G", sku: "FTC-CAM-PT-G", available: true },
    ],
    images: [
      { src: "/img/pt-1.webp", alt: "Camiseta Boxy Preta, frente" },
      { src: "/img/pt-2.webp", alt: "Camiseta Boxy Preta, detalhe do patch FT&Co desfiado" },
      { src: "/img/pt-3.webp", alt: "Camiseta Boxy Preta, outra vista" },
      { src: "/img/pt-4.webp", alt: "Camiseta Boxy Preta, etiqueta FeaT & Co nas costas" },
    ],
    storeUrl: `${STORE_URL}/produtos/camiseta-boxy-preta-featco-rvp9d/`,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
