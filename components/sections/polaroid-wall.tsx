"use client";

import { Shuffle } from "lucide-react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";

export type Polaroid = { src: string; alt: string; caption: string };

type Spot = { left: number; top: number; rotate: number; z: number };

const COLS = 5;

/** Grid slot i: five columns, two rows, each card fully visible. */
const slot = (i: number, jitter: number, rotate: number, z: number): Spot => ({
  left: 1 + (i % COLS) * 19.8 + jitter,
  top: Math.floor(i / COLS) * 50 + Math.abs(jitter),
  rotate,
  z,
});

/** Starting layout: photos in order, gently tilted. */
const initialSpots = (n: number): Spot[] =>
  Array.from({ length: n }, (_, i) => slot(i, (((i * 7) % 3) - 1) * 0.5, ((i * 37) % 9) - 4, i));

/** Shuffle: photos swap grid slots at random, with a fresh small tilt and nudge. */
const randomSpots = (n: number): Spot[] => {
  const slots = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
  return slots.map((s, i) => slot(s, Math.random() - 0.5, Math.random() * 8 - 4, i));
};

/**
 * Desktop: polaroids laid out in a loose grid; Shuffle swaps their places.
 * Mobile: a plain grid that Shuffle reorders.
 */
export function PolaroidWall({ items }: { items: Polaroid[] }) {
  const table = useRef<HTMLDivElement>(null);
  const inView = useInView(table, { once: true, margin: "-10%" });
  const [spots, setSpots] = useState(() => initialSpots(items.length));
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [shuffled, setShuffled] = useState(false);

  const shuffle = () => {
    setSpots(randomSpots(items.length));
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    setShuffled(true);
  };

  return (
    <>
      <div className="mb-6 flex justify-end">
        <motion.button
          className="group inline-flex items-center gap-2 rounded-full bg-abyss px-5 py-3 font-bold text-lime text-sm uppercase tracking-[0.15em] transition hover:bg-navy"
          onClick={shuffle}
          type="button"
          whileTap={{ scale: 0.94 }}
        >
          <Shuffle className="size-4 transition duration-500 group-hover:rotate-180" />
          Shuffle
        </motion.button>
      </div>

      <div className="relative hidden h-[640px] lg:block" ref={table}>
        {items.map((p, i) => {
          const spot = spots[i];
          return (
            <motion.figure
              animate={inView ? { opacity: 1, left: `${spot.left}%`, top: `${spot.top}%`, rotate: spot.rotate } : { opacity: 0 }}
              className="absolute w-[18%] rounded-2xl bg-white p-3 pb-5 shadow-[0_30px_50px_-25px_rgba(10,20,51,0.55)]"
              initial={{ opacity: 0, left: `${spot.left}%`, top: `${spot.top + 8}%`, rotate: spot.rotate }}
              key={p.src}
              style={{ zIndex: spot.z }}
              transition={{ type: "spring", damping: 18, stiffness: 140, delay: (shuffled ? 0.02 : 0.05) * i }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image alt={p.alt} className="object-cover" fill sizes="240px" src={p.src} />
              </div>
              <figcaption className="mt-3 px-1 font-script text-2xl text-abyss leading-none">{p.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>

      <motion.div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden" layout>
        {order.map((idx, i) => {
          const p = items[idx];
          return (
            <motion.figure
              className="rounded-2xl bg-white p-2 pb-3 shadow-[0_20px_40px_-25px_rgba(10,20,51,0.5)]"
              key={p.src}
              layout
              style={{ rotate: `${((i * 37) % 7) - 3}deg` }}
              transition={{ type: "spring", damping: 20, stiffness: 200 }}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image alt={p.alt} className="object-cover" fill sizes="45vw" src={p.src} />
              </div>
              <figcaption className="mt-2 px-1 font-script text-abyss text-xl leading-none">{p.caption}</figcaption>
            </motion.figure>
          );
        })}
      </motion.div>
    </>
  );
}
