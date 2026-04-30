"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CurvedCorner from "../components/CurvedCorner";
import Footer from "../components/Footer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

const LIFECYCLE_STEPS = [
  {
    num: "01",
    title: "Engagement scoping",
    desc: "Confirm service type, scope boundaries, expected outcomes, timeline, and reporting expectations."
  },
  {
    num: "02",
    title: "Resource planning",
    desc: "Assign the delivery team, establish coverage requirements, and set up workflows and documentation."
  },
  {
    num: "03",
    title: "Execution and supervision",
    desc: "Deliver services under defined service frameworks with supervision and quality checks."
  },
  {
    num: "04",
    title: "Performance monitoring",
    desc: "Track progress against agreed outcomes and reporting cadence, with escalation where required."
  },
  {
    num: "05",
    title: "Continuous improvement",
    desc: "Refine workflows, reporting, and execution controls to improve consistency and outcomes over time."
  }
];

const CONTROLS = [
  {
    title: "Standardized workflows",
    desc: "Consistency and efficiency across every engagement.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>
  },
  {
    title: "Centralized quality assurance",
    desc: "Rigorous checks maintained by a dedicated oversight team.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
  },
  {
    title: "Secure digital infrastructure",
    desc: "Enterprise-grade security protocols and data protection.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  },
  {
    title: "Defined escalation mechanisms",
    desc: "Clear paths for rapid issue resolution and reporting.",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  }
];

export default function HowWeWorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 selection:bg-brand-primary selection:text-white font-sans">
      
      {/* ══════════════════════════════════════════
          DESKTOP NAV — Logo badge (top‑left)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 pl-4 pr-5 pb-2 items-center justify-center shadow-sm border-b border-r border-zinc-100">
        <a href="/" className="flex items-center">
          <Image src="/logo.png" alt="Company Logo" width={200} height={56} className="h-14 w-auto object-contain" />
        </a>
        <CurvedCorner size={24} rotation={0} className="top-0 -right-[23.5px] text-white" />
        <CurvedCorner size={24} rotation={0} className="left-0 -bottom-[23.5px] text-white" />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Links badge (top‑right)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-3 pr-5 pl-5 pb-3 items-center gap-3 shadow-sm border-b border-l border-zinc-100">
        <div className="flex items-center gap-6 mr-1">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-extrabold tracking-widest uppercase text-zinc-900 hover:text-brand-primary transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex items-center pl-2">
            <a href="/contact" className="relative group/btn text-sm font-bold tracking-widest uppercase text-brand-primary overflow-hidden rounded-xl px-6 py-3 transition-all duration-300 border border-brand-primary/20 bg-brand-primary/5 shadow-sm">
              <span className="relative z-10 drop-shadow-sm">Contact</span>
            </a>
          </div>
        </div>
        <CurvedCorner size={24} rotation={90} className="top-0 -left-[23.5px] text-white" />
        <CurvedCorner size={24} rotation={90} className="right-0 -bottom-[23.5px] text-white" />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE NAV
         ══════════════════════════════════════════ */}
      <div className="xl:hidden fixed top-0 left-0 w-full bg-white z-[60] flex items-center justify-between px-5 py-2 border-b border-zinc-100 shadow-sm">
        <a href="/" className="flex items-center shrink-0">
          <Image src="/logo.png" alt="Company Logo" width={180} height={48} className="h-12 w-auto object-contain" />
        </a>
        <button className="flex items-center gap-2 h-[44px] px-5 rounded-xl bg-zinc-50 text-zinc-900 border border-zinc-200 shadow-sm">
          <span className="text-sm font-bold tracking-wider uppercase">Menu</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════
          1. HERO SECTION (White Theme)
         ══════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-white">
        
        {/* Background Image & Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle radial glow to soften the white */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
          
          <Image 
            src="/how_we_work_hero_light.png" 
            alt="Global Connectivity" 
            fill 
            className="object-cover object-right opacity-80 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white z-10" />
        </div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 mt-12 md:mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-brand-primary"></span>
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Cross-Border Delivery</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-tech mb-8 text-zinc-900">
              How Our Delivery <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                Is Structured.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed max-w-2xl border-l-2 border-brand-primary/30 pl-6 py-2">
              Java Nexus delivers professional and technology-enabled services exclusively to overseas clients through a defined engagement lifecycle. Delivery is managed using standardized workflows, structured supervision, and consistent reporting to support continuity and measurable outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. THE DELIVERY LIFECYCLE (Timeline)
         ══════════════════════════════════════════ */}
      <section id="process-section" className="relative bg-[#fafafa] py-24 md:py-32 overflow-hidden text-neutral-900 border-y border-zinc-200/60 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-neutral-900 font-heading">The Delivery Lifecycle</h2>
            <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto font-body">Each engagement follows a consistent five-step delivery structure.</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto" ref={containerRef}>
            {/* Base Vertical Line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 md:-translate-x-1/2"></div>
            {/* Animated Fill Line */}
            <motion.div 
              className="absolute left-[28px] md:left-1/2 top-0 w-[3px] rounded-full md:-translate-x-[1.5px] bg-gradient-to-b from-brand-primary via-brand-primary-hover to-brand-primary origin-top"
              style={{ height: lineHeight }}
            />

            <div className="relative z-10 space-y-0">
              
              {/* STEP 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start md:items-center pt-0"
              >
                {/* Mobile View */}
                <div className="md:hidden flex w-full">
                  <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                    <div className="w-[2px] flex-1 bg-transparent"></div>
                  </div>
                  <div className="flex-1 pl-4 pb-12">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                      </div>
                      <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">01</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">Engagement scoping</h3>
                    <p className="text-neutral-500 leading-relaxed font-body">Confirm service type, scope boundaries, expected outcomes, timeline, and reporting expectations.</p>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full pb-20">
                  <div className="flex justify-end pr-8">
                    <div className="inline-flex items-center gap-5">
                      <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">01</span>
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m8 11 2 2 4-4"></path><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="pl-8">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Engagement scoping</h3>
                      <p className="text-neutral-500 leading-relaxed text-[17px] font-body">Confirm service type, scope boundaries, expected outcomes, timeline, and reporting expectations.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STEP 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start md:items-center"
              >
                {/* Mobile View */}
                <div className="md:hidden flex w-full">
                  <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                    <div className="w-[2px] flex-1 bg-transparent"></div>
                  </div>
                  <div className="flex-1 pl-4 pb-12">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      </div>
                      <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">02</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">Resource planning</h3>
                    <p className="text-neutral-500 leading-relaxed font-body">Assign the delivery team, establish coverage requirements, and set up workflows and documentation.</p>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full pb-20">
                  <div className="text-right pr-8">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Resource planning</h3>
                      <p className="text-neutral-500 leading-relaxed text-[17px] font-body">Assign the delivery team, establish coverage requirements, and set up workflows and documentation.</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="flex pl-8">
                    <div className="inline-flex items-center gap-5">
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="m9 14 2 2 4-4"></path></svg>
                      </div>
                      <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">02</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STEP 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start md:items-center"
              >
                {/* Mobile View */}
                <div className="md:hidden flex w-full">
                  <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                    <div className="w-[2px] flex-1 bg-transparent"></div>
                  </div>
                  <div className="flex-1 pl-4 pb-12">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
                      </div>
                      <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">03</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">Execution and supervision</h3>
                    <p className="text-neutral-500 leading-relaxed font-body">Deliver services under defined service frameworks with supervision and quality checks.</p>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full pb-20">
                  <div className="flex justify-end pr-8">
                    <div className="inline-flex items-center gap-5">
                      <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">03</span>
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="pl-8">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Execution and supervision</h3>
                      <p className="text-neutral-500 leading-relaxed text-[17px] font-body">Deliver services under defined service frameworks with supervision and quality checks.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STEP 4 */}
              <motion.div 
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start md:items-center"
              >
                {/* Mobile View */}
                <div className="md:hidden flex w-full">
                  <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                    <div className="w-[2px] flex-1 bg-transparent"></div>
                  </div>
                  <div className="flex-1 pl-4 pb-12">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-line-chart"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                      </div>
                      <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">04</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">Performance monitoring</h3>
                    <p className="text-neutral-500 leading-relaxed font-body">Track progress against agreed outcomes and reporting cadence, with escalation where required.</p>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full pb-20">
                  <div className="text-right pr-8">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Performance monitoring</h3>
                      <p className="text-neutral-500 leading-relaxed text-[17px] font-body">Track progress against agreed outcomes and reporting cadence, with escalation where required.</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="flex pl-8">
                    <div className="inline-flex items-center gap-5">
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>
                      </div>
                      <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">04</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* STEP 5 */}
              <motion.div 
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="relative flex items-start md:items-center"
              >
                {/* Mobile View */}
                <div className="md:hidden flex w-full">
                  <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="flex-1 pl-4 pb-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      </div>
                      <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">05</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">Continuous improvement</h3>
                    <p className="text-neutral-500 leading-relaxed font-body">Refine workflows, reporting, and execution controls to improve consistency and outcomes over time.</p>
                  </div>
                </div>
                {/* Desktop View */}
                <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full pb-0">
                  <div className="flex justify-end pr-8">
                    <div className="inline-flex items-center gap-5">
                      <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">05</span>
                      <div className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"></path><path d="m16 17 2 2 4-4"></path><path d="M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753"></path><path d="M3.29 7 12 12l8.71-5"></path><path d="m7.5 4.27 8.997 5.148"></path></svg>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-7 h-7 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]"></div>
                      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10"></div>
                      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(220,38,38,0.5)]"></div>
                    </div>
                  </div>
                  <div className="pl-8">
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">Continuous improvement</h3>
                      <p className="text-neutral-500 leading-relaxed text-[17px] font-body">Refine workflows, reporting, and execution controls to improve consistency and outcomes over time.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. OPERATIONAL EXCELLENCE
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left side: Clean Image Asset */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-video lg:aspect-square w-full max-w-2xl mx-auto rounded-[32px] overflow-hidden border border-zinc-100 shadow-[0_30px_80px_rgba(0,0,0,0.05)]"
            >
              <Image 
                src="/operational_excellence_light.png" 
                alt="Operational Excellence & Security" 
                fill 
                className="object-cover"
              />
            </motion.div>

            {/* Right side: Content */}
            <div>
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-3 mb-4">
                  <span className="h-px w-8 bg-brand-primary"></span>
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Built-in controls</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-tech tracking-tight mb-6 text-zinc-900">Operational Excellence</h2>
                <p className="text-zinc-600 font-sans text-lg mb-12">
                  We integrate robust controls directly into our delivery model to ensure consistency, security, and quality at every step of the engagement.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CONTROLS.map((control, idx) => (
                  <motion.div
                    key={control.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="relative p-8 rounded-3xl bg-white border border-zinc-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] group overflow-hidden transition-all duration-500 hover:shadow-[0_20px_40px_-8px_rgba(220,38,38,0.08)] hover:-translate-y-1"
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Animated Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 pointer-events-none" />

                    <div className="relative w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center mb-6 text-brand-primary shadow-sm group-hover:bg-brand-primary/5 group-hover:border-brand-primary/20 group-hover:scale-110 transition-all duration-500">
                      {control.icon}
                    </div>
                    <h4 className="text-zinc-900 font-bold mb-3 text-lg">{control.title}</h4>
                    <p className="text-zinc-500 text-sm leading-relaxed relative z-10">{control.desc}</p>
                    
                    {/* Hover Arrow */}
                    <div className="absolute bottom-8 right-8 text-brand-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. CTA / SCOPING
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-20 lg:py-24 bg-zinc-50 border-t border-zinc-200 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="bg-white rounded-[32px] p-8 md:p-16 border border-zinc-100 shadow-[0_20px_60px_rgba(0,0,0,0.05)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* CTA Soft Glow Effect */}
            <div className="absolute -bottom-1/2 -right-1/4 w-[600px] h-[600px] bg-brand-primary opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-tech text-zinc-900 mb-4">What to send to scope an engagement</h2>
              <p className="text-zinc-600 font-sans mb-8">
                To help us understand your needs and provide an accurate proposal, please include the following details in your initial request:
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Service type (Professional Services, Managed Services)",
                  "Scope summary and expected outcomes",
                  "Timeline requirements",
                  "Reporting, monitoring, or compliance expectations"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-zinc-700 font-sans text-sm md:text-base">
                    <span className="text-brand-primary mt-1 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 shrink-0 w-full lg:w-auto">
              <a href="/contact" className="inline-flex w-full sm:w-auto items-center justify-center gap-3 bg-brand-primary text-white font-bold tracking-widest uppercase px-10 py-6 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(220,38,38,0.2)] border border-brand-primary/20 relative group overflow-hidden">
                <span className="relative z-10">Request a service discussion</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              </a>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
