/** Prices transcribed from the client's "Cases & Packages" menu board. */

export type MenuItem = {
  id: string;
  name: string;
  /** Null means "call for price". */
  price: number | null;
  unit?: string;
  kicker: string;
  blurb: string;
  includes: string[];
  image: string;
  /** Single-choice option the customer picks before adding to the order. */
  choice?: { label: string; options: string[] };
  tag?: string;
};

export const packages: MenuItem[] = [
  {
    id: "sampler",
    name: "Seafood Guys Sampler",
    price: 150,
    kicker: "Best place to start",
    blurb: "A little of everything we're known for — land, sea and the dip.",
    includes: [
      "2 filet mignon",
      "2 wagyu burgers",
      "2 lobster tails",
      "2 mahi portions",
      "2 salmon portions",
      "2 tuna portions",
      "2 snapper fillets",
      "2 lbs jumbo shrimp",
      "1 smoked mahi dip",
    ],
    image: "/media/photos/box-contents.jpg",
    tag: "Most ordered",
  },
  {
    id: "reel-deal",
    name: "Reel Deal",
    price: 175,
    kicker: "For the fish people",
    blurb: "Two dozen portions of Florida's favourite fish, ready for weeknights.",
    includes: [
      "6 mahi mahi portions",
      "6 snapper fillets",
      "6 salmon portions",
      "6 tuna portions",
      "2 lbs jumbo shrimp",
      "1 smoked mahi dip",
    ],
    image: "/media/photos/snapper-fillets.jpg",
  },
  {
    id: "land-sea",
    name: "Land & Sea",
    price: 175,
    kicker: "Surf meets turf",
    blurb: "Pick your beef, we bring the tails, shrimp and dip.",
    includes: [
      "5 lobster tails",
      "2 lbs jumbo shrimp",
      "1 smoked mahi dip",
    ],
    choice: {
      label: "Choice of",
      options: ["5 filet mignon", "4 lbs churrasco"],
    },
    image: "/media/photos/surf-turf-raw.jpg",
  },
  {
    id: "lobster-dinner",
    name: "Lobster Dinner",
    price: 175,
    kicker: "A dozen tails",
    blurb: "Twelve Caribbean lobster tails — dinner party solved.",
    includes: ["12 lobster tails", "2 lbs jumbo shrimp", "1 smoked mahi dip"],
    image: "/media/photos/lobster-tails-baked.jpg",
  },
  {
    id: "reef-beef",
    name: "Reef & Beef",
    price: 200,
    kicker: "Miami in a box",
    blurb: "Stone crab claws with mustard sauce and filet mignon. Peak Florida.",
    includes: [
      "12 medium stone crab mallets + sauce",
      "5 filet mignon",
      "2 lbs jumbo shrimp",
      "1 smoked mahi dip",
    ],
    image: "/media/photos/stone-crab-haul.jpg",
    tag: "Seasonal",
  },
  {
    id: "choice",
    name: "Seafood Guys Choice",
    price: null,
    kicker: "Shellfish lover's box",
    blurb: "Our go-to shellfish bundle. Call or text for this week's price.",
    includes: [
      "2 lb bag jumbo shrimp",
      "2 lb bag scallops",
      "5 premium lobster tails",
      "1 mahi dip",
    ],
    image: "/media/photos/choice-package.jpg",
  },
];

export const cases: MenuItem[] = [
  {
    id: "fish-case",
    name: "Fish Case",
    price: 125,
    unit: "10 lbs",
    kicker: "One species, 10 lbs",
    blurb: "Vacuum-sealed portions of a single fish. Stock the freezer for the month.",
    includes: ["10 lbs portioned & vacuum-sealed", "Single species per case"],
    choice: {
      label: "Fish",
      options: ["Mahi mahi", "Snapper", "Grouper", "Salmon", "Tuna", "Corvina"],
    },
    image: "/media/photos/salmon-case.jpg",
  },
  {
    id: "lobster-case",
    name: "Lobster Case",
    price: 280,
    unit: "10 lbs",
    kicker: "Caribbean tails",
    blurb: "A full case of Caribbean spiny lobster tails, frozen at the dock.",
    includes: ["10 lbs Caribbean lobster tails", "Mixed medium & large"],
    image: "/media/photos/lobster-tails-raw.jpg",
  },
];

export const singles: MenuItem[] = [
  {
    id: "tail-medium",
    name: "Lobster Tail — Medium",
    price: 15,
    unit: "each",
    kicker: "5–6 oz",
    blurb: "Caribbean spiny lobster tail.",
    includes: ["5–6 oz tail"],
    image: "/media/photos/lobster-tail-hand.jpg",
  },
  {
    id: "tail-large",
    name: "Lobster Tail — Large",
    price: 20,
    unit: "each",
    kicker: "7–8 oz",
    blurb: "The big ones. Butterfly and broil.",
    includes: ["7–8 oz tail"],
    image: "/media/photos/florida-lobster.jpg",
  },
  {
    id: "shrimp-addon",
    name: "Jumbo Wild Shrimp",
    price: 25,
    unit: "2 lbs",
    kicker: "Add to any order",
    blurb: "Jumbo wild-caught shrimp. Add 2 lbs to any order for $25.",
    includes: ["2 lbs jumbo wild-caught shrimp"],
    image: "/media/photos/jumbo-shrimp.jpg",
    tag: "Add-on",
  },
];

export const allItems = [...packages, ...cases, ...singles];

export const catchList = [
  {
    name: "Snapper",
    note: "Whole fish or fillets. Fry it whole, Miami style.",
    image: "/media/photos/whole-snapper.jpg",
  },
  {
    name: "Lobster Tails",
    note: "Caribbean spiny tails, medium & large.",
    image: "/media/photos/lobster-tails-raw.jpg",
  },
  {
    name: "Stone Crab",
    note: "Florida's season-only treasure, cracked & ready.",
    image: "/media/photos/stone-crab-haul.jpg",
  },
  {
    name: "Tuna",
    note: "Deep-red loins and steaks for searing or crudo.",
    image: "/media/photos/tuna-portions.jpg",
  },
  {
    name: "Salmon",
    note: "Thick-cut fillets, skin on, portioned.",
    image: "/media/photos/warehouse-salmon.jpg",
  },
  {
    name: "Jumbo Shrimp",
    note: "Wild-caught, by the 2 lb bag.",
    image: "/media/photos/shrimp-bags.jpg",
  },
  {
    name: "Prime Steaks",
    note: "Filet mignon, wagyu, churrasco & tomahawk.",
    image: "/media/photos/tomahawk-board.jpg",
  },
  {
    name: "King Crab",
    note: "Giant legs for the seafood-boil crowd.",
    image: "/media/photos/crab-feast.jpg",
  },
] as const;

export const formatPrice = (price: number | null) =>
  price === null ? "Call" : `$${price}`;
