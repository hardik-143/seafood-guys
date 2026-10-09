"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { catchList } from "@/content/menu";

/**
 * Pinned section that turns vertical scroll into a horizontal ride through
 * what we sell. Falls back to a native swipe row on small screens.
 */
export function TheCatch() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const bar = useTransform(smooth, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const measure = () => {
      if (window.innerWidth < 768) {
        setDistance(0);
      } else if (track.current) {
        setDistance(Math.max(track.current.scrollWidth - window.innerWidth + 80, 0));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      className="relative bg-abyss text-white md:h-[var(--h)]"
      ref={section}
      style={{ "--h": `calc(100vh + ${distance}px)` } as React.CSSProperties}
    >
      <div className="grain overflow-hidden py-20 md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
        <div className="container mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-script text-3xl text-lime">The catch</p>
            <h2 className="mt-2 text-[clamp(2.8rem,6vw,5.5rem)]">
              What&apos;s in <span className="text-outline">the cooler</span>
            </h2>
          </div>
          <Link
            className="group inline-flex items-center gap-2 border-lime border-b-2 pb-1 font-semibold text-lime"
            href="/menu"
          >
            See full menu
            <ArrowUpRight className="size-4 transition group-hover:rotate-45" />
          </Link>
        </div>

        <motion.div
          className="flex gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:overflow-visible md:pl-10 lg:pl-[max(2.5rem,calc((100vw-1320px)/2+2.5rem))]"
          ref={track}
          style={{ x: distance ? x : 0 }}
        >
          {catchList.map((item, i) => (
            <article
              className="group relative h-[440px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] sm:w-[340px] md:h-[56vh] md:max-h-[560px] md:w-[400px]"
              key={item.name}
            >
              <Image
                alt={item.name}
                className="object-cover transition duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-110"
                fill
                sizes="400px"
                src={item.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
              <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 font-semibold text-xs backdrop-blur">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="text-4xl transition duration-500 group-hover:text-lime md:text-5xl">
                  {item.name}
                </h3>
                <p className="mt-2 max-w-[28ch] text-sm text-white/75">{item.note}</p>
              </div>
            </article>
          ))}
          <Link
            className="group grid h-[440px] w-[70vw] shrink-0 place-items-center rounded-[2rem] border-2 border-lime/40 border-dashed text-center transition hover:border-lime hover:bg-lime hover:text-abyss sm:w-[300px] md:h-[56vh] md:max-h-[560px]"
            href="/menu"
          >
            <span>
              <span className="block font-display text-5xl uppercase">Build<br />your box</span>
              <ArrowUpRight className="mx-auto mt-4 size-10 transition group-hover:rotate-45" />
            </span>
          </Link>
        </motion.div>

        <div className="container mt-8 hidden md:block">
          <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div className="h-full bg-lime" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}
