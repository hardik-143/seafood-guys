"use client";

import { CheckCircle2, HelpCircle, MapPin, MessageCircle, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { areas, primaryPhone } from "@/content/site";
import { cn } from "@/lib/utils";

type County = keyof typeof areas;

/** USPS ZIP ranges per county (inclusive). */
const zipRanges: Record<County, [number, number][]> = {
  "Miami-Dade": [
    [33010, 33018],
    [33030, 33039],
    [33054, 33056],
    [33101, 33199],
  ],
  Broward: [
    [33004, 33004],
    [33009, 33009],
    [33019, 33029],
    [33060, 33077],
    [33301, 33394],
    [33441, 33442],
  ],
};

type Result =
  | { kind: "area"; county: County; area: string }
  | { kind: "zip"; county: County; zip: string }
  | { kind: "unknown"; text: string };

function check(raw: string): Result | null {
  const text = raw.trim();
  if (text.length < 2) {
    return null;
  }
  if (/^\d{5}$/.test(text)) {
    const zip = Number(text);
    for (const county of Object.keys(zipRanges) as County[]) {
      if (zipRanges[county].some(([a, b]) => zip >= a && zip <= b)) {
        return { kind: "zip", county, zip: text };
      }
    }
    return { kind: "unknown", text };
  }
  if (/^\d+$/.test(text)) {
    return null;
  }
  const q = text.toLowerCase();
  for (const county of Object.keys(areas) as County[]) {
    const area = areas[county].find((a) => a.toLowerCase().includes(q) || q.includes(a.toLowerCase()));
    if (area) {
      return { kind: "area", county, area };
    }
  }
  return { kind: "unknown", text };
}

export function ZoneChecker() {
  const [value, setValue] = useState("");
  const result = useMemo(() => check(value), [value]);
  const hitArea = result?.kind === "area" ? result.area : null;
  const hitCounty = result && result.kind !== "unknown" ? result.county : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div>
        <label className="relative block">
          <Search className="absolute top-1/2 left-6 size-6 -translate-y-1/2 text-ink/40" />
          <input
            autoComplete="postal-code"
            className="w-full rounded-full border-2 border-abyss/10 bg-white py-6 pr-6 pl-16 font-display text-2xl text-abyss uppercase shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)] outline-none transition placeholder:font-sans placeholder:text-base placeholder:text-ink/40 placeholder:normal-case focus:border-abyss focus:ring-4 focus:ring-lime/40"
            onChange={(e) => setValue(e.target.value)}
            placeholder="ZIP code or neighborhood, e.g. 33131 or Brickell"
            value={value}
          />
        </label>

        <div className="mt-6 min-h-[220px]">
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "grain relative overflow-hidden rounded-[2rem] p-7",
                  result.kind === "unknown" ? "bg-white text-abyss" : "bg-abyss text-white"
                )}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                key={`${result.kind}-${hitArea ?? hitCounty ?? value}`}
                transition={{ duration: 0.25 }}
              >
                {result.kind === "unknown" ? (
                  <>
                    <HelpCircle className="size-10 text-coral" />
                    <h3 className="mt-4 text-4xl">Not on our usual routes</h3>
                    <p className="mt-2 text-ink/65">
                      “{result.text}” isn&apos;t one we recognise. Text us and we&apos;ll see what we can do.
                    </p>
                  </>
                ) : (
                  <>
                    <motion.span
                      animate={{ scale: [0.6, 1.15, 1] }}
                      className="inline-block"
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle2 className="size-10 text-lime" />
                    </motion.span>
                    <h3 className="mt-4 text-4xl md:text-5xl">
                      {result.kind === "area" ? "Yes, free delivery here" : `You're in ${result.county}`}
                    </h3>
                    <p className="mt-2 text-white/70">
                      {result.kind === "area"
                        ? `${result.area} is on our ${result.county} routes. We text your delivery window the day before.`
                        : `${result.zip} is in ${result.county}, which we deliver across for free. Text us to confirm your street.`}
                    </p>
                  </>
                )}
                <a
                  className={cn(
                    "mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 font-bold text-sm uppercase tracking-wide transition",
                    result.kind === "unknown" ? "bg-abyss text-lime hover:bg-navy" : "bg-lime text-abyss hover:bg-white"
                  )}
                  href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent(`Hi! Do you deliver to ${value.trim()}?`)}`}
                >
                  <MessageCircle className="size-4" /> {result.kind === "unknown" ? "Ask us" : "Start an order"}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* County route boards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.keys(areas) as County[]).map((county) => (
          <div
            className={cn(
              "rounded-[2rem] border-2 bg-white p-6 transition duration-500",
              hitCounty === county ? "border-lime shadow-[0_30px_60px_-30px_rgba(10,20,51,0.4)]" : "border-transparent"
            )}
            key={county}
          >
            <p className="inline-flex items-center gap-2 font-semibold text-mahi text-xs uppercase tracking-[0.2em]">
              <MapPin className="size-3.5" /> {county}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {areas[county].map((a) => (
                <li key={a}>
                  <button
                    className={cn(
                      "relative rounded-full border px-3 py-1.5 text-sm transition",
                      hitArea === a ? "border-abyss bg-abyss text-lime" : "border-abyss/10 text-ink/70 hover:border-abyss/40"
                    )}
                    onClick={() => setValue(a)}
                    type="button"
                  >
                    {hitArea === a && <span className="absolute -top-1 -right-1 size-3 animate-ping rounded-full bg-lime" />}
                    {a}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
