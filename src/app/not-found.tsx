import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60svh] max-w-[1600px] flex-col items-start justify-center px-4 py-24 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">404</p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.92]">Página não encontrada</h1>
      <Link href="/produtos" className="mt-10 bg-ink px-6 py-4 font-mono text-xs tracking-[0.2em] text-paper uppercase">
        Ver mais produtos
      </Link>
    </section>
  );
}
