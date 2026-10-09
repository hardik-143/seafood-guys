"use client";

import { Check, Gift, Send } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { type FormEvent, useState } from "react";

import { formatPrice, packages } from "@/content/menu";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/20";

const giftable = packages.filter((p) => ["sampler", "lobster-dinner", "reef-beef", "land-sea"].includes(p.id));

export function GiftBuilder() {
  const [boxId, setBoxId] = useState(giftable[0].id);
  const [recipient, setRecipient] = useState("");
  const [note, setNote] = useState("");
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const box = giftable.find((b) => b.id === boxId) ?? giftable[0];

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          topic: "Gift boxes",
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          message: [
            `Box: ${box.name} (${formatPrice(box.price)})`,
            `Number of boxes: ${count}`,
            recipient && `First recipient: ${recipient}`,
            note && `Gift note: ${note}`,
            data.details && `Recipients / addresses: ${data.details}`,
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        throw new Error(json.error);
      }
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      {/* Live preview: lid with the recipient's name + swinging gift tag */}
      <div className="relative lg:sticky lg:top-28 lg:self-start">
        <div className="relative mx-auto aspect-[4/3] max-w-lg">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl">
            <Image alt={box.name} className="object-cover" fill sizes="(min-width: 1024px) 40vw, 90vw" src={box.image} />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/80 via-abyss/20 to-transparent" />
          </div>
          {/* Lid label */}
          <div className="absolute inset-x-[12%] bottom-[10%] rotate-[-3deg] rounded-2xl bg-white px-6 py-4 shadow-xl">
            <p className="font-semibold text-[10px] text-mahi uppercase tracking-[0.2em]">Packed for</p>
            <AnimatePresence mode="wait">
              <motion.p
                animate={{ opacity: 1, y: 0 }}
                className="truncate font-script text-4xl text-abyss"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
                key={recipient || "placeholder"}
                transition={{ duration: 0.2 }}
              >
                {recipient || "Their Name"}
              </motion.p>
            </AnimatePresence>
            <p className="mt-1 font-display text-abyss/70 text-sm uppercase">{box.name}</p>
          </div>
          {/* Gift tag on a string */}
          <motion.div
            animate={{ rotate: [6, -4, 6] }}
            className="absolute -top-6 right-4 w-44 origin-top"
            transition={{ duration: 4, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
          >
            <span className="mx-auto block h-8 w-px bg-white/60" />
            <div className="relative rounded-xl bg-lime p-4 pt-5 text-abyss shadow-xl">
              <span className="absolute top-2 left-1/2 size-2.5 -translate-x-1/2 rounded-full bg-abyss/80" />
              <Gift className="size-4" />
              <p className="mt-1 line-clamp-4 font-script text-xl leading-tight">{note || "Enjoy the good stuff!"}</p>
            </div>
          </motion.div>
        </div>
        <p className="mt-6 text-center text-ink/60 text-sm">
          {count} × {box.name} · {box.price ? `${formatPrice(box.price * count)} total` : "price by text"} · free delivery
        </p>
      </div>

      {/* Form */}
      <div className="grain relative overflow-hidden rounded-[2rem] bg-abyss p-6 text-white md:p-10">
        {status === "sent" ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
            <span className="grid size-20 place-items-center rounded-full bg-lime text-abyss">
              <Check className="size-10" strokeWidth={3} />
            </span>
            <h3 className="text-4xl">Gift request in</h3>
            <p className="max-w-sm text-white/70">We&apos;ll text to confirm boxes, addresses and the delivery day.</p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={submit}>
            <div>
              <p className="mb-3 font-semibold text-lime text-xs uppercase tracking-[0.2em]">1 · Pick a box</p>
              <div className="grid grid-cols-2 gap-2">
                {giftable.map((b) => (
                  <button
                    className={cn(
                      "relative isolate rounded-2xl border p-3 text-left transition",
                      b.id === boxId ? "border-lime text-abyss" : "border-white/15 hover:border-white/40"
                    )}
                    key={b.id}
                    onClick={() => setBoxId(b.id)}
                    type="button"
                  >
                    {b.id === boxId && (
                      <motion.span className="absolute inset-0 -z-10 rounded-2xl bg-lime" layoutId="gift-box" transition={{ type: "spring", damping: 26, stiffness: 300 }} />
                    )}
                    <span className="block font-display text-xl uppercase leading-none">{b.name}</span>
                    <span className={cn("mt-1 block text-xs", b.id === boxId ? "text-abyss/70" : "text-white/55")}>
                      {formatPrice(b.price)} · {b.kicker}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 font-semibold text-lime text-xs uppercase tracking-[0.2em]">2 · Who&apos;s it for</p>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  className={field}
                  maxLength={28}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="Name for the lid (first recipient)"
                  value={recipient}
                />
                <label className="flex items-center gap-3 rounded-2xl border border-white/15 px-4">
                  <span className="text-sm text-white/60">Boxes</span>
                  <input
                    className="w-16 bg-transparent py-3 text-center font-display text-2xl outline-none"
                    max={500}
                    min={1}
                    onChange={(e) => setCount(Math.max(1, Number(e.target.value) || 1))}
                    type="number"
                    value={count}
                  />
                </label>
              </div>
              <textarea
                className={`${field} mt-3`}
                maxLength={140}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Gift note (goes on the tag)"
                rows={2}
                value={note}
              />
              {count > 1 && (
                <textarea
                  className={`${field} mt-3`}
                  name="details"
                  placeholder="Other recipients: names and delivery addresses (or say you'll send a list)"
                  rows={3}
                />
              )}
            </div>

            <div>
              <p className="mb-3 font-semibold text-lime text-xs uppercase tracking-[0.2em]">3 · Your details</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input autoComplete="name" className={field} name="name" placeholder="Your name" required />
                <input autoComplete="tel" className={field} name="phone" placeholder="Mobile number" required type="tel" />
                <input autoComplete="email" className={field} name="email" placeholder="Email (optional)" type="email" />
                <input aria-label="Preferred delivery date" className={field} name="date" type="date" />
              </div>
            </div>

            {status === "error" && <p className="rounded-xl bg-coral/15 px-4 py-3 text-coral text-sm">{error}</p>}
            <button
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white disabled:opacity-60"
              disabled={status === "sending"}
              type="submit"
            >
              <Send className="size-4" /> {status === "sending" ? "Sending…" : "Request gift boxes"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
