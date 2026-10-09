"use client";

import { ArrowRight, Phone, Snowflake, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Waves } from "@/components/ui/waves";
import { primaryPhone } from "@/content/site";

const OceanScene = dynamic(() => import("@/components/three/ocean-scene"), {
  ssr: false,
});

const lines = [
  { text: "Dock-fresh.", className: "text-white" },
  { text: "Door-", className: "text-lime", script: "delivered." },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-abyss text-white" ref={ref}>
      <OceanScene className="absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-abyss/30 via-transparent to-abyss/80" />

      <motion.div
        className="container flex min-h-[100svh] flex-col justify-end pt-36 pb-28 lg:justify-center lg:pb-20"
        style={{ y, opacity: fade }}
      >
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-medium text-[13px] backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-lime" />
          </span>
          Now delivering across Miami & Ft. Lauderdale
        </motion.p>

        <h1 className="max-w-5xl text-[clamp(3.6rem,11vw,10rem)]">
          {lines.map((line, i) => (
            <span className="block overflow-hidden pb-[0.04em]" key={line.text}>
              <motion.span
                animate={{ y: "0%" }}
                className={`inline-block ${line.className}`}
                initial={{ y: "110%" }}
                transition={{ delay: 0.3 + i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                {line.text}
                {line.script && (
                  <span className="ml-3 align-baseline font-script text-[0.62em] text-white normal-case tracking-normal">
                    {line.script}
                  </span>
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 max-w-xl text-lg text-white/75 leading-relaxed md:text-xl"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.7 }}
        >
          Premium fish, Caribbean lobster tails, stone crab, wild jumbo shrimp
          and prime steaks — portioned, vacuum-sealed and brought to your door
          with <b className="font-semibold text-white">free delivery</b>.
        </motion.p>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 24 }}
          transition={{ delay: 0.85 }}
        >
          <Link
            className="group inline-flex items-center gap-3 rounded-full bg-lime py-2 pr-2 pl-7 font-bold text-abyss uppercase tracking-wide transition hover:bg-white"
            href="/menu"
          >
            Build your box
            <span className="grid size-11 place-items-center rounded-full bg-abyss text-lime transition group-hover:rotate-[-45deg]">
              <ArrowRight className="size-5" />
            </span>
          </Link>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-4 font-semibold transition hover:border-lime hover:text-lime"
            href={`tel:${primaryPhone.tel}`}
          >
            <Phone className="size-4" /> {primaryPhone.display}
          </a>
        </motion.div>

        <motion.ul
          animate={{ opacity: 1 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/70"
          initial={{ opacity: 0 }}
          transition={{ delay: 1.1 }}
        >
          <li className="flex items-center gap-2">
            <Truck className="size-4 text-lime" /> Free delivery
          </li>
          <li className="flex items-center gap-2">
            <Snowflake className="size-4 text-lime" /> Vacuum-sealed & frozen
          </li>
          <li className="flex items-center gap-2">
            <span className="font-display text-lime">10</span> lb fish cases
          </li>
        </motion.ul>
      </motion.div>

      {/* Floating polaroid of a real order */}
      <motion.div
        animate={{ opacity: 1, rotate: 6, scale: 1 }}
        className="absolute right-[6%] bottom-[18%] hidden w-64 rounded-2xl bg-white p-2.5 pb-4 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] xl:block"
        initial={{ opacity: 0, rotate: 18, scale: 0.8 }}
        style={{ y: cardY }}
        transition={{ delay: 1, type: "spring", damping: 14 }}
      >
        <Image
          alt="A packed Seafood Guys box with lobster tails, shrimp and filets"
          className="aspect-square w-full rounded-xl object-cover"
          height={260}
          priority
          src="/media/photos/lobster-tails-baked.jpg"
          width={260}
        />
        <p className="mt-3 px-1 font-script text-2xl text-abyss">Tonight&apos;s dinner ✦</p>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] text-white/50 uppercase tracking-[0.3em] lg:flex">
        Dive in
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-lime to-transparent" />
      </div>

      <Waves className="absolute inset-x-0 -bottom-px h-[60px] text-ice" />
    </section>
  );
}
