"use client";

import { ArrowUpRight, ChevronDown, Menu, Phone, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useCart } from "@/components/order/cart-context";
import { Logo } from "@/components/ui/logo";
import { nav, primaryPhone } from "@/content/site";
import { cn } from "@/lib/utils";

const specials = [
  { label: "Stone & King Crab", note: "Season's here", href: "/crabs", image: "/media/photos/stone-crab-haul.jpg" },
  { label: "Lobster Tails", note: "Butterfly & broil", href: "/lobster", image: "/media/photos/lobster-tails-baked.jpg" },
  { label: "Boil Planner", note: "How much for 12?", href: "/boil", image: "/media/photos/crab-feast.jpg" },
  { label: "Cook It Right", note: "Guides + timer", href: "/cook", image: "/media/photos/surf-turf-plated.jpg" },
  { label: "Wholesale", note: "Restaurants & stores", href: "/wholesale", image: "/media/photos/warehouse-salmon.jpg" },
];

export function Navbar() {
  const pathname = usePathname();
  const { count, setOpen } = useCart();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [specialsOpen, setSpecialsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 400 && y > prev && !menuOpen && !specialsOpen);
  });

  const closeAll = () => {
    setMenuOpen(false);
    setSpecialsOpen(false);
  };

  const onSpecialsPage = specials.some((s) => s.href === pathname);
  // The gliding pill sits on whatever's hovered, else on the current page.
  const pillOn = hovered ?? (onSpecialsPage ? "specials" : pathname);

  const pill = (id: string) =>
    pillOn === id && (
      <motion.span
        className="absolute inset-0 -z-10 rounded-full bg-white/10"
        layoutId="nav-pill"
        transition={{ type: "spring", damping: 28, stiffness: 380 }}
      />
    );

  const linkClass = (active: boolean) =>
    cn(
      "relative isolate flex items-center gap-1 rounded-full px-4 py-2 font-medium text-[15px] text-white/80 transition hover:text-white",
      active && "text-white"
    );

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
              "relative mx-auto flex items-center justify-between transition-all duration-500",
              scrolled
                ? "max-w-6xl rounded-full border border-white/10 bg-abyss/80 py-2 pr-2 pl-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                : "container py-5"
            )}
          >
            <Link aria-label="Seafood Guys home" href="/" onClick={closeAll}>
              <Logo />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setHovered(null)}>
              {nav.map((item) => (
                <li key={item.href} onMouseEnter={() => setHovered(item.href)}>
                  <Link className={linkClass(pathname === item.href)} href={item.href} onClick={closeAll}>
                    {pill(item.href)}
                    {item.label}
                  </Link>
                </li>
              )).flatMap((li, i) =>
                // Specials sits right after Menu.
                i === 0
                  ? [
                      li,
                      // Not relative: the panel anchors to the whole nav so it stays centred.
                      <li
                        key="specials"
                        onMouseEnter={() => {
                          setHovered("specials");
                          setSpecialsOpen(true);
                        }}
                        onMouseLeave={() => setSpecialsOpen(false)}
                      >
                        <button
                          aria-expanded={specialsOpen}
                          className={linkClass(onSpecialsPage)}
                          onClick={() => setSpecialsOpen((v) => !v)}
                          type="button"
                        >
                          {pill("specials")}
                          Specials
                          <span className="size-1.5 animate-pulse rounded-full bg-coral" />
                          <ChevronDown className={cn("size-4 transition", specialsOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                          {specialsOpen && (
                            <motion.div
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              className="absolute top-full left-1/2 w-[min(860px,92vw)] -translate-x-1/2 pt-4"
                              exit={{ opacity: 0, y: 8, scale: 0.98 }}
                              initial={{ opacity: 0, y: 12, scale: 0.98 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <div className="grain relative grid grid-cols-5 gap-3 overflow-hidden rounded-[2rem] border border-white/10 bg-abyss/95 p-3 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                                {specials.map((s, i) => (
                                  <motion.div
                                    animate={{ opacity: 1, y: 0 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    key={s.href}
                                    transition={{ delay: 0.04 * i }}
                                  >
                                    <Link
                                      className={cn(
                                        "group relative block h-48 overflow-hidden rounded-[1.4rem] ring-2 ring-transparent transition hover:ring-lime",
                                        pathname === s.href && "ring-lime"
                                      )}
                                      href={s.href}
                                      onClick={closeAll}
                                    >
                                      <Image alt="" className="object-cover transition duration-700 group-hover:scale-110" fill sizes="180px" src={s.image} />
                                      <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/30 to-transparent" />
                                      <ArrowUpRight className="absolute top-3 right-3 size-5 text-lime opacity-0 transition group-hover:opacity-100" />
                                      <div className="absolute inset-x-3 bottom-3">
                                        <p className="font-script text-lg text-lime leading-none">{s.note}</p>
                                        <p className="mt-1 font-display text-white text-xl uppercase leading-none">{s.label}</p>
                                      </div>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>,
                    ]
                  : [li]
              )}
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
            className="grain fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-abyss px-6 pt-32 pb-10 lg:hidden"
            data-lenis-prevent
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <ul className="space-y-2">
                {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                  <motion.li
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    key={item.href}
                    transition={{ delay: 0.15 + i * 0.06 }}
                  >
                    <Link
                      className={cn("font-display text-6xl text-white uppercase", pathname === item.href && "text-lime")}
                      href={item.href}
                      onClick={closeAll}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 font-script text-2xl text-lime">Specials</p>
              <div className="-mx-6 mt-3 flex snap-x gap-3 overflow-x-auto px-6 pb-2">
                {specials.map((s, i) => (
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="shrink-0 snap-start"
                    initial={{ opacity: 0, x: 30 }}
                    key={s.href}
                    transition={{ delay: 0.4 + i * 0.06 }}
                  >
                    <Link className="relative block h-36 w-32 overflow-hidden rounded-2xl" href={s.href} onClick={closeAll}>
                      <Image alt="" className="object-cover" fill sizes="128px" src={s.image} />
                      <div className="absolute inset-0 bg-gradient-to-t from-abyss to-transparent" />
                      <p className="absolute inset-x-2 bottom-2 font-display text-lg text-white uppercase leading-none">{s.label}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            <a
              className="mt-8 flex items-center justify-center gap-2 rounded-full border border-lime py-4 font-semibold text-lime"
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
