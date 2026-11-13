import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
  // URLs da loja Nuvemshop -> novas rotas
  async redirects() {
    return [
      { source: "/account/login", destination: "/conta", permanent: false },
      { source: "/account/register", destination: "/conta/cadastro", permanent: false },
      { source: "/contato", destination: "/sobre#contato", permanent: false },
      { source: "/produtos/camiseta-boxy-preta-featco-rvp9d", destination: "/produtos/camiseta-boxy-preta", permanent: true },
    ];
  },
};

export default nextConfig;
