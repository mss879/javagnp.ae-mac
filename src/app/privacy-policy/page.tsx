import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | JavaGNP",
  description: "Privacy Policy for JAVA GLOBAL NEXUS PLATFORM FZE LLC.",
  alternates: {
    canonical: "https://javagnp.ae/privacy-policy",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
