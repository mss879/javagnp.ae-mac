"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const servicesList = [
  {
    id: "001",
    title: "IT Solutions & Consulting",
    items: [
      "Web Design & Development",
      "App Development",
      "Software Development Services",
      "IT Staffing & Outsourcing"
    ]
  },
  {
    id: "002",
    title: "E-Commerce & Digital Business",
    items: [
      "E-Commerce Store Setup",
      "Drop Shipping / Direct Shipping",
      "Affiliate Marketing",
      "E-Book Writing & Publishing"
    ]
  },
  {
    id: "003",
    title: "Cloud & Cybersecurity",
    items: [
      "Cloud Services & Data Center Solutions",
      "Data Management",
      "Cyber Security Consultancy",
      "Digital Analytics"
    ]
  },
  {
    id: "004",
    title: "AI & Innovation",
    items: [
      "Artificial Intelligence Solutions",
      "Academic Research & Consultancy",
      "Web3 & Blockchain Services",
      "Multimedia Development"
    ]
  },
  {
    id: "005",
    title: "Digital Marketing & Branding",
    items: [
      "Social Media & Influencer Marketing",
      "Resume Writing & Career Coaching",
      "Online Recruiting Platform",
      "Virtual Assistance Services"
    ]
  },
  {
    id: "006",
    title: "Business Process Outsourcing (BPO)",
    items: [
      "Customer Service",
      "Government & Corporate Tendering Services",
      "Business Transactions & Compliance"
    ]
  },
  {
    id: "007",
    title: "Entertainment & Gaming",
    items: [
      "E-Games Equipment Trading",
      "Entertainment Hall Management",
      "Online Betting & Gaming Platform (subject to reqs)",
      "Live Streaming & Telecast Services"
    ]
  }
];

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-zinc-950 text-zinc-100 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden" id="services">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Header */}
        <div className="w-full space-y-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-tech font-bold tracking-wide leading-[1.1] text-white"
          >
            Comprehensive <span className="text-brand-primary">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg leading-relaxed max-w-2xl"
          >
            Digital systems and automation tools engineered to ensure consistency, quality control, and unparalleled reporting accuracy.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="w-full border-t border-zinc-800">
          {servicesList.map((service, index) => {
            const isOpen = openId === service.id;

            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative border-b border-zinc-800"
              >
                <button 
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between py-10 text-left focus:outline-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-8 md:gap-12">
                    <span className={`text-xl font-mono transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                      /{service.id}
                    </span>
                    <h3 className={`text-xl sm:text-2xl md:text-3xl font-tech font-bold tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className={`relative flex items-center justify-center w-10 h-10 transition-transform duration-500 rounded-full border ${isOpen ? 'border-brand-primary rotate-45 bg-brand-primary/10' : 'border-zinc-700 group-hover:border-zinc-500 group-hover:rotate-90'}`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="1.5" 
                      strokeLinecap="round" strokeLinejoin="round" 
                      className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-zinc-500 group-hover:text-white'}`}
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pl-0 md:pl-[6.5rem]">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                          {service.items.map((item, idx) => (
                            <motion.li 
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-center gap-3 text-zinc-400"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 shrink-0" />
                              <span className="text-sm sm:text-base leading-snug hover:text-zinc-200 transition-colors cursor-default">
                                {item}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
