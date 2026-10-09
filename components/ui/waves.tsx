import { cn } from "@/lib/utils";

/**
 * Layered, slowly drifting wave edge used where a dark section meets a light
 * one. Pure SVG + CSS so it renders on the server.
 */
export function Waves({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none overflow-hidden", flip && "rotate-180", className)}>
      <svg className="h-full w-[200%] animate-[marquee_22s_linear_infinite]" preserveAspectRatio="none" viewBox="0 0 2880 60">
        <path
          d="M0 30 Q 180 0 360 30 T 720 30 T 1080 30 T 1440 30 T 1800 30 T 2160 30 T 2520 30 T 2880 30 V60 H0Z"
          fill="currentColor"
          opacity="0.45"
        />
      </svg>
      <svg className="-mt-[60px] h-full w-[200%] animate-[marquee_14s_linear_infinite_reverse]" preserveAspectRatio="none" viewBox="0 0 2880 60">
        <path
          d="M0 40 Q 240 14 480 40 T 960 40 T 1440 40 T 1920 40 T 2400 40 T 2880 40 V60 H0Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
