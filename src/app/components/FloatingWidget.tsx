"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useChat } from '@ai-sdk/react';
import ChatWindow from "./ChatWindow";

export default function FloatingWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Chat state lives HERE so it persists across open/close
  const chat = useChat();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        if (latest < 100) setIsChatOpen(false);
      }
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4"
        >
          {/* Book a Meeting */}
          <div className="relative group">
            <a
              href="/contact"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-brand-primary-light via-brand-primary to-brand-primary-dark text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden border-2 border-white/20 shadow-lg hover:scale-105"
              style={{ boxShadow: "rgba(220, 38, 38, 0.5) 0px 10px 25px -5px, rgba(255, 255, 255, 0.4) 0px 4px 10px inset, rgba(0, 0, 0, 0.2) 0px -4px 10px inset" }}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-md text-white relative z-10">
                <path d="M8 2v4"></path><path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
              </svg>
            </a>
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Book a Meeting
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="relative group">
            <a
              href="https://wa.me/971565439655"
              target="_blank"
              rel="noopener noreferrer"
              className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54] text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden border-2 border-white/20 shadow-lg hover:scale-105"
              style={{ boxShadow: "rgba(37, 211, 102, 0.5) 0px 10px 25px -5px, rgba(255, 255, 255, 0.4) 0px 4px 10px inset, rgba(0, 0, 0, 0.2) 0px -4px 10px inset" }}
            >
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none"></div>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8 drop-shadow-md text-white fill-current relative z-10">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
              </svg>
            </a>
            <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Chat on WhatsApp
              <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
            </div>
          </div>

          {/* AI Agent Button + Chat Window */}
          <div className="relative">
            <AnimatePresence>
              {isChatOpen && (
                <ChatWindow chat={chat} onClose={() => setIsChatOpen(false)} />
              )}
            </AnimatePresence>

            <div className="relative group">
              {!isChatOpen && (
                <>
                  <div className="absolute -inset-4 bg-red-600/20 rounded-full z-[-1] animate-pulse"></div>
                  <div className="absolute -inset-2 bg-red-700/40 rounded-full z-[-1] animate-pulse [animation-delay:200ms]"></div>
                </>
              )}

              <motion.button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`h-14 w-14 md:h-16 md:w-16 rounded-full text-white flex items-center justify-center transition-all duration-500 relative overflow-hidden border-4 border-white/20 active:shadow-inner hover:scale-105 ${
                  isChatOpen
                    ? 'bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-900'
                    : 'bg-gradient-to-br from-red-600 via-red-800 to-rose-950'
                }`}
                style={{
                  boxShadow: isChatOpen
                    ? "rgba(0, 0, 0, 0.4) 0px 10px 20px -5px, rgba(255, 255, 255, 0.2) 0px 4px 10px inset"
                    : "rgba(0, 0, 0, 0.6) 0px 20px 40px -10px, rgba(255, 255, 255, 0.4) 0px 4px 10px inset, rgba(0, 0, 0, 0.2) 0px -4px 10px inset"
                }}
                layout
              >
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-black/10 to-transparent rounded-br-full pointer-events-none"></div>
                <div className="relative z-10">
                  <AnimatePresence mode="wait" initial={false}>
                    {isChatOpen ? (
                      <motion.svg
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-md"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </motion.svg>
                    ) : (
                      <motion.div
                        key="chat"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-md">
                          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
                        </svg>
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-brand-primary rounded-full border-2 border-zinc-900 shadow-sm animate-bounce"></span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>

              {!isChatOpen && (
                <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-black text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  AI Assistant
                  <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-white transform rotate-45"></div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
