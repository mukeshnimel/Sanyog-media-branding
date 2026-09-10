"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import {
    ArrowRight,
    Check,
    ChevronDown,
    MessageCircleQuestion,
} from "lucide-react";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import MarqueeRibbon from "@/components/MarqueeRibbon";

// ---------- DATA ----------

const showcaseImages = [
    "/images/home/packaging-design/1.jpg",
    "/images/home/packaging-design/2.png",
    "/images/home/packaging-design/3.jpg",
    // "/images/home/packaging-design/4.jpg",
    "/images/home/packaging-design/5.jpg",
    "/images/home/packaging-design/6.jpg",
    "/images/home/packaging-design/7.jpg",
    "/images/home/packaging-design/8.jpg",
    "/images/home/packaging-design/9.jpg",
];


const avatarSeeds = [12, 32, 47, 5, 15, 60];

const packagingColumn1 = [
    { src: "/images/home/packaging-design/1.jpg", alt: "Energy drink can packaging" },
    { src: "/images/home/packaging-design/2.png", alt: "Perfume box packaging" },
    { src: "/images/home/packaging-design/3.jpg", alt: "Medicine packaging" },
    { src: "/images/home/packaging-design/10.jpg", alt: "Snack pouch packaging" },
    { src: "/images/home/packaging-design/11.jpg", alt: "Cup packaging" },
];

const packagingColumn2 = [
    { src: "/images/home/packaging-design/4.jpg", alt: "Pizza box packaging design" },
    { src: "/images/home/packaging-design/5.jpg", alt: "Skincare tube packaging" },
    { src: "/images/home/packaging-design/6.jpg", alt: "Skincare tube packaging" },
    { src: "/images/home/packaging-design/12.jpg", alt: "Snack pouch packaging" },

];

const packagingColumn3 = [
    { src: "/images/home/packaging-design/7.jpg", alt: "Beverage can packaging" },
    { src: "/images/home/packaging-design/8.jpg", alt: "Snack pouch packaging" },
    { src: "/images/home/packaging-design/9.jpg", alt: "Cup packaging" },
    { src: "/images/home/packaging-design/13.jpg", alt: "Snack pouch packaging" },
    { src: "/images/home/packaging-design/14.jpg", alt: "Cup packaging" },
];

const badges = [
    { icon: "/images/logo-design/vector/1.svg", line1: "Top Notch", line2: "Designing" },
    { icon: "/images/logo-design/vector/2.svg", line1: "Sketch Base", line2: "Designs" },
    { icon: "/images/logo-design/vector/3.svg", line1: "Copyright", line2: "Ownership" },
    { icon: "/images/logo-design/vector/4.svg", line1: "Instant Free", line2: "Revisions" },
    { icon: "/images/logo-design/vector/5.svg", line1: "100% Money", line2: "Back Guarantee" },
];

const services = [
    "Food Products Designing",
    "Product Box Designing",
    "Cosmetics Packaging",
    "Bottle Label or Sticker",
    "Product Label or Sticker",
    "Product Bag Packaging",
];

const testimonials = [
    {
        name: "Mohit Garg",
        text: "We needed some really good pamphlet designs for our local store in Churu, and Sanyog Media Concepts did a fantastic job. The designs were eye-catching, and they understood exactly what message we wanted to convey.",
    },
    {
        name: "Monika Sharma",
        text: "The stall design Sanyog Media did for our trade show was top-notch. It was functional, looked great, and made it easy for us to interact with visitors. We got so many compliments!",
    },
    {
        name: "Varsha Shrestha",
        text: "We used their services for Cosmoprof and they were very professional. Everything was very smooth. Good communication too. Thank you so much for your service.",
    },
];

const pricingPlans = [
    {
        name: "Food Products",
        subtitle: "Packaging Design",
        oldPrice: "₹9999",
        price: "₹7999",
    },
    {
        name: "Cosmetic Products",
        subtitle: "Packaging Design",
        oldPrice: "₹9999",
        price: "₹7999",
    },
    {
        name: "Product Box",
        subtitle: "Packaging Design",
        oldPrice: "₹9999",
        price: "₹7999",
        popular: true,
    },
    {
        name: "Products Label & Sticker",
        subtitle: "Packaging Design",
        oldPrice: "₹5999",
        price: "₹3999",
    },
    {
        name: "Bottle Label & Sticker",
        subtitle: "Packaging Design",
        oldPrice: "₹7999",
        price: "₹5999",
    },
    {
        name: "Products Bag",
        subtitle: "Packaging Design",
        oldPrice: "₹5999",
        price: "₹3999",
    },
];

const pricingFeatures = [
    "2 Packaging Design Samples",
    "3 Revisions Rounds",
    "All Source Files",
    "Branding Expert Consultation",
    "Dedicated Designer",
    "Copyright Ownership Transfer",
    "CMYK Colour Design",
];

const howItWorks = [
    {
        iconImage: "/images/logo-design/vector/6.svg",
        title: "Tell Us Your Vision About Your Brand",
        desc: "Submit the design brief and tell us your ideas and what kind of design you're expecting.",
        bg: "bg-amber-400",
        image: "/images/logo-design/6.png",
    },
    {
        iconImage: "/images/packaging-design/icons/1.svg",
        title: "We Will Process Your Packaging Design",
        desc: "According to your requirements, we will first look at your competitors. After doing all the research, we will start designing your packaging.",
        bg: "bg-sky-400",
        image: "/images/web-design/26.png",
    },
    {
        iconImage: "/images/packaging-design/icons/2.svg",
        title: "Review Your Packaging Design",
        desc: "Review the packaging design we provide and let us know if you need any changes.",
        bg: "bg-rose-400",
        image: "/images/web-design/27.png",
    },
    {
        iconImage: "/images/packaging-design/icons/3.svg",
        title: "Approve Our Packaging Design & Rate Us",
        desc: "Approve & download your final files, then give your feedback to us.",
        bg: "bg-emerald-400",
        image: "/images/web-design/28.png",
    },
];

const faqs = [
    {
        q: "Why Should I Choose Sanyog Media for Packaging Design?",
        a: "After being successful in the exhibition stall designing & fabrication, we have started packaging design & graphic design. Our motive is to provide you the best experienced creative artists & designers who can justify the values of your brand with your packaging.",
    },
    {
        q: "How Much Time It Takes To Design A Packaging?",
        a: "After you submit your design brief, it will take around 5 working days to get the first initial designs. And if you respond quickly & tell us whether you want revisions or want to finalize, it will take overall 7 to 12 days to finalize your packaging. Your quick response and co-operation will dictate the final delivery time. Our average order completion time is 10 to 15 days.",
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

// ---------- PAGE ----------

export default function PackagingDesignPage() {
    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <main className="flex-1 bg-dark-bg text-slate-100 overflow-hidden">

            {/* PACKAGING DESIGN — HERO SECTION */}
            <section className="relative py-16 sm:py-20 md:py-28 bg-dark-bg overflow-hidden border-b border-glass-border">
                <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-electric-blue/10 blur-[100px] sm:blur-[130px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
                        {/* Left — copy */}
                        <div className="lg:col-span-5 flex flex-col items-start w-full mt-5 sm:mt-4 lg:mt-0">
                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm sm:text-base md:text-lg text-white/90 mb-2"
                            >
                                Unveil Your Product&apos;s Essence through
                            </motion.p>

                            {/* FIX: bumped the smallest step down to text-4xl so the
                                headline doesn't feel oversized on narrow phones, while
                                keeping the same md/lg sizes as before. */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="font-display font-black leading-[0.95] mb-2"
                            >
                                <span className="block text-4xl sm:text-5xl md:text-7xl text-white">
                                    Packaging
                                </span>
                                <span className="block text-4xl sm:text-5xl md:text-7xl text-sky-400">
                                    Artistry
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-sm md:text-base text-slate-300 leading-relaxed mt-4 mb-6 max-w-md"
                            >
                                &ldquo;Sanyog Media Concepts&rdquo; Design Prowess weaves stories
                                that captivate, setting your product apart with Artful Packaging
                                solutions
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex -space-x-3 mb-5"
                            >
                                {avatarSeeds.map((seed, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 border-dark-bg overflow-hidden relative"
                                    >
                                        <Image
                                            src={`https://i.pravatar.cc/64?img=${seed}`}
                                            alt="Client avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 }}
                                className="mb-8"
                            >
                                <p className="text-base font-bold text-white">4.9/5 Star Rating</p>
                                <p className="text-sm font-semibold text-sky-400">
                                    Based on Google Review
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6 w-full"
                            >
                                <a
                                    href="/contact"
                                    className="px-6 py-3 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-fit"
                                >
                                    Connect With Us
                                </a>
                                <a
                                    href="#pricing"
                                    className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-cyan-500 hover:bg-cyan-600 transition-colors text-center w-fit"
                                >
                                    Prices
                                </a>
                            </motion.div>

                            {/* Decorative dots + site badge, same row as screenshot */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    {[...Array(6)].map((_, i) => (
                                        <span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400/50" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right — continuous vertical marquee */}
                        {/* FIX: this whole block was hardcoded for desktop —
                            `h-65` (col 2) isn't a valid Tailwind class at all, so that
                            column's image boxes collapsed to 0 height, and the fixed
                            `h-[560px]` outer wrapper never scaled down. On a narrow
                            phone, 3 columns squeezed into ~90px each while every image
                            box stayed 224–260px tall made them look absurdly
                            stretched/cropped. Everything below now scales down across
                            breakpoints and uses the same height on all 3 columns. */}
                        <div className="lg:col-span-7 w-full relative">
                            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 h-[360px] sm:h-[460px] md:h-[560px] overflow-hidden rounded-xl sm:rounded-2xl">
                                {/* Column 1 (left) — moves down */}
                                <div className="pkg-marquee-col">
                                    <div className="pkg-marquee-track pkg-marquee-down">
                                        {[...packagingColumn1, ...packagingColumn1].map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-full h-32 sm:h-44 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-2 sm:mb-3 md:mb-4 shrink-0"
                                            >
                                                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 2 (middle) — moves up */}
                                <div className="pkg-marquee-col">
                                    <div className="pkg-marquee-track pkg-marquee-up">
                                        {[...packagingColumn2, ...packagingColumn2].map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-full h-32 sm:h-44 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-2 sm:mb-3 md:mb-4 shrink-0"
                                            >
                                                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 3 (right) — moves down */}
                                <div className="pkg-marquee-col">
                                    <div className="pkg-marquee-track pkg-marquee-down">
                                        {[...packagingColumn3, ...packagingColumn3].map((img, i) => (
                                            <div
                                                key={i}
                                                className="relative w-full h-32 sm:h-44 md:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 mb-2 sm:mb-3 md:mb-4 shrink-0"
                                            >
                                                <Image src={img.src} alt={img.alt} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {/* Top & Bottom Fade - cinematic effect */}
                            <div className="absolute inset-x-0 top-0 h-16 sm:h-20 md:h-24 bg-gradient-to-b from-dark-bg to-transparent pointer-events-none z-10" />

                            <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-dark-bg to-transparent pointer-events-none z-10" />
                            <div className="absolute -bottom-3 left-3 inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-950 border border-glass-border text-[10px] font-medium text-sky-400 shadow-lg z-10">
                                https://sanyogmedia.in
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
  .pkg-marquee-col {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .pkg-marquee-track {
    display: flex;
    flex-direction: column;
  }
  .pkg-marquee-up {
    animation: pkg-marquee-up 24s linear infinite;
  }
  .pkg-marquee-down {
    animation: pkg-marquee-down 24s linear infinite;
  }
  .pkg-marquee-col:hover .pkg-marquee-track {
    animation-play-state: paused;
  }
  @keyframes pkg-marquee-up {
    from { transform: translateY(0); }
    to { transform: translateY(-50%); }
  }
  @keyframes pkg-marquee-down {
    from { transform: translateY(-50%); }
    to { transform: translateY(0); }
  }
`}</style>
            </section>

            {/* 9. CLIENTS & BRANDS — INFINITE SCROLLING MARQUEE RIBBON */}
            <MarqueeRibbon />

            {/* SECTION 2: TRUST & VALUE PROPOSITION */}
            <section className="py-12 sm:py-16 bg-dark-bg border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-8">
                        {badges.map((badge, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.4, delay: idx * 0.08 }}
                                className="group w-[130px] sm:w-[170px] md:w-[190px] rounded-2xl sm:rounded-3xl border-2 border-sky-500 flex flex-col items-center justify-center gap-3 sm:gap-4 py-6 sm:py-8 px-3 sm:px-4 text-center"
                            >
                                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-sky-500 group-hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center overflow-hidden transition-transform duration-500 ease-out hover:scale-110 shrink-0">
                                    <img
                                        src={badge.icon}
                                        alt={`${badge.line1} ${badge.line2}`}
                                        className="w-9 h-9 sm:w-10 sm:h-10 brightness-0 invert"
                                    />
                                </div>
                                <span className="text-xs sm:text-sm md:text-base font-bold text-white leading-snug">
                                    {badge.line1}
                                    <br />
                                    {badge.line2}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. TRUST & EXPERIENCE SHOWCASE — SWIPER.JS */}
            <section className="py-16 sm:py-20 md:py-24 bg-dark-bg relative border-b border-glass-border overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <span className="text-sm font-bold text-sky-400">
                            Trust &amp; Experience Highlighting
                        </span>
                        <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-5xl text-white mt-4">
                            Your Trusted Branding &amp; Marketing Partner
                        </h2>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Swiper
                        modules={[Autoplay]}
                        centeredSlides={true}
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={16}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 24,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 32,
                            },
                        }}
                        speed={700}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="trust-coverflow-swiper !overflow-visible"
                    >
                        {showcaseImages.map((src, i) => (
                            <SwiperSlide key={i}>
                                <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={src}
                                        alt={`Showcase ${i + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <style jsx global>{`
           .trust-coverflow-swiper {
             perspective: 1200px;
             overflow: visible !important;
           }
         
           .trust-coverflow-swiper .swiper-wrapper {
             align-items: center;
           }
         
           .trust-coverflow-swiper .swiper-slide {
             transition:
               transform 0.6s ease,
               opacity 0.6s ease;
             opacity: 0.7;
           }
         
           .trust-coverflow-swiper .swiper-slide-active {
             transform: scale(1);
             opacity: 1;
             z-index: 2;
           }
         
           .trust-coverflow-swiper .swiper-slide-prev {
             transform: perspective(1200px)
               rotateY(18deg)
               scale(0.92);
           }
         
           .trust-coverflow-swiper .swiper-slide-next {
             transform: perspective(1200px)
               rotateY(-18deg)
               scale(0.92);
           }
         `}</style>
            </section>

            {/* 5. IMMERSIVE EXPERIENCE */}
            <section className="py-16 sm:py-20 md:py-24 bg-dark-bg border-b border-glass-border relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
                        {/* Left — copy */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col items-start"
                        >
                            <h2 className="font-display text-2xl md:text-4xl text-white leading-tight mb-4">
                                Immersive Experience That Deeply Connects With{" "}
                                <span className="text-sky-400">Your Audience.</span>
                            </h2>

                            <div className="flex items-center gap-1.5 mb-8">
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                                <span className="w-10 h-0.5 bg-sky-500 rounded-full" />
                            </div>

                            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
                                Whether Launching A New Product Or Rebranding, Our Designs Showcase
                                Our Dedication To Your Satisfaction, Backed By A 100% Money-Back
                                Guarantee. Join Us To Transform Ordinary Packaging Into
                                Extraordinary Storytelling, Making Your Product An Unforgettable
                                Part Of Your Customer&apos;s Journey. Let&apos;s Turn Plain
                                Packaging Into Incredible Stories, And Make Your Product A Part Of
                                Your Customer&apos;s Journey They Won&apos;t Forget.
                            </p>


                            <a href="#contact"
                                className="px-7 py-3.5 rounded-full text-sm font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors inline-flex items-center justify-center"
                            >
                                Connect With Us
                            </a>
                        </motion.div>

                        {/* Right — single image, fully visible */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="relative w-full h-[280px] sm:h-[340px] md:h-[420px]"
                        >
                            <Image
                                src="/images/packaging-design/1.png"
                                alt="Packaging design showcase"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-contain"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* 7. SERVICES LIST */}
            <section className="py-16 sm:py-20 md:py-24 bg-dark-bg border-b border-glass-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-start">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white leading-tight lg:col-span-1">
                            Our Packaging Design Services
                        </h2>
                        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 sm:gap-y-5">
                            {services.map((s, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <ArrowRight className="w-5 h-5 text-neon-cyan shrink-0" />
                                    <span className="text-sm md:text-xl font-semibold text-slate-200">{s}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. PRICING */}
            <section id="packagingprice" className="py-16 sm:py-20 md:py-24 bg-slate-950 relative overflow-hidden border-b border-glass-border">
                <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none select-none">
                    <span className="font-display font-black text-[5rem] sm:text-[8rem] md:text-[12rem] text-white/[0.03] leading-none tracking-tight whitespace-nowrap">
                        PRICING
                    </span>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                        <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">
                            Pricing Options
                        </span>
                        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl text-white mt-4">
                            Packaging Design Pricing
                        </h2>
                        <p className="text-sm text-slate-400 mt-4">Unique Design For Your UNIQUE Product</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                        {pricingPlans.map((plan, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between border ${plan.popular
                                    ? "border-white/20 bg-slate-900/80 shadow-[0_0_40px_rgba(255,255,255,0.06)]"
                                    : "border-glass-border bg-slate-950/40"
                                    }`}
                            >
                                <div>
                                    <h3 className="font-display font-bold text-lg text-white mb-1">{plan.name}</h3>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider">
                                        {plan.subtitle}
                                    </span>

                                    <div className="flex items-baseline gap-2 mt-4 mb-6 flex-wrap">
                                        <span className="text-xs text-slate-500 line-through">{plan.oldPrice}</span>
                                        <span className="font-display font-extrabold text-3xl text-white">
                                            {plan.price}
                                        </span>
                                        <span className="text-xs text-slate-400 font-semibold">+ GST</span>
                                    </div>

                                    <a
                                        href="#contact"
                                        className={`w-full py-3 rounded-xl font-bold text-center text-sm transition-all block mb-8 ${plan.popular
                                            ? "bg-white text-slate-950 hover:bg-slate-100"
                                            : "bg-slate-900 border border-glass-border text-white hover:border-white"
                                            }`}
                                    >
                                        Order Now →
                                    </a>

                                    <div className="border-t border-glass-border/60 pt-6">
                                        <ul className="flex flex-col gap-3">
                                            {pricingFeatures.map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                                                    <Check className="w-3.5 h-3.5 text-neon-cyan shrink-0 mt-0.5" />
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

            {/* SECTION 6: HOW IT WORKS (ALTERNATING FULL-WIDTH ROWS) */}
            <section className="bg-dark-bg border-t border-b border-glass-border relative overflow-hidden">
                {/* Header */}
                <div className="py-12 sm:py-14 md:py-20 text-center px-4 sm:px-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-neon-cyan">
                        How It Works
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-5xl text-white mt-4 leading-snug">
                        Makes It Easy to Create Your Logo &amp; Branding
                    </h2>
                </div>

                {/* Rows */}
                <div className="flex flex-col">
                    {howItWorks.map((step, idx) => {
                        const imageFirst = idx % 2 !== 0;
                        return (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-[370px]">
                                {/* Text block */}
                                <div
                                    className={`flex flex-col justify-center px-6 sm:px-10 md:px-16 py-10 sm:py-12 md:py-16 ${step.bg} ${imageFirst ? "lg:order-2" : "lg:order-1"
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-5 md:mb-6">
                                        <img
                                            src={step.iconImage}
                                            alt={`${step.title} icon`}
                                            className="w-11 h-11"
                                        />
                                    </div>
                                    <h3 className="font-display font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-950 mb-3 md:mb-4 max-w-sm leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-slate-900/80 max-w-md leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Image block */}
                                <div
                                    className={`relative w-full h-[220px] sm:h-[320px] lg:h-auto lg:min-h-full bg-slate-900 overflow-hidden ${imageFirst ? "lg:order-1" : "lg:order-2"
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

            {/* 10. FAQ — FULL WIDTH GRADIENT ACCORDION */}
            <section className="py-16 sm:py-20 md:py-24 bg-dark-bg relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-12 md:mb-16 flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full border-2 border-white/70 flex items-center justify-center mb-6">
                        <MessageCircleQuestion className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-10 h-1 rounded-full bg-sky-500" />
                    </div>
                    <p className="text-sm text-slate-400">
                        Answer To Our Most Frequently Asked Questions are just one Click Away.
                    </p>
                </div>

                {/* FIX: no max-width wrapper meant rows stretched edge-to-edge on
                    wide screens, and `pl-15 md:pl-19` (invalid Tailwind — no class is
                    generated) left the answer text with zero left indent instead of
                    lining up under the question. */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div
                                key={idx}
                                className={`w-full transition-all duration-300 rounded-xl ${isOpen ? "border border-white" : "border border-transparent"
                                    }`}
                                style={{
                                    background: "#1487c9",
                                }}
                            >
                                <button
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full px-4 md:px-5 py-4 flex items-center gap-4 text-left"
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 text-white shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span className="font-display font-bold text-sm md:text-base text-white">
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
                                            <div className="px-4 sm:px-6 md:px-10 pb-6 pl-[3.25rem] md:pl-[3.75rem] text-sm text-white/85 leading-relaxed">
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