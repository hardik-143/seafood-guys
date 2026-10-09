/**
 * Simple home recipes for what we sell. Each links to the menu items it uses
 * so "Add to order" can drop them in the cart. Have the client sanity-check
 * before launch.
 */
export type Recipe = {
  id: string;
  title: string;
  kicker: string;
  category: "Shellfish" | "Fish";
  image: string;
  minutes: number;
  serves: number;
  ingredients: string[];
  steps: string[];
  /** Menu item ids (with an optional choice) this recipe uses. */
  order: { id: string; choice?: string; label: string }[];
};

export const recipes: Recipe[] = [
  {
    id: "lobster-tails",
    title: "Garlic Butter Lobster Tails",
    kicker: "Butterfly & broil",
    category: "Shellfish",
    image: "/media/photos/lobster-tails-baked.jpg",
    minutes: 15,
    serves: 4,
    ingredients: ["4 large lobster tails, thawed", "4 tbsp butter, melted", "3 garlic cloves, grated", "1 tsp paprika", "Salt and pepper", "Lemon wedges and parsley"],
    steps: [
      "Heat the broiler. Cut down the top shell of each tail with kitchen shears.",
      "Lift the meat up to sit on top of the shell.",
      "Mix butter, garlic, paprika, salt and pepper; brush it all over the meat.",
      "Broil about a minute per ounce, until opaque and just firm.",
      "Spoon over any leftover butter, finish with parsley and lemon.",
    ],
    order: [{ id: "tail-large", label: "Large lobster tails" }],
  },
  {
    id: "stone-crab",
    title: "Stone Crab & Mustard Sauce",
    kicker: "The Miami classic",
    category: "Shellfish",
    image: "/media/photos/stone-crab-haul.jpg",
    minutes: 10,
    serves: 2,
    ingredients: ["Stone crab claws, thawed and chilled", "1 cup mayonnaise", "1 tbsp dry mustard", "2 tsp Worcestershire", "1 tsp A1 sauce", "2 tbsp heavy cream", "Pinch of salt", "Lemon wedges"],
    steps: [
      "Whisk the mustard into the mayo until smooth.",
      "Add Worcestershire, A1, cream and salt; whisk until thick and glossy. Chill.",
      "Wrap each claw in a towel and crack the shell with the back of a spoon.",
      "Peel back the shell, keeping the meat on the pincer.",
      "Serve on ice with the sauce and lemon.",
    ],
    order: [{ id: "reef-beef", label: "Reef & Beef box (stone crab + sauce)" }],
  },
  {
    id: "fried-snapper",
    title: "Miami Fried Whole Snapper",
    kicker: "Crispy, head to tail",
    category: "Fish",
    image: "/media/photos/fried-snapper.jpg",
    minutes: 30,
    serves: 2,
    ingredients: ["1 whole snapper, scaled and gutted", "1 cup flour", "1 tbsp adobo or seasoned salt", "1 tsp garlic powder", "Oil for frying", "Limes and tostones to serve"],
    steps: [
      "Pat the fish very dry. Score three cuts on each side down to the bone.",
      "Season inside and out with adobo and garlic powder, then dredge in flour.",
      "Heat 2 inches of oil to 350°F in a wide, deep pan.",
      "Fry 5–7 minutes per side until deep golden and crisp.",
      "Drain, squeeze lime over it and eat with your hands.",
    ],
    order: [{ id: "fish-case", choice: "Snapper", label: "Snapper fish case" }],
  },
  {
    id: "mahi-tacos",
    title: "Blackened Mahi Tacos",
    kicker: "Weeknight hero",
    category: "Fish",
    image: "/media/photos/snapper-fillets.jpg",
    minutes: 20,
    serves: 4,
    ingredients: ["4 mahi mahi portions, thawed", "2 tbsp blackening seasoning", "1 tbsp oil", "8 small tortillas", "Shredded cabbage", "Sour cream mixed with lime and hot sauce", "Avocado and cilantro"],
    steps: [
      "Pat the mahi dry and coat both sides with blackening seasoning.",
      "Sear in a very hot oiled pan, 3–4 minutes per side.",
      "Rest a minute, then flake into big chunks.",
      "Warm the tortillas and pile on cabbage, fish, avocado and lime crema.",
    ],
    order: [{ id: "fish-case", choice: "Mahi mahi", label: "Mahi mahi fish case" }],
  },
  {
    id: "seared-tuna",
    title: "Sesame-Crusted Seared Tuna",
    kicker: "Two minutes in the pan",
    category: "Fish",
    image: "/media/photos/tuna-steak.jpg",
    minutes: 10,
    serves: 2,
    ingredients: ["2 tuna steaks, thawed", "3 tbsp sesame seeds", "Salt and pepper", "1 tbsp neutral oil", "Soy sauce, ginger and scallions to serve"],
    steps: [
      "Pat the tuna dry, season, and press sesame seeds onto all sides.",
      "Get a cast-iron pan smoking hot with the oil.",
      "Sear about 90 seconds per side; the middle stays rare.",
      "Slice against the grain and serve with soy, ginger and scallions.",
    ],
    order: [{ id: "fish-case", choice: "Tuna", label: "Tuna fish case" }],
  },
  {
    id: "garlic-shrimp",
    title: "Garlic Lime Jumbo Shrimp",
    kicker: "Done before the rice",
    category: "Shellfish",
    image: "/media/photos/jumbo-shrimp.jpg",
    minutes: 15,
    serves: 4,
    ingredients: ["2 lbs jumbo shrimp, thawed and peeled", "3 tbsp butter", "5 garlic cloves, sliced", "Pinch of chili flakes", "2 limes", "Cilantro"],
    steps: [
      "Pat the shrimp very dry and season with salt.",
      "Sear in a hot pan in one layer, about 90 seconds per side, then set aside.",
      "Melt butter with garlic and chili flakes until fragrant.",
      "Toss the shrimp back in with lime juice and cilantro.",
    ],
    order: [{ id: "shrimp-addon", label: "2 lb bag jumbo shrimp" }],
  },
];
