import { Anchor, HeartHandshake, Snowflake } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { PhoneVideo } from "@/components/ui/phone-video";
import { videos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Seafood Guys is a Miami crew delivering premium seafood and meats to homes, offices and restaurants across South Florida.",
};

const values = [
  {
    icon: Anchor,
    title: "Fresh, or it doesn't ship",
    body: "We buy what we'd serve our own families — lobster still kicking, tuna deep red, salmon bright and firm — and freeze it at its best.",
  },
  {
    icon: Snowflake,
    title: "Packed like it matters",
    body: "Portioned, vacuum-sealed, labelled and iced in a cooler with your name on it. Open the freezer and it's dinner, not a project.",
  },
  {
    icon: HeartHandshake,
    title: "Neighbours, not a warehouse",
    body: "You'll know the guy at your door. We remember orders, take requests and text back — the way buying seafood should feel.",
  },
];

export default function OurStoryPage() {
  const delivery = videos.find((v) => v.src.includes("delivery-carry")) ?? videos[0];

  return (
    <>
      <PageHeader
        image="/media/photos/team-hq.jpg"
        intro="A Miami crew that got tired of tired seafood. So we started bringing the good stuff straight to people's doors."
        kicker="Our story"
        title={
          <>
            Just some guys <br /> who love <span className="text-lime">seafood</span>
          </>
        }
      />

      <section className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2">
        <div className="relative h-[560px]" data-reveal="left">
          <div className="absolute top-0 left-0 h-[70%] w-[70%] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image alt="The Seafood Guys team packing orders under the logo" className="object-cover" fill sizes="40vw" src="/media/photos/team-hq.jpg" />
          </div>
          <div className="absolute right-0 bottom-0 h-[55%] w-[55%] rotate-3 overflow-hidden rounded-[2rem] border-8 border-ice shadow-2xl">
            <Image alt="Two of the crew holding boxes of steaks and shrimp at night" className="object-cover" fill sizes="30vw" src="/media/photos/crew-night-delivery.jpg" />
          </div>
        </div>
        <div>
          <h2 className="text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            From the dock, to the cooler, to your table
          </h2>
          <div className="mt-6 space-y-5 text-ink/75 text-lg leading-relaxed" data-reveal>
            <p>
              Seafood Guys started the way most good Miami things do — with
              friends, a cooler and a phone full of people asking where to get
              real stone crab, lobster tails and fish that actually tastes like
              the ocean.
            </p>
            <p>
              Today we deliver premium seafood and steaks across Miami-Dade and
              Broward: to families stocking up, offices treating their teams,
              chefs filling their walk-ins and hosts planning a seafood boil for
              thirty.
            </p>
            <p>
              The menu is simple on purpose. Ten-pound cases of the fish Florida
              loves, packages that make dinner easy, and delivery that&apos;s
              always free.
            </p>
          </div>
        </div>
      </section>

      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container">
          <p className="font-script text-3xl text-lime" data-reveal>
            What we stand for
          </p>
          <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
            Three promises in every box
          </h2>
          <div className="mt-14 grid gap-6 md:grid-cols-3" data-reveal-group>
            {values.map(({ icon: Icon, title, body }, i) => (
              <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 transition duration-500 hover:-translate-y-2 hover:border-lime/50" key={title}>
                <span className="absolute -top-6 -right-2 font-display text-[9rem] text-white/[0.04] leading-none">
                  0{i + 1}
                </span>
                <span className="grid size-14 place-items-center rounded-2xl bg-lime text-abyss transition duration-500 group-hover:rotate-12">
                  <Icon className="size-7" />
                </span>
                <h3 className="mt-8 text-3xl">{title}</h3>
                <p className="mt-3 text-white/70">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <p className="font-script text-3xl text-mahi" data-reveal>
            Who we deliver to
          </p>
          <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            Homes, offices, restaurants & events
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2" data-reveal-group>
            {[
              { t: "Home cooks", d: "Stock the freezer with a case or a package and eat well all month." },
              { t: "Offices", d: "Team treats and client gifts — every box arrives labelled by name." },
              { t: "Chefs & restaurants", d: "Consistent product and recurring drops. Call for wholesale." },
              { t: "Parties & boils", d: "Stone crab, king crab, shrimp by the bag — feed a crowd." },
            ].map((x) => (
              <div className="rounded-3xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(10,20,51,0.4)]" key={x.t}>
                <h3 className="text-2xl text-abyss">{x.t}</h3>
                <p className="mt-2 text-ink/65 text-sm">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[300px]" data-reveal="right">
          <PhoneVideo label={delivery.label} poster={delivery.poster} src={delivery.src} />
        </div>
      </section>

      <Cta />
    </>
  );
}
