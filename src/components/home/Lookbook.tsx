"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { BANNERS } from "@/lib/store";

/** Galeria horizontal guiada pela rolagem (desktop) e com arrasto/snap (celular). */
export default function Lookbook() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });
  // anda exatamente até a última foto encostar na margem direita
  const x = useTransform(smooth, (p) => {
    const el = track.current;
    if (!el || reduce) return 0;
    return -p * Math.max(0, el.scrollWidth - window.innerWidth + 32);
  });
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* desktop */}
      <section ref={ref} className="relative hidden h-[320vh] bg-ink text-paper md:block" aria-label="Lookbook">
        <div className="sticky top-24 flex h-[calc(100svh-6rem)] flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-6 flex w-full max-w-[1600px] items-end justify-between px-8">
            <p className="font-mono text-[11px] tracking-[0.3em] uppercase">Lote 001 — lookbook</p>
            <div className="h-px w-48 bg-paper/20">
              <motion.div className="h-px bg-paper" style={{ width: bar }} />
            </div>
          </div>
          <motion.div ref={track} style={{ x }} className="flex h-[72%] w-max gap-6 pl-8">
            {BANNERS.map((b, i) => (
              <figure
                key={b.src}
                className="relative h-full shrink-0 overflow-hidden"
                style={{ aspectRatio: `${b.w}/${b.h}` }}
              >
                <Image src={b.src} alt={b.alt} fill sizes="(min-width:768px) 70vw, 90vw" quality={90} className="object-cover" />
                <figcaption className="absolute bottom-3 left-3 font-mono text-[10px] tracking-[0.25em] uppercase mix-blend-difference">
                  {String(i + 1).padStart(2, "0")} / {String(BANNERS.length).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* celular */}
      <section className="bg-ink py-12 text-paper md:hidden" aria-label="Lookbook">
        <p className="px-4 font-mono text-[11px] tracking-[0.3em] uppercase">Lote 001 — lookbook</p>
        <div className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
          {BANNERS.map((b) => (
            <figure
              key={b.src}
              className="relative h-[62svh] shrink-0 snap-center overflow-hidden"
              style={{ aspectRatio: `${b.w}/${b.h}`, maxWidth: "88vw" }}
            >
              <Image src={b.src} alt={b.alt} fill sizes="88vw" className="object-cover" />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
