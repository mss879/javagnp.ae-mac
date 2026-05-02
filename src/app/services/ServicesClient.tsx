"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import CurvedCorner from "../components/CurvedCorner";
import Footer from "../components/Footer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

const SERVICES = [
  {
    id: "01",
    title: "IT Solutions & Consulting",
    image: "/it_solutions_pro_1777702744219.webp",
    items: [
      "Web Design & Development",
      "App Development",
      "Software Development Services",
      "IT Staffing & Outsourcing"
    ]
  },
  {
    id: "02",
    title: "E-Commerce & Digital Business",
    image: "/ecommerce_pro_v2_1777703249592.webp",
    items: [
      "E-Commerce Store Setup",
      "Drop Shipping / Direct Shipping",
      "Affiliate Marketing",
      "E-Book Writing & Publishing"
    ]
  },
  {
    id: "03",
    title: "Cloud & Cybersecurity",
    image: "/cybersecurity_pro_1777702777034.webp",
    items: [
      "Cloud Services & Data Center Solutions",
      "Data Management",
      "Cyber Security Consultancy",
      "Digital Analytics"
    ]
  },
  {
    id: "04",
    title: "AI & Innovation",
    image: "/ai_innovation_pro_v2_1777703265026.webp",
    items: [
      "Artificial Intelligence Solutions",
      "Academic Research & Consultancy",
      "Web3 & Blockchain Services",
      "Multimedia Development"
    ]
  },
  {
    id: "05",
    title: "Digital Marketing & Branding",
    image: "/digital_marketing_pro_1777702851661.webp",
    items: [
      "Social Media & Influencer Marketing",
      "Resume Writing & Career Coaching",
      "Online Recruiting Platform",
      "Virtual Assistance Services"
    ]
  },
  {
    id: "06",
    title: "Business Process Outsourcing (BPO)",
    image: "/bpo_pro_1777702867098.webp",
    items: [
      "Customer Service",
      "Government & Corporate Tendering Services",
      "Business Transactions & Compliance"
    ]
  },
  {
    id: "07",
    title: "Entertainment & Gaming",
    image: "/gaming_pro_1777702882023.webp",
    items: [
      "E-Games Equipment Trading",
      "Entertainment Hall Management",
      "Online Betting & Gaming Platform (subject to reqs)",
      "Live Streaming & Telecast Services"
    ]
  }
];

export default function ServicesClient() {
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
          1. HERO SECTION (White Premium Theme)
         ══════════════════════════════════════════ */}
      <section ref={containerRef} className="relative w-full h-[80vh] min-h-[600px] flex items-center pt-24 pb-12 overflow-hidden bg-white z-10">
        
        {/* Background Layer with Parallax */}
        <motion.div 
          style={{ y }} 
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <Image 
            src="/services_hero_light_1777702408280.webp" 
            alt="Corporate IT Services Background" 
            fill 
            className="object-cover object-right opacity-60 mix-blend-multiply"
            priority
          />
        </motion.div>

        {/* Overlays to soften the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/80 z-10 pointer-events-none" />
        
        {/* Glow Orb to add a subtle pop of brand color */}
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
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">What We Do</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-[1.05] font-tech mb-8 text-zinc-900">
              Comprehensive <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                Digital Solutions.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed max-w-2xl border-l-2 border-brand-primary/30 pl-6 py-2 bg-white/40 backdrop-blur-sm rounded-r-xl">
              Digital systems and automation tools engineered to ensure consistency, quality control, and unparalleled reporting accuracy for your enterprise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          2. SERVICES SHOWCASE
         ══════════════════════════════════════════ */}
      <section className="relative w-full pb-32 bg-[#fafafa] border-t border-zinc-200 z-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 pt-24 md:pt-32 relative">
          
          {SERVICES.map((service, index) => {
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="sticky top-[7.5vh] lg:top-[12.5vh] flex flex-col lg:flex-row gap-0 items-stretch bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] rounded-[40px] overflow-hidden mb-[10vh] h-[85vh] lg:h-[75vh] max-h-[800px] border border-zinc-200"
              >
                {/* Content Side */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-brand-primary font-tech text-xl font-bold shadow-sm">
                      {service.id}
                    </div>
                  </div>
                  
                  <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.1] font-tech font-bold tracking-tight text-zinc-900 mb-6">
                    {service.title}
                  </h2>
                  
                  <div className="w-16 h-1 bg-brand-primary mb-8 rounded-full" />
                  
                  <ul className="space-y-4">
                    {service.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-4 group">
                        <div className="w-7 h-7 rounded-full bg-brand-primary/5 border border-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-primary transition-all duration-300">
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary group-hover:text-white transition-colors duration-300">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-lg md:text-xl text-zinc-600 font-sans leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10">
                     <a href="/contact" className="inline-flex items-center justify-center gap-3 bg-zinc-900 text-white font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl hover:bg-brand-primary transition-colors duration-300 group shadow-lg w-fit">
                       Discuss this service
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                     </a>
                  </div>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2 relative h-1/2 lg:h-full shrink-0">
                  <div className="absolute inset-0 bg-zinc-900/5 mix-blend-multiply z-10 pointer-events-none" />
                  <Image 
                    src={service.image} 
                    alt={service.title} 
                    fill 
                    className="object-cover"
                  />
                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* ══════════════════════════════════════════
          3. MANAGED SERVICES
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-white overflow-hidden z-20 border-t border-zinc-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary opacity-[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-brand-primary"></span>
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Ongoing Support</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Managed Services</h2>
            <p className="text-lg text-zinc-600 font-sans leading-relaxed">
              Continuous operational support functions delivered through dedicated teams operating under defined service frameworks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Operational support",
                desc: "Delivered under structured service management frameworks to ensure reliability and consistency.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              },
              {
                title: "Network & systems coordination",
                desc: "Comprehensive coordination services to maintain robust and secure network infrastructures.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
              },
              {
                title: "Social media app development",
                desc: "End-to-end development and ongoing operational management support for social media applications.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="12" y2="12"/><line x1="12" x2="12" y1="8" y2="16"/></svg>
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-8 rounded-3xl bg-zinc-50/50 backdrop-blur-xl border border-zinc-200/60 shadow-[0_8px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(220,38,38,0.1)] transition-all duration-500 hover:-translate-y-1 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent opacity-50 rounded-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{item.title}</h3>
                  <p className="text-zinc-600 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          4. INTERNAL CAPABILITIES
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-[#fafafa] overflow-hidden z-20 border-t border-zinc-200">
        <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-brand-primary opacity-[0.02] blur-[150px] rounded-full pointer-events-none -translate-y-1/2" />
        
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Data Infrastructure */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-[32px] bg-white/80 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-brand-primary"></span>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Data Infrastructure</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Data Services</h2>
              <p className="text-zinc-600 font-sans leading-relaxed mb-10">
                Structured support for data handling, validation, and processing to improve accuracy, control, and reporting consistency.
              </p>
              
              <div className="space-y-6">
                <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wider border-b border-zinc-100 pb-2">Core Capabilities</h4>
                <ul className="space-y-4">
                  {["Data Validation & Cleansing", "Structured Processing", "Reporting Consistency"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-zinc-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Technology Enablement */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-10 md:p-12 rounded-[32px] bg-white/80 backdrop-blur-xl border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-brand-primary"></span>
                <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Internal Capabilities</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Technology Enablement</h2>
              <p className="text-zinc-600 font-sans leading-relaxed mb-10">
                Technology is deployed as an internal capability to strengthen operational control and service consistency.
              </p>
              
              <div className="space-y-6">
                <h4 className="font-bold text-zinc-900 text-sm uppercase tracking-wider border-b border-zinc-100 pb-2">Capabilities</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["Workflow orchestration", "Knowledge repositories", "Performance dashboards", "Secure data handling"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      <span className="text-zinc-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 p-4 bg-zinc-50 border border-zinc-100 rounded-xl">
                  <p className="text-sm text-zinc-500 italic">
                    * These capabilities enhance efficiency without forming independent revenue products.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          5. GOVERNANCE & CONTROL
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 bg-white overflow-hidden z-20 border-y border-zinc-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-tech font-bold tracking-tight text-zinc-900 mb-6">Governance & Control</h2>
            <p className="text-lg text-zinc-600 font-sans leading-relaxed">
              Ensuring consistency, security, and mitigation across all operational aspects.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Risk Management */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-zinc-50/50 border border-zinc-200/60 shadow-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center text-brand-primary mb-8 shadow-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Risk Management</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                Key risks are managed through structured controls, standardized processes, and rigorous oversight mechanisms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {["Market diversification risk", "Service continuity risk", "Data & information security", "Operational scaling risk"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <span className="text-zinc-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mitigation Strategy */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-10 rounded-3xl bg-zinc-50/50 border border-zinc-200/60 shadow-sm flex flex-col"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-zinc-100 flex items-center justify-center text-brand-primary mb-8 shadow-sm">
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">Mitigation Strategy</h3>
              <p className="text-zinc-600 mb-8 leading-relaxed">
                Mitigation is achieved through standardized processes, secure systems, and periodic internal reviews. Every operational step consists of multiple checkpoints.
              </p>
              
              <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-zinc-200">
                <div>
                  <h4 className="font-bold text-zinc-900 mb-3">Standardized Workflows</h4>
                  <ul className="space-y-2">
                    <li className="text-zinc-600 text-sm flex items-center gap-2"><span className="text-brand-primary">✓</span> Financial control & reporting</li>
                    <li className="text-zinc-600 text-sm flex items-center gap-2"><span className="text-brand-primary">✓</span> Information security protocols</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 mb-3">Internal Policies</h4>
                  <ul className="space-y-2">
                    <li className="text-zinc-600 text-sm flex items-center gap-2"><span className="text-brand-primary">✓</span> Operational monitoring</li>
                    <li className="text-zinc-600 text-sm flex items-center gap-2"><span className="text-brand-primary">✓</span> HR governance</li>
                  </ul>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          6. CTA (Light Theme)
         ══════════════════════════════════════════ */}
      <section className="relative w-full py-24 lg:py-32 bg-white border-t border-zinc-100 z-20 overflow-hidden">
        {/* Soft Glow Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-[1000px] mx-auto px-6 sm:px-12 lg:px-20 text-center relative z-10">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="bg-zinc-50 border border-zinc-100 p-12 md:p-20 rounded-[32px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <h2 className="text-3xl md:text-5xl font-tech text-zinc-900 mb-6 font-bold">Ready to elevate your digital presence?</h2>
            <p className="text-zinc-600 font-sans text-lg mb-10 max-w-2xl mx-auto">
              Partner with JavaGNP to access world-class technology solutions, scalable infrastructure, and dedicated professional services.
            </p>
            <a href="/contact" className="inline-flex items-center justify-center gap-3 bg-brand-primary text-white font-bold tracking-widest uppercase px-10 py-5 rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(220,38,38,0.2)] border border-brand-primary/20 relative group overflow-hidden mx-auto">
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
