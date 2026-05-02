"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyJavaGNP() {
  return (
    <section className="py-24 px-6 sm:px-12 lg:px-20 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 flex flex-col items-center text-center">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-tech font-bold tracking-wide leading-[1.1] text-zinc-900"
          >
            Why <span className="text-brand-primary">JavaGNP</span>
          </motion.h2>
        </div>

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>

        {/* Bento Grid (Original 4-Column Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(180px,auto)] lg:auto-rows-[220px]">

          {/* Item 1: Scalable (2x3) with Marquee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 md:col-span-2 row-span-3 relative rounded-[32px] overflow-hidden bg-zinc-100 p-8 sm:p-10 lg:p-12 border border-zinc-200 shadow-xl shadow-zinc-200/50 flex flex-col justify-between"
          >


            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center mb-6 shadow-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between gap-10 mt-auto">
              <div className="max-w-xl space-y-4">
                <h3 className="text-3xl font-tech font-bold md:text-[40px] tracking-wide text-zinc-900 leading-tight">
                  Infinite Scalability &<br />Adaptive Engineering
                </h3>
                <p className="text-sm text-zinc-600 md:text-base leading-relaxed max-w-lg">
                  Intelligent resource allocation tailored to your operational demands. Our architecture is designed to organically expand alongside your business, delivering frictionless growth and resilient performance.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white/50 p-4 backdrop-blur-sm w-full">
                <div className="flex min-w-max gap-4 animate-marquee hover:[animation-play-state:paused]" aria-hidden="true">
                  {[
                    { title: "Core Operations", src: "/javagap/uniform/core.png" },
                    { title: "Global Reach", src: "/javagap/uniform/globe.png" },
                    { title: "Secure Systems", src: "/javagap/uniform/security.png" },
                    { title: "Structured Delivery", src: "/javagap/uniform/delivery.png" },
                    { title: "Scalable Tech", src: "/javagap/uniform/scale.png" },
                    { title: "Core Operations", src: "/javagap/uniform/core.png" },
                    { title: "Global Reach", src: "/javagap/uniform/globe.png" },
                    { title: "Secure Systems", src: "/javagap/uniform/security.png" },
                    { title: "Structured Delivery", src: "/javagap/uniform/delivery.png" },
                    { title: "Scalable Tech", src: "/javagap/uniform/scale.png" },
                  ].map((item, idx) => (
                    <div key={idx} className="group relative flex w-[210px] shrink-0 flex-col gap-3 cursor-pointer">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-zinc-100 border border-zinc-300 shadow-sm">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover transition duration-500"
                        />
                        {/* Gradient overlay only at the bottom for text readability */}
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-100 via-zinc-100/80 to-transparent opacity-90" />
                        <div className="pointer-events-none absolute inset-x-3 bottom-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 bg-white shadow-sm">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-900">
                                <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
                              </svg>
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                              {item.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Item 2: Security (1x2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 md:col-span-1 row-span-2 relative rounded-[32px] overflow-hidden bg-zinc-50 text-zinc-900 p-8 flex flex-col justify-end group shadow-lg shadow-zinc-200/50 border border-zinc-200"
          >
            <div className="absolute inset-0 z-0 top-0 h-[65%] overflow-hidden rounded-t-[32px]">
              <video
                src="/Padlock_pulsing_red_light_data_202604291724.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-90 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-50 via-zinc-50/80 to-transparent pointer-events-none" />
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-tech font-bold mb-2 tracking-wide">Zero-Trust Security Infrastructure</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Engineered with uncompromising data protection protocols, ensuring every interaction remains strictly controlled, isolated, and completely secure.
              </p>
            </div>
          </motion.div>

          {/* Item 3: Standardized Delivery (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-1 md:col-span-1 row-span-1 relative rounded-[32px] overflow-hidden bg-white text-zinc-900 p-8 flex flex-col justify-center shadow-lg shadow-zinc-200/50 border border-zinc-200 transition-colors duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-tech font-bold mb-2 tracking-wide">Predictable, Agile Delivery</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Streamlined processes and proven frameworks that guarantee consistent, high-quality outcomes with total transparency.
              </p>
            </div>
          </motion.div>

          {/* Item 4: Centralized Governance (1x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="col-span-1 md:col-span-1 row-span-1 relative rounded-[32px] overflow-hidden bg-white text-zinc-900 p-8 flex flex-col justify-center shadow-lg shadow-zinc-200/50 border border-zinc-200 transition-colors duration-300"
          >
            <div className="relative z-10">
              <h3 className="text-lg font-tech font-bold mb-2 tracking-wide">Intelligent Oversight & Control</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Robust governance models featuring transparent reporting layers and automated escalation paths to maintain complete operational command.
              </p>
            </div>
          </motion.div>

          {/* Item 5: Global First (2x1) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="col-span-1 md:col-span-2 row-span-1 relative rounded-[32px] overflow-hidden bg-zinc-950 text-white p-8 flex flex-col sm:flex-row items-center sm:justify-between gap-6 group shadow-xl border border-zinc-800"
          >
            <div className="absolute inset-0 z-0">
              <video
                src="/Earth_globe_rotating_with_neon_202604291748.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover opacity-40 transition-all duration-700 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
            </div>
            <div className="relative z-10 flex-1">
              <h3 className="text-2xl font-tech font-bold mb-2 tracking-wide text-brand-primary">Borderless Global Integration</h3>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-sm">
                Architected from the ground up for international scale, enabling frictionless collaboration and unified operations across diverse geopolitical markets.
              </p>
            </div>
            <div className="relative z-10 w-16 h-16 rounded-full bg-brand-primary/20 border border-brand-primary/50 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
