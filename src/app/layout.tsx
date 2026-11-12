import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Mrs_Saint_Delafield, Playfair_Display } from "next/font/google";
import { site } from "@/data/content";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--ff-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--ff-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--ff-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const script = Mrs_Saint_Delafield({
  variable: "--ff-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  robots: { index: false, follow: false },
  openGraph: {
    locale: "fr_FR",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8F7",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={site.lang}
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${script.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
