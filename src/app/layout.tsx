import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Outfit, Rajdhani } from "next/font/google";
import "./globals.css";
import TrackingScript from "./components/TrackingScript";

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

const techFont = Rajdhani({
  variable: "--font-tech",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

/* ──────────────────────────────────────────
   GLOBAL METADATA (inherited by all pages)
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://javagnp.ae"),
  title: {
    default: "JavaGNP | Enterprise IT Solutions, AI & Cybersecurity in Dubai",
    template: "%s | JavaGNP",
  },
  description:
    "JavaGNP is a premier global technology nexus headquartered in Dubai, specializing in cutting-edge IT solutions, AI-driven automation, secure cloud infrastructure, BPO, and digital marketing to empower enterprises worldwide.",
  keywords: [
    "JavaGNP",
    "Java Global Nexus Platform",
    "IT solutions Dubai",
    "enterprise software development UAE",
    "AI automation services",
    "cybersecurity solutions Dubai",
    "cloud computing infrastructure UAE",
    "BPO services global",
    "digital marketing agency Dubai",
    "enterprise IT consulting",
    "tech company Port City Colombo",
    "digital transformation experts",
    "custom software engineering",
  ],
  authors: [{ name: "ARC AI", url: "https://www.arcai.agency" }],
  creator: "ARC AI",
  publisher: "JavaGNP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    alternateLocale: ["en_AE", "en_GB"],
    siteName: "JavaGNP",
    url: "https://javagnp.ae",
    title: "JavaGNP | Transformative IT, AI & Cybersecurity Solutions",
    description: "Empowering global enterprises with cutting-edge IT solutions, AI innovation, and secure digital infrastructure. Headquartered in Dubai, delivering excellence worldwide.",
    images: [
      {
        url: "https://javagnp.ae/favicon.png",
        width: 1200,
        height: 630,
        alt: "JavaGNP – Premium IT, AI & Digital Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JavaGNP | Premium IT Solutions & AI Innovation",
    description: "Empowering global enterprises with cutting-edge IT solutions, AI innovation, and secure digital infrastructure. Headquartered in Dubai.",
    images: ["https://javagnp.ae/favicon.png"],
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
    "A premier Dubai-headquartered global technology company delivering enterprise IT solutions, AI innovation, cloud & cybersecurity, BPO, and digital marketing services worldwide.",
  foundingDate: "2023",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Amber Gem Tower, Mezzanine Floor, Sheikh Khalifa Street",
      addressLocality: "Ajman",
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
    email: "info@javagnp.ae",
    contactType: "customer service",
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: [
    "https://www.linkedin.com/company/javagnp",
    "https://twitter.com/javagnp",
    "https://www.facebook.com/javagnp",
    "https://www.instagram.com/javagnp"
  ],
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

/* ──────────────────────────────────────────
   WEBSITE JSON-LD
   ────────────────────────────────────────── */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "JavaGNP",
  url: "https://javagnp.ae",
  description: "Transforming Ideas into Digital Reality through IT, AI, and Cybersecurity.",
  publisher: {
    "@type": "Organization",
    name: "JavaGNP"
  }
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
        <TrackingScript />
        {children}

        {/* Global Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </body>
    </html>
  );
}
