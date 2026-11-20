// Conteúdo copiado da loja Nuvemshop original (thefeatco.lojavirtualnuvem.com.br) em 13/11/2026.
// Não há categorias na loja original: só a página "Produtos" com duas camisetas.

export const STORE_URL = "https://thefeatco.lojavirtualnuvem.com.br";
export const INSTAGRAM_URL = "https://instagram.com/thefeat.co";
export const DIRECT_URL = "https://ig.me/m/thefeat.co";
export const INSTAGRAM_HANDLE = "@thefeat.co";

// Prazo do Lote 001. Mudar aqui muda no site inteiro.
export const LOTE_DEADLINE = "30/11";

export const ADBAR = [`LOTE 001 · ENCERRA ${LOTE_DEADLINE}`, "SEM REPOSIÇÃO", "FEITO À MÃO · NÃO EM MASSA", "6% OFF NO PIX"];

export const WELCOME = {
  title: ["Ela chega pronta", "Você termina"],
  text: "O patch já chega desfiado. Você continua: a cada uso e a cada lavagem, ele fica mais destroyed. Quanto mais você vive com ela, mais ela fica com a sua cara.",
  steps: ["Usa", "Lava", "Repete"],
};

export const CRAFT = {
  kicker: "Feito à mão · Não em massa",
  title: ["A máquina só costura.", "A mão faz o resto."],
  text: "Cada patch é desfiado à mão, fio por fio. Nenhuma sai igual à outra.",
};

// Dados de quem vende (obrigatórios no comércio eletrônico, Decreto 7.962/2013). Preencher antes de divulgar.
// Enquanto estiver vazio, nada aparece no site.
export const LEGAL = {
  name: "",
  document: "",
  address: "",
};
export const LEGAL_LINE = [LEGAL.name, LEGAL.document, LEGAL.address].filter(Boolean).join(" · ");

export const TERMS_SUMMARY = [
  "O desfiado do patch faz parte da peça e não é defeito.",
  "Troca só por erro de tamanho, pedida pelo direct em até 7 dias após a compra, com o motivo explicado e o frete pago por você.",
  "Qualquer devolução precisa de fotos aprovadas antes do envio.",
  "Peça devolvida usada, lavada ou danificada não tem reembolso e volta para você.",
  "Seu direito de desistir em até 7 dias após o recebimento está garantido.",
];

export const TERMS = [
  { title: "Quem somos", text: `FeaT&Co${LEGAL_LINE ? `, operada por ${LEGAL_LINE}` : ""}. Atendimento exclusivo pelo direct do @thefeat.co.` },
  { title: "As peças", text: "Cada camiseta recebe um patch aplicado e desfiado à mão. Fios soltos e pequenas diferenças entre peças fazem parte do design. Cores podem variar conforme a tela. Algumas imagens de campanha foram produzidas com recursos digitais. Lote limitado, sem reposição garantida." },
  { title: "Preço e pagamento", text: "R$ 148,00 no cartão, em até 2x sem juros, ou 6% de desconto no Pix. O pedido só é confirmado após a aprovação do pagamento." },
  { title: "Envio", text: "Postagem em até 2 dias úteis após a confirmação. Frete e prazo calculados pelo CEP. Endereço incorreto gera novo frete por conta do cliente. Avarias de transporte devem ser informadas em até 7 dias, com fotos." },
  { title: "Regra para qualquer devolução", text: "Solicitação só pelo direct, com o número do pedido. Fotos da peça inteira, frente, costas, patch e etiqueta antes de qualquer envio. A peça deve voltar sem uso, sem lavagem, sem manchas, odores ou danos e com etiqueta. Fora dessas condições, a troca ou o reembolso são recusados e a peça é enviada de volta, com frete por sua conta." },
  { title: "Troca de tamanho", text: "Não fazemos trocas por gosto, cor ou modelo. Troca de tamanho em até 7 dias após a compra, explicando o motivo, sujeita ao estoque. Fretes por conta do cliente. Uma troca por pedido." },
  { title: "Direito de arrependimento", text: "Você pode desistir em até 7 dias após o recebimento (art. 49 do CDC). O envio de volta é feito e pago por você. O reembolso acontece somente após a peça chegar e ser aprovada. Sem a peça devolvida, não há reembolso." },
  { title: "Defeito de fabricação", text: "Informe em até 90 dias, com fotos. Confirmado o defeito, pagamos os fretes e trocamos a peça ou devolvemos o valor. O desfiado do patch não é defeito." },
  { title: "Cuidados", text: "Lave do avesso, em água fria e ciclo delicado. Não use alvejante, secadora nem ferro sobre o patch." },
  { title: "Dados pessoais", text: "Usamos seus dados apenas para processar e entregar o pedido, conforme a LGPD. Não vendemos nem compartilhamos seus dados com terceiros além do necessário para pagamento e entrega." },
  { title: "Menores de 18 anos", text: "Compras devem ter autorização do responsável legal." },
  { title: "Aceite", text: "Ao marcar \"Li e concordo\" antes da compra, você confirma que leu e aceitou estes termos." },
];

export const INSTITUTIONAL = {
  kicker: "FeaT&Co · Lote 001",
  title: "Toda grande faixa tem um feat.",
};

export const TROCAS = {
  intro: "Peça feita à mão tem regra clara. Tudo pelo direct do @thefeat.co.",
  rules: [
    { title: "Troca só de tamanho", text: "Em até 7 dias após a compra, explicando o motivo. O frete de ida e volta é por sua conta, e a troca depende de ter o tamanho no estoque. Não fazemos trocas por gosto, cor ou modelo. Uma troca por pedido." },
    { title: "Foto antes de tudo", text: "Nenhuma devolução sem fotos aprovadas antes do envio: peça inteira, frente, costas, patch e etiqueta. A peça volta como chegou: sem uso, sem lavagem, sem manchas, odores ou danos e com etiqueta. Fora dessas condições, a troca ou o reembolso são recusados e a peça é enviada de volta, com frete por sua conta." },
    { title: "Seu direito garantido", text: "Você pode desistir em até 7 dias após receber (art. 49 do CDC). O envio de volta é feito e pago por você. O reembolso acontece somente depois que a peça chega e é conferida." },
    { title: "Defeito de fabricação", text: "Informe em até 90 dias, com fotos. Confirmado o defeito, pagamos os fretes e trocamos a peça ou devolvemos o valor. O desfiado do patch faz parte da peça e não é defeito." },
    { title: "Envio", text: "Postagem em até 2 dias úteis após a confirmação do pagamento. Endereço incorreto gera novo frete por conta do cliente. Avarias de transporte devem ser informadas em até 7 dias, com fotos." },
    { title: "Cuidados", text: "Lave do avesso, em água fria e ciclo delicado. Não use alvejante, secadora nem ferro sobre o patch." },
  ],
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
  // stock: atualizar à mão conforme a Nuvemshop (Produtos > Estoque).
  sizes: { size: Size; sku: string; available: boolean; stock: number }[];
  images: { src: string; alt: string }[];
  storeUrl: string;
};

const description = (bordado: string) => [
  `Camiseta oversized de corte boxy, reto e estruturado. Patch FT desfiado à mão e &Co bordado em ${bordado}. Cada peça sai única.`,
  "Ela chega pronta. Você termina. O patch já chega desfiado e, a cada uso e a cada lavagem, fica mais destroyed. O desfiado faz parte da peça e não é defeito.",
  "Cuidados: lave do avesso, em água fria e ciclo delicado. Não use alvejante, secadora nem ferro sobre o patch.",
  "Primeiro lote, edição limitada. Sem reposição garantida.",
];

export const PRODUCTS: Product[] = [
  {
    slug: "camiseta-boxy-off-white",
    name: "Camiseta Boxy Off-White FeaT&Co",
    color: "Off-White",
    price: 148,
    pixPrice: 139.12,
    installments: { count: 2, value: 74 },
    description: description("preto"),
    sizes: [
      { size: "P", sku: "FTC-CAM-OW-P", available: true, stock: 6 },
      { size: "M", sku: "FTC-CAM-OW-M", available: true, stock: 7 },
      { size: "G", sku: "FTC-CAM-OW-G", available: true, stock: 4 },
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
    description: description("off-white"),
    sizes: [
      { size: "P", sku: "FTC-CAM-PT-P", available: true, stock: 6 },
      { size: "M", sku: "FTC-CAM-PT-M", available: true, stock: 7 },
      { size: "G", sku: "FTC-CAM-PT-G", available: true, stock: 4 },
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

/** Texto de escassez por tamanho. */
export const stockLabel = (n: number) =>
  n <= 0 ? "Esgotado" : n === 1 ? "Última peça" : n <= 4 ? `Últimas ${n} peças` : `Restam ${n}`;
