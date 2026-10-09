"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import { type Photo, photos } from "@/content/gallery";
import { cn } from "@/lib/utils";

const tags = ["All", "Customers", "The Catch", "Plated", "Behind the scenes"] as const;

export function GalleryGrid() {
  const [tag, setTag] = useState<(typeof tags)[number]>("All");
  const [index, setIndex] = useState<number | null>(null);
  const list = useMemo<Photo[]>(() => (tag === "All" ? photos : photos.filter((p) => p.tag === tag)), [tag]);

  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + list.length) % list.length)),
    [list.length]
  );

  useEffect(() => {
    if (index === null) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [index, step]);

  const current = index === null ? null : list[index];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        {tags.map((t) => (
          <button
            className={cn(
              "relative rounded-full px-5 py-2.5 font-semibold text-sm transition",
              tag === t ? "text-lime" : "bg-white text-ink/70 hover:text-abyss"
            )}
            key={t}
            onClick={() => setTag(t)}
            type="button"
          >
            {tag === t && <motion.span className="absolute inset-0 rounded-full bg-abyss" layoutId="gallery-tag" />}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <motion.div className="mt-12 columns-2 gap-4 md:columns-3 lg:columns-4" layout>
        <AnimatePresence mode="popLayout">
          {list.map((p, i) => (
            <motion.button
              animate={{ opacity: 1, scale: 1 }}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl bg-foam"
              exit={{ opacity: 0, scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.9 }}
              key={p.src}
              layout
              onClick={() => setIndex(i)}
              transition={{ duration: 0.4 }}
              type="button"
            >
              <Image
                alt={p.alt}
                className="h-auto w-full transition duration-700 group-hover:scale-105"
                height={p.h}
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                src={p.src}
                width={p.w}
              />
              <span className="absolute inset-x-2 bottom-2 translate-y-2 rounded-xl bg-abyss/70 px-3 py-2 text-left text-white text-xs opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
                {p.alt}
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {current && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-modal
            className="fixed inset-0 z-[90] flex items-center justify-center bg-abyss/95 p-4 backdrop-blur"
            data-lenis-prevent
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIndex(null)}
            role="dialog"
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-h-[85vh] max-w-5xl"
              initial={{ scale: 0.92, opacity: 0 }}
              key={current.src}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                alt={current.alt}
                className="max-h-[85vh] w-auto rounded-2xl object-contain"
                height={current.h}
                sizes="90vw"
                src={current.src}
                width={current.w}
              />
              <p className="mt-3 text-center text-sm text-white/70">{current.alt}</p>
            </motion.div>
            {[
              { d: -1, Icon: ChevronLeft, cls: "left-4" },
              { d: 1, Icon: ChevronRight, cls: "right-4" },
            ].map(({ d, Icon, cls }) => (
              <button
                aria-label={d < 0 ? "Previous" : "Next"}
                className={`absolute top-1/2 ${cls} grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-abyss`}
                key={d}
                onClick={(e) => {
                  e.stopPropagation();
                  step(d);
                }}
                type="button"
              >
                <Icon className="size-6" />
              </button>
            ))}
            <button
              aria-label="Close"
              className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-lime hover:text-abyss"
              onClick={() => setIndex(null)}
              type="button"
            >
              <X className="size-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
