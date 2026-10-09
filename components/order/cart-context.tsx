"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { allItems, type MenuItem } from "@/content/menu";

export type CartLine = { key: string; id: string; choice?: string; qty: number };

type CartContextValue = {
  lines: (CartLine & { item: MenuItem })[];
  count: number;
  /** Total of priced lines; "call for price" lines are excluded. */
  total: number;
  hasUnpriced: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (id: string, choice?: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sg-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRaw(JSON.parse(stored));
      }
    } catch {
      // Storage unavailable (private mode) — cart just won't persist.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(raw));
    } catch {
      // ignore
    }
  }, [raw, hydrated]);

  const add = useCallback((id: string, choice?: string) => {
    const key = choice ? `${id}:${choice}` : id;
    setRaw((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { key, id, choice, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setRaw((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty } : l))
    );
  }, []);

  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.flatMap((line) => {
      const item = allItems.find((i) => i.id === line.id);
      return item ? [{ ...line, item }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + (l.item.price ?? 0) * l.qty, 0),
      hasUnpriced: lines.some((l) => l.item.price === null),
      open,
      setOpen,
      add,
      setQty,
      clear,
    };
  }, [raw, open, add, setQty, clear]);

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}

/** Plain-text order summary, shared by the SMS link and the API email. */
export function orderSummary(lines: CartContextValue["lines"]) {
  return lines
    .map(
      (l) =>
        `${l.qty} x ${l.item.name}${l.choice ? ` (${l.choice})` : ""}${
          l.item.price === null ? " — call for price" : ` — $${l.item.price * l.qty}`
        }`
    )
    .join("\n");
}
