import { Gift, PenLine, Truck } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { Cta } from "@/components/sections/cta";
import { GiftBuilder } from "@/components/sections/gift-builder";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Seafood Gift Boxes & Corporate Gifts",
  description:
    "Send lobster tails, stone crab and filet mignon as gifts. Every box has the recipient's name on the lid, delivered free across Miami and Fort Lauderdale.",
};

const steps = [
  { icon: Gift, title: "Pick a box", body: "Choose a package. Same box for everyone, or tell us to mix it up." },
  { icon: PenLine, title: "Send the list", body: "Names, addresses and a note. One gift or a hundred for the whole client list." },
  { icon: Truck, title: "We deliver", body: "Each box labelled by name, delivered free across Miami-Dade and Broward." },
];

export default function GiftsPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/customer-office.jpg"
        intro="Client thank-yous, team treats and holiday gifts that actually get remembered. Every box arrives with their name on the lid."
        kicker="Gift boxes"
        title={
          <>
            Gifts they&apos;ll <br /> <span className="text-lime">actually eat</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <div className="grid gap-5 md:grid-cols-3" data-reveal-group>
          {steps.map(({ icon: Icon, title, body }, i) => (
            <article className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_40px_-30px_rgba(10,20,51,0.4)]" key={title}>
              <span className="absolute -top-3 -right-1 font-display text-[6rem] text-navy/[0.06] leading-none">0{i + 1}</span>
              <Icon className="size-7 text-mahi" />
              <h3 className="mt-5 text-3xl text-abyss">{title}</h3>
              <p className="mt-2 text-ink/65 text-sm">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-ice via-foam to-ice pb-24 md:pb-32" id="build">
        <div className="container">
          <p className="font-script text-3xl text-mahi" data-reveal>
            Build a gift
          </p>
          <h2 className="mt-2 mb-12 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
            See it before they do
          </h2>
          <div data-reveal>
            <GiftBuilder />
          </div>
        </div>
      </section>

      <section className="container grid items-center gap-12 pb-24 lg:grid-cols-2">
        <div className="relative h-[420px] overflow-hidden rounded-[2rem]" data-reveal="left">
          <Image alt="Office team holding named Seafood Guys boxes" className="object-cover" fill sizes="(min-width: 1024px) 45vw, 90vw" src="/media/photos/customer-law-firm.jpg" />
        </div>
        <div data-reveal="right">
          <p className="font-script text-3xl text-mahi">For offices</p>
          <h2 className="mt-2 text-[clamp(2.4rem,4.5vw,4rem)] text-abyss">Law firms, dental offices, whole teams</h2>
          <p className="mt-5 max-w-lg text-ink/70 text-lg">
            We already drop named boxes at offices across South Florida. Send a
            spreadsheet of names and we&apos;ll handle the packing, labels and
            delivery runs.
          </p>
        </div>
      </section>

      <Cta />
    </>
  );
}
