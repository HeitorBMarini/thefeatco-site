import Image from "next/image";
import Link from "next/link";
import { HERO } from "@/lib/store";

/**
 * Topo minimalista: uma foto grande e uma frase.
 * No celular a foto aparece inteira, na horizontal, com o texto embaixo.
 * A partir do tablet/computador, a foto ocupa a tela e o texto fica por cima.
 */
export default function Hero() {
  return (
    <section className="relative bg-ink sm:h-[calc(100svh-6rem)] sm:min-h-[520px] sm:overflow-hidden">
      <div className="relative aspect-[1920/800] w-full sm:absolute sm:inset-0 sm:aspect-auto">
        <Image src={HERO.src} alt={HERO.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 hidden bg-gradient-to-t from-ink/70 via-ink/10 to-transparent sm:block" />
      </div>
      <div className="flex flex-col gap-6 px-4 pt-8 pb-10 text-paper sm:absolute sm:inset-x-0 sm:bottom-0 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pt-0 sm:pb-14">
        <h1 className="max-w-xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1]">Seu essencial.</h1>
        <Link
          href="/produtos"
          className="self-start border-b border-paper pb-1 font-mono text-xs tracking-[0.25em] uppercase sm:self-auto"
        >
          Ver o drop →
        </Link>
      </div>
    </section>
  );
}
