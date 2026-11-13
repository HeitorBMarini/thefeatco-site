import type { Metadata } from "next";
import Link from "next/link";
import Catalog from "./Catalog";

export const metadata: Metadata = { title: "Produtos" };

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 pt-12 pb-24 sm:px-8 sm:pt-16">
      <nav aria-label="Trilha" className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        <Link href="/" className="hover:text-ink">Início</Link> <span className="mx-2">/</span> <span className="text-ink">Produtos</span>
      </nav>
      <Catalog />
    </div>
  );
}
