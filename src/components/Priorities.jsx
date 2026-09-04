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

export default function Priorities() {
  return (
    <section className="py-24 bg-[#07041D] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-xl mx-auto lg:mx-0"
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-sky-500/10 blur-[100px] pointer-events-none" />

            {/* Image */}
            <div className="relative w-full aspect-[1280/1184] overflow-hidden">
              <Image
                src="/images/home/SMC-Churu-Landing-Page-2-2.png"
                alt="Client reviewing brand assets at his desk"
                fill
                priority
                className="object-cover"
              />
            </div>
          </motion.div>


          {/* Right — heading + priority cards */}
          <div>

            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="block text-sm font-bold text-sky-400 mb-3"
            >
              Our Key Priority
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-2xl md:text-4xl leading-tight text-white mb-10"
            >
              &ldquo;Your Brand Is A Story — Elevating Branding &amp;
              Marketing&rdquo;
            </motion.h2>

            <div className="grid grid-cols-2 gap-5">
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
                    className="rounded-2xl border border-white/15 px-6 py-8 flex flex-col items-center text-center gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="font-display font-semibold text-sm md:text-base text-white">
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