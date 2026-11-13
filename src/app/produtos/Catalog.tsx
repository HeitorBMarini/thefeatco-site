"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { SplitWords } from "@/components/Reveal";
import { PRODUCTS, type Product } from "@/lib/store";

type Filter = "Todos" | Product["color"];
const FILTERS: Filter[] = ["Todos", "Off-White", "Preta"];

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const list = filter === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.color === filter);

  return (
    <>
      <div className="mt-6 flex flex-col gap-8 border-b border-ink pb-8 lg:flex-row lg:items-end lg:justify-between">
        <SplitWords
          as="h1"
          immediate
          text="Produtos"
          className="font-display leading-[0.85] uppercase text-[clamp(4rem,min(15vw,24svh),14rem)]"
        />
        <LayoutGroup>
          <div role="group" aria-label="Filtrar por cor" className="flex gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className="relative px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] uppercase"
              >
                {filter === f && (
                  <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-red" transition={{ duration: 0.4 }} />
                )}
                <span className={`relative ${filter === f ? "text-cream" : ""}`}>{f}</span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>
      <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
        {list.length} {list.length === 1 ? "produto" : "produtos"} · Lote 001
      </p>

      <motion.div layout className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard p={p} index={PRODUCTS.indexOf(p)} sizes="(min-width:640px) 50vw, 100vw" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
