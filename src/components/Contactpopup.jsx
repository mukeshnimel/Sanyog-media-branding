"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

const services = [
    "Logo Design & Branding",
    "Website Design",
    "Packaging Design",
    "Social Media Marketing",
    "Graphics Design",
    "Video/Reel Editing",
    "Content Creation",
];

const RECAPTCHA_SCRIPT_ID = "recaptcha-script";
const RECAPTCHA_ZFIX_ID = "recaptcha-zindex-fix";

export default function ContactPopup({ showPopup, setShowPopup }) {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        email: "",
        service: "",
        requirements: "",
    });
    const [submitting, setSubmitting] = useState(false);

    // One-time: force reCAPTCHA (badge + any challenge iframe it spawns) to always
    // render above everything else on the page. Google sets an inline
    // z-index: 2000000000 itself, but that can still lose to a competing
    // stacking context created elsewhere on the page (a transformed/opacity
    // ancestor, a CSS reset, etc). Re-asserting it with !important, injected
    // after everything else loads, guarantees it wins the cascade.
    useEffect(() => {
        if (document.getElementById(RECAPTCHA_ZFIX_ID)) return;

        const style = document.createElement("style");
        style.id = RECAPTCHA_ZFIX_ID;
        style.textContent = `
            .grecaptcha-badge,
            iframe[src*="recaptcha"],
            iframe[title*="recaptcha" i],
            div[style*="z-index: 2000000000"] {
                z-index: 2147483647 !important;
            }
        `;
        document.head.appendChild(style);
    }, []);

    // load the reCAPTCHA script only while the popup is open; hide its badge when closed
    useEffect(() => {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

        if (showPopup) {
            const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);

            if (existing) {
                // script already loaded earlier — just reveal the badge again
                const badge = document.querySelector(".grecaptcha-badge");
                if (badge) badge.style.visibility = "visible";
            } else {
                const script = document.createElement("script");
                script.id = RECAPTCHA_SCRIPT_ID;
                script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
                script.async = true;
                document.body.appendChild(script);
            }
        } else {
            // popup closed — hide the badge (Google's terms want it kept in the DOM,
            // just visually collapsed while it isn't relevant to the user)
            const badge = document.querySelector(".grecaptcha-badge");
            if (badge) badge.style.visibility = "hidden";
        }
    }, [showPopup]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Close only when the backdrop itself was clicked — never when the click
    // originated from something else (e.g. a recaptcha challenge iframe that
    // happens to overlap this area) and bubbled up.
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            setShowPopup(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

            if (!window.grecaptcha) {
                throw new Error("reCAPTCHA abhi load ho raha hai, thoda ruk kar dobara try karein.");
            }

            // wait for grecaptcha to be ready, then get a token
            const token = await new Promise((resolve, reject) => {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute(siteKey, { action: "submit" })
                        .then(resolve)
                        .catch(reject);
                });
            });

            const verifyRes = await fetch("/api/verify-recaptcha", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });
            const verifyData = await verifyRes.json();

            if (!verifyData.success) {
                alert("Verification failed, please try again.");
                setSubmitting(false);
                return;
            }

            // TODO: ab actual form data ko apne backend/API/email endpoint pe bhejo
            console.log("Form submitted:", form);
            setShowPopup(false);
        } catch (err) {
            console.error(err);
            alert(err.message || "Something went wrong, please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {showPopup && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60"
                        onClick={handleBackdropClick}
                    />

                    {/* modal card — slow zoomIn entrance, slow rotate-down exit */}
                    <motion.div
                        variants={{
                            hidden: { opacity: 0, scale: 0.3, rotate: 0, x: 0, y: 0 },
                            visible: {
                                opacity: 1,
                                scale: 1,
                                rotate: 0,
                                x: 0,
                                y: 0,
                                transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                            },
                            // rotateDown: pivots from top-left, spins and drops toward the bottom
                            rotatedOut: {
                                opacity: 0,
                                rotate: 60,
                                x: "-20%",
                                y: "80%",
                                transition: { duration: 1, ease: "easeInOut" },
                            },
                        }}
                        initial="hidden"
                        animate="visible"
                        exit="rotatedOut"
                        style={{ transformOrigin: "left top" }}
                        className="relative z-10 w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl sm:p-7"
                    >
                        {/* close button */}
                        <button
                            onClick={() => setShowPopup(false)}
                            aria-label="Close"
                            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center text-gray-600 transition-colors hover:text-gray-900"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <motion.h2
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25, duration: 0.4 }}
                            className="pr-14 text-2xl font-bold text-gray-800 sm:text-3xl"
                        >
                            How Can We Help You
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="mt-1 text-sm font-medium text-sky-600"
                        >
                            Let&apos;s Have A Chat
                        </motion.p>

                        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-2.5">
                            {[
                                { name: "name", placeholder: "Full Name", type: "text" },
                                { name: "phone", placeholder: "Phone", type: "tel" },
                                { name: "email", placeholder: "Email", type: "email" },
                            ].map((field, i) => (
                                <motion.input
                                    key={field.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={form[field.name]}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400 focus:bg-white"
                                />
                            ))}

                            <motion.select
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.55, duration: 0.4 }}
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-gray-700 outline-none transition-colors focus:border-sky-400 focus:bg-white"
                            >
                                <option value="">Select Service</option>
                                {services.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </motion.select>

                            <motion.textarea
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.62, duration: 0.4 }}
                                name="requirements"
                                placeholder="Your Requirements"
                                value={form.requirements}
                                onChange={handleChange}
                                rows={3}
                                className="w-full resize-none rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-500 outline-none transition-colors focus:border-sky-400 focus:bg-white"
                            />

                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.4 }}
                                type="submit"
                                disabled={submitting}
                                className="mt-2 inline-flex w-fit items-center justify-center gap-2 rounded-full bg-sky-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-600/30 transition-colors hover:bg-sky-700 disabled:opacity-60"
                            >
                                {submitting ? "Please wait..." : "Request A Call Back"}
                                {!submitting && <ArrowRight className="h-4 w-4" />}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/*
            Custom badge removed: since the real Google reCAPTCHA script
            (loaded in layout.js) is now active, Google injects its own
            official "protected by reCAPTCHA" badge automatically at the
            bottom-right of the page — no need to fake it anymore.
          */}
                </motion.div>
            )}
        </AnimatePresence>
    );
}