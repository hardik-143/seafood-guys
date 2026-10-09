/**
 * Thaw & cook guidance for the cook page. General home-cooking times —
 * have the client sanity-check before launch.
 */
export type CookGuide = {
  id: string;
  name: string;
  image: string;
  method: string;
  heat: string;
  /** Minutes for the kitchen timer; null when there's nothing to time. */
  minutes: number | null;
  timerLabel: string;
  done: string;
  steps: string[];
  tip: string;
};

export const thawing = [
  { title: "Overnight in the fridge", body: "Best texture. Move it from freezer to fridge the night before, still sealed." },
  { title: "Cold water, ~30 min", body: "In a hurry? Keep it in the sealed bag and submerge in cold water. Change the water if it warms." },
  { title: "Never on the counter", body: "And never hot water. Thaw cold, cook hot." },
];

export const guides: CookGuide[] = [
  {
    id: "lobster",
    name: "Lobster Tails",
    image: "/media/photos/lobster-tails-baked.jpg",
    method: "Butterfly & broil",
    heat: "High broil",
    minutes: 6,
    timerLabel: "Broil a medium tail",
    done: "Meat is opaque and just firm",
    steps: [
      "Thaw, then cut down the top shell with kitchen shears.",
      "Lift the meat to sit on top of the shell.",
      "Brush with garlic butter, season with salt and paprika.",
      "Broil about a minute per ounce. Rest one minute.",
    ],
    tip: "Large 7–8 oz tails need closer to 8 minutes.",
  },
  {
    id: "stone-crab",
    name: "Stone Crab",
    image: "/media/photos/stone-crab-haul.jpg",
    method: "Crack & serve cold",
    heat: "No cooking",
    minutes: null,
    timerLabel: "",
    done: "Already cooked, serve chilled",
    steps: [
      "Thaw overnight in the fridge.",
      "Lay a claw in a towel and tap firmly with the back of a spoon or mallet.",
      "Peel away the shell, keeping the meat on the pincer.",
      "Serve on ice with mustard sauce and lemon.",
    ],
    tip: "Crack on three sides of the knuckle and the shell lifts away in big pieces.",
  },
  {
    id: "king-crab",
    name: "King Crab",
    image: "/media/photos/crab-feast.jpg",
    method: "Steam to warm",
    heat: "Rolling steam",
    minutes: 6,
    timerLabel: "Steam thawed legs",
    done: "Hot all the way through",
    steps: [
      "Thaw overnight in the fridge.",
      "Bring an inch of water to a boil under a steamer basket.",
      "Steam the legs with the lid on until heated through.",
      "Split with shears and serve with melted butter.",
    ],
    tip: "It's already cooked — you're just warming it. Overcooking dries it out.",
  },
  {
    id: "shrimp",
    name: "Jumbo Shrimp",
    image: "/media/photos/jumbo-shrimp.jpg",
    method: "Sauté or boil",
    heat: "Medium-high",
    minutes: 3,
    timerLabel: "Sauté thawed shrimp",
    done: "Pink and curled into a C",
    steps: [
      "Thaw in cold water, then pat very dry.",
      "Hot pan, splash of oil, single layer.",
      "Cook about a minute and a half per side.",
      "Finish with butter, garlic and lime.",
    ],
    tip: "C means cooked, O means overcooked.",
  },
  {
    id: "salmon",
    name: "Salmon",
    image: "/media/photos/salmon-plated.jpg",
    method: "Roast",
    heat: "400°F oven",
    minutes: 12,
    timerLabel: "Roast a fillet",
    done: "Flakes easily, 145°F",
    steps: [
      "Thaw overnight and pat dry.",
      "Skin side down on a lined tray, oil, salt and pepper.",
      "Roast until it just flakes in the thickest part.",
      "Rest two minutes before serving.",
    ],
    tip: "Pull it a minute early if you like it silky in the middle.",
  },
  {
    id: "tuna",
    name: "Tuna Steak",
    image: "/media/photos/tuna-steak.jpg",
    method: "Hard sear",
    heat: "Smoking-hot pan",
    minutes: 3,
    timerLabel: "Sear both sides",
    done: "Crust outside, rare centre",
    steps: [
      "Thaw, pat dry, season generously.",
      "Get a cast-iron pan smoking hot with a little oil.",
      "Sear about 90 seconds per side.",
      "Slice against the grain and serve right away.",
    ],
    tip: "Press sesame seeds onto the sides before searing for crunch.",
  },
  {
    id: "white-fish",
    name: "Mahi & Snapper",
    image: "/media/photos/snapper-fillets.jpg",
    method: "Pan-sear",
    heat: "Medium-high",
    minutes: 7,
    timerLabel: "Sear a fillet",
    done: "Opaque and flakes, 145°F",
    steps: [
      "Thaw, pat dry, season with salt and lime zest.",
      "Oil a hot pan and lay the fillet in, presentation side down.",
      "Leave it alone 3–4 minutes, flip, 3 more.",
      "Baste with butter for the last minute.",
    ],
    tip: "If it sticks, it isn't ready to flip yet.",
  },
  {
    id: "filet",
    name: "Filet Mignon",
    image: "/media/photos/filet-mignon.jpg",
    method: "Sear & rest",
    heat: "High, then rest",
    minutes: 8,
    timerLabel: "Sear for medium-rare",
    done: "130°F for medium-rare",
    steps: [
      "Thaw overnight, then sit at room temp for 30 minutes.",
      "Season hard with salt and pepper.",
      "Sear about 4 minutes per side in a very hot pan.",
      "Rest 5 minutes before cutting.",
    ],
    tip: "Add butter, garlic and thyme for the last two minutes and spoon it over.",
  },
];
