"use client";

import { Check, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { useCart } from "@/components/order/cart-context";
import { allItems } from "@/content/menu";
import { primaryPhone } from "@/content/site";

type Option = { key: string; id: string; choice?: string; name: string; unit: string; price: number; image: string };

const fishPhotos: Record<string, string> = {
  "Mahi mahi": "/media/photos/snapper-fillets.jpg",
  Snapper: "/media/photos/whole-snapper.jpg",
  Grouper: "/media/photos/fried-snapper.jpg",
  Salmon: "/media/photos/salmon-case.jpg",
  Tuna: "/media/photos/tuna-loin.jpg",
  Corvina: "/media/photos/snapper-fillets.jpg",
};

/** Everything that can go in a custom box: one row per fish species, plus lobster and shrimp. */
const options: Option[] = allItems.flatMap((item): Option[] => {
  if (item.price === null || !["fish-case", "lobster-case", "tail-medium", "tail-large", "shrimp-addon"].includes(item.id)) {
    return [];
  }
  if (item.id === "fish-case" && item.choice) {
    return item.choice.options.map((species) => ({
      key: `${item.id}:${species}`,
      id: item.id,
      choice: species,
      name: `${species} case`,
      unit: item.unit ?? "",
      price: item.price as number,
      image: fishPhotos[species] ?? item.image,
    }));
  }
  return [{ key: item.id, id: item.id, name: item.name, unit: item.unit ?? "", price: item.price, image: item.image }];
});

const PER_COOLER = 12;

/** Where the copies behind a stacked tile sit, as a % of the tile. */
const fan = [
  { rotate: -11, x: "-14%", y: "6%" },
  { rotate: 12, x: "14%", y: "-5%" },
  { rotate: -4, x: "4%", y: "-14%" },
];

export function BoxBuilder() {
  const { add } = useCart();
  const [qty, setQty] = useState<Record<string, number>>({});
  const [added, setAdded] = useState(false);

  const change = (key: string, delta: number) =>
    setQty((q) => {
      const next = Math.max(0, Math.min(40, (q[key] ?? 0) + delta));
      const copy = { ...q, [key]: next };
      if (next === 0) {
        delete copy[key];
      }
      return copy;
    });

  const lines = options.filter((o) => qty[o.key]);
  const units = lines.reduce((n, o) => n + qty[o.key], 0);
  const total = lines.reduce((n, o) => n + o.price * qty[o.key], 0);
  const coolers = Math.max(1, Math.ceil(units / PER_COOLER));
  // How full the last cooler is.
  const fill = units === 0 ? 0 : ((units - 1) % PER_COOLER) + 1;

  const sms = `Hi Seafood Guys! I'd like this box:\n${lines.map((o) => `${qty[o.key]} × ${o.name}`).join("\n")}\nEstimated $${total}`;

  const addAll = () => {
    for (const o of lines) {
      for (let i = 0; i < qty[o.key]; i++) {
        add(o.id, o.choice);
      }
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr]">
      {/* Picker */}
      <ul className="space-y-3">
        {options.map((o) => {
          const n = qty[o.key] ?? 0;
          return (
            <li className={`flex items-center gap-4 rounded-3xl bg-white p-3 pr-4 transition ${n ? "ring-2 ring-lime" : ""}`} key={o.key}>
              <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                <Image alt="" className="object-cover" fill sizes="64px" src={o.image} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-abyss text-xl uppercase leading-tight">{o.name}</p>
                <p className="text-ink/55 text-sm">
                  ${o.price} · {o.unit}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label={`Remove one ${o.name}`}
                  className="grid size-9 place-items-center rounded-full border border-abyss/15 text-abyss transition hover:bg-foam disabled:opacity-30"
                  disabled={!n}
                  onClick={() => change(o.key, -1)}
                  type="button"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center font-display text-abyss text-xl">{n}</span>
                <button
                  aria-label={`Add one ${o.name}`}
                  className="grid size-9 place-items-center rounded-full bg-abyss text-lime transition hover:bg-navy"
                  onClick={() => change(o.key, 1)}
                  type="button"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Coolers */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="grain relative overflow-hidden rounded-[2rem] bg-abyss p-6 text-white md:p-8">
          <div className="flex items-baseline justify-between">
            <p className="font-script text-3xl text-lime">Your box</p>
            <p className="font-display text-4xl">${total}</p>
          </div>

          <div className="mt-6 rounded-[1.6rem] border-[10px] border-[#eef1ee] bg-gradient-to-b from-[#cfe3ee] to-[#e9f2f6] p-4 shadow-[inset_0_6px_18px_rgba(10,20,51,0.25)]">
            <div className="grid min-h-[200px] grid-cols-3 content-start gap-x-7 gap-y-8 p-3 sm:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {lines.map((o, i) => {
                  const n = qty[o.key];
                  return (
                    <motion.div
                      animate={{ y: 0, opacity: 1, rotate: ((i * 37) % 9) - 4 }}
                      className="relative aspect-square"
                      exit={{ y: -30, opacity: 0, scale: 0.6 }}
                      initial={{ y: -60, opacity: 0, rotate: 0 }}
                      key={o.key}
                      layout
                      transition={{ type: "spring", damping: 16, stiffness: 260 }}
                    >
                      {/* A real copy fanned out behind for each extra one (up to three). */}
                      {fan.slice(0, Math.min(n - 1, fan.length)).map((f, k) => (
                        <motion.div
                          animate={{ rotate: f.rotate, x: f.x, y: f.y, opacity: 1 }}
                          className="absolute inset-0 overflow-hidden rounded-xl border-2 border-white shadow-[0_8px_18px_-6px_rgba(10,20,51,0.45)]"
                          initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
                          key={k}
                          style={{ zIndex: -1 - k }}
                          transition={{ type: "spring", damping: 14, stiffness: 220 }}
                        >
                          <Image alt="" className="object-cover brightness-90" fill sizes="110px" src={o.image} />
                        </motion.div>
                      ))}
                      <div className="relative size-full overflow-hidden rounded-xl border-2 border-white shadow-md">
                        <Image alt={o.name} className="object-cover" fill sizes="110px" src={o.image} />
                      </div>
                      {n > 1 && (
                        <motion.span
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 grid min-w-7 place-items-center rounded-full bg-lime px-1.5 py-0.5 font-display text-abyss text-sm shadow-md"
                          initial={{ scale: 0.4 }}
                          key={n}
                          transition={{ type: "spring", damping: 12, stiffness: 400 }}
                        >
                          ×{n}
                        </motion.span>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
              {lines.length === 0 && (
                <p className="col-span-full grid h-[180px] place-items-center text-center text-abyss/45 text-sm">
                  Empty cooler. Add something on the left.
                </p>
              )}
            </div>
            {/* Fill meter for the current cooler */}
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-abyss/10">
                <motion.div animate={{ width: `${(fill / PER_COOLER) * 100}%` }} className="h-full bg-lime" />
              </div>
              {coolers > 1 && (
                <span className="rounded-full bg-abyss px-2.5 py-1 font-semibold text-[11px] text-lime uppercase tracking-wider">
                  {coolers} coolers
                </span>
              )}
            </div>
          </div>

          {lines.length > 0 && (
            <ul className="mt-6 space-y-1.5 text-sm text-white/75">
              {lines.map((o) => (
                <li className="flex justify-between gap-3" key={o.key}>
                  <span>
                    {qty[o.key]} × {o.name}
                  </span>
                  <span className="font-display text-base text-white">${o.price * qty[o.key]}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-white disabled:opacity-40"
              disabled={!lines.length}
              onClick={addAll}
              type="button"
            >
              {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
              {added ? "Added" : "Add box to order"}
            </button>
            <a
              aria-disabled={!lines.length}
              className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 px-5 py-3.5 font-semibold text-sm transition hover:border-lime hover:text-lime ${lines.length ? "" : "pointer-events-none opacity-40"}`}
              href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent(sms)}`}
            >
              <MessageCircle className="size-4" /> Text this box
            </a>
            {lines.length > 0 && (
              <button
                aria-label="Empty the box"
                className="grid size-12 place-items-center rounded-full border border-white/20 transition hover:border-coral hover:text-coral"
                onClick={() => setQty({})}
                type="button"
              >
                <Trash2 className="size-4" />
              </button>
            )}
          </div>
          <p className="mt-4 text-white/45 text-xs">Free delivery. Full cooler? We just pack another.</p>
        </div>
      </div>
    </div>
  );
}
