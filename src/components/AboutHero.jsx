"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ContactPopup from "./Contactpopup";

const bgImages = [
    "/images/about/1.png",
    "/images/about/2.png",
    "/images/about/3.png",
];

const ROWS = 4;
const COLS = 8;

export default function AboutHero() {
    const [index, setIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % bgImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Stable random "shatter" offsets for each tile, computed once
    const tiles = useMemo(
        () =>
            Array.from({ length: ROWS * COLS }).map((_, i) => {
                const row = Math.floor(i / COLS);
                const col = i % COLS;
                return {
                    id: i,
                    row,
                    col,
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 300,
                    rotate: (Math.random() - 0.5) * 200,
                    delay: Math.random() * 0.35,
                };
            }),
        []
    );

    return (
        <section className="relative h-[100dvh] sm:h-[100vh] min-h-[520px] sm:min-h-[480px] max-h-[640px] 4xl:max-h-[820px] flex items-center overflow-hidden bg-dark-bg border-b border-glass-border">

            {/* Shattering tile background slider — pure CSS cover + clip-path, no JS measurement needed */}
            <div className="absolute inset-0">
                <AnimatePresence>
                    {tiles.map((tile) => {
                        const top = (tile.row * 100) / ROWS;
                        const left = (tile.col * 100) / COLS;
                        const right = 100 - ((tile.col + 1) * 100) / COLS;
                        const bottom = 100 - ((tile.row + 1) * 100) / ROWS;
                        return (
                            <motion.div
                                key={`${index}-${tile.id}`}
                                className="absolute inset-0"
                                style={{
                                    backgroundImage: `url(${bgImages[index]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "top center",
                                    backgroundRepeat: "no-repeat",
                                    clipPath: `inset(${top}% ${right}% ${bottom}% ${left}%)`,
                                }}
                                initial={{ opacity: 0, scale: 0.4, x: tile.x, y: tile.y, rotate: tile.rotate }}
                                animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.4, x: -tile.x, y: -tile.y, rotate: -tile.rotate }}
                                transition={{ duration: 0.9, delay: tile.delay, ease: [0.22, 1, 0.36, 1] }}
                            />
                        );
                    })}
                </AnimatePresence>
            </div>

            {/* Dark + color overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/20 via-transparent to-sky-950/30 pointer-events-none" />

            {/* Slide indicator dots */}
            <div className="absolute bottom-4 sm:bottom-5 4xl:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 4xl:gap-3 z-20">
                {bgImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 4xl:h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 4xl:w-9 bg-white" : "w-1.5 4xl:w-2 bg-white/40"
                            }`}
                        aria-label={`Show background ${i + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl 3xl:max-w-7xl 4xl:max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 4xl:px-16 text-center flex flex-col items-center justify-center">

                <motion.span
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block text-[clamp(16px,2.6vw,52px)] font-medium text-white/90 mb-1.5 sm:mb-2"
                >
                    Who We Are
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display leading-tight text-white mb-2 text-center w-full"
                >
                    <span className="block text-[clamp(24px,5vw,78px)] mb-1">
                        We&apos;re a High-End
                    </span>
                    <span className="block text-[clamp(22px,5vw,78px)] text-center">
                        Designing &amp; Marketing Agency
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[clamp(11px,1.6vw,25px)] text-slate-200 mb-3 sm:mb-4 leading-relaxed text-center max-w-4xl 4xl:max-w-5xl px-2"
                >
                    Trade Show Booth Design | Branding | Website Design | Social Media
                    Marketing | Graphics Design
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-4 sm:mb-5 4xl:mb-7 flex justify-center"
                >
                    <button
                        onClick={() => setShowPopup(true)}
                        className="px-5 sm:px-8 4xl:px-11 py-2.5 sm:py-3.5 4xl:py-5 border border-white rounded-[15px] text-sm sm:text-xl 4xl:text-2xl font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-1.5 sm:gap-2 4xl:gap-3"
                        style={{ background: "linear-gradient(128deg, #00549B 21%, #F04F25 100%)" }}
                    >
                        Say Hello
                        <span className="flex items-center justify-center">
                            <img src="/images/video-reel/icons/smile.svg" alt="Smile" className="w-4 h-4 sm:w-7 sm:h-7 4xl:w-9 4xl:h-9 brightness-0 invert" />
                        </span>
                    </button>

                    <ContactPopup showPopup={showPopup} setShowPopup={setShowPopup} />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[clamp(14px,1.8vw,44px)] font-bold text-white flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1 sm:gap-1.5 4xl:gap-2 text-center"
                >
                    <span>For &ldquo;Exhibition Stall Design &amp; Fabrication&rdquo;</span>
                    <span className="flex items-center gap-1.5 4xl:gap-2">

                        <a href="https://www.sanyogmedia.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400 hover:underline inline-flex items-center gap-1 group"
                        >
                            Visit
                            <ExternalLink className="w-3 h-3 4xl:w-4 4xl:h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                        <span>www.sanyogmedia.com</span>
                    </span>
                </motion.p>

            </div>
        </section>
    );
}