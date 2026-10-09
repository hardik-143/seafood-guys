import { Camera, MessageCircle, Percent } from "lucide-react";
import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { type Polaroid, PolaroidWall } from "@/components/sections/polaroid-wall";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { photos } from "@/content/gallery";
import { primaryPhone, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Wall of Fame — Seafood Guys Customers",
  description:
    "Offices, chefs and families across Miami and Fort Lauderdale with their Seafood Guys boxes. Send us your best shot and get 10% off your next order.",
};

/** Short handwritten captions for the customer shots. */
const captions: Record<string, string> = {
  "customer-law-firm": "Law firm lunch",
  "customer-restaurant": "Kitchen restock",
  "customer-street": "Crab legs, check",
  "customer-desk": "Desk delivery",
  "customer-office": "Office drop",
  "customer-porch": "Two coolers deep",
  "wagyu-event": "Event night",
  "tomahawk-crew": "Tomahawk twins",
  "customer-haul": "The haul",
  "customer-steak-box": "Unboxing day",
};

const wall: Polaroid[] = photos
  .filter((p) => p.tag === "Customers")
  .map((p) => {
    const key = p.src.split("/").pop()?.replace(".jpg", "") ?? "";
    return { src: p.src, alt: p.alt, caption: captions[key] ?? "Seafood Guys" };
  });

const steps = [
  { icon: Camera, title: "Snap your box", body: "Unboxing, plated, on the grill. The better it looks, the better." },
  { icon: InstagramIcon, title: "Send it over", body: "Tag @seafoodguysmiami on Instagram or text it to the order line." },
  { icon: Percent, title: "Get 10% off", body: "We'll take 10% off your next order and might put you on this wall." },
];

export default function ReviewsPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/customer-steak-box.jpg"
        intro="Law firms, kitchens, porches and parties. The best review is a photo of the box."
        kicker="Wall of fame"
        title={
          <>
            The <span className="text-lime">family</span> <br /> photo album
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-3xl text-mahi" data-reveal>
              #SeafoodGuysFamily
            </p>
            <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)] text-abyss" data-reveal>
              Real boxes, real people
            </h2>
          </div>
          <p className="hidden rounded-full bg-abyss px-4 py-2 font-semibold text-lime text-xs uppercase tracking-[0.2em] lg:block">
            Drag the photos around
          </p>
        </div>
        <div className="mt-12">
          <PolaroidWall items={wall} />
        </div>
      </section>

      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container">
          <p className="font-script text-3xl text-lime" data-reveal>
            Send us your best shot
          </p>
          <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
            Get 10% off your next order
          </h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3" data-reveal-group>
            {steps.map(({ icon: Icon, title, body }, i) => (
              <li className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6" key={title}>
                <span className="absolute -top-4 -right-1 font-display text-[6rem] text-white/[0.05] leading-none">0{i + 1}</span>
                <span className="grid size-12 place-items-center rounded-2xl bg-lime text-abyss">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 text-3xl">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3" data-reveal>
            <a className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white" href={site.instagram} rel="noreferrer" target="_blank">
              <InstagramIcon className="size-4" /> Tag us on Instagram
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime" href={`sms:${primaryPhone.tel}?&body=${encodeURIComponent("Here's my Seafood Guys best shot!")}`}>
              <MessageCircle className="size-4" /> Text your photo
            </a>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
