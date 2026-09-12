import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * InteractiveMarketingOrbit
 * -----------------------------------------------------------------
 * No enclosing circle / disc — the services float freely in open
 * space, connected to the core by animated energy-lines. Icons sit
 * on a fully transparent backdrop (no colored box behind them),
 * lit only by a drop-shadow glow in their brand color.
 *
 * - Mouse movement tilts the whole orbit (parallax).
 * - Auto-rotates when idle.
 * - Hover: icon lifts + brightens, its line becomes a flowing
 *   gradient pulse, a description tag appears.
 * - A soft cursor glow trail (blurred, no hard edge) follows the
 *   pointer.
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
const ELEV = [-38, 28, -18, 40, -28, 15]; // per-node vertical offset for a non-flat sphere

export default function InteractiveMarketingOrbit() {
    const containerRef = useRef(null);
    const mouseRef = useRef({ nx: 0, ny: 0, inside: false });
    const rotRef = useRef({ auto: 0 });
    const [tick, setTick] = useState(0); // forces re-render each frame
    const [hovered, setHovered] = useState(null);
    const [trail, setTrail] = useState([]); // recent cursor points for the glow trail

    // main animation loop
    useEffect(() => {
        let raf;
        const loop = () => {
            const speed = hovered !== null ? 0.0015 : 0.006;
            rotRef.current.auto += speed;
            setTick((t) => t + 1);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
    }, [hovered]);

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
    const maxTilt = 0.5; // radians
    const rotY = rotRef.current.auto + (mouseRef.current.inside ? mouseRef.current.nx * maxTilt : 0);
    const rotX = mouseRef.current.inside ? mouseRef.current.ny * maxTilt * 0.7 : 0;

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
            style={{
                position: "relative",
                width: "100%",
                maxWidth: 820,
                margin: "0 auto",
                aspectRatio: "1 / 1",
                cursor: "default",
                background: "transparent",
            }}
        >
            {/* connecting lines — flowing energy, not a static ring */}
            <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
                <defs>
                    {nodes.map((n) => (
                        <linearGradient
                            key={`grad-${n.i}`}
                            id={`line-grad-${n.i}`}
                            x1="50%" y1="50%" x2={`${(n.xPct / 50) * 50}%`} y2={`${(n.yPct / 50) * 50}%`}
                            gradientUnits="objectBoundingBox"
                        >
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                            <stop offset="100%" stopColor={n.bg} stopOpacity="0.15" />
                        </linearGradient>
                    ))}
                </defs>
                {nodes.map((n) => {
                    const isHover = hovered === n.i;
                    const opacity = 0.18 + n.scale * 0.3 + (isHover ? 0.45 : 0);
                    const dashOffset = -(tick * (isHover ? 0.9 : 0.25)) % 20;
                    return (
                        <line
                            key={n.i}
                            x1="50" y1="50" x2={n.xPct} y2={n.yPct}
                            stroke={`url(#line-grad-${n.i})`}
                            strokeWidth={isHover ? 0.7 : 0.32}
                            strokeDasharray={isHover ? "3 2" : "1 3"}
                            strokeDashoffset={dashOffset}
                            strokeLinecap="round"
                            style={{ opacity, transition: "opacity 0.25s, stroke-width 0.25s" }}
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
                        background: "radial-gradient(circle, rgba(56,235,255,0.5) 0%, rgba(56,235,255,0) 70%)",
                        opacity: ((idx + 1) / trail.length) * 0.4,
                        pointerEvents: "none",
                    }}
                />
            ))}

            {/* core — a soft light source, not a hard shape */}
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: "26%",
                    height: "26%",
                    transform: "translate(-50%,-50%)",
                    background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(120,180,255,0.25) 45%, rgba(120,180,255,0) 75%)",
                    filter: "blur(6px)",
                    opacity: 0.55 + Math.sin(tick / 30) * 0.25,
                    pointerEvents: "none",
                }}
            />
            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 6,
                    height: 6,
                    transform: "translate(-50%,-50%)",
                    background: "#fff",
                    boxShadow: "0 0 18px 6px rgba(255,255,255,0.85)",
                    borderRadius: "50%",
                }}
            />

            {/* service nodes — transparent, icon-only, glow instead of a box */}
            {nodes.map((n) => {
                const isHover = hovered === n.i;
                const boxSize = 72 * Math.max(0.55, Math.min(1.5, n.scale)) * (isHover ? 1.25 : 1);
                const iconSize = boxSize * 0.6;
                const opacity = Math.max(0.5, Math.min(1, n.scale));
                return (
                    <div
                        key={n.i}
                        onMouseEnter={() => setHovered(n.i)}
                        onMouseLeave={() => setHovered((h) => (h === n.i ? null : h))}
                        style={{
                            position: "absolute",
                            left: `${n.xPct}%`,
                            top: `${n.yPct}%`,
                            transform: "translate(-50%,-50%)",
                            zIndex: Math.round(n.scale * 100),
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                            opacity,
                            transition: "opacity 0.2s",
                        }}
                    >
                        <div
                            style={{
                                width: boxSize,
                                height: boxSize,
                                borderRadius: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: `linear-gradient(160deg, ${n.bg}26, rgba(10,14,26,0.55))`,
                                backdropFilter: "blur(6px)",
                                border: `1px solid ${n.bg}55`,
                                boxShadow: isHover
                                    ? `0 0 30px 6px ${n.bg}77, inset 0 0 18px ${n.bg}33`
                                    : `0 0 14px ${n.bg}33, inset 0 0 10px rgba(255,255,255,0.04)`,
                                transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
                            }}
                        >
                            <img
                                src={n.icon}
                                alt={n.label}
                                style={{
                                    width: iconSize,
                                    height: iconSize,
                                    objectFit: "contain",
                                    filter: isHover
                                        ? `brightness(0) invert(1) drop-shadow(0 0 10px ${n.bg})`
                                        : `brightness(0) invert(1) drop-shadow(0 0 4px ${n.bg}aa)`,
                                    transition: "filter 0.2s",
                                }}
                            />
                        
                        </div>

                        <span
                            style={{
                                fontSize: 10,
                                fontFamily: "ui-monospace, monospace",
                                color: "#e2e8f0",
                                textAlign: "center",
                                letterSpacing: 0.3,
                                maxWidth: 90,
                                lineHeight: 1.3,
                                textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                            }}
                        >
                            {n.label}
                        </span>

                        {isHover && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    marginTop: 8,
                                    background: "rgba(5,10,18,0.9)",
                                    border: `1px solid ${n.bg}55`,
                                    borderRadius: 10,
                                    padding: "6px 10px",
                                    fontSize: 10,
                                    color: "#cbd5e1",
                                    whiteSpace: "nowrap",
                                    boxShadow: `0 0 20px ${n.bg}33`,
                                    zIndex: 999,
                                }}
                            >
                                {n.desc}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}