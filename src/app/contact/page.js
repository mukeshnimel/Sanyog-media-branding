"use client";

import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Check,
  Loader2,
  Send,
  X,
  ArrowRight,
  Headset,
  Image as ImageIcon,
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

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://instagram.com/sanyogmediaconcepts?igshid=OGQ5ZDc2ODk2ZA==",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/sanyogmediaconcepts?igshid=OGQ5ZDc2ODk2ZA==",
    box: true,
    path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01",
  },
  {
    label: "LinkedIn",
    href: "http://www.linkedin.com/in/sanyog-media-concepts-a72669269",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.message) return;
    setStatus("sending");
    setTimeout(() => {
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
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 3xl:gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 3xl:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-name`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Your Name*
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name*"
            className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950/40 text-white text-sm 3xl:text-base focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-phone`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Phone Number*
          </label>
          <input
            id={`${idPrefix}-phone`}
            type="tel"
            name="phone"
            required
            pattern="[0-9()#&+*-=.]+"
            title="Only numbers and phone characters (#, -, *, etc) are accepted."
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number*"
            className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950/40 text-white text-sm 3xl:text-base focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 3xl:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-email`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Email*
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email*"
            className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950/40 text-white text-sm 3xl:text-base focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor={`${idPrefix}-website`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            Website
          </label>
          <input
            id={`${idPrefix}-website`}
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website"
            className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950/40 text-white text-sm 3xl:text-base focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-service`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Select Service
        </label>
        <select
          id={`${idPrefix}-service`}
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950 text-white text-sm 3xl:text-base focus:border-neon-cyan outline-none transition-all appearance-none cursor-pointer"
        >
          {SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${idPrefix}-message`} className="text-xs 3xl:text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Message*
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          className="w-full px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-950/40 text-white text-sm 3xl:text-base focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending" || status === "success"}
        className="glow-btn-primary w-full py-4 3xl:py-5 rounded-xl font-bold text-white text-sm 3xl:text-base flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 3xl:w-5 3xl:h-5 animate-spin" />
            Sending...
          </>
        ) : status === "success" ? (
          <>
            <Check className="w-4 h-4 3xl:w-5 3xl:h-5 text-emerald-400" />
            Submitted
          </>
        ) : (
          <>
            <Send className="w-4 h-4 3xl:w-5 3xl:h-5" />
            Submit
          </>
        )}
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

  return (
    <main className="flex-1 bg-dark-bg text-slate-100 overflow-hidden">

      {/* HERO */}
      <section className="relative bg-dark-bg  overflow-hidden pt-24 pb-8 3xl:pt-32 3xl:pb-12">
        {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" /> */}
        {/* <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-neon-cyan/10 blur-[130px] pointer-events-none" /> */}

        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 3xl:gap-20 items-center">

            {/* LEFT — CONTENT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 3xl:px-5 3xl:py-2 rounded-full border border-glass-border bg-slate-900/60 backdrop-blur-md mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 text-neon-cyan" />
                <span className="text-[10px] 3xl:text-xs uppercase tracking-[0.25em] font-semibold text-slate-400">
                  Contact Sanyog Media Concepts
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl 3xl:text-7xl leading-tight tracking-tight text-white mb-6"
              >
                Contact Us
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base 3xl:text-lg text-slate-400 mb-10 leading-relaxed max-w-xl 3xl:max-w-2xl"
              >
                We would love to speak with you. Feel free to reach out using the below details.
              </motion.p>

              <div className="flex flex-wrap gap-4 3xl:gap-5 w-full">

                <a href="tel:+919929600601"
                  className="px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-900/40 text-xs 3xl:text-sm font-semibold text-slate-300 flex items-center gap-2 hover:border-neon-cyan transition-all"
                >
                  <Phone className="w-4 h-4 3xl:w-5 3xl:h-5 text-neon-cyan" />
                  <span>+91 - 9929 600 601</span>
                </a>


                <a href="tel:+917726966902"
                  className="px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-900/40 text-xs 3xl:text-sm font-semibold text-slate-300 flex items-center gap-2 hover:border-neon-cyan transition-all"
                >
                  <Phone className="w-4 h-4 3xl:w-5 3xl:h-5 text-neon-cyan" />
                  <span>+91 - 7726 966 902</span>
                </a>


                <a href="mailto:hello@sanyogmedia.com"
                  className="px-4 py-3 3xl:px-5 3xl:py-4 rounded-xl border border-glass-border bg-slate-900/40 text-xs 3xl:text-sm font-semibold text-slate-300 flex items-center gap-2 hover:border-neon-cyan transition-all"
                >
                  <Mail className="w-4 h-4 3xl:w-5 3xl:h-5 text-neon-cyan" />
                  <span>hello@sanyogmedia.com</span>
                </a>
              </div>
            </div>

            {/* RIGHT — IMAGE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center justify-end w-full"
            >
              <div className="w-full max-w-[600px] 3xl:max-w-[720px] 4xl:max-w-[820px] translate-x-6 md:translate-x-15">
                <img
                  src="/images/contact/hero.png"
                  alt="Contact Sanyog Media Concepts"
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="py-24 3xl:py-32 bg-dark-bg relative border-b border-glass-border">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 3xl:gap-16 items-stretch">

            <div
              id="contact-form"
              className="glass-card p-8 3xl:p-10 rounded-3xl 3xl:rounded-[2rem] border border-glass-border bg-slate-900/10 backdrop-blur-md"
            >
              <ContactForm idPrefix="main" />
            </div>

            <div className="relative rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-glass-border h-[400px] md:h-[400px] lg:h-[550px] 3xl:h-[650px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7026.545359674175!2d74.96573529999999!3d28.2900629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ab7072948e559c7%3A0x8a361dda702872e!2sSanyog%20Media%20Academy!5e0!3m2!1sen!2sin!4v1788000410719!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={ctaRef}
        className="relative py-14 md:py-20 3xl:py-28 bg-[#0a0e27] border-b border-glass-border"
      >
        {/* Background Image */}
        <div className="absolute inset-0 ">
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
          {/* faint grid */}
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

            {/* LEFT — CONTENT (yehi ab section ki height decide karega) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <span className="text-xl 3xl:text-2xl font-bold uppercase tracking-widest text-white">
                Our Team is Here to Help
              </span>
              <h2 className="font-display font-bold text-2xl md:text-4xl 3xl:text-5xl text-white mt-2 mb-4">
                Ready to Elevate Your Brand?
              </h2>
              <button
                onClick={() => setShowPopup(true)}
                className="px-7 py-3.5 3xl:px-9 3xl:py-4 rounded-xl text-sm 3xl:text-base font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </button>
            </motion.div>

            {/* RIGHT — IMAGE, absolute so it doesn't push section height */}
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
      {
        showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="relative w-full max-w-lg 3xl:max-w-xl glass-card rounded-3xl 3xl:rounded-[2rem] border border-glass-border bg-slate-900 p-8 3xl:p-10">
              <button
                onClick={() => setShowPopup(false)}
                aria-label="Close"
                className="absolute top-5 right-5 3xl:top-6 3xl:right-6 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5 3xl:w-6 3xl:h-6" />
              </button>
              <h2 className="font-display font-bold text-2xl 3xl:text-3xl text-white mb-1">How Can We Help You</h2>
              <h3 className="text-sm 3xl:text-base text-neon-cyan font-semibold mb-6">Let's have a chat</h3>
              <ContactForm idPrefix="popup" />
            </div>
          </div>
        )
      }
    </main >
  );
}