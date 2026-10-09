"use client";

import { MapPin, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { areas, faqs } from "@/content/site";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-navy/10 border-navy/10 border-y">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              type="button"
            >
              <span className="font-semibold text-abyss text-lg md:text-xl">{f.q}</span>
              <span
                className={cn(
                  "grid size-10 shrink-0 place-items-center rounded-full border border-navy/15 transition duration-500",
                  isOpen && "rotate-45 border-abyss bg-abyss text-lime"
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="overflow-hidden"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="max-w-2xl pb-6 text-ink/70 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function Areas({ dark }: { dark?: boolean }) {
  const [tab, setTab] = useState<keyof typeof areas>("Miami-Dade");
  return (
    <div>
      <div className={cn("inline-flex rounded-full p-1", dark ? "bg-white/10" : "bg-white")}>
        {(Object.keys(areas) as (keyof typeof areas)[]).map((k) => (
          <button
            className={cn(
              "relative rounded-full px-5 py-2 font-semibold text-sm transition",
              tab === k ? "text-abyss" : dark ? "text-white/70" : "text-ink/60"
            )}
            key={k}
            onClick={() => setTab(k)}
            type="button"
          >
            {tab === k && (
              <motion.span className="absolute inset-0 -z-0 rounded-full bg-lime" layoutId={`area-tab-${dark ? "d" : "l"}`} />
            )}
            <span className="relative">{k}</span>
          </button>
        ))}
      </div>
      <motion.ul className="mt-6 flex flex-wrap gap-2" key={tab}>
        {areas[tab].map((a, i) => (
          <motion.li
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm",
              dark ? "border-white/15 text-white/85" : "border-navy/10 bg-white text-ink/80"
            )}
            initial={{ opacity: 0, y: 10 }}
            key={a}
            transition={{ delay: i * 0.03 }}
          >
            <MapPin className="size-3.5 text-mahi" /> {a}
          </motion.li>
        ))}
      </motion.ul>
      <p className={cn("mt-5 text-sm", dark ? "text-white/50" : "text-ink/50")}>
        Don&apos;t see your neighbourhood? Call us — if we can get there, we will.
      </p>
    </div>
  );
}

export function FaqAreas() {
  return (
    <section className="py-24 md:py-32">
      <div className="container grid gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-script text-3xl text-mahi" data-reveal>
            Where we deliver
          </p>
          <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            Free delivery, Miami to Ft. Lauderdale
          </h2>
          <div className="mt-8" data-reveal>
            <Areas />
          </div>
        </div>
        <div data-reveal>
          <p className="font-script text-3xl text-mahi">Good questions</p>
          <h2 className="mt-2 mb-8 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss">FAQ</h2>
          <Faq />
        </div>
      </div>
    </section>
  );
}
