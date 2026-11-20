"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brl, LOTE_DEADLINE, stockLabel, type Product, type Size } from "@/lib/store";
import FitFinder from "@/components/product/FitFinder";
import TermsModal from "@/components/product/TermsModal";

export default function ProductView({ p }: { p: Product }) {
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<Size>(p.sizes.find((s) => s.available && s.stock > 0)?.size ?? "P");
  const current = p.sizes.find((s) => s.size === size);
  const [terms, setTerms] = useState(false);
  const [fitOpen, setFitOpen] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  return (
    <section className="mx-auto grid max-w-[1600px] gap-10 px-4 pt-6 pb-24 sm:px-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
      {/* Galeria */}
      <div className="grid gap-3 lg:grid-cols-[88px_1fr]">
        <div className="no-scrollbar order-2 flex gap-2 overflow-x-auto p-1 lg:order-1 lg:flex-col">
          {p.images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1}`}
              aria-current={active === i}
              className={`relative aspect-[1024/1271] w-20 shrink-0 overflow-hidden rounded-xl bg-paper-2 transition lg:w-full ${
                active === i ? "ring-1 ring-ink ring-offset-2 ring-offset-paper" : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={img.src} alt="" fill sizes="88px" className="object-cover" />
            </button>
          ))}
        </div>
        <div
          className="relative order-1 aspect-[1024/1271] cursor-zoom-in overflow-hidden rounded-3xl bg-paper-2 lg:order-2 lg:max-h-[calc(100svh-8rem)] lg:w-auto"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}
          onMouseLeave={() => setZoom(null)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              className="absolute inset-0"
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={p.images[active].src}
                alt={p.images[active].alt}
                fill
                preload={active === 0}
                quality={90}
                sizes="(min-width:1024px) 55vw, 100vw"
                className="object-cover transition-transform duration-300"
                style={zoom ? { transform: "scale(1.8)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
              />
            </motion.div>
          </AnimatePresence>
          <span className="absolute bottom-4 left-4 font-mono text-[11px] tracking-[0.2em] uppercase">
            {String(active + 1).padStart(2, "0")} / {String(p.images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Informações */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Lote 001 · Feito à mão</p>
        <h1 className="mt-3 font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] uppercase">{p.name}</h1>

        <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-2xl">{brl(p.price)}</span>
          <span className="text-sm text-ink-2">
            {p.installments.count}x de {brl(p.installments.value)} sem juros
          </span>
        </div>
        <div className="frayed mt-4 inline-flex items-center gap-3 bg-ink px-4 py-2.5 text-paper">
          <span className="font-mono text-sm">{brl(p.pixPrice)}</span>
          <span className="font-mono text-[11px] tracking-[0.15em] uppercase">6% de desconto pagando com Pix</span>
        </div>
        <p className="mt-2 text-xs text-muted">Não acumulável com algumas promoções</p>

        <fieldset className="mt-10">
          <legend className="font-mono text-[11px] tracking-[0.2em] uppercase">
            Tamanho: <span className="text-ink-2">{size}</span>
          </legend>
          <div className="mt-3 flex gap-2">
            {p.sizes.map((s) => (
              <button
                key={s.size}
                disabled={!s.available || s.stock <= 0}
                onClick={() => setSize(s.size)}
                aria-pressed={size === s.size}
                className={`relative flex size-14 items-center justify-center rounded-full border font-mono text-sm transition-colors ${
                  size === s.size ? "border-red bg-red text-cream" : "border-ink/25 hover:border-ink"
                } disabled:cursor-not-allowed disabled:opacity-30`}
              >
                {s.size}
              </button>
            ))}
          </div>
          {current && (
            <p className={`mt-3 font-mono text-[11px] tracking-[0.2em] uppercase ${current.stock <= 4 ? "text-red" : "text-ink-2"}`}>
              {stockLabel(current.stock)} no {current.size} · Lote 001 encerra {LOTE_DEADLINE}
            </p>
          )}
        </fieldset>

        <button
          type="button"
          onClick={() => setFitOpen((v) => !v)}
          aria-expanded={fitOpen}
          className="mt-4 font-mono text-[11px] tracking-[0.2em] underline underline-offset-4 uppercase"
        >
          {fitOpen ? "Fechar provador" : "Não sabe o tamanho? Descubra em 10 segundos"}
        </button>
        {fitOpen && (
          <div className="mt-4">
            <FitFinder
              onPick={(s) => {
                setSize(s);
                setFitOpen(false);
              }}
            />
          </div>
        )}

        <div className="mt-8 grid gap-2">
          <button
            type="button"
            onClick={() => setTerms(true)}
            className="flex h-14 items-center justify-center rounded-full bg-red font-mono text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:bg-red-deep"
          >
            Comprar · Tamanho {size}
          </button>
          <p className="text-xs leading-relaxed text-muted">
            Na próxima tela, confirme o tamanho {size}, calcule o frete e finalize o pagamento com segurança.
          </p>
        </div>
        <TermsModal
          open={terms}
          onClose={() => setTerms(false)}
          href={p.storeUrl}
          what={`${p.name} · Tamanho ${size} · ${brl(p.price)} ou ${brl(p.pixPrice)} no Pix`}
        />

        <div className="mt-10 space-y-3 border-t border-ink/15 pt-8 text-[15px] leading-relaxed text-ink-2">
          {p.description.map((d) => (
            <p key={d}>{d}</p>
          ))}
        </div>

        <details className="group mt-8 border-t border-ink/15 pt-5">
          <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[11px] tracking-[0.2em] uppercase">
            Meios de pagamento
            <span className="transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-4 space-y-2 text-sm text-ink-2">
            <p>
              <strong className="font-medium text-ink">Nuvem Pago · Pix:</strong> 6% OFF — {brl(p.pixPrice)}
            </p>
            <p>
              <strong className="font-medium text-ink">Cartões de crédito:</strong> {p.installments.count}x de{" "}
              {brl(p.installments.value)} sem juros
            </p>
            <p className="text-xs text-muted">
              O desconto será aplicado sobre o valor do produto (sem frete) ao escolher o meio de pagamento.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
