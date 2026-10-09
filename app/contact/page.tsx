import { Clock, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { ContactForm } from "@/components/sections/contact-form";
import { Areas, Faq } from "@/components/sections/faq-areas";
import { PageHeader } from "@/components/sections/page-header";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text or message Seafood Guys to order premium seafood with free delivery in Miami and Fort Lauderdale.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/delivery-wynwood.jpg"
        intro="Call, text or drop us a message. Orders, office drops, wholesale or just a question about what's fresh this week."
        kicker="Get in touch"
        title={
          <>
            Holler at <br /> the <span className="text-lime">Guys</span>
          </>
        }
      />

      <section className="container -mt-16 grid gap-6 pb-24 md:grid-cols-3">
        {site.phones.map((p, i) => (
          <article
            className="group relative z-10 overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_30px_60px_-30px_rgba(10,20,51,0.4)]"
            data-reveal
            key={p.tel}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <p className="font-semibold text-mahi text-xs uppercase tracking-[0.18em]">{p.label}</p>
            <a className="mt-2 block font-display text-4xl text-abyss transition group-hover:text-navy" href={`tel:${p.tel}`}>
              {p.display}
            </a>
            <div className="mt-6 flex gap-2">
              <a className="inline-flex items-center gap-2 rounded-full bg-abyss px-4 py-2.5 font-semibold text-sm text-white transition hover:bg-navy" href={`tel:${p.tel}`}>
                <Phone className="size-4" /> Call
              </a>
              <a className="inline-flex items-center gap-2 rounded-full border border-abyss px-4 py-2.5 font-semibold text-abyss text-sm transition hover:bg-lime" href={`sms:${p.tel}`}>
                <MessageCircle className="size-4" /> Text
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="container grid gap-10 pb-24 lg:grid-cols-[1.1fr_1fr]">
        <div className="grain relative overflow-hidden rounded-[2.5rem] bg-abyss p-7 text-white md:p-12" data-reveal="left">
          <p className="font-script text-3xl text-lime">Send a message</p>
          <h2 className="mt-2 mb-8 text-5xl">We text back fast</h2>
          <ContactForm />
        </div>
        <div className="space-y-10" data-reveal="right">
          <div id="areas">
            <h2 className="mb-6 text-5xl text-abyss">Delivery areas</h2>
            <Areas />
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-navy/10 shadow-lg">
            <iframe
              className="h-[320px] w-full grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Miami+to+Fort+Lauderdale,+FL&z=9&output=embed"
              title="Seafood Guys delivery area map"
            />
          </div>
          <p className="flex items-center gap-2 text-ink/60 text-sm">
            <Clock className="size-4 text-mahi" /> Deliveries run on scheduled routes — we text your window the day before.
          </p>
        </div>
      </section>

      <section className="container pb-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-6xl text-abyss" data-reveal>
            FAQ
          </h2>
          <Faq />
        </div>
      </section>
    </>
  );
}
