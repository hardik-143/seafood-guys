# Seafood Guys — website

Marketing + ordering site for Seafood Guys (premium seafood & meats delivered in
Miami and Fort Lauderdale). Built on the same stack family as the Sarasota
template — Next.js App Router, Tailwind CSS v4, TypeScript — with its own
visual identity and a three.js layer.

## Run it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build && pnpm start
```

## What's inside

| Page          | Highlights |
| ------------- | ---------- |
| `/`           | 3D underwater hero (procedural swimming mahi, caustics, god rays, bubbles), stats counters, tilted product marquee, pinned horizontal "The Catch" scroller, package cards, scroll-driven 3D cooler box that opens and launches the products, reels in phone mockups, customer photo wall, 10%-off promo, delivery areas + FAQ |
| `/menu`       | Every package, case and single item from the client's menu board, with choice pickers, add-to-order and the downloadable menu board |
| `/our-story`  | Brand story, values, who we deliver to, delivery reel |
| `/gallery`    | Filterable masonry of all client photos with lightbox, plus all reels |
| `/contact`    | Call/text cards for each line, contact form, delivery areas, map, FAQ |

**Ordering:** a persistent cart (localStorage) in a slide-out drawer. Checkout
collects name / phone / address / date and POSTs to `/api/inquiry`; customers
can also send the order as a pre-filled SMS. Payment is collected on delivery.

### Email delivery for orders & contact form

`/api/inquiry` sends through [Resend](https://resend.com) when these env vars
are set; without them it logs the submission to the server console.

```
RESEND_API_KEY=...
INQUIRY_TO_EMAIL=orders@yourdomain.com
INQUIRY_FROM_EMAIL="Seafood Guys <orders@yourdomain.com>"   # verified domain
```

## Editing content

Everything business-specific lives in `content/`:

- `content/site.ts` — phones, email, Instagram, delivery areas, FAQ
- `content/menu.ts` — packages, cases, singles, prices, "The Catch" list
- `content/gallery.ts` — photo + video list with alt text

Media is in `public/media/` (converted from the raw client files in the parent
folder: HEIC → JPEG, MOV → muted 720p MP4 with poster frames).

## Needs client confirmation before launch

- **Phone numbers** — the materials show three: (786) 643-3670 (flyer),
  (786) 484-3600 Miami and (954) 728-0303 Ft. Lauderdale (older insert card).
  Which are current, and which is the main order line?
- **Email** (`orders@seafoodguysmiami.com`) and **Instagram** handle
  (`@seafoodguysmiami`) are placeholders.
- **Prices** are transcribed from the menu board; the "Seafood Guys Choice"
  package had no price, so it shows "Call for price".
- **Delivery area list** (neighbourhoods) and FAQ answers (payment on delivery,
  delivery windows by text) are reasonable defaults, not client-supplied.
- **Our Story** copy is placeholder narrative — replace with the real story.
- **Logo** — no standalone logo file was supplied (it only exists flattened on
  flyers), so `components/ui/logo.tsx` is a vector stand-in. Drop in the real
  vector logo when available.
- **Customer photos** — confirm the people pictured are OK appearing on the site.
