"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Fio solto que atravessa uma letra: o "desfiado" da FeaT&Co no lugar do squiggle do Brim. */
export function Thread({ className = "", delay = 0.6, color = "currentColor" }: { className?: string; delay?: number; color?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 60 120" fill="none" className={`pointer-events-none ${className}`} aria-hidden>
      <motion.path
        d="M30 2 C 30 18, 48 22, 46 36 C 44 50, 14 46, 14 60 C 14 74, 46 72, 46 86 C 46 100, 22 102, 30 118"
        stroke={color}
        strokeWidth={4.5}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}

/** Círculo rabiscado à mão em volta do texto (o "DISCOVER" do Brim). */
export function ScribbleButton({
  href,
  children,
  external,
  onClick,
  className = "",
  color = "#d9c9a8",
}: {
  href?: string;
  children: ReactNode;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  color?: string;
}) {
  const inner = (
    <motion.span
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
      className={`relative inline-flex h-28 w-56 items-center justify-center px-4 text-center font-display text-xl leading-none tracking-[0.04em] uppercase ${className}`}
    >
      <svg viewBox="0 0 200 120" className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden>
        <motion.path
          d="M18 70 C 10 30, 90 8, 150 18 C 196 26, 196 86, 120 102 C 60 114, 6 96, 22 58 C 34 34, 120 22, 176 44"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          variants={{ rest: { pathLength: 0.82, rotate: 0 }, hover: { pathLength: 1, rotate: -4 } }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ filter: "url(#rough)" }}
        />
        <motion.path
          d="M40 18 L 70 44 M 150 8 L 132 36 M 160 112 L 140 90"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          variants={{ rest: { pathLength: 1, opacity: 1 }, hover: { pathLength: 1, opacity: 0.6 } }}
        />
        <defs>
          <filter id="rough">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3" />
          </filter>
        </defs>
      </svg>
      <motion.span variants={{ rest: { y: 0 }, hover: { y: -2 } }} className="relative">
        {children}
      </motion.span>
    </motion.span>
  );
  if (onClick) return <button onClick={onClick} data-cursor="big">{inner}</button>;
  if (external)
    return (
      <a href={href} target="_blank" rel="noreferrer" data-cursor="big">
        {inner}
      </a>
    );
  return (
    <Link href={href ?? "/"} data-cursor="big">
      {inner}
    </Link>
  );
}

/** Botão de fita adesiva (o "GALLERY" do Brim). */
export function TapeButton({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `tape inline-flex items-center justify-center px-6 py-2.5 font-mono text-[11px] font-medium tracking-[0.2em] uppercase transition-transform duration-300 hover:-rotate-2 hover:scale-105 ${className}`;
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
