import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductView from "./ProductView";
import ProductCard from "@/components/ProductCard";
import { getProduct, PRODUCTS } from "@/lib/store";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produtos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.description.join(" ") } : {};
}

export default function ProductPage({ params }: PageProps<"/produtos/[slug]">) {
  // params dentro de <Suspense>: os dois produtos são pré-renderizados; o fallback só aparece para URL desconhecida
  return (
    <Suspense fallback={<div className="min-h-[80svh]" />}>
      <Product params={params} />
    </Suspense>
  );
}

async function Product({ params }: { params: PageProps<"/produtos/[slug]">["params"] }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const others = PRODUCTS.filter((o) => o.slug !== p.slug);

  return (
    <>
      <div className="mx-auto max-w-[1600px] px-4 pt-8 sm:px-8">
        <nav aria-label="Trilha" className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
          <Link href="/" className="hover:text-ink">Início</Link>
          <span className="mx-2">/</span>
          <Link href="/produtos" className="hover:text-ink">Produtos</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{p.name}</span>
        </nav>
      </div>
      <ProductView p={p} />
      {others.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-4 pb-24 sm:px-8" aria-labelledby="mais">
          <h2 id="mais" className="mb-8 border-t border-ink pt-6 font-serif text-4xl sm:text-5xl">
            Ver mais produtos
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <ProductCard key={o.slug} p={o} index={PRODUCTS.indexOf(o)} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
