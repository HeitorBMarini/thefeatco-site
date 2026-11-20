"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { CRAFT, INSTITUTIONAL, LOTE_DEADLINE } from "@/lib/store";
import { Reveal } from "../Reveal";

/** Fechamento: "Toda grande faixa tem um feat." num disco girando com o patch no selo. */
export default function Record() {
  const reduce = useReducedMotion();
  const ring = `${INSTITUTIONAL.title.toUpperCase()} · ${INSTITUTIONAL.kicker.toUpperCase()} · `.repeat(2);
  return (
    <section className="relative overflow-hidden border-t border-ink/10 py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-4 sm:px-8 lg:grid-cols-2">
        <div className="relative mx-auto aspect-square w-full max-w-[min(560px,80svh)]">
          <motion.div
            className="absolute inset-0 rounded-full bg-ink shadow-[0_40px_80px_-40px_rgba(20,18,16,.6)]"
            style={{
              backgroundImage:
                "repeating-radial-gradient(circle at center, rgba(239,234,225,.07) 0 1px, transparent 1px 5px)",
            }}
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
          >
            <div className="absolute inset-[31%] overflow-hidden rounded-full">
              <Image src="/img/ow-2.webp" alt="" fill sizes="420px" quality={90} className="scale-150 object-cover" />
            </div>
            <div className="absolute top-1/2 left-1/2 size-3 -translate-1/2 rounded-full bg-paper" />
          </motion.div>
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute -inset-[6%] text-ink"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            aria-hidden
          >
            <defs>
              <path id="ring" d="M100,100 m-94,0 a94,94 0 1,1 188,0 a94,94 0 1,1 -188,0" />
            </defs>
            <text className="fill-current font-mono" style={{ fontSize: 6.2, letterSpacing: 1.05 }}>
              <textPath href="#ring">{ring}</textPath>
            </text>
          </motion.svg>
        </div>

        <div>
          <Reveal delay={0.08}>
            <h2 className="font-serif leading-[1] text-[clamp(2.5rem,5.5vw,5.5rem)]">
              {CRAFT.title[0]} <br /><span className="text-ink-2">{CRAFT.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-2">{CRAFT.text}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <Link
              href="/produtos"
              className="group mt-10 inline-flex items-center gap-3 border-b border-ink pb-1 font-mono text-xs tracking-[0.2em] uppercase"
            >
              Garantir a minha <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
              Lote 001 encerra {LOTE_DEADLINE}. Sem reposição.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
