"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SocialNetworkVisual from "@/components/Socialnetworkvisual";

import "swiper/css";
import {
    ChevronDown,
    MessageCircleQuestion,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import ClientLogoRibbon from "@/components/ClientLogoRibbon";

// ---------- DATA ----------

const rotatingWords = ["Instagram", "Facebook", "Youtube", "Linkedln"];

const avatarSeeds = ["https://randomuser.me/api/portraits/men/61.jpg",
    "https://randomuser.me/api/portraits/men/40.jpg",
    "https://randomuser.me/api/portraits/men/43.jpg",
    "https://randomuser.me/api/portraits/men/86.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/7.jpg",];

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

import { Check, X, Camera, Plane, Package, Video, Building2, Mic2 } from "lucide-react";

const pricingPlans = [
    {
        name: "BASIC",
        subtitle: "Ideal For Small Shops & New Businesses",
        price: "₹6999",
        period: "+ GST / Month",
        groups: [
            {
                category: "Social Media Management",
                items: [
                    "30 Monthly Content Pieces",
                    "27 Static Posts & Promotional Creatives",
                    "2 Animated Reels",
                    "1 Video Reel Editing",
                    "Facebook & Instagram Management",
                    "Professional Captions & Hashtags",
                    "Monthly Content Calendar",
                    "Basic Comment & DM Monitoring",
                ],
            },
            {
                category: "Local Business Visibility",
                items: [
                    "Google Business Profile",
                    "Basic Local Hashtag Strategy",
                    "Monthly Performance Report",
                ],
            },
        ],
        excluded: [
            "Meta Advertising (Paid Ads)",
            "Content Shoot",
        ],
    },
    {
        name: "GROWTH",
        subtitle: "For Growing Businesses With Paid Advertising",
        price: "₹10999",
        period: "+ GST / Month",
        groups: [
            {
                category: "Social Media Management",
                items: [
                    "30 Monthly Content Pieces",
                    "22 Static Posts & Promotional Creatives",
                    "4 Video Reels With Editing",
                    "4 Animated Reels",
                    "Facebook & Instagram Management",
                    "Professional Captions & Hashtags",
                    "Monthly Content Calendar",
                    "Basic Comment & DM Management",
                ],
            },
            {
                category: "Meta Advertising",
                items: [
                    "Facebook & Instagram Ads Management",
                    "1 Active Ad Campaign at a Time",
                    "Audience & Location Targeting",
                    "Basic Campaign Optimization",
                    "Ad Performance Reporting",
                ],
            },
            {
                category: "Local Business Visibility",
                items: [
                    "Google Business Profile",
                    "Basic Local SEO",
                    "Monthly Performance Report",
                ],
            },
        ],
        excluded: [
            "Content Shoot",
            "Lead Generation Campaign Setup",
        ],
    },
    {
        name: "BUSINESS GROWTH",
        subtitle: "Professional Content & Regular Advertising",
        price: "₹15999",
        period: "+ GST / Month",
        popular: true,
        groups: [
            {
                category: "Social Media Management",
                items: [
                    "30 Monthly Content Pieces",
                    "18 Static Posts & Promotional Creatives",
                    "8 Video Reels With Editing",
                    "4 Animated Reels",
                    "Facebook & Instagram Management",
                    "Professional Copywriting",
                    "Monthly Content Calendar",
                    "Comment & DM Management",
                ],
            },
            {
                category: "Meta Advertising",
                items: [
                    "Facebook & Instagram Ads Management",
                    "Up to 2 Active Ad Campaigns",
                    "Local Audience Targeting",
                    "Lead Generation Campaign Setup",
                    "Campaign Optimization",
                    "Monthly Ad Performance Report",
                ],
            },
            {
                category: "Content Production",
                items: [
                    "Basic Content Shoot / Month (Up to 2 Hours)",
                    "Product or Business Photography",
                    "Short Video Clips for Reels",
                ],
            },
            {
                category: "Local Marketing",
                items: [
                    "Google Business Profile Management",
                    "Local SEO Optimization",
                    "Monthly Competitor Review",
                    "Monthly Marketing Strategy Meeting",
                ],
            },
        ],
        excluded: [],
    },
    {
        name: "BUSINESS PRO",
        subtitle: "Complete Management, Content & Advertising",
        price: "₹20999",
        period: "+ GST / Month",
        groups: [
            {
                category: "Social Media Management",
                items: [
                    "30 Monthly Content Pieces",
                    "14 Premium Static Posts & Promotional Creatives",
                    "12 Professional Video Reels With Editing",
                    "4 Animated Reels",
                    "Facebook & Instagram Management",
                    "Advanced Content Calendar",
                    "Professional Copywriting",
                    "Comment & DM Management",
                ],
            },
            {
                category: "Meta Advertising",
                items: [
                    "Facebook & Instagram Ads Management",
                    "Up to 3 Active Ad Campaigns",
                    "Lead Generation & Awareness Campaigns",
                    "Audience Research & Retargeting Setup",
                    "Weekly Campaign Optimization",
                    "Lead & Campaign Performance Tracking",
                ],
            },
            {
                category: "Professional Content Production",
                items: [
                    "Content Shoots / Month",
                    "Product & Business Photography",
                    "Professional Reel Shooting",
                    "Basic Promotional Video Production",
                ],
            },
            {
                category: "Local Marketing & Strategy",
                items: [
                    "Google Business Profile Management",
                    "Local SEO Optimization",
                    "Competitor Content Analysis",
                    "Monthly Strategy Meeting",
                    "Detailed Monthly Performance Report",
                ],
            },
        ],
        excluded: [],
    },
];
const planThemes = [
    {
        // 1st card - purple
        header: "from-green-600 to-emerald-600",
        button: "from-green-600 to-emerald-600 shadow-[0_10px_25px_-8px_rgba(124,58,237,0.7)]",
        price: "text-green-600",
    },
    {
        // 2nd card - blue
        header: "from-orange-600 to-red-600",
        button: "from-orange-600 to-red-600 shadow-[0_10px_25px_-8px_rgba(37,99,235,0.7)]",
        price: "text-orange-600",
    },
    {
        // popular card - magenta / pink
        header: "from-blue-600 to-cyan-600",
        button: "from-blue-600 to-cyan-600 shadow-[0_10px_25px_-8px_rgba(217,70,239,0.7)]",
        price: "text-blue-600",
    },
    {
        // last card - coral / red
        header: "from-yellow-500 to-amber-600",
        button: "from-yellow-500 to-amber-600 shadow-[0_10px_25px_-8px_rgba(244,63,94,0.7)]",
        price: "text-yellow-600",
    },
];


const HEADER_SHAPE = "polygon(0 0, 100% 0, 100% 82%, 50% 100%, 0 82%)";

const addOnThemes = [
    {
        gradient: "from-blue-600 to-cyan-600",
        glow: "group-hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.5)]",
        text: "text-cyan-300",
    },
    {
        gradient: "from-yellow-500 to-amber-600",
        glow: "group-hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.5)]",
        text: "text-amber-300",
    },
    {
        gradient: "from-orange-600 to-red-600",
        glow: "group-hover:shadow-[0_20px_50px_-15px_rgba(239,68,68,0.5)]",
        text: "text-orange-300",
    },
    {
        gradient: "from-green-600 to-emerald-600",
        glow: "group-hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.5)]",
        text: "text-emerald-300",
    },
];



const addOnServices = [
    {
        Icon: Camera,
        name: "Professional Model Shoot",
        desc: "Professional model-based photography & promotional content shoot.",
    },
    {
        Icon: Plane,
        name: "Drone Shoot + Professional Editing",
        desc: "Aerial drone photography/videography with professionally edited final footage.",
    },
    {
        Icon: Package,
        name: "Professional Product Shoot",
        desc: "High-quality product photography for social media, websites, catalogues & advertisements.",
    },
    {
        Icon: Video,
        name: "Professional Reel Shoot + Editing",
        desc: "Concept-based professional reel shooting with cinematic editing, transitions, music & branding.",
    },
    {
        Icon: Building2,
        name: "Business / Corporate Shoot",
        desc: "Office, showroom, factory, team & business profile photography/videography.",
    },
    {
        Icon: Mic2,
        name: "Professional Interview / Testimonial Shoot",
        desc: "Customer testimonials, founder videos, expert interviews & promotional videos.",
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
        <span className="font-alata relative top-[-2px] inline-block h-[1.2em] overflow-hidden align-middle text-sky-400">
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
            <section className="relative py-14 sm:py-20 md:py-28 4xl:py-36 bg-dark-bg  overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 md:w-96 md:h-96 4xl:w-[30rem] 4xl:h-[30rem] rounded-full bg-electric-blue/10 blur-[100px] md:blur-[130px] pointer-events-none" />
                <div className="w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">
                        {/* Left — copy */}
                        <div className="flex flex-col items-start pt-8 sm:pt-10 md:pt-0">
                            <h1 className="font-alata font-extrabold text-xl sm:text-xl md:text-3xl xl:text-4xl 4xl:text-5xl leading-tight text-white mb-1">
                                We Grow Your
                            </h1>
                            <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl leading-tight mb-4 text-sky-400">
                                Digital Presence
                            </h2>

                            <div className="font-nunito text-base sm:text-lg md:text-3xl xl:text-4xl 4xl:text-5xl text-white mb-6">
                                With <BlindsRotatingText words={rotatingWords} delay={1500} />
                            </div>

                            <p className="font-nunito text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8 max-w-xl xl:max-w-2xl 4xl:max-w-3xl">
                                From strategy to execution, we create digital marketing solutions that connect your brand with the right audience and drive meaningful growth
                            </p>

                            <div className="flex -space-x-3 mb-5">
                                {avatarSeeds.map((seed, i) => (
                                    <div
                                        key={i}
                                        className="w-9 h-9 md:w-10 md:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 rounded-full border-2 border-dark-bg overflow-hidden relative"
                                    >
                                        <Image
                                            src={`${seed}`}
                                            alt="Client avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-8">
                                <p className="font-nunito text-[16px] sm:text-[18px] xl:text-[22px] 4xl:text-[28px] font-bold text-white">
                                    4.9/5 Star Rating on Google
                                </p>

                                <p className="font-nunito text-[15px] sm:text-[17px] xl:text-[20px] 4xl:text-[25px] font-semibold text-sky-400">
                                    Based on Google Review
                                </p>
                            </div>

                            <div className="relative flex flex-col sm:flex-row gap-3 xl:gap-4 w-full sm:w-auto">
                                <a
                                    href="#contact"
                                    className="font-nunito px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                                >
                                    Connect With Us
                                </a>

                                <a
                                    href="#smmport"
                                    className="font-nunito px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                                >
                                    Portfolio
                                </a>

                                {/* <div className="hidden lg:grid grid-cols-8 gap-2 4xl:gap-3 absolute left-[220px] xl:left-[260px] 4xl:left-[320px] top-1">
                                    {[...Array(24)].map((_, i) => (
                                        <span key={i} className="w-1 h-1 4xl:w-1.5 4xl:h-1.5 rounded-full bg-indigo-400/40" />
                                    ))}
                                </div> */}
                            </div>
                        </div>

                        <SocialNetworkVisual />
                    </div>
                </div>
            </section>

            <ClientLogoRibbon />

            {/* 3. SERVICES GRID */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg ">
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

                                <h3 className="font-alata font-bold text-xl xl:text-2xl 4xl:text-3xl text-white">
                                    {s.title}
                                </h3>

                                <p className="font-nunito text-sm xl:text-lg 4xl:text-xl text-slate-400 leading-relaxed">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US — IMAGE ACCORDION */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg ">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight mb-4">
                            Creative Post &amp; Flyer Design Backed by{" "}
                            <span className="gradient-text">
                                Smart Social Media Marketing
                            </span>
                        </h2>

                        <p className="font-nunito text-xl sm:text-2xl md:text-3xl xl:text-4xl 4xl:text-5xl text-white">
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

                                {isActive && (
                                    <a
                                        href="#contact"
                                        className="font-nunito absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 md:px-6 xl:px-7 4xl:px-9 py-2 md:py-3 xl:py-3.5 4xl:py-4 rounded-full text-xs sm:text-sm md:text-base xl:text-lg 4xl:text-xl font-bold whitespace-nowrap transition-all duration-300 hover:scale-105"
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
                                <span className="font-alata text-base md:text-lg xl:text-xl 4xl:text-2xl font-medium text-slate-300">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* 6. WHY CHOOSE OUR SERVICES */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg ">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">
                        <div className="flex flex-col items-start">
                            <span className="font-alata text-sm xl:text-base 4xl:text-lg font-semibold text-sky-500 mb-4">
                                Why Choose Our Social Media Post &amp; Flyer Design Services
                            </span>
                            <h2 className="font-alata text-xl sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl text-white leading-tight mb-6">
                                Social Media Marketing Means Partnering With a Team That Blends Strategy &amp; Creative Design Services
                            </h2>
                            <span className="font-alata text-lg sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl font-bold text-sky-500 mb-4">
                                Creativity With Strategy
                            </span>
                            <p className="font-nunito text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8">
                                We focus on understanding your brand, audience, and goals to create tailored content that drives real engagement and results. From eye-catching visuals to data-backed ad campaigns, we ensure every post and promotion contributes to your growth. Our commitment to consistency, performance, and innovation sets us apart in delivering measurable value across all social platforms.
                            </p>

                            <a
                                href="#contact"
                                className="font-nunito px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
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
            <section id="smmport" className="py-16 md:py-24 4xl:py-32 bg-dark-bg ">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="w-full text-center max-w-7xl mx-auto mb-12 md:mb-16 4xl:mb-20 px-2 sm:px-4">
                        <h2 className="font-alata font-extrabold text-xl sm:text-2xl md:text-[2.2rem] xl:text-5xl 4xl:text-6xl text-white leading-tight mb-4">
                            Your Brand is a Story, Told Through{" "}
                            <span className="gradient-text">
                                Social Media Post &amp; Flyer Design
                            </span>
                        </h2>

                        <p className="font-nunito text-lg sm:text-xl md:text-2xl xl:text-3xl 4xl:text-4xl text-white">
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

            <section id="pricing" className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="font-alata font-black text-[5rem] sm:text-[8rem] md:text-[12rem] 4xl:text-[15rem] text-white/[0.03] leading-none tracking-tight">
                        PRICING
                    </span>
                </div>

                <div className="w-full max-w-none mx-auto px-4 sm:px-6 xl:px-10 4xl:px-16 relative z-10">
                    <div className="text-center max-w-7xl w-full mx-auto mb-16 md:mb-20 4xl:mb-24">
                        <span className="font-alata text-xs sm:text-sm xl:text-base 4xl:text-lg uppercase tracking-widest text-neon-cyan">
                            Social Media Marketing Packages
                        </span>
                        <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mt-4">
                            SMM Package Prices According To Your Need
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-24 items-start pt-14">
                        {pricingPlans.map((plan, idx) => {
                            const theme = planThemes[idx % planThemes.length];
                            const currency = plan.price.trim().startsWith("₹") ? "₹" : "";
                            const amount = plan.price.replace("₹", "").trim();
                            const [taxText, perText] = plan.period.split("/").map((s) => s.trim());

                            return (
                                <div
                                    key={idx}
                                    className={`relative pb-6 transition-transform duration-300 ${plan.popular ? "xl:scale-[1.05] z-20" : "hover:-translate-y-1 z-10"
                                        }`}
                                >
                                    {/* ===== HEADER (upar wala colored part) ===== */}
                                    {/* drop-shadow wrapper: clip-path pe box-shadow nahi chalta, isliye filter */}
                                    <div className="relative z-20 drop-shadow-[0_14px_14px_rgba(0,0,0,0.35)]">
                                        {/* price circle */}
                                        <div
                                            className={`absolute left-1/2 -translate-x-1/2 -top-15 z-30 flex flex-col items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(0,0,0,0.3)] ${plan.popular ? "h-35 w-35" : "h-30 w-30"
                                                }`}
                                        >
                                            <div className={`flex items-start font-alata font-black leading-none ${theme.price}`}>
                                                <span className="text-sm mt-1">{currency}</span>
                                                <span className={plan.popular ? "text-3xl" : "text-2xl"}>{amount}</span>
                                            </div>
                                            <div className="mt-1.5 font-alata text-[13px] font-bold uppercase tracking-wide text-slate-500 whitespace-nowrap">
                                                {taxText}
                                            </div>
                                            <div className="font-nunito text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                                                / {perText}
                                            </div>
                                        </div>

                                        <div
                                            className={`relative bg-gradient-to-br ${theme.header} rounded-t-2xl px-4 pt-20 pb-14 text-center overflow-hidden`}
                                            style={{ clipPath: HEADER_SHAPE, WebkitClipPath: HEADER_SHAPE }}
                                        >
                                            <div className="absolute -top-10 -left-8 h-32 w-32 rounded-full bg-white/10" />
                                            <div className="absolute top-12 -right-10 h-28 w-28 rounded-full bg-white/10" />

                                            <h3 className="relative font-alata font-black text-lg sm:text-xl 4xl:text-2xl text-white tracking-[0.18em]">
                                                {plan.name}
                                            </h3>
                                            <p className="relative font-alata text-[9px] sm:text-[10px] text-white/85 uppercase tracking-[0.15em] mt-1.5 leading-relaxed">
                                                {plan.subtitle}
                                            </p>

                                            {plan.popular && (
                                                <span className="relative mt-3 inline-block rounded-full bg-white px-5 py-0.5 font-alata text-[9px] font-bold uppercase tracking-[0.2em] text-fuchsia-600">
                                                    ★ Recommended
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* ===== WHITE PANEL: header ke niche se nikalta hua ===== */}
                                    <div className="relative z-10 -mt-10 rounded-2xl bg-white pt-16 pb-14 px-3 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)]">
                                        <div className="flex flex-col gap-4">
                                            {plan.groups.map((group, gIdx) => (
                                                <div key={gIdx}>
                                                    <h4 className="font-alata font-bold text-[11px] xl:text-xs text-slate-800 uppercase tracking-wider text-center mb-1.5">
                                                        {group.category}
                                                    </h4>
                                                    <ul>
                                                        {group.items.map((feat, fIdx) => (
                                                            <li
                                                                key={fIdx}
                                                                className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 text-[11px] sm:text-[12px] xl:text-[13px] 4xl:text-[14px] text-slate-600 ${fIdx % 2 === 0 ? "bg-slate-50" : "bg-white"
                                                                    }`}
                                                            >
                                                                <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" strokeWidth={3} />
                                                                <span className="font-alata">{feat}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}

                                            {plan.excluded && plan.excluded.length > 0 && (
                                                <ul>
                                                    {plan.excluded.map((feat, fIdx) => (
                                                        <li
                                                            key={fIdx}
                                                            className={`flex items-start gap-2 rounded-md px-2.5 py-1.5 text-[11px] sm:text-[12px] xl:text-[13px] 4xl:text-[14px] text-slate-400 ${fIdx % 2 === 0 ? "bg-slate-50" : "bg-white"
                                                                }`}
                                                        >
                                                            <X className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" strokeWidth={3} />
                                                            <span className="font-alata">{feat}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>

                                    {/* bottom overlapping pill button */}
                                    <a
                                        href="#contact"
                                        className={`font-nunito absolute bottom-0 left-1/2 -translate-x-1/2 z-30 w-3/5 rounded-full bg-gradient-to-r ${theme.button} py-3 text-center text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white transition-transform hover:scale-105 active:scale-95`}
                                    >
                                        Purchase Now
                                    </a>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* 9. ADD-ON SERVICES */}
            <section className="py-12 md:py-16 4xl:py-24 bg-dark-bg relative overflow-hidden">
                {/* background glow */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[40rem] h-[18rem] rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

                <div className="w-full max-w-none mx-auto px-4 sm:px-6 xl:px-10 4xl:px-16 relative z-10">
                    {/* HEADING */}
                    <div className="text-center max-w-4xl w-full mx-auto mb-10 md:mb-14 4xl:mb-16">
                        <span className="font-alata inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[11px] sm:text-xs xl:text-sm uppercase tracking-[0.2em] text-cyan-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 animate-pulse" />
                            Available On Additional Charges
                        </span>

                        <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mt-5 leading-tight">
                            Boost Your Plan With{" "}
                            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Add-On Services
                            </span>
                        </h2>
                    </div>

                    {/* CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-5 4xl:gap-6">
                        {addOnServices.map((service, idx) => {
                            const { Icon } = service;
                            const t = addOnThemes[idx % addOnThemes.length];

                            return (
                                <div
                                    key={idx}
                                    className={`group relative min-w-0 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 ${t.glow}`}
                                >
                                    {/* gradient border (halka, hover pe full) */}
                                    <div
                                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${t.gradient} opacity-30 group-hover:opacity-100 transition-opacity duration-300`}
                                    />

                                    {/* card body */}
                                    <div className="relative m-px h-full overflow-hidden rounded-[15px] bg-slate-950 p-4 sm:p-5 xl:p-5 4xl:p-6 flex flex-col gap-3">
                                        {/* colored glow blob */}
                                        <div
                                            className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${t.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-300 pointer-events-none`}
                                        />
                                        {/* big faded number */}
                                        <span className="absolute top-2 right-4 font-alata font-black text-5xl xl:text-6xl leading-none text-white/[0.05] pointer-events-none select-none">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        {/* hover shine */}
                                        <div className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-[400%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

                                        {/* icon */}
                                        <div
                                            className={`relative w-10 h-10 xl:w-11 xl:h-11 4xl:w-12 4xl:h-12 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-lg ring-1 ring-white/25 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}
                                        >
                                            <Icon
                                                className="w-5 h-5 xl:w-5 xl:h-5 4xl:w-6 4xl:h-6 text-white"
                                                strokeWidth={1.75}
                                            />
                                        </div>

                                        <h3 className="relative font-alata font-bold text-sm sm:text-base xl:text-base 4xl:text-lg text-white">
                                            {service.name}
                                        </h3>
                                        <p className="relative font-nunito text-xs sm:text-sm xl:text-sm 4xl:text-base text-slate-400 leading-relaxed">
                                            {service.desc}
                                        </p>

                                        {/* footer link */}

                                        <a href="#contact"
                                            className={`relative mt-auto pt-3 border-t border-white/10 font-alata text-[11px] xl:text-xs font-bold uppercase tracking-widest ${t.text} flex items-center gap-1.5`}
                                        >
                                            Get A Quote
                                            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 9. HOW IT WORKS */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="font-alata text-xs sm:text-sm xl:text-base 4xl:text-lg text-white uppercase tracking-widest text-neon-cyan">
                            How We Deliver Effective Social Media Post &amp; Flyer Design Services
                        </span>

                        <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4">
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
                                        <h3 className="font-alata font-bold text-lg md:text-xl xl:text-2xl 4xl:text-3xl text-white mb-3">
                                            {step.title}
                                        </h3>
                                        <p className="font-nunito text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
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
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative">
                <div className="max-w-4xl xl:max-w-5xl 4xl:max-w-6xl mx-auto px-4 sm:px-6 text-center mb-12 md:mb-16 4xl:mb-20 flex flex-col items-center">
                    <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-full border-2 border-white/70 flex items-center justify-center mb-6">
                        <MessageCircleQuestion className="w-6 h-6 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-10 h-1 rounded-full bg-sky-500" />
                    </div>
                    <p className="font-nunito text-sm xl:text-base 4xl:text-lg text-slate-400">
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
                                    className="font-nunito w-full px-4 md:px-5 xl:px-6 4xl:px-8 py-4 xl:py-5 4xl:py-6 flex items-center gap-4 xl:gap-5 text-left"
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 xl:w-6 xl:h-6 4xl:w-7 4xl:h-7 text-white shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span className="font-alata font-bold text-sm md:text-base xl:text-lg 4xl:text-xl text-white">
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
                                            <div className="font-nunito px-6 md:px-10 pb-6 pl-14 md:pl-[4.75rem] text-sm xl:text-base 4xl:text-lg text-white/85 leading-relaxed">
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
            {/* 2. MARQUEE RIBBON */}
            <section className="py-0 bg-dark-bg relative overflow-hidden">
                <div className="bg-[#fff0] bg-[linear-gradient(180deg,#007EC373_0%,#07ADD01A_100%)] py-6 md:py-8 4xl:py-10">
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
                                        <span className="font-alata font-bold text-lg sm:text-xl md:text-3xl 4xl:text-4xl text-white tracking-wide">
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
        </main >
    );
}