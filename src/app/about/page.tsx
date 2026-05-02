"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  { title: "Sugar Trading", desc: "Comprehensive import and export of refined and raw sugar across international markets, ensuring consistent supply and adherence to rigorous quality control standards.", image: "/commodity_sugar_1777705136143.png" },
  { title: "Coffee & Tea", desc: "End-to-end management of premium coffee and tea trading through established, ethical supply chains, connecting global growers directly with international distributors.", image: "/commodity_coffee_1777705150764.png" },
  { title: "Spice Trading", desc: "Strategic trading of high-grade culinary spices sourced from premium global suppliers to meet exacting international market demands.", image: "/commodity_spice_1777705166008.png" },
  { title: "Corn & Soybeans", desc: "Large-scale trading and logistics coordination of yellow corn and soybeans within robust agricultural commodity networks, supporting global food security.", image: "/commodity_corn_soy_1777705183576.png" }
];

const LICENSES = [
  { 
    country: "United Arab Emirates", 
    zone: "Ras Al Khaimah Free Zone",
    numbers: [
      { label: "REGISTRATION NO.", val: "0000004082362" },
      { label: "TRADE LICENSE NO.", val: "47029062" },
      { label: "TRADE LICENSE NO.", val: "46001825" }
    ]
  },
  { 
    country: "Sri Lanka", 
    zone: "Colombo Port City",
    numbers: [
      { label: "REGISTRATION NO.", val: "PCC 00361397" }
    ]
  },
  { 
    country: "Sri Lanka", 
    zone: "Government Registration",
    numbers: [
      { label: "COMPANY REGISTRATION NO.", val: "PV 00351228" }
    ]
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

export default function AboutPage() {
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
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-extrabold tracking-widest uppercase text-zinc-900 hover:text-brand-primary transition-colors">
              {l.label}
            </a>
          ))}
          <div className="flex items-center pl-2">
            <a href="/contact" className="relative group/btn text-sm font-bold tracking-widest uppercase text-brand-primary overflow-hidden rounded-xl px-6 py-3 transition-all duration-300 border border-brand-primary/20 bg-brand-primary/5 shadow-sm hover:bg-brand-primary hover:text-white">
              <span className="relative z-10 drop-shadow-sm transition-colors">Contact</span>
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
            src="/about_hero_light_v2_1777704696034.png" 
            alt="Corporate Headquarters" 
            fill 
            className="object-cover opacity-50 mix-blend-multiply"
            priority
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white z-10 pointer-events-none" />
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
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-tech mb-8 text-zinc-900">
              About <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                JavaGNP.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed max-w-2xl border-l-2 border-brand-primary/30 pl-6 py-2 bg-white/40 backdrop-blur-sm rounded-r-xl">
              Java Global Access Platform FZ-LLC is established as a group-aligned operating entity within an international services framework.
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
              <h2 className="text-3xl font-tech font-bold text-zinc-900 mb-6">Parent Company</h2>
              <h3 className="text-xl font-bold text-brand-primary mb-4">PEY AND CEY WORLD WIDE SUGAR TRADING LLC</h3>
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
              <h2 className="text-3xl font-tech font-bold text-zinc-900 mb-6">Operational Alignment</h2>
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
                 <h2 className="text-4xl lg:text-5xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Core Operations</h2>
                 <p className="text-lg text-zinc-600 font-sans leading-relaxed mb-10">
                   The parent company operates within established international trading networks and maintains overseas commercial relationships across multiple markets, driving diversified commodity trading.
                 </p>
                 <div className="relative w-10/12 aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-zinc-100 hidden lg:block">
                   <Image src="/about_commodities_1777704106727.png" alt="Commodity Trading" fill className="object-cover" />
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
                       <h3 className="text-2xl font-tech font-bold text-zinc-900 mb-3">{com.title}</h3>
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
             <h2 className="text-4xl lg:text-5xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Global Regulatory Presence</h2>
             <p className="text-lg text-zinc-600 font-sans leading-relaxed">
               Operating with full compliance and structural transparency across established international trade jurisdictions. Its operational maturity, financial continuity, and exposure to cross-border trade provide the foundation for group-level expansion into technology-enabled and platform-based global service delivery models.
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LICENSES.map((lic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white border border-zinc-200/60 shadow-sm"
              >
                 <div className="mb-6">
                   <h3 className="text-lg font-bold text-brand-primary">{lic.country}</h3>
                   <p className="text-zinc-500 font-medium text-sm">{lic.zone}</p>
                 </div>
                 <div className="space-y-4 pt-6 border-t border-zinc-100">
                    {lic.numbers.map((num, i) => (
                      <div key={i}>
                        <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{num.label}</p>
                        <p className="text-zinc-900 font-mono font-medium">{num.val}</p>
                      </div>
                    ))}
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
                <h2 className="text-4xl lg:text-5xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Unified Group Oversight Model</h2>
                <p className="text-lg text-zinc-600 font-sans leading-relaxed mb-10">
                  Governance is maintained through a unified group oversight model, with strategic direction provided by the parent company and operational accountability exercised at the local entity level.
                </p>

                <div className="space-y-8">
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Governance Mechanisms</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {["Defined approval hierarchies", "Periodic performance reviews", "Group-aligned policy frameworks"].map((item, i) => (
                         <li key={i} className="flex items-center gap-2 text-zinc-700 text-sm">
                           <span className="text-brand-primary">■</span> {item}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Compliance Practices</h4>
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
              <Image src="/about_governance_1777704122669.png" alt="Corporate Governance" fill className="object-cover" />
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          7. FOOTER CTA
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-brand-primary text-white z-20 text-center px-6">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mx-auto"
         >
           <h2 className="text-3xl md:text-4xl lg:text-5xl font-tech font-bold leading-tight mb-8">
             "We are positioned as a scalable export services platform within an established international group structure, supporting operational stability and sustained foreign revenue generation through cross-border service delivery."
           </h2>
           <p className="text-white/80 font-medium tracking-widest uppercase text-sm">
             Java Global Access Platform FZ-LLC
           </p>
         </motion.div>
      </section>

      <Footer />
    </main>
  );
}
