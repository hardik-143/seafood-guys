import { Droplets, Refrigerator, Thermometer } from "lucide-react";
import type { Metadata } from "next";

import { CookGuide } from "@/components/sections/cook-guide";
import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { thawing } from "@/content/cook";

export const metadata: Metadata = {
  title: "Cook It Right — Thaw & Cooking Guide",
  description:
    "How to thaw and cook lobster tails, stone crab, king crab, shrimp, salmon, tuna, mahi and filet mignon, with a built-in kitchen timer.",
};

const thawIcons = [Refrigerator, Droplets, Thermometer];

export default function CookPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/surf-turf-plated.jpg"
        intro="Everything we deliver is portioned and vacuum-sealed. Here's how to get it from freezer to plate tasting like the dock — with a timer so you don't have to guess."
        kicker="Cook it right"
        title={
          <>
            Freezer to <br /> <span className="text-lime">plate</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <p className="font-script text-3xl text-mahi" data-reveal>
          Step one, always
        </p>
        <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
          Thaw it cold
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-3" data-reveal-group>
          {thawing.map((t, i) => {
            const Icon = thawIcons[i];
            return (
              <article className="group rounded-3xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(10,20,51,0.4)] transition duration-500 hover:-translate-y-1" key={t.title}>
                <span className={`grid size-12 place-items-center rounded-2xl transition duration-500 group-hover:rotate-12 ${i === 2 ? "bg-coral text-white" : "bg-abyss text-lime"}`}>
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl text-abyss">{t.title}</h3>
                <p className="mt-2 text-ink/65 text-sm">{t.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-b from-ice via-foam to-ice pb-24 md:pb-32">
        <div className="container">
          <p className="font-script text-3xl text-mahi" data-reveal>
            Pick what you&apos;re cooking
          </p>
          <h2 className="mt-2 mb-12 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            Then hit start
          </h2>
          <div data-reveal>
            <CookGuide />
          </div>
          <p className="mt-8 text-ink/50 text-sm">
            Times are guides for thawed portions. Thickness and your stove change things — trust the doneness cue.
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
