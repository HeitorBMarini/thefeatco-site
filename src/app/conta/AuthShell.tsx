"use client";

import Image from "next/image";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { SplitWords } from "@/components/Reveal";
import { STORE_URL } from "@/lib/store";

/** Visual de login/cadastro. NÃO autentica: o acesso real é na loja Nuvemshop. */
export function AuthShell({
  title,
  intro,
  image,
  realUrl,
  children,
  footer,
}: {
  title: string;
  intro?: string;
  image: { src: string; alt: string };
  realUrl: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  const [tried, setTried] = useState(false);
  return (
    <section className="grid min-h-[calc(100svh-6rem)] lg:grid-cols-2">
      <div className="red-field relative hidden overflow-hidden p-6 lg:block">
        <motion.div
          className="absolute inset-6 overflow-hidden rounded-[2rem]"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={image.src} alt={image.alt} fill preload sizes="50vw" className="object-cover" />
        </motion.div>
        <p className="absolute bottom-8 left-8 font-mono text-[11px] tracking-[0.3em] text-paper uppercase mix-blend-difference">
          Minha conta · FeaT&Co
        </p>
      </div>

      <div className="flex items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <SplitWords as="h1" immediate text={title} className="font-display text-[clamp(3.5rem,min(9vw,14svh),6.5rem)] leading-[0.88] uppercase" />
          {intro && <p className="mt-4 text-ink-2">{intro}</p>}
          <form
            className="mt-10 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              setTried(true);
            }}
          >
            {children}
          </form>
          <AnimatePresence>
            {tried && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
                role="status"
              >
                <p className="mt-6 bg-paper-2 p-4 text-sm leading-relaxed text-ink-2">
                  Esta tela é só o novo visual. Para entrar ou criar sua conta de verdade, use a{" "}
                  <a href={realUrl} target="_blank" rel="noreferrer" className="underline">
                    página da loja oficial ↗
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-10 border-t border-ink/15 pt-6 text-sm">{footer}</div>
          <p className="mt-4 font-mono text-[10px] tracking-[0.15em] text-muted uppercase">
            Loja oficial: <a href={STORE_URL} target="_blank" rel="noreferrer" className="underline">{STORE_URL.replace("https://", "")}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  autoComplete,
  name,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  name: string;
}) {
  const [show, setShow] = useState(false);
  const isPwd = type === "password";
  return (
    <label className="block">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase">{label}</span>
      <span className="relative mt-2 block">
        <input
          name={name}
          type={isPwd && show ? "text" : type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="peer w-full border-b border-ink/25 bg-transparent py-3 pr-24 text-lg outline-none placeholder:text-ink/25"
        />
        <span className="absolute bottom-0 left-0 h-px w-0 bg-ink transition-all duration-500 peer-focus:w-full" />
        {isPwd && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute top-1/2 right-0 flex -translate-y-1/2 items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase"
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            {show ? "Esconder" : "Mostrar"}
          </button>
        )}
      </span>
    </label>
  );
}

export function Submit({ children }: { children: ReactNode }) {
  return (
    <button className="h-14 w-full rounded-full bg-red font-mono text-xs tracking-[0.25em] text-cream uppercase transition-colors hover:bg-red-deep">
      {children}
    </button>
  );
}

