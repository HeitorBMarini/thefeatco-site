"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus, Share2 } from "lucide-react";
import { BANNERS, brl, PRODUCTS, type Product } from "@/lib/store";
import { Thread } from "../Brim";

type Card =
  | { kind: "product"; p: Product; img: { src: string; alt: string } }
  | { kind: "look"; src: string; alt: string; n: number };

// Fileira grande: os dois produtos + duas fotos do lookbook.
const BIG: Card[] = [
  { kind: "product", p: PRODUCTS[0], img: PRODUCTS[0].images[0] },
  { kind: "look", src: BANNERS[2].src, alt: BANNERS[2].alt, n: 3 },
  { kind: "product", p: PRODUCTS[1], img: PRODUCTS[1].images[0] },
  { kind: "look", src: BANNERS[0].src, alt: BANNERS[0].alt, n: 1 },
];
// Fileira pequena: todas as fotos das duas peças.
const SMALL: Card[] = PRODUCTS.flatMap((p) => p.images.map((img) => ({ kind: "product" as const, p, img })));

function Actions({ card, small }: { card: Card; small?: boolean }) {
  const href = card.kind === "product" ? `/produtos/${card.p.slug}` : "/produtos";
  const size = small ? "size-7" : "size-11";
  const icon = small ? "size-3.5" : "size-5";
  async function share() {
    const url = window.location.origin + href;
    try {
      if (navigator.share) await navigator.share({ url, title: card.kind === "product" ? card.p.name : "FeaT&Co" });
      else await navigator.clipboard.writeText(url);
    } catch {
      /* cancelado */
    }
  }
  return (
    <div className={`absolute top-1/2 right-3 flex -translate-y-1/2 flex-col ${small ? "gap-1.5" : "gap-2.5"}`}>
      <button onClick={share} aria-label="Compartilhar" className={`${size} flex items-center justify-center rounded-full bg-ink text-[#d9c9a8] transition-transform hover:scale-110`}>
        <Share2 className={icon} />
      </button>
      <Link href={href} aria-label="Ver peça" className={`${size} flex items-center justify-center rounded-full bg-ink text-[#d9c9a8] transition-transform hover:scale-110`}>
        <ArrowUpRight className={icon} />
      </Link>
      <Link
        href={href}
        aria-label="Comprar"
        className={`${size} flex items-center justify-center rounded-full bg-ink text-[#d9c9a8] transition-colors hover:bg-cream hover:text-ink`}
      >
        <Plus className={icon} />
      </Link>
    </div>
  );
}

function Row({ cards, small }: { cards: Card[]; small?: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className={`flex ${small ? "h-[clamp(120px,16svh,190px)] gap-3" : "h-[clamp(260px,46svh,520px)] gap-4"}`} onMouseLeave={() => setHover(null)}>
      {cards.map((c, i) => {
        const grow = hover === null ? 1 : hover === i ? (small ? 2.2 : 2.4) : 0.8;
        const label = c.kind === "product" ? c.p.name.replace(" FeaT&Co", "") : `Lookbook ${String(c.n).padStart(2, "0")}`;
        return (
          <motion.figure
            key={i}
            onMouseEnter={() => setHover(i)}
            animate={{ flexGrow: grow }}
            transition={{ type: "spring", stiffness: 170, damping: 26 }}
            className="relative flex min-w-0 basis-0 flex-col"
          >
            <div className={`relative flex-1 overflow-hidden ${small ? "rounded-xl" : "rounded-3xl"} bg-paper-2`}>
              <Image
                src={c.kind === "product" ? c.img.src : c.src}
                alt={c.kind === "product" ? c.img.alt : c.alt}
                fill
                sizes={small ? "20vw" : "45vw"}
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105"
              />
              <Actions card={c} small={small} />
            </div>
            <figcaption className="mt-2 flex justify-between gap-2 font-mono text-[10px] tracking-[0.12em] text-cream/70 uppercase">
              <span className="truncate">{label}</span>
              {c.kind === "product" && <span>{brl(c.p.price)}</span>}
            </figcaption>
          </motion.figure>
        );
      })}
    </div>
  );
}

export default function Units() {
  return (
    <section className="overflow-hidden bg-ink pt-24 pb-20 text-cream sm:pt-32" aria-labelledby="units">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-8 px-4 sm:px-8">
        <h2 id="units" className="relative font-display text-[clamp(5rem,min(16vw,26svh),15rem)] leading-[0.85] uppercase">
          <span className="relative inline-block">
            L
            <Thread className="absolute top-[6%] left-[2%] h-[72%] w-[34%] text-ink" delay={0.2} />
          </span>
          ote 001
          <sup className="ml-2 align-top font-serif text-[0.18em] italic normal-case">{String(PRODUCTS.length).padStart(2, "0")}</sup>
        </h2>
        <nav aria-label="Coleção" className="font-mono text-xs tracking-[0.15em] uppercase">
          <p className="mb-3 text-cream/45">( Coleção )</p>
          <ul className="space-y-1.5">
            <li>
              <Link href="/produtos" className="group flex items-center gap-2">
                <span className="text-[#d9c9a8]">→</span> Todos os produtos
              </Link>
            </li>
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link href={`/produtos/${p.slug}`} className="pl-5 hover:text-[#d9c9a8]">
                  {p.color}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* desktop: fileiras que crescem no hover */}
      <div className="mt-14 hidden space-y-6 px-4 sm:px-8 md:block">
        <Row cards={BIG} />
        <Row cards={SMALL} small />
      </div>

      {/* celular: carrossel com snap */}
      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 md:hidden">
        {[...BIG, ...SMALL].map((c, i) => (
          <figure key={i} className="w-[72vw] shrink-0 snap-center">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-paper-2">
              <Image
                src={c.kind === "product" ? c.img.src : c.src}
                alt={c.kind === "product" ? c.img.alt : c.alt}
                fill
                sizes="72vw"
                className="object-cover"
              />
              <Actions card={c} />
            </div>
            <figcaption className="mt-2 flex justify-between font-mono text-[10px] tracking-[0.12em] text-cream/70 uppercase">
              <span>{c.kind === "product" ? c.p.name.replace(" FeaT&Co", "") : `Lookbook ${String(c.n).padStart(2, "0")}`}</span>
              {c.kind === "product" && <span>{brl(c.p.price)}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
