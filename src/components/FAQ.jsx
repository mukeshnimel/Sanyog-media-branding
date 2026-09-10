"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    q: "What services does Sanyog Media Concepts specialize in?",
    a: "We specialize in end-to-end branding and design services, including custom logo design, B2B informational websites (WordPress / Custom React), retail packaging designs, graphic designs (pamphlets, signages), and premium international exhibition booth design and fabrication.",
  },
  {
    q: "Do you manage booth fabrication outside of Goregaon/Mumbai?",
    a: "Yes. Sanyog Media Concepts manages booth design and fabrication projects across major expos in India, U.A.E (Dubai), Germany, Bangkok, and Nepal.",
  },
  {
    q: "Who owns the design copyright after final delivery?",
    a: "We transfer 100% complete legal copyright ownership of final delivered logos, brand guidelines, and graphics assets to you once final sign-off is completed.",
  },
  {
    q: "Can I request revision updates?",
    a: "Absolutely. We structure clear revision cycles into all of our service tiers (branding, packaging, website layout structures) to guarantee alignment with your expectations.",
  },
];

// Header/Hero/WhyChooseUs/Portfolio/WhatWeDo/Priorities/Testimonials ke container ke saath consistent
const CONTAINER =
  "max-w-[1400px] 2xl:max-w-[1700px] 3xl:max-w-[1950px] 4xl:max-w-[2300px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section className="py-14 sm:py-20 lg:py-24 4xl:py-32 bg-dark-bg relative overflow-hidden ">
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-electric-blue/10 blur-[90px] sm:blur-[110px] lg:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-neon-cyan/10 blur-[90px] sm:blur-[110px] lg:blur-[120px] pointer-events-none" />
      <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 4xl:gap-28 items-start">
          {/* Left — framed image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-md xl:max-w-lg 4xl:max-w-2xl mx-auto lg:mx-0 aspect-[4/5]"
          >
            {/* Offset outline frame sitting behind the photo */}
            <div className="absolute inset-0 border border-stone-400/60 -rotate-3 translate-x-4 -translate-y-3" />

            {/* Photo, rotated opposite so it "breaks out" of the frame */}
            <div className="absolute inset-0 overflow-hidden rotate-2 shadow-2xl">
              <Image
                src="/images/home/ask-away.png"
                alt="Team member portrait"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
          </motion.div>

          {/* Right — heading + accordion */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 4xl:text-8xl text-stone-100 mb-6 sm:mb-8 lg:mb-10 4xl:mb-14"
            >
              Ask Away
            </motion.h2>

            <div className="flex flex-col">
              <div className="border-t border-stone-700/60" />
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className="border-b border-stone-700/60">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full py-4 sm:py-5 xl:py-6 4xl:py-7 flex items-center justify-between gap-4 sm:gap-6 4xl:gap-8 text-left group"
                    >
                      <span
                        className={`text-sm sm:text-base xl:text-lg 4xl:text-xl leading-snug transition-colors ${isOpen
                          ? "text-stone-100"
                          : "text-stone-300 group-hover:text-stone-100"
                          }`}
                      >
                        {faq.q}
                      </span>
                      <span className="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8 4xl:w-9 4xl:h-9 shrink-0 rounded-sm border border-stone-500/70 flex items-center justify-center text-stone-300 group-hover:border-stone-300 transition-colors">
                        {isOpen ? (
                          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5 4xl:w-4 4xl:h-4" />
                        ) : (
                          <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 4xl:w-4 4xl:h-4" />
                        )}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="text-sm xl:text-base 4xl:text-lg text-stone-400 leading-relaxed pb-5 sm:pb-6 4xl:pb-8 pr-8 sm:pr-10 4xl:pr-14">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}