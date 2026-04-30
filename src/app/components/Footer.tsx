"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white pb-6 sm:pb-8 px-4 sm:px-6">
      <div className="relative w-full mx-auto bg-zinc-950 text-white overflow-hidden rounded-[40px] pt-24 pb-12 px-8 sm:px-16 lg:px-24 shadow-2xl">
        
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            src="/footer.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
          />
          {/* Dark gradient overlay to ensure text is perfectly readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & About */}
            <div className="space-y-6 lg:pr-8">
              <Link href="/" className="inline-block">
                <div className="bg-white p-3 rounded-2xl shadow-xl inline-flex items-center justify-center w-fit h-fit">
                  <Image 
                    src="/logo.png" 
                    alt="JavaGNP Logo" 
                    width={200} 
                    height={64} 
                    className="h-14 sm:h-16 w-auto object-contain" 
                  />
                </div>
              </Link>
              <p className="text-zinc-300 text-sm leading-relaxed">
                We design, build, and scale cutting-edge software solutions that empower businesses to thrive in the digital age. A premier global delivery and execution hub.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-tech font-bold tracking-wide uppercase text-zinc-100">
                Company
              </h4>
              <ul className="space-y-3">
                {['About Us', 'How We Work', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-zinc-300 hover:text-brand-primary text-sm transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="space-y-6">
              <h4 className="text-lg font-tech font-bold tracking-wide uppercase text-zinc-100">
                Services
              </h4>
              <ul className="space-y-3">
                {['IT Solutions', 'Cloud & Cybersecurity', 'AI & Innovation', 'Digital Marketing'].map((item) => (
                  <li key={item}>
                    <Link href="/services" className="text-zinc-300 hover:text-brand-primary text-sm transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-6">
              <h4 className="text-lg font-tech font-bold tracking-wide uppercase text-zinc-100">
                Global HQ
              </h4>
              <address className="text-zinc-300 text-sm not-italic leading-relaxed">
                Dubai Internet City<br />
                Dubai, United Arab Emirates<br /><br />
                <a href="mailto:contact@javagnp.ae" className="hover:text-brand-primary transition-colors duration-300">
                  contact@javagnp.ae
                </a>
              </address>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-zinc-400 text-xs text-center md:text-left">
              &copy; {new Date().getFullYear()} JavaGNP. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-zinc-400 hover:text-white text-xs transition-colors duration-300">Privacy Policy</Link>
              <Link href="/terms" className="text-zinc-400 hover:text-white text-xs transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
