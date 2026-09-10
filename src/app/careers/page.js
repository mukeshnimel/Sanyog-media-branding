"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  ArrowRight,
  Award,
  Globe,
  Plane,
  Heart,
  Home,
  PartyPopper,
  TrendingUp,
  ClipboardCheck,
  Users,
  Copy,
  Check,
  Mail,
  Briefcase,
  Quote,
  Lock,
  Settings,
  CheckCircle,
  ArrowRightCircle
} from "lucide-react";
import FinalCTA from "@/components/FinalCTA";

// Real perks from Sanyog Media
const perks = [
  { icon: "flights_and_hotels", title: "National & Overseas Trips", description: "Explore new places with the team through domestic and international travel." },
  { icon: "crowdsource", title: "Picnic & Athletic Gathering", description: "Regular team picnics and sports events to build bonds beyond work." },
  { icon: "add_home_work", title: "Work-Life Harmony", description: "A culture that respects your time outside the office as much as inside it." },
  { icon: "broadcast_on_home", title: "Flexibility for Remote Work", description: "Work from where you're most productive, with flexible arrangements." },
  { icon: "cheer", title: "Festive Observance", description: "All major festivals celebrated together as one Sanyog family." },
  { icon: "workspace_premium", title: "Career Advancement", description: "Clear prospects and pathways for growing within the organization." },
  { icon: "calendar_month", title: "Monthly Achievement Reviews", description: "Regular assessment of your monthly performance and milestones." },
  { icon: "handshake", title: "Onboarding & Monthly Meets", description: "A structured initiation program plus regular monthly team gatherings." },
];

// Real open roles from Sanyog Media
const roles = [
  {
    title: "Business Development Executive",
    posts: "1 Post",
    location: "Delhi Branch",
    experience: "2-4 Year Of Experience",
    status: "filled",
    applyLink: "#",
    image: "/images/career/4.png",
  },
  {
    title: "Sales & Marketing Person",
    posts: "3 Post",
    location: "Delhi, Churu",
    experience: "0 - 2 Year Experience",
    status: "open",
    applyLink: "https://forms.gle/GCfah1ZBdTM7GGYT9",
    image: "/images/career/5.png",
  },
  {
    title: "Graphic Designer",
    posts: "2 Post",
    location: "Churu",
    experience: "6M - 2 Year Experience",
    status: "open",
    applyLink: "https://forms.gle/GCfah1ZBdTM7GGYT9",
    image: "/images/career/6.png",
  },
];

export default function CareersPage() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("careers@sanyogmedia.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="flex-1 bg-dark-bg text-slate-100 overflow-hidden">

      {/* 1. HERO SECTION */}
      <section className="relative py-24 md:py-35 3xl:py-44 4xl:py-52 flex items-center justify-center bg-dark-bg border-b border-glass-border overflow-hidden">

        {/* Real Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/career/hero.png"
            alt="Sanyog Media Concepts Career"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950/70" />

        {/* Blue Glow */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 3xl:w-[32rem] 3xl:h-[32rem] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />

        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 3xl:w-[32rem] 3xl:h-[32rem] rounded-full bg-neon-cyan/10 blur-[130px] pointer-events-none" />

        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Content */}
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10 text-center flex flex-col items-center -translate-y-8">

          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 3xl:px-5 3xl:py-2 rounded-full border border-glass-border bg-slate-900/60 backdrop-blur-md mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 text-neon-cyan" />

            <span className="text-[10px] 3xl:text-xs uppercase tracking-[0.25em] font-semibold text-slate-400">
              Grow With Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display  text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl leading-tight tracking-tight text-white mb-6 max-w-4xl 3xl:max-w-6xl"
          >
            Start Your Career Journey <br />
            <span className="gradient-text">
              @ Sanyog Media Concepts
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-2 px-10 py-5 3xl:px-12 3xl:py-6 rounded-full border border-glass-border bg-slate-900/40 text-xl 3xl:text-2xl font-semibold text-white mb-10"
          >
            <MapPin className="w-5 h-5 3xl:w-6 3xl:h-6 text-white" />

            <span>INDIA</span>
            <span className="text-slate-650">&bull;</span>
            <span>U.A.E.</span>
            <span className="text-slate-650">&bull;</span>
            <span>GERMANY</span>
            <span className="text-slate-650">&bull;</span>
            <span>BANGKOK</span>
            <span className="text-slate-650">&bull;</span>
            <span>NEPAL</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <button
              onClick={() => setShowPopup(true)}
              className="px-5 sm:px-8 4xl:px-11 py-2.5 sm:py-3.5 4xl:py-5 border border-white rounded-[15px] text-sm sm:text-xl 4xl:text-2xl font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-1.5 sm:gap-2 4xl:gap-3"
              style={{ background: "linear-gradient(128deg, #00549B 21%, #07C4DD 100%)" }}
            >
              Connect With Team
              <span className="flex items-center justify-center">
                <img src="/images/video-reel/icons/smile.svg" alt="Smile" className="w-4 h-4 sm:w-7 sm:h-7 4xl:w-9 4xl:h-9 brightness-0 invert" />
              </span>
            </button>
          </motion.div>

        </div>
      </section>

      {/* 2. CAREER AT SANYOG MEDIA — INTRO */}
      <section className="py-24 3xl:py-32 bg-dark-bg relative border-b border-glass-border">
        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 3xl:gap-16 items-start">

            {/* Left text */}
            <div className="flex flex-col items-start">
              <span className="text-lg md:text-xl 3xl:text-2xl font-bold text-white mb-3">
                Career at Sanyog Media
              </span>

              <h2 className="font-display font-bold text-3xl md:text-5xl 3xl:text-6xl text-sky-400 leading-tight mb-6">
                Special Advantages to Advance Your Entire Career
              </h2>

              {/* Highlighted quote/callout box */}
              <div className="w-full rounded-lg bg-[#0b2a4a] px-6 py-5 3xl:px-8 3xl:py-6 mb-6">
                <p className="text-white text-sm md:text-base 3xl:text-lg leading-relaxed">
                  Certainly! Different ways to express &ldquo;Exclusive benefits for
                  your complete career growth&rdquo; could include:
                </p>
              </div>

              <p className="text-slate-400 text-sm md:text-base 3xl:text-lg leading-relaxed mb-8">
                At Sanyog Media, we&apos;re cultivating an environment where exceptional individuals — just like you — can excel in their endeavors. If you&apos;re prepared to advance in your professional journey and contribute to the rapid growth of countless brands, you&apos;ve found the perfect spot.
              </p>
            </div>

            {/* Right image + Send CV below it */}
            <div className="w-full flex flex-col gap-6">
              <div className="relative aspect-[4/3] rounded-3xl 3xl:rounded-[2rem] overflow-hidden border border-glass-border shadow-xl">
                <Image
                  src="/images/career/2.jpg"
                  alt="Career growth at Sanyog Media"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Send CV card */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 3xl:w-13 3xl:h-13 rounded-full bg-white border border-glass-border flex items-center justify-center text-sky-500 shrink-0">
                  <Mail className="w-5 h-5 3xl:w-6 3xl:h-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm 3xl:text-base font-bold text-white">Send Your C.V.</span>

                  <a href="mailto:careers@sanyogmedia.com"
                    className="text-sm md:text-base 3xl:text-lg font-semibold text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    careers@sanyogmedia.com
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. UNIQUE PERKS & CULTURE */}
      <section className="py-24 3xl:py-32 bg-dark-bg relative overflow-hidden border-b border-glass-border">
        <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2000px] mx-auto px-6">
          <div className="text-center max-w-3xl 3xl:max-w-4xl mx-auto mb-16">
            <span className="text-xs 3xl:text-sm font-bold uppercase tracking-widest text-neon-cyan">
              Unique Perks
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl 3xl:text-6xl text-white mt-4">
              To Foster Your Overall Professional Development
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 3xl:gap-8">
            {perks.map((perk, idx) => {
              const Icon = perk.icon;
              const slug = perk.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              return (
                <div
                  key={idx}
                  className="group rounded-xl 3xl:rounded-2xl overflow-hidden border border-glass-border bg-slate-900/40 cursor-default transition-all duration-300 hover:-translate-y-1.5 hover:border-neon-cyan/40 hover:shadow-[0_0_30px_-8px_theme(colors.neon-cyan)]"
                >
                  {/* Fake browser chrome bar */}
                  <div className="flex items-center gap-3 px-4 py-2.5 3xl:px-5 3xl:py-3 bg-slate-950/60 border-b border-glass-border">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2 h-2 3xl:w-2.5 3xl:h-2.5 rounded-full bg-slate-600 group-hover:bg-red-400/70 transition-colors duration-300" />
                      <span className="w-2 h-2 3xl:w-2.5 3xl:h-2.5 rounded-full bg-slate-600 group-hover:bg-amber-400/70 transition-colors duration-300" />
                      <span className="w-2 h-2 3xl:w-2.5 3xl:h-2.5 rounded-full bg-slate-600 group-hover:bg-emerald-400/70 transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0 rounded-md bg-slate-900/80 px-2.5 py-1 3xl:px-3 3xl:py-1.5">
                      <span className="block text-[10px] 3xl:text-xs text-slate-500 truncate group-hover:text-neon-cyan/80 transition-colors duration-300">
                        sanyogmedia.com/perks/{slug}
                      </span>
                    </div>
                  </div>

                  {/* Page content */}
                  <div className="p-6 3xl:p-8">
                    <div className="w-11 h-11 3xl:w-14 3xl:h-14 rounded-xl bg-slate-900 border border-glass-border flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110">
                      <span className="material-symbols-outlined !text-[35px] 3xl:!text-[42px]">
                        {perk.icon}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-base 3xl:text-lg text-white mb-2 leading-snug">
                      {perk.title}
                    </h3>
                    <p className="text-xs 3xl:text-sm text-slate-400 leading-relaxed">
                      {perk.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-slate-500 uppercase tracking-wider mt-10">
            *Terms &amp; Conditions Apply
          </p>
        </div>
      </section>

      {/* 4. INTERNSHIP PROGRAM SECTION */}
      <section className="py-24 3xl:py-32 bg-dark-bg border-b border-glass-border relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] 3xl:w-[500px] 3xl:h-[500px] bg-electric-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl 3xl:max-w-[1600px] 4xl:max-w-[1900px] mx-auto px-6 relative z-10">
          {/* Centered header */}
          <div className="text-center pb-10 mb-14 border-b ">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="font-display font-bold text-2xl md:text-6xl 3xl:text-7xl text-white"
            >
              <span className="text-sky-400">Internship</span> Program
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-5xl 3xl:text-6xl font-bold text-white mt-2"
            >
              3-6 <span className="text-sky-400">Months</span>
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 3xl:gap-16 items-center">
            {/* Left — illustration image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-3xl 3xl:rounded-[2rem]">
                <img
                  src="/images/career/3.png"
                  alt="Internship and career opportunities"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col items-start"
            >
              <h3 className="font-display font-bold text-2xl md:text-3xl 3xl:text-4xl text-white mb-6">
                Internship at Sanyog Media
              </h3>

              <div className="bg-sky-600 p-5 3xl:p-6 mb-8 w-full border-l-[5px] border-white">
                <p className="text-sm md:text-base 3xl:text-lg font-semibold text-white leading-relaxed">
                  Confidence Applied Properly Surpasses Genius. There&apos;s Nothing
                  Like Confidence.
                </p>
              </div>

              <p className="text-sm md:text-base 3xl:text-lg text-slate-300 leading-relaxed mb-5">
                With A Sharp Focus On Sales And Marketing, We Offer An Intensive
                Internship Program Designed To Empower Aspiring Professionals. Our
                Interns Gain Hands-On Experience Working On Real-World Projects,
                Learning How Design And Communication Drive Business Success.
              </p>

              <p className="text-sm md:text-base 3xl:text-lg text-slate-300 leading-relaxed mb-8">
                Whether You&apos;re A Brand Looking To Stand Out Or A Student Ready
                To Launch Your Career, Sanyog Media Concepts Is Your Creative
                Partner For Growth.
              </p>

              <a
                href="https://forms.gle/yeDXbEijkvP3KCg5A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 3xl:px-8 3xl:py-3 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-sm 3xl:text-base font-bold transition-colors"
              >
                Apply Now
                <CheckCircle className="w-4 h-4 3xl:w-5 3xl:h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. EXPLORE AVAILABLE ROLES */}
      <section id="openings" className="py-24 3xl:py-32 bg-slate-950 relative">
        <div className="max-w-6xl 3xl:max-w-[1500px] 4xl:max-w-[1800px] mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs 3xl:text-sm font-bold uppercase tracking-widest text-neon-cyan">
              Join the Success with Sanyog Media Concepts
            </span>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl 3xl:text-6xl text-white mt-4 mb-6">
              Explore Our Available Roles
            </h2>
            <p className="text-base 3xl:text-lg text-slate-400 max-w-2xl 3xl:max-w-3xl mx-auto">
              Discover a job that ignites your passion, confidently set imposter
              syndrome aside, and take the step to apply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 3xl:gap-10">
            {roles.map((role, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl 3xl:rounded-[2rem] border-2 3xl:border-[3px] border-sky-400 overflow-hidden shadow-xl flex flex-col"
              >
                {/* Photo */}
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={role.image}
                    alt={role.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col items-center px-6 pt-6 pb-8 3xl:px-8 3xl:pt-8 3xl:pb-10 flex-1">
                  <h3 className="font-display font-bold text-lg 3xl:text-xl text-slate-800 text-center mb-4">
                    {role.title}
                  </h3>

                  <div className="w-full flex flex-col mb-6">
                    <div className="flex items-center gap-2 py-2 3xl:py-2.5 border-b border-slate-200 text-sm 3xl:text-base text-slate-600">
                      <ArrowRightCircle className="w-4 h-4 3xl:w-5 3xl:h-5 text-sky-500 shrink-0" />
                      {role.posts}
                    </div>
                    <div className="flex items-center gap-2 py-2 3xl:py-2.5 border-b border-slate-200 text-sm 3xl:text-base text-slate-600">
                      <ArrowRightCircle className="w-4 h-4 3xl:w-5 3xl:h-5 text-sky-500 shrink-0" />
                      {role.location}
                    </div>
                    <div className="flex items-center gap-2 py-2 3xl:py-2.5 text-sm 3xl:text-base text-slate-600">
                      <ArrowRightCircle className="w-4 h-4 3xl:w-5 3xl:h-5 text-sky-500 shrink-0" />
                      {role.experience}
                    </div>
                  </div>

                  <div className="mt-auto">
                    {role.status === "filled" ? (
                      <span className="inline-flex items-center px-6 py-2.5 3xl:px-8 3xl:py-3 rounded-full text-sm 3xl:text-base font-bold text-white bg-orange-500">
                        Filled
                      </span>
                    ) : (
                      <a
                        href={role.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2.5 3xl:px-8 3xl:py-3 rounded-full text-sm 3xl:text-base font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors"
                      >
                        Apply Now
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAST C.V. SUBMISSION / APPLY SECTION */}
      {/* <section id="apply" className="py-15 bg-dark-bg border-t border-b border-glass-border relative">
        <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-glass-border bg-slate-900/60 backdrop-blur-md mb-4">
            <Mail className="w-3.5 h-3.5 text-neon-cyan" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-400">
              Talent Acquisition
            </span>
          </span>

          <h2 className="font-display font-extrabold text-3xl md:text-5xl text-white mb-6">
            Ready to Make an Impact? Send Your C.V.
          </h2>

          <p className="text-base text-slate-400 mb-10 max-w-xl">
            Don't see an open role that fits? Drop your CV and portfolio link directly to our talent acquisition team.
          </p>

          <div className="flex items-center gap-3 p-4 md:p-6 rounded-2xl border border-glass-border bg-slate-900/40 backdrop-blur-md w-full max-w-md justify-between group shadow-xl">
            <a
              href="mailto:careers@sanyogmedia.com"
              className="text-base md:text-xl font-bold text-white hover:text-neon-cyan transition-colors flex items-center gap-2.5"
            >
              <Briefcase className="w-5 h-5 text-neon-cyan" />
              careers@sanyogmedia.com
            </a>
            <button
              onClick={copyEmail}
              className="p-2.5 rounded-xl border border-glass-border bg-slate-950 text-slate-400 hover:text-white hover:border-white transition-all active:scale-95"
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section> */}

      <FinalCTA />

    </main>
  );
}