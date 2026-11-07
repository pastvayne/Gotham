import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";
import { brand } from "@/lib/brand";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display-file",
});

const displayItalic = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  display: "swap",
  variable: "--font-display-italic",
});

const description =
  "Financial privacy for Elysium. Gotham is building a way to shield assets and transfer value with greater confidentiality.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "Gotham — Privacy is power.",
    template: "%s · Gotham",
  },
  description,
  applicationName: "Gotham",
  keywords: ["Gotham", "Elysium", "privacy", "shielded pool", "zero knowledge"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    title: "Gotham — Your finances are your business.",
    description,
    siteName: "Gotham",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gotham — Your finances are your business.",
    description,
  },
  appleWebApp: {
    capable: true,
    title: "Gotham",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#081522",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gotham",
    url: brand.url,
    description,
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${display.variable} ${displayItalic.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=sessionStorage.getItem('gotham-open')==='1';document.documentElement.dataset.open=(!reduce&&!seen)?'play':'skip';}catch(e){document.documentElement.dataset.open='skip';}",
          }}
        />
        <link rel="preload" as="image" href="/gotham/city-wide.jpg" fetchPriority="high" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
