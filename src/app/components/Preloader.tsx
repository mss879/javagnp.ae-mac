"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Abstract Geometric Elements
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const horizontalLineRef = useRef<HTMLDivElement>(null);
  
  // Text Elements
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [isFinished, setIsFinished] = useState(false);

  const words = ["JAVA", "GLOBAL", "NEXUS", "PLATFORM"];

  useGSAP(
    () => {
      if (isFinished) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setIsFinished(true);
        },
      });

      // 0. Initial Setup
      // The vertical line starts far above the screen, stretched out
      gsap.set(verticalLineRef.current, { y: -800, scaleY: 3, opacity: 0 });
      gsap.set(nodeRef.current, { scale: 0, opacity: 0 });
      gsap.set(horizontalLineRef.current, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(wordsRef.current, { y: 30, opacity: 0 });

      // 1. Phase 1: The Axis Drop
      // The line shoots down into the center, accelerating
      tl.to(verticalLineRef.current, {
        y: 0,
        scaleY: 1,
        opacity: 1,
        duration: 0.4,
        ease: "expo.in",
      });

      // 2. Phase 2: The Nexus Collapse
      // Vertical line collapses into nothing
      tl.to(verticalLineRef.current, {
        scaleY: 0,
        opacity: 0,
        duration: 0.1,
        ease: "power2.out",
      });
      // The central dot snaps open with intense energy
      tl.to(
        nodeRef.current,
        {
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: "back.out(3)",
        },
        "-=0.1"
      );

      // 3. Phase 3: The Horizontal Expansion
      // Dot disappears
      tl.to(
        nodeRef.current,
        {
          scale: 0,
          duration: 0.15,
          ease: "power2.in",
        },
        "+=0.1"
      );
      // Horizontal line violently snaps open
      tl.to(
        horizontalLineRef.current,
        {
          scaleX: 1,
          duration: 0.4,
          ease: "expo.out",
        },
        "-=0.1"
      );

      // 4. Phase 4: The Brand Reveal
      // Buttery smooth staggered text reveal
      tl.to(
        wordsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "expo.out",
          stagger: 0.04,
        },
        "-=0.2"
      );

      // 5. Fade out text and line smoothly before exit
      tl.to(
        [wordsRef.current, horizontalLineRef.current],
        {
          opacity: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.inOut",
          stagger: 0.02,
        },
        "+=0.2"
      );

      // 6. Phase 5: High-Tech Aperture Exit
      // Staggered vertical panels slide away
      tl.to(
        panelsRef.current,
        {
          yPercent: (i) => (i % 2 === 0 ? -100 : 100),
          duration: 0.6,
          ease: "power4.inOut",
          stagger: 0.05,
        },
        "-=0.1"
      );
    },
    { scope: containerRef }
  );

  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none flex"
    >
      {/* 4 Vertical Panels for Aperture Exit */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            panelsRef.current[i] = el;
          }}
          className="w-1/4 h-full bg-zinc-950"
        />
      ))}

      {/* Animation Elements Wrapper */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        
        {/* The Vertical Axis Line */}
        <div 
          ref={verticalLineRef}
          className="absolute w-[2px] h-[150px] sm:h-[250px] bg-brand-tertiary drop-shadow-[0_0_12px_rgba(59,130,246,0.9)] opacity-0 -translate-y-[800px]"
        />

        {/* The Central Nexus Dot */}
        <div
          ref={nodeRef}
          className="absolute w-3 h-3 rounded-full bg-white drop-shadow-[0_0_15px_rgba(255,255,255,1)] shadow-[0_0_30px_rgba(220,38,38,0.8)] opacity-0 scale-0"
        />

        {/* Phase 3 & 4: Expansion Line & Identity Reveal */}
        <div className="absolute flex flex-col items-center">
          <div className="flex gap-2 sm:gap-4 overflow-visible px-4 pt-4 pb-2 items-baseline">
            {words.map((w, i) => (
              <span
                key={i}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className={`text-xl sm:text-3xl md:text-4xl font-tech font-bold tracking-widest inline-flex items-start uppercase opacity-0 translate-y-[30px] ${
                  w === "JAVA" ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover" : "text-white"
                }`}
              >
                <span>{w}</span>
                {w === "PLATFORM" && (
                  <span className="text-xs sm:text-base text-brand-primary font-sans font-black ml-0.5 -mt-1 select-none leading-none">
                    ™
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* The Horizontal Expanding Line */}
          <div className="mt-2 w-[280px] sm:w-[400px] h-[2px] rounded-full overflow-hidden">
            <div 
              ref={horizontalLineRef} 
              className="w-full h-full bg-gradient-to-r from-transparent via-brand-primary to-transparent drop-shadow-[0_0_8px_rgba(220,38,38,0.8)] scale-x-0" 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
