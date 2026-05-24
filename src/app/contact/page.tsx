import type { Metadata } from "next";
import ContactClient from "./ContactClient";

/* ──────────────────────────────────────────
   CONTACT PAGE METADATA
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Contact JavaGNP – Get in Touch for IT Consultation & Projects",
  description:
    "Contact JavaGNP for enterprise software development, cloud migration, IT consulting, and digital transformation projects. Reach our Dubai headquarters or request a service discussion today.",
  keywords: [
    "contact JavaGNP",
    "IT consultation Dubai",
    "request IT quote UAE",
    "enterprise software inquiry",
    "get in touch technology company",
    "hire IT team Dubai",
    "software project inquiry",
  ],
  openGraph: {
    title: "Contact JavaGNP – Get in Touch for IT Consultation & Projects",
    description:
      "Reach JavaGNP for enterprise software development, cloud migration, IT consulting, and digital transformation. Contact our team today.",
    url: "https://javagnp.ae/contact",
    type: "website",
  },
  twitter: {
    title: "Contact JavaGNP – IT Consultation & Projects",
    description:
      "Get in touch with JavaGNP for enterprise software, cloud, AI, and digital transformation projects.",
  },
  alternates: {
    canonical: "https://javagnp.ae/contact",
  },
};

/* ──────────────────────────────────────────
   CONTACT PAGE JSON-LD
   ────────────────────────────────────────── */
const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact JavaGNP",
  url: "https://javagnp.ae/contact",
  description:
    "Contact JavaGNP for enterprise software development, cloud migration, IT consulting, and digital transformation projects.",
  mainEntity: {
    "@type": "Organization",
    name: "JavaGNP",
    url: "https://javagnp.ae",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "info@javagnp.ae",
        contactType: "sales",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        email: "info@javagnp.ae",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
      {
        "@type": "ContactPoint",
        email: "info@javagnp.lk",
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ajman Ventures Centre Free Zone, BC-893580, 26th Floor, Amber Gem Tower, Sheikh Khalifa Street",
      addressLocality: "Ajman",
      addressCountry: "AE",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactClient />

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </>
  );
}
