"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  PenTool,
  LayoutTemplate,
  PackageOpen,
  Megaphone,
  Palette,
  Server,
  Video,
  FileText,
} from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Logo Design & Branding Symbolize",
    description:
      "As a creative branding agency, we craft logos that capture your essence and deliver brand design strategies to help you make a lasting mark in the market.",
    href: "/services/logo-design",
  },
  {
    icon: LayoutTemplate,
    title: "Website Design",
    description:
      "Best WordPress, custom HTML / CSS / JS informational website design with eye-catching interface, home page, contact page & more by our creative agency in India.",
    href: "/#services",
  },
  {
    icon: PackageOpen,
    title: "Packaging Design",
    description:
      "Our design prowess weaves stories that captivate, setting your product apart with artful packaging solutions by a creative branding agency offering expert brand design.",
    href: "/#services",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description:
      "Strategic content, scroll-stopping creatives, and consistent posting schedules that grow your brand's presence and engagement across every platform.",
    href: "/#services",
  },
  {
    icon: Palette,
    title: "Graphics Design",
    description:
      "From brochures to social banners, we deliver polished graphic design that keeps your visual identity sharp and consistent everywhere it appears.",
    href: "/#services",
  },
  {
    icon: Server,
    title: "Website Hosting",
    description:
      "Fast, secure and reliable hosting with hands-on support, so your website stays online and performs the way it should, every single day.",
    href: "/#services",
  },
  {
    icon: Video,
    title: "Video / Reel Editing",
    description:
      "Crisp, trend-aware edits for reels and promotional videos that keep viewers watching and help your content perform on every platform.",
    href: "/#services",
  },
  {
    icon: FileText,
    title: "Content Creation",
    description:
      "Compelling copy and content calendars built around your brand voice, made to inform, engage and convert your audience.",
    href: "/#services",
  },
];

// Vector images mapping - yahan apni vector images ka path daalo
const serviceIcons = [
  "/images/home/vector/003-vector.svg",
  "/images/home/vector/019-responsive.svg",
  "/images/home/vector/004-shapes.svg",
  "/images/home/vector/notification.svg",
  "/images/home/vector/014-paint-palette.svg",
  "/images/home/vector/webdesign_16-http-1.svg",
  "/images/home/vector/025-photo-camera.svg",
  "/images/home/vector/032-graphic-tablet.svg",
];

const stats = [
  { value: "15", suffix: "+", label: "Years Experience" },
  { value: "4.9", suffix: "/5", label: "Google Rating" },
  { value: "450", suffix: "+", label: "Happy Clients" },
  { value: "20", suffix: "+", label: "Core Designers" },
];

// Reusable container width — Hero/Header ke saath consistent, taaki edges har jagah align rahein
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative bg-[#07041D]">
      {/* Background glow overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] 4xl:w-[800px] 4xl:h-[800px] rounded-full bg-electric-blue/5 blur-[90px] sm:blur-[120px] lg:blur-[150px] pointer-events-none" />

      {/* Heading */}
      <div className="w-full border-y border-white/10 my-8 sm:my-10">
        <div className={`${CONTAINER} ${CONTAINER_PX} pt-8 pb-8 sm:pt-10 sm:pb-10 4xl:pt-14 4xl:pb-14 text-center relative z-10`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 mb-4"
          >
            <span className="text-[10px] sm:text-[18px] 4xl:text-[23px] uppercase tracking-[0.2em] sm:tracking-[0.25em] font-bold text-sky-400">
              What Make Us Different
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 4xl:text-6xl leading-tight text-white"
          >
            Custom Design &amp; Marketing Solutions at One Place
          </motion.h2>
        </div>
      </div>

      {/* Sticky left / scrolling cards right */}
      <div className={`${CONTAINER} ${CONTAINER_PX} pb-16 sm:pb-20 lg:pb-24 4xl:pb-32 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 4xl:gap-20 items-start">
          {/* LEFT — sticky (only becomes sticky at lg, where there's room beside it) */}
          <div className="lg:sticky lg:top-28 self-start h-fit w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight"
            >
              YOUR BRAND
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-['Poppins'] text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] xl:text-[3rem] 4xl:text-[4.6rem] font-medium leading-tight text-right text-transparent"
              style={{
                WebkitTextStroke: "1px #FFF",
              }}
            >
              OUR EXPERTISE
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base xl:text-lg 4xl:text-xl text-slate-350 leading-relaxed mt-2 mb-4 sm:mb-2 max-w-md xl:max-w-lg 4xl:max-w-xl"
            >
              We provide complete brand design solutions — from logo design,
              branding, and packaging to website, graphics, and social media
              marketing. As a leading creative agency in India, we craft
              powerful visual stories that make your brand stand out.
            </motion.p>

            {/* Image with badge */}
            <div className="relative w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/home/web-2.png"
                alt="Brand strategy session"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 4xl:bottom-4 4xl:left-4 inline-flex items-center px-2.5 py-1 sm:px-3 sm:py-1.5 4xl:px-4 4xl:py-2 rounded-lg bg-slate-950 border border-glass-border text-[9px] sm:text-[10px] 4xl:text-xs font-medium text-sky-400 shadow-lg">
                https://sanyogmedia.in
              </div>
            </div>
          </div>

          {/* RIGHT — service cards */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 4xl:gap-8 w-full">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                  className="rounded-2xl p-5 sm:p-6 xl:p-7 4xl:p-9 bg-gradient-to-br from-[#0c1f4a] to-[#0a1730] border border-white/5 shadow-lg"
                >
                  {/* Icon - Vector Image or Lucide Icon */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 rounded-xl bg-white flex items-center justify-center mb-3 sm:mb-4">
                    {serviceIcons[index] ? (
                      <Image
                        src={serviceIcons[index]}
                        alt={service.title}
                        width={24}
                        height={24}
                        className="w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 4xl:w-12 4xl:h-12 object-contain"
                      />
                    ) : (
                      <Icon className="w-5 h-5 text-slate-900" />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm xl:text-base 4xl:text-lg text-slate-300 leading-relaxed mb-4 sm:mb-5">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center px-4 py-2 sm:px-5 xl:px-6 xl:py-2.5 4xl:px-7 4xl:py-3 rounded-lg bg-white text-slate-900 text-xs xl:text-sm 4xl:text-base font-bold hover:bg-slate-100 transition-colors"
                  >
                    Visit Page
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats / Counter Section */}
      <div className="w-full border-y border-white/10 my-5">
        <div className={`${CONTAINER} px-2 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 py-4 sm:py-5 4xl:py-8`}>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`text-center px-3 sm:px-6 4xl:px-8 py-3 sm:py-4 4xl:py-6 ${i % 2 === 0 ? "border-r border-white/10" : "lg:border-r lg:border-white/10"
                  } ${i < 2 ? "border-b lg:border-b-0 border-white/10" : ""}`}
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 4xl:text-7xl font-display font-extrabold text-white">
                  {stat.value}
                  <span className="text-sky-400">{stat.suffix}</span>
                </div>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm xl:text-base 4xl:text-lg text-slate-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}