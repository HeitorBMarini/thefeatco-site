import { WELCOME } from "@/lib/store";

/** O conceito do patch, curto e centralizado. */
export default function Welcome() {
  return (
    <section className="border-t border-ink/10 px-4 py-28 text-center sm:px-8 sm:py-40">
      <h2 className="font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[1]">
        {WELCOME.title[0]}.
        <br />
        <span className="text-ink-2">{WELCOME.title[1]}.</span>
      </h2>
      <p className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-ink-2">{WELCOME.text}</p>
      <ol className="mt-10 flex justify-center gap-8 font-mono text-[11px] tracking-[0.25em] uppercase">
        {WELCOME.steps.map((step, i) => (
          <li key={step}>
            <span className="text-muted">{String(i + 1).padStart(2, "0")}</span> {step}
          </li>
        ))}
      </ol>
    </section>
  );
}
