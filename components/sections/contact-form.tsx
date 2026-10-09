"use client";

import { Check, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

const field =
  "w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-white placeholder:text-white/40 outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/20";

export function ContactForm({
  defaultTopic = "Home order",
  placeholder = "What are you cooking? Tell us what you need.",
}: {
  defaultTopic?: string;
  placeholder?: string;
} = {}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "contact", ...Object.fromEntries(new FormData(form)) }),
      });
      const json = await res.json();
      if (!json.ok) {
        throw new Error(json.error);
      }
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
        <span className="grid size-20 place-items-center rounded-full bg-lime text-abyss">
          <Check className="size-10" strokeWidth={3} />
        </span>
        <h3 className="text-4xl">Message received</h3>
        <p className="max-w-sm text-white/70">We&apos;ll get back to you shortly — usually by text, same day.</p>
        <button className="mt-2 text-lime underline-offset-4 hover:underline" onClick={() => setStatus("idle")} type="button">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Name</span>
          <input autoComplete="name" className={field} name="name" placeholder="Your name" required />
        </label>
        <label className="block">
          <span className="sr-only">Phone</span>
          <input autoComplete="tel" className={field} name="phone" placeholder="Mobile number" required type="tel" />
        </label>
      </div>
      <label className="block">
        <span className="sr-only">Email</span>
        <input autoComplete="email" className={field} name="email" placeholder="Email (optional)" type="email" />
      </label>
      <label className="block">
        <span className="sr-only">Topic</span>
        <select className={`${field} appearance-none`} defaultValue={defaultTopic} name="topic">
          {["Home order", "Office / corporate order", "Restaurant / wholesale", "Event or party", "Something else"].map((o) => (
            <option className="text-abyss" key={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="sr-only">Message</span>
        <textarea className={field} name="message" placeholder={placeholder} required rows={5} />
      </label>
      {status === "error" && <p className="rounded-xl bg-coral/15 px-4 py-3 text-coral text-sm">{error}</p>}
      <button
        className="flex w-full items-center justify-center gap-2 rounded-full bg-lime py-4 font-bold text-abyss uppercase tracking-wide transition hover:bg-white disabled:opacity-60"
        disabled={status === "sending"}
        type="submit"
      >
        <Send className="size-4" /> {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
