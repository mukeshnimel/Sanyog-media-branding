"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENE_DURATION = 4200; // ms

const scenes = [
    { id: "ecommerce", image: "/images/web-design/1.png", tag: "E-COMMERCE" },
    { id: "crypto", image: "/images/web-design/2.png", tag: "Agency" },
    { id: "mobile", image: "/images/web-design/3.png", tag: "MOBILE_APP" },
    { id: "business", image: "/images/web-design/4.png", tag: "BUSINESS" },
    { id: "ecommerce2", image: "/images/web-design/5.png", tag: "E-COMMERCE" },
    { id: "crypto2", image: "/images/web-design/6.png", tag: "Agency" },
    { id: "mobile2", image: "/images/web-design/7.png", tag: "MOBILE_APP" },
    { id: "business2", image: "/images/web-design/8.png", tag: "BUSINESS" },
];

const LOG_LINES = [
    "$ npm run build",
    "> compiling components...",
    "✓ hero.tsx optimized",
    "✓ assets minified [98%]",
    "$ deploy --target=prod",
    "> injecting styles...",
    "✓ pixels aligned",
    "> render cycle ok",
];

function useTypewriterLog(lines, speed = 45) {
    const [displayed, setDisplayed] = useState([]);
    const idxRef = useRef(0);
    const charRef = useRef(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const lineIdx = idxRef.current % lines.length;
            const line = lines[lineIdx];
            charRef.current += 1;

            setDisplayed((prev) => {
                const next = [...prev];
                next[next.length - 1] = line.slice(0, charRef.current);
                return next;
            });

            if (charRef.current >= line.length) {
                charRef.current = 0;
                idxRef.current += 1;
                setTimeout(() => {
                    setDisplayed((prev) => {
                        const next = [...prev, ""].slice(-5);
                        return next;
                    });
                }, 250);
            }
        }, speed);
        return () => clearInterval(interval);
    }, [lines, speed]);

    useEffect(() => {
        setDisplayed([""]);
    }, []);

    return displayed;
}

function StatBar({ label, value, color }) {
    return (
        <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-slate-500 w-8 tracking-wider">{label}</span>
            <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                    className={`h-full rounded-full ${color}`}
                    animate={{ width: [`${value - 15}%`, `${value}%`, `${value - 8}%`] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}

export default function HeroVisual() {
    const [index, setIndex] = useState(0);
    const prevIndex = (index - 1 + scenes.length) % scenes.length;
    const log = useTypewriterLog(LOG_LINES, 38);

    useEffect(() => {
        const t = setInterval(() => {
            setIndex((i) => (i + 1) % scenes.length);
        }, SCENE_DURATION);
        return () => clearInterval(t);
    }, []);

    const scene = scenes[index];
    const prevScene = scenes[prevIndex];

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            {/* ambient glow blobs */}
            <div className="absolute w-3/4 h-3/4 rounded-full bg-electric-blue/10 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-10 right-0 w-1/2 h-1/2 rounded-full bg-neon-cyan/10 blur-[100px] pointer-events-none" />

            {/* floating hex particles */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-[9px] font-mono text-neon-cyan/25 pointer-events-none select-none z-0"
                    style={{ left: `${10 + i * 15}%`, top: `${5 + (i % 3) * 30}%` }}
                    animate={{ y: [0, -12, 0], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                >
                    0x{(index * 17 + i * 91).toString(16).toUpperCase().padStart(4, "0")}
                </motion.span>
            ))}

            {/* main HUD card */}
            <div className="relative rounded-2xl overflow-hidden border border-glass-border bg-slate-950/60 shadow-[0_0_80px_rgba(56,235,255,0.15)]">

                {/* browser chrome */}
                <div className="flex items-center gap-2 px-5 py-4 border-b border-glass-border bg-slate-900/70">
                    <span className="w-3 h-3 rounded-full bg-rose-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                    <div className="ml-3 flex-1 h-6 rounded-full bg-slate-800/80 flex items-center px-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse mr-2" />
                        <span className="text-[10px] font-mono text-neon-cyan/70 tracking-wider">
                            portfolio.render()
                        </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 pl-3">
                        <span className="text-[9px] font-mono text-emerald-400/70">● LIVE</span>
                    </div>
                </div>

                {/* scan canvas */}
                <div className="relative aspect-[1600/901] w-full overflow-hidden bg-slate-950">
                    <img
                        src={prevScene.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    <motion.div
                        key={scene.id + index}
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        transition={{ duration: SCENE_DURATION / 1000, ease: "easeInOut" }}
                        className="absolute inset-0"
                    >
                        <img
                            src={scene.image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        key={"glitch-" + index}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="absolute inset-0 bg-neon-cyan mix-blend-overlay pointer-events-none"
                    />

                    <div
                        className="absolute inset-0 opacity-[0.06] pointer-events-none"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
                        }}
                    />

                    <div
                        className="absolute inset-0 opacity-[0.08] pointer-events-none"
                        style={{
                            backgroundImage:
                                "linear-gradient(rgba(56,235,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,235,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "28px 28px",
                        }}
                    />

                    {/* radar sweep corner */}
                    <div className="absolute top-4 right-4 w-14 h-14 z-20 pointer-events-none opacity-70">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="46" stroke="rgba(56,235,255,0.25)" strokeWidth="1" fill="none" />
                            <circle cx="50" cy="50" r="30" stroke="rgba(56,235,255,0.15)" strokeWidth="1" fill="none" />
                            <motion.line
                                x1="50" y1="50" x2="50" y2="6"
                                stroke="rgba(56,235,255,0.9)"
                                strokeWidth="1.5"
                                style={{ originX: "50px", originY: "50px" }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                            />
                        </svg>
                    </div>

                    {/* laser scan bar */}
                    <motion.div
                        key={"scan-" + index}
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: SCENE_DURATION / 1000, ease: "easeInOut" }}
                        className="absolute left-0 right-0 pointer-events-none z-10"
                        style={{ marginTop: "-1px" }}
                    >
                        <div className="h-4 w-full -translate-y-4 bg-gradient-to-b from-transparent to-slate-950/60" />
                        <div className="h-[2px] w-full bg-neon-cyan shadow-[0_0_20px_4px_rgba(56,235,255,0.9)]" />
                        <div className="h-10 w-full bg-gradient-to-b from-neon-cyan/30 to-transparent" />
                    </motion.div>

                    {/* corner HUD brackets */}
                    {[
                        "top-3 left-3 border-t-2 border-l-2",
                        "top-3 right-3 border-t-2 border-r-2",
                        "bottom-3 left-3 border-b-2 border-l-2",
                        "bottom-3 right-3 border-b-2 border-r-2",
                    ].map((pos, i) => (
                        <div
                            key={i}
                            className={`absolute w-5 h-5 border-neon-cyan/70 z-20 pointer-events-none ${pos}`}
                        />
                    ))}

                    {/* top-left tag readout */}
                    <div className="absolute top-4 left-8 z-20 pointer-events-none">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={scene.tag + index}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.3 }}
                                className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-950/70 border border-neon-cyan/30 backdrop-blur-sm"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                                <span className="text-[10px] font-mono text-neon-cyan tracking-widest">
                                    {scene.tag}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* progress dots */}
                    <div className="absolute bottom-4 left-8 z-20 flex items-center gap-1.5 pointer-events-none">
                        {scenes.map((_, i) => (
                            <span
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i === index
                                    ? "w-5 bg-neon-cyan shadow-[0_0_8px_rgba(56,235,255,0.9)]"
                                    : "w-1 bg-white/20"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* bottom console panel */}
                <div className="border-t border-glass-border bg-slate-950/90 px-5 py-3 flex flex-col sm:flex-row gap-3 sm:gap-6">
                    {/* terminal log */}
                    <div className="flex-1 font-mono text-[10px] leading-relaxed text-emerald-400/80 min-h-[52px]">
                        {log.map((line, i) => (
                            <div key={i} className={i === log.length - 1 ? "text-neon-cyan" : "text-emerald-500/50"}>
                                {line}
                                {i === log.length - 1 && (
                                    <span className="inline-block w-1.5 h-3 ml-0.5 bg-neon-cyan animate-pulse align-middle" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* fake system stats */}
                    <div className="flex flex-col gap-1.5 sm:w-36 justify-center">
                        <StatBar label="CPU" value={62} color="bg-neon-cyan" />
                        <StatBar label="NET" value={78} color="bg-emerald-400" />
                        <StatBar label="GPU" value={45} color="bg-electric-blue" />
                    </div>
                </div>
            </div>

            {/* pulsing outer ring */}
            <motion.div
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-2xl border border-neon-cyan/30 pointer-events-none"
            />
        </div>
    );
}