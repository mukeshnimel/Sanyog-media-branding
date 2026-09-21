"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
// import BlindsRotatingText from "...";  // 👈 apni file me jaha se pehle import tha vahi path rakho

/**
 * Agar ye 2 arrays aapki file me pehle se hain to inhe delete kar do.
 */
const rotatingWords = ["Poster Design", "Logo Design", "Brand Identity", "Social Media Creatives", "Packaging Design"];
const avatarSeeds = [12, 33, 47, 5, 68, 9, 15];

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

/**
 * SLIDES — apni images yahan replace karo (public/images/graphic-design/ me daalo).
 * Kam se kam 5 slides rakho taaki 5 cards dikhen (7 best lagta hai).
 */
const slides = [
    { title: "Brand Identity", tagline: "A logo is the start, a brand is the story", image: "/images/home/graphics-design/15.jpg" },
    { title: "Logo Design", tagline: "Simple marks that people remember", image: "/images/home/graphics-design/16.jpg" },
    { title: "Social Media Creatives", tagline: "Scroll-stopping posts, made for every feed", image: "/images/home/graphics-design/17.jpg" },
    { title: "Packaging Design", tagline: "Shelf appeal that sells before it's opened", image: "/images/home/graphics-design/18.jpg" },
    { title: "Print & Brochures", tagline: "Made to be held, kept and shared", image: "/images/home/graphics-design/19.jpg" },
    { title: "Illustration", tagline: "Custom artwork with your brand's voice", image: "/images/home/graphics-design/20.jpeg" },
    { title: "Motion Graphics", tagline: "Design that moves, and moves people", image: "/images/home/graphics-design/21.jpeg" },
];

const VISIBLE_RANGE = 3;      // center ke dono side kitne cards dikhane hain
const AUTOPLAY_MS = 4200;     // har slide kitni der rukegi
const MOVE_MS = 1400;         // slide ka move kitna slow/cinematic ho

export default function GraphicDesignHero() {
    const [active, setActive] = useState(0);
    const total = slides.length;

    // Apne aap chalne wala slider (koi arrow nahi)
    useEffect(() => {
        const id = setInterval(() => setActive((p) => (p + 1) % total), AUTOPLAY_MS);
        return () => clearInterval(id);
    }, [total]);

    // Circular offset: active card = 0, left = negative, right = positive
    const getOffset = (i) => {
        const half = Math.floor(total / 2);
        return ((i - active + total + half) % total) - half;
    };

    return (
        <section
            className="relative overflow-hidden bg-dark-bg flex items-center
    min-h-[620px] sm:min-h-[660px] lg:min-h-[720px] xl:min-h-[780px] 4xl:min-h-[950px]
    py-10 sm:py-14 4xl:py-24"
            aria-label="Graphic design hero"
        >
            <style>{`
                @keyframes hc-title-in {
                    from { opacity: 0; transform: translateY(14px); filter: blur(8px); }
                    to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
                }
                @keyframes hc-fade-up {
                    from { opacity: 0; transform: translateY(8px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes hc-progress {
                    from { transform: scaleX(0); }
                    to   { transform: scaleX(1); }
                }
                @keyframes hc-fog-a {
                    0%, 100% { transform: translateX(-4%) scale(1); }
                    50%      { transform: translateX(4%)  scale(1.08); }
                }
                @keyframes hc-fog-b {
                    0%, 100% { transform: translateX(5%)  scale(1.05); }
                    50%      { transform: translateX(-5%) scale(1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .hc-anim, .hc-fog { animation: none !important; }
                    .hc-card, .hc-kb { transition-duration: 0.01ms !important; }
                }
            `}</style>

            {/* =====================================================
                LAYER 1 — SLIDER (poori section ke BACKGROUND me, bilkul center)
            ===================================================== */}
            <div className="absolute inset-0 z-0" aria-hidden="true" style={{ perspective: "1500px" }}>
                <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
                    {slides.map((slide, i) => {
                        const offset = getOffset(i);
                        const abs = Math.abs(offset);
                        const isActive = offset === 0;
                        const hidden = abs > VISIBLE_RANGE;

                        const scale = isActive ? 1 : abs === 1 ? 0.82 : abs === 2 ? 0.66 : 0.52;
                        const tx = offset * 92;      // % of card width
                        const tz = -abs * 160;       // depth
                        const ry = -offset * 9;      // slight tilt
                        const brightness = isActive ? 0.9 : abs === 1 ? 0.55 : abs === 2 ? 0.35 : 0.25;

                        return (
                            <div
                                key={slide.title}
                                className="hc-card absolute left-1/2 top-1/2 overflow-hidden rounded-sm shadow-2xl shadow-black/70
                                           w-[190px] h-[320px] sm:w-[240px] sm:h-[400px] md:w-[270px] md:h-[450px] lg:w-[300px] lg:h-[510px] xl:w-[340px] xl:h-[570px] 4xl:w-[430px] 4xl:h-[720px]"
                                style={{
                                    transform: `translate(-50%, -50%) translateX(${tx}%) translateZ(${tz}px) rotateY(${ry}deg) scale(${scale})`,
                                    opacity: hidden ? 0 : 1,
                                    zIndex: 10 - abs,
                                    filter: `brightness(${brightness})`,
                                    transition: `transform ${MOVE_MS}ms cubic-bezier(0.65, 0, 0.35, 1), opacity ${MOVE_MS * 0.7}ms ease, filter ${MOVE_MS}ms ease`,
                                }}
                            >
                                {/* Ken Burns: active card par slow zoom */}
                                <div
                                    className="hc-kb absolute inset-0"
                                    style={{
                                        transform: isActive ? "scale(1.14)" : "scale(1)",
                                        transition: `transform ${AUTOPLAY_MS + MOVE_MS}ms linear`,
                                    }}
                                >
                                    <Image
                                        src={slide.image}
                                        alt=""
                                        fill
                                        sizes="(max-width: 640px) 240px, 430px"
                                        unoptimized={slide.image.endsWith(".gif")}
                                        className="object-cover"
                                        draggable={false}
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* =====================================================
                LAYER 2 — Dark overlay + glow + dots (text readable rahe)
            ===================================================== */}
            <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
                {/* poori slider halka dim */}
                <div className="absolute inset-0 bg-dark-bg/55" />
                {/* center me extra dark glow — text ke peeche, taaki content clear padhe */}
                <div className="absolute left-1/2 top-1/2 h-[85%] w-[90%] lg:w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-dark-bg/75 blur-3xl" />
                {/* top + bottom cinematic fade */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-dark-bg to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark-bg to-transparent" />
                {/* glow */}
                <div className="absolute -top-24 left-1/4 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full bg-indigo-600/20 blur-3xl" />
                {/* dotted grid (left side) */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(rgba(129,140,248,0.30) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                        WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                        maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
                    }}
                />
                {/* fog */}
                <div className="absolute inset-x-0 bottom-0 h-1/3">
                    <div
                        className="hc-fog absolute -bottom-10 -left-[10%] h-56 w-[70%] rounded-full bg-stone-400/20 blur-3xl"
                        style={{ animation: "hc-fog-a 14s ease-in-out infinite" }}
                    />
                    <div
                        className="hc-fog absolute -bottom-16 -right-[10%] h-64 w-[65%] rounded-full bg-stone-500/20 blur-3xl"
                        style={{ animation: "hc-fog-b 18s ease-in-out infinite" }}
                    />
                </div>
            </div>

            {/* =====================================================
                LAYER 3 — CONTENT (aapka original, center me, slider ke upar)
            ===================================================== */}
            <div className="relative z-20 w-full max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24">
                <div className="mx-auto flex flex-col items-center text-center max-w-2xl xl:max-w-3xl 2xl:max-w-4xl 4xl:max-w-5xl">

                    <p className="font-nunito text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 4xl:text-5xl italic text-white/90 font-medium">
                        Transforming Brands with Design
                    </p>

                    <span className="font-alata text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl 4xl:text-9xl font-extrabold text-sky-400 whitespace-nowrap">
                        Graphic Designs
                    </span>

                    <div className="font-nunito text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 4xl:text-5xl italic text-white/90 font-medium mt-3 sm:mt-4 mb-6 sm:mb-8 px-2">
                        <BlindsRotatingText words={rotatingWords} delay={1500} />
                    </div>

                    <p className="font-nunito text-base sm:text-lg md:text-2xl lg:text-2xl xl:text-2xl 4xl:text-3xl italic text-white/90 font-medium mb-6 sm:mb-8 px-2">
                        Sanyog Media Concepts&apos; graphic design expertise weaves stories that captivate, elevating your brand with artful visual solutions.
                    </p>

                    {/* Avatars */}
                    <div className="flex -space-x-3 mb-6">
                        {avatarSeeds.map((seed, i) => (
                            <div
                                key={i}
                                className="relative w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 rounded-full border-2 border-white overflow-hidden bg-slate-700"
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
                    <div className="flex flex-col items-center leading-tight mb-8">
                        <p className="font-nunito text-[18px] sm:text-[20px] xl:text-[24px] 4xl:text-[30px] font-bold text-white">
                            4.9/5 Star Rating on Google
                        </p>

                        <span className="font-nunito text-[17px] sm:text-[19px] xl:text-[22px] 4xl:text-[27px] font-semibold text-sky-400">
                            Based on Google Review
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 xl:gap-5">

                        <a
                            href="#contact"
                            className="font-nunito px-7 py-3 xl:px-8 xl:py-3 4xl:px-10 4xl:py-4 rounded-[15px] text-base xl:text-lg 4xl:text-xl font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                        >
                            Connect With Us
                        </a>

                        <a
                            href="#smmport"
                            className="font-nunito px-7 py-3 xl:px-8 xl:py-3 4xl:px-10 4xl:py-4 rounded-[15px] text-base xl:text-lg 4xl:text-xl font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors text-center w-full sm:w-fit"
                        >
                            Portfolio
                        </a>

                    </div>
                </div>
            </div>

            {/* =====================================================
                Chhota caption (neeche center) — slide ka naam + progress line
            ===================================================== */}
            <div className="pointer-events-none absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 w-[240px] sm:w-[300px] 4xl:w-[380px] text-center">
                <div key={active}>
                    <p
                        className="hc-anim text-sm sm:text-base xl:text-lg 4xl:text-2xl font-bold uppercase tracking-wide text-white/80"
                        style={{ animation: "hc-title-in 1100ms cubic-bezier(0.22, 0.8, 0.22, 1) both" }}
                    >
                        {slides[active].title}
                    </p>
                    <p
                        className="hc-anim mt-1 text-xs sm:text-sm 4xl:text-base text-white/60"
                        style={{ animation: "hc-fade-up 900ms ease-out 250ms both" }}
                    >
                        {slides[active].tagline}
                    </p>
                </div>
                <div className="mt-3 h-px w-full bg-white/15 overflow-hidden">
                    <div
                        key={`bar-${active}`}
                        className="hc-anim h-full w-full origin-left bg-cyan-400"
                        style={{ animation: `hc-progress ${AUTOPLAY_MS}ms linear both` }}
                    />
                </div>
            </div>
        </section>
    );
}