"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkle, Rocket, Orbit, Image as ImageIcon } from "lucide-react";

const cards = [
  {
    image: "/images/home/vector/reamrk-Analytics.svg",
    line1: "Remarkable",
    line2: "Analytics",
    description:
      "We Provide Analytics-Driven Solutions That Help You Boost Sales, Attract Clients, And Grow Faster. With Real-Time Insights, Your Business Can Stay Competitive And Achieve Sustainable Success.",
  },

  {
    image: "/images/home/vector/remark-design.svg",
    line1: "Remarkable",
    line2: "Branding & Designing",
    description:
      "Great Design Builds Trust. From Logo And Branding To Web Presence Our Professional Logo Design Services Ensure Your Business Stands Out. Every Project Is Tailored To Your Goals—Crafted To Increase Conversions Engage Customers, And Maximize ROI.",
  },

  {
    image: "/images/home/vector/remarkable-outcomes.svg",
    line1: "Remarkable",
    line2: "Outcomes",
    description:
      "We Listen, Understand, And Create. Our Process Ensures Customized Branding Solutions That Reflect Your Vision And Deliver Real Business Outcomes.",
  },
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24 bg-[#07041D] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top: text + image collage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left text */}
          <div className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-lg  text-sky-400 mb-4"
            >
              What We Do
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-bold text-3xl md:text-5xl leading-tight text-white mb-6"
            >
              Your Brand Is a Story — We Solve Branding, Design &amp; Digital
              Growth
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-slate-400 leading-relaxed mb-8 max-w-lg"
            >
              As A Leading Creative Branding Agency, We Specialize In Building
              Strong Identities That Drive Measurable Results. Our Expert Team
              Blends Logo Design, Branding Logo, And Brand Design&apos; With
              Strategy To Deliver Solutions That Sell. We&apos;re Not Just
              Designers—We&apos;re Partners Who Ensure Your Investment Turns
              Into Long-Term Business Growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors"
              >
                Request a Free Consultation
              </Link>
            </motion.div>
          </div>

          {/* Right image collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative w-full h-[380px]"
          >
            {/* Glow behind images */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

            <Sparkle className="absolute top-2 right-8 w-8 h-8 text-cyan-400 pointer-events-none" />

            <div className="absolute top-0 right-4 w-[62%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/home/what-we-do-1.jpg"
                alt="Designer working on branding analytics"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[58%] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/home/what-we-do-2.jpg"
                alt="Digital trends flat lay workspace"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom: three cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-white/15 p-6 flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <h3 className="font-display font-bold text-lg text-white leading-snug">
                    {card.line1}
                    <br />
                    {card.line2}
                  </h3>
                  <div className="w-14 h-14 shrink-0 rounded-[12px] bg-white flex items-center justify-center ml-4 overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.line2}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-cover"
                    />
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}