import { Camera } from "lucide-react";
import Image from "next/image";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { primaryPhone, site } from "@/content/site";

export function BestShot() {
  return (
    <section className="container py-10">
      <div className="relative grid overflow-hidden rounded-[2.5rem] bg-lime md:grid-cols-[1.2fr_1fr]" data-reveal="zoom">
        <div className="relative z-10 p-8 md:p-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-abyss px-4 py-1.5 font-semibold text-lime text-xs uppercase tracking-[0.18em]">
            <Camera className="size-4" /> Send us your best shot
          </span>
          <h2 className="mt-6 text-[clamp(3rem,7vw,6.5rem)] text-abyss">
            10% off <br /> your next order
          </h2>
          <p className="mt-4 max-w-md text-abyss/75 text-lg">
            Cooked something beautiful with your Seafood Guys box? Tag us or
            text us the photo — we love seeing it, and your next order is 10%
            off.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-abyss px-6 py-3.5 font-semibold text-white transition hover:bg-navy"
              href={site.instagram}
              rel="noreferrer"
              target="_blank"
            >
              <InstagramIcon className="size-4" /> Tag @seafoodguysmiami
            </a>
            <a
              className="inline-flex items-center gap-2 rounded-full border-2 border-abyss px-6 py-3 font-semibold text-abyss transition hover:bg-abyss hover:text-lime"
              href={`sms:${primaryPhone.tel}`}
            >
              Text {primaryPhone.display}
            </a>
          </div>
        </div>
        <div className="relative min-h-[360px]">
          <div className="absolute top-10 left-6 w-[58%] rotate-[-8deg] rounded-2xl bg-white p-2 pb-8 shadow-2xl md:top-14">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image alt="Grilled lobster and steak plated with a Seafood Guys flag" className="object-cover" fill sizes="300px" src="/media/photos/surf-turf-plated.jpg" />
            </div>
          </div>
          <div className="absolute top-32 right-6 w-[52%] rotate-[7deg] rounded-2xl bg-white p-2 pb-8 shadow-2xl md:top-40">
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image alt="Whole fried snapper with lime" className="object-cover" fill sizes="300px" src="/media/photos/fried-snapper.jpg" />
            </div>
          </div>
          <span className="absolute right-10 bottom-8 animate-bob font-script text-4xl text-abyss">so good!</span>
        </div>
      </div>
    </section>
  );
}
