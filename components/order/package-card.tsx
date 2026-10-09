"use client";

import { Check, Phone, Plus } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { formatPrice, type MenuItem } from "@/content/menu";
import { primaryPhone } from "@/content/site";
import { cn } from "@/lib/utils";
import { useCart } from "./cart-context";

/**
 * Menu item styled like a fish-market price tag: photo, perforated tear line,
 * itemised contents. Tilts toward the pointer.
 */
export function PackageCard({ item, compact }: { item: MenuItem; compact?: boolean }) {
  const { add } = useCart();
  const [choice, setChoice] = useState(item.choice?.options[0]);
  const [added, setAdded] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onAdd = () => {
    add(item.id, choice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.article
      className="group relative flex flex-col rounded-[1.75rem] bg-white shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)] [transform-style:preserve-3d]"
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
    >
      <div className={cn("relative overflow-hidden rounded-t-[1.75rem]", compact ? "h-52" : "h-60")}>
        <Image
          alt={item.name}
          className="object-cover transition duration-700 group-hover:scale-105"
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          src={item.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/60 to-transparent" />
        {item.tag && (
          <span className="absolute top-4 left-4 rounded-full bg-lime px-3 py-1 font-bold text-[11px] text-abyss uppercase tracking-wider">
            {item.tag}
          </span>
        )}
        <div className="absolute right-4 bottom-3 text-right text-white [transform:translateZ(40px)]">
          <span className="font-display text-5xl drop-shadow-lg">{formatPrice(item.price)}</span>
          {item.unit && <span className="ml-1 text-sm text-white/80">/ {item.unit}</span>}
        </div>
      </div>

      {/* Perforated tear line with side notches */}
      <div className="relative h-0">
        <span className="absolute -top-3 -left-3 size-6 rounded-full bg-ice" />
        <span className="absolute -top-3 -right-3 size-6 rounded-full bg-ice" />
        <span className="absolute inset-x-5 top-0 border-navy/15 border-t-2 border-dashed" />
      </div>

      <div className="flex flex-1 flex-col p-6 pt-5">
        <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">{item.kicker}</p>
        <h3 className="mt-1 text-3xl text-abyss">{item.name}</h3>
        {!compact && <p className="mt-2 text-ink/65 text-sm">{item.blurb}</p>}

        {item.choice && (
          <fieldset className="mt-4">
            <legend className="mb-2 font-medium text-ink/60 text-xs uppercase tracking-wider">
              {item.choice.label}
            </legend>
            <div className="flex flex-wrap gap-1.5">
              {item.choice.options.map((opt) => (
                <button
                  aria-pressed={choice === opt}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                    choice === opt
                      ? "border-abyss bg-abyss text-lime"
                      : "border-navy/15 text-ink/70 hover:border-navy/40"
                  )}
                  key={opt}
                  onClick={() => setChoice(opt)}
                  type="button"
                >
                  {opt}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <ul className="mt-4 flex-1 space-y-1.5 text-sm">
          {(compact ? item.includes.slice(0, 4) : item.includes).map((line) => (
            <li className="flex items-start gap-2 text-ink/80" key={line}>
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime-deep" />
              {line}
            </li>
          ))}
          {compact && item.includes.length > 4 && (
            <li className="text-ink/50 text-xs">+ {item.includes.length - 4} more</li>
          )}
        </ul>

        {item.price === null ? (
          <a
            className="mt-6 flex items-center justify-center gap-2 rounded-full border-2 border-abyss py-3.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-abyss hover:text-lime"
            href={`tel:${primaryPhone.tel}`}
          >
            <Phone className="size-4" /> Call for price
          </a>
        ) : (
          <button
            className={cn(
              "mt-6 flex items-center justify-center gap-2 rounded-full py-3.5 font-bold text-sm uppercase tracking-wide transition",
              added ? "bg-lime text-abyss" : "bg-abyss text-white hover:bg-navy"
            )}
            onClick={onAdd}
            type="button"
          >
            {added ? <Check className="size-4" /> : <Plus className="size-4" />}
            {added ? "Added" : "Add to order"}
          </button>
        )}
      </div>
    </motion.article>
  );
}
