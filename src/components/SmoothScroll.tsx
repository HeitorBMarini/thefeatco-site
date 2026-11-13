"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import { useCart } from "@/lib/cart";

/** Liga/desliga o Lenis junto com o carrinho e volta ao topo ao trocar de página. */
function Sync() {
  const lenis = useLenis();
  const pathname = usePathname();
  const { open } = useCart();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  return null;
}

/** Rolagem com inércia (Lenis). Com "reduzir movimento", fica a rolagem nativa. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        // respeita prefers-reduced-motion
        ...(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? { smoothWheel: false, lerp: 1 }
          : {}),
      }}
    >
      <Sync />
      {children}
    </ReactLenis>
  );
}
