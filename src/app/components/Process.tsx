"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const processSteps = [
  {
    num: "01",
    title: "Engagement scoping",
    desc: "We define the scope of the engagement, outlining deliverables, timelines, and key objectives to ensure alignment from day one."
  },
  {
    num: "02",
    title: "Resource planning",
    desc: "We identify and allocate the right resources and expertise needed to execute the project efficiently and effectively."
  },
  {
    num: "03",
    title: "Execution and supervision",
    desc: "Our team executes the plan with precision, maintaining rigorous supervision to ensure quality and adherence to timelines."
  },
  {
    num: "04",
    title: "Performance monitoring",
    desc: "We continuously monitor performance metrics to track progress, identify issues early, and ensure project success."
  },
  {
    num: "05",
    title: "Continuous improvement",
    desc: "We leverage insights and feedback to refine processes and outcomes, driving ongoing value and innovation."
  }
];

export default function Process() {
  return (
    <section className="py-24 bg-zinc-50 text-zinc-900">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Column: Sticky Header */}
        <div className="lg:sticky lg:top-[30vh] h-fit space-y-8">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-tech font-bold tracking-wide leading-[1.1] text-zinc-900"
          >
            How delivery <span className="text-brand-primary">works</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-zinc-500 leading-relaxed max-w-lg"
          >
            Each client engagement follows a structured lifecycle to ensure predictable, high-quality outcomes.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="pt-4"
          >
            <Link href="/contact">
              <button className="inline-flex items-center justify-center font-tech uppercase tracking-widest font-bold border border-zinc-300 bg-white h-12 rounded-full px-8 text-sm hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all duration-300 group shadow-sm hover:shadow-brand-primary/20">
                Let's get started
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform duration-300">
                  <path d="M7 7h10v10"></path>
                  <path d="M7 17 17 7"></path>
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Scrolling Cards */}
        <div className="space-y-6">
          {processSteps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="group p-8 sm:p-10 rounded-3xl border border-zinc-200 bg-white hover:border-brand-primary hover:shadow-xl hover:shadow-brand-primary/5 transition-all duration-300"
            >
              <span className="block text-zinc-300 font-mono text-xl sm:text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors duration-300">
                {step.num}.
              </span>
              <h4 className="text-2xl sm:text-3xl font-tech font-bold mb-4 text-zinc-900 group-hover:text-brand-primary transition-colors duration-300">
                {step.title}
              </h4>
              <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
