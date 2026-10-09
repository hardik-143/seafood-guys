import { ArrowUpRight, Mail, Phone } from "lucide-react";
import Link from "next/link";

import { FooterWordmark } from "@/components/layout/footer-wordmark";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Waves } from "@/components/ui/waves";
import { Logo } from "@/components/ui/logo";
import { areas, extraNav, nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative bg-abyss text-white">
      <Waves className="absolute inset-x-0 -top-[59px] h-[60px] text-abyss" />
      <div className="grain relative overflow-hidden">
        <div className="container grid gap-12 pt-20 pb-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-white/65 leading-relaxed">
              {site.description}
            </p>
            <div className="mt-8 flex gap-3">
              <a
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-lime hover:bg-lime hover:text-abyss"
                href={site.instagram}
                rel="noreferrer"
                target="_blank"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                aria-label="Email"
                className="grid size-11 place-items-center rounded-full border border-white/15 transition hover:border-lime hover:bg-lime hover:text-abyss"
                href={`mailto:${site.email}`}
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-lime text-xs uppercase tracking-[0.2em]">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {[{ label: "Home", href: "/" }, ...nav, ...extraNav].map((item) => (
                <li key={item.href}>
                  <Link
                    className="group inline-flex items-center gap-1 text-white/75 transition hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-lime text-xs uppercase tracking-[0.2em]">
              Call or text
            </p>
            <ul className="mt-5 space-y-4">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <span className="block text-white/45 text-xs">{p.label}</span>
                  <a
                    className="inline-flex items-center gap-2 font-medium hover:text-lime"
                    href={`tel:${p.tel}`}
                  >
                    <Phone className="size-3.5" />
                    {p.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="font-semibold text-lime text-xs uppercase tracking-[0.2em]">
              We deliver to
            </p>
            <p className="mt-5 text-sm text-white/65 leading-relaxed">
              {[...areas["Miami-Dade"].slice(0, 8), ...areas.Broward.slice(0, 4)].join(
                " · "
              )}{" "}
              <Link className="text-lime hover:underline" href="/contact#areas">
                & more
              </Link>
            </p>
          </div>
        </div>

        <FooterWordmark />

        <div className="container flex flex-col items-center justify-between gap-3 border-white/10 border-t py-6 text-white/45 text-xs md:flex-row">
          <span>© {site.legalName}. Premium seafood & meats delivered.</span>
          <span>Miami · Fort Lauderdale · Free delivery</span>
        </div>
      </div>
    </footer>
  );
}
