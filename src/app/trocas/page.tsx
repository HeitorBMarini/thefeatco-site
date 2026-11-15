import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { DIRECT_URL, TROCAS } from "@/lib/store";

export const metadata: Metadata = { title: "Trocas" };

export default function TrocasPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-4 pt-12 pb-24 sm:px-8 sm:pt-16">
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Trocas e devoluções</p>
      <h1 className="mt-4 font-display leading-[0.88] uppercase text-[clamp(3.5rem,10vw,10rem)]">
        Regra <span className="font-serif normal-case">clara.</span>
      </h1>
      <p className="mt-6 max-w-xl text-xl leading-relaxed text-ink-2">{TROCAS.intro}</p>

      <div className="mt-16 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {TROCAS.rules.map((r, i) => (
          <Reveal key={r.title} delay={(i % 2) * 0.08}>
            <div className="border-t border-ink/20 pt-5">
              <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-2 font-display text-3xl uppercase sm:text-4xl">{r.title}</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{r.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted">
        Leia também os <Link href="/termos" className="underline underline-offset-4">termos de compra completos</Link>.
      </p>
      <a
        href={DIRECT_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-16 inline-flex h-14 items-center justify-center rounded-full bg-ink px-8 font-mono text-xs tracking-[0.25em] text-paper uppercase"
      >
        Falar no direct ↗
      </a>
    </section>
  );
}
