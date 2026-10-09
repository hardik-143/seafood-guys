"use client";

import { Check, Clock, ShoppingBag, Users, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useCart } from "@/components/order/cart-context";
import { type Recipe, recipes } from "@/content/recipes";
import { cn } from "@/lib/utils";

const categories = ["All", "Shellfish", "Fish"] as const;

function RecipeModal({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  const { add } = useCart();
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-abyss/70 p-0 backdrop-blur-sm md:items-center md:p-6"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        aria-modal
        className="relative max-h-[92svh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-ice md:rounded-[2rem]"
        data-lenis-prevent
        layoutId={`recipe-${recipe.id}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        <div className="relative h-64 md:h-80">
          <Image alt={recipe.title} className="object-cover" fill sizes="(min-width: 768px) 900px, 100vw" src={recipe.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 to-transparent" />
          <button
            aria-label="Close recipe"
            className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white/90 text-abyss transition hover:bg-lime"
            onClick={onClose}
            type="button"
          >
            <X className="size-5" />
          </button>
          <div className="absolute inset-x-6 bottom-6 text-white">
            <p className="font-script text-2xl text-lime">{recipe.kicker}</p>
            <h2 className="text-4xl md:text-6xl">{recipe.title}</h2>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[0.9fr_1.1fr] md:p-8">
          <div>
            <h3 className="text-2xl text-abyss">Ingredients</h3>
            <p className="text-ink/50 text-sm">Tap to tick off as you go.</p>
            <ul className="mt-4 space-y-2">
              {recipe.ingredients.map((ing, i) => {
                const on = checked.includes(i);
                return (
                  <li key={ing}>
                    <button
                      className="flex w-full items-start gap-3 text-left"
                      onClick={() => setChecked((c) => (on ? c.filter((x) => x !== i) : [...c, i]))}
                      type="button"
                    >
                      <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border-2 transition", on ? "border-lime bg-lime text-abyss" : "border-abyss/25")}>
                        {on && <Check className="size-3" strokeWidth={4} />}
                      </span>
                      <span className={cn("transition", on ? "text-ink/40 line-through" : "text-ink/80")}>{ing}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-3xl bg-abyss p-5 text-white">
              <p className="font-semibold text-lime text-xs uppercase tracking-[0.2em]">Get the seafood</p>
              {recipe.order.map((o) => (
                <button
                  className="mt-3 flex w-full items-center justify-between gap-3 rounded-full bg-lime py-2 pr-2 pl-5 font-bold text-abyss text-sm transition hover:bg-white"
                  key={o.label}
                  onClick={() => {
                    // add() opens the cart drawer; get the modal out of its way.
                    add(o.id, o.choice);
                    onClose();
                  }}
                  type="button"
                >
                  {o.label}
                  <span className="grid size-9 place-items-center rounded-full bg-abyss text-lime">
                    <ShoppingBag className="size-4" />
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl text-abyss">Method</h3>
            <ol className="mt-4 space-y-4">
              {recipe.steps.map((s, i) => (
                <li className="flex gap-4" key={s}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-abyss font-display text-lime text-sm">{i + 1}</span>
                  <p className="pt-1 text-ink/75">{s}</p>
                </li>
              ))}
            </ol>
            <Link className="mt-6 inline-block font-semibold text-abyss underline decoration-lime decoration-2 underline-offset-4" href="/cook">
              Thawing & timing help →
            </Link>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function RecipeBook() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const shown = recipes.filter((r) => category === "All" || r.category === category);
  const open = recipes.find((r) => r.id === openId);

  return (
    <>
      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            className={cn(
              "relative isolate rounded-full border px-5 py-2.5 font-semibold text-sm transition",
              category === c ? "border-abyss text-lime" : "border-abyss/15 text-ink/60 hover:border-abyss/40"
            )}
            key={c}
            onClick={() => setCategory(c)}
            type="button"
          >
            {category === c && (
              <motion.span className="absolute inset-0 -z-10 rounded-full bg-abyss" layoutId="recipe-chip" transition={{ type: "spring", damping: 26, stiffness: 300 }} />
            )}
            {c}
          </button>
        ))}
      </div>

      <motion.div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" layout>
        <AnimatePresence mode="popLayout">
          {shown.map((r) => (
            <motion.button
              animate={{ opacity: 1, scale: 1 }}
              className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)]"
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              key={r.id}
              layout
              layoutId={`recipe-${r.id}`}
              onClick={() => setOpenId(r.id)}
              type="button"
            >
              <div className="relative h-56 overflow-hidden">
                <Image alt={r.title} className="object-cover transition duration-700 group-hover:scale-110" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" src={r.image} />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 font-bold text-[11px] text-abyss uppercase tracking-wider">{r.category}</span>
              </div>
              <div className="p-6">
                <p className="font-script text-mahi text-xl">{r.kicker}</p>
                <h3 className="mt-1 text-3xl text-abyss">{r.title}</h3>
                <div className="mt-4 flex gap-4 text-ink/60 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="size-4" /> {r.minutes} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-4" /> Serves {r.serves}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{open && <RecipeModal key={open.id} onClose={() => setOpenId(null)} recipe={open} />}</AnimatePresence>
    </>
  );
}
