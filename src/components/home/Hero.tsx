"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import { INSTITUTIONAL } from "@/lib/store";
import { ScribbleButton, Thread } from "../Brim";

const line: Variants = {
  hidden: { y: "105%" },
  show: (i: number) => ({ y: "0%", transition: { duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] } }),
};

// Tamanho do título: limitado pela largura E pela altura da tela.
const BIG = "text-[clamp(4.2rem,min(17.5vw,25svh),19rem)]";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  const leftX = useTransform(smooth, [0, 1], ["0%", reduce ? "0%" : "-18%"]);
  const rightX = useTransform(smooth, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const cardY = useTransform(smooth, [0, 1], ["0%", reduce ? "0%" : "-30%"]);
  const cardR = useTransform(smooth, [0, 1], [6, reduce ? 6 : -4]);

  return (
    <section
      ref={ref}
      className="relative flex h-[calc(100svh-6rem)] min-h-[520px] flex-col justify-between overflow-hidden bg-paper px-4 pt-6 pb-6 text-ink sm:px-8"
    >
      {/* Linha 1 */}
      <motion.h1 initial={reduce ? false : "hidden"} animate="show" aria-label="Feito à mão. Não em massa." className="relative z-10">
        <span className={`block overflow-hidden pt-[0.22em] leading-[0.86] ${BIG}`}>
          <motion.span
            custom={0}
            variants={line}
            style={{ x: leftX }}
            className={`block font-display leading-[0.86] tracking-[-0.01em] uppercase ${BIG}`}
            aria-hidden
          >
            Feito à m
            <span className="relative inline-block">
              ã
              <Thread className="absolute top-[18%] left-1/2 h-[64%] w-[38%] -translate-x-1/2 text-paper" delay={1.3} />
            </span>
            o
          </motion.span>
        </span>
      </motion.h1>

      {/* Meio: botão rabiscado, slogan e foto */}
      <div className="relative z-20 grid items-center gap-6 md:grid-cols-[auto_1fr_auto]">
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:block"
        >
          <ScribbleButton href="/produtos" color="#141210">Ver produtos</ScribbleButton>
        </motion.div>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="max-w-[55%] md:max-w-md"
        >
          <p className="font-mono text-[11px] tracking-[0.25em] text-ink/55 uppercase">{INSTITUTIONAL.kicker}</p>
          <p className="mt-2 font-display text-2xl leading-none uppercase sm:text-4xl">{INSTITUTIONAL.title}</p>
          <p className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase">6% off no Pix</p>
        </motion.div>
        <div className="md:hidden">
          <ScribbleButton href="/produtos" color="#141210">Ver produtos</ScribbleButton>
        </div>
      </div>

      {/* Linha 2 */}
      <div className={`relative z-10 overflow-hidden pt-[0.22em] leading-[0.86] ${BIG}`}>
        <motion.span
          initial={reduce ? false : "hidden"}
          animate="show"
          custom={1}
          variants={line}
          style={{ x: rightX }}
          className={`block text-right font-display leading-[0.86] tracking-[-0.01em] uppercase ${BIG}`}
          aria-hidden
        >
          Não em massa
        </motion.span>
      </div>

      {/* Foto que atravessa o título (no lugar da modelo recortada do Brim) */}
      <motion.div
        style={{ y: cardY, rotate: cardR }}
        initial={reduce ? false : { opacity: 0, scale: 0.85, y: 60 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[14%] right-[6%] z-[15] hidden aspect-[1080/1350] h-[62%] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(20,18,16,.55)] md:block"
      >
        <Image src="/img/banner-3.webp" alt="Detalhe do patch FT&Co bordado na camiseta off-white" fill preload sizes="40vw" quality={90} className="object-cover" />
      </motion.div>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-[30%] right-4 z-[5] aspect-[1080/1350] w-[42%] overflow-hidden rounded-3xl md:hidden"
      >
        <Image src="/img/banner-3.webp" alt="" fill sizes="45vw" className="object-cover" />
      </motion.div>
    </section>
  );
}
