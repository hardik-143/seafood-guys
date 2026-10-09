import { BestShot } from "@/components/sections/best-shot";
import { Cta } from "@/components/sections/cta";
import { FamilyWall } from "@/components/sections/family-wall";
import { FaqAreas } from "@/components/sections/faq-areas";
import { FeaturedPackages } from "@/components/sections/featured-packages";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { IntroStats } from "@/components/sections/intro-stats";
import { MarqueeBand } from "@/components/sections/marquee-band";
import { Reels } from "@/components/sections/reels";
import { TheCatch } from "@/components/sections/the-catch";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStats />
      <MarqueeBand />
      <TheCatch />
      <FeaturedPackages />
      <HowItWorks />
      <Reels />
      <FamilyWall />
      <BestShot />
      <FaqAreas />
      <Cta />
    </>
  );
}
