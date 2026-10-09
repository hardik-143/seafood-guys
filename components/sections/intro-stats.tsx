import Image from "next/image";

import { Counter } from "@/components/ui/counter";

const stats = [
  { value: 0, prefix: "$", label: "Delivery fee. Ever." },
  { value: 10, suffix: " lbs", label: "In every fish case" },
  { value: 6, label: "Fish species by the case" },
  { value: 2, label: "Counties on our routes" },
];

export function IntroStats() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="container grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="font-script text-3xl text-mahi" data-reveal>
            Hey, we&apos;re the Guys.
          </p>
          <h2
            className="mt-3 text-[clamp(2.8rem,6vw,5.4rem)] text-abyss"
            data-reveal
          >
            Restaurant-grade seafood,{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_58%,var(--color-lime)_58%,var(--color-lime)_88%,transparent_88%)] px-1">
              without the markup.
            </span>
          </h2>
          <p className="mt-6 max-w-xl text-ink/70 text-lg leading-relaxed" data-reveal>
            We source the same fish, lobster and steaks Miami&apos;s kitchens
            cook with, portion and vacuum-seal it, and drop it at your home,
            office or restaurant — boxes labelled with your name, no delivery
            fee, no grocery-store guesswork.
          </p>

          <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-navy/10 border-t pt-10 md:grid-cols-4" data-reveal-group>
            {stats.map((s) => (
              <div className="flex flex-col" key={s.label}>
                <dt className="order-2 mt-2 text-ink/60 text-sm">{s.label}</dt>
                <dd className="order-1 font-display text-5xl text-abyss">
                  <Counter prefix={s.prefix} suffix={s.suffix} value={s.value} />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative h-[520px] md:h-[620px]" data-reveal="zoom">
          <div className="absolute top-0 right-0 h-[78%] w-[72%] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              alt="One of the Guys holding two whole salmon sides in the warehouse"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 35vw, 70vw"
              src="/media/photos/warehouse-salmon.jpg"
            />
          </div>
          <div className="absolute bottom-0 left-0 h-[52%] w-[54%] -rotate-3 overflow-hidden rounded-[2rem] border-8 border-ice shadow-2xl">
            <Image
              alt="Customer at her desk with a named Seafood Guys box"
              className="object-cover"
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              src="/media/photos/customer-desk.jpg"
            />
          </div>
          <div className="absolute top-[58%] right-[6%] grid size-32 place-items-center rounded-full bg-abyss text-lime">
            <svg className="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
              <defs>
                <path d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" id="circle" />
              </defs>
              <text className="fill-current font-semibold text-[9.5px] uppercase tracking-[0.2em]">
                <textPath href="#circle">Free delivery · Miami · Ft. Laud ·</textPath>
              </text>
            </svg>
            <span className="font-display text-3xl text-white">$0</span>
          </div>
        </div>
      </div>
    </section>
  );
}
