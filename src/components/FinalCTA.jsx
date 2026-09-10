"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Header/Hero/WhyChooseUs/Portfolio/WhatWeDo/Priorities/Testimonials ke container ke saath consistent
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function FinalCTA() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 15,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 15,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x * 30);
    mouseY.set(y * 30);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  return (
    <section
      className="relative overflow-hidden bg-dark-bg py-16 sm:py-20 md:py-24 lg:py-20 4xl:py-28"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] 4xl:w-[600px] 4xl:h-[600px] rounded-full bg-electric-blue/10 blur-[90px] sm:blur-[110px] lg:blur-[130px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] lg:w-[420px] lg:h-[420px] 4xl:w-[600px] 4xl:h-[600px] rounded-full bg-orange-500/5 blur-[90px] sm:blur-[110px] lg:blur-[130px] pointer-events-none" />

      <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>

        {/* Main content */}
        <div className="relative max-w-5xl xl:max-w-6xl 4xl:max-w-7xl mx-auto text-center">

          {/* LEFT PAINT PALETTE — mobile: top-left corner, out of text area | md+: floating beside heading */}
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
            }}
            animate={{
              rotate: [-6, -2, -6],
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="
  absolute
  -top-2
  left-0
  md:top-2
  md:left-[-5px]
  lg:left-[-15px]
  xl:left-[-25px]
  4xl:left-[-40px]
  w-9
  h-9
  sm:w-11
  sm:h-11
  md:w-14
  md:h-14
  xl:w-16
  xl:h-16
  4xl:w-20
  4xl:h-20
  z-20
  pointer-events-none
  opacity-70
  sm:opacity-100
"
          >
            <Image
              src="/images/home/vector/014-paint-palette.svg"
              alt="Creative design"
              width={56}
              height={56}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </motion.div>


          {/* RIGHT PENCIL — mobile: top-right corner, out of text area | md+: floating beside heading */}
          <motion.div
            style={{
              x: smoothX,
              y: smoothY,
            }}
            animate={{
              rotate: [6, 10, 6],
            }}
            transition={{
              rotate: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              },
            }}
            className="
  absolute
  -top-2
  right-0
  md:top-[165px]
  md:right-[-5px]
  lg:right-[-15px]
  xl:right-[-25px]
  4xl:right-[-40px]
  w-9
  h-9
  sm:w-11
  sm:h-11
  md:w-14
  md:h-14
  xl:w-16
  xl:h-16
  4xl:w-20
  4xl:h-20
  z-20
  pointer-events-none
  opacity-70
  sm:opacity-100
"
          >
            <Image
              src="/images/home/vector/026-pencil.svg"
              alt="Creative marketing"
              width={56}
              height={56}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </motion.div>


          {/* SMALL LABEL */}
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="
          block
          text-xs
          md:text-sm
          xl:text-base
          4xl:text-lg
          font-semibold
          uppercase
          tracking-[0.18em]
          md:tracking-[0.22em]
          text-white/90
          mb-6
          sm:mb-7
          4xl:mb-9
          mt-8
          sm:mt-6
          md:mt-0
        "
          >
            Join the Success
          </motion.span>


          {/* HEADING */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="
          font-display
          text-2xl
          sm:text-4xl
          md:text-5xl
          lg:text-[2.8rem]
          xl:text-[3.4rem]
          4xl:text-[5.4rem]
          leading-[1.15]
          sm:leading-[1.12]
          tracking-tight
          text-white
          mb-6
          sm:mb-8
          4xl:mb-11
          max-w-5xl
          xl:max-w-5xl
          4xl:max-w-7xl
          mx-auto
          px-4
          sm:px-0
        "
          >
            Your Brand Is A Story — Elevating
            <br className="hidden md:block" />
            Branding &amp; Digital Marketing
          </motion.h2>


          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="
          text-sm
          sm:text-base
          md:text-lg
          xl:text-xl
          4xl:text-2xl
          text-slate-300
          mb-8
          sm:mb-10
          4xl:mb-14
          max-w-3xl
          xl:max-w-4xl
          4xl:max-w-5xl
          mx-auto
          leading-relaxed
          px-2
          sm:px-0
        "
          >
            Schedule Your Free Consultation Today With Our{" "}
            <span className="font-semibold text-white">
              Creative Branding Agency In India
            </span>{" "}
            And Discover How Our Expertise In{" "}
            <span className="font-semibold text-white">
              Logo And Branding
            </span>{" "}
            Can Help You{" "}
            <span className="font-semibold text-white">
              Win More Clients And Grow Faster
            </span>
            .
          </motion.p>


          {/* CTA BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link
              href="/contact"
              className="
            inline-flex
            items-center
            justify-center
            px-6
            sm:px-8
            xl:px-10
            4xl:px-12
            py-3
            sm:py-4
            xl:py-4.5
            4xl:py-5
            rounded-2xl
            text-sm
            sm:text-base
            xl:text-lg
            4xl:text-xl
            font-bold
            text-white
            bg-sky-500
            hover:bg-sky-600
            transition-all
            duration-300
            hover:scale-105
            shadow-lg
            shadow-sky-500/20
          "
            >
              Connect With Us
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}