import Image from "next/image";
import { CRAFT } from "@/lib/store";
import { Reveal } from "../Reveal";

/** Feito à mão: o processo do patch em três passos. */
export default function Craft() {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="frayed relative aspect-[1024/1271] w-full max-w-[520px] overflow-hidden bg-paper-2">
            <Image
              src="/img/banner-3.webp"
              alt="Detalhe do patch FT&Co bordado e desfiado à mão"
              fill
              sizes="(min-width:1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.3em] text-paper/50 uppercase">{CRAFT.kicker}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 leading-[0.95] text-[clamp(2.75rem,6vw,6.5rem)]">
              <span className="block font-display uppercase">{CRAFT.title[0]}</span>
              <span className="mt-2 block font-serif text-thread">{CRAFT.title[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-10 max-w-md border-t border-paper/25 pt-5 text-lg leading-relaxed text-paper/85">{CRAFT.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
