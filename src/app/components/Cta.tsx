"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-[1400px] mx-auto bg-zinc-950 text-white py-16 sm:py-20 px-6 sm:px-12 lg:px-20 rounded-[40px] overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl">
        
        {/* Background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-zinc-800/30 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-zinc-900 border border-zinc-800"
          >
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-zinc-400 font-tech">
              Ready to scale?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-tech font-bold tracking-wide leading-[1.1]"
          >
            Build the future of your <br className="hidden md:block" />
            global operations <span className="text-brand-primary">today.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Connect with our experts to discuss how JavaGNP can engineer predictable, high-quality outcomes for your business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="pt-6"
          >
            <Link href="/contact">
              <button className="relative inline-flex items-center justify-center font-tech uppercase tracking-widest font-bold bg-brand-primary text-white h-14 rounded-full px-8 text-base overflow-hidden group shadow-[0_0_40px_rgba(220,38,38,0.3)] hover:shadow-[0_0_60px_rgba(220,38,38,0.5)] transition-all duration-500">
                <span className="relative z-10 flex items-center">
                  Contact Us Now
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-3 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                    <path d="M7 7h10v10"></path>
                    <path d="M7 17 17 7"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
