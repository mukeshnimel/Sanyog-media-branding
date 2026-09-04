"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Sparkle,
  Zap,
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

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="relative bg-[#07041D]">
      {/* Background glow overlay */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-electric-blue/5 blur-[150px] pointer-events-none" />

      {/* Heading */}
      <div className="w-full border-y border-white/10 my-10">
        <div className="max-w-7xl mx-auto px-6 pt-10 pb-10 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 mb-4"
          >
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-sky-400">
              What Make Us Different
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-5xl leading-tight text-white"
          >
            Custom Design &amp; Marketing Solutions at One Place
          </motion.h2>
        </div>
      </div>

      {/* Sticky left / scrolling cards right */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — sticky */}
          <div className="lg:sticky lg:top-28 self-start h-fit w-full">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight"
            >
              YOUR BRAND
            </motion.h3>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="
    font-['Poppins']
    text-[3.1rem]
    font-medium
    leading-tight
    text-right
    text-transparent
  "
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
              className="text-sm md:text-base text-slate-350 leading-relaxed mb-2 max-w-md"
            >
              We provide complete brand design solutions — from logo design,
              branding, and packaging to website, graphics, and social media
              marketing. As a leading creative agency in India, we craft
              powerful visual stories that make your brand stand out.
            </motion.p>

            {/* Image with badge */}
            <div className="relative w-full overflow-hidden">
              <Image
                src="/images/home/web-2.png"
                alt="Brand strategy session"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
              />

              <div className="absolute bottom-3 left-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-950 border border-glass-border text-[10px] font-medium text-sky-400 shadow-lg">
                https://sanyogmedia.in
              </div>
            </div>
          </div>

          {/* RIGHT — service cards */}
          <div className="flex flex-col gap-6 w-full">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                  className="rounded-2xl p-6 bg-gradient-to-br from-[#0c1f4a] to-[#0a1730] border border-white/5 shadow-lg"
                >
                  {/* Icon - Vector Image or Lucide Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4">
                    {serviceIcons[index] ? (
                      <Image
                        src={serviceIcons[index]}
                        alt={service.title}
                        width={24}
                        height={24}
                        className="w-10 h-10 object-contain"
                      />
                    ) : (
                      <Icon className="w-5 h-5 text-slate-900" />
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <Link
                    href={service.href}
                    className="inline-flex items-center px-5 py-2 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
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
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {/* Counter 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center px-6 py-4 border-r border-white/10"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-white">
                15<span className="text-sky-400">+</span>
              </div>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                Years Experience
              </p>
            </motion.div>

            {/* Counter 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center px-6 py-4 lg:border-r border-white/10"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-white">
                4.9<span className="text-sky-400">/5</span>
              </div>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                Google Rating
              </p>
            </motion.div>

            {/* Counter 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center px-6 py-4 border-r border-white/10"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-white">
                450<span className="text-sky-400">+</span>
              </div>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                Happy Clients
              </p>
            </motion.div>

            {/* Counter 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center px-6 py-4"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-white">
                20<span className="text-sky-400">+</span>
              </div>
              <p className="mt-2 text-sm text-slate-400 font-medium">
                Core Designers
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}