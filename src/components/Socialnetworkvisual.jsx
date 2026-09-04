import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * InteractiveMarketingOrbit
 * -----------------------------------------------------------------
 * A real 3D orbit of your 6 services around a glowing core.
 * - Moving the mouse tilts the whole orbit (parallax, like looking
 *   into a sphere from different angles).
 * - It auto-rotates when you're not interacting.
 * - Hovering a service: it lifts toward you, glows, shows a short
 *   description, and its connecting line brightens.
 * - A soft glow trail follows the cursor.
 *
 * No external assets, no <img>, no framer-motion — pure React state
 * + requestAnimationFrame + basic 3D projection math.
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

const R = 100; // orbit radius, world units
const FOCAL = 260; // perspective focal length
const DISPLAY_K = 0.34; // world -> percent scale
const ELEV = [-30, 22, -14, 32, -22, 12]; // per-node vertical offset for a non-flat sphere

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
                maxWidth: 640,
                margin: "0 auto",
                aspectRatio: "1 / 1",
                cursor: "default",
            }}
        >
            {/* outer glow ring */}
            <div
                style={{
                    position: "absolute",
                    inset: -12,
                    borderRadius: "9999px",
                    border: "1px solid rgba(56,235,255,0.25)",
                    pointerEvents: "none",
                }}
            />

            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "9999px",
                    overflow: "hidden",
                    background: "radial-gradient(circle at 50% 50%, #140f4a 0%, #07041D 60%, #030114 100%)",
                    boxShadow: "0 0 120px rgba(56,235,255,0.22)",
                }}
            >
                {/* connecting lines */}
                <svg viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    {nodes.map((n) => {
                        const isHover = hovered === n.i;
                        const opacity = 0.25 + n.scale * 0.35 + (isHover ? 0.4 : 0);
                        return (
                            <line
                                key={n.i}
                                x1="50" y1="50" x2={n.xPct} y2={n.yPct}
                                stroke={isHover ? n.bg : "rgba(56,235,255,0.55)"}
                                strokeWidth={isHover ? 0.6 : 0.28}
                                style={{ opacity, transition: "opacity 0.25s, stroke 0.25s, stroke-width 0.25s" }}
                            />
                        );
                    })}
                </svg>

                {/* cursor glow trail */}
                {trail.map((t, idx) => (
                    <div
                        key={t.id}
                        style={{
                            position: "absolute",
                            left: `${t.x}%`,
                            top: `${t.y}%`,
                            width: 10,
                            height: 10,
                            borderRadius: "9999px",
                            background: "rgba(56,235,255,0.55)",
                            transform: "translate(-50%,-50%)",
                            opacity: (idx + 1) / trail.length * 0.35,
                            filter: "blur(3px)",
                            pointerEvents: "none",
                        }}
                    />
                ))}

                {/* bright pulsing core */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "30%",
                        height: "30%",
                        transform: "translate(-50%,-50%)",
                        borderRadius: "9999px",
                        background: "rgba(255,255,255,0.85)",
                        filter: "blur(28px)",
                        opacity: 0.6 + Math.sin(tick / 30) * 0.2,
                        pointerEvents: "none",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: 10,
                        height: 10,
                        transform: "translate(-50%,-50%)",
                        borderRadius: "9999px",
                        background: "#fff",
                        boxShadow: "0 0 24px 8px rgba(255,255,255,0.9)",
                    }}
                />

                {/* service nodes */}
                {nodes.map((n) => {
                    const isHover = hovered === n.i;
                    const size = 52 * Math.max(0.55, Math.min(1.5, n.scale)) * (isHover ? 1.25 : 1);
                    const opacity = Math.max(0.45, Math.min(1, n.scale));
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
                                gap: 6,
                                cursor: "pointer",
                                opacity,
                                transition: "opacity 0.2s",
                            }}
                        >
                            <div
                                style={{
                                    width: size,
                                    height: size,
                                    borderRadius: 14,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: n.bg,
                                    color: "#0b1120",
                                    boxShadow: isHover
                                        ? `0 0 28px 6px ${n.bg}`
                                        : "0 4px 14px rgba(0,0,0,0.4)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    transition: "width 0.2s, height 0.2s, box-shadow 0.2s",
                                }}
                            >
                                <img
                                    src={n.icon}
                                    alt={n.label}
                                    style={{ width: "62%", height: "62%", objectFit: "contain" }}
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
                                        background: "rgba(5,10,18,0.95)",
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
        </div>
    );
}