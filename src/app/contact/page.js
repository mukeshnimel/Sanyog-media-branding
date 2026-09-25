"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  X,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const SERVICE_OPTIONS = [
  "Select Service",
  "Logo Design & Branding",
  "Website Design",
  "Social Media Marketing",
  "Packaging Design",
  "Graphics Design",
  "Ad. Video Editing",
  "Content Creation / Copy Writing",
];

const RECAPTCHA_SCRIPT_ID = "recaptcha-script";
const RECAPTCHA_ZFIX_ID = "recaptcha-zindex-fix";

const contactLines = [
  {
    icon: Phone,
    label: "Call our team",
    value: "+91 9929 600 601",
    href: "tel:+919929600601",
  },
  {
    icon: Phone,
    label: "Talk to our team",
    value: "+91 7726 966 902",
    href: "tel:+917726966902",
  },
  {
    icon: Mail,
    label: "Write to us",
    value: "hello@sanyogmedia.com",
    href: "mailto:hello@sanyogmedia.com",
  },
];

function ContactForm({ idPrefix = "cf" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    service: "Select Service",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.message
    )
      return;

    setStatus("sending");

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        throw new Error(
          "reCAPTCHA site key missing hai. .env file check karein."
        );
      }

      if (!window.grecaptcha) {
        throw new Error(
          "reCAPTCHA abhi load ho raha hai, thoda ruk kar dobara try karein."
        );
      }

      // token generate karo
      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(siteKey, { action: "submit" })
            .then(resolve)
            .catch(reject);
        });
      });

      // backend se verify karwao
      const verifyRes = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const verifyData = await verifyRes.json();

      if (!verifyData.success) {
        alert("Verification failed, please try again.");
        setStatus("idle");
        return;
      }

      // TODO: yahan apna actual form data backend/API/email endpoint pe bhejo
      console.log("Form submitted:", formData);

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFormData({
          name: "",
          phone: "",
          email: "",
          website: "",
          service: "Select Service",
          message: "",
        });
      }, 2500);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong, please try again.");
      setStatus("idle");
    }
  };

  // z-index fix — badge hamesha sabse upar dikhe
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

  // reCAPTCHA script load karo jab yeh component mount ho
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const existing = document.getElementById(RECAPTCHA_SCRIPT_ID);

    if (existing) {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.style.visibility = "visible";
    } else if (siteKey) {
      const script = document.createElement("script");
      script.id = RECAPTCHA_SCRIPT_ID;
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      document.body.appendChild(script);
    }

    // component unmount hone pe badge hide kar do
    return () => {
      const badge = document.querySelector(".grecaptcha-badge");
      if (badge) badge.style.visibility = "hidden";
    };
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-name`}
            className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
          >
            Name *
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-phone`}
            className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
          >
            Phone *
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="+91 XXXXX XXXXX"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${idPrefix}-email`}
            className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
          >
            Email *
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor={`${idPrefix}-website`}
            className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
          >
            Website
          </label>
          <input
            id={`${idPrefix}-website`}
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="www.yoursite.com"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-service`}
          className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
        >
          Service
        </label>
        <select
          id={`${idPrefix}-service`}
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 focus:outline-none focus:border-neon-cyan transition-colors"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-slate-900">
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={`${idPrefix}-message`}
          className="block text-xs uppercase tracking-wide text-slate-500 mb-1.5 font-nunito"
        >
          Message *
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="Tell us about your project..."
          className="w-full px-4 py-3 rounded-xl bg-slate-800/60 border border-glass-border text-slate-100 placeholder-slate-500 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full font-nunito px-6 py-3.5 rounded-xl text-base font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors inline-flex items-center justify-center gap-2"
      >
        {status === "sending" && "Sending..."}
        {status === "success" && "Message Sent ✓"}
        {status === "idle" && "Send Message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  const [showPopup, setShowPopup] = useState(false);

  const ctaRef = useRef(null);
  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ctaBgY = useTransform(ctaScroll, [0, 1], ["-18%", "18%"]);
  const ctaDotsY = useTransform(ctaScroll, [0, 1], ["-8%", "8%"]);

  // Close popup on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setShowPopup(false);
    };
    if (showPopup) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showPopup]);

  return (
    <main className="flex-1 bg-dark-bg text-slate-100 overflow-hidden">
      <section className="relative bg-dark-bg overflow-hidden pt-24 pb-8 3xl:pt-32 3xl:pb-12">
        {/* single deliberate glow, not a decorative wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-[-10%] w-[520px] h-[520px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "var(--neon-cyan, #22e6e0)" }}
        />

        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 3xl:gap-20 items-center">
            {/* LEFT — CONTENT */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-7"
              >
                <span className="h-px w-10 bg-neon-cyan/70" />
                <span className="text-sm font-nunito text-slate-400">
                  Sanyog Media Concepts
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16, duration: 0.5 }}
                className="font-nunito text-base 3xl:text-lg text-slate-400 mb-10 leading-relaxed max-w-md 3xl:max-w-lg"
              >
                Tell us what you&rsquo;re building and we&rsquo;ll get back to
                you within a day. No forms, no gatekeeping — just reach out
                directly.
              </motion.p>

              {/* contact list — structured rows, not pill chips */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.5 }}
                className="border-t border-glass-border"
              >
                {contactLines.map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={value}
                    href={href}
                    className="group flex items-center justify-between py-4 border-b border-glass-border"
                  >
                    <span className="flex items-center gap-3.5">
                      <Icon className="w-4 h-4 text-neon-cyan shrink-0" />
                      <span className="font-nunito text-xs uppercase tracking-wide text-slate-500 w-28 shrink-0">
                        {label}
                      </span>
                      <span className="font-alata text-sm md:text-base text-slate-200 relative">
                        {value}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
                      </span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-600 transition-all duration-300 group-hover:text-neon-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — FRAMED IMAGE, static + angled, one hover response */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative hidden lg:flex items-center justify-center w-full"
            >
              <div className="absolute inset-8 rounded-[2rem] border border-glass-border bg-slate-900/30 backdrop-blur-sm -rotate-3" />
              <motion.img
                src="/images/contact/hero2.png"
                alt="Sanyog Media Concepts"
                className="relative w-full max-w-[420px] 3xl:max-w-[500px] h-auto object-contain rotate-2"
                whileHover={{ rotate: 0, scale: 1.02 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="py-24 3xl:py-32 bg-dark-bg relative">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 3xl:gap-20">
            {/* FORM (LEFT) */}
            <div className="glass-card rounded-3xl border border-glass-border bg-slate-900/60 p-8 3xl:p-10">
              <h2 className="font-alata font-bold text-2xl 3xl:text-3xl text-white mb-1">
                Send Us a Message
              </h2>
              <p className="text-sm 3xl:text-base text-neon-cyan font-semibold mb-6">
                Let&apos;s have a chat
              </p>
              <ContactForm idPrefix="main" />
            </div>

            {/* MAP (RIGHT) */}
            <div className="flex flex-col lg:mt-8 3xl:mt-10">
              <div className="relative flex-1 min-h-[420px] md:min-h-[480px] 3xl:min-h-[560px]">
                <div
                  className="absolute -top-4 -left-3 z-10 flex items-center gap-2 pl-3 pr-4 py-2 border border-dashed border-slate-600 bg-slate-900 -rotate-6 shadow-lg"
                  style={{ borderRadius: "999px 6px 6px 999px" }}
                >
                  <span className="w-2 h-2 rounded-full border border-slate-600 bg-dark-bg shrink-0" />
                  <MapPin className="w-3.5 h-3.5 text-neon-cyan shrink-0" />
                  <span className="text-xs 3xl:text-sm font-semibold text-slate-300 whitespace-nowrap">
                    Visit the studio
                  </span>
                </div>

                <div
                  className="relative w-full h-full overflow-hidden border border-glass-border"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)",
                  }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7026.545359674175!2d74.96573529999999!3d28.2900629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ab7072948e559c7%3A0x8a361dda702872e!2sSanyog%20Media%20Academy!5e0!3m2!1sen!2sin!4v1788000410719!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full border-0 grayscale-[30%]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="relative py-14 md:py-20 3xl:py-28 bg-[#0a0e27]"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/contact/1.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        {/* Parallax background layer */}
        <motion.div
          style={{ y: ctaBgY }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
        </motion.div>

        {/* Cyan dots */}
        <motion.div
          style={{ y: ctaDotsY }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 pointer-events-none"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(34,211,238,0.55) 1.5px, transparent 1.5px)",
              backgroundSize: "15px 15px",
              maskImage:
                "radial-gradient(ellipse 65% 85% at 72% 50%, black 35%, transparent 78%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 65% 85% at 72% 50%, black 35%, transparent 78%)",
            }}
          />
        </motion.div>

        {/* CTA Content */}
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-9 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 3xl:gap-14 py-5 md:py-6 3xl:py-8">
            {/* LEFT — CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <span className="font-nunito text-xl 3xl:text-2xl font-bold uppercase tracking-widest text-white">
                Our Team is Here to Help
              </span>
              <h2 className="font-alata font-bold text-2xl md:text-4xl 3xl:text-5xl text-white mt-2 mb-4">
                Ready to Elevate Your Brand?
              </h2>
              <button
                onClick={() => setShowPopup(true)}
                className="font-nunito px-7 py-3.5 3xl:px-9 3xl:py-4 rounded-xl text-[16px] md:text-[18px] 3xl:text-[20px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </button>
            </motion.div>

            {/* RIGHT — IMAGE (absolute so it doesn't push section height) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="hidden md:block absolute right-6 lg:right-10 3xl:right-16 bottom-[-16px] translate-y-20 lg:translate-y-16 pointer-events-none"
            >
              <div className="w-[240px] lg:w-[300px] 3xl:w-[380px] 4xl:w-[440px] pointer-events-auto">
                <img
                  src="/images/contact/2.png"
                  alt="Contact Sanyog Media Concepts"
                  className="w-full h-auto object-contain block"
                />
              </div>
            </motion.div>

            {/* MOBILE IMAGE */}
            <div className="md:hidden w-full flex justify-center translate-y-20">
              <img
                src="/images/contact/2.png"
                alt="Contact Sanyog Media Concepts"
                className="w-[180px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* POPUP: How Can We Help You */}
      {showPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg 3xl:max-w-xl rounded-3xl 3xl:rounded-[2rem] border border-glass-border bg-slate-900 p-8 3xl:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={() => setShowPopup(false)}
              aria-label="Close"
              className="absolute top-5 right-5 3xl:top-6 3xl:right-6 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5 3xl:w-6 3xl:h-6" />
            </button>
            <h2 className="font-alata font-bold text-2xl 3xl:text-3xl text-white mb-1">
              How Can We Help You
            </h2>
            <h3 className="text-sm 3xl:text-base text-neon-cyan font-semibold mb-6">
              Let&apos;s have a chat
            </h3>
            <ContactForm idPrefix="popup" />
          </div>
        </div>
      )}
    </main>
  );
}