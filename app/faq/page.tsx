import { MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

import { FaqExplorer } from "@/components/sections/faq-explorer";
import { PageHeader } from "@/components/sections/page-header";
import { faqGroups } from "@/content/faq";
import { primaryPhone } from "@/content/site";

export const metadata: Metadata = {
  title: "FAQ — Delivery, Ordering & Storage",
  description:
    "Answers on free delivery areas, ordering and payment, packing, storage, thawing and wholesale at Seafood Guys Miami.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqGroups.flatMap((g) =>
    g.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
  ),
};

export default function FaqPage() {
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
      <PageHeader
        image="/media/photos/packed-orders.jpg"
        intro="Delivery, ordering, storage and everything else people text us about."
        kicker="Questions"
        title={
          <>
            Ask the <span className="text-lime">Guys</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <FaqExplorer />
      </section>

      <section className="container pb-32">
        <div className="grain relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[2.5rem] bg-abyss p-8 text-white md:flex-row md:items-center md:p-12" data-reveal="zoom">
          <div>
            <p className="font-script text-3xl text-lime">Still wondering?</p>
            <h2 className="mt-1 text-4xl md:text-5xl">We text back fast</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="inline-flex items-center gap-2 rounded-full bg-lime px-6 py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white" href={`sms:${primaryPhone.tel}`}>
              <MessageCircle className="size-4" /> Text us
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime" href={`tel:${primaryPhone.tel}`}>
              <Phone className="size-4" /> {primaryPhone.display}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
