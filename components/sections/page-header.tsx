import Image from "next/image";
import type { ReactNode } from "react";

import { Waves } from "@/components/ui/waves";

export function PageHeader({
  kicker,
  title,
  intro,
  image,
  children,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-abyss pt-44 pb-28 text-white md:pt-52 md:pb-36">
      <Image alt="" className="-z-20 object-cover opacity-30" fill priority sizes="100vw" src={image} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-abyss via-abyss/85 to-navy/60" />
      <div className="container">
        <p className="font-script text-3xl text-lime" data-reveal>
          {kicker}
        </p>
        <h1 className="mt-3 max-w-5xl text-[clamp(3.4rem,9vw,8.5rem)]" data-reveal>
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg text-white/75 md:text-xl" data-reveal>
            {intro}
          </p>
        )}
        {children}
      </div>
      <Waves className="absolute inset-x-0 -bottom-px h-[60px] text-ice" />
    </section>
  );
}
