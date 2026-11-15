"use client";

import { useState } from "react";
import type { Size } from "@/lib/store";

const SIZES: Size[] = ["P", "M", "G"];
const FITS = [
  { v: -1, label: "Mais ajustado", hint: "Mais perto do corpo, menos sobra na manga e no tronco." },
  { v: 0, label: "Como foi pensado", hint: "O boxy original: largo, reto e com o ombro caído." },
  { v: 1, label: "Ainda mais largo", hint: "Bem oversized, com bastante sobra." },
];

function chip(on: boolean) {
  return `rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors ${
    on ? "border-ink bg-ink text-paper" : "border-ink/25 hover:border-ink"
  }`;
}

export default function FitFinder({ onPick }: { onPick: (s: Size) => void }) {
  const [model, setModel] = useState<"m" | "f">("m");
  const [fit, setFit] = useState(0);
  const [h, setH] = useState("");
  const [w, setW] = useState("");

  const hn = Number(h);
  const wn = Number(w);
  const valid = hn >= 130 && hn <= 220 && wn >= 35 && wn <= 180;

  let size: Size | null = null;
  let msg = "Preencha altura e peso.";
  if (valid) {
    let i = hn < 172 && wn < 68 ? 0 : hn <= 183 && wn <= 86 ? 1 : 2;
    if (wn >= 86 && i < 2) i = 2;
    if (wn < 58 && i > 0) i -= 1;
    if (model === "f") i -= 1;
    i += fit;
    const over = i > 2;
    const under = i < 0;
    i = Math.min(2, Math.max(0, i));
    size = SIZES[i];
    const how =
      fit < 0 ? "com um caimento mais ajustado" : fit > 0 ? "ainda mais largo e solto" : "no caimento boxy, largo e reto, como a peça foi pensada";
    msg = `Para ${hn} cm e ${wn} kg, o ${size} veste ${how}.`;
    if (over) msg += " Se quiser ainda mais folga, chama no direct antes de comprar.";
    if (under) msg += " O P já vai ficar com sobra, faz parte do corte.";
  }

  return (
    <div className="grid overflow-hidden rounded-2xl border border-ink/15 sm:grid-cols-[1.2fr_1fr]">
      <div className="space-y-6 p-5 sm:p-6">
        <p className="text-sm leading-relaxed text-ink-2">
          O corte é boxy: mais largo e reto que uma camiseta comum. Diga como você é e como gosta de vestir.
        </p>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Modelagem que você costuma usar</p>
          <div className="mt-2 flex gap-2">
            <button type="button" className={chip(model === "m")} onClick={() => setModel("m")}>Masculina</button>
            <button type="button" className={chip(model === "f")} onClick={() => setModel("f")}>Feminina</button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Altura (cm)</span>
            <input inputMode="numeric" value={h} onChange={(e) => setH(e.target.value)} placeholder="175"
              className="mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-lg outline-none focus:border-ink" />
          </label>
          <label className="block">
            <span className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Peso (kg)</span>
            <input inputMode="numeric" value={w} onChange={(e) => setW(e.target.value)} placeholder="70"
              className="mt-1 w-full border-b border-ink/30 bg-transparent py-2 text-lg outline-none focus:border-ink" />
          </label>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">Como você quer que caia</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FITS.map((f) => (
              <button key={f.v} type="button" className={chip(fit === f.v)} onClick={() => setFit(f.v)}>{f.label}</button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">{FITS.find((f) => f.v === fit)?.hint}</p>
        </div>
      </div>
      <div className="flex flex-col justify-between gap-6 bg-ink p-5 text-paper sm:p-6">
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-paper/50 uppercase">Seu tamanho FeaT&amp;Co</p>
          <p className="mt-2 font-display text-[7rem] leading-[0.85]">{size ?? "?"}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper/80">{msg}</p>
        </div>
        <div className="space-y-2">
          <button type="button" disabled={!size} onClick={() => size && onPick(size)}
            className="w-full rounded-full bg-paper py-3 font-mono text-[11px] tracking-[0.2em] text-ink uppercase disabled:opacity-30">
            Usar este tamanho
          </button>
          <p className="text-[11px] text-paper/50">Estimativa por altura e peso. Na dúvida, chama no direct.</p>
        </div>
      </div>
    </div>
  );
}
