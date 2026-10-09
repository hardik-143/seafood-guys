import { ArrowRight, Flame, Scissors, Timer, UtensilsCrossed } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PackageCard } from "@/components/order/package-card";
import { Cta } from "@/components/sections/cta";
import { PromoHero } from "@/components/sections/promo-hero";
import { PhoneVideo } from "@/components/ui/phone-video";
import { videos } from "@/content/gallery";
import { allItems } from "@/content/menu";

export const metadata: Metadata = {
  title: "Caribbean Lobster Tails Delivered",
  description:
    "Caribbean spiny lobster tails by the piece, the dozen or the 10 lb case, delivered free across Miami and Fort Lauderdale.",
  openGraph: {
    images: [{ url: "/media/photos/lobster-tails-baked.jpg", width: 1800, height: 1350 }],
  },
};

const pick = (...ids: string[]) => ids.flatMap((id) => allItems.filter((i) => i.id === id));

const sizes = [
  { name: "Medium", oz: "5–6 oz", price: "$15", broil: "5–6 min", scale: "scale-[0.78]", note: "One per guest alongside a steak." },
  { name: "Large", oz: "7–8 oz", price: "$20", broil: "7–8 min", scale: "scale-100", note: "The main event. Butterfly and broil." },
];

const steps = [
  { icon: Scissors, title: "Butterfly", body: "Thaw, then cut down the centre of the top shell to the tail fin with kitchen shears." },
  { icon: UtensilsCrossed, title: "Lift the meat", body: "Gently pull the meat up and rest it on top of the shell so it puffs as it cooks." },
  { icon: Flame, title: "Butter it up", body: "Garlic butter, a pinch of paprika, salt. Don't be shy." },
  { icon: Timer, title: "Broil", body: "About a minute per ounce, until the meat is opaque and just firm. Rest a minute, serve." },
];

export default function LobsterPage() {
  const live = videos.find((v) => v.src.includes("live-lobsters")) ?? videos[0];

  return (
    <>
      <PromoHero
        badge="Caribbean spiny lobster · frozen at the dock"
        ctaLabel="Order tails"
        intro={
          <>
            Sweet, firm Caribbean lobster tails by the piece, the dozen or the{" "}
            <b className="font-semibold text-white">10 lb case</b>. Butterfly,
            broil, done. Free delivery across Miami & Ft. Lauderdale.
          </>
        }
        lines={["Big tails.", "Bigger dinners."]}
        polaroids={[
          { src: "/media/photos/lobster-tails-raw.jpg", alt: "Raw Caribbean lobster tails", caption: "Fresh frozen", rotate: -6, className: "right-[22%] bottom-[24%]" },
          { src: "/media/photos/lobster-tails-baked.jpg", alt: "Broiled lobster tails with butter", caption: "Tonight ✦", rotate: 7, className: "right-[5%] bottom-[14%]" },
        ]}
        smsBody="Hi Seafood Guys! I'd like to order lobster tails."
      />

      {/* Size compare */}
      <section className="container py-24 md:py-32">
        <p className="font-script text-3xl text-mahi" data-reveal>
          Pick your tail
        </p>
        <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
          Medium or large?
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2" data-reveal-group>
          {sizes.map((s) => (
            <article className="group relative overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.35)]" key={s.name}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">{s.oz}</p>
                  <h3 className="mt-1 text-5xl text-abyss">{s.name}</h3>
                </div>
                <span className="font-display text-6xl text-coral">{s.price}</span>
              </div>
              <div className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-sm">
                <div className={`absolute inset-0 origin-bottom transition duration-700 group-hover:-rotate-3 ${s.scale}`}>
                  <Image alt={`${s.name} lobster tail`} className="rounded-3xl object-cover" fill sizes="(min-width: 768px) 30vw, 90vw" src="/media/photos/lobster-tail-hand.jpg" />
                </div>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-navy/10 border-t pt-6 text-sm">
                <div>
                  <dt className="text-ink/50">Broil time</dt>
                  <dd className="font-display text-2xl text-abyss">{s.broil}</dd>
                </div>
                <div>
                  <dt className="text-ink/50">Best for</dt>
                  <dd className="text-ink/75">{s.note}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      {/* How to cook */}
      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="font-script text-3xl text-lime" data-reveal>
              Butterfly & broil
            </p>
            <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
              Restaurant tails in four steps
            </h2>
            <ol className="mt-12 grid gap-5 sm:grid-cols-2" data-reveal-group>
              {steps.map(({ icon: Icon, title, body }, i) => (
                <li className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 transition duration-500 hover:-translate-y-1 hover:border-lime/50" key={title}>
                  <span className="pointer-events-none absolute top-3 right-5 font-display text-[5rem] text-white/[0.05] leading-none">0{i + 1}</span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-lime text-abyss transition duration-500 group-hover:rotate-12">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-3xl">{title}</h3>
                  <p className="mt-2 text-sm text-white/70">{body}</p>
                </li>
              ))}
            </ol>
            <Link className="group mt-10 inline-flex items-center gap-2 font-semibold text-lime" data-reveal href="/cook">
              Full cooking guide & timer
              <ArrowRight className="size-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-[280px]" data-reveal="right">
            <PhoneVideo label={live.label} poster={live.poster} src={live.src} />
          </div>
        </div>
      </section>

      {/* Buy */}
      <section className="container py-24 md:py-32">
        <p className="font-script text-3xl text-mahi" data-reveal>
          Stock up
        </p>
        <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
          Tails, dozens & cases
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {pick("tail-medium", "tail-large", "lobster-dinner", "land-sea", "lobster-case").map((item) => (
            <PackageCard item={item} key={item.id} />
          ))}
        </div>
      </section>

      <Cta />
    </>
  );
}
