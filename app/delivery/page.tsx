import { Clock, MessageCircle, ShoppingBag, Snowflake } from "lucide-react";
import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { ZoneChecker } from "@/components/sections/zone-checker";

export const metadata: Metadata = {
  title: "Delivery Areas — Free Seafood Delivery",
  description:
    "Check if Seafood Guys delivers to you. Free delivery across Miami-Dade and Broward: Brickell, Miami Beach, Coral Gables, Fort Lauderdale, Weston and more.",
};

const timeline = [
  { icon: ShoppingBag, title: "You order", body: "Online, by text or a call." },
  { icon: MessageCircle, title: "We confirm", body: "We text to confirm what's in stock." },
  { icon: Clock, title: "Day before", body: "You get a delivery window by text." },
  { icon: Snowflake, title: "At your door", body: "Iced cooler, your name on the lid. Free." },
];

export default function DeliveryPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/delivery-wynwood.jpg"
        intro="Free delivery on every order across Miami-Dade and Broward. Check your spot."
        kicker="Delivery"
        title={
          <>
            Do we come <br /> <span className="text-lime">to you?</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <ZoneChecker />
      </section>

      <section className="grain relative bg-abyss py-24 text-white md:py-32">
        <div className="container">
          <p className="font-script text-3xl text-lime" data-reveal>
            How delivery works
          </p>
          <h2 className="mt-2 max-w-3xl text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
            Order to freezer
          </h2>
          <ol className="relative mt-14 grid gap-8 md:grid-cols-4" data-reveal-group>
            <span aria-hidden className="absolute top-7 right-[12%] left-[12%] hidden h-px border-white/20 border-t border-dashed md:block" />
            {timeline.map(({ icon: Icon, title, body }) => (
              <li className="relative text-center" key={title}>
                <span className="relative mx-auto grid size-14 place-items-center rounded-full bg-lime text-abyss ring-8 ring-abyss">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-5 text-2xl">{title}</h3>
                <p className="mt-1 text-sm text-white/65">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Cta />
    </>
  );
}
