"use client";

import Image from "next/image";
import CurvedCorner from "./CurvedCorner";
import { motion } from "framer-motion";

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
  return (
    <section
      id="hero"
      className="relative w-full h-screen rounded-[32px] bg-brand-surface overflow-hidden glow-border pointer-events-auto shadow-2xl"
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
      <div className="hidden xl:flex absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 pl-4 pr-5 pb-2 items-center justify-center pointer-events-auto shadow-sm">
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={56}
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* curved corners */}
        <CurvedCorner
          size={24}
          rotation={0}
          className="top-0 -right-[23.5px]"
        />
        <CurvedCorner
          size={24}
          rotation={0}
          className="left-0 -bottom-[23.5px]"
        />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Links badge (top‑right)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-3 pr-5 pl-5 pb-3 items-center gap-3 pointer-events-auto shadow-sm">
        <div className="flex items-center gap-6 mr-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Contact */}
          <div className="flex items-center pl-2">
            <a
              href="/contact"
              className="relative group/btn text-sm font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-6 py-3 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(220,38,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md"
            >
              <span className="relative z-10 drop-shadow-sm">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0" />
            </a>
          </div>
        </div>

        {/* curved corners */}
        <CurvedCorner
          size={24}
          rotation={90}
          className="top-0 -left-[23.5px]"
        />
        <CurvedCorner
          size={24}
          rotation={90}
          className="right-0 -bottom-[23.5px]"
        />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE NAV
         ══════════════════════════════════════════ */}
      <div className="xl:hidden absolute top-0 left-0 w-full bg-white z-[60] flex items-center justify-between px-5 py-2 pointer-events-auto border-b border-gray-100">
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

          {/* hamburger */}
          <button
            className="flex items-center gap-2 h-[44px] px-5 rounded-xl bg-brand-surface-light text-white hover:bg-brand-surface transition-colors border border-brand-outline shadow-md cursor-pointer"
            aria-label="Open menu"
          >
            <span className="relative w-[18px] h-[14px] shrink-0 inline-flex flex-col justify-between" aria-hidden="true">
              <span className="w-full h-[2px] bg-white rounded-sm" />
              <span className="w-full h-[2px] bg-white rounded-sm" />
              <span className="w-full h-[2px] bg-white rounded-sm" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">Menu</span>
          </button>
        </div>
      </div>



      {/* ══════════════════════════════════════════
          MAIN HERO CONTENT
         ══════════════════════════════════════════ */}
      <div className="relative z-20 w-full h-full flex items-center px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8 max-w-[1100px] pt-12 lg:pt-0 mt-12 md:mt-20 lg:mt-24">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[4rem] xl:text-[4.5rem] 2xl:text-[5rem] tracking-tight leading-[1.05] font-tech mb-6 text-white"
          >
            Your Partner in Technology,
            <br className="hidden md:block" />
            <span className="whitespace-nowrap">
              Innovation, and Growth
            </span>
          </motion.h1>

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
  );
}
