"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
      className="relative overflow-hidden bg-dark-bg py-20 md:py-24 lg:py-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full bg-orange-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Main content */}
        <div className="relative max-w-5xl mx-auto text-center">

          {/* LEFT PAINT PALETTE */}
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
          top-2
          left-2
          md:left-[-20px]
          lg:left-[-70px]
          w-12
          h-12
          md:w-14
          md:h-14
          z-20
          pointer-events-none
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


          {/* RIGHT PENCIL */}
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
          top-[165px]
          right-2
          md:right-[-20px]
          lg:right-[-70px]
          w-12
          h-12
          md:w-14
          md:h-14
          z-20
          pointer-events-none
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
          font-semibold
          uppercase
          tracking-[0.18em]
          md:tracking-[0.22em]
          text-white/90
          mb-7
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
          text-3xl
          sm:text-4xl
          md:text-5xl
          lg:text-[3.8rem]
          xl:text-[4rem]
          leading-[1.12]
          tracking-tight
          text-white
          mb-8
          max-w-5xl
          mx-auto
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
          text-base
          md:text-lg
          text-slate-300
          mb-10
          max-w-3xl
          mx-auto
          leading-relaxed
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
            px-8
            py-4
            rounded-2xl
            text-base
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