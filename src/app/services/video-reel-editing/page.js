"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Testimonials from "@/components/Testimonials";
import ContactPopup from "@/components/Contactpopup";

import {
    Sparkles,
    Star,
    ArrowRight,
    Play,
    Pause,
    Briefcase,
    Users,
    PartyPopper,
    Check,
    ChevronDown,
    MessageCircleQuestion,
    Quote,
    ShieldCheck,
    Zap,
    UserCheck,
    Wallet,
    Video,
    Images,
    PlaySquare,
    Smile,
} from "lucide-react";
import Priorities from "@/components/Priorities";
import FinalCTA from "@/components/FinalCTA";

// ---------- DATA ----------

const useCases = [
    {
        title: "For Business",
        desc: "Clean, sharp, and brand-focused edits designed to highlight the best of what you offer. Ideal for websites, presentations, and paid ads.",
        icon: Video,
    },
    {
        title: "For Content Creators",
        desc: "Perfect for YouTube, Instagram, Facebook and LinkedIn. We craft engaging edits with smooth transitions, sound design, text overlays, and pacing optimized for viewer retention.",
        icon: Images,
    },
    {
        title: "For Corporate Event",
        desc: "Turn raw footage into compelling highlight reels, recaps, or promotional content that captures the energy and success of your exhibitions or corporate events.",
        icon: PlaySquare,
    },
];

const avatarImages = [
    "https://picsum.photos/seed/client1/100/100",
    "https://picsum.photos/seed/client2/100/100",
    "https://picsum.photos/seed/client3/100/100",
    "https://picsum.photos/seed/client4/100/100",
    "https://picsum.photos/seed/client5/100/100",
    "https://picsum.photos/seed/client6/100/100",
];

const portfolioVideos = [
    { src: "/images/video-reel/1.mp4", ratio: 13 / 20 },   // portrait - reel type
    { src: "/images/video-reel/2.mp4", ratio: 25 / 9 },   // landscape - wide
    { src: "/images/video-reel/3.mp4", ratio: 13 / 20 },   // portrait
    { src: "/images/video-reel/4.mp4", ratio: 25 / 9 },   // landscape
    { src: "/images/video-reel/5.mp4", ratio: 13 / 20 },   // portrait
    { src: "/images/video-reel/6.mp4", ratio: 13 / 20 },   // portrait
    { src: "/images/video-reel/7.mp4", ratio: 16 / 9 },   // landscape
    { src: "/images/video-reel/8.mp4", ratio: 16 / 9 },   // landscape
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

// ---------- PORTFOLIO VIDEO CARD (hover to play, tap to play on touch devices) ----------

function PortfolioVideoCard({ src, index, ratio }) {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const togglePlay = () => {
        const vid = videoRef.current;
        if (!vid) return;
        if (isPlaying) {
            vid.pause();
        } else {
            vid.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div
            className="relative h-64 xs:h-72 sm:h-80 md:h-[420px] w-full sm:w-auto rounded-2xl overflow-hidden border-2 border-slate-700 bg-black group cursor-pointer"
            style={{
                aspectRatio: ratio,
                flexGrow: 1,
                flexBasis: `${ratio * 240}px`,
            }}
            onClick={togglePlay}
            onMouseEnter={() => {
                videoRef.current?.play();
                setIsPlaying(true);
            }}
            onMouseLeave={() => {
                videoRef.current?.pause();
                setIsPlaying(false);
            }}
        >
            <video
                ref={videoRef}
                src={src}
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                disablePictureInPicture
                disableRemotePlayback
                onContextMenu={(e) => e.preventDefault()}
                onLoadedData={() => setIsLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"
                    }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${isPlaying ? "opacity-0" : "opacity-100"
                    }`}
            >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 ml-0.5" fill="currentColor" />
                </div>
            </div>
            <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white/80 bg-black/40 px-2 py-1 rounded-md">
                Reel {index + 1}
            </span>
        </div>
    );
}

// ---------- PAGE ----------

export default function VideoReelEditingPage() {
    const [activeFaq, setActiveFaq] = useState(null);

    // separate refs — sharing one ref between two <video> elements meant only the
    // second video actually responded to play()/pause() calls
    const heroVideoRef = useRef(null);
    const explainerVideoRef = useRef(null);

    const [heroPlaying, setHeroPlaying] = useState(true);
    const [explainerPlaying, setExplainerPlaying] = useState(true);

    const toggleExplainerVideo = () => {
        const vid = explainerVideoRef.current;
        if (!vid) return;
        if (explainerPlaying) vid.pause();
        else vid.play();
        setExplainerPlaying(!explainerPlaying);
    };

    const [showPopup, setShowPopup] = useState(false);

    return (
        <main className="flex-1 bg-slate-950 text-slate-100 overflow-x-hidden">

            {/* 1. HERO */}
            <section className="relative py-16 sm:py-20 md:py-28 lg:py-32 bg-slate-950 border-b border-slate-800 overflow-hidden">
                {/* Background video with gradient overlay */}
                <div className="absolute inset-0">
                    <video
                        ref={heroVideoRef}
                        src="/images/video-reel/Untitled-design-2-1.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />

                    <div
                        className="absolute inset-0 opacity-[0.76] transition-all duration-300"
                        style={{
                            background: "linear-gradient(180deg, #001136 46%, #1A0101 100%)",
                        }}
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
                    <span className="text-white text-base sm:text-xl md:text-3xl lg:text-4xl font-medium mb-4 sm:mb-6">
                        What We Do
                    </span>

                    <div className="border-4 sm:border-[5px] border-white rounded-2xl sm:rounded-[40px] px-8 sm:px-16 md:px-28 lg:px-40 py-3 sm:py-4 md:py-5 mb-6 sm:mb-8">
                        <span className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold text-sky-400 whitespace-nowrap">
                            Advertisement
                        </span>
                    </div>

                    <h1 className="font-extrabold text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-tight text-white mb-3 sm:mb-4">
                        Reels &amp; Video Editing
                    </h1>

                    <p className="text-sm sm:text-base md:text-xl lg:text-2xl italic text-white/90 font-medium mb-6 sm:mb-8 px-2">
                        &quot;Innovative Strategies, Lasting Impressions&quot;
                    </p>

                    <button
                        onClick={() => setShowPopup(true)}
                        className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white rounded-xl sm:rounded-[15px] text-base sm:text-xl font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-2 mb-6 sm:mb-8"
                        style={{ background: "linear-gradient(128deg, #00549B 21%, #F04F25 100%)" }}
                    >
                        Say Hello
                        <span className="flex items-center justify-center">
                            <img src="/images/video-reel/icons/smile.svg" alt="Smile" className="w-5 h-5 sm:w-7 sm:h-7 brightness-0 invert" />
                        </span>
                    </button>

                    <ContactPopup showPopup={showPopup} setShowPopup={setShowPopup} />

                    <div className="flex -space-x-3 mb-4">
                        {avatarImages.map((src, i) => (
                            <div
                                key={i}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-slate-950 relative"
                            >
                                <Image src={src} alt={`Client ${i + 1}`} fill sizes="40px" className="object-cover" />
                            </div>
                        ))}
                    </div>

                    <span className="text-base sm:text-lg font-bold text-white">4.9/5 Star Rating</span>
                    <span className="text-xs sm:text-sm text-sky-400 hover:underline cursor-pointer">
                        Based on Google Review
                    </span>
                </div>
            </section>

            {/* 2. ADVERTISEMENT — USE CASES */}
            <section className="py-16 sm:py-20 md:py-24 bg-slate-950 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                        <span className="text-base sm:text-lg md:text-xl font-medium text-sky-400">
                            Advertisement
                        </span>
                        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-2 sm:mt-3">
                            Video Editing Services for Your Business
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch md:items-center">
                        {useCases.map((uc, idx) => {
                            const isCenter = idx === 1;
                            const Icon = uc.icon;

                            return (
                                <div
                                    key={idx}
                                    className={`
                            group relative flex flex-col items-center text-center gap-3 sm:gap-4
                            p-6 sm:p-8 rounded-2xl sm:rounded-3xl cursor-pointer
                            border-4 sm:border-[5px] border-white
                            transition-all duration-300 ease-out
                            hover:scale-95
                            ${isCenter
                                            ? "bg-orange-600 hover:bg-blue-600 md:py-10 lg:py-14"
                                            : "bg-blue-600 hover:bg-orange-600"
                                        }
                        `}
                                >
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center relative">
                                        <Image
                                            src={`/images/video-reel/icons/${idx + 1}.svg`}
                                            alt={uc.title}
                                            fill
                                            sizes="56px"
                                            className="object-contain brightness-0 invert"
                                        />
                                    </div>

                                    <h3 className="font-bold text-lg sm:text-xl text-white">
                                        {uc.title}
                                    </h3>

                                    <p className="text-sm sm:text-[17px] text-white/90 leading-relaxed">
                                        {uc.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 3. CAPTIVATING AD VIDEOS */}
            <section className="py-16 sm:py-20 md:py-24 bg-slate-950 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
                        <div className="flex flex-col items-start order-2 lg:order-1">
                            <span className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3 sm:mb-4">
                                At Sanyog Media Concepts
                            </span>
                            <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white leading-tight mb-4 sm:mb-6">
                                Captivating Ad Videos, Expertly Edited to Sell Your Story
                            </h2>
                            <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
                                Bring your brand to life with dynamic, professionally edited videos tailored to your goals. Whether you&apos;re looking to engage audiences on social media, showcase products and services, or highlight major events, we deliver high-impact visuals that make your message stand out.
                            </p>
                            <Link
                                href="/about-us"
                                className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm font-bold text-white border border-slate-700 hover:border-white transition-all bg-[#0069C2] backdrop-blur-sm w-fit"
                            >
                                Know More About Us
                            </Link>
                        </div>

                        <div className="relative aspect-square rounded-2xl sm:rounded-3xl overflow-hidden order-1 lg:order-2 w-full">
                            <Image
                                src="/images/video-reel/1.png"
                                alt="Reels / Video Editing"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. LET US SHOW YOU — EXPLAINER VIDEO */}
            <section className="py-16 sm:py-20 md:py-24 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                            Let Us Show You
                        </span>
                        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-3 sm:mt-4">
                            How We Make Things Effortless For You
                        </h2>
                    </div>

                    {/* video now sits in its own relative, aspect-ratio-controlled box —
                        previously the play/pause overlay was `absolute inset-0` with no
                        positioned parent, so it covered the entire page below this point
                        instead of just the video, and the video itself had no defined
                        height on mobile */}
                    <div
                        className="group relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-10 cursor-pointer"
                        onClick={toggleExplainerVideo}
                    >
                        <video
                            ref={explainerVideoRef}
                            src="/images/video-reel/Untitled-design-3-1.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                                {explainerPlaying ? (
                                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950" fill="currentColor" />
                                ) : (
                                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 ml-1" fill="currentColor" />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10">
                        {/* Left - Description */}
                        <div className="flex-1 text-center md:text-center">
                            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed">
                                Share your raw footage — whether from a mobile phone or DSLR — and leave the rest to us. While you relax or focus on what matters most, we handle the editing, polishing every frame to perfection. The result? A high-quality, brand-focused video that makes a powerful impact on the audience that matters most to you.
                            </p>
                        </div>

                        {/* Right - Pricing Card */}
                        <div className="border border-slate-700 flex flex-col items-center gap-3 sm:gap-4 px-8 sm:px-10 py-6 sm:py-8 rounded-2xl bg-slate-900/50 shrink-0 w-full md:w-auto md:translate-y-10">
                            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                                Reels &amp; Video Editing
                            </span>

                            <span className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-white whitespace-nowrap">
                                Starts From ₹2099
                            </span>

                            <Link
                                href="#contact"
                                className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 w-full md:w-fit"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. TESTIMONIALS */}
            <Testimonials />

            {/* 6. PORTFOLIO — HOVER TO PLAY VIDEO GRID */}
            <section id="reelportfolio" className="py-16 sm:py-20 md:py-24 bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="relative text-center max-w-6xl w-full mx-auto mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl border-4 sm:border-[5px] border-teal-800/60 py-8 sm:py-10 px-4 sm:px-6 md:px-10 overflow-hidden">
                        <span
                            aria-hidden="true"
                            className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-[2.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] font-extrabold tracking-widest text-white/[0.05] whitespace-nowrap"
                        >
                            PORTFOLIO
                        </span>
                        <div className="relative z-10">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                                Portfolio
                            </span>
                            <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mt-3 sm:mt-4 mb-3 sm:mb-4 leading-tight">
                                From Product Promos To Brand Campaigns
                            </h2>
                            <p className="text-cyan-400 font-semibold text-xs sm:text-sm md:text-base">
                                Here&apos;s how we craft videos that convert
                            </p>
                        </div>
                    </div>

                    {/* Full-width justified gallery — cards grow to fill the row, height stays fixed */}
                    <div className="flex flex-wrap gap-3 sm:gap-4">
                        {portfolioVideos.map((item, i) => (
                            <PortfolioVideoCard
                                key={i}
                                src={item.src}
                                index={i}
                                ratio={item.ratio}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <Priorities />

            {/* 8. FAQ — FULL WIDTH GRADIENT ACCORDION */}
            <section className="py-16 sm:py-20 md:py-24 bg-slate-900 relative">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16 flex flex-col items-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/70 flex items-center justify-center mb-4 sm:mb-6">
                        <MessageCircleQuestion className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <h2 className="font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">
                        Frequently Asked Questions
                    </h2>
                    <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                        <span className="w-10 h-1 rounded-full bg-sky-500" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-400">
                        Answer To Our Most Frequently Asked Questions are just one Click Away.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-3">
                    {faqs.map((faq, idx) => {
                        const isOpen = activeFaq === idx;
                        return (
                            <div
                                key={idx}
                                className={`w-full rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? "border border-white" : "border border-transparent"
                                    }`}
                                style={{
                                    background: " #1487c9",
                                }}
                            >
                                <button
                                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                                    className="w-full px-4 sm:px-5 py-4 flex items-center gap-3 sm:gap-4 text-left"
                                >
                                    <ChevronDown
                                        className={`w-5 h-5 text-white shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                    <span className="font-bold text-sm md:text-base text-white">
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
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 sm:px-6 md:px-10 pb-6 pl-12 sm:pl-14 md:pl-[4.75rem] text-sm text-white/85 leading-relaxed">
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