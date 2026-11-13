import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, SplitWords } from "@/components/Reveal";
import { InstagramIcon } from "@/components/Icons";
import ContactForm from "./ContactForm";
import { ADBAR, DIRECT_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, INSTITUTIONAL, WELCOME } from "@/lib/store";

export const metadata: Metadata = { title: "Sobre & contato" };

export default function SobrePage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-4 pt-12 sm:px-8 sm:pt-16">
        <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">{INSTITUTIONAL.kicker}</p>
        <SplitWords
          as="h1"
          immediate
          text={INSTITUTIONAL.title}
          className="mt-4 max-w-[14ch] font-display leading-[0.88] uppercase text-[clamp(3.5rem,min(10vw,17svh),11rem)]"
        />
      </section>

      <section className="mx-auto mt-16 grid max-w-[1600px] gap-6 px-4 sm:px-8 md:grid-cols-12">
        <Reveal className="md:col-span-7">
          <div className="relative aspect-[1800/1005] overflow-hidden rounded-3xl">
            <Image src="/img/banner-1.webp" alt="Dupla de costas com camisetas FeaT&Co" fill sizes="(min-width:768px) 58vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-5 md:mt-24">
          <div className="relative aspect-[1450/1800] overflow-hidden rounded-3xl">
            <Image src="/img/banner-2.webp" alt="Camiseta com patch FT&Co desfiado" fill sizes="(min-width:768px) 40vw, 100vw" className="object-cover" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-12 px-4 py-24 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <h2 className="font-serif text-[clamp(2.75rem,6vw,6rem)] leading-[0.92]">
            {WELCOME.title[0]}
            <br />
            <span className="italic text-ink-2">{WELCOME.title[1]}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl leading-relaxed text-ink-2">{WELCOME.text}</p>
          <ul className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {ADBAR.map((a, i) => (
              <li key={a} className="flex items-baseline gap-6 py-4">
                <span className="font-mono text-[11px] text-muted">0{i + 1}</span>
                <span className="font-mono text-sm tracking-[0.2em] uppercase">{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section id="contato" className="red-field scroll-mt-28 text-cream">
        <div className="mx-auto grid max-w-[1600px] gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-paper/50 uppercase">Contato</p>
            <h2 className="mt-4 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.88] uppercase">
              Fale no <span className="italic">direct</span>
            </h2>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href={DIRECT_URL}
                target="_blank"
                rel="noreferrer"
                className="bg-paper px-6 py-4 text-center font-mono text-xs tracking-[0.2em] text-ink uppercase"
              >
                Abrir o direct ↗
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 border border-paper/40 px-6 py-4 font-mono text-xs tracking-[0.1em]"
              >
                <InstagramIcon className="size-4" /> {INSTAGRAM_HANDLE}
              </a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
