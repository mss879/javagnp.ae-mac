import type { Metadata } from "next";
import AboutClient from "./AboutClient";

/* ──────────────────────────────────────────
   ABOUT PAGE METADATA
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "About JavaGNP – Dubai IT Company & Global Technology Partner",
  description:
    "Learn about JavaGNP (Java Global Nexus Platform), a Dubai-headquartered technology firm with operations in the UAE and Sri Lanka. Discover our group structure, global trade networks, and corporate governance.",
  keywords: [
    "about JavaGNP",
    "Dubai IT company",
    "UAE tech firm",
    "Java Global Nexus Platform",
    "global trade technology partner",
    "Sri Lanka IT operations",
    "Ras Al Khaimah Free Zone",
    "commodity trading technology",
  ],
  openGraph: {
    title: "About JavaGNP – Dubai IT Company & Global Technology Partner",
    description:
      "Discover JavaGNP's group structure, global trade networks, regulatory presence, and corporate governance model.",
    url: "https://javagnp.ae/about",
    type: "website",
  },
  twitter: {
    title: "About JavaGNP – Dubai IT Company & Global Technology Partner",
    description:
      "Discover JavaGNP's group structure, global trade networks, regulatory presence, and corporate governance model.",
  },
  alternates: {
    canonical: "https://javagnp.ae/about",
  },
};

/* ──────────────────────────────────────────
   ABOUT PAGE JSON-LD
   ────────────────────────────────────────── */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About JavaGNP",
  url: "https://javagnp.ae/about",
  description:
    "Java Global Nexus Platform (Pvt) Ltd is a group-aligned operating entity within an international services framework, headquartered in Dubai with operations in Sri Lanka.",
  mainEntity: {
    "@type": "Organization",
    name: "JavaGNP",
    legalName: "Java Global Nexus Platform (Pvt) Ltd",
    url: "https://javagnp.ae",
    foundingDate: "2023",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: "50+",
    },
    areaServed: [
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "Sri Lanka" },
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
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutClient />

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </>
  );
}
