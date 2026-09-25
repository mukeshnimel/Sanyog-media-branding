"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useTransform,
} from "framer-motion";

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

/* ============ CURVE SETTINGS (yahin se feel tweak karo) ============ */
const MAX_ROTATE = 58;    // deg: side cards kitne ghume (cylinder wrap feel)
const MAX_DEPTH = 420;    // px: edges kitne peeche jayein (arc ki gehraai)
const CURVE_Y = 90;       // px: edges neeche jhukein (smile / bowl curve)
const TILT_Z = 7;         // deg: side cards ka halka roll (rainbow arc)
const CENTER_BOOST = 0.1; // center card ka extra zoom
const EDGE_SCALE_DROP = 0.24;
const RATIO_CLAMP = 1.5;  // viewport ke bahar bhi curve continue rahe
const PX_PER_SECOND = 60;
const EDGE_BUFFER = 1;

function CurvedCard({ item, index, x, centersRef, viewportWidthRef }) {
    // ratio: -1.5 (far left) .. 0 (centre) .. 1.5 (far right)
    // Directly from `x` => same frame as marquee, loop wrap me glitch nahi.
    const ratio = useTransform(x, (latest) => {
        const center = centersRef.current[index];
        const vw = viewportWidthRef.current;
        if (center === undefined || !vw) return 0;
        const r = (center + latest - vw / 2) / (vw / 2);
        return Math.max(-RATIO_CLAMP, Math.min(RATIO_CLAMP, r));
    });

    // Cylinder wrap: side cards centre ki taraf face karte hain
    const rotateY = useTransform(ratio, (r) => r * -MAX_ROTATE);
    // Parabolic arc: |r|^2 se edges peeche + neeche
    const z = useTransform(ratio, (r) => -(r * r) * MAX_DEPTH);
    const y = useTransform(ratio, (r) => r * r * CURVE_Y);
    const rotateZ = useTransform(ratio, (r) => r * TILT_Z);
    const scale = useTransform(ratio, (r) =>
        Math.max(0.6, 1 + CENTER_BOOST - Math.abs(r) * EDGE_SCALE_DROP)
    );
    // Edges par fade + dim, center par bright
    const opacity = useTransform(ratio, (r) =>
        Math.max(0.15, 1 - Math.max(0, Math.abs(r) - 0.7) * 1.1)
    );
    const filter = useTransform(
        ratio,
        (r) => `brightness(${Math.max(0.45, 1 - Math.abs(r) * 0.35)})`
    );
    // Center card pe glow ring
    const boxShadow = useTransform(ratio, (r) => {
        const focus = Math.max(0, 1 - Math.abs(r) * 2.2);
        return `0 25px 55px rgba(0,0,0,0.55), 0 0 ${45 * focus}px rgba(56,189,248,${0.45 * focus})`;
    });



    return (
        <div
            className="flex flex-col items-center shrink-0"
            style={{ transformStyle: "preserve-3d" }}
        >
            <motion.div
                style={{ rotateY, rotateZ, y, z, scale, opacity, filter, boxShadow }}
                className="relative w-[220px] md:w-[280px] 3xl:w-[340px] 4xl:w-[400px] aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 will-change-transform"
            >
                <Image
                    src={item.src}
                    alt={`Logo design and branding work ${item.id}`}
                    fill
                    quality={95}
                    className="object-cover"
                    sizes="(max-width: 768px) 220px, (max-width: 1536px) 280px, (max-width: 2560px) 340px, 400px"
                />
                {/* glossy sheen for 3D glass feel */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/15 via-transparent to-black/25" />
            </motion.div>
        </div>
    );
}

export default function PortfolioShowreel() {
    const viewportRef = useRef(null);
    const trackRef = useRef(null);

    const [repeatCount, setRepeatCount] = useState(6);

    // Track = items ke repeatCount sets, koi head/tail dup nahi
    const track = Array.from({ length: repeatCount }, () => items).flat();

    const loopPxRef = useRef(0);   // ek set ki width
    const startPxRef = useRef(0);  // wrap window ki starting position (positive px)
    const centersRef = useRef([]);
    const viewportWidthRef = useRef(0);
    const x = useMotionValue(0);
    const isHovering = useRef(false);
    const initializedRef = useRef(false);

    /* ============ AUTO SCROLL ============
       p = track ke andar viewport-left ki position (positive).
       p hamesha [start, start + loop) me rahega, jo track ke beech me hai,
       isliye dono taraf cards ka buffer hamesha rehta hai. */
    useAnimationFrame((t, delta) => {
        if (isHovering.current) return;
        const loop = loopPxRef.current;
        if (!loop) return;

        const start = startPxRef.current;
        let p = -x.get() + (PX_PER_SECOND * delta) / 1000;
        p = start + ((((p - start) % loop) + loop) % loop);
        x.set(-p);
    });

    /* ============ MEASURE ============ */
    useEffect(() => {
        const el = trackRef.current;
        const viewport = viewportRef.current;
        if (!el || !viewport) return;

        function measure() {
            const kids = el.children;
            if (kids.length < items.length + 1) return;

            const trackBase = kids[0].offsetLeft;
            const setWidth = kids[items.length].offsetLeft - trackBase;
            if (!setWidth) return;

            const vw = viewport.clientWidth;
            const span = window.innerWidth * EDGE_BUFFER;

            loopPxRef.current = setWidth;
            viewportWidthRef.current = vw;
            centersRef.current = Array.from(
                kids,
                (k) => k.offsetLeft - trackBase + k.offsetWidth / 2
            );

            // Left buffer: viewport ke center se `span` px left tak cards hone chahiye
            const leftNeed = Math.max(0, span - vw / 2);
            const startSets = Math.max(1, Math.ceil(leftNeed / setWidth));
            startPxRef.current = startSets * setWidth;

            if (!initializedRef.current) {
                x.set(-startPxRef.current);
                initializedRef.current = true;
            }

            // Right buffer: wrap window ke end ke baad bhi `span` px cards chahiye
            const needed =
                Math.ceil((startPxRef.current + setWidth + vw / 2 + span) / setWidth) + 1;
            setRepeatCount((prev) => (needed > prev ? needed : prev));
        }

        measure();

        const ro = new ResizeObserver(measure);
        ro.observe(el);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, [repeatCount]);

    return (
        <section className="relative flex items-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20">
            {/* ===== HERO-STYLE ANIMATED BACKGROUND (FULL SECTION) ===== */}
            <div className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-3xl"
                    animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -top-24 -right-10 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
                    transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
                    animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                <motion.div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(rgba(56,189,248,0.5) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                    animate={{ backgroundPosition: ["0px 0px", "22px 22px"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-electric-blue/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 4xl:w-[32rem] 4xl:h-[32rem] rounded-full bg-neon-cyan/10 blur-[100px] sm:blur-[120px] pointer-events-none" />

            <div className="max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-6 lg:px-10 xl:px-16 4xl:px-24 relative z-10 w-full">

                {/* Heading block */}
                <div className="relative flex flex-col items-center text-center mb-16 3xl:mb-20">
                    <p className="font-nunito text-[18px] md:text-[24px] 3xl:text-[28px] font-bold text-sky-400 mb-3">
                        Unveil Your Brand's Identity with Captivating
                    </p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="font-alata font-bold text-2xl sm:text-4xl md:text-5xl xl:text-7xl 3xl:text-7xl 4xl:text-8xl leading-tight tracking-tight text-white whitespace-nowrap mb-4"
                    >
                        <span>Logo Design </span>
                        <span
                            className="text-sky-400"
                            style={{ textShadow: "0 0 30px rgba(56,189,248,0.55), 0 0 60px rgba(56,189,248,0.25)" }}
                        >
                            &amp; Brand Identity
                        </span>
                    </motion.h2>

                    <div className="relative w-40 md:w-64 h-px mb-6 bg-gradient-to-r from-transparent via-sky-400 to-transparent">
                        <div className="absolute inset-0 -top-[2px] h-[5px] bg-gradient-to-r from-transparent via-sky-400/70 to-transparent blur-[6px]" />
                    </div>

                    <p className="font-nunito text-[15px] sm:text-[16px] md:text-[24px] 3xl:text-[26px] 4xl:text-[30px] text-slate-350 max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl mb-8">
                        Top-Rated Creative Branding Agency for Logo, Web &amp; Design Solutions.
                    </p>

                    <div className="flex items-center justify-center gap-4 flex-wrap">
                        <a href="#contact"
                            className="font-nunito flex items-center gap-3 pl-6 pr-2 py-2 rounded-full border border-white/15 text-sm xl:text-base font-bold text-white hover:border-sky-400 hover:shadow-[0_0_25px_rgba(56,189,248,0.35)] transition-all"
                        >
                            Connect With Us
                            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sky-500 text-white">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 17L17 7M17 7H8M17 7V16" />
                                </svg>
                            </span>
                        </a>

                        <a href="#smmport"
                            className="font-nunito flex items-center gap-2 px-5 py-3 rounded-full bg-sky-500 text-white text-sm font-bold hover:bg-sky-600 shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.6)] transition-all"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H8M17 7V16" />
                            </svg>
                            Portfolio
                        </a>
                    </div>
                </div>

                {/* Curved 3D arc carousel */}
                <div
                    ref={viewportRef}
                    /* py-24: curve ke wajah se neeche jhukne wale cards clip na ho */
                    className="relative py-5 md:py-5 3xl:[perspective:1800px] 4xl:[perspective:2200px]"
                    style={{ perspective: "1200px", perspectiveOrigin: "50% 35%" }}
                >
                    <motion.div
                        ref={trackRef}
                        className="flex gap-8 md:gap-10 3xl:gap-12 4xl:gap-14 w-max"
                        style={{ x, transformStyle: "preserve-3d" }}
                        onHoverStart={() => (isHovering.current = true)}
                        onHoverEnd={() => (isHovering.current = false)}
                    >
                        {track.map((item, i) => (
                            <CurvedCard
                                key={`${item.id}-${i}`}
                                item={item}
                                index={i}
                                x={x}
                                centersRef={centersRef}
                                viewportWidthRef={viewportWidthRef}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}