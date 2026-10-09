import type { Metadata } from "next";
import Link from "next/link";

import { BoxBuilder } from "@/components/sections/box-builder";
import { PageHeader } from "@/components/sections/page-header";

export const metadata: Metadata = {
  title: "Build Your Box",
  description:
    "Mix your own Seafood Guys cooler: 10 lb fish cases, Caribbean lobster tails and jumbo shrimp. See the total as you go, delivered free in Miami and Fort Lauderdale.",
};

export default function BuildPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/cooler-orders.jpg"
        intro="Pick your fish, tails and shrimp and watch the cooler fill up. One tap sends it to your order."
        kicker="Build your box"
        title={
          <>
            Fill the <br /> <span className="text-lime">cooler</span>
          </>
        }
      />
      <section className="container py-20 md:py-28">
        <BoxBuilder />
        <p className="mt-10 text-center text-ink/60">
          Rather start from a ready-made package?{" "}
          <Link className="font-semibold text-abyss underline decoration-lime decoration-2 underline-offset-4" href="/menu">
            See the menu
          </Link>
        </p>
      </section>
    </>
  );
}
