"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { InstagramIcon } from "@/components/ui/instagram-icon";
import { PhoneVideo } from "@/components/ui/phone-video";
import { Waves } from "@/components/ui/waves";
import { videos } from "@/content/gallery";
import { site } from "@/content/site";

export function Reels() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const down = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const [a, b, c] = [videos[1], videos[0], videos[2]];

  return (
    <section className="grain relative overflow-hidden bg-abyss py-28 text-white md:py-40" ref={ref}>
      <Waves className="absolute inset-x-0 -top-px h-[60px] text-ice" flip />
      <div aria-hidden className="absolute top-1/3 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-mahi/20 blur-[140px]" />

      <div className="container relative grid items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-script text-3xl text-lime" data-reveal>
            Straight from the source
          </p>
          <h2 className="mt-2 text-[clamp(2.8rem,6vw,5.4rem)]" data-reveal>
            Still kicking <br />
            <span className="text-outline">when it lands</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-white/70" data-reveal>
            Live spiny lobster on ice, stone crab claws cracked to order, king
            crab by the box. Follow along for what just came in.
          </p>
          <a
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/10 px-6 py-3.5 font-semibold backdrop-blur transition hover:bg-lime hover:text-abyss"
            data-reveal
            href={site.instagram}
            rel="noreferrer"
            target="_blank"
          >
            <InstagramIcon className="size-5" /> Follow @seafoodguysmiami
          </a>
        </div>

        <div className="relative flex items-start justify-center gap-4 md:gap-6">
          <motion.div className="hidden w-[30%] sm:block" style={{ y: down }}>
            <PhoneVideo label={a.label} poster={a.poster} src={a.src} />
          </motion.div>
          <motion.div className="w-[62%] sm:w-[36%]" style={{ y: up }}>
            <PhoneVideo label={b.label} poster={b.poster} src={b.src} />
          </motion.div>
          <motion.div className="hidden w-[30%] sm:block" style={{ y: down }}>
            <PhoneVideo label={c.label} poster={c.poster} src={c.src} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
