"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CurvedCorner from "../components/CurvedCorner";
import Footer from "../components/Footer";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

export default function PrivacyClient() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main className="w-full min-h-screen bg-[#fafafa] text-zinc-900 selection:bg-brand-primary selection:text-white font-sans">
      
      {/* ══════════════════════════════════════════
          DESKTOP NAV
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 pl-4 pr-5 pb-2 items-center justify-center shadow-sm border-b border-r border-zinc-100">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Company Logo" width={200} height={56} className="h-14 w-auto object-contain" />
        </Link>
        <CurvedCorner size={24} rotation={0} className="top-0 -right-[23.5px] text-white" />
        <CurvedCorner size={24} rotation={0} className="left-0 -bottom-[23.5px] text-white" />
      </div>

      <div className="hidden xl:flex absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-3 pr-5 pl-5 pb-3 items-center gap-3 shadow-sm border-b border-l border-zinc-100">
        <div className="flex items-center gap-6 mr-1">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-extrabold tracking-widest uppercase transition-all duration-300 group flex items-center justify-center ${
                  isActive ? "text-brand-primary" : "text-zinc-900"
                }`}
              >
                {!isActive && (
                  <span className="absolute inset-0 bg-zinc-100 rounded-xl scale-50 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 z-0" />
                )}
                {isActive && (
                  <span className="absolute inset-0 bg-brand-primary/5 border border-brand-primary/10 rounded-xl z-0 shadow-[inset_0_0_12px_rgba(220,38,38,0.02)]" />
                )}
                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                   {isActive && (
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(220,38,38,0.6)] animate-pulse" />
                   )}
                   <span className="group-hover:text-brand-primary transition-colors duration-300">{l.label}</span>
                </span>
              </Link>
            );
          })}
          <div className="flex items-center pl-2">
            <Link
              href="/contact"
              className="relative group/btn text-sm font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-6 py-3 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(220,38,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md"
            >
              <span className="relative z-10 drop-shadow-sm">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0" />
            </Link>
          </div>
        </div>
        <CurvedCorner size={24} rotation={90} className="top-0 -left-[23.5px] text-white" />
        <CurvedCorner size={24} rotation={90} className="right-0 -bottom-[23.5px] text-white" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE NAV
         ══════════════════════════════════════════ */}
      <div className="xl:hidden fixed top-0 left-0 w-full bg-white z-[60] flex items-center justify-between px-5 py-2 border-b border-zinc-100 shadow-sm">
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Company Logo" width={180} height={48} className="h-12 w-auto object-contain" />
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 h-[44px] px-5 rounded-xl bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-sm"
        >
          <span className="text-sm font-bold tracking-wider uppercase">Menu</span>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[70] bg-white flex flex-col pt-24 px-6 pb-12"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-5 p-3"
            >
              <span className="text-sm font-bold tracking-wider uppercase text-zinc-500">Close</span>
            </button>
            <div className="flex flex-col gap-6 text-center mt-12">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-tech font-bold text-zinc-900">
                  {l.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-tech font-bold text-brand-primary mt-4">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full pt-40 pb-24 z-10">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 sm:p-12 md:p-16 rounded-[32px] border border-zinc-200/60 shadow-sm"
          >
            <h1 className="text-4xl sm:text-5xl tracking-tight mb-8 font-tech font-semibold">Privacy Policy</h1>
            <div className="space-y-6 text-zinc-600 leading-relaxed font-sans">
              <p>
                <strong>Effective Date:</strong> January 1, 2024
              </p>
              <p>
                At JAVA GLOBAL NEXUS PLATFORM FZE LLC ("JavaGNP", "we", "our", or "us"), we are committed to protecting and respecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (javagnp.ae) or engage with our enterprise IT solutions, AI innovation, and global managed services.
              </p>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">1. Information We Collect</h2>
              <p>
                We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, and phone number.
              </p>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">2. How We Use Collected Information</h2>
              <p>
                JavaGNP may collect and use Users' personal information for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li><strong>To improve customer service:</strong> Information you provide helps us respond to your customer service requests and support needs more efficiently.</li>
                <li><strong>To personalize user experience:</strong> We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.</li>
                <li><strong>To send periodic emails:</strong> We may use the email address to respond to inquiries, questions, and/or other requests.</li>
              </ul>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">3. How We Protect Your Information</h2>
              <p>
                We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Site.
              </p>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">4. Sharing Your Personal Information</h2>
              <p>
                We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
              </p>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">5. Changes to This Privacy Policy</h2>
              <p>
                JavaGNP has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
              </p>
              
              <h2 className="text-2xl text-zinc-900 mt-12 mb-4 font-tech font-semibold">6. Contacting Us</h2>
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at: <a href="mailto:contact@javagnp.ae" className="text-brand-primary font-bold hover:underline transition-all">contact@javagnp.ae</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
