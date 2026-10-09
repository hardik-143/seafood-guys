"use client";

import { Flame, Pause, Play, RotateCcw, Snowflake, Target } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { type CookGuide as Guide, guides } from "@/content/cook";
import { cn } from "@/lib/utils";

const R = 54;
const C = 2 * Math.PI * R;

const fmt = (seconds: number) => {
  const s = Math.ceil(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

/** Countdown ring. Keyed by guide in the parent, so switching tabs resets it. */
function KitchenTimer({ guide }: { guide: Guide }) {
  const total = (guide.minutes ?? 0) * 60;
  const [left, setLeft] = useState(total);
  /** performance.now() timestamp the run ends at; null while paused. */
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const running = endsAt !== null;

  useEffect(() => {
    if (endsAt === null) {
      return;
    }
    const id = window.setInterval(() => {
      const next = Math.max((endsAt - performance.now()) / 1000, 0);
      setLeft(next);
      if (next === 0) {
        setEndsAt(null);
        navigator.vibrate?.([200, 100, 200]);
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [endsAt]);

  const done = left === 0;
  const progress = total ? left / total : 0;

  return (
    <div className="flex items-center gap-6 rounded-[1.75rem] bg-abyss p-6 text-white">
      <div className="relative size-32 shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 120 120">
          <circle className="stroke-white/10" cx="60" cy="60" fill="none" r={R} strokeWidth="8" />
          <circle
            className={cn("transition-[stroke-dashoffset] duration-300 ease-linear", done ? "stroke-coral" : "stroke-lime")}
            cx="60"
            cy="60"
            fill="none"
            r={R}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>
        <span className={cn("absolute inset-0 grid place-items-center font-display text-3xl", done && "animate-pulse text-coral")}>
          {done ? "Done!" : fmt(left)}
        </span>
      </div>
      <div>
        <p className="font-semibold text-lime text-xs uppercase tracking-[0.18em]">Kitchen timer</p>
        <p className="mt-1 text-lg">{guide.timerLabel}</p>
        <div className="mt-4 flex gap-2">
          <button
            className="inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-white disabled:opacity-50"
            disabled={done}
            onClick={() => setEndsAt(running ? null : performance.now() + left * 1000)}
            type="button"
          >
            {running ? <Pause className="size-4" /> : <Play className="size-4" />}
            {running ? "Pause" : left < total ? "Resume" : "Start"}
          </button>
          <button
            aria-label="Reset timer"
            className="grid size-10 place-items-center rounded-full border border-white/20 transition hover:border-lime hover:text-lime"
            onClick={() => {
              setEndsAt(null);
              setLeft(total);
            }}
            type="button"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function CookGuide() {
  const [activeId, setActiveId] = useState(guides[0].id);
  const guide = guides.find((g) => g.id === activeId) ?? guides[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" role="tablist">
        {guides.map((g) => (
          <button
            aria-selected={g.id === activeId}
            className={cn(
              "relative isolate shrink-0 rounded-2xl px-5 py-3 text-left font-display text-xl uppercase transition",
              g.id === activeId ? "text-abyss" : "text-ink/45 hover:text-abyss"
            )}
            key={g.id}
            onClick={() => setActiveId(g.id)}
            role="tab"
            type="button"
          >
            {g.id === activeId && (
              <motion.span className="absolute inset-0 -z-10 rounded-2xl bg-lime" layoutId="cook-tab" transition={{ type: "spring", damping: 26, stiffness: 300 }} />
            )}
            {g.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-8 rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)] md:p-8 xl:grid-cols-[0.9fr_1.1fr]"
          exit={{ opacity: 0, y: -16 }}
          initial={{ opacity: 0, y: 16 }}
          key={guide.id}
          role="tabpanel"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem]">
            <Image alt={guide.name} className="object-cover" fill sizes="(min-width: 1280px) 30vw, 90vw" src={guide.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 text-white">
              <p className="font-script text-2xl text-lime">{guide.method}</p>
              <h3 className="text-5xl">{guide.name}</h3>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ul className="flex flex-wrap gap-2 text-sm">
              <li className="inline-flex items-center gap-2 rounded-full bg-foam px-4 py-2 font-medium text-abyss">
                <Flame className="size-4 text-coral" /> {guide.heat}
              </li>
              <li className="inline-flex items-center gap-2 rounded-full bg-foam px-4 py-2 font-medium text-abyss">
                <Target className="size-4 text-mahi" /> {guide.done}
              </li>
            </ul>
            <ol className="space-y-3">
              {guide.steps.map((s, i) => (
                <li className="flex gap-4" key={s}>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-abyss font-display text-lime text-sm">{i + 1}</span>
                  <p className="pt-1 text-ink/75">{s}</p>
                </li>
              ))}
            </ol>
            <p className="flex gap-3 rounded-2xl border border-lime/60 border-dashed bg-lime/10 p-4 text-ink/75 text-sm">
              <Snowflake className="mt-0.5 size-4 shrink-0 text-mahi" />
              <span>
                <b className="text-abyss">Guys&apos; tip:</b> {guide.tip}
              </span>
            </p>
            {guide.minutes !== null && <KitchenTimer guide={guide} key={guide.id} />}
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}
