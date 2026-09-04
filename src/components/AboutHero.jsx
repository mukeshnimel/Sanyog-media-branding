"use client";

import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Smile } from "lucide-react";
import ContactPopup from "./Contactpopup";


const bgImages = [
    "images/about/1.png",
    "images/about/2.png",
    "images/about/3.png",
];

const ROWS = 4;
const COLS = 8;

// Real dimensions of the source images
const IMG_W = 1600;
const IMG_H = 1007;

export default function AboutHero() {
    const [index, setIndex] = useState(0);
    const sectionRef = useRef(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % bgImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Measure the actual rendered size of the hero section so we can
    // scale the image like "object-fit: cover" — never stretched,
    // just cropped (from the bottom) to fit whatever height we give it.
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });
        observer.observe(el);
        return () => observer.disconnect();
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

    const { width, height } = size;
    // Cover-scale: image is scaled up just enough to fully fill the box
    // (never less, so no gaps; never distorted, since ratio is preserved).
    const scale = width && height ? Math.max(width / IMG_W, height / IMG_H) : 0;
    const displayW = IMG_W * scale;
    const displayH = IMG_H * scale;
    const tileW = width / COLS;
    const tileH = height / ROWS;
    const offsetX = (displayW - width) / 2; // center the crop horizontally
    const offsetY = 0; // pinned to top -> any extra height is cropped off the bottom
    const [showPopup, setShowPopup] = useState(false);
    return (
        <section
            ref={sectionRef}
            className="relative h-[100vh] min-h-[440px] max-h-[640px] flex items-center overflow-hidden bg-dark-bg border-b border-glass-border"
        >
            {/* Shattering tile background slider */}
            <div
                className="absolute inset-0 grid"
                style={{
                    gridTemplateColumns: `repeat(${COLS}, 1fr)`,
                    gridTemplateRows: `repeat(${ROWS}, 1fr)`,
                }}
            >
                {width > 0 && height > 0 && (
                    <AnimatePresence>
                        {tiles.map((tile) => {
                            const bgPosX = -(tile.col * tileW - offsetX);
                            const bgPosY = -(tile.row * tileH - offsetY);
                            return (
                                <motion.div
                                    key={`${index}-${tile.id}`}
                                    className="w-full h-full bg-no-repeat"
                                    style={{
                                        gridColumn: tile.col + 1,
                                        gridRow: tile.row + 1,
                                        backgroundImage: `url(${bgImages[index]})`,
                                        backgroundSize: `${displayW}px ${displayH}px`,
                                        backgroundPosition: `${bgPosX}px ${bgPosY}px`,
                                    }}
                                    initial={{ opacity: 0, scale: 0.4, x: tile.x, y: tile.y, rotate: tile.rotate }}
                                    animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                                    exit={{ opacity: 0, scale: 0.4, x: -tile.x, y: -tile.y, rotate: -tile.rotate }}
                                    transition={{ duration: 0.9, delay: tile.delay, ease: [0.22, 1, 0.36, 1] }}
                                />
                            );
                        })}
                    </AnimatePresence>
                )}
            </div>

            {/* Dark + color overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-950/20 via-transparent to-sky-950/30 pointer-events-none" />

            {/* Slide indicator dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {bgImages.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"
                            }`}
                        aria-label={`Show background ${i + 1}`}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center">

                <motion.span
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="block text-[clamp(20px,2.6vw,40px)] font-medium text-white/90 mb-2"
                >
                    Who We Are
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-display leading-tight text-white mb-2 text-center w-full"
                >
                    <span className="block text-[clamp(30px,5vw,60px)] mb-1">
                        We&apos;re a High-End
                    </span>

                    <span className="block text-[clamp(30px,5vw,60px)] text-center">
                        Designing &amp; Marketing Agency
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[clamp(12px,1.6vw,19px)] text-slate-200 mb-3 sm:mb-4 leading-relaxed text-center max-w-4xl"
                >
                    Trade Show Booth Design | Branding | Website Design | Social Media
                    Marketing | Graphics Design
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-3 sm:mb-4 flex justify-center"
                >
                    <button
        onClick={() => setShowPopup(true)}
        className="px-8 py-3.5 border border-white rounded-[15px] text-xl font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-2 mb-8"
        style={{ background: "linear-gradient(128deg, #00549B 21%, #F04F25 100%)" }}
      >
        Say Hello
        <span className="flex items-center justify-center">
          <img src="/images/video-reel/icons/smile.svg" alt="Smile" className="w-7 h-7 brightness-0 invert" />
        </span>
      </button>

      <ContactPopup showPopup={showPopup} setShowPopup={setShowPopup} />
    
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-[clamp(20px,1.8vw,35px)] font-bold text-white flex flex-wrap items-center justify-center gap-1.5 text-center"
                >
                    <span>For &ldquo;Exhibition Stall Design &amp; Fabrication&rdquo;</span>

                    <a
                        href="https://www.sanyogmedia.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 hover:underline inline-flex items-center gap-1 group"
                    >
                        Visit
                        <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    <span>www.sanyogmedia.com</span>
                </motion.p>

            </div>
        </section>
    );
}