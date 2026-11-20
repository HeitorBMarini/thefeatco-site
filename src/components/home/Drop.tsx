import Image from "next/image";
import Link from "next/link";
import { brl, PRODUCTS, stockLabel } from "@/lib/store";

/** As duas camisetas, com bastante respiro. */
export default function Drop() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-28 sm:px-8 sm:py-40">
      <p className="text-center font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Lote 001</p>
      <div className="mt-14 grid gap-16 sm:grid-cols-2 sm:gap-10">
        {PRODUCTS.map((p) => (
          <Link key={p.slug} href={`/produtos/${p.slug}`} className="group block">
            <div className="relative aspect-[1024/1271] overflow-hidden bg-paper-2">
              <Image
                src={p.images[0].src}
                alt={p.images[0].alt}
                fill
                sizes="(min-width:640px) 45vw, 92vw"
                className="object-cover transition-opacity duration-700 group-hover:opacity-90"
              />
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <h3 className="font-mono text-xs tracking-[0.2em] uppercase">{p.color}</h3>
              <p className="font-mono text-xs tracking-[0.1em]">
                {brl(p.price)} <span className="text-muted">· {brl(p.pixPrice)} no Pix</span>
              </p>
            </div>
            {(() => {
              const low = p.sizes.filter((s) => s.stock > 0 && s.stock <= 4);
              return low.length ? (
                <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-red uppercase">
                  {stockLabel(low[0].stock)} no {low.map((s) => s.size).join(" e ")}
                </p>
              ) : null;
            })()}
          </Link>
        ))}
      </div>
    </section>
  );
}
