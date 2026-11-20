"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { brl, type Product } from "@/lib/store";

export default function ProductCard({ p, index, sizes }: { p: Product; index: number; sizes: string }) {
  return (
    <Link href={`/produtos/${p.slug}`} className="group block">
      <div className="relative aspect-[1024/1271] overflow-hidden rounded-3xl bg-paper-2">
        <Image
          src={p.images[0].src}
          alt={p.images[0].alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]"
        />
        <Image
          src={p.images[1].src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
        <span className="absolute top-4 left-4 font-mono text-[11px] tracking-[0.2em] uppercase mix-blend-difference text-paper">
          Faixa {String(index + 1).padStart(2, "0")}
        </span>
        <motion.span
          className="absolute right-4 bottom-4 left-4 flex translate-y-3 items-center justify-between rounded-full bg-paper/90 px-4 py-3 font-mono text-[11px] tracking-[0.2em] uppercase opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <span>P · M · G</span>
          <span>Ver peça →</span>
        </motion.span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl leading-none uppercase sm:text-3xl">{p.name}</h3>
          <p className="mt-1 font-mono text-[11px] tracking-[0.15em] text-muted uppercase">
            {p.installments.count}x de {brl(p.installments.value)} sem juros
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-sm">{brl(p.price)}</p>
          <p className="font-mono text-[11px] text-muted">{brl(p.pixPrice)} no Pix</p>
        </div>
      </div>
    </Link>
  );
}
