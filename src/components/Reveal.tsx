"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
  y = 28,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const word: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

/** Título palavra a palavra. O gatilho fica no contêiner (lição do Vanguard). */
export function SplitWords({
  text,
  className,
  as = "h2",
  immediate = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "-10% 0px" } };
  return (
    <Tag className={className} variants={container} initial={reduce ? false : "hidden"} {...trigger} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="-mt-[0.2em] inline-block overflow-hidden pt-[0.2em] pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={word}>
            {w}
            {" "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
