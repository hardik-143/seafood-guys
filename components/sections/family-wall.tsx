import Image from "next/image";
import Link from "next/link";

import { photos } from "@/content/gallery";

const customers = photos.filter((p) => p.tag === "Customers");
const food = photos.filter((p) => p.tag !== "Customers");

function Strip({ items, reverse }: { items: typeof photos; reverse?: boolean }) {
  return (
    // overflow-hidden clips both axes, so pad vertically to leave room for the tilt,
    // drop shadow and hover zoom; the negative margin keeps rows visually close.
    <div className="-my-8 flex overflow-hidden py-12 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-5 hover:[animation-play-state:paused] ${reverse ? "animate-[marquee_70s_linear_infinite_reverse]" : "animate-[marquee_70s_linear_infinite]"}`}
      >
        {[...items, ...items].map((p, i) => (
          <figure
            className="w-56 shrink-0 rounded-2xl bg-white p-2 pb-3 shadow-[0_20px_40px_-20px_rgba(10,20,51,0.4)] transition duration-500 hover:z-10 hover:scale-105 hover:rotate-0 md:w-64"
            key={`${p.src}-${i}`}
            style={{ rotate: `${((i * 37) % 7) - 3}deg` }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image alt={p.alt} className="object-cover" fill sizes="256px" src={p.src} />
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function FamilyWall() {
  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="container text-center">
        <p className="font-script text-3xl text-mahi" data-reveal>
          #SeafoodGuysFamily
        </p>
        <h2 className="mx-auto mt-2 max-w-4xl text-[clamp(2.8rem,6vw,5.4rem)] text-abyss" data-reveal>
          Offices, kitchens & cookouts across South Florida
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-ink/65 text-lg" data-reveal>
          Law firms, dental offices, chefs and backyard grill masters — every
          box gets a name on the lid and a smile on delivery.
        </p>
      </div>
      <div className="mt-14" data-reveal>
        <Strip items={customers} />
        <Strip items={food.slice(0, 12)} reverse />
      </div>
      <div className="mt-10 text-center">
        <Link
          className="inline-flex rounded-full border-2 border-abyss px-6 py-3 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-abyss hover:text-lime"
          href="/gallery"
        >
          Open the gallery
        </Link>
      </div>
    </section>
  );
}
