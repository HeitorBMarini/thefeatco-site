"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { WELCOME } from "@/lib/store";
import { Reveal } from "../Reveal";

// Fios que "soltam" do patch conforme a rolagem: a peça continua desfiando com o uso.
const THREADS = [
  "M210 120 C 240 60, 300 40, 330 -20",
  "M90 140 C 60 90, 30 70, -30 40",
  "M120 380 C 100 430, 60 470, -20 500",
  "M300 360 C 340 400, 380 420, 440 470",
  "M250 110 C 270 70, 260 30, 290 -30",
  "M95 260 C 50 260, 20 240, -40 250",
  "M320 240 C 370 230, 400 250, 450 230",
];

export default function Welcome() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  const draw = useTransform(smooth, [0.2, 0.65], [0, 1]);
  const rotate = useTransform(smooth, [0, 1], [-4, 3]);
  const counter = useTransform(rotate, (r) => -r * 1.6);
  const leftX = useTransform(smooth, [0.1, 0.5], reduce ? ["0%", "0%"] : ["-12%", "0%"]);
  const rightX = useTransform(smooth, [0.1, 0.5], reduce ? ["0%", "0%"] : ["12%", "0%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-4 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 className="font-serif leading-[0.9] tracking-[-0.02em] text-[clamp(3.25rem,9vw,9.5rem)]">
            <motion.span style={{ x: leftX }} className="block">
              {WELCOME.title[0]}
            </motion.span>
            <motion.span style={{ x: rightX }} className="block pl-[8%] italic text-ink-2">
              {WELCOME.title[1]}
            </motion.span>
          </h2>
          <Reveal delay={0.1}>
            <div className="mt-10 flex max-w-xl gap-5">
              <span className="mt-3 hidden w-12 shrink-0 text-thread stitch sm:block" aria-hidden />
              <p className="text-lg leading-relaxed text-ink-2 sm:text-xl">{WELCOME.text}</p>
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-[420px]">
          <svg
            viewBox="0 0 420 520"
            className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible text-ink"
            aria-hidden
          >
            {THREADS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="none"
                stroke="currentColor"
                strokeWidth={i % 2 ? 0.8 : 1.2}
                strokeLinecap="round"
                style={{ pathLength: draw, opacity: 0.55 }}
              />
            ))}
          </svg>
          <motion.div style={{ rotate }} className="frayed relative aspect-[1024/1271] bg-paper-2 shadow-[0_30px_60px_-30px_rgba(20,18,16,.45)]">
            <Image
              src="/img/ow-2.webp"
              alt="Detalhe do patch FT&Co desfiado na camiseta off-white"
              fill
              sizes="(min-width:1024px) 420px, 90vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ rotate: counter }}
            className="frayed absolute -bottom-10 -left-8 aspect-[1024/1271] w-[45%] bg-ink shadow-xl sm:-left-16"
          >
            <Image src="/img/pt-2.webp" alt="Detalhe do patch FT&Co na camiseta preta" fill sizes="200px" className="object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
