import Image from "next/image";
import Link from "next/link";
import { HERO, INSTITUTIONAL } from "@/lib/store";

/** Topo minimalista: uma foto grande e uma frase. */
export default function Hero() {
  return (
    <section className="relative h-[calc(100svh-6rem)] min-h-[520px] overflow-hidden bg-ink">
      <Image src={HERO.src} alt={HERO.alt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 px-4 pb-10 text-paper sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-14">
        <h1 className="max-w-xl font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-[1]">{INSTITUTIONAL.title}</h1>
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
