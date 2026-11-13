"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Thread } from "./Brim";

const KEY = "featco-preloaded";

/**
 * Abertura (Brim): tela preta, contador 0→100 e o logo; sai com uma pílula bege e uma cortina curva.
 * Só na primeira visita da sessão e nunca com "reduzir movimento".
 */
export default function Preloader() {
  const [show, setShow] = useState(true);
  const count = useMotionValue(0);
  const label = useTransform(count, (v) => String(Math.round(v)).padStart(3, "0"));

  useEffect(() => {
    let skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try {
      skip = skip || sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* sem storage: mostra mesmo assim */
    }
    if (skip) {
      const t = window.setTimeout(() => setShow(false), 0);
      return () => window.clearTimeout(t);
    }
    const ctrl = animate(count, 100, { duration: 1.6, ease: [0.65, 0, 0.35, 1] });
    const t = window.setTimeout(() => setShow(false), 1900);
    return () => {
      ctrl.stop();
      window.clearTimeout(t);
    };
  }, [count]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pre"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-between overflow-hidden bg-ink py-10 text-cream"
          exit={{ clipPath: "inset(0 0 100% 0 round 0 0 50% 50%)" }}
          initial={{ clipPath: "inset(0 0 0% 0 round 0 0 0% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span className="font-display text-5xl tabular-nums sm:text-6xl">{label}</motion.span>
          <div className="relative flex items-center gap-3">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-5xl sm:text-7xl"
              style={{ fontFamily: "var(--font-logo), 'Times New Roman', serif" }}
            >
              FeaT &amp; Co
            </motion.span>
            <Thread className="absolute -right-8 -bottom-10 h-20 w-10 text-thread" delay={0.3} />
          </div>
          <div className="flex flex-col items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase">
            <span className="text-thread">✕ ✕ ✕</span>
            <span>Lote 001</span>
          </div>
          {/* pílula bege que atravessa a tela antes de abrir */}
          <motion.div
            aria-hidden
            className="absolute h-[38vmin] w-[150vmax] rounded-full bg-paper"
            initial={{ x: "-120vmax", y: "-40vh", rotate: 32 }}
            animate={{ x: "120vmax", y: "40vh", rotate: 32 }}
            transition={{ duration: 1.1, delay: 1.0, ease: [0.65, 0, 0.35, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
