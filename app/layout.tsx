import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://visit-nairobi.example"),
  title: { default: "Visit Nairobi — Your Gateway to Africa", template: "%s | Visit Nairobi" },
  description: "Discover Nairobi’s wildlife, culture, food, events, business, innovation and practical travel guidance.",
  keywords: ["Nairobi travel", "Visit Nairobi", "Nairobi business", "Nairobi events", "Kenya tourism"],
  openGraph: {
    title: "Visit Nairobi — Your Gateway to Africa",
    description: "Where nature, culture, innovation and opportunity live side by side.",
    type: "website",
    locale: "en_KE",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "Visit Nairobi — Your Gateway to Africa" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
};

export const viewport: Viewport = { themeColor: "#2833E8", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${mono.variable}`}>
        <a className="skip-link" href="#main">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}
