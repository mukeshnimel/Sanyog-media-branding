"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SocialNetworkVisual from "@/components/Socialnetworkvisual";

import "swiper/css";
import {
    Check,
    X,
    ChevronDown,
    MessageCircleQuestion,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";

// ---------- DATA ----------

const rotatingWords = ["Social Media Marketing", "Social Media Management"];

const avatarSeeds = [12, 32, 47, 5, 15, 60];

const services = [
    {
        icon: "/images/digital-marketing/icons/1.svg",
        title: "Content Creation",
        desc: "Crafting posts, images, videos, reels, and stories that resonate with your target audience.",
    },
    {
        icon: "/images/digital-marketing/icons/2.svg",
        title: "Engagement",
        desc: "Responding to comments, DMs, shares, and mentions. Building community and trust through interaction.",
    },
    {
        icon: "/images/digital-marketing/icons/3.svg",
        title: "Analytics & Strategy",
        desc: "Using tools to track what's working, adjusting your content and posting strategy based on data.",
    },
    {
        icon: "/images/digital-marketing/icons/4.svg",
        title: "Paid Advertising",
        desc: "Running targeted ads to reach more people, traffic, or boost conversions. Platforms offer advanced targeting.",
    },
];

const infoListLeft = [
    "Social Media Platform Management",
    "Content Creation",
    "Social Media Advertising (Paid Ads)",
    "Influencer Marketing",
    "Digital web files (RGB, CMYK, PNG, JPEG, PDF)",
];

const infoListRight = [
    "Audience Analytics & Reporting",
    "Social Media Trend Analysis",
    "Automation Integration",
    "Reputation Management",
    "Copyright Ownership Transfer",
];

const portfolioGallery = [
    "/images/home/social-media-marketing/1.png",
    "/images/home/social-media-marketing/2.png",
    "/images/home/social-media-marketing/3.png",
    "/images/home/social-media-marketing/4.png",
    "/images/home/social-media-marketing/5.png",
    "/images/home/social-media-marketing/6.png",
    "/images/home/social-media-marketing/7.png",
    "/images/home/social-media-marketing/8.png",
    "/images/home/social-media-marketing/9.png",
    "/images/home/social-media-marketing/10.png",
    "/images/home/social-media-marketing/11.png",
    "/images/home/social-media-marketing/12.jpg",
];

const pricingPlans = [
    {
        name: "BASIC PLAN",
        subtitle: "Best For First Time",
        price: "₹10999",
        period: "+ GST / Month / Account",
        features: [
            "1 Social Media Post / Week",
            "Social Media Management",
            "1 Marketing Post / 15 Days",
            "2 Advertisement Reels",
        ],
        excluded: ["Researched Content Creation"],
    },
    {
        name: "STANDARD PLAN",
        subtitle: "Recommended",
        price: "₹19999",
        period: "+ GST / Month / Account",
        popular: true,
        features: [
            "5 Post & 5 Reels / Month",
            "Social Media Management",
            "2 Marketing Post / Week",
            "Market / Location Research",
            "Researched Content Creation",
        ],
        excluded: [],
    },
    {
        name: "PREMIUM PLAN",
        subtitle: "Best For Large Business",
        price: "₹29999",
        period: "+ GST / Month / Account",
        features: [
            "1 Post / 2 Days",
            "4 Marketing Post / Week",
            "24 x 7 Social Media Management",
            "Advance Market & Location Research",
            "Advanced Content Creation",
        ],
        excluded: [],
    },
];

const howItWorks = [
    {
        icon: "/images/digital-marketing/icons/5.svg",
        title: "Strategy Planning",
        desc: "Define your goals (brand awareness, engagement, leads), target audience, platforms, and tone. This sets the direction for all your content and activity.",
    },
    {
        icon: "/images/digital-marketing/icons/6.svg",
        title: "Profile Setup & Optimization",
        desc: "Create or update social media accounts with branded visuals, engaging bios, and relevant links to ensure a professional and cohesive online presence.",
    },
    {
        icon: "/images/digital-marketing/icons/7.svg",
        title: "Content Calendar & Scheduling",
        desc: "Plan and organize posts in advance to ensure consistent posting. Use scheduling tools to save time and stay organized.",
    },
    {
        icon: "/images/digital-marketing/icons/8.svg",
        title: "Continuous Optimization",
        desc: "Regularly review what's working and tweak your strategy, content, and posting times to maximize performance.",
    },
];

const faqs = [
    {
        q: "Why Should I Choose Sanyog Media for Social Media Marketing?",
        a: "After being successful in the exhibition stall designing & fabrication, we have started Social Media Marketing. Our motive is to provide you the best experienced creative artists, designers & data team who can justify the values of your brand with Social Media.",
    },
    {
        q: "Can I Upgrade My Package During The Order?",
        a: "Yes… absolutely. You can upgrade your package any time during your order. All you have to do is pay the price difference at the delivery time.",
    },
    {
        q: "Do You Offer Discounts?",
        a: "We believe there is no such thing as a discount. If you decrease the price, the quality will suffer as well. Here at Sanyog Media we never compromise on the quality of our work — so we can lose the order but cannot offer discounts because of our personal standards.",
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

// ---------- BLINDS ANIMATION ----------

function BlindsRotatingText({ words, delay = 1500 }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, delay);
        return () => clearInterval(interval);
    }, [words.length, delay]);

    const SLAT_COUNT = 6;

    return (
        <span className="relative top-[-2px] inline-block h-[1.2em] overflow-hidden align-middle text-sky-400">
            <AnimatePresence mode="wait">
                <motion.span
                    key={index}
                    className="absolute inset-0 flex"
                    style={{ perspective: 400 }}
                >
                    {[...Array(SLAT_COUNT)].map((_, slatIdx) => (
                        <motion.span
                            key={slatIdx}
                            className="relative block h-full overflow-hidden"
                            style={{ width: `${100 / SLAT_COUNT}%` }}
                            initial={{ rotateX: -90, opacity: 0 }}
                            animate={{ rotateX: 0, opacity: 1 }}
                            exit={{ rotateX: 90, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: slatIdx * 0.04,
                                ease: "easeInOut",
                            }}
                        >
                            <span
                                className="absolute top-0 left-0 whitespace-nowrap"
                                style={{
                                    transform: `translateX(-${slatIdx * (100 / SLAT_COUNT)}%)`,
                                    width: `${SLAT_COUNT * 100}%`,
                                }}
                            >
                                {words[index]}
                            </span>
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
            <span className="opacity-0 pointer-events-none whitespace-nowrap">
                {words.reduce((a, b) => (a.length > b.length ? a : b))}
            </span>
        </span>
    );
}

// ---------- PAGE ----------

export default function SocialMediaMarketingPage() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [accordionIndex, setAccordionIndex] = useState(1);

    const accordionImages = [
        "/images/screenshots/3-1.png",
        "/images/screenshots/2-1.png",
        "/images/screenshots/1-1.png",
    ];

    return (
        <main className="flex-1 bg-dark-bg text-slate-100 overflow-x-hidden">

            {/* 1. HERO */}
            <section className="relative py-14 sm:py-20 md:py-28 4xl:py-36 bg-dark-bg border-b border-glass-border overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 md:w-96 md:h-96 4xl:w-[30rem] 4xl:h-[30rem] rounded-full bg-electric-blue/10 blur-[100px] md:blur-[130px] pointer-events-none" />
                <div className="w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">
                        {/* Left — copy */}
                        <div className="flex flex-col items-start pt-8 sm:pt-10 md:pt-0">
                            <h1 className="font-display font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl leading-tight text-white mb-1">
                                We Manage Your
                            </h1>
                            <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl leading-tight mb-4 text-sky-400">
                                Socials Media
                            </h2>

                            <div className="text-base sm:text-lg md:text-3xl xl:text-4xl 4xl:text-5xl text-white mb-6">
                                With <BlindsRotatingText words={rotatingWords} delay={1500} />
                            </div>

                            <p className="text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8 max-w-xl xl:max-w-2xl 4xl:max-w-3xl">
                                At Sanyog Media, We Design Scroll-Stopping Visuals With Strategy
                                And Creativity, Helping Your Brand Build Real Connections And
                                Grow Online
                            </p>

                            <div className="flex -space-x-3 mb-5">
                                {avatarSeeds.map((seed, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 rounded-full border-2 border-dark-bg overflow-hidden relative"
                                    >
                                        <Image
                                            src={`https://i.pravatar.cc/64?img=${seed}`}
                                            alt="Client avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-8">
                                <p className="text-base xl:text-lg 4xl:text-xl font-bold text-white">4.9/5 Star Rating</p>
                                <p className="text-sm xl:text-base 4xl:text-lg font-semibold text-sky-400">
                                    Based on Google Review
                                </p>
                            </div>

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

                        <SocialNetworkVisual />
                    </div>
                </div>
            </section>

            {/* 2. MARQUEE RIBBON */}
            <section className="py-0 bg-slate-950 border-b border-glass-border relative overflow-hidden">
                <div className="bg-[#fff0] bg-[linear-gradient(180deg,#007EC373_0%,#07ADD01A_100%)] py-6 md:py-8 4xl:py-10 border-y border-glass-border/40">
                    <div className="marquee-track flex items-center gap-10 md:gap-16 4xl:gap-20 whitespace-nowrap">
                        {[...Array(2)].map((_, setIdx) => (
                            <div key={setIdx} className="flex items-center gap-10 md:gap-16 4xl:gap-20 shrink-0">
                                {[
                                    "We Build Different",
                                    "Grow Your Brand",
                                    "Digital Excellence",
                                    "Create. Build. Grow.",
                                    "Your Vision, Our Strategy",
                                    "Ideas Into Reality",
                                    "Powering Digital Brands",
                                    "We Make Brands Stand Out",
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3 md:gap-4 4xl:gap-5 shrink-0">
                                        <div className="w-8 h-8 md:w-10 md:h-10 4xl:w-12 4xl:h-12 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                            <Image
                                                src="https://sanyogmedia.in/wp-content/uploads/2024/11/SMC-Churu-Landing-Page-2.png"
                                                alt="Icon"
                                                width={40}
                                                height={40}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="font-display font-bold text-lg sm:text-xl md:text-3xl 4xl:text-4xl text-white tracking-wide">
                                            {text}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx global>{`
                    .marquee-track {
                        width: max-content;
                        animation: marquee-scroll 25s linear infinite;
                    }
                    @keyframes marquee-scroll {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </section>

            {/* 3. SERVICES GRID */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg border-b border-glass-border">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 xl:gap-8 4xl:gap-10">
                        {services.map((s, idx) => (
                            <div
                                key={idx}
                                className="bg-[linear-gradient(180deg,#17226DA3_21%,#0774D0_100%)] border-2 border-white p-6 xl:p-7 4xl:p-9 rounded-2xl flex flex-col items-center text-center gap-4 4xl:gap-5"
                            >
                                <div className="w-16 h-16 xl:w-[4.5rem] xl:h-[4.5rem] 4xl:w-20 4xl:h-20 bg-white border-[3px] border-gray-400 rounded-xl flex items-center justify-center">
                                    <Image
                                        src={s.icon}
                                        alt={s.title}
                                        width={40}
                                        height={40}
                                        className="w-10 h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 object-contain"
                                    />
                                </div>

                                <h3 className="font-display font-bold text-xl xl:text-2xl 4xl:text-3xl text-white">
                                    {s.title}
                                </h3>

                                {/* ✅ FIX: `text-bg` was invalid; use text-sm/base */}
                                <p className="text-sm xl:text-lg 4xl:text-xl text-slate-400 leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US — IMAGE ACCORDION */}
            <section className="py-16 md:py-24 4xl:py-32 bg-slate-950 border-b border-glass-border">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight mb-4">
                            Creative Post &amp; Flyer Design Backed by{" "}
                            <span className="gradient-text">
                                Smart Social Media Marketing
                            </span>
                        </h2>

                        <p className="text-xl sm:text-2xl md:text-3xl xl:text-4xl 4xl:text-5xl text-white">
                            Connect, Design &amp; Convert
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row h-[560px] sm:h-[360px] md:h-[500px] xl:h-[600px] 4xl:h-[720px] w-full mb-12 md:mb-16 4xl:mb-20 gap-1 sm:gap-0 px-1 sm:px-0">
                    {accordionImages.map((src, idx) => {
                        const isActive = accordionIndex === idx;
                        return (
                            <div
                                key={idx}
                                onClick={() => setAccordionIndex(idx)}
                                className={`relative overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-xl sm:rounded-none ${isActive
                                    ? "z-10 scale-[1.02] shadow-[0_15px_40px_rgba(0,0,0,0.5)] sm:scale-100 sm:shadow-none sm:z-auto"
                                    : "opacity-90 sm:opacity-100"
                                    }`}
                                style={{ flex: isActive ? 3 : 1 }}
                            >
                                <Image
                                    src={src}
                                    alt={`Showcase ${idx + 1}`}
                                    fill
                                    className={`object-cover transition-all duration-500 ${isActive
                                        ? "blur-none brightness-100"
                                        : "blur-[3px] brightness-[0.6] scale-105 sm:blur-none sm:brightness-100 sm:scale-100"
                                        }`}
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-70 sm:opacity-100"
                                        }`}
                                />

                                {/* ✅ FIX: restored opening <a tag */}
                                {isActive && (
                                    <a
                                        href="#contact"
                                        className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 md:px-6 xl:px-7 4xl:px-9 py-2 md:py-3 xl:py-3.5 4xl:py-4 rounded-full text-xs sm:text-sm md:text-base xl:text-lg 4xl:text-xl font-bold whitespace-nowrap transition-all duration-300 hover:scale-105"
                                    >
                                        Contact Us
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Checkmark lists */}
                <div className="w-full px-4 sm:px-6 xl:px-16 4xl:px-24 justify-center">
                    <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-16 xl:gap-x-20 4xl:gap-x-24 gap-y-5 xl:gap-y-6 justify-items-center">
                        {[...infoListLeft, ...infoListRight].map((item, idx) => (
                            <div
                                key={idx}
                                className="flex gap-4 xl:gap-5 w-full max-w-md xl:max-w-lg 4xl:max-w-xl"
                            >
                                <div className="w-7 h-7 xl:w-8 xl:h-8 4xl:w-9 4xl:h-9 rounded-full bg-neon-cyan/20 flex items-center justify-center shrink-0">
                                    <Check className="w-4 h-4 xl:w-5 xl:h-5 text-neon-cyan stroke-[3]" />
                                </div>
                                <span className="text-base md:text-lg xl:text-xl 4xl:text-2xl font-medium text-slate-300">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ✅ FIX: removed space after `<` */}
            <Testimonials />

            {/* 6. WHY CHOOSE OUR SERVICES */}
            <section className="py-16 md:py-24 4xl:py-32 bg-slate-950 border-b border-glass-border">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">
                        <div className="flex flex-col items-start">
                            <span className="text-sm xl:text-base 4xl:text-lg font-semibold text-neon-cyan mb-4">
                                Why Choose Our Social Media Post &amp; Flyer Design Services
                            </span>
                            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl 4xl:text-5xl text-white leading-tight mb-6">
                                Social Media Marketing Means Partnering With a Team That Blends Strategy &amp; Creative Social Media Post &amp; Flyer Design Services
                            </h2>
                            <span className="text-lg sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl font-display font-bold text-neon-cyan mb-4">
                                Creativity With Strategy
                            </span>
                            <p className="text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8">
                                We focus on understanding your brand, audience, and goals to create tailored content that drives real engagement and results. From eye-catching visuals to data-backed ad campaigns, we ensure every post and promotion contributes to your growth. Our commitment to consistency, performance, and innovation sets us apart in delivering measurable value across all social platforms.
                            </p>

                            {/* ✅ FIX: xl:py-4.5 → xl:py-4 */}
                            <a
                                href="#contact"
                                className="px-8 py-3.5 xl:px-10 xl:py-4 4xl:px-12 4xl:py-5 rounded-full text-sm xl:text-base 4xl:text-lg font-bold text-white glow-btn-primary"
                            >
                                Know More About Us
                            </a>
                        </div>

                        <div className="relative h-[260px] sm:h-[340px] md:h-[420px] xl:h-[480px] 4xl:h-[560px] w-full rounded-2xl overflow-hidden">
                            <Image
                                src="/images/digital-marketing/1.png"
                                alt="Social Media Marketing"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PORTFOLIO GALLERY */}
            <section id="smmport" className="py-16 md:py-24 4xl:py-32 bg-dark-bg border-b border-glass-border">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="w-full text-center max-w-7xl mx-auto mb-12 md:mb-16 4xl:mb-20 px-2 sm:px-4">
                        <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-[2.2rem] xl:text-5xl 4xl:text-6xl text-white leading-tight mb-4">
                            Your Brand is a Story, Told Through{" "}
                            <span className="gradient-text">
                                Social Media Post &amp; Flyer Design
                            </span>
                        </h2>

                        <p className="text-lg sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl text-white">
                            Check out these samples of our work
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 3xl:grid-cols-5 gap-3 md:gap-4 xl:gap-5 4xl:gap-6">
                        {portfolioGallery.map((src, i) => (
                            <div
                                key={i}
                                className="group relative aspect-square rounded-2xl overflow-hidden border border-glass-border cursor-pointer"
                            >
                                <Image
                                    src={src}
                                    alt="Social Media Post Design"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. PRICING */}
            <section id="pricing" className="py-16 md:py-24 4xl:py-32 bg-slate-950 relative overflow-hidden border-b border-glass-border">
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="font-display font-black text-[5rem] sm:text-[8rem] md:text-[12rem] 4xl:text-[15rem] text-white/[0.03] leading-none tracking-tight">
                        PRICING
                    </span>
                </div>

                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24 relative z-10">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="text-xs sm:text-sm xl:text-base 4xl:text-lg uppercase tracking-widest text-neon-cyan">
                            Social Media Marketing Packages
                        </span>

                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mt-4">
                            SMM Package Prices According To You Need
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 4xl:gap-10">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-6 sm:p-8 xl:p-9 4xl:p-11 flex flex-col justify-between border ${plan.popular
                                    ? "border-white/20 bg-slate-900/80 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                                    : "border-glass-border bg-slate-950/40"
                                    }`}
                            >
                                <div>
                                    {plan.popular && (
                                        <span className="inline-block mb-3 px-3 py-1 xl:px-3.5 xl:py-1.5 rounded-full bg-white text-slate-950 text-[10px] xl:text-xs font-bold uppercase tracking-widest">
                                            Recommended
                                        </span>
                                    )}
                                    <h3 className="font-display font-bold text-lg xl:text-xl 4xl:text-2xl text-white mb-1">{plan.name}</h3>
                                    <span className="text-xs xl:text-sm 4xl:text-base text-slate-500 uppercase tracking-wider">
                                        {plan.subtitle}
                                    </span>

                                    <div className="flex items-baseline gap-2 mt-4 mb-2">
                                        <span className="font-display font-extrabold text-3xl xl:text-4xl 4xl:text-5xl text-white">
                                            {plan.price}
                                        </span>
                                    </div>
                                    <span className="text-xs xl:text-sm 4xl:text-base text-slate-500">{plan.period}</span>

                                    {/* ✅ FIX: restored opening <a tag */}
                                    <a
                                        href="#contact"
                                        className={`w-full py-3 xl:py-3.5 4xl:py-4 rounded-xl font-bold text-center text-sm xl:text-base 4xl:text-lg transition-all block mt-6 mb-8 ${plan.popular
                                            ? "bg-white text-slate-950 hover:bg-slate-100"
                                            : "bg-slate-900 border border-glass-border text-white hover:border-white"
                                            }`}
                                    >
                                        Purchase Now
                                    </a>

                                    <div className="border-t border-glass-border/60 pt-6">
                                        <ul className="flex flex-col gap-3">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-xs xl:text-sm 4xl:text-base text-slate-300">
                                                    <Check className="w-3.5 h-3.5 xl:w-4 xl:h-4 4xl:w-5 4xl:h-5 text-neon-cyan shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                            {plan.excluded && plan.excluded.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-xs xl:text-sm 4xl:text-base text-slate-500">
                                                    <X className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 mt-0.5" />
                                                    <span>{feat}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. HOW IT WORKS */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg border-b border-glass-border">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="text-xs sm:text-sm xl:text-base 4xl:text-lg text-white uppercase tracking-widest text-neon-cyan">
                            How We Deliver Effective Social Media Post &amp; Flyer Design Services
                        </span>

                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4">
                            Start Strong with Our Social Media Post &amp; Flyer Design Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 xl:gap-8 4xl:gap-10">
                        {howItWorks.map((step, idx) => {
                            const gradients = [
                                "from-blue-600 to-cyan-600",
                                "from-yellow-500 to-amber-600",
                                "from-orange-600 to-red-600",
                                "from-green-600 to-emerald-600",
                            ];
                            return (
                                <div
                                    key={idx}
                                    className={`relative flex items-start justify-between gap-4 xl:gap-5 p-6 md:p-8 xl:p-9 4xl:p-11 rounded-3xl bg-gradient-to-br ${gradients[idx % gradients.length]} border border-white/20 overflow-hidden`}
                                >
                                    <div className="flex-1">
                                        <h3 className="font-display font-bold text-lg md:text-xl xl:text-2xl 4xl:text-3xl text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div>
                                    <div className="w-12 h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 4xl:w-24 4xl:h-24 bg-white border-[3px] border-gray-300 rounded-xl flex items-center justify-center shrink-0">
                                        <Image
                                            src={step.icon}
                                            alt={step.title}
                                            width={40}
                                            height={40}
                                            className="w-8 h-8 md:w-10 md:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 object-contain"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 10. FAQ */}
            <section className="py-16 md:py-24 4xl:py-32 bg-slate-950 relative">
                <div className="max-w-4xl xl:max-w-5xl 4xl:max-w-6xl mx-auto px-4 sm:px-6 text-center mb-12 md:mb-16 4xl:mb-20 flex flex-col items-center">
                    <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-full border-2 border-white/70 flex items-center justify-center mb-6">
                        <MessageCircleQuestion className="w-6 h-6 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-10 h-1 rounded-full bg-sky-500" />
                    </div>
                    <p className="text-sm xl:text-base 4xl:text-lg text-slate-400">
                        Answer To Our Most Frequently Asked Questions are just one Click Away.
                    </p>
                </div>

                <div className="w-full flex flex-col gap-3 xl:gap-4">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div
                                key={idx}
                                className={`w-full transition-all duration-300 ${isOpen ? "border border-white" : "border border-transparent"
                                    }`}
                                style={{ background: "#1487c9" }}
                            >
                                <button
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full px-4 md:px-5 xl:px-6 4xl:px-8 py-4 xl:py-5 4xl:py-6 flex items-center gap-4 xl:gap-5 text-left"
                                >
                                    {/* ✅ FIX: duration-250 → duration-300 */}
                                    <ChevronDown
                                        className={`w-5 h-5 xl:w-6 xl:h-6 4xl:w-7 4xl:h-7 text-white shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span className="font-display font-bold text-sm md:text-base xl:text-lg 4xl:text-xl text-white">
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
                                            <div className="px-6 md:px-10 pb-6 pl-14 md:pl-[4.75rem] text-sm xl:text-base 4xl:text-lg text-white/85 leading-relaxed">
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