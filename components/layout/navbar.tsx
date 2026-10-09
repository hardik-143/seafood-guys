"use client";

import { Menu, Phone, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCart } from "@/components/order/cart-context";
import { Logo } from "@/components/ui/logo";
import { nav, primaryPhone } from "@/content/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !menuOpen);
  });

  useEffect(() => {
    if (pathname) {
      setMenuOpen(false);
    }
  }, [pathname]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -120 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={cn(
            "overflow-hidden bg-lime text-abyss transition-[height] duration-500",
            scrolled ? "h-0" : "h-8"
          )}
        >
          <div className="flex h-8 w-max animate-marquee items-center gap-10 whitespace-nowrap font-semibold text-[12px] uppercase tracking-[0.14em]">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              [
                "Free delivery · Miami & Ft. Lauderdale",
                "Add 2 lbs jumbo wild shrimp to any order for $25",
                "All fish cases are 10 lbs",
                "Send us your best shot — get 10% off your next order",
              ].map((t) => (
                <span className="flex items-center gap-10" key={`${k}-${t}`}>
                  {t}
                  <span aria-hidden>✦</span>
                </span>
              ))
            )}
          </div>
        </div>

        <div className={cn("transition-all duration-500", scrolled ? "px-3 pt-3" : "px-0 pt-0")}>
          <nav
            className={cn(
              "mx-auto flex items-center justify-between transition-all duration-500",
              scrolled
                ? "max-w-6xl rounded-full border border-white/10 bg-abyss/80 py-2 pr-2 pl-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                : "container py-5"
            )}
          >
            <Link aria-label="Seafood Guys home" href="/">
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      className={cn(
                        "relative rounded-full px-4 py-2 font-medium text-[15px] text-white/80 transition hover:text-white",
                        active && "text-white"
                      )}
                      href={item.href}
                    >
                      {active && (
                        <motion.span
                          className="absolute inset-0 -z-10 rounded-full bg-white/10"
                          layoutId="nav-pill"
                        />
                      )}
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <a
                className="hidden items-center gap-2 rounded-full px-3 py-2 font-medium text-sm text-white/80 transition hover:text-lime md:flex"
                href={`tel:${primaryPhone.tel}`}
              >
                <Phone className="size-4" />
                {primaryPhone.display}
              </a>
              <button
                aria-label={`Open order (${count} items)`}
                className="group relative flex items-center gap-2 rounded-full bg-lime px-4 py-2.5 font-bold text-abyss text-sm uppercase tracking-wide transition hover:bg-white"
                onClick={() => setOpen(true)}
                type="button"
              >
                <ShoppingBag className="size-4 transition group-hover:-rotate-12" />
                <span className="hidden sm:inline">Order</span>
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      animate={{ scale: 1 }}
                      className="grid size-5 place-items-center rounded-full bg-abyss text-[11px] text-lime"
                      exit={{ scale: 0 }}
                      initial={{ scale: 0 }}
                      key={count}
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                aria-expanded={menuOpen}
                aria-label="Menu"
                className="grid size-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
                onClick={() => setMenuOpen((v) => !v)}
                type="button"
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            className="grain fixed inset-0 z-40 flex flex-col justify-between bg-abyss px-6 pt-32 pb-10 lg:hidden"
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="space-y-2">
              {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                <motion.li
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 30 }}
                  key={item.href}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <Link
                    className={cn(
                      "font-display text-6xl text-white uppercase",
                      pathname === item.href && "text-lime"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              className="flex items-center justify-center gap-2 rounded-full border border-lime py-4 font-semibold text-lime"
              href={`tel:${primaryPhone.tel}`}
            >
              <Phone className="size-4" /> Call {primaryPhone.display}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
