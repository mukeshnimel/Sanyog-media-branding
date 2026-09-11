"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Star,
    ArrowRight,
    Check,
    X,
    ChevronDown,
    MessageCircleQuestion,
    Image as ImageIcon,
    ShieldCheck,
    Zap,
    UserCheck,
    Wallet,
    Quote,
    Users,
    HeartHandshake,
    IndianRupee,

} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import MarqueeRibbon from "@/components/MarqueeRibbon";

// ---------- DATA ----------

const rotatingWords = [
    "Poster Design",
    "Banner Design",
    "Brochure Design",
    "Flex Design",
    "Visiting Cards",
    "Flyer Design",
    "Cloths Design",
    "Sticker Design",
    "Profile Design",
    "Portfolio Design",
    "Template Design",
    "Booklet Design",
    "Letter Head",
    "Slip / Note Pad Design",
    "Envelope Design",
];

const avatarSeeds = [1, 5, 8, 12, 15, 20, 23, 27]; // pravatar.cc image IDs

const services = [
    "Poster Design",
    "Banner Design",
    "Brochure Design",
    "Flex Design",
    "Visiting Card Design",
    "Flyer Design",
    "T-Shirt Design",
    "Sticker Design",
    "Profile Design",
    "Portfolio Design",
    "Template Design",
    "Booklet Design",
    "Letter Head Design",
    "Note Pad Design",
    "Envelope Design",
    "All Graphic Designs",
];

const showcaseCategories = [
    { title: "Posters, Banners, Flex Designs", img: "/images/graphic-design/p1.png" },
    { title: "Brochure Designs", img: "/images/graphic-design/p2.png" },
    { title: "Magazine & Booklet Designs", img: "/images/graphic-design/p3.png" },
    { title: "Visiting / Business Card Design", img: "/images/graphic-design/p4.png" },
    { title: "Posters, Banners, Flex Designs", img: "/images/graphic-design/p5.png" },
    { title: "Brochure Designs", img: "/images/graphic-design/p6.png" },
    { title: "Magazine & Booklet Designs", img: "/images/graphic-design/p7.png" },
    { title: "Visiting / Business Card Design", img: "/images/graphic-design/p8.png" },
    { title: "Posters, Banners, Flex Designs", img: "/images/graphic-design/p9.png" },
    { title: "Brochure Designs", img: "/images/graphic-design/p10.png" },
    { title: "Magazine & Booklet Designs", img: "/images/graphic-design/p11.png" },
];

const testimonials = [
    {
        name: "Mohit Garg",
        text: "We needed some really good pamphlet designs for our local store in Churu, and Sanyog Media Concepts did a fantastic job. The designs were eye-catching, and they understood exactly what message we wanted to convey. It definitely helped in getting more foot traffic.",
    },
    {
        name: "Monika Sharma",
        text: "The stall design Sanyog Media did for our trade show was top-notch. It was functional, looked great, and made it easy for us to interact with visitors. We got so many compliments! Definitely recommending them.",
    },
    {
        name: "Jay Kishan Singh",
        text: "Our experience with their logo design was fantastic. They gave us a few options, and all of them were really good. The final logo we chose perfectly captures our brand.",
    },
    {
        name: "Sharan Srinivasan",
        text: "The design was visually stunning, capturing our brand essence perfectly. The team was professional, efficient, and delivered everything on time.",
    },
    {
        name: "Aniket Sharma",
        text: "A huge thanks to Rahul ji and his team for their outstanding work in designing and organizing our successful exhibition at Asia's No. 1 Poultry Expo, Poultry India 2024.",
    },
    {
        name: "Varsha Shrestha",
        text: "We used their services for Cosmoprof and they were very professional. Everything was very smooth. Good communication too. Thank you so much for your service.",
    },
    {
        name: "Govind Sharma",
        text: "Our online store was a bit clunky. Sanyog Media built us a new one, and it's so much smoother. Customers can actually find what they're looking for now. Sales are definitely up.",
    },
    {
        name: "Tushar Kushwaha",
        text: "Our exhibition stall design was a bit... out there. But Sanyog Media's fabrication team was up for the challenge and built it exactly as we envisioned it. The quality was top-notch.",
    },
    {
        name: "Harsh Panwar",
        text: "We needed a logo that was both modern and had a touch of our traditional roots. Sanyog Media totally nailed it! The design is unique and we've been getting a lot of compliments.",
    },
];

const priorities = [
    { title: "Non-Compromising Work", icon: Users, bg: "bg-sky-500" },
    { title: "Hassle-free Work", icon: HeartHandshake, bg: "bg-lime-500" },
    { title: "Single Point Of Contact", icon: UserCheck, bg: "bg-orange-600" },
    { title: "Within Your Budget", icon: IndianRupee, bg: "bg-amber-500" },
];

const pricingPlans = [
    {
        name: "Basic",
        subtitle: "Graphics Design",
        price: "₹899",
        period: "+ GST / Page",
        features: [
            "Simple And Clean Design",
            "Focus On Clarity And Ease",
            "Essential Features For Professionalism",
        ],
    },
    {
        name: "Advance",
        subtitle: "Graphics Design",
        price: "₹1699",
        period: "+ GST / Page",
        popular: true,
        features: [
            "Creative And Visually Engaging",
            "Enhanced Customization Options",
            "Collaborative Approach For Branding",
        ],
    },
    {
        name: "Professional",
        subtitle: "Graphics Design",
        price: "₹2399",
        period: "+ GST / Page",
        features: [
            "High-Impact Visuals And Execution",
            "Professional-Grade Design Techniques",
            "Premium Quality For A Polished Look",
        ],
    },
];

const faqs = [
    {
        q: "Why Should I Choose Sanyog Media?",
        a: "After being successful in the exhibition stall designing & fabrication, we have started Logo Design & Graphic Design. Our motive is to provide you the best experienced creative artists & designers who can justify the values of your brand with your unique branding.",
    },
    {
        q: "How Much Time It Takes To Design A Graphics Design?",
        a: "After you submit your design brief, it will take around 2 working days to get the first initial designs. And if you respond quickly & tell us whether you want revisions or want to finalize, it will take overall 5 to 7 days to finalize your design. Our average order completion time is 5 to 7 days.",
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
// ---------- BLINDS ANIMATION COMPONENT ----------

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
        <span className="relative inline-block h-[1.3em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
                <motion.span key={index} className="absolute inset-0 flex">
                    {[...Array(SLAT_COUNT)].map((_, slatIdx) => (
                        <motion.span
                            key={slatIdx}
                            className="relative block h-full overflow-hidden"
                            style={{ width: `${100 / SLAT_COUNT}%` }}
                            initial={{ y: "-100%", opacity: 0 }}
                            animate={{ y: "0%", opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ duration: 0.4, delay: slatIdx * 0.04, ease: "easeOut" }}
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

export default function GraphicDesignPage() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [accordionIndex, setAccordionIndex] = useState(1);
    const accordionImages = [
        "/images/screenshots/Website-Pricing-Plan-1.png",
        "/images/screenshots/Website-Pricing-Plan-2.png",
        "/images/screenshots/Website-Pricing-Plan-3.png",
        "/images/screenshots/Website-Pricing-Plan-4.png",
    ];

    return (
        <main className="flex-1 bg-dark-bg text-slate-100 overflow-hidden">

            {/* 1. HERO */}
            <section className="relative py-14 sm:py-20 md:py-28 4xl:py-36 bg-dark-bg overflow-hidden">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 md:w-96 md:h-96 4xl:w-[30rem] 4xl:h-[30rem] rounded-full pointer-events-none" />
                <div className="w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">

                        <div className="flex flex-col items-start">
                            <span className="text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-cyan-400 mb-3">
                                Transforming Brands With Design
                            </span>
                            <h1 className="font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl leading-tight text-white mb-2">
                                Graphic Designs
                            </h1>

                            <div className="text-base sm:text-lg md:text-2xl xl:text-3xl 4xl:text-4xl font-bold text-sky-400 mb-6">
                                <BlindsRotatingText words={rotatingWords} delay={1500} />
                            </div>

                            <p className="text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8 max-w-xl xl:max-w-2xl 4xl:max-w-3xl">
                                Sanyog Media Concepts&apos; graphic design expertise weaves stories that captivate, elevating your brand with artful visual solutions.
                            </p>

                            {/* Avatar row - real avatars */}
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

                            {/* Rating */}
                            <div className="flex flex-col leading-tight mb-8">
                                <span className="text-base xl:text-lg 4xl:text-xl font-bold text-white">4.9/5 Star Rating</span>
                                <span className="text-sm xl:text-base 4xl:text-lg text-cyan-400 font-medium">Based on Google Review</span>
                            </div>

                            {/* Buttons stacked */}
                            <div className="flex flex-col gap-3 xl:gap-4 w-full sm:w-auto sm:max-w-[220px] xl:sm:max-w-[260px] 4xl:sm:max-w-[300px]">
                                <Link
                                    href="#contact"
                                    className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 text-center"
                                >
                                    Connect With Us
                                </Link>
                                <Link
                                    href="#gdportfolio"
                                    className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all text-center"
                                >
                                    Portfolio
                                </Link>
                            </div>
                        </div>

                        {/* Right side - GIF illustration */}
                        <div className="relative flex items-center justify-center min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] xl:min-h-[480px] 4xl:min-h-[560px]">
                            <div className="absolute w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 4xl:w-96 4xl:h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
                            <div className="relative w-full max-w-md xl:max-w-lg 4xl:max-w-2xl rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl shadow-cyan-500/10">
                                <Image
                                    src="/images/graphic-design/1.gif"
                                    alt="Graphic design showcase"
                                    width={480}
                                    height={420}
                                    unoptimized
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. WHY CHOOSE US — IMAGE ACCORDION */}
            <section className="py-16 md:py-20 4xl:py-28 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-7xl w-full mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <h2 className="font-display font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight mb-4">
                            Professional Designs Unique Solutions
                        </h2>
                    </div>

                    {/* Interactive image accordion — stacked vertically on mobile/tablet-portrait,
                        side-by-side from md: (tablet-landscape) up */}
                    <div className="relative left-1/2 -translate-x-1/2 w-screen h-[680px] sm:h-[560px] md:h-[420px] lg:h-[500px] xl:h-[580px] 4xl:h-[680px] mb-12 md:mb-16 4xl:mb-20">
                        <div className="flex flex-col md:flex-row h-full w-full gap-1 md:gap-0 px-1 md:px-0">
                            {accordionImages.map((src, idx) => {
                                const accordionTitles = [
                                    "Posters, Banners, Flex Designs",
                                    "Brochure Designs",
                                    "Magazine & Booklet Designs",
                                    "Visiting / Business Card Design",
                                ];
                                const isActive = accordionIndex === idx;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setAccordionIndex(idx)}
                                        className="relative overflow-hidden cursor-pointer transition-all duration-500 ease-out rounded-xl md:rounded-none"
                                        style={{ flex: isActive ? 3 : 1 }}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Showcase ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />

                                        {/* Black shade only at the bottom, not on full image */}
                                        <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-48 md:h-56 4xl:h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />

                                        {isActive && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 md:pb-6 4xl:pb-8 animate-emerge">
                                                <div className="flex flex-col items-center gap-3 md:gap-4 4xl:gap-5 px-3 md:px-4 w-full max-w-[90%]">
                                                    <h3 className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 4xl:text-3xl font-display text-center leading-snug">
                                                        {accordionTitles[idx]}
                                                    </h3>


                                                    <a href="#contact"
                                                        className="bg-white text-black px-4 sm:px-5 md:px-6 xl:px-7 4xl:px-9 py-2 md:py-3 xl:py-3.5 4xl:py-4 rounded-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 4xl:text-3xl font-bold whitespace-nowrap transition-all duration-300 hover:scale-105"
                                                    >
                                                        Contact Us
                                                    </a>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* 3. SERVICES GRID */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-cyan-400">
                            Our Graphic Design
                        </span>
                        <h2 className="font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4">
                            Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-5 4xl:gap-6">
                        {services.map((s, idx) => (
                            <div
                                key={idx}
                                className="border border-slate-700 px-4 sm:px-5 xl:px-6 4xl:px-8 py-5 sm:py-6 xl:py-7 4xl:py-9 rounded-2xl flex items-center justify-center text-center hover:border-white/30 transition-all cursor-default bg-[#07ADD0]"
                            >
                                <span className="font-semibold text-base sm:text-lg md:text-xl xl:text-xl 2xl:text-3xl text-white">{s}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* 4. WE DESIGN GRAPHICS THAT DEFINE */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative overflow-hidden">
                {(() => {
                    const SLOT_SECONDS = 3; // har image kitni der visible rahegi
                    const N = showcaseCategories.length;
                    const totalDuration = N * SLOT_SECONDS;

                    // fixed seconds-based timing, N ke hisab se percentage mein convert
                    const fadeInEnd = (0.5 / totalDuration) * 100;   // 0.5s me fade in
                    const holdEnd = (SLOT_SECONDS - 0.8) / totalDuration * 100; // thodi der solid
                    const fadeOutEnd = (SLOT_SECONDS - 0.2) / totalDuration * 100; // slot khatam hone se pehle fade out

                    return (
                        <style>{`
                @keyframes fullFade {
                    0%              { opacity: 0; }
                    ${fadeInEnd}%   { opacity: 1; }
                    ${holdEnd}%     { opacity: 1; }
                    ${fadeOutEnd}%  { opacity: 0; }
                    100%            { opacity: 0; }
                }
            `}</style>
                    );
                })()}

                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 4xl:gap-24 items-center">

                        {/* Left: Text */}
                        <div className="flex flex-col items-start">
                            <h2 className="font-extrabold text-2xl sm:text-[15px] md:text-[20px] xl:text-[25px] 4xl:text-[30px] text-white mb-1">
                                We Design Graphics That Define
                            </h2>
                            <h3 className="font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-[50px] 4xl:text-7xl leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-6">
                                Elevate &amp; <br /> Inspire Brands
                            </h3>
                            <p className="text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8 max-w-xl xl:max-w-2xl 4xl:max-w-3xl">
                                We are a team of passionate creatives, strategists, and storytellers who specialize in transforming ideas into visually compelling designs. From logos to complete brand identities, our graphic design solutions are tailored to communicate your message with clarity and impact. We don&apos;t just make things look good — we design with purpose, helping your brand stand out in a crowded digital world.
                            </p>
                            <div className="flex flex-col gap-3 xl:gap-4 w-full sm:w-auto sm:max-w-[240px] xl:sm:max-w-[280px] 4xl:sm:max-w-[320px]">
                                <Link
                                    href="#contact"
                                    className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-full text-sm xl:text-base 4xl:text-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 text-center"
                                >
                                    Connect With Us
                                </Link>
                                <Link
                                    href="/about-us"
                                    className="px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-gradient-to-r from-cyan-400 to-sky-300 hover:brightness-110 transition-all text-center"
                                >
                                    Know More About Us
                                </Link>
                            </div>
                        </div>

                        {/* Right: Whole-image crossfade */}
                        <div className="relative w-full h-full rounded-xl overflow-hidden">
                            {showcaseCategories.map((item, i) => (
                                <div
                                    key={`${item.title}-${i}`}
                                    className="absolute inset-0"
                                    style={{
                                        animation: `fullFade ${showcaseCategories.length * 3}s ease-in-out infinite`,
                                        animationDelay: `${i * 3}s`,
                                        animationFillMode: "backwards",
                                    }}
                                >
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <MarqueeRibbon />

            <Testimonials />

            {/* 7. KEY PRIORITY */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative overflow-hidden">
                <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[260px] h-[260px] md:w-[400px] md:h-[400px] 4xl:w-[560px] 4xl:h-[560px] bg-indigo-600/20 blur-[90px] md:blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 4xl:gap-28 items-center">

                        {/* Left: overlapping images */}
                        <div className="relative h-[300px] sm:h-[400px] md:h-[500px] xl:h-[560px] 4xl:h-[640px] flex items-center">
                            <div className="absolute top-0 left-0 w-[85%] h-[75%] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                <Image
                                    src="/images/graphic-design/priority2.png"
                                    alt="Happy customers"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute bottom-0 right-[8%] w-[55%] h-[55%] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                                <Image
                                    src="/images/graphic-design/priority1.png"
                                    alt="Customer feedback rating"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Right: text + priority grid */}
                        <div>
                            <div className="text-center lg:text-left mb-8 md:mb-10 4xl:mb-14">
                                <span className="text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-cyan-400">
                                    Our Key Priority
                                </span>
                                <h2 className="font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4 leading-tight">
                                    Customer Satisfaction Is Our Main Priority
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:gap-5 4xl:gap-6">
                                {priorities.map((p, idx) => {
                                    const Icon = p.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex flex-col items-center text-center gap-3 xl:gap-4 py-6 sm:py-8 xl:py-9 4xl:py-11 px-3 sm:px-4 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-colors"
                                        >
                                            <div className={`w-11 h-11 sm:w-12 sm:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 rounded-xl flex items-center justify-center text-white ${p.bg}`}>
                                                <Icon className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7 4xl:w-8 4xl:h-8" />
                                            </div>
                                            <span className="text-xs sm:text-sm xl:text-base 4xl:text-lg font-bold text-white">{p.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 8. PRICING */}
            <section id="pricing" className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="font-black text-[5rem] sm:text-[8rem] md:text-[12rem] 4xl:text-[15rem] text-white/[0.03] leading-none tracking-tight">
                        PRICING
                    </span>
                </div>

                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24 relative z-10">
                    <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-cyan-400">
                            Graphic Design Packages
                        </span>
                        <h2 className="font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4">
                            Flexible Graphic Design Packages To Suit Your Needs
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 4xl:gap-10">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-6 sm:p-8 xl:p-9 4xl:p-11 flex flex-col justify-between border ${plan.popular
                                    ? "border-white/20 bg-slate-800/80 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                                    : "border-slate-700 bg-slate-900/40"
                                    }`}
                            >
                                <div>
                                    {plan.popular && (
                                        <span className="inline-block mb-3 px-3 py-1 xl:px-3.5 xl:py-1.5 rounded-full bg-white text-slate-950 text-[10px] xl:text-xs font-bold uppercase tracking-widest">
                                            Most Popular
                                        </span>
                                    )}
                                    <h3 className="font-bold text-lg xl:text-xl 4xl:text-2xl text-white mb-1">{plan.name}</h3>
                                    <span className="text-xs xl:text-sm 4xl:text-base text-slate-500 uppercase tracking-wider">
                                        {plan.subtitle}
                                    </span>

                                    <div className="flex items-baseline gap-2 mt-4 mb-1">
                                        <span className="font-extrabold text-3xl xl:text-4xl 4xl:text-5xl text-white">
                                            {plan.price}
                                        </span>
                                    </div>
                                    <span className="text-xs xl:text-sm 4xl:text-base text-slate-500">{plan.period}</span>

                                    <Link
                                        href="#contact"
                                        className={`w-full py-3 xl:py-3.5 4xl:py-4 rounded-xl font-bold text-center text-sm xl:text-base 4xl:text-lg transition-all block mt-6 mb-8 ${plan.popular
                                            ? "bg-white text-slate-950 hover:bg-slate-100"
                                            : "bg-slate-800 border border-slate-700 text-white hover:border-white"
                                            }`}
                                    >
                                        Get In Touch
                                    </Link>

                                    <div className="border-t border-slate-700/60 pt-6">
                                        <ul className="flex flex-col gap-3">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-xs xl:text-sm 4xl:text-base text-slate-300">
                                                    <Check className="w-3.5 h-3.5 xl:w-4 xl:h-4 4xl:w-5 4xl:h-5 text-cyan-400 shrink-0 mt-0.5" />
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

            {/* 9. FAQ — FULL WIDTH GRADIENT ACCORDION */}
            <section className="py-16 md:py-24 4xl:py-32 bg-dark-bg relative">
                <div className="max-w-4xl xl:max-w-5xl 4xl:max-w-6xl mx-auto px-4 sm:px-6 text-center mb-12 md:mb-16 4xl:mb-20 flex flex-col items-center">
                    <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-full border-2 border-white/70 flex items-center justify-center mb-6">
                        <MessageCircleQuestion className="w-6 h-6 xl:w-7 xl:h-7 4xl:w-9 4xl:h-9 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-extrabold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white mb-4">
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
                                style={{
                                    background: " #1487c9",
                                }}
                            >
                                <button
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full px-4 md:px-5 xl:px-6 4xl:px-8 py-4 xl:py-5 4xl:py-6 flex items-center gap-4 xl:gap-5 text-left"
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 xl:w-6 xl:h-6 4xl:w-7 4xl:h-7 text-white shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span className="font-bold text-sm md:text-base xl:text-lg 4xl:text-xl text-white">
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
                                            <div className="px-4 md:px-5 xl:px-6 pb-4 pl-14 md:pl-[4.75rem] text-sm xl:text-base 4xl:text-lg text-white/85 leading-relaxed">
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

            <style jsx global>{`
                  .marquee-track {
                      width: max-content;
                      animation: marquee-scroll 25s linear infinite;
                  }
          
                  @keyframes marquee-scroll {
                      0% {
                          transform: translateX(0);
                      }
          
                      100% {
                          transform: translateX(-50%);
                      }
                  }

                  @keyframes emerge {
                      0% {
                          opacity: 0;
                          transform: translateY(30px) scale(0.7);
                      }
                      100% {
                          opacity: 1;
                          transform: translateY(0) scale(1);
                      }
                  }

                  .animate-emerge {
                      animation: emerge 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                  }
              `}</style>

        </main >
    );
}