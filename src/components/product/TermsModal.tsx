"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { TERMS_SUMMARY } from "@/lib/store";

export default function TermsModal({
  open,
  onClose,
  href,
  what,
}: {
  open: boolean;
  onClose: () => void;
  href: string;
  what: string;
}) {
  const [agree, setAgree] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          data-lenis-prevent
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="terms-title"
            className="relative max-h-[92svh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl bg-paper p-6 sm:rounded-3xl sm:p-10"
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} aria-label="Fechar" className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full border border-ink/20">
              <X className="size-4" />
            </button>
            <p className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">Lote 001</p>
            <h2 id="terms-title" className="mt-2 font-display text-4xl uppercase">Antes de garantir a sua</h2>
            <p className="mt-1 text-sm text-ink-2">{what}</p>

            <ul className="mt-6 space-y-3">
              {TERMS_SUMMARY.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-snug text-ink-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red" />
                  {t}
                </li>
              ))}
            </ul>

            <label className="mt-8 flex cursor-pointer items-start gap-3 border-t border-ink/15 pt-6 text-sm">
              <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-[var(--ink)]" />
              <span>
                Li e concordo com os{" "}
                <Link href="/termos" target="_blank" className="underline underline-offset-4">
                  termos de compra
                </Link>
                .
              </span>
            </label>

            <a
              href={agree ? href : undefined}
              aria-disabled={!agree}
              onClick={(e) => {
                if (!agree) e.preventDefault();
              }}
              className={`mt-6 flex h-14 items-center justify-center rounded-full font-mono text-xs tracking-[0.25em] uppercase transition-colors ${
                agree ? "bg-red text-cream hover:bg-red-deep" : "cursor-not-allowed bg-ink/10 text-ink/40"
              }`}
            >
              Seguir para o pagamento ↗
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
