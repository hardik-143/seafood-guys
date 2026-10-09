"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

export type Polaroid = { src: string; alt: string; caption: string };

/**
 * Desktop: a scattered pile of polaroids you can drag around the table.
 * Mobile: a plain grid, so dragging never fights page scroll.
 */
export function PolaroidWall({ items }: { items: Polaroid[] }) {
  const table = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="relative hidden h-[640px] lg:block" ref={table}>
        {items.map((p, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const rotate = ((i * 37) % 15) - 7;
          return (
            <motion.figure
              className="absolute w-60 cursor-grab rounded-2xl bg-white p-3 pb-5 shadow-[0_30px_50px_-25px_rgba(10,20,51,0.55)] active:cursor-grabbing"
              drag
              dragConstraints={table}
              dragElastic={0.15}
              initial={{ opacity: 0, y: 40, rotate }}
              key={p.src}
              style={{ left: `${2 + col * 19 + (row % 2) * 6}%`, top: `${row * 34 + ((i * 13) % 7)}%`, zIndex: i }}
              transition={{ delay: i * 0.05, type: "spring", damping: 18 }}
              viewport={{ once: true, margin: "-10%" }}
              whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate }}
            >
              <div className="pointer-events-none relative aspect-square overflow-hidden rounded-xl">
                <Image alt={p.alt} className="object-cover" draggable={false} fill sizes="240px" src={p.src} />
              </div>
              <figcaption className="mt-3 px-1 font-script text-2xl text-abyss leading-none">{p.caption}</figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:hidden">
        {items.map((p, i) => (
          <figure
            className="rounded-2xl bg-white p-2 pb-3 shadow-[0_20px_40px_-25px_rgba(10,20,51,0.5)]"
            key={p.src}
            style={{ rotate: `${((i * 37) % 7) - 3}deg` }}
          >
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image alt={p.alt} className="object-cover" fill sizes="45vw" src={p.src} />
            </div>
            <figcaption className="mt-2 px-1 font-script text-abyss text-xl leading-none">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
