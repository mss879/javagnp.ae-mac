import type { Metadata } from "next";
import HowWeWorkClient from "./HowWeWorkClient";

/* ──────────────────────────────────────────
   HOW WE WORK PAGE METADATA
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "How We Work – IT Outsourcing Process & Delivery Lifecycle",
  description:
    "Discover JavaGNP's structured 5-step delivery lifecycle for cross-border IT outsourcing. From engagement scoping to continuous improvement — learn how our managed services workflow ensures consistent, measurable outcomes.",
  keywords: [
    "IT outsourcing process",
    "offshore delivery model",
    "cross-border IT services",
    "managed services workflow",
    "service engagement lifecycle",
    "IT delivery framework",
    "outsourcing quality assurance",
    "structured service delivery",
  ],
  openGraph: {
    title: "How We Work – IT Outsourcing Process & Delivery Lifecycle | JavaGNP",
    description:
      "JavaGNP's structured 5-step delivery lifecycle ensures consistent, measurable outcomes for cross-border IT outsourcing engagements.",
    url: "https://javagnp.ae/how-we-work",
    type: "website",
  },
  twitter: {
    title: "How We Work – IT Outsourcing Process | JavaGNP",
    description:
      "Our 5-step delivery lifecycle: engagement scoping, resource planning, execution, performance monitoring, and continuous improvement.",
  },
  alternates: {
    canonical: "https://javagnp.ae/how-we-work",
  },
};

/* ──────────────────────────────────────────
   HOW-TO JSON-LD (delivery lifecycle)
   ────────────────────────────────────────── */
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "JavaGNP Service Delivery Lifecycle",
  description:
    "JavaGNP delivers professional and technology-enabled services exclusively to overseas clients through a defined five-step engagement lifecycle.",
  url: "https://javagnp.ae/how-we-work",
  totalTime: "P30D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Engagement Scoping",
      text: "Confirm service type, scope boundaries, expected outcomes, timeline, and reporting expectations.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Resource Planning",
      text: "Assign the delivery team, establish coverage requirements, and set up workflows and documentation.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Execution and Supervision",
      text: "Deliver services under defined service frameworks with supervision and quality checks.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Performance Monitoring",
      text: "Track progress against agreed outcomes and reporting cadence, with escalation where required.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Continuous Improvement",
      text: "Refine workflows, reporting, and execution controls to improve consistency and outcomes over time.",
    },
  ],
};

export default function HowWeWorkPage() {
  return (
    <>
      <HowWeWorkClient />

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
    </>
  );
}
