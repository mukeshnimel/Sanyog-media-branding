"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";



const items = [
    { id: 1, src: "/images/home/logo-design-branding/1.jpg" },
    { id: 2, src: "/images/home/logo-design-branding/2.jpg" },
    { id: 3, src: "/images/home/logo-design-branding/3.jpg" },
    { id: 4, src: "/images/home/logo-design-branding/4.png" },
    { id: 5, src: "/images/home/logo-design-branding/5.jpg" },
    { id: 6, src: "/images/home/logo-design-branding/6.png" },
    { id: 7, src: "/images/home/logo-design-branding/7.jpg" },
    { id: 8, src: "/images/home/logo-design-branding/8.png" },
    { id: 9, src: "/images/home/logo-design-branding/9.jpg" },
    { id: 10, src: "/images/home/logo-design-branding/10.jpg" },
];

const MAX_ROTATE = 42;   // degrees at the far edge of the viewport
const MAX_DEPTH = 220;   // px pushed back (translateZ) at the far edge
const MIN_SCALE = 0.86;  // scale at the far edge

function CoverflowCard({ item, viewportRef }) {
    const cardRef = useRef(null);
    const rotateY = useMotionValue(0);
    const z = useMotionValue(0);
    const scale = useMotionValue(1);

    useAnimationFrame(() => {
        const card = cardRef.current;
        const viewport = viewportRef.current;
        if (!card || !viewport) return;

        const viewportRect = viewport.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const viewportCenter = viewportRect.left + viewportRect.width / 2;
        const cardCenter = cardRect.left + cardRect.width / 2;

        // -1 (far left edge) .. 0 (dead centre) .. 1 (far right edge)
        const ratio = Math.max(
            -1,
            Math.min(1, (cardCenter - viewportCenter) / (viewportRect.width / 2)
            ));

        // cards left of centre lean their near edge toward the viewer on the
        // right side (positive rotateY); mirror on the right -> concave wall
        rotateY.set(ratio * -MAX_ROTATE);
        z.set(-Math.abs(ratio) * MAX_DEPTH);
        scale.set(1 - Math.abs(ratio) * (1 - MIN_SCALE));
    });

    return (
        <div ref={cardRef} className="flex flex-col items-center shrink-0" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
                style={{ rotateY, z, scale }}
                className="relative w-[220px] md:w-[280px] 3xl:w-[340px] 4xl:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_55px_rgba(0,0,0,0.55)]"
            >
                <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 768px) 220px, (max-width: 1536px) 280px, (max-width: 2560px) 340px, 400px"
                />
            </motion.div>

            {/* <p className="font-nunito text-[13px] md:text-[14px] 3xl:text-[15px] 4xl:text-[16px] font-bold text-sky-400 mt-4">
                {item.tag}
            </p>
            <p className="font-nunito text-[13px] md:text-[14px] 3xl:text-[15px] 4xl:text-[16px] text-slate-350 text-center">
                {item.label}
            </p> */}
        </div>
    );
}

export default function PortfolioShowreel() {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    // Number of times the base `items` array is repeated to build the track.
    // Starts at 2 (minimum needed to measure one set's width) and grows
    // dynamically until the track is wider than the viewport, so the loop
    // never "runs out" of cards before it resets.
    const [repeatCount, setRepeatCount] = useState(3);
    const track = Array.from({ length: repeatCount }, () => items).flat();

    const PX_PER_SECOND = 60; // constant scroll speed regardless of card size/count
    const loopPxRef = useRef(0);
    const x = useMotionValue(0);
    const isHovering = useRef(false);

    useEffect(() => {
        const el = trackRef.current;
        const viewport = viewportRef.current;
        if (!el || !viewport) return;

        function measure() {
            if (el.children.length < items.length * 2) return;

            const firstCard = el.children[0];
            const secondSetFirstCard = el.children[items.length];

            if (!firstCard || !secondSetFirstCard) return;

            const firstRect = firstCard.getBoundingClientRect();
            const secondRect = secondSetFirstCard.getBoundingClientRect();

            // Distance between the first card of set 1
            // and the first card of set 2.
            const singleSetWidth = secondRect.left - firstRect.left;

            if (!singleSetWidth) return;

            loopPxRef.current = singleSetWidth;

            // Keep x inside exactly one loop.
            let currentX = x.get();

            if (currentX <= -singleSetWidth) {
                currentX = currentX % singleSetWidth;
                x.set(currentX);
            }

            const needed =
                Math.ceil(viewport.clientWidth / singleSetWidth) + 3;

            setRepeatCount((prev) =>
                needed > prev ? needed : prev
            );
        }

        measure();

        // ResizeObserver catches layout shifts from images finishing load,
        // not just window resizes, so the measured width stays accurate.
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [repeatCount, x]);

    // Drive the marquee manually and wrap with modulo instead of resetting
    // to 0 on a fixed keyframe loop — this removes the visible "snap back
    // to card #1" gap that framer's discrete repeat keyframes caused.
    useAnimationFrame((t, delta) => {
        const loopPx = loopPxRef.current;

        if (!loopPx || isHovering.current) return;

        const moveBy = (PX_PER_SECOND * delta) / 1000;

        let next = x.get() - moveBy;

        // Seamless infinite loop
        if (next <= -loopPx) {
            next += loopPx;
        }

        x.set(next);
    });

    return (
        <section className="relative  bg-dark-bg overflow-hidden">
            {/* same ambient glow + grid as the hero */}
            <div className="absolute top-1/3 left-1/4 w-96 h-96 3xl:w-[32rem] 3xl:h-[32rem] 4xl:w-[40rem] 4xl:h-[40rem] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            <div className="max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-6 lg:px-10 xl:px-16 4xl:px-24 relative z-10 w-full">

                {/* Heading block */}
                <div className="flex flex-col items-center text-center mb-16 3xl:mb-20">
                    <p className="font-nunito text-[20px] md:text-[24px] 3xl:text-[28px] font-bold text-sky-400 mb-3">
                        Unveil Your Brand's Identity with Captivating
                    </p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="font-alata font-bold text-xl sm:text-4xl md:text-5xl xl:text-7xl 3xl:text-7xl 4xl:text-8xl leading-tight tracking-tight text-white whitespace-nowrap mb-4"
                    >
                        <span>Logo Design </span>
                        <span className="text-sky-400">&amp; Brand Identity</span>
                    </motion.h2>

                    <p className="font-nunito text-[15px] sm:text-[16px] md:text-[24px] 3xl:text-[26px] 4xl:text-[30px] text-slate-350 max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl mb-8">
                        Top-Rated Creative Branding Agency for Logo, Web &amp; Design Solutions.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <a
                            href="#contact"
                            className="font-nunito flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/15 text-sm xl:text-base font-bold text-white hover:border-sky-400 transition-colors"
                        >
                            Connect With Us
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-500 text-white">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                                </svg>
                            </span>
                        </a>

                        <a
                            href="#smmport"
                            className="font-nunito flex items-center gap-2 px-5 py-3 rounded-full bg-sky-500 text-white text-sm font-bold hover:bg-sky-600 transition-colors"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M7 17L17 7M17 7H8M17 7V16" />
                            </svg>
                            Portfolio
                        </a>
                    </div>
                </div>

                {/* Auto-scrolling 3D coverflow strip */}
                <div ref={viewportRef} className="relative 3xl:[perspective:1800px] 4xl:[perspective:2200px]" style={{ perspective: "1400px" }}>
                    {/* fade edges */}
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-dark-bg to-transparent z-10" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-dark-bg to-transparent z-10" /> */}

                    <motion.div
                        ref={trackRef}
                        className="flex gap-8 md:gap-10 3xl:gap-12 4xl:gap-14 w-max"
                        style={{ x, transformStyle: "preserve-3d" }}
                        onHoverStart={() => (isHovering.current = true)}
                        onHoverEnd={() => (isHovering.current = false)}
                    >
                        {track.map((item, i) => (
                            <CoverflowCard key={`${item.id}-${i}`} item={item} viewportRef={viewportRef} />
                        ))}
                    </motion.div>
                </div>

                {/* Bottom controls */}
                <div className="flex items-center justify-between mt-14 3xl:mt-16">


                    {/* <button
                        aria-label="Refresh showreel"
                        className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-sky-400 transition-colors"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                            <path d="M21 3v6h-6" />
                        </svg>
                    </button> */}
                </div>

            </div>
        </section>
    );
}