export type Photo = {
  src: string;
  alt: string;
  w: number;
  h: number;
  tag: "Customers" | "The Catch" | "Plated" | "Behind the scenes";
};

const p = (
  name: string,
  alt: string,
  w: number,
  h: number,
  tag: Photo["tag"]
): Photo => ({ src: `/media/photos/${name}.jpg`, alt, w, h, tag });

export const photos: Photo[] = [
  p("customer-law-firm", "Customer holding a Seafood Guys box in a law office lobby", 1800, 1350, "Customers"),
  p("lobster-tails-baked", "Tray of baked Caribbean lobster tails with herb butter", 1800, 1350, "Plated"),
  p("team-hq", "The Seafood Guys team packing orders under the logo", 1800, 1789, "Behind the scenes"),
  p("tuna-portions", "Seared tuna portions on skewers", 830, 832, "The Catch"),
  p("customer-restaurant", "Restaurant staff with a bag of fresh seafood", 1709, 1800, "Customers"),
  p("crab-feast", "Chef with a spread of king crab legs, shrimp and corn", 1715, 1800, "Plated"),
  p("warehouse-salmon", "Holding two whole salmon sides in the warehouse", 1800, 1350, "Behind the scenes"),
  p("surf-turf-plated", "Grilled lobster tail and steak with a Seafood Guys flag", 1800, 1761, "Plated"),
  p("delivery-wynwood", "Delivering a cart of boxes past a Wynwood mural", 1800, 1350, "Behind the scenes"),
  p("filet-mignon", "Vacuum-sealed filet mignon portions", 1800, 1350, "The Catch"),
  p("customer-street", "Customer holding up a bag of crab legs and a cooler", 830, 1100, "Customers"),
  p("fried-snapper", "Whole fried snapper with lime", 1800, 1350, "Plated"),
  p("lobster-tails-raw", "Rows of raw Caribbean lobster tails", 1707, 1800, "The Catch"),
  p("customer-desk", "Customer at her desk with a named Seafood Guys box", 1800, 1350, "Customers"),
  p("tomahawk-board", "Tomahawk ribeye with heirloom carrots", 1012, 1800, "Plated"),
  p("packed-orders", "Named boxes and scallops packed for delivery", 1800, 1350, "Behind the scenes"),
  p("customer-office", "Customer smiling with his box at the office", 1800, 1350, "Customers"),
  p("tuna-loin", "A thick-cut deep red tuna loin", 830, 1100, "The Catch"),
  p("fish-dip-boat", "Smoked fish dip on a boat on the Miami River", 1800, 1350, "Plated"),
  p("crew-night-delivery", "Two of the crew with boxes of steaks and shrimp", 1800, 1350, "Behind the scenes"),
  p("customer-porch", "Customer with two coolers on her porch", 830, 1108, "Customers"),
  p("whole-snapper", "Three whole red snapper on a platter", 1800, 1096, "The Catch"),
  p("wagyu-event", "Holding a wagyu cut at a catering event", 1350, 1800, "Customers"),
  p("salmon-plated", "Seared salmon fillet with wine", 1800, 1341, "Plated"),
  p("tomahawk-crew", "Two customers each holding a tomahawk steak", 1139, 1800, "Customers"),
  p("shrimp-bags", "Stacked bags of frozen jumbo shrimp", 1800, 1350, "The Catch"),
  p("customer-haul", "Customer with a cooler and a bag of fish", 1800, 1350, "Customers"),
  p("cooler-orders", "Coolers of scallops, fish and dip ready to go", 1800, 1316, "Behind the scenes"),
  p("wagyu-cut", "Marbled wagyu cut in hand", 1800, 1350, "The Catch"),
  p("customer-steak-box", "Customer opening a box of steaks and lobster", 1350, 1800, "Customers"),
  p("florida-lobster", "Grilled Florida lobster tails", 1012, 1800, "Plated"),
  p("stone-crab-haul", "Sacks of fresh stone crab claws", 1350, 1800, "The Catch"),
];

export const videos = [
  { src: "/media/video/unboxing.mp4", poster: "/media/video/unboxing.jpg", label: "Unboxing day" },
  { src: "/media/video/live-lobsters.mp4", poster: "/media/video/live-lobsters.jpg", label: "Straight off the boat" },
  { src: "/media/video/stone-crab-crack.mp4", poster: "/media/video/stone-crab-crack.jpg", label: "Cracking claws" },
  { src: "/media/video/king-crab.mp4", poster: "/media/video/king-crab.jpg", label: "King crab legs" },
  { src: "/media/video/stone-crab-bags.mp4", poster: "/media/video/stone-crab-bags.jpg", label: "Stone crab season" },
  { src: "/media/video/delivery-carry.mp4", poster: "/media/video/delivery-carry.jpg", label: "Out for delivery" },
] as const;
