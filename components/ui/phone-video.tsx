"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

/** Portrait video inside a CSS phone frame; plays only while on screen. */
export function PhoneVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string;
  poster: string;
  label?: string;
  className?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) {
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <figure
      className={cn(
        "relative aspect-[9/19] rounded-[2.6rem] bg-[#0b0f1c] p-[10px] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.08)]",
        className
      )}
    >
      {/* Side buttons */}
      <span className="absolute top-28 -left-[3px] h-12 w-[3px] rounded-l bg-[#1c2235]" />
      <span className="absolute top-44 -left-[3px] h-12 w-[3px] rounded-l bg-[#1c2235]" />
      <span className="absolute top-36 -right-[3px] h-16 w-[3px] rounded-r bg-[#1c2235]" />
      <div className="relative h-full overflow-hidden rounded-[2.1rem] bg-abyss">
        <video
          className="h-full w-full object-cover"
          loop
          muted
          playsInline
          poster={poster}
          preload="none"
          ref={video}
          src={src}
        />
        {/* Dynamic island */}
        <span className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        {label && (
          <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-abyss/60 px-3 py-2 font-semibold text-sm text-white backdrop-blur">
            {label}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
