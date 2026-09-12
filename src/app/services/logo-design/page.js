"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Star,
  ArrowRight,
  Check,
  Layers,
  ChevronDown,
  Award,
  Shield,
  PenTool,
  RotateCcw,
  BadgePercent,
  Image as ImageIcon,
  PlayCircle,
  Settings,
  Copyright,
  Timer,
  IndianRupee,
  Target, Search, Eye, ThumbsUp,
  MessageCircleQuestion,
  ZoomIn, X, ChevronLeft, ChevronRight
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import MarqueeRibbon from "@/components/MarqueeRibbon";

// Key features badges
// const badges = [
//   { label: "Top Notch Designing", icon: Award },
//   { label: "Sketch Based Original Designs", icon: PenTool },
//   { label: "Copyright Ownership Transfer", icon: Shield },
//   { label: "Instant Free Revisions", icon: RotateCcw },
//   { label: "100% Money-Back Guarantee", icon: BadgePercent }
// ];

// Cards list


const howItWorks = [
  {
    iconImage: "/images/logo-design/vector/6.svg",
    title: "Tell Us Your Vision About Your Brand",
    desc: "Submit the design brief and tell us your ideas and what kind of design you're expecting.",
    bg: "bg-amber-400",
    image: "/images/logo-design/6.png",
  },
  {
    iconImage: "/images/logo-design/vector/7.svg",
    title: "We Will Process Your Logo Design",
    desc: "According to your requirements, we will first look at your competitors. After doing all the research, we will start designing your logo.",
    bg: "bg-sky-400",
    image: "/images/logo-design/7.png",
  },
  {
    iconImage: "/images/logo-design/vector/8.svg",
    title: "Review the Logo",
    desc: "Review the logo design we provide and let us know if you need any changes.",
    bg: "bg-rose-400",
    image: "/images/logo-design/8.png",
  },
  {
    iconImage: "/images/logo-design/vector/7.svg",
    title: "Approve Our Logo Design & Rate Us",
    desc: "Approve & download your final files, then give your feedback to us.",
    bg: "bg-emerald-400",
    image: "/images/logo-design/9.png",
  },
];
const serviceCards = [
  { title: "Minimalist & Flat Logo Design", desc: "Clean, modern visual identifiers focused on simplicity and maximum impact." },
  { title: "3D & Mascot Logo Design", desc: "Dynamic, character-driven brand assets that bring your company persona to life." },
  { title: "Typography & Wordmark Logos", desc: "Custom stylized typographic symbols structured around your brand name." },
  { title: "Complete Brand Guidelines & Rulebooks", desc: "Detailed booklets covering color systems, typography spacing, and logo usage specs." },
  { title: "High-Fidelity 8K Design Mockups", desc: "Premium realistic commercial renderings of your assets in real-world contexts." },
  { title: "Stationery & Asset Design", desc: "Custom business cards, letterhead layouts, envelopes, and slipping pads." }
];

// Pricing Packages
const packages = [
  {
    name: "Startup",
    icon: "/images/logo-design/3.svg",
    price: "₹4999",
    oldPrice: "₹9999",
    tagline: "Perfect for small businesses and startups looking to establish their brand identity.",
    link: "https://forms.gle/qArpJ9Xrds85TF528",
    popular: false,
    features: [
      "2 Creative Logo Design",
      "1 Design Revisions",
      "Dedicated Designer",
      "Telephonic Consultations",
      "HD Square Profile Images",
      "All Original Source Files",
      "Copyright Ownership Transfer",
      "Lifetime File Storage",
      "Complimentary: 1 Letter Head Design",
      "Complimentary: 2 Social Media Ads",
    ],
  },
  {
    name: "Advance",
    icon: "/images/logo-design/4.svg",
    price: "₹9999",
    oldPrice: "₹15999",
    tagline: "Ideal for growing businesses that need more advanced design tools and assets.",
    link: "https://forms.gle/qArpJ9Xrds85TF528",
    popular: true,
    features: [
      "5 Creative Logo Design",
      "3 Design Revisions",
      "Dedicated Designer",
      "Telephonic Consultations",
      "HD Square Profile Images",
      "All Original Source Files",
      "Copyright Ownership Transfer",
      "Lifetime File Storage",
      "Complimentary: 1 Letter Head Design",
      "Complimentary: 5 Social Media Posts",
      "Complimentary: 5 Festival Banners",
      "Complimentary: 1 Logo Animation Video",
      "Complimentary: 3 Realistic Mockup Files",
    ],
  },
  {
    name: "Premium",
    icon: "/images/logo-design/5.svg",
    price: "₹19999",
    oldPrice: "₹27999",
    tagline: "Designed for enterprises requiring a comprehensive brand identity solution.",
    link: "https://forms.gle/qArpJ9Xrds85TF528",
    popular: false,
    features: [
      "7 Creative Logo Design",
      "5 Design Revisions",
      "Dedicated Designer",
      "Telephonic Consultations",
      "HD Square Profile Images",
      "All Original Source Files",
      "Copyright Ownership Transfer",
      "Lifetime File Storage",
      "Brand Identity: Stationary Kit (Visiting Card, Letter Head, Envelope, Slip Pad)",
      "Brand Identity: Brand Guidelines Book",
      "Complimentary: 10 Social Media Posts",
      "Complimentary: 12 Festival Banners",
      "Complimentary: 5 Logo Animation Videos",
      "Complimentary: 7 Realistic Mockup Files",
    ],
  },
];


const portfolioData = {
  "Logo Design & Branding": [
    {
      type: "image",
      src: "/images/home/logo-design-branding/1.jpg",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/2.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/3.jpg",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/4.png",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/5.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/6.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/7.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/8.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/9.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/10.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/11.jpg",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/12.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/13.jpg",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/14.jpg",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/15.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/16.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/17.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/19.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/20.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/21.png",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/22.png",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/23.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/24.jpg",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/25.jpg",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/26.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/27.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/28.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/29.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/30.png",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/31.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/32.png",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/33.jpg",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/34.png",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/35.png",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/36.jpg",
      aspect: "aspect-[4/3]"
    }
    // {
    //   type: "image",
    //   src: "/images/home/logo-design-branding/36.jpg",
    //   aspect: "aspect-[4/3]"
    // }
  ],
};

// Steps
const steps = [
  {
    number: "01",
    title: "Tell Us Your Brand Vision",
    desc: "Submit your design brief, target audience details, and ideas."
  },
  {
    number: "02",
    title: "Deep Research & Conceptualization",
    desc: "We analyze your competitors and begin sketch-based drafting."
  },
  {
    number: "03",
    title: "Review Your Brand Identity",
    desc: "Evaluate the detailed presentation layouts and provide feedback."
  },
  {
    number: "04",
    title: "Approve & Launch",
    desc: "Approve the final design, download your source files, and own your copyright."
  }
];

const faqs = [
  {
    q: "Why Should I Choose Sanyog Media?",
    a: "After being successful in the exhibition stall designing & fabrication, we have started Logo Design & Graphic Design. Our motive is to provide you the best experienced creative artists & designers who can justify the values of your brand with your logo.",
  },
  {
    q: "How Much Time It Takes To Design A Logo?",
    a: "After you submit your design brief, it will take around 2 working days to get the first initial designs. And if you respond quickly & tell us whether you want revisions or want to finalize, it will take overall 5 to 7 days to finalize your logo. Your quick response and co-operation will dictate the final delivery time. Our average order completion time is 5 to 7 days.",
  },
  {
    q: "Can I Upgrade My Package During The Order?",
    a: "Yes… absolutely. You can upgrade your package any time during your order. All you have to do is pay the price difference at the delivery time.",
  },
  {
    q: "Do You Offer Discounts?",
    a: "We believe there is no such thing as a discount. If you decrease the price, the quality will suffer as well. Here at Sanyog Media we never compromise on the quality of our work — so we can lose the order but cannot offer discounts because of our personal standards. So we don't offer discounts.",
  },
  {
    q: "How Are You Offering Such Benefits At This Price Point?",
    list: [
      "Building a relationship",
      "Impress our clients",
      "World-class experience",
      "Business for us in the long term",
      "Referrals & more growth",
    ],
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

const badges = [
  { icon: "/images/logo-design/vector/1.svg", line1: "Top Notch", line2: "Designing" },
  { icon: "/images/logo-design/vector/2.svg", line1: "Sketch Base", line2: "Designs" },
  { icon: "/images/logo-design/vector/3.svg", line1: "Copyright", line2: "Ownership" },
  { icon: "/images/logo-design/vector/4.svg", line1: "Instant Free", line2: "Revisions" },
  { icon: "/images/logo-design/vector/5.svg", line1: "100% Money", line2: "Back Guarantee" },
];

export default function LogoDesignServicePage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const items = portfolioData["Logo Design & Branding"];

  const [activeIndex, setActiveIndex] = useState(null);
  const isLightboxOpen = activeIndex !== null;

  const closeLightbox = () => setActiveIndex(null);

  const showPrevImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const showNextImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };


  return (
    <main className="flex-1 bg-dark-bg text-slate-100 pt-24 overflow-hidden">

      {/* SECTION 1: HERO BANNER (SPLIT 60/40) */}
      <section className="relative py-24 md:py-15 3xl:py-28 flex items-center bg-dark-bg border-b border-glass-border">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 3xl:w-[32rem] 3xl:h-[32rem] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 3xl:gap-16 items-center">

            {/* Left Content Column */}
            <div className="lg:col-span-6 text-left flex flex-col items-start -mt-20 sm:-mt-4 lg:mt-0"> <p className="text-base sm:text-xl 3xl:text-2xl font-bold tracking-wider sm:tracking-widest text-white mb-3 sm:mb-4 leading-snug max-w-full break-words"> Unveil Your Brand's Identity with Captivating </p> <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl 3xl:text-8xl leading-tight tracking-tight text-white mb-5 sm:mb-6" > Logo Design </motion.h1> {/* Rotating word border box */} <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative overflow-hidden rounded-2xl border-2 border-white px-4 sm:px-6 3xl:px-8 py-3 sm:py-3.5 3xl:py-4 mb-5 sm:mb-6 bg-white/[0.02] max-w-full" > <div className="flex items-center gap-2 text-lg sm:text-xl md:text-2xl 3xl:text-3xl font-bold whitespace-nowrap"> <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom"> <AnimatePresence mode="wait"> <motion.span key="logo-design" initial={{ y: "-100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "100%", opacity: 0 }} transition={{ duration: 0.45, ease: "easeInOut" }} className="block text-sky-400" > & Brand Identity </motion.span> </AnimatePresence> </span> </div> </motion.div> <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-base md:text-lg 3xl:text-xl text-slate-350 max-w-xl 3xl:max-w-2xl mb-6 sm:mb-8 leading-relaxed" > Top-Rated Creative Branding Agency for Logo, Web & Design Solutions. </motion.p> {/* Avatars + rating */} <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mb-6" > <div className="flex -space-x-3 mb-4"> {avatars.map((src, i) => (<div key={i} className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full border-2 border-dark-bg overflow-hidden relative" > <Image src={src} alt="Client avatar" fill className="object-cover" /> </div>))} </div> <p className="text-base 3xl:text-lg font-bold text-white"> 4.9/5 Star Rating on Google </p> <p className="text-sm 3xl:text-base font-semibold text-sky-400"> Trusted By Businesses Across Industries </p> </motion.div>    {/* ✅ FIX: restored missing opening <a tags */}
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
              </div> </div>

            {/* Right Image */}
            <div className="lg:col-span-5 w-full flex">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative -translate-y-14 max-w-[700px] 3xl:max-w-[860px] 4xl:max-w-[980px]"
              >
                <Image
                  src="/images/logo-design/1.png"
                  alt="Brand Identity Showreel"
                  width={700}
                  height={500}
                  priority
                  className="w-auto h-auto max-w-full object-contain"
                />
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <MarqueeRibbon />

      {/* SECTION 2: TRUST & VALUE PROPOSITION */}
      <section className="py-12 sm:py-16 3xl:py-20 bg-dark-bg border-b border-glass-border">
        <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-8 3xl:gap-10">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group w-[130px] sm:w-[170px] md:w-[190px] 3xl:w-[220px] rounded-2xl sm:rounded-3xl border-2 border-sky-500 flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8 3xl:py-10 px-3 sm:px-4 text-center"
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 3xl:w-14 3xl:h-14 rounded-xl bg-sky-500 group-hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center overflow-hidden transition-transform duration-500 ease-out hover:scale-110 shrink-0">
                  <img
                    src={badge.icon}
                    alt={`${badge.line1} ${badge.line2}`}
                    className="w-9 h-9 sm:w-10 sm:h-10 3xl:w-12 3xl:h-12 brightness-0 invert"
                  />
                </div>
                <span className="text-xs sm:text-sm md:text-base 3xl:text-lg font-bold text-white leading-snug">
                  {badge.line1}
                  <br />
                  {badge.line2}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT OUR BRANDING SERVICES */}
      <section className="py-16 md:py-24 3xl:py-32 bg-dark-bg relative">
        <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto px-6 relative z-10">

          {/* Top Heading Row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 3xl:gap-8 mb-10">
            {/* Left: Heading */}
            <div>
              <h3 className="text-2xl md:text-3xl 3xl:text-4xl font-bold text-white leading-snug">
                Making a Lasting
              </h3>
              <h2 className="font-display font-extrabold text-4xl md:text-5xl 3xl:text-6xl text-sky-400 leading-tight">
                Mark in The Market
              </h2>
            </div>

            {/* Right: Subtitle */}
            <p className="text-slate-400 text-bg md:text-base 3xl:text-lg leading-relaxed max-w-xs 3xl:max-w-sm md:text-left">
              Your Brand Is A Story Unfolding Across All Customer Touch Points
            </p>
          </div>

          {/* Video Section */}
          <div className="w-full">
            <div className="relative aspect-[16/9] rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-glass-border bg-slate-950/40 shadow-xl">
              <video
                className="w-full h-full object-cover"
                src="/images/logo-design/2.mp4"
                poster="/images/branding-showcase-poster.jpg"
                autoPlay
                muted
                loop

              />
            </div>
          </div>

        </div>
      </section>
      {/* SECTION 4: PORTFOLIO SHOWCASE */}
      <section
        id="portfolio"
        className="py-24 3xl:py-32 bg-dark-bg border-t border-b border-glass-border"
      >
        <div className="max-w-[1600px] 3xl:max-w-[1900px] 4xl:max-w-[2200px] mx-auto px-6 lg:px-10">

          {/* Heading */}
          <div className="text-center mb-14 3xl:mb-18 overflow-x-auto">
            <h2 className="font-display font-bold text-xl md:text-2xl lg:text-4xl 3xl:text-5xl text-white leading-snug mb-4 whitespace-nowrap">
              Your Brand is a Story Unfolding Across all Customer Touch Points
            </h2>

            <p className="text-sm md:text-base 3xl:text-lg font-semibold text-sky-400">
              Check Out These Samples Of Our Work
            </p>
          </div>

          {/* Masonry Portfolio */}
          <div className="columns-1 sm:columns-2 lg:columns-3 3xl:columns-4 gap-6 3xl:gap-8 [column-fill:_balance]">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`relative w-full ${item.aspect} rounded-2xl 3xl:rounded-3xl overflow-hidden mb-6 3xl:mb-8 break-inside-avoid bg-slate-100 group ${item.type === "video" ? "" : "cursor-zoom-in"
                  }`}
                onClick={() => {
                  if (item.type !== "video") setActiveIndex(idx);
                }}
              >
                {item.type === "video" ? (
                  <video
                    src={item.src}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.overlayText || "Portfolio sample"}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                )}

                {item.overlayText && (
                  <div className="absolute inset-0 flex items-end p-5 3xl:p-6 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-semibold text-lg 3xl:text-xl">
                      {item.overlayText}
                    </span>
                  </div>
                )}

                {/* Zoom icon on hover (images only) */}
                {item.type !== "video" && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <span className="flex items-center justify-center w-11 h-11 3xl:w-13 3xl:h-13 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                        <ZoomIn className="w-4 h-4 3xl:w-5 3xl:h-5 text-white" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* LIGHTBOX */}
        <AnimatePresence>
          {isLightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 sm:p-8"
              onClick={closeLightbox}
            >
              <div className="absolute top-4 left-4 sm:top-6 sm:left-8 text-white/80 font-mono text-xs sm:text-sm 3xl:text-base tracking-wider z-10">
                {activeIndex + 1} / {items.length}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 3xl:w-12 3xl:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10"
              >
                <X className="w-5 h-5 3xl:w-6 3xl:h-6 text-white" />
              </button>

              <button
                type="button"
                onClick={showPrevImage}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 3xl:w-14 3xl:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 3xl:w-7 3xl:h-7 text-white" />
              </button>

              <button
                type="button"
                onClick={showNextImage}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 3xl:w-14 3xl:h-14 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 3xl:w-7 3xl:h-7 text-white" />
              </button>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={items[activeIndex].src}
                    alt={items[activeIndex].overlayText || "Portfolio sample"}
                    className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </section>


      <Testimonials />




      {/* SECTION 5: PRICING PACKAGES */}
      <section id="pricing" className="py-24 3xl:py-32 bg-dark-bg relative overflow-hidden">
        {/* Giant faded background text */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
          <span className="font-display font-black text-[10rem] md:text-[14rem] 3xl:text-[18rem] text-white/[0.03] leading-none tracking-tight">
            PRICING
          </span>
        </div>

        <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 3xl:gap-8 mb-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs 3xl:text-sm font-bold uppercase tracking-widest text-neon-cyan bg-slate-900/60 border border-glass-border px-4 py-1.5 3xl:px-5 3xl:py-2 rounded-full mb-4">
                Pricing
              </span>
              <h2 className="font-display font-extrabold text-3xl md:text-5xl 3xl:text-6xl text-white">
                Our Logo Design Packages
              </h2>
            </div>
            <p className="text-sm 3xl:text-base text-slate-400 max-w-xs 3xl:max-w-sm">
              Here are three different plans tailored to Startup, Advance, and Premium levels for your branding needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 3xl:gap-8 items-stretch">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl 3xl:rounded-[2rem] p-8 3xl:p-10 flex flex-col justify-between relative border ${pkg.popular
                  ? "border-white/20 bg-slate-900/80 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                  : "border-glass-border bg-slate-950/40"
                  }`}
              >
                <div>
                  {/* Icon + Name */}
                  <div className="w-11 h-11 3xl:w-13 3xl:h-13 rounded-xl bg-slate-900 border border-glass-border flex items-center justify-center mb-6">
                    <img
                      src={pkg.icon}
                      alt={`${pkg.name} icon`}
                      className="w-7 h-7 3xl:w-8 3xl:h-8 brightness-0 saturate-100"
                      style={{ filter: "invert(70%) sepia(70%) saturate(1000%) hue-rotate(150deg) brightness(1.1)" }}
                    />
                  </div>

                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-display font-bold text-lg 3xl:text-xl text-white">{pkg.name}</h3>
                    <div className="text-right shrink-0 ml-3">
                      <span className="font-display font-extrabold text-2xl 3xl:text-3xl text-white">{pkg.price}</span>
                      <span className="text-xs 3xl:text-sm text-slate-500"> / GST</span>
                    </div>
                  </div>
                  <p className="text-xs 3xl:text-sm text-slate-500 line-through mb-4">{pkg.oldPrice} Original</p>
                  <p className="text-xs 3xl:text-sm text-slate-400 leading-relaxed mb-6">{pkg.tagline}</p>

                  {/* CTA button */}
                  <a href={pkg.link}
                    className={`w-full py-3 3xl:py-4 rounded-xl font-bold text-center text-sm 3xl:text-base transition-all block mb-8 ${pkg.popular
                      ? "bg-white text-slate-950 hover:bg-slate-100"
                      : "bg-slate-900 border border-glass-border text-white hover:border-white"
                      }`}
                  >
                    Order Now →
                  </a>

                  {/* Features */}
                  <div className="border-t border-glass-border/60 pt-6">
                    <span className="text-xs 3xl:text-sm font-bold uppercase tracking-wider text-slate-400 block mb-4">
                      Features:
                    </span>
                    <ul className="flex flex-col gap-3 3xl:gap-3.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-xs 3xl:text-sm text-slate-300">
                          <Check className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 text-neon-cyan shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-14">
            <a href="/contact"
              className="px-8 py-3 3xl:px-10 3xl:py-4 rounded-xl text-sm 3xl:text-base font-bold text-slate-300 border border-glass-border hover:border-white hover:text-white transition-all bg-white/5 backdrop-blur-sm"
            >
              View More
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS (ALTERNATING FULL-WIDTH ROWS) */}
      <section className="bg-dark-bg border-t border-b border-glass-border relative overflow-hidden">
        {/* Header */}
        <div className="py-14 md:py-20 3xl:py-28 text-center px-6">
          <span className="text-xs 3xl:text-sm font-bold uppercase tracking-widest text-neon-cyan">
            How It Works
          </span>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl 3xl:text-6xl text-white mt-4 leading-snug">
            Makes It Easy to Create Your Logo &amp; Branding
          </h2>
        </div>

        {/* Rows */}
        <div className="flex flex-col">
          {howItWorks.map((step, idx) => {
            const imageFirst = idx % 2 !== 0;
            return (
              <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[420px] 3xl:min-h-[520px]">
                {/* Text block */}
                <div
                  className={`flex flex-col justify-center px-6 sm:px-10 md:px-16 3xl:px-20 py-12 md:py-16 3xl:py-20 ${step.bg} ${imageFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                >
                  <div className="w-10 h-10 3xl:w-12 3xl:h-12 rounded-full  flex items-center justify-center mb-5 md:mb-6">
                    <img
                      src={step.iconImage}
                      alt={`${step.title} icon`}
                      className="w-11 h-11 3xl:w-14 3xl:h-14"
                    />
                  </div>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl 3xl:text-4xl text-slate-950 mb-3 md:mb-4 max-w-sm 3xl:max-w-md leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm md:text-base 3xl:text-lg text-slate-900/80 max-w-md 3xl:max-w-lg leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Image block */}
                <div
                  className={`relative w-full h-[240px] sm:h-[320px] lg:h-auto lg:min-h-full bg-slate-900 overflow-hidden ${imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority={idx === 0}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: FAQS ACCORDION — FULL WIDTH */}
      <section className="py-24 3xl:py-32 bg-dark-bg relative">
        {/* Header - stays contained */}
        <div className="max-w-4xl 3xl:max-w-5xl mx-auto px-6 text-center mb-16 flex flex-col items-center">
          <div className="w-14 h-14 3xl:w-16 3xl:h-16 rounded-full border-2 border-white/70 flex items-center justify-center mb-6">
            <MessageCircleQuestion className="w-6 h-6 3xl:w-7 3xl:h-7 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl 3xl:text-6xl text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="flex items-center gap-1.5 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            <span className="w-10 h-1 rounded-full bg-sky-500" />
          </div>
          <p className="text-sm 3xl:text-base text-slate-400">
            Answer To Our Most Frequently Asked Questions are just one Click Away.
          </p>
        </div>

        {/* Accordion rows - full width, with gap */}
        <div className="w-full max-w-[1600px] 3xl:max-w-[1900px] mx-auto flex flex-col gap-3 3xl:gap-4 px-6 3xl:px-10">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={`w-full transition-all duration-300 ${isOpen ? "border border-white" : "border border-transparent"
                  }`}
                style={{
                  background: " #1487c9",
                }}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-4 md:px-5 3xl:px-6 py-4 3xl:py-5 flex items-center gap-4 text-left"
                >
                  <ChevronDown
                    className={`w-5 h-5 3xl:w-6 3xl:h-6 text-white shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""
                      }`}
                  />
                  <span className="font-display font-bold text-sm md:text-base 3xl:text-lg text-white">
                    {faq.q}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 md:px-10 pb-6 pl-15 md:pl-19 text-sm 3xl:text-base text-white/85 leading-relaxed">
                        {faq.list ? (
                          <ol className="list-decimal pl-5 flex flex-col gap-1.5">
                            {faq.list.map((item, lIdx) => (
                              <li key={lIdx}>{item}</li>
                            ))}
                          </ol>
                        ) : (
                          <p>{faq.a}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <FinalCTA />

    </main>
  );
}