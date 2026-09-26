"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import {
    Check,
    ChevronDown,
    MessageCircleQuestion,
    ChevronLeft,
    ChevronRight,
    X,
    ZoomIn,
} from "lucide-react";
import HeroVisual from "@/components/HeroVisual";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import MarqueeRibbon from "@/components/MarqueeRibbon";

// ---------- DATA ----------

const rotatingWords = [
    "Web Hosting",
    "Starts From ₹ 8999",
    "E-Commerce Website",
    "Business Websites",
    "1 Year Domain",
    "24x7 Support",
];

const websiteShowcase = Array.from({ length: 7 }, (_, i) => `/images/web-design/${i + 1}.png`);
const portfolioGallery = Array.from({ length: 25 }, (_, i) => `/images/web-design/${i + 1}.png`);
const avatarSeeds = [12, 32, 47, 5, 15, 60];

const services = [
    { iconImage: "/images/web-design/icons/1.svg", title: "E-Commerce Websites", desc: "Sanyog Media Concepts is a dynamic digital agency specializing in the development of high-performance e-commerce websites. We combine innovative design with robust functionality to create seamless online shopping experiences that drive growth and customer engagement." },
    { iconImage: "/images/web-design/icons/2.svg", title: "Responsive Website Designs", desc: "We specialize in crafting responsive website designs that provide a seamless user experience across devices, driving more conversions, sales, and online visibility for your business." },
    { iconImage: "/images/web-design/icons/3.svg", title: "Custom Website Designs", desc: "We specialize in crafting custom website designs that capture the essence of your brand, resonating with your target audience and driving real results with unique, engaging design." },
    { iconImage: "/images/web-design/icons/4.svg", title: "Website Redesign Service", desc: "We specialize in transforming outdated websites into modern, user-friendly, and visually stunning digital experiences, improving search rankings and boosting engagement." },
    { iconImage: "/images/web-design/icons/5.svg", title: "UI/UX Website Design", desc: "Crafting intuitive and visually stunning digital experiences with our UI/UX website design services, creating user-centered experiences that drive engagement and business growth." },
    { iconImage: "/images/web-design/icons/6.svg", title: "Website Hosting & Security", desc: "Secure and reliable website hosting solutions — regular security audits, firewall configuration, malware removal and cleanup, ensuring your website is always available and secure." },
];

const testimonials = [
    { name: "Sharan Srinivasan", text: "The design was visually stunning, capturing our brand essence perfectly. The team was professional, efficient, and delivered everything on time." },
    { name: "Govind Sharma", text: "Our online store was a bit clunky. Sanyog Media built us a new one, and it's so much smoother. Customers can actually find what they're looking for now. Sales are definitely up." },
    { name: "Aniket Sharma", text: "A huge thanks to Rahul ji and his team for their outstanding work in designing and organizing our successful exhibition at Asia's No. 1 Poultry Expo, Poultry India 2024." },
];



const howItWorks = [
    { iconImage: "/images/logo-design/vector/6.svg", title: "Share Your Vision for Your Brand", desc: "Submit your design brief and let us know your ideas and expectations.", bg: "bg-gradient-to-r from-yellow-500 to-amber-600", image: "/images/logo-design/6.png" },
    { iconImage: "/images/logo-design/vector/7.svg", title: "We Will Create Your Website Design", desc: "We'll start by analyzing your competitors' websites. After thorough research, we'll begin designing your website based on your requirements.", bg: "bg-gradient-to-r from-blue-600 to-cyan-600", image: "/images/web-design/26.png" },
    { iconImage: "/images/logo-design/vector/8.svg", title: "Review Your Website Design", desc: "Review the website design we provide and let us know if you need any changes.", bg: "bg-gradient-to-r from-orange-600 to-red-600", image: "/images/web-design/27.png" },
    { iconImage: "/images/logo-design/vector/7.svg", title: "Approve Your Website Design & Rate Us", desc: "Approve & launch, then give us your feedback.", bg: "bg-gradient-to-r from-green-600 to-emerald-600", image: "/images/web-design/28.png" },
];

const faqs = [
    { q: "Why Should I Choose Sanyog Media for Website Design?", a: "Elevate your online presence with Sanyog Media's website design services, creating stunning, user-friendly websites that capture your brand's essence and resonate with your audience. Their expert designers and developers craft custom websites that drive engagement, conversions, and growth." },
    { q: "How Much Time It Takes To Design A Website?", a: "After you submit your design brief, it will take around 7 working days to get the first initial designs. And if you respond quickly & tell us whether you want revisions or want to finalize, it will take overall 7 to 15 days to finalize your website. Our average order completion time is 15 to 20 days." },
    { q: "Can I Upgrade My Package During The Order?", a: "Yes… absolutely. You can upgrade your package any time during your order. All you have to do is pay the price difference at the delivery time." },
    { q: "Do You Offer Discounts?", a: "We believe there is no such thing as a discount. If you decrease the price, the quality will suffer as well. Here at Sanyog Media we never compromise on the quality of our work — so we can lose the order but cannot offer discounts because of our personal standards." },
    { q: "How Are You Offering Such Benefits At This Price Point?", list: ["Building a relationship", "Impress our clients", "World-class experience", "Business for us in the long term", "Referrals & more growth"] },
];


const extraChargeNote = "Apart from what's included in this package, any additional feature you add will be charged extra.";

const pricingPlans = [
    {
        name: "Landing Page",
        subtitle: "Quick Single Page Website",
        oldPrice: "₹6999",
        price: "₹4999",
        hostingIncluded: false,
        domainIncluded: false,
        sslIncluded: false,
        supportIncluded: false,
        features: [
            "Single Page Website",
            "Modern & Clean Design",
            "Contact Us Form",
            "Mobile Friendly",
            "Fast Delivery (2-3 Days)",
        ],
        excluded: [
            "Hosting (Extra Charge Applicable)",
            "Domain (Extra Charge Applicable)",
            "SSL Certificate (Extra Charge Applicable)",
            "Technical Support (Extra Charge Applicable)",
        ],
        note: extraChargeNote,
    },
    {
        name: "Business Website",
        subtitle: "Choose WordPress or Custom Coding",
        hostingIncluded: true,
        domainIncluded: false,
        pagesIncluded: 6,
        extraPageCharge: 699,
        features: [
            "5 - 6 Page Website",
            "Modern & Clean Design",
            "Basic Website Graphic Design",
            "Call To Action Button",
            "Mobile & Tablet Friendly",
            "Contact Form Integration",
            "Whatsapp Integration",
            "Free Hosting",
        ],
        variants: [
            {
                type: "WordPress",
                price: "₹13999",
                extraFeatures: [],
                extraExcluded: ["Website Speed Optimization"],
            },
            {
                type: "Coding",
                price: "₹17999",
                extraFeatures: ["Website Speed Optimization"],
                extraExcluded: [],
            },
        ],
        excluded: [
            "Domain (Client Needs to Purchase)",
            "Extra Pages @ ₹699 per Page",
        ],
        note: extraChargeNote,
    },
    {
        name: "Custom Coded Website",
        subtitle: "React / Next.js + Backend API",
        oldPrice: "₹79999",
        price: "₹54999",
        popular: true,
        hostingIncluded: true,
        domainIncluded: true,
        domainValueLimit: 1000,
        ecommerceProductLimit: 20,
        features: [
            "Fully Custom Coded Website",
            "Built With React / Next.js",
            "Dedicated Backend API",
            "Database Integration",
            "High Performance & SEO Optimized",
            "Custom Admin Panel (Optional)",
            "Mobile & Tablet Friendly",
            "Contact Form + API Integration",
            "Whatsapp Integration",
            "9 Months Technical Support",
            "Free Hosting",
            "Free Domain (Up to ₹1000 Value)",
            "Free SSL Certificate",
            "Website Speed Optimization",
            "E-commerce Ready (20 Products Free)",
        ],
        note: extraChargeNote,
    },
    {
        name: "Enterprise",
        subtitle: "High-Tech Custom Solution",
        oldPrice: "",
        price: "Depends on Requirement",
        isCustomQuote: true,
        hostingIncluded: true,
        domainIncluded: true,
        features: [
            "Fully Customized High-Tech Website",
            "Web App / SaaS Platform Development",
            "Advance Backend Architecture",
            "Third-Party API Integrations",
            "Scalable Cloud Hosting Setup",
            "Dedicated Project Manager",
            "Priority Technical Support",
            "Custom Feature Development",
        ],
        excluded: [],
        note: extraChargeNote,
    },
];

// ---------- PAGE ----------

export default function WebsiteDesignPage() {
    const [activeFaq, setActiveFaq] = useState(null);
    const [wordIndex, setWordIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(null);

    const isLightboxOpen = activeIndex !== null;

    const waveLetterVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: (i) => ({
            y: 0, opacity: 1,
            transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" },
        }),
        exit: (i) => ({
            y: -20, opacity: 0,
            transition: { delay: i * 0.05, duration: 0.4, ease: "easeIn" },
        }),
    };

    useEffect(() => {
        const currentWord = rotatingWords[wordIndex];
        const animationTime = (currentWord.length - 1) * 70 + 500;
        const holdTime = 1000;
        const timer = setTimeout(() => {
            setWordIndex((prev) => (prev + 1) % rotatingWords.length);
        }, animationTime + holdTime);
        return () => clearTimeout(timer);
    }, [wordIndex]);

    const closeLightbox = useCallback(() => setActiveIndex(null), []);

    const showPrevImage = useCallback((e) => {
        e?.stopPropagation();
        setActiveIndex((i) => (i - 1 + portfolioGallery.length) % portfolioGallery.length);
    }, []);

    const showNextImage = useCallback((e) => {
        e?.stopPropagation();
        setActiveIndex((i) => (i + 1) % portfolioGallery.length);
    }, []);

    useEffect(() => {
        if (!isLightboxOpen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showPrevImage();
            if (e.key === "ArrowRight") showNextImage();
        };
        window.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isLightboxOpen, closeLightbox, showPrevImage, showNextImage]);

    return (
        <main className="flex-1 bg-dark-bg text-slate-100 overflow-x-clip">

            {/* 1. HERO */}
            <section className="relative flex items-center overflow-hidden bg-dark-bg pt-12 pb-14 sm:pt-28 sm:pb-20">
                <div className="absolute top-1/3 left-1/4 w-72 h-72 sm:w-96 sm:h-96 4xl:w-[30rem] 4xl:h-[30rem] rounded-full bg-electric-blue/10 blur-[100px] sm:blur-[130px] pointer-events-none" />

                <div className="w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 xl:gap-16 4xl:gap-24 items-center">

                        {/* Left — copy */}
                        <div className="flex flex-col items-start w-full pt-10 sm:pt-10 md:pt-0">
                            <span className="font-alata text-sm md:text-base xl:text-lg 4xl:text-xl text-white/90 mb-3">
                                Creating Your Unique Website.......
                            </span>

                            <h1 className="font-alata font-extrabold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl 4xl:text-8xl leading-tight text-white mb-2 break-words">
                                Website Design
                            </h1>

                            <div className="min-h-[1.75rem] sm:min-h-[2.25rem] md:min-h-[3rem] 3xl:min-h-[3.5rem] 4xl:min-h-[4.5rem] mb-6 overflow-visible flex items-start w-full">
                                <AnimatePresence mode="wait">
                                    {/* Rotating word */}
                                    <motion.div
                                        key={wordIndex}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="flex flex-wrap font-alata text-base sm:text-lg md:text-3xl xl:text-4xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl text-sky-400"
                                    >
                                        {rotatingWords[wordIndex].split("").map((char, i) => (
                                            <motion.span key={i} custom={i} variants={waveLetterVariants} className="inline-block">
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <p className="font-nunito text-slate-400 text-sm md:text-base xl:text-lg 2xl:text-lg 3xl:text-xl 4xl:text-2xl leading-relaxed mb-8 max-w-xl xl:max-w-2xl 2xl:max-w-2xl 3xl:max-w-3xl 4xl:max-w-4xl">
                                Our Expert Designers Craft Visual Stories That Resonate With Your
                                Target Audience, Ensuring A Strong and Memorable Brand Presence
                            </p>

                            <div className="flex -space-x-3 mb-5">
                                {avatarSeeds.map((seed, i) => (
                                    <div key={i} className="w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 rounded-full border-2 border-dark-bg overflow-hidden relative">
                                        <Image src={`https://i.pravatar.cc/64?img=${seed}`} alt="Client avatar" fill className="object-cover" sizes="64px" />
                                    </div>
                                ))}
                            </div>

                            <div className="mb-8">
                                <p className="font-nunito text-[16px] sm:text-[18px] xl:text-[22px] 4xl:text-[28px] font-bold text-white">4.9/5 Star Rating</p>
                                <p className="font-nunito text-[15px] sm:text-[17px] xl:text-[20px] 4xl:text-[25px] font-semibold text-sky-400">Based on Google Review</p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start gap-3 xl:gap-4 4xl:gap-6 w-full sm:w-auto">

                                <a href="#contact"
                                    className="font-nunito px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                                >
                                    Connect With Us
                                </a>


                                <a href="#smmport"
                                    className="font-nunito px-6 py-2 xl:px-6 xl:py-2 4xl:px-8 4xl:py-3 rounded-[15px] text-sm xl:text-base 4xl:text-lg font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                                >
                                    Portfolio
                                </a>

                                {/* <div className="hidden xl:grid grid-cols-8 gap-2 4xl:gap-3 self-center ml-2 4xl:ml-4">
                                    {[...Array(24)].map((_, i) => (
                                        <span key={i} className="w-1 h-1 4xl:w-1.5 4xl:h-1.5 rounded-full bg-indigo-400/40" />
                                    ))}
                                </div> */}
                            </div>
                        </div>

                        <HeroVisual />
                    </div>
                </div>
            </section >

            <MarqueeRibbon />

            {/* 2. WHY CHOOSE — STICKY LEFT + SCROLLING RIGHT */}
            <section className="relative bg-dark-bg overflow-x-clip">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] 4xl:w-[800px] h-[400px] sm:h-[600px] 4xl:h-[800px] rounded-full bg-electric-blue/5 blur-[110px] sm:blur-[150px] pointer-events-none" />

                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24 py-16 md:py-24 4xl:py-32 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 xl:gap-16 4xl:gap-24 items-start">

                        {/* LEFT — STICKY */}
                        <div className="lg:sticky lg:top-28 self-start h-fit w-full">
                            <span className="font-alata text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-neon-cyan block mb-4">
                                Why Choose Sanyog Media
                            </span>
                            <h2 className="font-alata font-extrabold text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mb-8 leading-tight">
                                Specialized in Developing Websites
                            </h2>

                            <Swiper
                                modules={[Autoplay]}
                                loop={true}
                                loopAdditionalSlides={websiteShowcase.length}
                                slidesPerView={1}
                                speed={700}
                                autoplay={{ delay: 2200, disableOnInteraction: false }}
                                className="rounded-2xl overflow-hidden border border-glass-border"
                            >
                                {websiteShowcase.map((src, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="relative aspect-video w-full">
                                            <Image src={src} alt="Website Design" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* RIGHT — CARDS */}
                        <div className="flex flex-col gap-6 xl:gap-8 4xl:gap-10 w-full">
                            {services.map((s, idx) => (
                                <div key={idx} className="glass-card p-5 sm:p-6 xl:p-7 4xl:p-9 rounded-2xl flex flex-col gap-4 min-h-[200px] sm:min-h-[220px] xl:min-h-[240px] 4xl:min-h-[270px]">
                                    <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-xl bg-white border border-glass-border flex items-center justify-center mb-4 sm:mb-6 shrink-0">
                                        <img src={s.iconImage} alt={`${s.title} icon`} className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16" />
                                    </div>
                                    <h3 className="font-alata font-bold text-lg xl:text-xl 4xl:text-2xl text-white">{s.title}</h3>
                                    <p className="font-nunito text-xs xl:text-sm 4xl:text-base text-slate-400 leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. VIDEO */}
            <section className=" bg-dark-bg ">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-10 md:mb-12 4xl:mb-16">
                        <h2 className="font-alata font-extrabold text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight">
                            Making a Lasting <span className="gradient-text">Mark in The Market</span>
                        </h2>
                        <p className="font-nunito text-slate-400 mt-4 xl:text-lg 4xl:text-xl">
                            Your brand is a story unfolding across all customer touch points
                        </p>
                    </div>

                    <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden border border-glass-border bg-slate-950/40">
                        <video className="w-full h-full object-cover" src="/images/web-design/web-ad.mp4" autoPlay muted loop playsInline>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </section>

            {/* 4. PORTFOLIO GALLERY */}
            <section id="webportfolio" className="py-16 md:py-24 4xl:py-32 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="w-full text-center mb-12 md:mb-16 4xl:mb-20">
                        <h2
                            className="
      relative
      left-1/2
      -translate-x-1/2
      w-max
      font-alata
      font-extrabold
      text-xl
      md:text-3xl
      xl:text-4xl
      4xl:text-5xl
      text-white
      leading-tight
      mb-4
      whitespace-nowrap
      text-center
    "
                        >
                            Your Website is a Canvas Where Your Brand&apos;s{" "}
                            <span className="gradient-text">Story Comes Alive</span>
                        </h2>

                        <p className="font-nunito text-slate-400 xl:text-lg 4xl:text-xl text-center">
                            Check out these samples for your website landing page
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-5 4xl:gap-6">
                        {portfolioGallery.map((src, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => setActiveIndex(i)}
                                className="group relative w-full rounded-2xl overflow-hidden border border-glass-border cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-neon-cyan"
                                style={{ aspectRatio: "1600 / 901" }}
                            >
                                <Image
                                    src={src}
                                    alt="Website Design"
                                    fill
                                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1920px) 33vw, 25vw"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-500 flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        <span className="flex items-center justify-center w-11 h-11 4xl:w-14 4xl:h-14 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm">
                                            <ZoomIn className="w-4 h-4 4xl:w-5 4xl:h-5 text-white" />
                                        </span>
                                    </div>
                                </div>
                            </button>
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
                            <div className="font-alata absolute top-4 left-4 sm:top-6 sm:left-8 text-white/80 font-mono text-xs sm:text-sm tracking-wider z-10">
                                {activeIndex + 1} / {portfolioGallery.length}
                            </div>

                            <button type="button" onClick={closeLightbox} className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10">
                                <X className="w-5 h-5 text-white" />
                            </button>

                            <button type="button" onClick={showPrevImage} className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10">
                                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </button>

                            <button type="button" onClick={showNextImage} className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-colors z-10">
                                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </button>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.96 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="relative w-full max-w-5xl 4xl:max-w-7xl aspect-[1600/901] rounded-xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Image src={portfolioGallery[activeIndex]} alt="Website Design" fill className="object-contain bg-slate-950" sizes="100vw" priority />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>

            <Testimonials />
            {/* 5. PRICING */}
            <section id="pricing" className="bg-dark-bg relative overflow-hidden ">
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="font-alata font-black text-[5rem] sm:text-[8rem] md:text-[12rem] 4xl:text-[15rem] text-white/[0.03] leading-none tracking-tight whitespace-nowrap">
                        PRICING
                    </span>
                </div>

                <div className="max-w-[1400px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-10 4xl:px-24 relative z-10">
                    <div className="w-full flex flex-col items-center text-center mb-12 md:mb-16 4xl:mb-20">
                        <span className="font-alata text-xs xl:text-sm 4xl:text-base font-bold uppercase tracking-widest text-neon-cyan">
                            Website Design Packages
                        </span>

                        <h2 className="font-alata font-extrabold text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4 text-center max-w-3xl 4xl:max-w-5xl">
                            Expert Website Design at a Price That Fits Your Business
                        </h2>
                    </div>

                    {/* 4 cards ek hi line me - grid-cols-4 from the start */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 xl:gap-5 4xl:gap-7">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`min-w-0 rounded-2xl sm:rounded-3xl p-3 sm:p-5 xl:p-6 4xl:p-8 flex flex-col justify-between border ${plan.popular
                                    ? "border-white/20 bg-slate-900/80 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                                    : "border-glass-border bg-slate-950/40"
                                    }`}
                            >
                                <div>
                                    {plan.popular && (
                                        <span className="font-alata inline-block mb-2.5 px-3 py-1 xl:px-3.5 xl:py-1.5 rounded-full bg-white text-slate-950 text-[10px] xl:text-xs font-bold uppercase tracking-widest">
                                            Most Popular
                                        </span>
                                    )}
                                    <h3 className="font-alata font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white mb-1">{plan.name}</h3>
                                    <span className="font-alata text-[10px] sm:text-xs xl:text-sm 4xl:text-base text-slate-500 uppercase tracking-wider">
                                        {plan.subtitle}
                                    </span>

                                    {/* Agar variants hain (WordPress/Coding), to dono price dikhao */}
                                    {plan.variants ? (
                                        <div className="flex flex-col gap-3 mt-3 mb-5">
                                            {plan.variants.map((variant, vIdx) => (
                                                <div key={vIdx} className="border border-glass-border/60 rounded-xl p-3">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="font-alata text-xs sm:text-sm font-bold text-neon-cyan uppercase">
                                                            {variant.type}
                                                        </span>
                                                        <span className="font-alata font-extrabold text-lg sm:text-xl text-white">
                                                            {variant.price}
                                                        </span>
                                                    </div>
                                                    {variant.extraFeatures?.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 mt-1">
                                                            <Check className="w-3 h-3 text-neon-cyan shrink-0" />
                                                            <span className="font-alata">{f}</span>
                                                        </div>
                                                    ))}
                                                    {variant.extraExcluded?.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-1">
                                                            <span className="w-3 h-3 shrink-0 text-center">✕</span>
                                                            <span className="font-alata">{f}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-baseline gap-2 mt-3 mb-5 flex-wrap">
                                            <span className="font-nunito text-xs xl:text-sm 4xl:text-base text-slate-500 line-through">{plan.oldPrice}</span>
                                            <span className="font-alata font-extrabold text-xl sm:text-2xl xl:text-3xl 4xl:text-4xl text-white">
                                                {plan.price}
                                            </span>
                                            {!plan.isCustomQuote && (
                                                <span className="font-nunito text-xs xl:text-sm 4xl:text-base text-slate-400 font-semibold">+ GST</span>
                                            )}
                                        </div>
                                    )}


                                    <a href="#contact"
                                        className={`font-nunito w-full py-2.5 sm:py-3 xl:py-3.5 4xl:py-4 rounded-xl font-bold text-center text-xs sm:text-sm xl:text-base 4xl:text-lg transition-all block mb-5 ${plan.popular
                                            ? "bg-white text-slate-950 hover:bg-slate-100"
                                            : "bg-slate-900 border border-glass-border text-white hover:border-white"
                                            }`}
                                    >
                                        {plan.isCustomQuote ? "Get Custom Quote" : "Buy Now"}
                                    </a>

                                    <div className="border-t border-glass-border/60 pt-4">
                                        <ul className="flex flex-col gap-2">
                                            {plan.features.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2 text-[11px] sm:text-xs xl:text-sm 4xl:text-base text-slate-300">
                                                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 4xl:w-5 4xl:h-5 text-neon-cyan shrink-0 mt-0.5" />
                                                    <span className="font-alata">{feat}</span>
                                                </li>
                                            ))}
                                            {plan.excluded?.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2 text-[11px] sm:text-xs xl:text-sm 4xl:text-base text-slate-500">
                                                    <span className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 mt-0.5 text-center">✕</span>
                                                    <span className="font-alata">{feat}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Extra charge note - har package me */}
                                        {plan.note && (
                                            <p className="font-nunito text-[10px] sm:text-[11px] text-slate-500 italic mt-4 border-t border-glass-border/40 pt-3">
                                                {plan.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="bg-dark-bg relative overflow-hidden">
                <div className="py-12 sm:py-14 md:py-20 4xl:py-28 text-center px-4 sm:px-6">
                    <span className="font-alata text-[16px] xl:text-[20px] 4xl:text-[26px] font-bold uppercase tracking-widest text-neon-cyan">
                        How It Works
                    </span>
                    <h2 className="font-alata font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4 leading-snug">
                        Makes It Easy to Create Your Logo &amp; Branding
                    </h2>
                </div>

                <div className="flex flex-col">
                    {howItWorks.map((step, idx) => {
                        const imageFirst = idx % 2 !== 0;
                        return (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[370px] 4xl:min-h-[480px]">
                                <div
                                    className={`flex flex-col justify-center px-6 sm:px-10 md:px-16 xl:px-20 4xl:px-28 py-10 sm:py-12 md:py-16 4xl:py-24 ${step.bg} ${imageFirst ? "lg:order-2" : "lg:order-1"
                                        }`}
                                >
                                    <div className="w-10 h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 rounded-full flex items-center justify-center mb-5 md:mb-6">
                                        <img
                                            src={step.iconImage}
                                            alt={`${step.title} icon`}
                                            className="w-11 h-11 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16"
                                            style={{ filter: "brightness(0) invert(1)" }}
                                        />
                                    </div>
                                    <h3 className="font-alata font-extrabold text-xl sm:text-2xl md:text-3xl xl:text-4xl 4xl:text-5xl text-white mb-3 md:mb-4 max-w-sm xl:max-w-md 4xl:max-w-lg leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="font-nunito text-sm md:text-base xl:text-lg 4xl:text-xl text-white max-w-md xl:max-w-lg 4xl:max-w-xl leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                <div
                                    className={`relative w-full h-[175px] sm:h-[320px] lg:h-auto lg:min-h-full bg-slate-900 overflow-hidden ${imageFirst ? "lg:order-1" : "lg:order-2"
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
        </main >
    );
}