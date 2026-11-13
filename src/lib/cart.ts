"use client";

import { useSyncExternalStore } from "react";
import type { Size } from "./store";

// Carrinho de DEMONSTRAÇÃO: fica só no navegador (localStorage).
// A compra de verdade continua na loja Nuvemshop.

export type CartLine = { slug: string; size: Size; qty: number };
type State = { lines: CartLine[]; open: boolean };

const KEY = "featco-cart-demo";
const EMPTY: State = { lines: [], open: false };
let state: State = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { lines: JSON.parse(raw) as CartLine[], open: false };
  } catch {
    /* sem storage: segue vazio */
  }
}

function set(next: State) {
  state = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next.lines));
  } catch {
    /* ignora */
  }
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  load();
  return state;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
}

export const cart = {
  add(slug: string, size: Size) {
    const lines = [...state.lines];
    const i = lines.findIndex((l) => l.slug === slug && l.size === size);
    if (i >= 0) lines[i] = { ...lines[i], qty: lines[i].qty + 1 };
    else lines.push({ slug, size, qty: 1 });
    set({ lines, open: true });
  },
  setQty(slug: string, size: Size, qty: number) {
    const lines = state.lines
      .map((l) => (l.slug === slug && l.size === size ? { ...l, qty } : l))
      .filter((l) => l.qty > 0);
    set({ ...state, lines });
  },
  open() {
    set({ ...state, open: true });
  },
  close() {
    set({ ...state, open: false });
  },
};
