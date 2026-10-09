"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const WORDS = ["Seafood", "Guys"];

const svg = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600' preserveAspectRatio='none'>${body}</svg>`
  )}")`;

/** Front wave: thin lime crest over translucent mahi water. */
const front = svg(
  "<defs><linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#2fa4d9' stop-opacity='0.55'/><stop offset='1' stop-color='#1a2c5c' stop-opacity='0.35'/></linearGradient></defs>" +
    "<path d='M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40 V600 H0Z' fill='url(#g)'/>" +
    "<path d='M0 40 Q150 10 300 40 T600 40 T900 40 T1200 40' fill='none' stroke='#c9f23a' stroke-width='10'/>"
);
/** Back wave: offset phase, fainter, gives the water depth. */
const back = svg("<path d='M0 25 Q150 55 300 25 T600 25 T900 25 T1200 25 V600 H0Z' fill='#2fa4d9' fill-opacity='0.22'/>");

/**
 * Giant outlined "Seafood Guys" at the foot of every page. Each line slides up
 * out of a mask when it scrolls into view, and water rises inside the letters
 * as you reach the bottom of the page. Outline and water are the same word stacked
 * in one box, so they can't drift apart.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  // Each line is 13vw tall (caps ~0.9–12vw); start the surface just below it and
  // rise until about two-thirds of each word is under water.
  const level = useTransform(scrollYProgress, [0.15, 1], ["13vw", "4.6vw"]);
  // Watch the whole block: each word starts clipped out of its mask, so it can
  // never intersect the viewport on its own.
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <div
      aria-hidden
      // Anton's caps sit ~0.07em below the top of a 1.0 line box; anything under ~0.97
      // clips them inside the overflow-hidden masks.
      className="pointer-events-none select-none pt-[2vw] pb-[1vw] text-center font-display text-[13vw] uppercase leading-none"
      ref={ref}
    >
      {WORDS.map((word, i) => (
        <span className="block overflow-hidden" key={word}>
          <motion.span
            className="relative inline-block"
            animate={{ y: inView ? "0%" : "105%" }}
            initial={{ y: "105%" }}
            transition={{ delay: i * 0.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-outline [--outline:rgba(255,255,255,0.14)]">{word}</span>
            {/* Water layer: same word in the same box. Kept separate because
                background-clip:text swallows -webkit-text-stroke in Chrome. */}
            <motion.span
              className="absolute inset-0 animate-[tide_10s_linear_infinite] bg-clip-text bg-repeat-x text-transparent"
              style={{
                backgroundImage: `${front}, ${back}`,
                backgroundSize: "1200px 20vw, 900px 20vw",
                backgroundPositionY: level,
              }}
            >
              {word}
            </motion.span>
          </motion.span>
        </span>
      ))}
    </div>
  );
}
