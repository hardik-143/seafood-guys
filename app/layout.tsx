import type { Metadata, Viewport } from "next";
import { Anton, Poppins, Yellowtail } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { CartDrawer } from "@/components/order/cart-drawer";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});
const yellowtail = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-yellowtail",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium Seafood & Meats Delivered | Miami & Ft. Lauderdale`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.legalName,
    images: [{ url: "/media/photos/lobster-tails-baked.jpg", width: 1800, height: 1350 }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a1433",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phones[0].tel,
  servesCuisine: "Seafood",
  areaServed: ["Miami-Dade County, FL", "Broward County, FL"],
  image: `${site.url}/media/photos/lobster-tails-baked.jpg`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${anton.variable} ${poppins.variable} ${yellowtail.variable} antialiased`}
      lang="en"
    >
      <body className="min-h-dvh">
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: static JSON-LD
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
