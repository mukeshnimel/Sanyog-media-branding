"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Share2,
  Package,
  Monitor,
  Layers,
  LineChart,
  Clapperboard,
  Wand2,
  ArrowUp,
} from "lucide-react";

const services = [
  { icon: Share2, label: "Logo Design & Branding", href: "/services/logo-design" },
  { icon: Package, label: "Packaging Design", href: "/#services" },
  { icon: Monitor, label: "Website Design", href: "/#services" },
  { icon: Layers, label: "Graphics Design", href: "/#services" },
  { icon: LineChart, label: "Social Media Marketing", href: "/#services" },
  { icon: Clapperboard, label: "Reels / Video Editing", href: "/#services" },
  { icon: Wand2, label: "Content Creation / Copy Writing", href: "/#services" },
];

const socials = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z",
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    outline: true,
  },
  {
    name: "X",
    href: "https://twitter.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com",
    path: "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.03-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.137.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

// Header/Hero/WhyChooseUs/Portfolio/WhatWeDo/Priorities/Testimonials/FinalCTA ke container ke saath consistent
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative bg-[#07041D] pt-12 sm:pt-16 xl:pt-20 4xl:pt-28 pb-0 overflow-hidden"
    >
      {/* Argyle / diamond background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
                45deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 2px,
                transparent 2px,
                transparent 42px
            ),
            repeating-linear-gradient(
                -45deg,
                rgba(255,255,255,0.03) 0px,
                rgba(255,255,255,0.03) 2px,
                transparent 2px,
                transparent 42px
            )
        `,
        }}
      />


      {/* Decorative glow orbs */}
      <div className="absolute -top-20 left-1/4 w-52 h-52 sm:w-72 sm:h-72 4xl:w-[26rem] 4xl:h-[26rem] rounded-full bg-electric-blue/10 blur-[90px] sm:blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-neon-cyan/5 blur-[90px] sm:blur-[130px] pointer-events-none" />

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Back to top"
        className="absolute top-6 right-4 sm:top-8 sm:right-6 xl:top-10 xl:right-10 4xl:top-12 4xl:right-16 w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white shadow-lg transition-colors z-20"
      >
        <ArrowUp className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6" />
      </motion.button>

      <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 xl:gap-16 4xl:gap-24 mb-12 sm:mb-16 xl:mb-20 4xl:mb-28">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-5 sm:gap-6 4xl:gap-8"
          >
            <Link href="/" className="flex items-center w-fit">
              <img
                src="/images/logo/SANYOG-MEDIA-CONCEPTS-BRANDING-1-scaled.png"
                alt="Sanyog Media Concepts Logo"
                className="h-8 md:h-11 xl:h-12 4xl:h-16 w-auto object-contain"
              />
            </Link>

            <p className="text-sm xl:text-base 4xl:text-lg text-slate-400 leading-relaxed">
              We Ignite Brands With Bold Creativity, Blending Visionary
              Branding With Striking Social Media Campaigns And Flawless
              Design. Our Approach Goes Beyond Visuals — We Create Powerful
              Stories And Memorable Experiences That Bring Every Brand To
              Life. With A Passion For Innovation And A Focus On Lasting
              Impact, We Help Brands Not Just Exist, But Thrive And Stand Out
              In A Crowded World.
            </p>

            <div className="flex items-center gap-4 4xl:gap-5">
              {socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="text-white/90 hover:text-sky-400 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {social.outline ? (
                    <svg
                      className="w-5 h-5 xl:w-6 xl:h-6 4xl:w-7 4xl:h-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 xl:w-6 xl:h-6 4xl:w-7 4xl:h-7" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.path} />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4 sm:gap-5 4xl:gap-7"
          >
            <h3 className="font-display font-bold text-white text-lg sm:text-xl xl:text-2xl 4xl:text-3xl">
              Services
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 4xl:gap-5">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className="flex items-center gap-3 4xl:gap-4 text-[15px] sm:text-[17px] xl:text-lg 4xl:text-xl text-slate-300 hover:text-sky-400 transition-colors group"
                    >
                      <Icon className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 group-hover:scale-110 transition-transform shrink-0" />
                      <span>{service.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Get In Touch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 sm:gap-5 4xl:gap-7"
          >
            <h3 className="font-display font-bold text-white text-lg sm:text-xl xl:text-2xl 4xl:text-3xl">
              Get In Touch
            </h3>
            <ul className="flex flex-col gap-3 sm:gap-4 4xl:gap-5">
              <li>
                <a
                  href="tel:+919929600601"
                  className="flex items-center gap-3 4xl:gap-4 text-[15px] sm:text-[17px] xl:text-lg 4xl:text-xl text-slate-300 hover:text-sky-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>+91 - 9929 600 601</span>
                </a>
              </li>
              <li>

                <a href="tel:+917726966902"
                  className="flex items-center gap-3 4xl:gap-4 text-base sm:text-lg xl:text-lg 4xl:text-xl text-slate-300 hover:text-sky-400 transition-colors group"
                >
                  <Phone className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>+91 - 7726 966 902</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@sanyogmedia.com"
                  className="flex items-center gap-3 4xl:gap-4 text-base sm:text-lg xl:text-lg 4xl:text-xl text-slate-300 hover:text-sky-400 transition-colors group"
                >
                  <Mail className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 group-hover:scale-110 transition-transform" />
                  <span>hello@sanyogmedia.com</span>
                </a>
              </li>
              <li className="flex gap-3 4xl:gap-4 text-base sm:text-lg xl:text-lg 4xl:text-xl text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 shrink-0 mt-0.5" />
                <p>
                  15, 1st floor, Jai Bharat Industrial Estate, Western Express
                  Hwy, opp. Virwani, Vishveshwar Nagar, Goregaon, Mumbai,
                  Maharashtra 400063
                </p>
              </li>
              <li className="flex gap-3 4xl:gap-4 text-base sm:text-lg xl:text-lg 4xl:text-xl text-slate-300 leading-relaxed">
                <MapPin className="w-4 h-4 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-sky-400 shrink-0 mt-0.5" />
                <p>
                  Regd. Ad. - Sanyog, Dharam Stoop Near Water Works, Bissau
                  Road, Churu ( Raj. ) - 331001
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 bg-indigo-950/80 border-t border-white/10 py-3 sm:py-4 xl:py-5 4xl:py-7">
        <p className="text-center text-[11px] sm:text-xs md:text-lg xl:text-xl 4xl:text-2xl text-slate-300 px-4">
          &copy; {new Date().getFullYear()} Sanyog Media Concepts, Trademarks
          and Brands are The Property of Their Respective Owner.
        </p>
      </div>
    </footer>
  );
}