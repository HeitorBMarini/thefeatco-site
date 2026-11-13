"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DIRECT_URL, STORE_URL } from "@/lib/store";

const FIELDS = [
  { name: "nome", label: "Nome", type: "text", placeholder: "ex.: Maria Perez", autoComplete: "name" },
  { name: "email", label: "E-mail", type: "email", placeholder: "ex.: seuemail@email.com.br", autoComplete: "email" },
  { name: "telefone", label: "Telefone", type: "tel", placeholder: "ex.: 11971923030", autoComplete: "tel" },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {FIELDS.map((f) => (
        <label key={f.name} className="block">
          <span className="font-mono text-[11px] tracking-[0.2em] text-paper/60 uppercase">{f.label}</span>
          <input
            name={f.name}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            className="mt-2 w-full border-b border-paper/30 bg-transparent py-3 text-lg outline-none placeholder:text-paper/25 focus:border-paper"
          />
        </label>
      ))}
      <label className="block">
        <span className="font-mono text-[11px] tracking-[0.2em] text-paper/60 uppercase">Mensagem</span>
        <textarea
          name="mensagem"
          rows={4}
          placeholder="ex.: Sua mensagem"
          className="mt-2 w-full resize-none border-b border-paper/30 bg-transparent py-3 text-lg outline-none placeholder:text-paper/25 focus:border-paper"
        />
      </label>
      <button className="w-full border border-paper py-4 font-mono text-xs tracking-[0.25em] uppercase transition-colors hover:bg-paper hover:text-ink">
        Enviar
      </button>
      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="text-sm leading-relaxed text-paper/70"
          >
            Protótipo: este formulário não envia mensagens. Use o{" "}
            <a href={DIRECT_URL} target="_blank" rel="noreferrer" className="underline">
              direct
            </a>{" "}
            ou o{" "}
            <a href={`${STORE_URL}/contato/`} target="_blank" rel="noreferrer" className="underline">
              contato da loja oficial
            </a>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
