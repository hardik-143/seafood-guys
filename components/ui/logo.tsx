import { cn } from "@/lib/utils";

/**
 * Vector stand-in for the client's mahi-mahi logo. Swap for the official
 * artwork once the client sends a vector file.
 */
export function MahiMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      viewBox="0 0 120 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mahi-body" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f5fc4" />
          <stop offset="0.38" stopColor="#2fb07a" />
          <stop offset="0.7" stopColor="#c9f23a" />
          <stop offset="1" stopColor="#f2f04a" />
        </linearGradient>
        <linearGradient id="mahi-tail" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#c9f23a" />
          <stop offset="1" stopColor="#ffe14a" />
        </linearGradient>
      </defs>
      <path
        d="M24 10C40 0 72 3 94 25C72 13 46 11 26 13Z"
        fill="#16337a"
        stroke="#0a1433"
        strokeWidth="1.2"
      />
      <path
        d="M97 28L117 7L110 31L118 55L97 35Z"
        fill="url(#mahi-tail)"
        stroke="#0a1433"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M7 34C7 20 15 10 26 9C50 7 78 16 99 28L99 35C78 44 50 50 28 48C16 47 7 42 7 34Z"
        fill="url(#mahi-body)"
        stroke="#0a1433"
        strokeWidth="1.6"
      />
      <path
        d="M36 36C44 33 52 34 58 38C52 42 44 44 38 46Z"
        fill="#2fa36e"
        stroke="#0a1433"
        strokeWidth="1"
      />
      <path d="M7 34C12 36 16 36 20 34" stroke="#0a1433" strokeWidth="1.4" />
      <circle cx="17" cy="26" fill="#0a1433" r="3.2" />
      <circle cx="16" cy="25" fill="#fff" r="1" />
      {[
        [34, 22],
        [44, 28],
        [52, 21],
        [62, 27],
        [70, 23],
        [40, 30],
        [58, 32],
        [76, 29],
        [48, 24],
        [84, 30],
      ].map(([cx, cy]) => (
        <circle cx={cx} cy={cy} fill="#2b6fd6" key={`${cx}-${cy}`} r="1.3" />
      ))}
    </svg>
  );
}

export function Logo({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <MahiMark className="h-9 w-auto shrink-0 drop-shadow-[0_2px_0_rgba(0,0,0,0.25)] md:h-10" />
      <span className="relative flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[19px] tracking-[0.06em] md:text-[21px]",
            tone === "light" ? "text-white" : "text-abyss"
          )}
        >
          SEAFOOD
        </span>
        <span className="-mt-1.5 ml-7 font-script text-[22px] text-lime md:text-[24px]">
          Guys
        </span>
      </span>
    </span>
  );
}
