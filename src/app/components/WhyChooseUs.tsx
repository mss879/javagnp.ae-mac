"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  return (
    <section className="relative w-full bg-white text-zinc-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left Side: Copy */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >

          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-tech font-semibold">
            Global Expertise, <br />
            <span className="text-brand-primary">Local Excellence.</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-2xl font-light">
            We operate as a premier global delivery and execution hub based in Dubai. Our structured model ensures excellence through standardized processes, centralized governance, scalable human resources, and secure, cutting-edge digital infrastructure.
          </p>

          <div className="pt-8 sm:pt-4 w-full">
            <div className="grid grid-cols-3 divide-x divide-zinc-200 sm:flex sm:flex-row sm:divide-none sm:gap-6 border-y border-zinc-100 sm:border-none py-6 sm:py-0">
              <div className="flex flex-col gap-1 sm:gap-2 px-3 sm:px-0 items-center sm:items-start text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-tech text-zinc-900">50+</span>
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold leading-[1.3]">Global Partners</span>
              </div>
              
              <div className="hidden sm:block w-px bg-zinc-200" />
              
              <div className="flex flex-col gap-1 sm:gap-2 px-3 sm:px-0 items-center sm:items-start text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-tech text-zinc-900">24/7</span>
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold leading-[1.3]">Operations<br className="sm:hidden" /> Hub</span>
              </div>
              
              <div className="hidden sm:block w-px bg-zinc-200" />
              
              <div className="flex flex-col gap-1 sm:gap-2 px-3 sm:px-0 items-center sm:items-start text-center sm:text-left">
                <span className="text-2xl sm:text-3xl font-tech text-zinc-900">100%</span>
                <span className="text-[9px] sm:text-xs uppercase tracking-widest text-zinc-500 font-bold leading-[1.3]">Secure<br className="sm:hidden" /> Infrastructure</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image Grid */}
        <div className="flex-1 relative w-full aspect-square max-w-2xl">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image 
                src="/dubai/1.webp" 
                alt="Dubai Modern Office" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group mt-8 sm:mt-12"
            >
              <Image 
                src="/dubai/2.webp" 
                alt="Dubai Business District" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group -mt-8 sm:-mt-12"
            >
              <Image 
                src="/dubai/3.webp" 
                alt="Dubai Luxury Meeting Room" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image 
                src="/dubai/4.webp" 
                alt="Dubai Corporate Architecture" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />
        </div>
      </div>
    </section>
  );
}
