import { ChefHat, Globe2, PartyPopper, Repeat, ShoppingBasket, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ContactForm } from "@/components/sections/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { Counter } from "@/components/ui/counter";
import { primaryPhone } from "@/content/site";

export const metadata: Metadata = {
  title: "Wholesale Seafood & Meats",
  description:
    "Third-generation seafood supplier serving supermarkets, restaurants and caterers across Miami-Dade and Broward with seafood and premium meats sourced worldwide.",
};

const segments = [
  {
    icon: ShoppingBasket,
    title: "Supermarkets",
    body: "Consistent product and dependable drops to keep seafood counters full.",
    image: "/media/photos/warehouse-salmon.jpg",
  },
  {
    icon: ChefHat,
    title: "Restaurants",
    body: "Fish, shellfish and premium cuts your kitchen can build a menu around.",
    image: "/media/photos/customer-restaurant.jpg",
  },
  {
    icon: PartyPopper,
    title: "Catering & events",
    body: "Crab, shrimp, lobster and steaks for a crowd, on time and on ice.",
    image: "/media/photos/wagyu-event.jpg",
  },
];

const stats = [
  { value: 55, suffix: "", label: "Years in seafood" },
  { value: 3, suffix: "", label: "Generations" },
  { value: 2, suffix: "", label: "Counties on our routes" },
];

const how = [
  { icon: ChefHat, title: "Tell us what you need", body: "Species, cuts, volumes and how often. Call, text or use the form." },
  { icon: Globe2, title: "We source it", body: "Procured from all over the world, portioned and packed to your spec." },
  { icon: Truck, title: "We deliver it", body: "Dropped at your dock, kitchen or venue across Miami-Dade and Broward." },
  { icon: Repeat, title: "Then on repeat", body: "Set up recurring drops so you're never short on a Friday night." },
];

const range = [
  "Mahi Mahi", "Snapper", "Grouper", "Salmon", "Tuna", "Corvina", "Stone Crab", "King Crab",
  "Lobster Tails", "Jumbo Shrimp", "Scallops", "Filet Mignon", "Wagyu", "Churrasco", "Tomahawk",
];

export default function WholesalePage() {
  return (
    <>
      <PageHeader
        image="/media/photos/warehouse-salmon.jpg"
        intro="A third-generation family business supplying supermarkets, restaurants and caterers with quality seafood and premium meats — and the customer service to match."
        kicker="Wholesale"
        title={
          <>
            Feed your <br /> <span className="text-lime">business</span>
          </>
        }
      >
        <a
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white"
          data-reveal
          href="#quote"
        >
          Request a quote
        </a>
      </PageHeader>

      {/* Heritage */}
      <section className="container grid items-center gap-14 py-24 md:py-32 lg:grid-cols-2">
        <div>
          <p className="font-script text-3xl text-mahi" data-reveal>
            A family tradition
          </p>
          <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            Fresh, quality goods since our grandfather
          </h2>
          <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed" data-reveal>
            Beginning with our grandfather Peter Torres, followed by our father
            and mentor Tony Torres, Seafood Guys brings three generations of
            strengths together: quality seafood, premium meats sourced from all
            over the world, and service that keeps customers coming back.
          </p>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-navy/10 border-t pt-10" data-reveal-group>
            {stats.map((s) => (
              <div className="flex flex-col" key={s.label}>
                <dt className="order-2 mt-2 text-ink/60 text-sm">{s.label}</dt>
                <dd className="order-1 font-display text-5xl text-abyss md:text-6xl">
                  <Counter suffix={s.suffix} value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative h-[520px]" data-reveal="right">
          <div className="absolute top-0 right-0 h-[72%] w-[70%] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image alt="Packed orders ready for delivery" className="object-cover" fill sizes="35vw" src="/media/photos/packed-orders.jpg" />
          </div>
          <div className="absolute bottom-0 left-0 h-[55%] w-[55%] -rotate-3 overflow-hidden rounded-[2rem] border-8 border-ice shadow-2xl">
            <Image alt="Whole tuna loin on the cutting table" className="object-cover" fill sizes="28vw" src="/media/photos/tuna-loin.jpg" />
          </div>
        </div>
      </section>

      {/* Range marquee */}
      <div aria-hidden className="overflow-hidden bg-abyss py-5 text-white">
        <div className="flex w-max animate-marquee items-center gap-8">
          {[...range, ...range].map((w, i) => (
            <span className="flex items-center gap-8" key={`${w}-${i}`}>
              <span className={`font-display text-4xl uppercase ${i % 3 === 1 ? "text-outline" : ""}`}>{w}</span>
              <span className="text-lime">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Segments */}
      <section className="container py-24 md:py-32">
        <p className="font-script text-3xl text-mahi" data-reveal>
          Who we supply
        </p>
        <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
          Counters, kitchens & crowds
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3" data-reveal-group>
          {segments.map(({ icon: Icon, title, body, image }) => (
            <article className="group relative h-[440px] overflow-hidden rounded-[2rem] text-white" key={title}>
              <Image alt="" className="object-cover transition duration-700 group-hover:scale-110" fill sizes="(min-width: 768px) 33vw, 100vw" src={image} />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/40 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-lime text-abyss transition duration-500 group-hover:rotate-12">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-4xl">{title}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-b from-ice via-foam to-ice pb-24 md:pb-32">
        <div className="container">
          <h2 className="max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            How wholesale works
          </h2>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-4" data-reveal-group>
            {how.map(({ icon: Icon, title, body }, i) => (
              <li className="relative rounded-3xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(10,20,51,0.4)]" key={title}>
                <span className="font-display text-5xl text-navy/15">0{i + 1}</span>
                <Icon className="mt-4 size-7 text-mahi" />
                <h3 className="mt-4 text-2xl text-abyss">{title}</h3>
                <p className="mt-2 text-ink/65 text-sm">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Quote form */}
      <section className="container scroll-mt-28 pb-32" id="quote">
        <div className="grain relative grid gap-10 overflow-hidden rounded-[2.5rem] bg-abyss p-7 text-white md:p-12 lg:grid-cols-[0.9fr_1.1fr]" data-reveal="zoom">
          <div>
            <p className="font-script text-3xl text-lime">Request a quote</p>
            <h2 className="mt-2 text-5xl md:text-6xl">Let&apos;s talk volume</h2>
            <p className="mt-5 max-w-md text-white/70">
              Tell us what you&apos;re buying and how often. We&apos;ll come back
              with pricing and a delivery schedule.
            </p>
            <a className="mt-8 inline-block font-display text-4xl text-lime hover:underline" href={`tel:${primaryPhone.tel}`}>
              {primaryPhone.display}
            </a>
          </div>
          <ContactForm
            defaultTopic="Restaurant / wholesale"
            placeholder="Business name, what you need, rough weekly volume, delivery days…"
          />
        </div>
      </section>
    </>
  );
}
