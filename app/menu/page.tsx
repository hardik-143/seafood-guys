import { Snowflake, Truck, Wallet } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { PackageCard } from "@/components/order/package-card";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { cases, packages, singles } from "@/content/menu";

export const metadata: Metadata = {
  title: "Menu — Cases & Packages",
  description:
    "Seafood Guys packages from $150, 10 lb fish cases at $125, lobster cases and single Caribbean lobster tails. Free delivery in Miami & Ft. Lauderdale.",
};

const groups = [
  { id: "packages", label: "Packages", kicker: "Mix & match boxes", items: packages },
  { id: "cases", label: "Cases", kicker: "All cases 10 lbs", items: cases },
  { id: "by-the-piece", label: "By the piece", kicker: "Tails & add-ons", items: singles },
];

export default function MenuPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/lobster-tails-raw.jpg"
        intro="Every box is portioned, vacuum-sealed, frozen and delivered free. Add what you like, send the order, and we'll text to confirm."
        kicker="Cases & packages"
        title={
          <>
            The <span className="text-lime">menu</span>
          </>
        }
      >
        <ul className="mt-10 flex flex-wrap gap-3 text-sm" data-reveal>
          {[
            { icon: Truck, t: "Free delivery" },
            { icon: Snowflake, t: "Vacuum-sealed & frozen" },
            { icon: Wallet, t: "Pay on delivery" },
          ].map(({ icon: Icon, t }) => (
            <li className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur" key={t}>
              <Icon className="size-4 text-lime" /> {t}
            </li>
          ))}
        </ul>
      </PageHeader>

      <nav className="sticky top-[88px] z-30 mx-auto -mt-6 mb-4 w-fit max-w-[calc(100vw-2rem)] overflow-x-auto rounded-full border border-navy/10 bg-white/85 p-1.5 shadow-lg backdrop-blur-xl">
        <ul className="flex gap-1">
          {groups.map((g) => (
            <li key={g.id}>
              <a
                className="block whitespace-nowrap rounded-full px-5 py-2 font-semibold text-abyss text-sm transition hover:bg-abyss hover:text-lime"
                href={`#${g.id}`}
              >
                {g.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((g) => (
        <section className="container scroll-mt-28 py-14 md:py-20" id={g.id} key={g.id}>
          <div className="mb-10 flex items-end justify-between gap-6 border-navy/10 border-b pb-6">
            <h2 className="text-[clamp(2.6rem,6vw,5rem)] text-abyss" data-reveal>
              {g.label}
            </h2>
            <p className="pb-2 font-script text-2xl text-mahi md:text-3xl" data-reveal>
              {g.kicker}
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
            {g.items.map((item) => (
              <PackageCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      ))}

      <section className="container py-16">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-abyss p-6 text-white md:grid-cols-2 md:p-12">
          <div className="relative mx-auto aspect-[1170/1495] w-full max-w-md -rotate-2 overflow-hidden rounded-2xl shadow-2xl" data-reveal="left">
            <Image alt="Seafood Guys cases & packages menu board" className="object-cover" fill sizes="(min-width: 768px) 40vw, 90vw" src="/media/photos/menu-board.jpg" />
          </div>
          <div data-reveal="right">
            <p className="font-script text-3xl text-lime">Prefer the classic?</p>
            <h2 className="mt-2 text-5xl md:text-6xl">The menu board</h2>
            <p className="mt-4 text-white/70">
              Same boxes, same prices — the board we hand out at events and
              tuck in every delivery. Screenshot it and text us your picks.
            </p>
            <a
              className="mt-8 inline-flex rounded-full bg-lime px-6 py-3.5 font-bold text-abyss uppercase tracking-wide transition hover:bg-white"
              download
              href="/media/photos/menu-board.jpg"
            >
              Download menu
            </a>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
