import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * InteractiveMarketingOrbit
 * -----------------------------------------------------------------
 * Services float in open space around a soft light-core, connected
 * by curved energy-lines. Icons keep their ORIGINAL brand colors —
 * no filter strips them to white. Glass nodes give just enough
 * surface to read as objects without boxing the icons in.
 *
 * - Mouse movement tilts the whole orbit (parallax).
 * - Auto-rotates slowly when idle (with a gentle vertical wobble
 *   for a proper spherical / round feel), eases down on hover.
 * - Hover: node lifts + line pulses + a tooltip card appears.
 * - A soft cursor glow trail follows the pointer.
 * -----------------------------------------------------------------
 */

const ICON_BASE = "/images/digital-marketing/icons";

const SERVICES = [
    { label: "Social Media Marketing", icon: `${ICON_BASE}/social-media-marketing.svg`, bg: "#38bdf8", desc: "Build & grow your brand across platforms" },
    { label: "Social Media Ads", icon: `${ICON_BASE}/social-media-ads.svg`, bg: "#f472b6", desc: "Targeted paid campaigns that convert" },
    { label: "Google Ads", icon: `${ICON_BASE}/google-ads.svg`, bg: "#fbbf24", desc: "Search & display ads that capture intent" },
    { label: "Google Listing", icon: `${ICON_BASE}/google-listing.svg`, bg: "#34d399", desc: "Rank on Google Maps & local search" },
    { label: "SEO", icon: `${ICON_BASE}/seo.svg`, bg: "#a78bfa", desc: "Organic rankings that compound over time" },
    { label: "Content Marketing", icon: `${ICON_BASE}/content-marketing.svg`, bg: "#fb7185", desc: "Content that educates, engages & converts" },
];

const R = 130; // orbit radius, world units
const FOCAL = 300; // perspective focal length
const DISPLAY_K = 0.42; // world -> percent scale
// Bigger spread = rounder path on screen (was [-38, 28, -18, 40, -28, 15])
const ELEV = [-70, 55, -35, 75, -55, 30]; // per-node vertical offset for a rounder sphere

export default function InteractiveMarketingOrbit() {
    const containerRef = useRef(null);
    const mouseRef = useRef({ nx: 0, ny: 0, inside: false });
    const rotRef = useRef({ auto: 0, autoTiltPhase: 0 });
    const [tick, setTick] = useState(0); // forces re-render each frame
    const [hovered, setHovered] = useState(null);
    const [trail, setTrail] = useState([]); // recent cursor points for the glow trail
    const [vw, setVw] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);

    // track viewport width so the orbit can re-scale itself on small screens
    useEffect(() => {
        const onResize = () => setVw(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    const isMobile = vw < 640;
    const isSmall = vw < 420;

    // main animation loop
    useEffect(() => {
        let raf;
        const loop = () => {
            const speed = hovered !== null ? 0.002 : 0.007; // idle rotation speed
            rotRef.current.auto += speed;
            rotRef.current.autoTiltPhase += speed * 0.6; // slower phase for vertical bob
            setTick((t) => t + 1);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [hovered]);

    // small floating dust particles drifting slowly around the whole scene
    const dust = useRef(
        Array.from({ length: 22 }, (_, k) => ({
            id: k,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 2,
            dur: 10 + Math.random() * 14,
            delay: -Math.random() * 20,
            drift: 6 + Math.random() * 10,
        }))
    ).current;

    // twinkling stars, brighter + animated (in addition to the static ones)
    const stars = useRef(
        Array.from({ length: 28 }, (_, k) => ({
            id: k,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: 1 + Math.random() * 1.6,
            dur: 2 + Math.random() * 3.5,
            delay: -Math.random() * 5,
        }))
    ).current;

    const handleMouseMove = useCallback((e) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1..1
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        mouseRef.current = { nx, ny, inside: true };

        const xp = ((e.clientX - rect.left) / rect.width) * 100;
        const yp = ((e.clientY - rect.top) / rect.height) * 100;
        setTrail((prev) => [...prev.slice(-7), { x: xp, y: yp, id: Math.random() }]);
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current.inside = false;
        setHovered(null);
    }, []);

    // ---- 3D projection ----
    const maxTilt = 0.45; // radians
    const autoTilt = Math.sin(rotRef.current.autoTiltPhase) * 0.18; // idle vertical sway for round feel
    const rotY = rotRef.current.auto + (mouseRef.current.inside ? mouseRef.current.nx * maxTilt : 0);
    const rotX = autoTilt + (mouseRef.current.inside ? mouseRef.current.ny * maxTilt * 0.7 : 0);

    const nodes = SERVICES.map((s, i) => {
        const theta = (Math.PI * 2 * i) / SERVICES.length;
        const x0 = R * Math.cos(theta);
        const z0 = R * Math.sin(theta);
        const y0 = ELEV[i];

        const x1 = x0 * Math.cos(rotY) + z0 * Math.sin(rotY);
        const z1 = -x0 * Math.sin(rotY) + z0 * Math.cos(rotY);
        const y2 = y0 * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y0 * Math.sin(rotX) + z1 * Math.cos(rotX);

        const scale = FOCAL / (FOCAL + z2);
        return {
            ...s,
            i,
            xPct: 50 + x1 * scale * DISPLAY_K,
            yPct: 50 + y2 * scale * DISPLAY_K,
            scale,
            z: z2,
        };
    }).sort((a, b) => a.z - b.z); // back-to-front paint order

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setHovered(null)}
            style={{
                position: "relative",
                width: "100%",
                maxWidth: isSmall ? 340 : isMobile ? 420 : 620,
                margin: "0 auto",
                marginTop: isMobile ? "-8px" : "-48px",
                aspectRatio: "1 / 1",
                cursor: "default",
                touchAction: "manipulation",
                background:
                    "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(56,90,180,0.10) 0%, rgba(5,8,16,0) 70%)",
                overflow: "visible",
            }}
        >
            {/* local keyframes for the richer background effects */}
            <style>{`
                @keyframes orbitTwinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.7); }
                    50% { opacity: 1; transform: scale(1.15); }
                }
                @keyframes orbitDust {
                    0% { transform: translate(0, 0); opacity: 0; }
                    10% { opacity: 0.5; }
                    50% { transform: translate(var(--dx), calc(var(--dy) * -1)); opacity: 0.7; }
                    90% { opacity: 0.4; }
                    100% { transform: translate(0, 0); opacity: 0; }
                }
                @keyframes orbitHaloPulse {
                    0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.35; }
                    50% { transform: translate(-50%,-50%) scale(1.18); opacity: 0.1; }
                }
                @keyframes orbitNebulaDrift {
                    0%, 100% { transform: translate(-50%,-50%) rotate(0deg) scale(1); }
                    50% { transform: translate(-50%,-50%) rotate(8deg) scale(1.06); }
                }
            `}</style>

            {/* rich multi-color nebula wash, built from every service's brand color */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: "-12%",
                    borderRadius: "50%",
                    background: [
                        "radial-gradient(38% 32% at 18% 24%, rgba(56,189,248,0.16) 0%, rgba(56,189,248,0) 70%)",
                        "radial-gradient(34% 30% at 82% 20%, rgba(244,114,182,0.14) 0%, rgba(244,114,182,0) 70%)",
                        "radial-gradient(36% 32% at 85% 78%, rgba(251,191,36,0.13) 0%, rgba(251,191,36,0) 70%)",
                        "radial-gradient(34% 30% at 16% 80%, rgba(52,211,153,0.14) 0%, rgba(52,211,153,0) 70%)",
                        "radial-gradient(40% 34% at 50% 8%, rgba(167,139,250,0.12) 0%, rgba(167,139,250,0) 70%)",
                        "radial-gradient(38% 32% at 50% 94%, rgba(251,113,133,0.12) 0%, rgba(251,113,133,0) 70%)",
                    ].join(","),
                    filter: "blur(6px)",
                    animation: "orbitNebulaDrift 26s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />

            {/* faint static starfield for depth — cheap, no per-frame cost */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                        "radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.35) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 78% 15%, rgba(255,255,255,0.25) 0, transparent 60%)," +
                        "radial-gradient(1.5px 1.5px at 88% 68%, rgba(255,255,255,0.3) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 22% 82%, rgba(255,255,255,0.22) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.18) 0, transparent 60%)," +
                        "radial-gradient(1.5px 1.5px at 8% 55%, rgba(255,255,255,0.2) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 35% 38%, rgba(255,255,255,0.16) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 68% 45%, rgba(255,255,255,0.16) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 45% 65%, rgba(255,255,255,0.14) 0, transparent 60%)," +
                        "radial-gradient(1px 1px at 92% 40%, rgba(255,255,255,0.16) 0, transparent 60%)",
                    pointerEvents: "none",
                    opacity: 0.8,
                }}
            />

            {/* twinkling stars — animated brightness/scale, gives the scene life */}
            {stars.map((s) => (
                <div
                    key={`star-${s.id}`}
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: s.size,
                        height: s.size,
                        borderRadius: "50%",
                        background: "#fff",
                        boxShadow: "0 0 4px 1px rgba(255,255,255,0.5)",
                        animation: `orbitTwinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* slow drifting dust motes for ambient depth */}
            {dust.map((d) => (
                <div
                    key={`dust-${d.id}`}
                    aria-hidden
                    style={{
                        position: "absolute",
                        left: `${d.x}%`,
                        top: `${d.y}%`,
                        width: d.size,
                        height: d.size,
                        borderRadius: "50%",
                        background: "rgba(180,205,255,0.55)",
                        "--dx": `${d.drift}px`,
                        "--dy": `${d.drift * 0.7}px`,
                        animation: `orbitDust ${d.dur}s ease-in-out ${d.delay}s infinite`,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* outer orbit ring — the path the nodes travel along, tilts subtly with the parallax */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "82%",
                    height: `${58 + Math.cos(rotX) * 4}%`,
                    transform: `translate(-50%,-50%) rotate(${((rotY * 180) / Math.PI) % 360}deg)`,
                    borderRadius: "50%",
                    border: "1px dashed rgba(255,255,255,0.16)",
                    boxShadow: "inset 0 0 30px rgba(140,190,255,0.06)",
                    pointerEvents: "none",
                    transition: "height 0.2s",
                }}
            />

            {/* inner secondary ring — different tilt/scale for extra depth */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "58%",
                    height: `${40 + Math.cos(rotX * 1.4) * 5}%`,
                    transform: `translate(-50%,-50%) rotate(${((-rotY * 140) / Math.PI) % 360}deg)`,
                    borderRadius: "50%",
                    border: "1px solid rgba(167,139,250,0.12)",
                    boxShadow: "inset 0 0 20px rgba(167,139,250,0.05)",
                    pointerEvents: "none",
                    transition: "height 0.2s",
                }}
            />

            {/* connecting lines — soft curves toward the core, not straight spokes */}
            <svg
                viewBox="0 0 100 100"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
            >
                <defs>
                    {nodes.map((n) => (
                        <linearGradient
                            key={`grad-${n.i}`}
                            id={`line-grad-${n.i}`}
                            x1="50%" y1="50%" x2={`${(n.xPct / 50) * 50}%`} y2={`${(n.yPct / 50) * 50}%`}
                            gradientUnits="objectBoundingBox"
                        >
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                            <stop offset="100%" stopColor={n.bg} stopOpacity="0.1" />
                        </linearGradient>
                    ))}
                </defs>
                {nodes.map((n) => {
                    const isHover = hovered === n.i;
                    const opacity = 0.14 + n.scale * 0.26 + (isHover ? 0.5 : 0);
                    const dashOffset = -(tick * (isHover ? 0.8 : 0.2)) % 24;
                    // gentle curve: bow the midpoint slightly outward from the radial line
                    const mx = (50 + n.xPct) / 2;
                    const my = (50 + n.yPct) / 2;
                    const nxv = -(n.yPct - 50);
                    const nyv = n.xPct - 50;
                    const nlen = Math.hypot(nxv, nyv) || 1;
                    const bow = 3.5;
                    const cx = mx + (nxv / nlen) * bow;
                    const cy = my + (nyv / nlen) * bow;
                    return (
                        <path
                            key={n.i}
                            d={`M 50 50 Q ${cx} ${cy} ${n.xPct} ${n.yPct}`}
                            fill="none"
                            stroke={`url(#line-grad-${n.i})`}
                            strokeWidth={isHover ? 0.65 : 0.3}
                            strokeDasharray={isHover ? "2.5 2" : "1 3.2"}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            style={{ opacity, transition: "opacity 0.3s, stroke-width 0.3s" }}
                        />
                    );
                })}
            </svg>

            {/* cursor glow trail — soft, no hard edge */}
            {trail.map((t, idx) => (
                <div
                    key={t.id}
                    style={{
                        position: "absolute",
                        left: `${t.x}%`,
                        top: `${t.y}%`,
                        width: 10,
                        height: 10,
                        transform: "translate(-50%,-50%)",
                        background: "radial-gradient(circle, rgba(148,197,255,0.45) 0%, rgba(148,197,255,0) 70%)",
                        opacity: ((idx + 1) / trail.length) * 0.35,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* core — layered soft light source, now with extra pulsing halo rings */}
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "50%",
                    height: "50%",
                    borderRadius: "50%",
                    transform: "translate(-50%,-50%)",
                    border: "1px solid rgba(140,190,255,0.18)",
                    animation: "orbitHaloPulse 4.5s ease-in-out infinite",
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "42%",
                    height: "42%",
                    borderRadius: "50%",
                    transform: "translate(-50%,-50%)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    animation: "orbitHaloPulse 4.5s ease-in-out 1.5s infinite",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "34%",
                    height: "34%",
                    transform: "translate(-50%,-50%)",
                    background:
                        "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(140,190,255,0.22) 40%, rgba(140,190,255,0) 72%)",
                    filter: "blur(8px)",
                    opacity: 0.5 + Math.sin(tick / 40) * 0.18,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "14%",
                    height: "14%",
                    transform: "translate(-50%,-50%)",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 75%)",
                    filter: "blur(2px)",
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 5,
                    height: 5,
                    transform: "translate(-50%,-50%)",
                    background: "#fff",
                    boxShadow: "0 0 20px 7px rgba(255,255,255,0.8)",
                    borderRadius: "50%",
                }}
            />

            {/* service nodes — glass surface, icons keep their real brand color */}
            {nodes.map((n) => {
                const isHover = hovered === n.i;
                const baseBox = isSmall ? 38 : isMobile ? 44 : 52;
                const boxSize = baseBox * Math.max(0.58, Math.min(1.45, n.scale)) * (isHover ? 1.22 : 1);
                const iconSize = boxSize * 0.52;
                const isContentMarketing = n.label === "Content Marketing";
                const opacity = Math.max(0.55, Math.min(1, n.scale));
                return (
                    <div
                        key={n.i}
                        onMouseEnter={() => !isMobile && setHovered(n.i)}
                        onMouseLeave={() => !isMobile && setHovered((h) => (h === n.i ? null : h))}
                        onClick={(e) => {
                            e.stopPropagation();
                            setHovered((h) => (h === n.i ? null : n.i));
                        }}
                        style={{
                            position: "absolute",
                            left: `${n.xPct}%`,
                            top: `${n.yPct}%`,
                            transform: "translate(-50%,-50%)",
                            zIndex: Math.round(n.scale * 100),
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 9,
                            cursor: "pointer",
                            opacity,
                            transition: "opacity 0.25s",
                        }}
                    >
                        <div
                            style={{
                                width: boxSize,
                                height: boxSize,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: isHover
                                    ? "linear-gradient(155deg, rgba(255,255,255,0.14), rgba(12,16,28,0.55))"
                                    : "linear-gradient(155deg, rgba(255,255,255,0.07), rgba(12,16,28,0.5))",
                                backdropFilter: "blur(7px)",
                                border: isHover
                                    ? `1px solid ${n.bg}88`
                                    : "1px solid rgba(255,255,255,0.14)",
                                boxShadow: isHover
                                    ? `0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px -8px ${n.bg}66, inset 0 0 16px rgba(255,255,255,0.06)`
                                    : "0 6px 18px -8px rgba(0,0,0,0.5), inset 0 0 10px rgba(255,255,255,0.03)",
                                transition: "width 0.2s, height 0.2s, box-shadow 0.25s, border-color 0.25s, background 0.25s",
                            }}
                        >
                            <img
                                src={n.icon}
                                alt={n.label}
                                style={{
                                    width: iconSize,
                                    height: iconSize,
                                    objectFit: "contain",
                                    filter: isContentMarketing
                                        ? isHover
                                            ? `drop-shadow(0 0 10px ${n.bg}aa)`
                                            : "drop-shadow(0 1px 2px rgba(0,0,0,0.35))"
                                        : isHover
                                            ? `brightness(0) invert(1) drop-shadow(0 0 8px ${n.bg}aa)`
                                            : "brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.35))",
                                    transition: "filter 0.25s",
                                }}
                            />
                        </div>

                        <span
                            style={{
                                fontSize: isSmall ? 8.5 : isMobile ? 9 : 10,
                                fontFamily:
                                    "ui-sans-serif, -apple-system, 'Segoe UI', Inter, system-ui, sans-serif",
                                fontWeight: 500,
                                color: isHover ? "#f8fafc" : "#cbd5e1",
                                textAlign: "center",
                                letterSpacing: 0.1,
                                maxWidth: isMobile ? 70 : 96,
                                lineHeight: 1.3,
                                textShadow: "0 1px 4px rgba(0,0,0,0.75)",
                                transition: "color 0.2s",
                            }}
                        >
                            {n.label}
                        </span>

                        {isHover && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    marginTop: 22,
                                    background: "rgba(9,13,24,0.92)",
                                    border: `1px solid ${n.bg}55`,
                                    borderRadius: 10,
                                    padding: "8px 12px",
                                    fontSize: isMobile ? 10 : 11,
                                    fontFamily: "ui-sans-serif, -apple-system, 'Segoe UI', Inter, system-ui, sans-serif",
                                    color: "#e2e8f0",
                                    whiteSpace: isMobile ? "normal" : "nowrap",
                                    maxWidth: isMobile ? 150 : "none",
                                    textAlign: "center",
                                    boxShadow: `0 8px 24px -6px rgba(0,0,0,0.6), 0 0 16px ${n.bg}22`,
                                    zIndex: 999,
                                }}
                            >
                                <span
                                    aria-hidden
                                    style={{
                                        position: "absolute",
                                        top: -5,
                                        left: "50%",
                                        transform: "translateX(-50%) rotate(45deg)",
                                        width: 8,
                                        height: 8,
                                        background: "rgba(9,13,24,0.92)",
                                        borderLeft: `1px solid ${n.bg}55`,
                                        borderTop: `1px solid ${n.bg}55`,
                                    }}
                                />
                                {n.desc}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}