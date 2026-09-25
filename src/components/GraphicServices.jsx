"use client";

import { motion, MotionConfig } from "framer-motion";

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

/* Last item is the CTA bar, baaki sab proof-sheet tiles */
const tiles = services.filter((s) => s !== "All Graphic Designs");

/* ============ PRINT FORMAT DRAWINGS ============
   Har service ka apna asli shape / proportion (poster portrait, banner wide,
   card landscape...) taaki tile dekh kar hi pata chale kya milega. */
const P = "fill-slate-50"; // paper
const A = "fill-sky-500"; // brand ink
const L = "fill-slate-300"; // text lines
const S = "fill-slate-400"; // small details

const glyphs = {
    "Poster Design": (
        <>
            <rect x="41" y="8" width="38" height="74" rx="2" className={P} />
            <rect x="46" y="13" width="28" height="30" rx="1" className={A} />
            <rect x="46" y="49" width="28" height="4" className={L} />
            <rect x="46" y="57" width="20" height="3" className={L} />
            <rect x="46" y="70" width="12" height="6" rx="1" className={A} />
        </>
    ),
    "Banner Design": (
        <>
            <rect x="8" y="26" width="104" height="38" rx="2" className={P} />
            <rect x="8" y="26" width="40" height="38" className={A} />
            <rect x="56" y="36" width="44" height="5" className={L} />
            <rect x="56" y="46" width="28" height="4" className={L} />
        </>
    ),
    "Brochure Design": (
        <>
            <rect x="18" y="14" width="26" height="62" rx="1" className={P} />
            <rect x="47" y="14" width="26" height="62" className={P} />
            <rect x="76" y="14" width="26" height="62" rx="1" className={P} />
            <rect x="22" y="20" width="18" height="18" className={A} />
            <rect x="51" y="20" width="18" height="4" className={L} />
            <rect x="51" y="28" width="18" height="12" className={A} />
            <rect x="80" y="20" width="18" height="4" className={L} />
            <rect x="80" y="28" width="18" height="3" className={L} />
            <rect x="80" y="35" width="12" height="3" className={L} />
        </>
    ),
    "Flex Design": (
        <>
            <rect x="8" y="18" width="104" height="54" rx="2" className={P} />
            <rect x="20" y="30" width="50" height="8" className={A} />
            <rect x="20" y="44" width="70" height="4" className={L} />
            <rect x="20" y="52" width="40" height="4" className={L} />
            <circle cx="13" cy="23" r="2" className={S} />
            <circle cx="107" cy="23" r="2" className={S} />
            <circle cx="13" cy="67" r="2" className={S} />
            <circle cx="107" cy="67" r="2" className={S} />
        </>
    ),
    "Visiting Card Design": (
        <>
            <rect x="22" y="22" width="62" height="36" rx="2" className={A} transform="rotate(-8 53 40)" />
            <rect x="36" y="34" width="62" height="38" rx="2" className={P} />
            <circle cx="48" cy="46" r="5" className={A} />
            <rect x="58" y="42" width="32" height="4" className={L} />
            <rect x="58" y="50" width="22" height="3" className={L} />
            <rect x="44" y="61" width="46" height="3" className={L} />
        </>
    ),
    "Flyer Design": (
        <>
            <rect x="32" y="10" width="56" height="70" rx="2" className={P} />
            <rect x="32" y="10" width="56" height="22" className={A} />
            <rect x="38" y="38" width="44" height="4" className={L} />
            <rect x="38" y="46" width="44" height="3" className={L} />
            <rect x="38" y="53" width="30" height="3" className={L} />
            <circle cx="74" cy="68" r="6" className={A} />
        </>
    ),
    "T-Shirt Design": (
        <>
            <path d="M42 10 L54 8 Q60 18 66 8 L78 10 L102 26 L92 40 L82 34 V80 H38 V34 L28 40 L18 26 Z" className={P} />
            <rect x="52" y="40" width="16" height="12" rx="1" className={A} />
        </>
    ),
    "Sticker Design": (
        <>
            <circle cx="60" cy="45" r="32" className={P} />
            <circle cx="60" cy="45" r="22" className={A} />
            <path d="M82 72 L96 58 Q84 56 82 72 Z" className={S} />
        </>
    ),
    "Profile Design": (
        <>
            <rect x="30" y="10" width="60" height="70" rx="2" className={P} />
            <rect x="30" y="10" width="12" height="70" className={A} />
            <circle cx="66" cy="30" r="7" className={A} />
            <rect x="50" y="46" width="32" height="4" className={L} />
            <rect x="50" y="54" width="22" height="3" className={L} />
        </>
    ),
    "Portfolio Design": (
        <>
            <rect x="12" y="20" width="47" height="50" rx="2" className={P} />
            <rect x="61" y="20" width="47" height="50" rx="2" className={P} />
            <rect x="17" y="26" width="16" height="16" className={A} />
            <rect x="36" y="26" width="18" height="16" className={L} />
            <rect x="17" y="46" width="37" height="18" className={L} />
            <rect x="66" y="26" width="37" height="24" className={A} />
            <rect x="66" y="54" width="17" height="10" className={L} />
            <rect x="86" y="54" width="17" height="10" className={L} />
        </>
    ),
    "Template Design": (
        <>
            <rect x="22" y="10" width="76" height="70" rx="2" strokeWidth="1.5" strokeDasharray="4 3" className="fill-none stroke-sky-400" />
            <rect x="30" y="18" width="60" height="14" className={A} />
            <rect x="30" y="38" width="28" height="30" className={L} />
            <rect x="62" y="38" width="28" height="13" className={L} />
            <rect x="62" y="55" width="28" height="13" className={L} />
        </>
    ),
    "Booklet Design": (
        <>
            <rect x="40" y="14" width="46" height="66" rx="2" className={L} />
            <rect x="32" y="10" width="46" height="66" rx="2" className={P} />
            <rect x="38" y="18" width="34" height="20" className={A} />
            <rect x="38" y="44" width="34" height="4" className={L} />
            <rect x="38" y="52" width="22" height="3" className={L} />
            <rect x="31" y="26" width="5" height="2" className={S} />
            <rect x="31" y="56" width="5" height="2" className={S} />
        </>
    ),
    "Letter Head Design": (
        <>
            <rect x="32" y="10" width="56" height="70" rx="2" className={P} />
            <circle cx="42" cy="21" r="5" className={A} />
            <rect x="52" y="18" width="28" height="3" className={L} />
            <rect x="52" y="24" width="18" height="2" className={L} />
            <rect x="38" y="40" width="44" height="2" className={L} />
            <rect x="38" y="46" width="44" height="2" className={L} />
            <rect x="38" y="52" width="30" height="2" className={L} />
            <rect x="32" y="72" width="56" height="8" className={A} />
        </>
    ),
    "Note Pad Design": (
        <>
            <rect x="30" y="18" width="60" height="62" rx="2" className={P} />
            <rect x="30" y="18" width="60" height="10" className={A} />
            <circle cx="40" cy="23" r="1.5" className={P} />
            <circle cx="60" cy="23" r="1.5" className={P} />
            <circle cx="80" cy="23" r="1.5" className={P} />
            <rect x="38" y="38" width="44" height="2" className={L} />
            <rect x="38" y="48" width="44" height="2" className={L} />
            <rect x="38" y="58" width="44" height="2" className={L} />
            <rect x="38" y="68" width="30" height="2" className={L} />
        </>
    ),
    "Envelope Design": (
        <>
            <rect x="14" y="22" width="92" height="54" rx="2" className={P} />
            <path d="M14 76 L42 52 M106 76 L78 52" strokeWidth="1.5" className="fill-none stroke-slate-300" />
            <rect x="88" y="28" width="12" height="14" className={A} />
            <circle cx="24" cy="32" r="4" className={A} />
            <rect x="34" y="46" width="34" height="3" className={L} />
            <rect x="34" y="53" width="26" height="3" className={L} />
        </>
    ),
};

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.045 } },
};
const tileVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
};

function ProofTile({ name }) {
    return (
        <motion.li variants={tileVariants} className="group cursor-default">
            {/* Proof sheet: corner crop marks + actual print format */}
            <div className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 transition-colors duration-300 group-hover:bg-sky-500/10 group-hover:ring-sky-400/50">
                <svg
                    viewBox="0 0 120 90"
                    className="block w-full h-auto"
                    role="img"
                    aria-label={`${name} sample`}
                >
                    <path
                        d="M4 12V4h8M116 12V4h-8M4 78v8h8M116 78v8h-8"
                        fill="none"
                        strokeWidth="1.5"
                        className="stroke-white/25 transition-colors duration-300 group-hover:stroke-sky-400"
                    />
                    <g className="[transform-box:fill-box] origin-center drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.05]">
                        {glyphs[name]}
                    </g>
                </svg>
            </div>
            <p className="mt-3 font-nunito font-bold text-base sm:text-lg xl:text-xl 3xl:text-2xl text-white transition-colors duration-300 group-hover:text-sky-300">
                {name}
            </p>
        </motion.li>
    );
}

export default function GraphicServices() {
    return (
        <MotionConfig reducedMotion="user">
            <section className="py-10 md:py-16 4xl:py-20 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mb-8 md:mb-12 4xl:mb-16">
                        <h2 className="font-alata font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white leading-tight">
                            Graphic design for everything you print
                        </h2>
                        <p className="font-nunito text-[15px] sm:text-base md:text-xl 4xl:text-2xl text-slate-350 mt-4">
                            Pick a format. We design it print-ready, in your brand's colors.
                        </p>
                    </div>

                    <motion.ul
                        variants={listVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-5 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 xl:gap-x-6 xl:gap-y-10 4xl:gap-x-8"
                    >
                        {tiles.map((name) => (
                            <ProofTile key={name} name={name} />
                        ))}
                    </motion.ul>

                    {/* All Graphic Designs = closing CTA */}
                    <a
                        href="#contact"
                        className="group mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl bg-gradient-to-r from-[#007EC3] to-sky-500 px-6 sm:px-8 xl:px-10 py-6 sm:py-8 shadow-[0_0_35px_rgba(56,189,248,0.25)] hover:shadow-[0_0_55px_rgba(56,189,248,0.45)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                    >
                        <div>
                            <p className="font-alata text-xl sm:text-2xl xl:text-3xl 3xl:text-4xl text-white">
                                All Graphic Designs
                            </p>
                            <p className="font-nunito text-sm sm:text-base xl:text-lg text-white/85 mt-1">
                                Need a format that isn't listed? Tell us the size and we'll design it.
                            </p>
                        </div>
                        <span className="font-nunito inline-flex items-center gap-2 self-start sm:self-auto shrink-0 rounded-full bg-white text-[#007EC3] px-5 py-2.5 text-sm xl:text-base font-bold transition-transform group-hover:scale-105">
                            Get a quote
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M7 17L17 7M17 7H8M17 7V16" />
                            </svg>
                        </span>
                    </a>
                </div>
            </section>
        </MotionConfig>
    );
}