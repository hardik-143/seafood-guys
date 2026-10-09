import type { Metadata } from "next";

import { Cta } from "@/components/sections/cta";
import { PageHeader } from "@/components/sections/page-header";
import { RecipeBook } from "@/components/sections/recipe-book";

export const metadata: Metadata = {
  title: "Seafood Recipes",
  description:
    "Easy recipes for lobster tails, stone crab with mustard sauce, fried whole snapper, mahi tacos, seared tuna and garlic shrimp — and the seafood to make them, delivered free.",
};

export default function RecipesPage() {
  return (
    <>
      <PageHeader
        image="/media/photos/fried-snapper.jpg"
        intro="Six easy wins for what's in your freezer. Tick off ingredients as you go and add the seafood to your order in one tap."
        kicker="Recipes"
        title={
          <>
            What&apos;s for <br /> <span className="text-lime">dinner?</span>
          </>
        }
      />
      <section className="container py-20 md:py-28">
        <RecipeBook />
      </section>
      <Cta />
    </>
  );
}
