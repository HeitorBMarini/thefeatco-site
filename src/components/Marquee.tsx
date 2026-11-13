"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ADBAR } from "@/lib/store";

export default function Marquee({ dark = true, items = ADBAR }: { dark?: boolean; items?: string[] }) {
  const reduce = useReducedMotion();
  const row = Array.from({ length: 6 }, () => items).flat();
  return (
    <div
      className={`overflow-hidden whitespace-nowrap border-y ${
        dark ? "border-ink bg-ink text-cream" : "border-ink/15 text-ink"
      }`}
    >
      <motion.div
        className="flex w-max gap-10 py-2 font-mono text-[11px] tracking-[0.25em] uppercase"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {[...row, ...row].map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            {t}
            <span aria-hidden className="opacity-40">✕</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
