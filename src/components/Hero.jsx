"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Sparkle } from "lucide-react";

const rotatingWords = [
  "Video Editing",
  "Graphic Design",
  "Website Design",
  "Logo Design",
  "Social Media Marketing",
  "Content Creation",
];
const collageImages = [
  {
    src: "https://picsum.photos/seed/website-mockup/500/500",
    alt: "Website design showcase",
  },
  {
    src: "https://picsum.photos/seed/logo-design/500/400",
    alt: "Logo design workspace",
  },
  {
    src: "https://picsum.photos/seed/color-palette/500/400",
    alt: "Graphic design color palette",
  },
  {
    src: "https://picsum.photos/seed/digital-marketing/500/500",
    alt: "Digital marketing showcase",
  },
];
const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=32",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=5",
  "https://i.pravatar.cc/64?img=15",
  "https://i.pravatar.cc/64?img=60",
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden bg-dark-bg">
      {/* Background glow overlay */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-electric-blue/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 text-left flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-display font-extrabold text-4xl md:text-6xl leading-tight tracking-tight text-white mb-6"
            >
              Build a Brand That <br />
              Lasts Forever
            </motion.h1>

            {/* Rotating word border box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative overflow-hidden rounded-2xl border-2 border-white px-6 py-3.5 mb-6 bg-white/[0.02]"
            >
              <div className="flex items-center gap-2 text-xl md:text-2xl font-bold whitespace-nowrap">
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
              className="text-base md:text-lg text-slate-350 max-w-xl mb-8 leading-relaxed"
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
                    className="w-10 h-10 rounded-full border-2 border-dark-bg overflow-hidden relative"
                  >
                    <Image src={src} alt="Client avatar" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-base font-bold text-white">4.9/5 Star Rating on Google</p>
              <p className="text-sm font-semibold text-sky-400">
                Trusted By Businesses Across Industries
              </p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex flex-col gap-3"
            >
              <Link
                href="/contact"
                className="px-6 py-3 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-fit"
              >
                Connect With Us
              </Link>
              <Link
                href="#portfolio"
                className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-fit"
              >
                Portfolio
              </Link>

              {/* Decorative dot grid */}
              <div className="hidden sm:grid grid-cols-8 gap-2 absolute left-[220px] top-2">
                {[...Array(24)].map((_, i) => (
                  <span
                    key={i}
                    className="w-1 h-1 rounded-full bg-indigo-400/30"
                  />
                ))}
              </div>
            </motion.div>
          </div>
{/* Right Image Collage */}
<div className="lg:col-span-6 w-full relative overflow-hidden">
  {/* Decorative sparkles */}

  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="grid grid-cols-2 gap-4"
  >
    {/* Column A */}
    <div className="relative h-[620px] overflow-hidden">
      <motion.div
        animate={{ y: ["0%", "-50%"] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {/* Set 1 */}
        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/1.png"
            alt="Website design showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/2.png"
            alt="Logo design workspace"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/3.png"
            alt="Website design showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/4.png"
            alt="Logo design workspace"
            fill
            className="object-cover"
          />
        </div>

        {/* Set 2 - exact duplicate of Set 1 for seamless loop */}
        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/1.png"
            alt="Website design showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/2.png"
            alt="Logo design workspace"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/3.png"
            alt="Website design showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/4.png"
            alt="Logo design workspace"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>

    {/* Column B */}
    <div className="relative h-[620px] overflow-hidden pt-10">
      <motion.div
        animate={{ y: ["-50%", "0%"] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {/* Set 1 */}
        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/5.png"
            alt="Graphic design color palette"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/6.jpg"
            alt="Digital marketing showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/7.jpg"
            alt="Graphic design color palette"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/8.jpg"
            alt="Digital marketing showcase"
            fill
            className="object-cover"
          />
        </div>

        {/* Set 2 - exact duplicate of Set 1 for seamless loop */}
        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/5.png"
            alt="Graphic design color palette"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/6.jpg"
            alt="Digital marketing showcase"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-40 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/7.jpg"
            alt="Graphic design color palette"
            fill
            className="object-cover"
          />
        </div>

        <div className="relative h-56 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <Image
            src="/images/home-slider/8.jpg"
            alt="Digital marketing showcase"
            fill
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  </motion.div>

  {/* Top & Bottom Fade - cinematic effect */}
  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none z-10" />
  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none z-10" />
</div>
        </div>
      </div>
    </section>
  );
}