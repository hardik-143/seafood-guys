"use client";

import { ArrowRight, Plus, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { faqGroups } from "@/content/faq";
import { cn } from "@/lib/utils";

export function FaqExplorer() {
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [open, setOpen] = useState<string | null>(faqGroups[0].items[0].q);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqGroups
      .filter((g) => group === "all" || g.id === group)
      .map((g) => ({
        ...g,
        items: g.items.filter((i) => !q || i.q.toLowerCase().includes(q) || i.a.toLowerCase().includes(q)),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, group]);

  return (
    <div>
      <div className="rounded-[2rem] bg-white p-3 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)]">
        <label className="relative block">
          <Search className="absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink/40" />
          <input
            className="w-full rounded-[1.4rem] bg-foam/60 py-4 pr-5 pl-14 text-abyss outline-none transition placeholder:text-ink/40 focus:bg-foam focus:ring-2 focus:ring-lime"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: delivery, thaw, stone crab…"
            value={query}
          />
        </label>
        <div className="mt-3 flex gap-1 overflow-x-auto" role="tablist">
          {[{ id: "all", label: "All", items: faqGroups.flatMap((g) => g.items) }, ...faqGroups].map((g) => (
            <button
              aria-selected={group === g.id}
              className={cn(
                "relative isolate flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-semibold text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-lime",
                group === g.id ? "text-white" : "text-ink/55 hover:text-abyss"
              )}
              key={g.id}
              onClick={() => setGroup(g.id)}
              role="tab"
              type="button"
            >
              {group === g.id && (
                <motion.span className="absolute inset-0 -z-10 rounded-full bg-abyss" layoutId="faq-chip" transition={{ type: "spring", damping: 26, stiffness: 300 }} />
              )}
              {g.label}
              <span
                className={cn(
                  "grid min-w-5 place-items-center rounded-full px-1.5 text-[11px]",
                  group === g.id ? "bg-lime text-abyss" : "bg-foam text-ink/50"
                )}
              >
                {g.items.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 space-y-12">
        {visible.length === 0 && (
          <p className="rounded-3xl bg-white p-8 text-center text-ink/60">
            Nothing matches “{query}”. Text us and we&apos;ll answer directly.
          </p>
        )}
        {visible.map((g) => (
          <section key={g.id}>
            <h2 className="text-3xl text-abyss md:text-4xl">{g.label}</h2>
            <ul className="mt-5 space-y-3">
              {g.items.map((item) => {
                const isOpen = open === item.q;
                return (
                  <li className={cn("rounded-3xl bg-white transition", isOpen && "shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)]")} key={item.q}>
                    <button
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      onClick={() => setOpen(isOpen ? null : item.q)}
                      type="button"
                    >
                      <span className="font-semibold text-abyss text-lg">{item.q}</span>
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full transition duration-300",
                          isOpen ? "rotate-45 bg-lime text-abyss" : "bg-foam text-abyss"
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
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-6 text-ink/70">
                            <p>{item.a}</p>
                            {item.link && (
                              <Link className="group mt-3 inline-flex items-center gap-1.5 font-semibold text-abyss" href={item.link.href}>
                                {item.link.label}
                                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                              </Link>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
