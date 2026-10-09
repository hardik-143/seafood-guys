"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { type ReactNode, useEffect } from "react";

import { CartProvider } from "@/components/order/cart-context";

const REVEAL_SELECTOR = "[data-reveal],[data-reveal-group]";

/** Smooth scrolling. Disabled for reduced-motion users. */
function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.95 });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

/**
 * Drives `data-reveal` styles in globals.css with one observer for the whole
 * document, so sections can stay server components.
 */
function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach(reveal);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    const scan = () => {
      for (const el of document.querySelectorAll(REVEAL_SELECTOR)) {
        if (!el.hasAttribute("data-revealed")) {
          observer.observe(el);
        }
      }
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SmoothScroll />
      <Reveal />
      {children}
    </CartProvider>
  );
}
