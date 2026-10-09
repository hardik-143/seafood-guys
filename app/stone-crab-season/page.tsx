import { ArrowRight, BellRing, CalendarDays, Flame, Recycle } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { SeasonCountdown } from "@/components/sections/season-countdown";
import { Cta } from "@/components/sections/cta";
import { Waves } from "@/components/ui/waves";
import { primaryPhone } from "@/content/site";

export const metadata: Metadata = {
  title: "Stone Crab Season Countdown",
  description:
    "Florida stone crab season runs October 15 to May 1. Live countdown, what makes stone crab special, and how to get claws delivered free in Miami and Fort Lauderdale.",
};

const facts = [
  { icon: CalendarDays, title: "Oct 15 – May 1", body: "Florida's stone crab season. Outside those dates, there's no fresh stone crab to be had." },
  { icon: Recycle, title: "Claws only", body: "Only the claws are harvested and the crab goes back in the water, where the claw grows back." },
  { icon: Flame, title: "Cooked at the dock", body: "Claws are cooked right after harvest and served chilled. You just crack and eat." },
];

export default function StoneCrabSeasonPage() {
  return (
    <>
      <section className="grain relative isolate overflow-hidden bg-abyss pt-40 pb-28 text-white md:pt-48 md:pb-36">
        <Image alt="" className="-z-20 object-cover opacity-25" fill priority sizes="100vw" src="/media/photos/stone-crab-haul.jpg" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-abyss via-abyss/90 to-navy/70" />
        <div className="container">
          <p className="font-script text-3xl text-lime">Stone crab season</p>
          <div className="mt-6">
            <SeasonCountdown />
          </div>
          <div className="mt-12 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white"
              href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent("Hi Seafood Guys! Text me when stone crab is in.")}`}
            >
              <BellRing className="size-4" /> Text me when it&apos;s in
            </a>
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime"
              href="/crabs"
            >
              Crab menu <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <Waves className="absolute inset-x-0 -bottom-px h-[60px] text-ice" />
      </section>

      <section className="container py-24 md:py-32">
        <p className="font-script text-3xl text-mahi" data-reveal>
          Why the wait
        </p>
        <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
          Florida&apos;s most seasonal treat
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
          {facts.map(({ icon: Icon, title, body }) => (
            <article className="group rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)] transition duration-500 hover:-translate-y-1" key={title}>
              <span className="grid size-14 place-items-center rounded-2xl bg-abyss text-lime transition duration-500 group-hover:rotate-12">
                <Icon className="size-7" />
              </span>
              <h3 className="mt-6 text-3xl text-abyss">{title}</h3>
              <p className="mt-2 text-ink/65">{body}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-ink/60" data-reveal>
          Ready for the first batch?{" "}
          <Link className="font-semibold text-abyss underline decoration-lime decoration-2 underline-offset-4" href="/recipes">
            Make the mustard sauce
          </Link>{" "}
          while you wait.
        </p>
      </section>

      <Cta />
    </>
  );
}
