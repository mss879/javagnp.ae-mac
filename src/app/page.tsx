import type { Metadata } from "next";
import Hero from "./components/Hero";
import WhyChooseUs from "./components/WhyChooseUs";
import WhyJavaGNP from "./components/WhyJavaGNP";
import Services from "./components/Services";
import Process from "./components/Process";
import Faq from "./components/Faq";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";

/* ──────────────────────────────────────────
   HOMEPAGE METADATA
   ────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "JavaGNP – Transforming Ideas into Digital Reality | IT Solutions Dubai",
  description:
    "JavaGNP is a Dubai-based global technology and digital transformation company. We deliver enterprise IT solutions, AI innovation, cloud services, and managed digital delivery worldwide.",
  keywords: [
    "JavaGNP",
    "IT solutions Dubai",
    "digital transformation company UAE",
    "global software delivery",
    "enterprise technology partner",
    "managed IT services",
    "software development Dubai",
  ],
  openGraph: {
    title: "JavaGNP – Transforming Ideas into Digital Reality",
    description:
      "Dubai-headquartered global technology company delivering IT solutions, AI innovation, and digital transformation services worldwide.",
    url: "https://javagnp.ae",
    type: "website",
  },
  twitter: {
    title: "JavaGNP – Transforming Ideas into Digital Reality",
    description:
      "Dubai-headquartered global technology company delivering IT solutions, AI innovation, and digital transformation services worldwide.",
  },
  alternates: {
    canonical: "https://javagnp.ae",
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
  description:
    "JavaGNP is a Dubai-based global technology and digital transformation company delivering enterprise IT solutions worldwide.",
  publisher: {
    "@type": "Organization",
    name: "JavaGNP",
    url: "https://javagnp.ae",
    logo: "https://javagnp.ae/new-logo.png",
  },
  creator: {
    "@type": "Organization",
    name: "ARC AI",
    url: "https://www.arcai.agency",
  },
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-brand-background">
      <Preloader />
      <Hero />
      <WhyChooseUs />
      <WhyJavaGNP />
      <Services />
      <Process />
      <Faq />
      <Cta />
      <Footer />

      {/* Page-level JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </main>
  );
}
