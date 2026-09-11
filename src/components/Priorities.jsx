"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, HeartHandshake, UserCog, IndianRupee } from "lucide-react";

const priorities = [
  {
    icon: Users,
    title: "Non-Compromising Work",
    bg: "bg-sky-500",
  },
  {
    icon: HeartHandshake,
    title: "Hassle-free Work",
    bg: "bg-lime-500",
  },
  {
    icon: UserCog,
    title: "Single Point Of Contact",
    bg: "bg-orange-600",
  },
  {
    icon: IndianRupee,
    title: "Within Your Budget",
    bg: "bg-amber-500",
  },
];

// Header/Hero/WhyChooseUs/Portfolio/WhatWeDo ke container ke saath consistent
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function Priorities() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 4xl:py-32 bg-[#07041D] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] 4xl:w-[560px] 4xl:h-[560px] rounded-full bg-electric-blue/10 blur-[80px] sm:blur-[110px] lg:blur-[130px] pointer-events-none" />

      <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 4xl:gap-28 items-center">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-xl xl:max-w-2xl 4xl:max-w-3xl mx-auto lg:mx-0"
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 4xl:w-96 4xl:h-96 rounded-full bg-sky-500/10 blur-[80px] sm:blur-[100px] pointer-events-none" />

            {/* Image */}
            <div className="relative w-full aspect-[1280/1184] overflow-hidden">
              <Image
                src="/images/home/SMC-Churu-Landing-Page-2-2.png"
                alt="Client reviewing brand assets at his desk"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>
          </motion.div>


          {/* Right — heading + priority cards */}
          <div>

            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="block text-xs sm:text-sm xl:text-base 4xl:text-lg font-bold text-sky-400 mb-2 sm:mb-3"
            >
              Our Key Priority
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-2xl sm:text-3xl md:text-4xl xl:text-4xl 4xl:text-6xl leading-tight text-white mb-6 sm:mb-8 lg:mb-10 4xl:mb-14"
            >
              &ldquo;Your Brand Is A Story — Elevating Branding &amp;
              Marketing&rdquo;
            </motion.h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:gap-6 4xl:gap-8">
              {priorities.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                    }}
                    className="rounded-2xl border border-white/15 px-5 py-6 sm:px-6 sm:py-8 xl:px-7 xl:py-9 4xl:px-9 4xl:py-12 flex flex-col items-center text-center gap-3 sm:gap-4 4xl:gap-5"
                  >
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 rounded-xl ${item.bg} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 4xl:w-8 4xl:h-8 text-white" />
                    </div>

                    <h3 className="font-display font-semibold text-sm md:text-base xl:text-lg 4xl:text-xl text-white">
                      {item.title}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}