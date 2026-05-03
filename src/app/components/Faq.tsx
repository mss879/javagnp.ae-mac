"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Every engagement is unique, but our standardized delivery frameworks allow us to typically complete the scoping and resource planning phases within 2 weeks. Full execution timelines are dependent on project complexity."
  },
  {
    question: "How do you ensure data security across international borders?",
    answer: "We utilize a zero-trust security infrastructure engineered with uncompromising data protection protocols. Every interaction is strictly controlled, isolated, and complies with international data sovereignty regulations."
  },
  {
    question: "Do you offer post-deployment support?",
    answer: "Yes, our continuous improvement phase ensures that we actively monitor performance metrics post-deployment, providing ongoing maintenance, updates, and strategic optimizations."
  },
  {
    question: "What makes JavaGNP different from other global consultancies?",
    answer: "We operate as a premier global delivery hub that combines local excellence with international scale. Our frictionless collaboration models and centralized governance provide unprecedented transparency and control."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white text-zinc-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden" id="faq">
      <div className="max-w-4xl mx-auto flex flex-col gap-16 lg:gap-20">
        
        {/* Header */}
        <div className="w-full text-center space-y-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-[1.1] font-tech font-semibold"
          >
            Frequently Asked <span className="text-brand-primary">Questions</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Clear, transparent answers about our methodologies, security protocols, and global delivery frameworks.
          </motion.p>
        </div>

        {/* Accordion List */}
        <div className="w-full border-t border-zinc-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative border-b border-zinc-200"
              >
                <button 
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between py-8 text-left focus:outline-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 md:gap-8 pr-8">
                    <span className={`text-lg font-mono transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-zinc-400 group-hover:text-zinc-600'}`}>
                      /0{index + 1}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-tech font-bold tracking-wide transition-colors duration-300 ${isOpen ? 'text-zinc-900' : 'text-zinc-700 group-hover:text-zinc-900'}`}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={`relative flex items-center justify-center shrink-0 w-10 h-10 transition-transform duration-500 rounded-full border ${isOpen ? 'border-brand-primary rotate-45 bg-brand-primary/10' : 'border-zinc-300 group-hover:border-zinc-500 group-hover:rotate-90'}`}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" height="24" viewBox="0 0 24 24" 
                      fill="none" stroke="currentColor" strokeWidth="1.5" 
                      strokeLinecap="round" strokeLinejoin="round" 
                      className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-brand-primary' : 'text-zinc-400 group-hover:text-zinc-700'}`}
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
                      <div className="pb-8 pl-0 md:pl-[4.5rem] pr-4 md:pr-16">
                        <p className="text-zinc-600 text-base sm:text-lg leading-relaxed">
                          {faq.answer}
                        </p>
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
