import type { Metadata } from "next";
import Link from "next/link";
import { TERMS } from "@/lib/store";

export const metadata: Metadata = { title: "Termos de compra" };

export default function TermosPage() {
  return (
    <section className="mx-auto max-w-[900px] px-4 pt-12 pb-24 sm:px-8 sm:pt-16">
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Lote 001</p>
      <h1 className="mt-4 font-display leading-[0.88] uppercase text-[clamp(3rem,8vw,7rem)]">
        Termos de <span className="font-serif normal-case">compra.</span>
      </h1>
      <ol className="mt-14 space-y-8">
        {TERMS.map((t, i) => (
          <li key={t.title} className="border-t border-ink/15 pt-5">
            <h2 className="font-mono text-xs tracking-[0.2em] uppercase">
              {i + 1}. {t.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{t.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-12 text-sm text-muted">
        Resumo das regras de troca na página{" "}
        <Link href="/trocas" className="underline underline-offset-4">Trocas</Link>.
      </p>
    </section>
  );
}
