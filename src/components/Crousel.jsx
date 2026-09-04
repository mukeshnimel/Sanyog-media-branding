"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "/images/screenshots/3-1.png",
    "/images/screenshots/2-1.png",
    "/images/screenshots/1-1.png",
];

const AUTO_SLIDE_MS = 4500;
const SWIPE_THRESHOLD = 60;

export default function PortfolioShowcase() {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef(null); // ← FIXED: removed TypeScript generics

    const prevIndex = (active - 1 + images.length) % images.length;
    const nextIndex = (active + 1) % images.length;

    const goNext = useCallback(() => {
        setDirection(1);
        setActive((i) => (i + 1) % images.length);
    }, []);

    const goPrev = useCallback(() => {
        setDirection(-1);
        setActive((i) => (i - 1 + images.length) % images.length);
    }, []);

    const goTo = useCallback(
        (index) => {
            setDirection(index > active ? 1 : -1);
            setActive(index);
        },
        [active]
    );

    // Auto-slide
    useEffect(() => {
        if (isPaused) return;
        timerRef.current = setInterval(() => {
            setDirection(1);
            setActive((i) => (i + 1) % images.length);
        }, AUTO_SLIDE_MS);
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPaused, active]);

    const handleDragEnd = (_e, info) => {
        if (info.offset.x < -SWIPE_THRESHOLD) {
            goNext();
        } else if (info.offset.x > SWIPE_THRESHOLD) {
            goPrev();
        }
    };

    const slideVariants = {
        enter: (dir) => ({
            opacity: 0,
            scale: 0.92,
            x: dir > 0 ? 60 : -60,
            rotateY: dir > 0 ? 10 : -10,
        }),
        center: {
            opacity: 1,
            scale: 1,
            x: 0,
            rotateY: 0,
        },
        exit: (dir) => ({
            opacity: 0,
            scale: 0.92,
            x: dir > 0 ? -60 : 60,
            rotateY: dir > 0 ? -10 : 10,
        }),
    };

    return (
        <section
            className="relative min-h-[650px] overflow-hidden bg-[#07051f] py-20"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* ambient glow behind the stage */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />

            {/* Main Carousel */}
            <div
                className="relative mx-auto flex h-[500px] w-full max-w-[1400px] items-center justify-center overflow-hidden"
                style={{ perspective: "1400px" }}
            >
                {/* LEFT PREVIEW (cropped, 3D tilt) */}
                <motion.button
                    type="button"
                    aria-label="Previous portfolio image"
                    onClick={goPrev}
                    className="absolute left-[-160px] top-1/2 z-10 hidden h-[320px] w-[480px] -translate-y-1/2 overflow-hidden rounded-sm lg:block"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{
                        opacity: 0.5,
                        scale: 0.86,
                        rotateY: 28,
                    }}
                    whileHover={{
                        opacity: 0.85,
                        scale: 0.89,
                        rotateY: 22,
                    }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                    <Image
                        src={images[prevIndex]}
                        alt="Previous portfolio"
                        fill
                        className="object-cover"
                        sizes="480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#07051f]/10 via-transparent to-[#07051f]/80" />
                </motion.button>

                {/* CENTER IMAGE (draggable) */}
                <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                        key={active}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.6}
                        onDragEnd={handleDragEnd}
                        className="relative z-20 h-[420px] w-[720px] max-w-[88vw] cursor-grab overflow-hidden rounded-sm shadow-2xl active:cursor-grabbing"
                        style={{ touchAction: "pan-y" }}
                    >
                        <Image
                            src={images[active]}
                            alt="Portfolio showcase"
                            fill
                            priority
                            draggable={false}
                            className="pointer-events-none object-cover"
                            sizes="720px"
                        />

                        {/* Dark gradient overlay, heavier at the base */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute inset-0 bg-black/10" />
                    </motion.div>
                </AnimatePresence>

                {/* RIGHT PREVIEW (cropped, 3D tilt) */}
                <motion.button
                    type="button"
                    aria-label="Next portfolio image"
                    onClick={goNext}
                    className="absolute right-[-160px] top-1/2 z-10 hidden h-[320px] w-[480px] -translate-y-1/2 overflow-hidden rounded-sm lg:block"
                    style={{ transformStyle: "preserve-3d" }}
                    initial={false}
                    animate={{
                        opacity: 0.5,
                        scale: 0.86,
                        rotateY: -28,
                    }}
                    whileHover={{
                        opacity: 0.85,
                        scale: 0.89,
                        rotateY: -22,
                    }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                >
                    <Image
                        src={images[nextIndex]}
                        alt="Next portfolio"
                        fill
                        className="object-cover"
                        sizes="480px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-[#07051f]/10 via-transparent to-[#07051f]/80" />
                </motion.button>
            </div>

            {/* DOTS */}
            <div className="relative z-30 mt-2 flex justify-center gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        aria-label={`Go to slide ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* CONTACT BUTTON */}
            <div className="relative z-30 mt-6 flex justify-center">
                <button
                    type="button"
                    className="rounded-full bg-white px-8 py-4 text-base font-bold text-[#111] transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                >
                    Contact Us
                </button>
            </div>
        </section>
    );
}