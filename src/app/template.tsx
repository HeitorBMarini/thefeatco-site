"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Troca de página (Brim): cortina escura com a borda de baixo curva sobe e revela a página. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="red-field pointer-events-none fixed inset-x-0 top-0 z-[80] h-[115svh]"
          style={{ borderBottomLeftRadius: "50% 14%", borderBottomRightRadius: "50% 14%" }}
          initial={{ y: "0%" }}
          animate={{ y: "-115%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      >
        {children}
      </motion.div>
    </>
  );
}
