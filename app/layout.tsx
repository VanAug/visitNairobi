import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://visit-nairobi.example"),
  title: { default: "Visit Nairobi Kenya – The Gateway to Africa | Tourism, Investment & Business", template: "%s | Visit Nairobi" },
  description: "Visit Nairobi Kenya – The Gateway to Africa. Discover world-class tourism, investment opportunities, business expansion, culture, innovation, real estate, events, and unforgettable experiences in one of Africa's fastest-growing cities.",
  keywords: ["Nairobi travel", "Visit Nairobi", "Nairobi business", "Nairobi events", "Kenya tourism"],
  openGraph: {
    title: "Visit Nairobi Kenya – The Gateway to Africa | Tourism, Investment & Business",
    description: "Visit Nairobi Kenya – The Gateway to Africa. Discover world-class tourism, investment opportunities, business expansion, culture, innovation, real estate, events, and unforgettable experiences in one of Africa's fastest-growing cities.",
    type: "website",
    locale: "en_KE",
    images: [{ url: "/og.jpg", width: 1280, height: 853, alt: "Nairobi skyline at sunset" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
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
