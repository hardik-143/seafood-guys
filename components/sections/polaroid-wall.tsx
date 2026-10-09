"use client";

import { Shuffle } from "lucide-react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
import Image from "next/image";
import { type RefObject, useEffect, useRef, useState } from "react";

export type Polaroid = { src: string; alt: string; caption: string };

type Spot = { left: number; top: number; rotate: number; z: number };

/** The tidy starting layout: two loose rows of five. */
const initialSpots = (n: number): Spot[] =>
  Array.from({ length: n }, (_, i) => ({
    left: 2 + (i % 5) * 19 + (Math.floor(i / 5) % 2) * 6,
    top: Math.floor(i / 5) * 34 + ((i * 13) % 7),
    rotate: ((i * 37) % 15) - 7,
    z: i,
  }));

const randomSpots = (n: number): Spot[] => {
  const order = Array.from({ length: n }, (_, i) => i).sort(() => Math.random() - 0.5);
  return Array.from({ length: n }, (_, i) => ({
    left: Math.random() * 78,
    top: Math.random() * 56,
    rotate: Math.random() * 22 - 11,
    z: order[i],
  }));
};

function Card({
  p,
  spot,
  index,
  shuffleId,
  table,
  inView,
}: {
  p: Polaroid;
  spot: Spot;
  index: number;
  shuffleId: number;
  table: RefObject<HTMLDivElement | null>;
  inView: boolean;
}) {
  // Drag offsets live here so a shuffle can glide them back to zero.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (shuffleId === 0) {
      return;
    }
    const opts = { type: "spring", damping: 20, stiffness: 160 } as const;
    const a = animate(x, 0, opts);
    const b = animate(y, 0, opts);
    return () => {
      a.stop();
      b.stop();
    };
  }, [shuffleId, x, y]);

  return (
    <motion.figure
      animate={inView ? { opacity: 1, left: `${spot.left}%`, top: `${spot.top}%`, rotate: spot.rotate } : { opacity: 0 }}
      className="absolute w-60 cursor-grab rounded-2xl bg-white p-3 pb-5 shadow-[0_30px_50px_-25px_rgba(10,20,51,0.55)] active:cursor-grabbing"
      drag
      dragConstraints={table}
      dragElastic={0.15}
      initial={{ opacity: 0, left: `${spot.left}%`, top: `${spot.top + 8}%`, rotate: spot.rotate }}
      style={{ x, y, zIndex: spot.z }}
      transition={{ type: "spring", damping: 18, stiffness: 140, delay: shuffleId ? index * 0.02 : index * 0.05 }}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100 }}
      whileHover={{ scale: 1.04 }}
    >
      <div className="pointer-events-none relative aspect-square overflow-hidden rounded-xl">
        <Image alt={p.alt} className="object-cover" draggable={false} fill sizes="240px" src={p.src} />
      </div>
      <figcaption className="mt-3 px-1 font-script text-2xl text-abyss leading-none">{p.caption}</figcaption>
    </motion.figure>
  );
}

/**
 * Desktop: a scattered pile of polaroids you can drag around and shuffle.
 * Mobile: a plain grid (shuffle reorders it), so dragging never fights page scroll.
 */
export function PolaroidWall({ items }: { items: Polaroid[] }) {
  const table = useRef<HTMLDivElement>(null);
  const inView = useInView(table, { once: true, margin: "-10%" });
  const [spots, setSpots] = useState(() => initialSpots(items.length));
  const [order, setOrder] = useState(() => items.map((_, i) => i));
  const [shuffleId, setShuffleId] = useState(0);

  const shuffle = () => {
    setSpots(randomSpots(items.length));
    setOrder((o) => [...o].sort(() => Math.random() - 0.5));
    setShuffleId((n) => n + 1);
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-end gap-4">
        <p className="hidden font-script text-2xl text-mahi lg:block">Drag them around, or</p>
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
        {items.map((p, i) => (
          <Card index={i} inView={inView} key={p.src} p={p} shuffleId={shuffleId} spot={spots[i]} table={table} />
        ))}
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
