import Link from "next/link";

import { MahiMark } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[90vh] items-center overflow-hidden bg-abyss pt-32 pb-24 text-white">
      <div className="container text-center">
        <MahiMark className="mx-auto h-24 w-auto animate-bob" />
        <h1 className="mt-6 text-[clamp(5rem,18vw,14rem)] text-lime">404</h1>
        <p className="font-script text-4xl">This one got away.</p>
        <p className="mx-auto mt-4 max-w-md text-white/70">
          The page you&apos;re fishing for isn&apos;t here. Head back to shore.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link className="rounded-full bg-lime px-6 py-3.5 font-bold text-abyss uppercase tracking-wide" href="/">
            Home
          </Link>
          <Link className="rounded-full border border-white/30 px-6 py-3.5 font-semibold" href="/menu">
            See the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
