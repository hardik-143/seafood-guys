/**
 * Single source of truth for business details. Everything here came from the
 * client's flyers, menu board and packaging — confirm before launch (see
 * README "Needs client confirmation").
 */
export const site = {
  name: "Seafood Guys",
  legalName: "Seafood Guys Miami",
  tagline: "Premium seafood & meats, delivered to your door.",
  description:
    "Seafood Guys delivers dock-fresh fish, Caribbean lobster tails, stone crab, jumbo wild-caught shrimp and premium steaks across Miami and Fort Lauderdale. Free delivery on every order.",
  url: "https://www.seafoodguysmiami.com",
  email: "orders@seafoodguysmiami.com",
  phones: [
    { label: "Order line", display: "(786) 643-3670", tel: "+17866433670" },
    { label: "Miami", display: "(786) 484-3600", tel: "+17864843600" },
    { label: "Ft. Lauderdale", display: "(954) 728-0303", tel: "+19547280303" },
  ],
  instagram: "https://www.instagram.com/seafoodguysmiami",
  serviceArea: "Miami-Dade & Broward",
} as const;

export const primaryPhone = site.phones[0];

export const nav = [
  { label: "Menu", href: "/menu" },
  { label: "Our Story", href: "/our-story" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
] as const;

export const areas = {
  "Miami-Dade": [
    "Brickell",
    "Downtown Miami",
    "Wynwood",
    "Coral Gables",
    "Coconut Grove",
    "Key Biscayne",
    "Miami Beach",
    "Doral",
    "Kendall",
    "Pinecrest",
    "Aventura",
    "Hialeah",
  ],
  Broward: [
    "Fort Lauderdale",
    "Hollywood",
    "Weston",
    "Pembroke Pines",
    "Plantation",
    "Davie",
    "Coral Springs",
    "Pompano Beach",
  ],
} as const;

export const faqs = [
  {
    q: "Is delivery really free?",
    a: "Yes. Every order is delivered free across our Miami-Dade and Broward routes. We text you a delivery window the day before so someone is there to get it into the freezer.",
  },
  {
    q: "How is everything packed?",
    a: "Fish and meats are portioned, vacuum-sealed and frozen at peak freshness, then packed in insulated coolers with labels showing what's inside. Most boxes arrive with your name on the lid.",
  },
  {
    q: "How big is a case?",
    a: "All fish cases are 10 lbs of a single species — mahi mahi, snapper, grouper, salmon, tuna or corvina. Packages mix fish, shellfish and steaks in ready-to-cook portions.",
  },
  {
    q: "How long does it keep?",
    a: "Vacuum-sealed and kept frozen, portions hold their quality for months. Thaw overnight in the fridge, or in cold water for about 30 minutes, and cook.",
  },
  {
    q: "Do you deliver to offices and restaurants?",
    a: "All the time. Office drops, chefs, restaurants and private events are a big part of what we do. Call the order line for wholesale or recurring orders.",
  },
  {
    q: "How do I pay?",
    a: "Send your order through the site or by text. We confirm availability and your delivery window, then collect payment when we deliver.",
  },
] as const;
