import Link from "next/link";
import { InstagramIcon } from "./Icons";
import { COPYRIGHT, DIRECT_URL, INSTAGRAM_HANDLE, INSTAGRAM_URL, INSTITUTIONAL } from "@/lib/store";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="mx-auto max-w-[1600px] px-4 pt-16 pb-8 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.25em] text-paper/50 uppercase">{INSTITUTIONAL.kicker}</p>
            <p className="mt-4 max-w-md font-display text-5xl leading-[0.95] uppercase sm:text-6xl">{INSTITUTIONAL.title}</p>
          </div>
          <nav aria-label="Rodapé" className="flex flex-col gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="mb-2 text-paper/40">Navegue</span>
            <Link href="/" className="hover:text-thread">Início</Link>
            <Link href="/produtos" className="hover:text-thread">Produtos</Link>
            <Link href="/sobre" className="hover:text-thread">Sobre & contato</Link>
            <Link href="/conta" className="hover:text-thread">Minha conta</Link>
          </nav>
          <div className="flex flex-col gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span className="mb-2 text-paper/40">Fale com a gente</span>
            <a href={DIRECT_URL} target="_blank" rel="noreferrer" className="hover:text-thread">
              Fale no direct ↗
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 normal-case tracking-normal hover:text-thread"
            >
              <InstagramIcon className="size-4" /> {INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <p
          aria-hidden
          className="mt-20 text-center leading-[0.8] whitespace-nowrap text-paper/90 text-[20vw] min-[1600px]:text-[340px]"
          style={{ fontFamily: "var(--font-logo), \"Times New Roman\", serif" }}
        >
          FeaT &amp; Co
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-[10px] tracking-[0.15em] text-paper/50 uppercase sm:flex-row sm:justify-between">
          <span>{COPYRIGHT}</span>
          <span>Protótipo de redesign · compra real na loja Nuvemshop</span>
        </div>
      </div>
    </footer>
  );
}
