import { ArrowRight, ChefHat, Home, PartyPopper, Phone, ShoppingBasket } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PackageCard } from "@/components/order/package-card";
import { Cta } from "@/components/sections/cta";
import { PromoHero } from "@/components/sections/promo-hero";
import { Counter } from "@/components/ui/counter";
import { PhoneVideo } from "@/components/ui/phone-video";
import { videos } from "@/content/gallery";
import { packages } from "@/content/menu";
import { primaryPhone } from "@/content/site";

export const metadata: Metadata = {
  title: "Stone Crab & King Crab Delivery",
  description:
    "Florida stone crab claws and king crab legs from a third-generation seafood family, delivered free across Miami and Fort Lauderdale.",
  openGraph: {
    images: [{ url: "/media/photos/stone-crab-haul.jpg", width: 1350, height: 1800 }],
  },
};

const generations = [
  {
    n: "I",
    name: "Peter Torres",
    role: "Our grandfather",
    body: "Where it started. A trade built on knowing the catch and treating customers like family.",
  },
  {
    n: "II",
    name: "Tony Torres",
    role: "Father & mentor",
    body: "Grew the business and passed down the standards: fresh, quality goods, every time.",
  },
  {
    n: "III",
    name: "Seafood Guys",
    role: "The third generation",
    body: "All of our strengths united as one: quality seafood, premium meats and real customer service.",
  },
];

const crabs = [
  {
    name: "Florida Stone Crab",
    kicker: "Season-only · Oct 15 – May 1",
    body: "Sweet, firm claw meat Florida waits all year for. Cooked, chilled and ready to crack, with mustard sauce on the side.",
    points: ["Cooked & chilled, ready to crack", "Mustard sauce included", "Ask for this week's sizes"],
    image: "/media/photos/stone-crab-haul.jpg",
    alt: "Sacks of fresh stone crab claws",
    video: "stone-crab-crack",
  },
  {
    name: "King Crab Legs",
    kicker: "Giant legs · Seafood-boil favourite",
    body: "Huge, meaty legs that steal the show at any table. Steam a few minutes, melt some butter, done.",
    points: ["Pre-cooked, steam & serve", "Built for boils & parties", "By the leg or by the case"],
    image: "/media/photos/crab-feast.jpg",
    alt: "Chef with a spread of king crab legs, shrimp and corn",
    video: "king-crab",
  },
];

const customers = [
  { icon: ShoppingBasket, title: "Supermarkets", body: "Steady supply for seafood counters." },
  { icon: ChefHat, title: "Restaurants", body: "Consistent product for your menu." },
  { icon: PartyPopper, title: "Catering & events", body: "Crab for a crowd, on time." },
  { icon: Home, title: "Home delivery", body: "Free to your door, iced and ready." },
];

const crabWords = ["Stone Crab", "King Crab", "Crack", "Dip", "Repeat"];

export default function CrabsPage() {
  const crabPackage = packages.find((p) => p.id === "reef-beef");
  const findVideo = (key: string) => videos.find((v) => v.src.includes(key)) ?? videos[0];
  const bags = findVideo("stone-crab-bags");

  return (
    <>
      <PromoHero
        badge="Florida stone crab season · Oct 15 – May 1"
        ctaLabel="Reserve your crab"
        intro={
          <>
            Florida stone crab claws and giant king crab legs from a family that
            has been in seafood for <b className="font-semibold text-white">55 years</b>.
            Cracked, iced and delivered free across Miami & Ft. Lauderdale.
          </>
        }
        lines={["Crack into", "crab season."]}
        polaroids={[
          { src: "/media/photos/stone-crab-haul.jpg", alt: "Sacks of fresh stone crab claws", caption: "Stone crab ✦", rotate: -7, className: "right-[22%] bottom-[24%]" },
          { src: "/media/photos/crab-feast.jpg", alt: "Spread of king crab legs, shrimp and corn", caption: "King crab night", rotate: 6, className: "right-[5%] bottom-[14%]" },
        ]}
        smsBody="Hi Seafood Guys! I'd like to order crab."
      />

      {/* Heritage */}
      <section className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
        <div data-reveal="left">
          <p className="font-script text-3xl text-mahi">A family tradition</p>
          <p className="mt-2 font-display text-[clamp(7rem,18vw,13rem)] text-abyss leading-[0.85]">
            <Counter value={55} />
          </p>
          <p className="font-display text-3xl text-abyss uppercase">years of seafood</p>
          <p className="mt-6 max-w-md text-ink/70 text-lg leading-relaxed">
            Food has the power to connect generations, and for 55 years seafood
            has connected ours.
          </p>
        </div>

        <div>
          <h2 className="text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            Fresh, quality goods. Three generations deep.
          </h2>
          <ol className="relative mt-12 space-y-6 border-navy/15 border-l-2 pl-8" data-reveal-group>
            {generations.map((g) => (
              <li className="relative" key={g.name}>
                <span className="absolute top-1 -left-[3.05rem] grid size-9 place-items-center rounded-full bg-abyss font-display text-lime text-sm">
                  {g.n}
                </span>
                <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">{g.role}</p>
                <h3 className="mt-1 text-3xl text-abyss">{g.name}</h3>
                <p className="mt-2 max-w-lg text-ink/65">{g.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Crab ticker */}
      <div aria-hidden className="relative z-10 -my-4 overflow-hidden py-8">
        <div className="-rotate-2 scale-105 bg-coral text-white">
          <div className="flex w-max animate-marquee items-center gap-8 py-4">
            {[...crabWords, ...crabWords, ...crabWords, ...crabWords].map((w, i) => (
              <span className="flex items-center gap-8" key={`${w}-${i}`}>
                <span className={`font-display text-4xl uppercase md:text-5xl ${i % 2 ? "text-outline" : ""}`}>{w}</span>
                <span className="text-3xl">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* The crabs */}
      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container">
          <p className="font-script text-3xl text-lime" data-reveal>
            On the boat this week
          </p>
          <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
            Two crabs. Zero compromises.
          </h2>

          <div className="mt-16 space-y-24">
            {crabs.map((c, i) => {
              const v = findVideo(c.video);
              return (
                <article className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr_0.5fr]" key={c.name}>
                  <div
                    className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-2xl md:h-[520px]"
                    data-reveal={i % 2 ? "right" : "left"}
                  >
                    <Image alt={c.alt} className="object-cover transition duration-700 hover:scale-105" fill sizes="(min-width: 1024px) 40vw, 100vw" src={c.image} />
                    <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 to-transparent" />
                    <span className="absolute bottom-5 left-5 rounded-full bg-lime px-3 py-1 font-bold text-[11px] text-abyss uppercase tracking-wider">
                      {c.kicker}
                    </span>
                  </div>
                  <div data-reveal>
                    <h3 className="text-[clamp(2.4rem,4vw,3.8rem)]">{c.name}</h3>
                    <p className="mt-4 text-lg text-white/75">{c.body}</p>
                    <ul className="mt-6 space-y-3">
                      {c.points.map((p) => (
                        <li className="flex items-center gap-3 text-white/85" key={p}>
                          <span className="size-2 rounded-full bg-lime" />
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      className="group mt-8 inline-flex items-center gap-2 font-semibold text-lime"
                      href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent(`Hi! I'd like to order ${c.name}.`)}`}
                    >
                      Text to order
                      <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                    </a>
                  </div>
                  <div className="mx-auto hidden w-full max-w-[220px] lg:block" data-reveal="zoom">
                    <PhoneVideo label={v.label} poster={v.poster} src={v.src} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Package + season video */}
      {crabPackage && (
        <section className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1fr_0.9fr_0.6fr]">
          <div>
            <p className="font-script text-3xl text-mahi" data-reveal>
              Make it a night
            </p>
            <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
              Stone crab, meet filet mignon
            </h2>
            <p className="mt-6 max-w-md text-ink/70 text-lg leading-relaxed" data-reveal>
              Our Reef & Beef box pairs a dozen stone crab claws and mustard
              sauce with filet mignon, jumbo shrimp and smoked mahi dip. Peak
              Florida, in one cooler.
            </p>
            <Link className="group mt-8 inline-flex items-center gap-2 font-semibold text-abyss" data-reveal href="/menu">
              See the full menu
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div data-reveal="zoom">
            <PackageCard item={crabPackage} />
          </div>
          <div className="mx-auto w-full max-w-[240px]" data-reveal="right">
            <PhoneVideo label={bags.label} poster={bags.poster} src={bags.src} />
          </div>
        </section>
      )}

      {/* Who we serve */}
      <section className="bg-gradient-to-b from-ice via-foam to-ice pb-24 md:pb-32">
        <div className="container">
          <p className="font-script text-3xl text-mahi" data-reveal>
            Who we serve
          </p>
          <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            From the counter to your kitchen
          </h2>
          <p className="mt-6 max-w-2xl text-ink/70 text-lg" data-reveal>
            We supply supermarkets, restaurants, catering events and home
            deliveries, sourcing product from all over the world and proudly
            standing as a leading provider of seafood and meats.
          </p>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
            {customers.map(({ icon: Icon, title, body }) => (
              <div className="group rounded-3xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(10,20,51,0.4)] transition duration-500 hover:-translate-y-2" key={title}>
                <span className="grid size-12 place-items-center rounded-2xl bg-abyss text-lime transition duration-500 group-hover:rotate-12">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-2xl text-abyss">{title}</h3>
                <p className="mt-2 text-ink/65 text-sm">{body}</p>
              </div>
            ))}
          </div>
          <a
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-abyss/20 px-6 py-4 font-semibold text-abyss transition hover:border-abyss hover:bg-abyss hover:text-lime"
            data-reveal
            href={`tel:${primaryPhone.tel}`}
          >
            <Phone className="size-4" /> Wholesale & events: {primaryPhone.display}
          </a>
        </div>
      </section>

      <Cta />
    </>
  );
}
