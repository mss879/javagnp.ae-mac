"use client";

import Image from "next/image";
import CurvedCorner from "./CurvedCorner";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/* ═══════════════════════════════════════════════════
   Navigation links
   ═══════════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

/* ═══════════════════════════════════════════════════
   Stat bar items
   ═══════════════════════════════════════════════════ */
const STATS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    label: "Global Reach",
    value: "Worldwide Operations",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" aria-hidden="true">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    label: "Security & Compliance",
    value: "Enterprise Grade",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" aria-hidden="true">
        <path d="m12 2 10 5-10 5L2 7l10-5z" />
        <path d="m2 12 10 5 10-5" />
        <path d="m2 17 10 5 10-5" />
      </svg>
    ),
    label: "Scalable Architecture",
    value: "Cloud Native",
  },
] as const;

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */
export default function Hero() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, { autoAlpha: 1, x: 0, duration: 0.5, ease: "power3.out" });
      gsap.fromTo(
        ".gsap-menu-item",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    } else {
      gsap.to(menuRef.current, { autoAlpha: 0, x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, { dependencies: [isMenuOpen] });

  return (
    <div className="w-full bg-white flex flex-col p-[3px] overflow-hidden">
      <section
        id="hero"
        className="relative w-full h-[calc(100vh-6px)] rounded-[32px] bg-brand-surface overflow-hidden pointer-events-auto"
      >
      {/* ── Background Video Layer ── */}
      <div className="absolute inset-0 z-0 bg-brand-background pointer-events-none">
        <video
          src="/Abstract_tech_background_202604281702.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* glow orb */}
        <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-primary opacity-10 blur-[120px] rounded-full animate-pulse-glow" />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Logo badge (top‑left)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-6 left-6 bg-white rounded-2xl z-[60] px-5 py-2 items-center justify-center pointer-events-auto shadow-xl">
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={56}
            className="h-12 w-auto object-contain"
          />
        </a>
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Menu badge (top‑right)
         ══════════════════════════════════════════ */}
      <button 
        onClick={() => setIsMenuOpen(true)} 
        className="hidden xl:flex absolute top-6 right-6 bg-white rounded-2xl z-[60] px-6 py-3 items-center justify-center pointer-events-auto shadow-xl text-zinc-900 font-extrabold uppercase tracking-widest text-sm gap-3 hover:text-brand-primary transition-colors cursor-pointer"
      >
        <span>Menu</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* ══════════════════════════════════════════
          MOBILE NAV
         ══════════════════════════════════════════ */}
      <div className="xl:hidden absolute top-0 left-0 w-full bg-white z-[60] flex items-center justify-between px-5 py-2 pointer-events-auto border-b border-gray-100 shadow-sm">
        <a href="/" className="flex items-center shrink-0">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={180}
            height={48}
            className="h-12 w-auto object-contain"
          />
        </a>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="relative group/btn text-sm font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-4 py-2 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_4px_12px_rgba(220,38,38,0.3)] flex items-center gap-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Menu</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          GSAP RIGHT SIDE MENU OVERLAY
         ══════════════════════════════════════════ */}
      <div 
        ref={menuRef}
        className="fixed top-0 right-0 w-full max-w-[400px] h-full z-[100] bg-zinc-950/95 backdrop-blur-xl flex flex-col items-start justify-center invisible pointer-events-none shadow-2xl translate-x-full border-l border-white/10 px-8 md:px-12"
      >
        {/* Close Button */}
        <button 
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-6 right-6 xl:top-8 xl:right-8 w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors pointer-events-auto text-white cursor-pointer"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="flex flex-col items-start gap-6 md:gap-8 pointer-events-auto w-full">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="gsap-menu-item text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white hover:text-brand-primary transition-colors text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="/contact"
            className="gsap-menu-item text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white hover:text-brand-primary transition-colors text-left"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>

          {/* Socials */}
          <div className="gsap-menu-item mt-6 md:mt-10 flex flex-col gap-4 w-full">
            <span className="text-xs font-bold tracking-widest uppercase text-white/50">Socials</span>
            <div className="flex items-center gap-5 text-white">
              {/* Instagram */}
              <a href="#" className="hover:text-brand-primary transition-colors hover:scale-110" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" className="hover:text-brand-primary transition-colors hover:scale-110" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="hover:text-brand-primary transition-colors hover:scale-110" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>      {/* ══════════════════════════════════════════
          MAIN HERO CONTENT
         ══════════════════════════════════════════ */}
      <div className="relative z-20 w-full h-full flex items-end md:items-center px-5 xl:px-6 justify-start pb-[28vh] md:pb-0">
        <div className="flex flex-col justify-center items-start text-left bg-zinc-950/40 backdrop-blur-xl border border-white/20 p-5 sm:p-6 rounded-2xl md:rounded-3xl shadow-2xl w-full sm:w-auto max-w-[1100px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-[34px] leading-[1.15] sm:text-5xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] tracking-tight md:leading-[1.05] font-bold text-white m-0 font-tech"
          >
            Your Partner in Technology,<br />
            Innovation, and Growth
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-white/80 text-[13px] sm:text-sm md:text-base mt-4 font-medium tracking-wide max-w-[300px] sm:max-w-sm md:max-w-[600px]"
          >
            Delivering enterprise IT solutions, AI innovation, and global managed services to empower your business in the digital age.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex flex-row items-center justify-start gap-3 w-full sm:w-auto mt-6 md:mt-8 md:hidden"
          >
            <a
              href="/contact"
              className="flex-1 sm:flex-none text-center text-xs sm:text-sm font-bold tracking-widest uppercase text-white rounded-xl px-2 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(220,38,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 transition-transform active:scale-95"
            >
              Contact Us
            </a>
            <a
              href="/services"
              className="flex-1 sm:flex-none text-center text-xs sm:text-sm font-bold tracking-widest uppercase text-white rounded-xl px-2 py-3.5 sm:px-6 sm:py-4 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all active:scale-95"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          BOTTOM STAT BAR
         ══════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: "easeOut" }}
        className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/40 backdrop-blur-md z-30 py-4 xl:py-6 px-4 sm:px-6 lg:px-4 xl:px-20 hidden md:block"
      >
        <div className="flex flex-nowrap items-center justify-center gap-2 lg:gap-3 xl:gap-10 text-xs lg:text-sm text-white/50 font-medium overflow-hidden">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="contents">
              <div className="flex items-center gap-2 xl:gap-5 group cursor-default shrink-0">
                <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 xl:mt-1 flex shrink-0">
                  {stat.icon}
                </div>
                <div className="flex flex-col shrink-0">
                  <span className="text-[8px] lg:text-[9px] xl:text-[10px] text-white/40 font-mono tracking-[0.2em] xl:tracking-[0.25em] uppercase mb-0.5 xl:mb-1 whitespace-nowrap">
                    {stat.label}
                  </span>
                  <span className="text-[10px] lg:text-[11px] xl:text-[13px] text-white/90 tracking-widest uppercase font-light whitespace-nowrap">
                    {stat.value}
                  </span>
                </div>
              </div>

              {/* divider */}
              {i < STATS.length - 1 && (
                <div className="block w-px h-8 xl:h-12 bg-white/10 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
    </div>
  );
}
