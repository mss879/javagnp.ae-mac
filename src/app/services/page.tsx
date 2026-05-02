import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

/* ──────────────────────────────────────────
   SERVICES PAGE METADATA
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "IT Services & Digital Solutions – Cloud, AI, BPO & Cybersecurity",
  description:
    "Explore JavaGNP's full suite of IT services: software development, cloud & cybersecurity, AI solutions, digital marketing, BPO, e-commerce platforms, and entertainment & gaming services in Dubai and globally.",
  keywords: [
    "IT services Dubai",
    "cloud cybersecurity UAE",
    "AI solutions company",
    "BPO services Dubai",
    "digital marketing agency UAE",
    "e-commerce development",
    "software development services",
    "IT consulting Middle East",
    "managed IT services",
    "web development Dubai",
  ],
  openGraph: {
    title: "IT Services & Digital Solutions – Cloud, AI, BPO & Cybersecurity | JavaGNP",
    description:
      "Explore JavaGNP's full suite of IT services: software development, cloud & cybersecurity, AI solutions, digital marketing, BPO, and e-commerce services.",
    url: "https://javagnp.ae/services",
    type: "website",
  },
  twitter: {
    title: "IT Services & Digital Solutions | JavaGNP",
    description:
      "Software development, cloud & cybersecurity, AI, digital marketing, BPO, and e-commerce — all from one global technology partner.",
  },
  alternates: {
    canonical: "https://javagnp.ae/services",
  },
};

/* ──────────────────────────────────────────
   SERVICES PAGE JSON-LD
   ────────────────────────────────────────── */
const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "IT Services & Digital Solutions",
  url: "https://javagnp.ae/services",
  description:
    "JavaGNP delivers IT solutions, cloud & cybersecurity, AI innovation, digital marketing, BPO, e-commerce, and entertainment services globally.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: 7,
    itemListElement: [
      {
        "@type": "Service",
        position: 1,
        name: "IT Solutions & Consulting",
        description:
          "Web design & development, app development, software development services, and IT staffing & outsourcing.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 2,
        name: "E-Commerce & Digital Business",
        description:
          "E-commerce store setup, drop shipping, affiliate marketing, and e-book writing & publishing.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 3,
        name: "Cloud & Cybersecurity",
        description:
          "Cloud services & data center solutions, data management, cyber security consultancy, and digital analytics.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 4,
        name: "AI & Innovation",
        description:
          "Artificial intelligence solutions, academic research & consultancy, Web3 & blockchain services, and multimedia development.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 5,
        name: "Digital Marketing & Branding",
        description:
          "Social media & influencer marketing, resume writing & career coaching, online recruiting, and virtual assistance.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 6,
        name: "Business Process Outsourcing (BPO)",
        description:
          "Customer service, government & corporate tendering services, and business transactions & compliance.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
      {
        "@type": "Service",
        position: 7,
        name: "Entertainment & Gaming",
        description:
          "E-games equipment trading, entertainment hall management, online gaming platforms, and live streaming services.",
        provider: { "@type": "Organization", name: "JavaGNP" },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesClient />

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
    </>
  );
}
