"use client";

import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";

import { formatPrice } from "@/content/menu";
import { primaryPhone } from "@/content/site";
import { orderSummary, useCart } from "./cart-context";

type Status = "idle" | "sending" | "sent" | "error";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, total, hasUnpriced, clear, add } = useCart();
  const [step, setStep] = useState<"cart" | "details">("cart");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) {
      setStep("cart");
      if (status === "sent") {
        setStatus("idle");
      }
    }
  }, [open, status]);

  const summary = orderSummary(lines);
  const hasShrimp = lines.some((l) => l.id === "shrimp-addon");
  const smsHref = `sms:${primaryPhone.tel}?&body=${encodeURIComponent(
    `Hi Seafood Guys! I'd like to order:\n${summary}`
  )}`;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "order",
          ...Object.fromEntries(form),
          summary,
          total,
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        throw new Error(json.error);
      }
      setStatus("sent");
      clear();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]" data-lenis-prevent>
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Close order"
            className="absolute inset-0 bg-abyss/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            type="button"
          />
          <motion.aside
            animate={{ x: 0 }}
            aria-label="Your order"
            className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-ice shadow-2xl"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 260 }}
          >
            <header className="flex items-center justify-between bg-abyss px-6 py-5 text-white">
              <div>
                <p className="font-script text-2xl text-lime">Your</p>
                <h2 className="-mt-1 text-3xl">
                  {step === "cart" ? "Order" : "Delivery details"}
                </h2>
              </div>
              <button
                aria-label="Close"
                className="grid size-11 place-items-center rounded-full border border-white/20 transition hover:bg-lime hover:text-abyss"
                onClick={() => setOpen(false)}
                type="button"
              >
                <X className="size-5" />
              </button>
            </header>

            {status === "sent" ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid size-20 place-items-center rounded-full bg-lime text-abyss">
                  <Check className="size-10" strokeWidth={3} />
                </span>
                <h3 className="text-4xl text-abyss">Order request sent</h3>
                <p className="text-ink/70">
                  We&apos;ll text you shortly to confirm availability and your
                  free delivery window.
                </p>
                <button
                  className="mt-2 rounded-full bg-abyss px-6 py-3 font-semibold text-white"
                  onClick={() => setOpen(false)}
                  type="button"
                >
                  Keep browsing
                </button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <ShoppingBag className="size-12 text-navy/30" />
                <p className="font-display text-3xl text-abyss uppercase">
                  Cooler&apos;s empty
                </p>
                <p className="text-ink/60">
                  Add a package or case from the menu to get started.
                </p>
              </div>
            ) : step === "cart" ? (
              <>
                <ul className="flex-1 divide-y divide-foam overflow-y-auto px-6">
                  {lines.map((line) => (
                    <li className="flex gap-4 py-5" key={line.key}>
                      <Image
                        alt=""
                        className="size-20 shrink-0 rounded-xl object-cover"
                        height={80}
                        src={line.item.image}
                        width={80}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-abyss leading-tight">
                          {line.item.name}
                        </p>
                        {line.choice && (
                          <p className="text-ink/60 text-sm">{line.choice}</p>
                        )}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-navy/15 bg-white">
                            <button
                              aria-label="Decrease"
                              className="grid size-8 place-items-center"
                              onClick={() => setQty(line.key, line.qty - 1)}
                              type="button"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-6 text-center font-semibold text-sm">
                              {line.qty}
                            </span>
                            <button
                              aria-label="Increase"
                              className="grid size-8 place-items-center"
                              onClick={() => setQty(line.key, line.qty + 1)}
                              type="button"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="font-display text-coral text-xl">
                            {line.item.price === null
                              ? "Call"
                              : `$${line.item.price * line.qty}`}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {!hasShrimp && (
                  <button
                    className="mx-6 mb-3 flex items-center justify-between rounded-2xl border-2 border-lime border-dashed bg-lime/15 px-4 py-3 text-left text-sm"
                    onClick={() => add("shrimp-addon")}
                    type="button"
                  >
                    <span>
                      <b className="text-abyss">Add 2 lbs jumbo wild shrimp</b>
                      <br />
                      <span className="text-ink/60">to any order</span>
                    </span>
                    <span className="rounded-full bg-abyss px-3 py-1 font-semibold text-lime">
                      +{formatPrice(25)}
                    </span>
                  </button>
                )}
                <footer className="border-foam border-t bg-white px-6 py-5">
                  <div className="flex items-end justify-between">
                    <span className="text-ink/60 text-sm">
                      Estimated total{hasUnpriced && " (+ call-for-price items)"}
                    </span>
                    <span className="font-display text-4xl text-abyss">${total}</span>
                  </div>
                  <p className="mt-1 text-ink/50 text-xs">
                    Free delivery · Pay on delivery · We confirm by text
                  </p>
                  <button
                    className="mt-4 w-full rounded-full bg-lime py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-lime-deep"
                    onClick={() => setStep("details")}
                    type="button"
                  >
                    Continue to delivery
                  </button>
                  <a
                    className="mt-2 block text-center text-navy text-sm underline-offset-4 hover:underline"
                    href={smsHref}
                  >
                    or text this order to {primaryPhone.display}
                  </a>
                </footer>
              </>
            ) : (
              <form className="flex flex-1 flex-col overflow-y-auto" onSubmit={submit}>
                <div className="flex-1 space-y-4 px-6 py-6">
                  <Field autoComplete="name" label="Full name" name="name" required />
                  <Field
                    autoComplete="tel"
                    label="Mobile (we text to confirm)"
                    name="phone"
                    required
                    type="tel"
                  />
                  <Field autoComplete="email" label="Email (optional)" name="email" type="email" />
                  <Field
                    autoComplete="street-address"
                    label="Delivery address"
                    name="address"
                    required
                  />
                  <Field label="Preferred delivery date" name="date" type="date" />
                  <label className="block">
                    <span className="mb-1.5 block font-medium text-ink/70 text-sm">
                      Notes
                    </span>
                    <textarea
                      className="w-full rounded-2xl border border-navy/15 bg-white px-4 py-3 outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40"
                      name="message"
                      placeholder="Gate code, office floor, time window…"
                      rows={3}
                    />
                  </label>
                  {status === "error" && (
                    <p className="rounded-xl bg-coral/10 px-4 py-3 text-coral text-sm">
                      {error}
                    </p>
                  )}
                </div>
                <footer className="border-foam border-t bg-white px-6 py-5">
                  <button
                    className="w-full rounded-full bg-abyss py-4 font-bold text-lime uppercase tracking-wide transition hover:bg-navy disabled:opacity-60"
                    disabled={status === "sending"}
                    type="submit"
                  >
                    {status === "sending" ? "Sending…" : `Send order request · $${total}`}
                  </button>
                  <button
                    className="mt-2 w-full text-center text-navy text-sm"
                    onClick={() => setStep("cart")}
                    type="button"
                  >
                    ← Back to order
                  </button>
                </footer>
              </form>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-medium text-ink/70 text-sm">{label}</span>
      <input
        className="w-full rounded-full border border-navy/15 bg-white px-4 py-3 outline-none transition focus:border-navy focus:ring-4 focus:ring-lime/40"
        {...props}
      />
    </label>
  );
}
