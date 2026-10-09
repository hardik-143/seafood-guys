import type { Metadata } from "next";

import { BoilPlanner } from "@/components/sections/boil-planner";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { PhoneVideo } from "@/components/ui/phone-video";
import { videos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Seafood Boil Planner",
  description:
    "Tell us how many people you're feeding and we'll work out how much shrimp, crab and lobster to order for your seafood boil — delivered free in Miami and Fort Lauderdale.",
};

const steps = [
  { t: "Season the water", d: "Big pot, lots of salt, Old Bay, lemons, garlic. Bring it to a hard boil." },
  { t: "Potatoes, then corn", d: "Potatoes go first until nearly tender, corn joins for the last few minutes." },
  { t: "Seafood last", d: "Crab legs and tails for a few minutes to heat through, shrimp right at the end until pink." },
  { t: "Dump it on the table", d: "Newspaper down, drain, pour it out, melted butter everywhere." },
];

export default function BoilPage() {
  const king = videos.find((v) => v.src.includes("king-crab")) ?? videos[0];

  return (
    <>
      <PageHeader
        image="/media/photos/crab-feast.jpg"
        intro="How much crab do you need for 12 people? We did the maths. Pick your crowd, pick your seafood, text us the list."
        kicker="Seafood boil planner"
        title={
          <>
            Plan the <br /> <span className="text-lime">boil</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <div data-reveal>
          <BoilPlanner />
        </div>
        <p className="mt-6 text-ink/50 text-sm">
          Estimates use shell-on weight per person. We&apos;ll confirm sizes and this week&apos;s crab prices by text.
        </p>
      </section>

      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-script text-3xl text-lime" data-reveal>
              Boil day
            </p>
            <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
              Run it like a pro
            </h2>
            <ol className="mt-12 space-y-4" data-reveal-group>
              {steps.map((s, i) => (
                <li className="flex gap-5 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5" key={s.t}>
                  <span className="font-display text-4xl text-lime">0{i + 1}</span>
                  <div>
                    <h3 className="text-2xl">{s.t}</h3>
                    <p className="mt-1 text-sm text-white/70">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mx-auto w-full max-w-[280px]" data-reveal="right">
            <PhoneVideo label={king.label} poster={king.poster} src={king.src} />
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
