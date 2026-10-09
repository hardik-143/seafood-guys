"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CoolerScene = dynamic(() => import("@/components/three/cooler-scene"), { ssr: false });

const steps = [
  {
    n: "01",
    title: "Pick your box",
    body: "Choose a package, a 10 lb case or single lobster tails. Order online, by text or with a call.",
  },
  {
    n: "02",
    title: "We pack it cold",
    body: "Everything is portioned, vacuum-sealed and frozen, then packed on ice in a cooler with your name on the lid.",
  },
  {
    n: "03",
    title: "Free to your door",
    body: "We text your delivery window and drop it at your home, office or kitchen. No fee, no minimum fuss.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(p < 0.22 ? 0 : p < 0.55 ? 1 : 2);
  });

  return (
    <section className="relative h-[320vh] bg-gradient-to-b from-ice via-foam to-ice" ref={ref}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Soft sonar rings behind the box */}
        <div aria-hidden className="absolute top-1/2 right-[-10%] size-[900px] -translate-y-1/2 lg:right-[-5%]">
          {[0, 1, 2, 3].map((i) => (
            <span
              className="absolute inset-0 rounded-full border border-mahi/15"
              key={i}
              style={{ transform: `scale(${0.4 + i * 0.2})` }}
            />
          ))}
        </div>

        <div className="container relative grid h-full items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 pt-24 lg:pt-0">
            <p className="font-script text-3xl text-mahi">How it works</p>
            <h2 className="mt-2 text-[clamp(2.6rem,5.5vw,5rem)] text-abyss">
              Dock to door <br className="hidden md:block" />
              in three steps
            </h2>

            <ol className="mt-6 space-y-3 lg:mt-10">
              {steps.map((s, i) => (
                <li
                  className={cn(
                    "relative overflow-hidden rounded-3xl border p-5 transition-all duration-500 md:p-6",
                    active === i
                      ? "border-abyss bg-abyss text-white shadow-2xl"
                      : "hidden border-navy/10 bg-white/50 text-ink/60 lg:block"
                  )}
                  key={s.n}
                >
                  <div className="flex items-baseline gap-4">
                    <span className={cn("font-display text-2xl", active === i ? "text-lime" : "text-navy/30")}>
                      {s.n}
                    </span>
                    <div>
                      <h3 className="text-2xl md:text-3xl">{s.title}</h3>
                      <motion.p
                        animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                        className="overflow-hidden text-sm text-white/75 md:text-base"
                        initial={false}
                      >
                        <span className="block pt-2">{s.body}</span>
                      </motion.p>
                    </div>
                  </div>
                  {active === i && (
                    <motion.span
                      className="absolute bottom-0 left-0 h-1 bg-lime"
                      layoutId="step-bar"
                      style={{ width: "100%" }}
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          <CoolerScene
            className="absolute inset-x-0 bottom-0 h-[46vh] lg:inset-y-0 lg:right-[-10%] lg:left-[38%] lg:h-auto"
            progress={scrollYProgress}
          />
        </div>
      </div>
    </section>
  );
}
