"use client";

import { Check, MessageCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { useCart } from "@/components/order/cart-context";
import { primaryPhone } from "@/content/site";
import { cn } from "@/lib/utils";

const appetites = [
  { id: "light", label: "Light", note: "Plenty of sides", lbs: 0.75, speed: 3.2 },
  { id: "hearty", label: "Hearty", note: "Proper boil", lbs: 1.25, speed: 2.3 },
  { id: "feast", label: "Feast", note: "No leftovers… right?", lbs: 1.75, speed: 1.5 },
] as const;

/** Share of the total seafood weight each protein takes when selected. */
const proteins = [
  { id: "shrimp", label: "Jumbo Shrimp", weight: 0.35 },
  { id: "king", label: "King Crab", weight: 0.3 },
  { id: "stone", label: "Stone Crab", weight: 0.2 },
  { id: "lobster", label: "Lobster Tails", weight: 0.15 },
] as const;

type ProteinId = (typeof proteins)[number]["id"];

/** Re-mounts on change so the value pops. */
function Pop({ value }: { value: string | number }) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        animate={{ y: 0, opacity: 1 }}
        className="inline-block"
        exit={{ y: -14, opacity: 0 }}
        initial={{ y: 14, opacity: 0 }}
        key={value}
        transition={{ duration: 0.25 }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

/** Bubbles rising through the dark panel; more guests, more bubbles. */
function Bubbles({ count, speed }: { count: number; speed: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <span
          className="absolute -bottom-4 animate-rise rounded-full border border-white/30 bg-white/[0.06]"
          key={i}
          style={{
            left: `${((i * 37) % 96) + 2}%`,
            width: 6 + ((i * 7) % 16),
            height: 6 + ((i * 7) % 16),
            animationDuration: `${speed + ((i * 13) % 10) / 5}s`,
            animationDelay: `${((i * 29) % 30) / 10}s`,
          }}
        />
      ))}
    </div>
  );
}

export function BoilPlanner() {
  const { add } = useCart();
  const [guests, setGuests] = useState(10);
  const [appetiteId, setAppetiteId] = useState<(typeof appetites)[number]["id"]>("hearty");
  const [picked, setPicked] = useState<ProteinId[]>(["shrimp", "king", "stone", "lobster"]);
  const [added, setAdded] = useState(false);
  const appetite = appetites.find((a) => a.id === appetiteId) ?? appetites[1];

  const plan = useMemo(() => {
    const total = guests * appetite.lbs;
    const share = proteins.filter((p) => picked.includes(p.id)).reduce((n, p) => n + p.weight, 0) || 1;
    const lbs = (id: ProteinId) =>
      picked.includes(id) ? (total * (proteins.find((p) => p.id === id)?.weight ?? 0)) / share : 0;
    const shrimpBags = Math.ceil(lbs("shrimp") / 2);
    const tails = Math.ceil((lbs("lobster") * 16) / 6);
    const king = Math.ceil(lbs("king") * 2) / 2;
    const stone = Math.ceil(lbs("stone") * 2) / 2;
    return {
      total: Math.round(total * 10) / 10,
      shrimpBags,
      tails,
      king,
      stone,
      corn: guests,
      potatoes: Math.ceil(guests / 3),
      butter: Math.ceil(guests / 4),
      priced: shrimpBags * 25 + tails * 15,
    };
  }, [guests, appetite, picked]);

  const lines = [
    plan.shrimpBags > 0 && `${plan.shrimpBags} × 2 lb bag jumbo shrimp`,
    plan.king > 0 && `${plan.king} lbs king crab legs`,
    plan.stone > 0 && `${plan.stone} lbs stone crab claws`,
    plan.tails > 0 && `${plan.tails} medium lobster tails`,
  ].filter(Boolean) as string[];

  const sms = `Hi Seafood Guys! Planning a seafood boil for ${guests} (${appetite.label.toLowerCase()}):\n${lines.join("\n")}`;

  const toggle = (id: ProteinId) =>
    setPicked((cur) => (cur.includes(id) ? (cur.length > 1 ? cur.filter((x) => x !== id) : cur) : [...cur, id]));

  const addToOrder = () => {
    for (let i = 0; i < plan.shrimpBags; i++) {
      add("shrimp-addon");
    }
    for (let i = 0; i < plan.tails; i++) {
      add("tail-medium");
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* Controls */}
      <div className="space-y-8 rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)] md:p-8">
        <div>
          <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">How many people?</p>
          <div className="mt-3 flex items-center gap-4">
            <button
              aria-label="Fewer guests"
              className="grid size-12 place-items-center rounded-full border border-abyss/20 text-abyss transition hover:bg-lime"
              onClick={() => setGuests((g) => Math.max(2, g - 1))}
              type="button"
            >
              <Minus className="size-5" />
            </button>
            <span className="w-24 text-center font-display text-7xl text-abyss">
              <Pop value={guests} />
            </span>
            <button
              aria-label="More guests"
              className="grid size-12 place-items-center rounded-full border border-abyss/20 text-abyss transition hover:bg-lime"
              onClick={() => setGuests((g) => Math.min(80, g + 1))}
              type="button"
            >
              <Plus className="size-5" />
            </button>
          </div>
          <input
            aria-label="Guests"
            className="mt-5 w-full accent-[var(--color-abyss)]"
            max={80}
            min={2}
            onChange={(e) => setGuests(Number(e.target.value))}
            type="range"
            value={guests}
          />
        </div>

        <div>
          <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">Appetite</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {appetites.map((a) => (
              <button
                className={cn(
                  "relative isolate rounded-2xl border px-3 py-3 text-left transition",
                  a.id === appetiteId ? "border-abyss text-white" : "border-abyss/15 text-abyss hover:border-abyss/40"
                )}
                key={a.id}
                onClick={() => setAppetiteId(a.id)}
                type="button"
              >
                {a.id === appetiteId && (
                  <motion.span className="absolute inset-0 -z-10 rounded-2xl bg-abyss" layoutId="appetite" transition={{ type: "spring", damping: 26, stiffness: 300 }} />
                )}
                <span className="block font-display text-2xl uppercase">{a.label}</span>
                <span className={cn("block text-xs", a.id === appetiteId ? "text-white/60" : "text-ink/50")}>{a.note}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">What&apos;s going in the pot?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proteins.map((p) => {
              const on = picked.includes(p.id);
              return (
                <button
                  aria-pressed={on}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 font-semibold text-sm transition",
                    on ? "border-lime bg-lime text-abyss" : "border-abyss/15 text-ink/60 hover:border-abyss/40"
                  )}
                  key={p.id}
                  onClick={() => toggle(p.id)}
                  type="button"
                >
                  {on && <Check className="size-4" strokeWidth={3} />}
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="grain relative overflow-hidden rounded-[2rem] bg-abyss p-6 text-white md:p-8">
        <Bubbles count={Math.min(10 + guests, 45)} speed={appetite.speed} />
        <div className="relative pb-6">
          <p className="font-script text-3xl text-lime">Into the pot</p>
          <p className="mt-1 font-display text-5xl uppercase md:text-6xl">
            Feeds <Pop value={guests} />
          </p>
        </div>
        <div className="relative rounded-[1.5rem] bg-white p-6 text-abyss shadow-2xl">
          <div className="flex items-baseline justify-between border-navy/10 border-b border-dashed pb-4">
            <p className="font-display text-2xl uppercase">Your boil</p>
            <p className="text-ink/60 text-sm">
              ~<Pop value={plan.total} /> lbs seafood
            </p>
          </div>
          <ul className="space-y-2 py-4">
            {[
              { label: "Jumbo shrimp", n: plan.shrimpBags, unit: "× 2 lb bags" },
              { label: "King crab legs", n: plan.king, unit: "lbs" },
              { label: "Stone crab claws", n: plan.stone, unit: "lbs" },
              { label: "Lobster tails (med)", n: plan.tails, unit: "tails" },
            ]
              .filter((r) => r.n > 0)
              .map((r) => (
                <li className="flex justify-between gap-4" key={r.label}>
                  <span className="text-ink/70">{r.label}</span>
                  {/* Only the number pops; the unit stays put. */}
                  <span className="font-display text-xl">
                    <Pop value={r.n} /> {r.unit}
                  </span>
                </li>
              ))}
          </ul>
          <p className="border-navy/10 border-t border-dashed pt-4 text-ink/55 text-sm">
            You grab: {plan.corn} ears of corn, {plan.potatoes} lbs baby potatoes, {plan.butter} sticks of butter, lemons & Old Bay.
          </p>
          {plan.priced > 0 && (
            <p className="mt-3 text-sm">
              Shrimp & tails from <b className="font-display text-2xl text-coral">${plan.priced}</b>
              {(plan.king > 0 || plan.stone > 0) && <span className="text-ink/55"> + crab, priced by the week</span>}
            </p>
          )}
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-lime px-5 py-3.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-abyss hover:text-lime"
              href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent(sms)}`}
            >
              <MessageCircle className="size-4" /> Text this boil
            </a>
            {(plan.shrimpBags > 0 || plan.tails > 0) && (
              <button
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-abyss px-5 py-3.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-abyss hover:text-white"
                onClick={addToOrder}
                type="button"
              >
                {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
                {added ? "Added" : "Add shrimp & tails"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
