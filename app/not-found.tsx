import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";

import { MahiMark } from "@/components/ui/logo";
import { Waves } from "@/components/ui/waves";
import { primaryPhone, site } from "@/content/site";

const lifelines = [
  { label: "Menu", href: "/menu" },
  { label: "Build your box", href: "/build" },
  { label: "Stone crab", href: "/crabs" },
  { label: "Boil planner", href: "/boil" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col bg-abyss text-white">
      <section className="grain relative flex flex-1 items-center overflow-hidden pt-36 pb-28">
        <div className="container text-center">
          <MahiMark className="mx-auto h-24 w-auto animate-bob" />
          <h1 className="mt-6 text-[clamp(5rem,18vw,14rem)] text-lime">404</h1>
          <p className="font-script text-4xl">This one got away.</p>
          <p className="mx-auto mt-4 max-w-md text-white/70">
            The page you&apos;re fishing for isn&apos;t here. Head back to shore.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link className="rounded-full bg-lime px-6 py-3.5 font-bold text-abyss uppercase tracking-wide transition hover:bg-white" href="/">
              Home
            </Link>
            <Link className="rounded-full border border-white/30 px-6 py-3.5 font-semibold transition hover:border-lime hover:text-lime" href="/menu">
              See the menu
            </Link>
          </div>
        </div>
      </section>

      {/* Minimal footer; globals.css hides the full site footer when this is on the page. */}
      <footer className="relative bg-navy" data-minimal-footer>
        <Waves className="absolute inset-x-0 -top-[59px] h-[60px] text-navy" />
        {/* A mahi swimming across the waterline, on loop */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-10 h-10 overflow-hidden">
          <div className="absolute top-2 left-0 animate-swim">
            <MahiMark className="h-7 w-auto -scale-x-100" />
          </div>
        </div>

        <div className="container relative py-10">
          <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
            <p className="font-script text-2xl text-lime">Lost at sea? Try these</p>
            <ul className="flex flex-wrap justify-center gap-2">
              {lifelines.map((l) => (
                <li key={l.href}>
                  <Link
                    className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-semibold text-sm text-white/80 transition hover:border-lime hover:bg-lime hover:text-abyss"
                    href={l.href}
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5 opacity-50 transition group-hover:rotate-45 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-white/10 border-t pt-6 text-white/45 text-xs md:flex-row">
            <span>© {site.legalName}</span>
            <a className="inline-flex items-center gap-2 font-semibold text-white/70 transition hover:text-lime" href={`tel:${primaryPhone.tel}`}>
              <Phone className="size-3.5" /> {primaryPhone.display}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
