import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { PackageCard } from "@/components/order/package-card";
import { packages } from "@/content/menu";

export function FeaturedPackages() {
  const featured = packages.filter((p) => ["sampler", "land-sea", "reef-beef"].includes(p.id));

  return (
    <section className="relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-script text-3xl text-mahi" data-reveal>
              Packages
            </p>
            <h2 className="mt-2 text-[clamp(2.8rem,6vw,5.4rem)] text-abyss" data-reveal>
              Dinner&apos;s already <span className="text-coral">sorted</span>
            </h2>
            <p className="mt-4 text-ink/65 text-lg" data-reveal>
              Curated boxes that mix fish, shellfish and steaks. Every package
              comes with jumbo shrimp and our smoked mahi dip.
            </p>
          </div>
          <Link
            className="group inline-flex items-center gap-2 rounded-full border-2 border-abyss px-6 py-3 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-abyss hover:text-lime"
            data-reveal
            href="/menu"
          >
            All packages & cases
            <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3" data-reveal-group>
          {featured.map((item) => (
            <PackageCard compact item={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
