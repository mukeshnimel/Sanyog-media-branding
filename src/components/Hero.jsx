"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const rotatingWords = [
  "Video Editing",
  "Graphic Design",
  "Website Design",
  "Logo Design",
  "Social Media Marketing",
  "Content Creation",
];

const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=5",
  "https://i.pravatar.cc/64?img=15",
  "https://i.pravatar.cc/64?img=60",
];

const columnAImages = [
  { src: "/images/home-slider/1.png", alt: "Website design showcase", tall: true },
  { src: "/images/home-slider/2.png", alt: "Logo design workspace", tall: false },
  { src: "/images/home-slider/3.png", alt: "Website design showcase", tall: true },
  { src: "/images/home-slider/4.png", alt: "Logo design workspace", tall: false },
];

const columnBImages = [
  { src: "/images/home-slider/5.png", alt: "Graphic design color palette", tall: false },
  { src: "/images/home-slider/6.jpg", alt: "Digital marketing showcase", tall: true },
  { src: "/images/home-slider/7.jpg", alt: "Graphic design color palette", tall: false },
  { src: "/images/home-slider/8.jpg", alt: "Digital marketing showcase", tall: true },
];

const columnALoop = [...columnAImages, ...columnAImages];
const columnBLoop = [...columnBImages, ...columnBImages];

function CollageTile({ src, alt, tall }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/10 ${tall
        ? "h-32 sm:h-44 lg:h-56 xl:h-64 2xl:h-72 3xl:h-80 4xl:h-96"
        : "h-24 sm:h-32 lg:h-40 xl:h-48 2xl:h-56 3xl:h-64 4xl:h-72"
        }`}
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 45vw, 320px" />
    </div>
  );
}

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex items-center overflow-hidden bg-dark-bg pt-24 pb-14 sm:pt-28 sm:pb-20">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-electric-blue/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-neon-cyan/10 blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Container ab har breakpoint pe apni width badhata jayega, 4K tak */}
      <div className="w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 text-left flex flex-col items-start ">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-extrabold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-8xl 4xl:text-9xl leading-tight tracking-tight text-white mb-5 sm:mb-6"
            >
              Build a Brand That <br />
              Lasts Forever
            </motion.h1>

            {/* Rotating word border box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border-2 border-white px-4 py-3 sm:px-6 sm:py-3.5 xl:px-8 xl:py-4 4xl:px-10 4xl:py-5 mb-5 sm:mb-6 bg-white/[0.02] max-w-full"
            >
              <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl font-bold whitespace-nowrap">
                <span className="text-white">With</span>
                <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ y: "-100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "100%", opacity: 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="block text-sky-400"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg xl:text-xl 4xl:text-2xl text-slate-350 max-w-xl xl:max-w-2xl 4xl:max-w-3xl mb-7 sm:mb-8 leading-relaxed"
            >
              Top-Rated Creative Branding Agency for Logo, Web & Design Solutions.
            </motion.p>

            {/* Avatars + rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mb-6"
            >
              <div className="flex -space-x-3 mb-4">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 4xl:w-16 4xl:h-16 rounded-full border-2 border-dark-bg overflow-hidden relative"
                  >
                    <Image src={src} alt="Client avatar" fill className="object-cover" sizes="64px" />
                  </div>
                ))}
              </div>
              <p className="text-sm sm:text-base xl:text-lg 4xl:text-2xl font-bold text-white">
                4.9/5 Star Rating on Google
              </p>
              <p className="text-xs sm:text-sm xl:text-base 4xl:text-xl font-semibold text-sky-400">
                Trusted By Businesses Across Industries
              </p>
            </motion.div>

            {/* ✅ FIX: restored missing opening <a tags */}
            <div className="relative flex flex-col sm:flex-row gap-3 xl:gap-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
              >
                Connect With Us
              </a>

              <a
                href="#smmport"
                className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
              >
                Portfolio
              </a>

              <div className="hidden lg:grid grid-cols-8 gap-2 4xl:gap-3 absolute left-[220px] xl:left-[260px] 4xl:left-[320px] top-1">
                {[...Array(24)].map((_, i) => (
                  <span key={i} className="w-1 h-1 4xl:w-1.5 4xl:h-1.5 rounded-full bg-indigo-400/40" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Image Collage */}
          <div className="lg:col-span-6 w-full relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-2 sm:gap-3 xl:gap-4"
            >
              {/* Column A */}
              <div className="relative h-[300px] sm:h-[380px] lg:h-[500px] xl:h-[580px] 2xl:h-[650px] 3xl:h-[720px] 4xl:h-[800px] overflow-hidden">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-2 sm:gap-3 xl:gap-4"
                >
                  {columnALoop.map((img, i) => (
                    <CollageTile key={`a-${i}`} {...img} />
                  ))}
                </motion.div>
              </div>

              {/* Column B */}
              <div className="relative h-[300px] sm:h-[380px] lg:h-[500px] xl:h-[580px] 2xl:h-[650px] 3xl:h-[720px] 4xl:h-[800px] overflow-hidden pt-4 sm:pt-6 lg:pt-8">
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col gap-2 sm:gap-3 xl:gap-4"
                >
                  {columnBLoop.map((img, i) => (
                    <CollageTile key={`b-${i}`} {...img} />
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Top & Bottom Fade */}
            <div className="absolute inset-x-0 top-0 h-12 sm:h-16 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-12 sm:h-16 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}