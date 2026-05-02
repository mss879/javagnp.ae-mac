import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const techFont = localFont({
  src: "../../public/Virginia-Tech-Nameplate.otf",
  variable: "--font-tech",
  display: "swap",
});

/* ──────────────────────────────────────────
   GLOBAL METADATA (inherited by all pages)
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://javagnp.ae"),
  title: {
    default: "JavaGNP – Transforming Ideas into Digital Reality",
    template: "%s | JavaGNP",
  },
  description:
    "Empowering global enterprises with cutting-edge IT solutions, AI innovation, and secure digital infrastructure. Headquartered in Dubai, delivering excellence worldwide.",
  keywords: [
    "JavaGNP",
    "IT solutions Dubai",
    "software development UAE",
    "global technology company",
    "digital transformation",
  ],
  authors: [{ name: "ARC AI", url: "https://www.arcai.agency" }],
  creator: "ARC AI",
  publisher: "JavaGNP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JavaGNP",
    url: "https://javagnp.ae",
    title: "JavaGNP – Transforming Ideas into Digital Reality",
    description: "Empowering global enterprises with cutting-edge IT solutions, AI innovation, and secure digital infrastructure. Headquartered in Dubai, delivering excellence worldwide.",
    images: [
      {
        url: "https://javagnp.ae/logo.png",
        width: 1200,
        height: 630,
        alt: "JavaGNP Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaGNP – Transforming Ideas into Digital Reality",
    description: "Empowering global enterprises with cutting-edge IT solutions, AI innovation, and secure digital infrastructure. Headquartered in Dubai, delivering excellence worldwide.",
    images: ["https://javagnp.ae/logo.png"],
  },
  alternates: {
    canonical: "https://javagnp.ae",
  },
  other: {
    designer: "ARC AI – AI Automation and Software Company",
    author: "ARC AI",
  },
};

/* ──────────────────────────────────────────
   ORGANIZATION JSON-LD (global)
   ────────────────────────────────────────── */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "JavaGNP",
  legalName: "Java Global Nexus Platform (Pvt) Ltd",
  url: "https://javagnp.ae",
  logo: "https://javagnp.ae/logo.png",
  description:
    "Dubai-headquartered global technology company delivering IT solutions, AI innovation, cloud & cybersecurity, BPO, and digital marketing services.",
  foundingDate: "2023",
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai Internet City",
      addressCountry: "AE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressRegion: "Port City",
      addressCountry: "LK",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@javagnp.ae",
    contactType: "customer service",
    availableLanguage: ["English"],
  },
  sameAs: [],
  parentOrganization: {
    "@type": "Organization",
    name: "Pey and Cey World Wide Sugar Trading LLC",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${techFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background">
        {children}

        {/* Global Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </body>
    </html>
  );
}
