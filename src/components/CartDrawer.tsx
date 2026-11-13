"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { cart, useCart } from "@/lib/cart";
import { brl, DIRECT_URL, getProduct, STORE_URL } from "@/lib/store";
import { ScribbleButton } from "./Brim";

/** Carrinho (direção Brim): tela escura, recibo com fita e resumo do pedido. Demonstração. */
export default function CartDrawer() {
  const { lines, open } = useCart();
  const items = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    return p ? [{ ...l, p }] : [];
  });
  const qty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.p.price * i.qty, 0);
  const pix = items.reduce((s, i) => s + i.p.pixPrice * i.qty, 0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Carrinho de compras"
          className="red-field fixed inset-0 z-50 overflow-y-auto text-cream"
          data-lenis-prevent
          initial={{ clipPath: "circle(0% at 95% 5%)" }}
          animate={{ clipPath: "circle(150% at 95% 5%)" }}
          exit={{ clipPath: "circle(0% at 95% 5%)" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="mx-auto flex min-h-full max-w-[1400px] flex-col px-4 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase">( Carrinho de compras )</span>
              <button onClick={cart.close} aria-label="Fechar carrinho" className="flex size-11 items-center justify-center rounded-full bg-ink/20 transition-colors hover:bg-ink/40">
                <X className="size-5" />
              </button>
            </div>

            <div className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-2 lg:gap-20">
              {/* Recibo */}
              <motion.div
                initial={{ y: 80, rotate: -8, opacity: 0 }}
                animate={{ y: 0, rotate: -2.5, opacity: 1 }}
                transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto w-full max-w-md"
              >
                <span aria-hidden className="tape absolute -top-4 left-6 z-10 h-8 w-24 -rotate-12 opacity-90" />
                <span aria-hidden className="tape absolute -top-3 right-8 z-10 h-8 w-20 rotate-[14deg] opacity-90" />
                <div className="receipt px-6 pt-8 pb-6 text-ink">
                  <p className="text-center text-4xl" style={{ fontFamily: "var(--font-logo), 'Times New Roman', serif" }}>
                    FeaT &amp; Co
                  </p>
                  <p className="mt-1 text-center font-mono text-[10px] tracking-[0.25em] text-muted uppercase">Lote 001</p>
                  <div className="mt-6 grid grid-cols-[1fr_auto_auto] gap-x-4 border-b border-dashed border-ink/30 pb-2 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
                    <span>Produto</span>
                    <span>Qtd.</span>
                    <span className="text-right">Total</span>
                  </div>
                  {items.length === 0 ? (
                    <p className="py-10 text-center font-mono text-xs text-ink-2">O carrinho de compras está vazio.</p>
                  ) : (
                    <ul className="divide-y divide-dashed divide-ink/20">
                      {items.map((i) => (
                        <li key={i.slug + i.size} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-paper-2">
                              <Image src={i.p.images[0].src} alt={i.p.images[0].alt} fill sizes="48px" className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-mono text-[11px] uppercase">{i.p.color}</p>
                              <p className="font-mono text-[10px] text-muted">Tam. {i.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 font-mono text-xs">
                            <button aria-label="Diminuir" className="flex size-6 items-center justify-center" onClick={() => cart.setQty(i.slug, i.size, i.qty - 1)}>
                              <Minus className="size-3" />
                            </button>
                            <span className="w-4 text-center">{i.qty}</span>
                            <button aria-label="Aumentar" className="flex size-6 items-center justify-center" onClick={() => cart.setQty(i.slug, i.size, i.qty + 1)}>
                              <Plus className="size-3" />
                            </button>
                          </div>
                          <span className="text-right font-mono text-sm">{brl(i.p.price * i.qty)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="barcode mt-6 h-12 opacity-80" aria-hidden />
                </div>
                <div className="receipt-edge" aria-hidden />
              </motion.div>

              {/* Resumo */}
              <div>
                <h2 className="font-display text-[clamp(5rem,min(14vw,22svh),12rem)] leading-[0.85] uppercase">
                  Carrinho<sup className="ml-1 align-top font-serif text-[0.2em] italic normal-case">{qty}</sup>
                </h2>
                <dl className="mt-8 max-w-md space-y-3 font-mono text-sm uppercase">
                  <div className="flex items-baseline gap-3">
                    <dt>Subtotal (sem frete)</dt>
                    <span className="flex-1 border-b border-cream/30" />
                    <dd>{brl(subtotal)}</dd>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <dt>No Pix (6% off)</dt>
                    <span className="flex-1 border-b border-cream/30" />
                    <dd>{brl(pix)}</dd>
                  </div>
                </dl>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-cream/80">
                  Este carrinho é uma demonstração do novo visual. Para comprar, finalize na loja oficial FeaT&Co
                  (Nuvemshop), escolhendo os mesmos tamanhos.
                </p>
                {items.length > 0 && (
                  <ul className="mt-4 flex max-w-md flex-wrap gap-2">
                    {items.map((i) => (
                      <li key={i.slug + i.size}>
                        <a
                          href={i.p.storeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tape inline-block px-4 py-2 font-mono text-[10px] tracking-[0.15em] uppercase"
                        >
                          {i.p.color} · {i.size} × {i.qty} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8">
                  {items.length > 0 ? (
                    <ScribbleButton href={`${STORE_URL}/produtos/`} external>
                      Finalizar na loja
                    </ScribbleButton>
                  ) : (
                    <ScribbleButton onClick={cart.close}>Ver produtos</ScribbleButton>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
              <Link href="/produtos" onClick={cart.close} className="flex items-center gap-2">
                <span className="text-[#d9c9a8]">←</span> Voltar à loja
              </Link>
              <a href={DIRECT_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <span className="text-[#d9c9a8]">✱</span> Fale no direct
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
