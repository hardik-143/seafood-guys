import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { BackToTop } from "@/components/layout/back-to-top";
import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Logo } from "@/components/ui/logo";
import { Waves } from "@/components/ui/waves";
import { areas, site } from "@/content/site";

const groups = [
  {
    title: "Shop",
    links: [
      { label: "Menu", href: "/menu" },
      { label: "Stone & King Crab", href: "/crabs" },
      { label: "Lobster Tails", href: "/lobster" },
      { label: "Wholesale", href: "/wholesale" },
    ],
  },
  {
    title: "Plan & cook",
    links: [
      { label: "Seafood Boil Planner", href: "/boil" },
      { label: "Cook It Right", href: "/cook" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/our-story" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const promises = ["Free delivery", "Vacuum-sealed & frozen", "10 lb fish cases", "Three generations", "Miami-Dade & Broward"];

const iconButton =
  "grid size-10 place-items-center rounded-full border border-white/15 transition hover:border-lime hover:bg-lime hover:text-abyss";

export function Footer() {
  return (
    <footer className="relative bg-abyss text-white">
      <Waves className="absolute inset-x-0 -top-[59px] h-[60px] text-abyss" />
      <div className="grain relative overflow-hidden">
        {/* Soft lime glow behind the top row */}
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-lime/[0.06] blur-3xl" />

        {/* Brand + phone lines */}
        <div className="container relative grid gap-10 border-white/10 border-b pt-20 pb-14 lg:grid-cols-[1fr_1.4fr] lg:items-end">
          <div>
            <Logo />
            <p className="mt-6 max-w-md text-white/65 leading-relaxed">{site.description}</p>
            <div className="mt-8 flex gap-3">
              <a aria-label="Instagram" className={iconButton} href={site.instagram} rel="noreferrer" target="_blank">
                <InstagramIcon className="size-5" />
              </a>
              <a aria-label="Email" className={iconButton} href={`mailto:${site.email}`}>
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3">
            {site.phones.map((p, i) => (
              <li
                className={`group relative overflow-hidden rounded-3xl border p-5 transition duration-500 hover:-translate-y-1 ${
                  i === 0 ? "border-lime/40 bg-lime/[0.07]" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                }`}
                key={p.tel}
              >
                <p className="font-semibold text-[11px] text-lime uppercase tracking-[0.2em]">{p.label}</p>
                <a className="mt-2 block font-display text-[1.7rem] leading-none transition group-hover:text-lime" href={`tel:${p.tel}`}>
                  {p.display}
                </a>
                <div className="mt-4 flex gap-2">
                  <a aria-label={`Call ${p.label}`} className={iconButton} href={`tel:${p.tel}`}>
                    <Phone className="size-4" />
                  </a>
                  <a aria-label={`Text ${p.label}`} className={iconButton} href={`sms:${p.tel}`}>
                    <MessageCircle className="size-4" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Links + delivery areas */}
        <div className="container relative grid gap-12 py-14 md:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,0.7fr))_1.6fr]">
          {groups.map((g) => (
            <nav aria-label={g.title} key={g.title}>
              <p className="font-semibold text-lime text-xs uppercase tracking-[0.2em]">{g.title}</p>
              <ul className="mt-5 space-y-3">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link className="group inline-flex items-center gap-1.5 text-white/70 transition hover:text-white" href={l.href}>
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-lime transition-all duration-300 group-hover:w-full" />
                      </span>
                      <ArrowUpRight className="size-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3 lg:col-span-1">
            <div className="flex items-center justify-between gap-4">
              <p className="inline-flex items-center gap-2 font-semibold text-lime text-xs uppercase tracking-[0.2em]">
                <MapPin className="size-3.5" /> We deliver to
              </p>
              <span className="relative grid size-20 shrink-0 place-items-center rounded-full bg-lime text-abyss">
                <svg aria-hidden className="absolute inset-0 animate-spin-slow" viewBox="0 0 100 100">
                  <defs>
                    <path d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" id="footer-circle" />
                  </defs>
                  <text className="fill-current font-semibold text-[11px] uppercase tracking-[0.18em]">
                    <textPath href="#footer-circle">Free delivery · Free delivery ·</textPath>
                  </text>
                </svg>
                <span className="font-display text-xl">$0</span>
              </span>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {[...areas["Miami-Dade"], ...areas.Broward].map((a) => (
                <li className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-white/70 text-xs transition hover:border-lime/50 hover:text-white" key={a}>
                  {a}
                </li>
              ))}
              <li>
                <Link className="inline-block rounded-full bg-lime px-3 py-1.5 font-semibold text-abyss text-xs transition hover:bg-white" href="/contact#areas">
                  & more
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Promise strip */}
        <div aria-hidden className="relative overflow-hidden border-white/10 border-y py-4">
          <div className="flex w-max animate-marquee items-center gap-10">
            {[...promises, ...promises, ...promises, ...promises].map((t, i) => (
              <span className="flex items-center gap-10 font-display text-white/55 text-xl uppercase tracking-wide" key={`${t}-${i}`}>
                {t}
                <span className="text-lime">✦</span>
              </span>
            ))}
          </div>
        </div>

        <FooterWordmark />

        <div className="container flex flex-col items-center justify-between gap-4 border-white/10 border-t py-6 text-white/45 text-xs md:flex-row">
          <span>© {site.legalName}. Premium seafood & meats delivered.</span>
          <BackToTop />
          <span>Miami · Fort Lauderdale · Free delivery</span>
        </div>
      </div>
    </footer>
  );
}
