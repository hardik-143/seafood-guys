import { MahiMark } from "@/components/ui/logo";

const words = [
  "Mahi Mahi",
  "Lobster Tails",
  "Stone Crab",
  "Grouper",
  "Wagyu",
  "Jumbo Shrimp",
  "Snapper",
  "Filet Mignon",
  "King Crab",
  "Tuna",
  "Corvina",
  "Smoked Fish Dip",
];

function Row({ reverse, dark }: { reverse?: boolean; dark?: boolean }) {
  return (
    <div className={dark ? "bg-abyss text-white" : "bg-lime text-abyss"}>
      <div
        className={`flex w-max items-center gap-8 py-4 ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}
      >
        {[...words, ...words].map((w, i) => (
          <span className="flex items-center gap-8" key={`${w}-${i}`}>
            <span className={`font-display text-4xl uppercase md:text-5xl ${i % 3 === 1 ? `text-outline ${dark ? "" : "[--outline:#0a1433]"}` : ""}`}>
              {w}
            </span>
            <MahiMark className="h-7 w-auto" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function MarqueeBand() {
  return (
    <div aria-hidden className="relative z-10 -my-6 overflow-hidden py-12">
      <div className="-rotate-2 scale-105">
        <Row />
      </div>
      <div className="-mt-3 rotate-1 scale-105">
        <Row dark reverse />
      </div>
    </div>
  );
}
