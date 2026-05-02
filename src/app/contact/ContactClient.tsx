"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import CurvedCorner from "../components/CurvedCorner";
import Footer from "../components/Footer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
] as const;

export default function ContactClient() {
  const pathname = usePathname();
  return (
    <main className="relative w-full min-h-screen bg-gray-50 overflow-hidden font-sans text-gray-900 selection:bg-brand-primary selection:text-white">
      {/* ── Background Ambient Glow (Light Mode) ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft, glowing orbs for light theme */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-brand-tertiary/5 blur-[120px] rounded-full animate-float" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Logo badge (top‑left)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 pl-4 pr-5 pb-2 items-center justify-center pointer-events-auto shadow-sm border-b border-r border-gray-100">
        <a href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={200}
            height={56}
            className="h-14 w-auto object-contain"
          />
        </a>

        {/* curved corners matching white bg */}
        <CurvedCorner
          size={24}
          rotation={0}
          className="top-0 -right-[23.5px] text-white"
        />
        <CurvedCorner
          size={24}
          rotation={0}
          className="left-0 -bottom-[23.5px] text-white"
        />
      </div>

      {/* ══════════════════════════════════════════
          DESKTOP NAV — Links badge (top‑right)
         ══════════════════════════════════════════ */}
      <div className="hidden xl:flex absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-3 pr-5 pl-5 pb-3 items-center gap-3 pointer-events-auto shadow-sm border-b border-l border-gray-100">
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

          {/* Contact (Active State) */}
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

        {/* curved corners matching white bg */}
        <CurvedCorner
          size={24}
          rotation={90}
          className="top-0 -left-[23.5px] text-white"
        />
        <CurvedCorner
          size={24}
          rotation={90}
          className="right-0 -bottom-[23.5px] text-white"
        />
      </div>

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
            className="flex items-center gap-2 h-[44px] px-5 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm cursor-pointer"
            aria-label="Open menu"
          >
            <span className="relative w-[18px] h-[14px] shrink-0 inline-flex flex-col justify-between" aria-hidden="true">
              <span className="w-full h-[2px] bg-gray-900 rounded-sm" />
              <span className="w-full h-[2px] bg-gray-900 rounded-sm" />
              <span className="w-full h-[2px] bg-gray-900 rounded-sm" />
            </span>
            <span className="text-sm font-bold tracking-wider uppercase">Menu</span>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          PAGE CONTENT
         ══════════════════════════════════════════ */}
      <div className="relative z-20 w-full min-h-screen flex items-center justify-center px-6 py-24 sm:px-12 lg:px-20 pt-32 lg:pt-40 pb-20">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Typography & Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-brand-primary"></span>
              <span className="text-brand-primary font-bold tracking-widest uppercase text-sm">Get in Touch</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] font-tech mb-8 text-gray-900">
              Let's Build the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                Future Together
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-12 max-w-md font-sans">
              Whether you have a groundbreaking idea, need enterprise-grade software, or want to scale your operations, our team is ready to deliver.
            </p>

            <div className="space-y-8">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">Email Us</h3>
                  <a href="mailto:hello@javanexus.com" className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors">
                    hello@javanexus.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">Call Us</h3>
                  <a href="tel:+18001234567" className="text-xl font-medium text-gray-900 hover:text-brand-primary transition-colors">
                    +1 (800) 123-4567
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center shrink-0 text-brand-primary group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(220,38,38,0.1)] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-1">Headquarters</h3>
                  <p className="text-xl font-medium text-gray-900">
                    100 Innovation Drive<br />
                    Silicon Valley, CA 94025
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 relative overflow-hidden">
              {/* Form Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 blur-[80px] rounded-full pointer-events-none" />

              <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-xs font-bold tracking-widest uppercase text-gray-500">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="John"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-xs font-bold tracking-widest uppercase text-gray-500">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Doe"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold tracking-widest uppercase text-gray-500">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300"
                  />
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-xs font-bold tracking-widest uppercase text-gray-500">Inquiry Type</label>
                  <div className="relative">
                    <select
                      id="subject"
                      className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 appearance-none"
                    >
                      <option value="" disabled selected>Select an option</option>
                      <option value="enterprise">Enterprise Software Development</option>
                      <option value="cloud">Cloud Migration & Architecture</option>
                      <option value="consulting">IT Consulting</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold tracking-widest uppercase text-gray-500">Your Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="relative group/btn text-sm font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-8 py-5 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(220,38,38,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md w-full sm:w-auto min-w-[200px]"
                  >
                    <span className="relative z-10 drop-shadow-sm flex items-center justify-center gap-2">
                      Send Message
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/btn:translate-x-1 transition-transform duration-300"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0" />
                    <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
