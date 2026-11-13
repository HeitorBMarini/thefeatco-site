"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import Marquee from "./Marquee";
import { Wordmark, InstagramIcon } from "./Icons";
import { TapeButton } from "./Brim";
import { cart, useCart } from "@/lib/cart";
import { DIRECT_URL, INSTAGRAM_URL } from "@/lib/store";

// Colunas de navegação no estilo Brim: rótulo entre parênteses + duas linhas.
const NAV = [
  { href: "/produtos", tag: "Coleção", lines: ["Camisetas", "Lote 001"], label: "Produtos" },
  { href: "/sobre", tag: "Sobre", lines: ["Feito à mão", "Não em massa"], label: "Sobre & contato" },
  { href: "/conta", tag: "Conta", lines: ["Iniciar sessão", "Criar uma conta"], label: "Minha conta" },
];

export default function Header() {
  const pathname = usePathname();
  const { lines } = useCart();
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const [menuFor, setMenuFor] = useState<string | null>(null);
  const open = menuFor === pathname; // fecha sozinho ao trocar de página

  const active = (href: string) => pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40">
      <Marquee />
      <div className="border-b border-cream/10 bg-ink text-cream">
        <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 sm:px-8">
          <button
            className="-ml-2 flex size-10 items-center justify-center md:hidden"
            onClick={() => setMenuFor(open ? null : pathname)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          <Link href="/" aria-label="FeaT&Co — início" className="mx-auto md:mx-0 md:mr-6">
            <Wordmark invert className="h-6 w-auto sm:h-7" />
          </Link>

          <nav className="hidden flex-1 md:grid md:grid-cols-3" aria-label="Principal">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative border-l border-cream/15 pl-4 font-mono text-[10px] leading-[1.35] tracking-[0.12em] uppercase"
              >
                <span className={`block transition-colors ${active(n.href) ? "text-thread" : "text-cream/45"}`}>
                  ( {n.tag} )
                </span>
                {n.lines.map((l) => (
                  <span key={l} className="block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-full">
                      {l}
                    </span>
                    <span className="-mt-[1.35em] block translate-y-full text-thread transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-y-0">
                      {l}
                    </span>
                  </span>
                ))}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-4">
            <span className="hidden lg:block">
              <TapeButton href={DIRECT_URL} external>
                Fale no direct
              </TapeButton>
            </span>
            <button
              onClick={cart.open}
              aria-label={`Abrir carrinho (${count} ${count === 1 ? "item" : "itens"})`}
              className="relative flex size-10 items-center justify-center"
            >
              <ShoppingBag className="size-5" strokeWidth={1.5} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-0.5 flex size-4 items-center justify-center rounded-full bg-cream font-mono text-[9px] text-ink"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="red-field absolute inset-x-0 top-full flex h-[calc(100svh-6rem)] flex-col justify-between px-6 pt-10 pb-8 text-cream md:hidden"
            data-lenis-prevent
          >
            <ul className="space-y-1">
              {[{ href: "/", label: "Início" }, ...NAV].map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1], duration: 0.7 }}
                >
                  <Link href={n.href} className="flex items-baseline gap-4 font-display text-6xl uppercase">
                    <span className="font-mono text-xs text-cream/50">0{i + 1}</span>
                    {n.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6 font-mono text-xs tracking-[0.2em] uppercase">
              <TapeButton href={DIRECT_URL} external>
                Fale no direct
              </TapeButton>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2">
                <InstagramIcon className="size-4" /> Instagram
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
