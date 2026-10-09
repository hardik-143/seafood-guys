/** FAQ page content. Answers only restate what the client has confirmed elsewhere on the site. */
export type FaqItem = { q: string; a: string; link?: { label: string; href: string } };

export const faqGroups: { id: string; label: string; items: FaqItem[] }[] = [
  {
    id: "delivery",
    label: "Delivery",
    items: [
      {
        q: "Is delivery really free?",
        a: "Yes. Every order is delivered free across our Miami-Dade and Broward routes.",
      },
      {
        q: "Where do you deliver?",
        a: "Miami-Dade and Broward: Brickell, Wynwood, Coral Gables, Miami Beach, Doral, Kendall, Aventura, Fort Lauderdale, Hollywood, Weston and more.",
        link: { label: "Check your area", href: "/delivery" },
      },
      {
        q: "When will my order arrive?",
        a: "We text you a delivery window the day before, so someone is there to get it into the freezer.",
      },
    ],
  },
  {
    id: "ordering",
    label: "Ordering & payment",
    items: [
      {
        q: "How do I order?",
        a: "Build an order on the site, text us, or call the order line. We confirm availability and your delivery window by text.",
        link: { label: "See the menu", href: "/menu" },
      },
      {
        q: "How do I pay?",
        a: "Send your order through the site or by text. We confirm it, then collect payment when we deliver.",
      },
      {
        q: "Some items say “call for price”. Why?",
        a: "Things like stone crab and our shellfish box change with the season and the market. Text us and we'll give you this week's price.",
      },
    ],
  },
  {
    id: "products",
    label: "Products & packing",
    items: [
      {
        q: "How is everything packed?",
        a: "Fish and meats are portioned, vacuum-sealed and frozen at peak freshness, then packed in insulated coolers with labels showing what's inside. Most boxes arrive with your name on the lid.",
      },
      {
        q: "How big is a case?",
        a: "All fish cases are 10 lbs of a single species: mahi mahi, snapper, grouper, salmon, tuna or corvina.",
      },
      {
        q: "When can I get stone crab?",
        a: "Florida stone crab season runs October 15 to May 1. Outside the season, ask us about king crab.",
        link: { label: "Stone crab season", href: "/stone-crab-season" },
      },
    ],
  },
  {
    id: "storage",
    label: "Storage & cooking",
    items: [
      {
        q: "How long does it keep?",
        a: "Vacuum-sealed and kept frozen, portions hold their quality for months.",
      },
      {
        q: "How do I thaw it?",
        a: "Overnight in the fridge, or sealed in cold water for about 30 minutes. Never on the counter.",
      },
      {
        q: "Any cooking tips?",
        a: "Our guide covers lobster tails, crab, shrimp, salmon, tuna, mahi and filet, with a built-in kitchen timer.",
        link: { label: "Cook It Right", href: "/cook" },
      },
    ],
  },
  {
    id: "business",
    label: "Offices, gifts & wholesale",
    items: [
      {
        q: "Do you deliver to offices and restaurants?",
        a: "All the time. Office drops, chefs, restaurants and private events are a big part of what we do.",
        link: { label: "Wholesale", href: "/wholesale" },
      },
      {
        q: "Can I send boxes as gifts?",
        a: "Yes. Pick a box, send us the names and addresses, and every box goes out with the recipient's name on the lid.",
        link: { label: "Gift boxes", href: "/gifts" },
      },
    ],
  },
];
