"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";

/** Florida stone crab season: Oct 15 through May 1 (closes at the start of May 2). */
function season(now: Date) {
  const y = now.getFullYear();
  const close = new Date(y, 4, 2);
  const open = new Date(y, 9, 15);
  if (now < close) {
    return { open: true, start: new Date(y - 1, 9, 15), target: close };
  }
  if (now < open) {
    return { open: false, start: close, target: open };
  }
  return { open: true, start: open, target: new Date(y + 1, 4, 2) };
}

const subscribe = (cb: () => void) => {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
};
// Whole seconds, so the snapshot is stable between ticks.
const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => 0;

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.span
          animate={{ y: "0%" }}
          className="absolute inset-0 text-center"
          exit={{ y: "-100%" }}
          initial={{ y: "100%" }}
          key={value}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] px-3 py-4 font-display text-[clamp(3.5rem,11vw,9rem)] text-white leading-none md:px-5">
        {[...text].map((d, i) => (
          // Index keys keep each column in place while the digit inside flips.
          // biome-ignore lint/suspicious/noArrayIndexKey: positional digits
          <Digit key={i} value={d} />
        ))}
      </div>
      <span className="mt-3 font-semibold text-lime text-xs uppercase tracking-[0.25em]">{label}</span>
    </div>
  );
}

export function SeasonCountdown() {
  const secs = useSyncExternalStore(subscribe, getNow, getServerNow);

  if (secs === 0) {
    // Server render / first paint: keep the layout without a wrong time.
    return <div className="h-[clamp(10rem,22vw,16rem)]" />;
  }

  const now = new Date(secs * 1000);
  const s = season(now);
  const left = Math.max(0, Math.floor((s.target.getTime() - now.getTime()) / 1000));
  const parts = [
    { label: "Days", value: Math.floor(left / 86400) },
    { label: "Hours", value: Math.floor((left % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((left % 3600) / 60) },
    { label: "Seconds", value: left % 60 },
  ];
  const elapsed = (now.getTime() - s.start.getTime()) / (s.target.getTime() - s.start.getTime());

  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-[13px]">
        <span className="relative flex size-2">
          <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-75 ${s.open ? "bg-lime" : "bg-coral"}`} />
          <span className={`relative inline-flex size-2 rounded-full ${s.open ? "bg-lime" : "bg-coral"}`} />
        </span>
        {s.open ? "Season's open — claws are in" : "Season's closed — opening soon"}
      </p>
      <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.4rem)] text-white">
        {s.open ? "Time left this season" : "Stone crab season opens in"}
      </h2>
      <div className="mt-8 flex flex-wrap gap-3 md:gap-5">
        {parts.map((p) => (
          <Unit key={p.label} label={p.label} value={p.value} />
        ))}
      </div>
      <div className="mt-10 max-w-2xl">
        <div className="flex justify-between text-white/50 text-xs uppercase tracking-[0.2em]">
          <span>{s.open ? "Oct 15" : "May 1"}</span>
          <span>{s.open ? "May 1" : "Oct 15"}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${Math.min(100, elapsed * 100)}%` }}
            className={`h-full rounded-full ${s.open ? "bg-lime" : "bg-coral"}`}
            initial={{ width: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </div>
  );
}
