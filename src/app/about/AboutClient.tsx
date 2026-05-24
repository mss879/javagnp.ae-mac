"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import CurvedCorner from "../components/CurvedCorner";
import Footer from "../components/Footer";
import WhyJavaGNP from "../components/WhyJavaGNP";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

const COMMODITIES = [
  { title: "Sugar Trading", desc: "Comprehensive import and export of refined and raw sugar across international markets, ensuring consistent supply and adherence to rigorous quality control standards.", image: "/commodity_sugar_1777705136143.webp" },
  { title: "Coffee & Tea", desc: "End-to-end management of premium coffee and tea trading through established, ethical supply chains, connecting global growers directly with international distributors.", image: "/commodity_coffee_1777705150764.webp" },
  { title: "Spice Trading", desc: "Strategic trading of high-grade culinary spices sourced from premium global suppliers to meet exacting international market demands.", image: "/commodity_spice_1777705166008.webp" },
  { title: "Corn & Soybeans", desc: "Large-scale trading and logistics coordination of yellow corn and soybeans within robust agricultural commodity networks, supporting global food security.", image: "/commodity_corn_soy_1777705183576.webp" }
];

const PortCityLogo = () => (
  <svg viewBox="0 0 120 120" className="w-16 h-16 object-contain" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Port City Colombo Logo Symbols */}
    <g transform="translate(10, 0)">
      {/* Left petal (purple/magenta) */}
      <path d="M50 15C36 32 24 50 30 68C33 79 46 82 50 82C40 73 35 56 43 33C45 27 48 20 50 15Z" fill="url(#portcity-purple)" />
      {/* Right petal (blue) */}
      <path d="M50 15C64 32 76 50 70 68C67 79 54 82 50 82C60 73 65 56 57 33C55 27 52 20 50 15Z" fill="url(#portcity-blue)" />
      {/* Center petal (cyan/teal) */}
      <path d="M50 8C45 25 43 45 46 68C48 76 52 76 54 68C57 45 55 25 50 8Z" fill="url(#portcity-cyan)" />
    </g>
    
    {/* Port City Colombo Text below symbol */}
    <text x="60" y="98" textAnchor="middle" fill="#0c4a6e" fontSize="6.5" fontWeight="900" letterSpacing="0.8" fontFamily="system-ui, -apple-system, sans-serif">PORT CITY</text>
    <text x="60" y="106" textAnchor="middle" fill="#00b4d8" fontSize="5.5" fontWeight="700" letterSpacing="0.5" fontFamily="system-ui, -apple-system, sans-serif">COLOMBO</text>

    <defs>
      <linearGradient id="portcity-purple" x1="24" y1="15" x2="50" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="portcity-cyan" x1="43" y1="8" x2="57" y2="68" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#0d9488" />
      </linearGradient>
      <linearGradient id="portcity-blue" x1="76" y1="15" x2="50" y2="82" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
  </svg>
);

const LICENSES = [
  {
    country: "United Arab Emirates",
    zone: "Dubai Free Zone Authority",
    logo: "/dubai-logo.webp",
    logoType: "image",
    numbers: [
      { label: "LICENSE NUMBER", val: "2624115323888" },
      { label: "REGISTRATION NUMBER", val: "2624115323888" },
      { label: "COMPANY NAME", val: "JAVA GLOBAL NEXUS PLATFORM FZE LLC" }
    ],
    docLink: "/Business License.pdf"
  },

  {
    country: "Sri Lanka",
    zone: "Department of Register of Companies",
    logo: "/Goverment Logo.jpg.jpeg",
    logoType: "image",
    numbers: [
      { label: "REGISTRATION NO.", val: "PV 00362384" }
    ],
    docLink: "/Certificate of Incorporation.pdf"
  },
  {
    country: "Sri Lanka",
    zone: "Inland Revenue Department — Source Tax Compliance Unit",
    subNote: "Confirmation Certificate of the Registration of Bookmaker through an agent or via internet with or without the use of live telecast facilities.",
    logo: "/Goverment Logo.jpg.jpeg",
    logoType: "image",
    numbers: [
      { label: "REFERENCE NO.", val: "TPR / BLT / 2026 / 1049" },
      { label: "TAXPAYER IDENTIFICATION NO. (TIN)", val: "243204429" },
      { label: "BETTING & GAMING FILE NO.", val: "BLT – 1049" },
      { label: "TYPE OF BUSINESS", val: "Through Via Internet (Online)" }
    ],
    footerNote: "Registered under the Betting and Gaming Levy Act, No. 40 of 1988 and the Betting and Gaming Levy (Amendment) Act, No. 11 of 2023.",
    docLink: "/TIN.pdf"
  }
];

const CAPABILITIES = [
  { title: "Scalable Execution", desc: "Through structured manpower planning aligned to demand." },
  { title: "Future-Proof Design", desc: "Built to adapt and evolve with changing market needs." },
  { title: "Secure Digital Operations", desc: "Designed for controlled access and data handling" },
  { title: "Standardized Delivery", desc: "Clear accountability and repeatable workflows" },
  { title: "Centralized Governance", desc: "Defined escalation and reporting mechanisms" },
  { title: "International Orientation", desc: "Designed for diversified overseas markets" }
];

export default function AboutClient() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="w-full min-h-screen bg-white text-zinc-900 selection:bg-brand-primary selection:text-white font-sans">
      
      {/* ══════════════════════════════════════════
          DESKTOP NAV
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 pl-4 pr-5 pb-2 items-center justify-center shadow-sm border-b border-r border-zinc-100">
        <a href="/" className="flex items-center">
          <Image src="/logo.png" alt="Company Logo" width={200} height={56} className="h-14 w-auto object-contain" />
        </a>
        <CurvedCorner size={24} rotation={0} className="top-0 -right-[23.5px] text-white" />
        <CurvedCorner size={24} rotation={0} className="left-0 -bottom-[23.5px] text-white" />
      </div>

      <div className="hidden xl:flex absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-3 pr-5 pl-5 pb-3 items-center gap-3 shadow-sm border-b border-l border-zinc-100">
        <div className="flex items-center gap-6 mr-1">
          {NAV_LINKS.map((l) => {
            const isActive = pathname === l.href || (l.href !== '/' && pathname?.startsWith(l.href));
            return (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-4 py-2 text-sm font-extrabold tracking-widest uppercase transition-all duration-300 group flex items-center justify-center ${
                  isActive ? "text-brand-primary" : "text-zinc-900"
                }`}
              >
                {/* Hover Pill Background */}
                {!isActive && (
                  <span className="absolute inset-0 bg-zinc-100 rounded-xl scale-50 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100 z-0" />
                )}
                
                {/* Active Pill Background */}
                {isActive && (
                  <span className="absolute inset-0 bg-brand-primary/5 border border-brand-primary/10 rounded-xl z-0 shadow-[inset_0_0_12px_rgba(220,38,38,0.02)]" />
                )}

                {/* Text & Active Dot */}
                <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                   {isActive && (
                     <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(220,38,38,0.6)] animate-pulse" />
                   )}
                   <span className="group-hover:text-brand-primary transition-colors duration-300">{l.label}</span>
                </span>
              </a>
            );
          })}
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
          1. HERO SECTION
         ══════════════════════════════════════════ */}
      <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] flex items-center pt-24 pb-12 overflow-hidden bg-white z-10">
        <motion.div style={{ y }} className="absolute inset-0 z-0 pointer-events-none">
          <Image 
            src="/about_hero_light_v2_1777704696034.webp" 
            alt="Corporate Headquarters" 
            fill 
            className="object-cover opacity-50 mix-blend-multiply"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80 z-10 pointer-events-none" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary opacity-[0.03] blur-[120px] rounded-full z-10 pointer-events-none" />

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 mt-12 md:mt-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-brand-primary"></span>
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Our Identity</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.05] mb-8 text-zinc-900 font-tech font-semibold">
              About <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                JavaGNP.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed max-w-2xl border-l-2 border-brand-primary/30 pl-6 py-2 bg-white/40 backdrop-blur-sm rounded-r-xl">
              JAVA GLOBAL NEXUS PLATFORM FZE LLC is established as a group-aligned operating entity within an international services framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. GROUP STRUCTURE & FOUNDATION
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-[#fafafa] border-t border-zinc-200 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* The Foundation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-[32px] bg-white border border-zinc-200/60 shadow-sm"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs">The Foundation</span>
              </div>
              <h2 className="text-3xl text-zinc-900 mb-6 font-tech font-semibold">Parent Company</h2>
              <h3 className="text-xl text-brand-primary mb-4 font-tech font-semibold">PEY AND CEY WORLD WIDE SUGAR TRADING LLC</h3>
              <p className="text-zinc-600 leading-relaxed">
                The parent company is a mainland limited liability company incorporated in Dubai, United Arab Emirates, established in 2023.
              </p>
            </motion.div>

            {/* Group Structure */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative p-10 md:p-12 rounded-[32px] bg-white border border-zinc-200/60 shadow-sm"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="text-brand-primary font-bold tracking-widest uppercase text-xs">Group Structure</span>
              </div>
              <h2 className="text-3xl text-zinc-900 mb-6 font-tech font-semibold">Operational Alignment</h2>
              <p className="text-zinc-600 leading-relaxed mb-8">
                Strategic oversight, service standards, and market engagement are guided by the parent company, while execution, monitoring, and delivery functions are centralized within the Sri Lankan operation.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Continuity of operations", "Established service governance", "Controlled scaling of resources", "Clear accountability across jurisdictions"].map((item, idx) => (
                   <div key={idx} className="flex items-start gap-3">
                     <span className="text-brand-primary mt-1">✓</span>
                     <span className="text-zinc-700 text-sm font-medium">{item}</span>
                   </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. GLOBAL TRADE NETWORKS
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-white border-t border-zinc-200 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
             {/* LEFT COLUMN: Sticky */}
             <div className="w-full lg:w-5/12 lg:sticky lg:top-32 h-fit">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
               >
                 <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-brand-primary"></span>
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Global Trade Networks</span>
                 </div>
                 <h2 className="text-4xl lg:text-5xl tracking-tight text-zinc-900 mb-6 font-tech font-semibold">Core Operations</h2>
                 <p className="text-lg text-zinc-600 font-sans leading-relaxed mb-10">
                   The parent company operates within established international trading networks and maintains overseas commercial relationships across multiple markets, driving diversified commodity trading.
                 </p>
                 <div className="relative w-10/12 aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-zinc-100 hidden lg:block">
                   <Image src="/about_commodities_1777704106727.webp" alt="Commodity Trading" fill className="object-cover" />
                 </div>
               </motion.div>
             </div>

             {/* RIGHT COLUMN: Scrolling Products */}
             <div className="w-full lg:w-7/12 flex flex-col gap-6">
                {COMMODITIES.map((com, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.1 }}
                    className="p-6 sm:p-8 rounded-[32px] bg-white/60 backdrop-blur-xl border border-zinc-200/80 group hover:bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-brand-primary/30 transition-all duration-500 flex flex-col sm:flex-row gap-8 items-center sm:items-start"
                  >
                     <div className="w-full sm:w-40 h-56 sm:h-40 shrink-0 relative rounded-2xl overflow-hidden shadow-md border border-zinc-200/50 bg-zinc-50">
                       <Image src={com.image} alt={com.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                     </div>
                     <div className="flex-1 text-center sm:text-left flex flex-col justify-center h-full">
                       <div className="inline-flex items-center justify-center sm:justify-start gap-2 mb-3">
                         <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                         <span className="text-xs font-bold tracking-widest uppercase text-zinc-500">Global Vertical</span>
                       </div>
                       <h3 className="text-2xl text-zinc-900 mb-3 font-tech font-semibold">{com.title}</h3>
                       <p className="text-zinc-600 text-sm md:text-base leading-relaxed">{com.desc}</p>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. REGULATORY PRESENCE & EXPANSION
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-[#fafafa] border-t border-zinc-200 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center max-w-4xl mx-auto"
          >
             <h2 className="text-4xl lg:text-5xl tracking-tight text-zinc-900 mb-6 font-tech font-semibold">Global Regulatory Presence</h2>
             <p className="text-lg text-zinc-600 font-sans leading-relaxed">
               Operating with full compliance and structural transparency across established international trade jurisdictions. Its operational maturity, financial continuity, and exposure to cross-border trade provide the foundation for group-level expansion into technology-enabled and platform-based global service delivery models.
             </p>
          </motion.div>

          <div className="flex flex-col gap-8 w-full max-w-5xl mx-auto">
            {LICENSES.map((lic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="w-full p-8 sm:p-10 rounded-[32px] bg-white border border-zinc-200/60 shadow-sm hover:shadow-md hover:border-brand-primary/20 transition-all duration-300 group"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6 w-full">
                  {/* Logo Box */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center bg-white border border-zinc-100 rounded-3xl shadow-sm shrink-0 p-3 transition-transform duration-300 group-hover:scale-105">
                    {lic.logoType === "svg" ? (
                      <PortCityLogo />
                    ) : (
                      <Image 
                        src={lic.logo || "/Goverment Logo.jpg.jpeg"} 
                        alt={`${lic.country} Logo`} 
                        width={112} 
                        height={112} 
                        className="object-contain w-full h-full" 
                      />
                    )}
                  </div>

                  {/* Text Details & Fields */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col">
                      <h3 className="text-2xl text-zinc-900 font-tech font-semibold tracking-tight">
                        {lic.country}
                      </h3>
                      <p className="text-zinc-500 font-medium text-sm sm:text-base leading-snug mt-1">
                        {lic.zone}
                      </p>
                      {lic.subNote && (
                        <p className="text-xs sm:text-sm text-zinc-400 italic mt-2 leading-relaxed max-w-2xl">
                          {lic.subNote}
                        </p>
                      )}
                    </div>

                    {/* Styled fields in grid */}
                    <div className="flex flex-wrap gap-x-6 gap-y-4 mt-6">
                      {lic.numbers.map((num, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[10px] md:text-[11px] text-zinc-400 font-extrabold tracking-wider uppercase mb-1.5 leading-none">
                            {num.label}
                          </span>
                          <div className="bg-zinc-50 border border-zinc-200/60 rounded-xl px-4 py-2.5 text-zinc-800 font-mono font-bold text-sm md:text-base shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] inline-block select-all">
                            {num.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer Note (if exists) */}
                    {lic.footerNote && (
                      <p className="text-[11px] sm:text-xs text-zinc-400 italic mt-6 pt-4 border-t border-zinc-100 max-w-2xl leading-relaxed">
                        {lic.footerNote}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. WHY JAVAGNP
         ══════════════════════════════════════════ */}
      <div className="border-t border-zinc-200 w-full z-20 bg-white">
        <WhyJavaGNP />
      </div>

      {/* ══════════════════════════════════════════
          6. GOVERNANCE & OVERSIGHT
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-[#fafafa] border-y border-zinc-200 z-20 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand-primary opacity-[0.02] blur-[100px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                 <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-8 bg-brand-primary"></span>
                  <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Governance</span>
                </div>
                <h2 className="text-4xl lg:text-5xl tracking-tight text-zinc-900 mb-6 font-tech font-semibold">Unified Group Oversight Model</h2>
                <p className="text-lg text-zinc-600 font-sans leading-relaxed mb-10">
                  Governance is maintained through a unified group oversight model, with strategic direction provided by the parent company and operational accountability exercised at the local entity level.
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-zinc-900 mb-4 border-b border-zinc-200 pb-2 font-tech font-semibold">Governance Mechanisms</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {["Defined approval hierarchies", "Periodic performance reviews", "Group-aligned policy frameworks"].map((item, i) => (
                         <li key={i} className="flex items-center gap-2 text-zinc-700 text-sm">
                           <span className="text-brand-primary">■</span> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-zinc-900 mb-4 border-b border-zinc-200 pb-2 font-tech font-semibold">Compliance Practices</h4>
                    <p className="text-zinc-600 text-sm leading-relaxed">
                      Compliance practices appropriate for international service delivery include contractual compliance, internal audits, and continuous monitoring mechanisms.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-zinc-100"
            >
              <Image src="/about_governance_1777704122669.webp" alt="Corporate Governance" fill className="object-cover" />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FOOTER CTA
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-20 bg-white z-20 text-center px-6 overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-brand-primary text-white p-12 md:p-20 rounded-[40px] shadow-xl relative overflow-hidden"
          >
            {/* Subtle background light overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl leading-relaxed mb-8 font-tech font-semibold max-w-4xl mx-auto">
              "We are positioned as a scalable export services platform within an established international group structure, supporting operational stability and sustained foreign revenue generation through cross-border service delivery."
            </h2>
            <p className="text-white/80 font-medium tracking-widest uppercase text-xs md:text-sm">
              JAVA GLOBAL NEXUS PLATFORM FZE LLC
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
