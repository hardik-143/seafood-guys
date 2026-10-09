import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { primaryPhone } from "@/content/site";

export function Cta() {
  return (
    <section className="relative overflow-hidden pt-10 pb-36">
      <div className="container">
        <div className="grain relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-16 text-center text-white md:px-16 md:py-24" data-reveal="zoom">
          <Image
            alt=""
            className="object-cover opacity-25 mix-blend-luminosity"
            fill
            sizes="100vw"
            src="/media/photos/crab-feast.jpg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-abyss via-navy/70 to-navy/40" />
          <div className="relative">
            <p className="font-script text-4xl text-lime">Hungry yet?</p>
            <h2 className="mx-auto mt-3 max-w-4xl text-[clamp(3rem,8vw,7.5rem)]">
              Fill the freezer this week
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
              Build a box online, or call and tell us what you&apos;re cooking —
              we&apos;ll put it together.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                className="group inline-flex items-center gap-3 rounded-full bg-lime py-2 pr-2 pl-7 font-bold text-abyss uppercase tracking-wide transition hover:bg-white"
                href="/menu"
              >
                Start an order
                <span className="grid size-11 place-items-center rounded-full bg-abyss text-lime transition group-hover:rotate-[-45deg]">
                  <ArrowRight className="size-5" />
                </span>
              </Link>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime"
                href={`tel:${primaryPhone.tel}`}
              >
                <Phone className="size-4" /> Call
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime"
                href={`sms:${primaryPhone.tel}`}
              >
                <MessageCircle className="size-4" /> Text
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
