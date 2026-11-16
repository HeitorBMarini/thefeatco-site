import Image from "next/image";

/** Foto de campanha em largura total, sem texto por cima. */
export default function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="relative aspect-[1800/1005] w-full overflow-hidden bg-paper-2">
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
    </section>
  );
}
