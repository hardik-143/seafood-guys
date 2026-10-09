import type { Metadata } from "next";

import { BestShot } from "@/components/sections/best-shot";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHeader } from "@/components/sections/page-header";
import { PhoneVideo } from "@/components/ui/phone-video";
import { videos } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Real Seafood Guys deliveries, customers and dinners from across Miami and Fort Lauderdale.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/crab-feast.jpg"
        intro="Real boxes, real customers, real dinners. No stock photos in this cooler."
        kicker="The gallery"
        title={
          <>
            Fresh <span className="text-lime">catches</span>
          </>
        }
      />

      <section className="container py-20 md:py-28">
        <GalleryGrid />
      </section>

      <section className="grain relative overflow-hidden bg-abyss py-24 text-white md:py-32">
        <div className="container">
          <p className="font-script text-3xl text-lime" data-reveal>
            Reels
          </p>
          <h2 className="mt-2 text-[clamp(2.6rem,5vw,4.6rem)]" data-reveal>
            Watch it come in
          </h2>
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-6 [scrollbar-width:none] xl:px-[max(1.25rem,calc((100vw-1320px)/2+2.5rem))]">
          {videos.map((v) => (
            <div className="w-[240px] shrink-0 snap-center" key={v.src}>
              <PhoneVideo label={v.label} poster={v.poster} src={v.src} />
            </div>
          ))}
        </div>
      </section>

      <div className="py-16">
        <BestShot />
      </div>
    </>
  );
}
