"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import Testimonials from "@/components/Testimonials";
import MarqueeRibbon from "@/components/MarqueeRibbon";
import FinalCTA from "@/components/FinalCTA";
import ContactPopup from "@/components/Contactpopup";

// ---------- DATA ----------

const services = [
    {
        image: "/images/content-writing/icons/1.svg",
        title: "Website Content",
        desc: "Transform your website with blog content that communicates your brand's message.",
    },
    {
        image: "/images/content-writing/icons/2.svg",
        title: "Blog Posts",
        desc: "Strengthen your website by conveying your brand's goals and message through blog content.",
    },
    {
        image: "/images/content-writing/icons/3.svg",
        title: "Product Description",
        desc: "Boost sales by crafting engaging and insightful product copy for your e-commerce site.",
    },
    {
        image: "/images/content-writing/icons/4.svg",
        title: "Copy Writing",
        desc: "Turn clicks into customers with our persuasive ad copywriting solutions.",
    },
];

const commitments = [
    {
        image: "/images/content-writing/icons/5.svg",
        title: "Quick Turnaround",
        desc: "Your content request is instantly picked up by our expert writers in India, who create it as per your instructions.",
    },
    {
        image: "/images/content-writing/icons/6.svg",
        title: "SEO Optimized Content",
        desc: "The content we provide is tailored for both user engagement and search engine performance, helping our clients achieve stronger SEO outcomes.",
    },
    {
        image: "/images/content-writing/icons/7.svg",
        title: "Fully Managed",
        desc: "No need to juggle freelancers or manage writing tasks — our fully managed content services have you covered. Focus on what you do best.",
    },
    {
        image: "/images/content-writing/icons/8.svg",
        title: "Copyscape-Cleared Content",
        desc: "We despise plagiarized content just like you do. Ensuring plagiarism-free content is always a top priority — 100% original, engaging material.",
    },
    {
        image: "/images/content-writing/icons/9.svg",
        title: "Personalized",
        desc: "We ask the right questions before starting a project to fully understand your needs, ensuring content aligns perfectly with your brand's vision.",
    },
    {
        image: "/images/content-writing/icons/10.svg",
        title: "Entirely Managed",
        desc: "You don't have to oversee writers or their projects, as we offer comprehensive content writing services. Focus on your expertise, we handle the rest.",
    },
];

const testimonials = [
    {
        name: "Mohit Garg",
        text: "We needed some really good pamphlet designs for our local store in Churu, and Sanyog Media Concepts did a fantastic job. The designs were eye-catching, and they understood exactly what message we wanted to convey.",
    },
    {
        name: "Monika Sharma",
        text: "The stall design Sanyog Media did for our trade show was top-notch. It was functional, looked great, and made it easy for us to interact with visitors. We got so many compliments!",
    },
    {
        name: "Jay Kishan Singh",
        text: "Our experience with their logo design was fantastic. They gave us a few options, and all of them were really good. The final logo we chose perfectly captures our brand.",
    },
    {
        name: "Sharan Srinivasan",
        text: "The design was visually stunning, capturing our brand essence perfectly. The team was professional, efficient, and delivered everything on time.",
    },
    {
        name: "Aniket Sharma",
        text: "A huge thanks to Rahul ji and his team for their outstanding work in designing and organizing our successful exhibition at Asia's No. 1 Poultry Expo, Poultry India 2024.",
    },
    {
        name: "Varsha Shrestha",
        text: "We used their services for Cosmoprof and they were very professional. Everything was very smooth. Good communication too. Thank you so much for your service.",
    },
];

// ---------- PAGE ----------

export default function ContentWritingPage() {

    const [showPopup, setShowPopup] = useState(false);
    return (
        <main className="flex-1 bg-slate-950 text-slate-100 overflow-hidden">

            {/* HERO SECTION */}
            {/* FIX: min-h dropped a step on mobile so the video section isn't
                needlessly tall/empty on small phones. */}
            <section className="relative min-h-[680px] sm:min-h-[750px] md:min-h-[850px] xl:min-h-[950px] 4xl:min-h-[1100px] overflow-visible bg-slate-950 border-b border-slate-800">

                <div className="absolute inset-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source
                            src="/images/content-writing/SMC-vid-con.mp4"
                            type="video/mp4"
                        />
                    </video>

                    <div className="absolute inset-0 bg-slate-950/65" />

                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/90" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-6xl xl:max-w-7xl 4xl:max-w-[1700px] mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-36 xl:pt-40 4xl:pt-48 pb-16 sm:pb-20 md:pb-28 xl:pb-32 4xl:pb-40 text-center flex flex-col items-center">

                    <span className="text-xs sm:text-sm md:text-xl xl:text-2xl 4xl:text-3xl font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white mb-6">
                        Your Ideas, Our Content. Let&apos;s Begin
                    </span>

                    {/* FIX: `whitespace-nowrap` forced this headline onto one line
                        even on a 375px phone, so it either overflowed the screen or
                        got silently clipped. It now wraps normally on mobile/tablet
                        and only forces a single line from lg upward where there's
                        enough width for it. */}
                    <h1
                        className="w-full max-w-none mx-auto text-center font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 4xl:text-7xl leading-tight text-white mb-8 whitespace-normal lg:whitespace-nowrap"
                    >
                        Turn Your Brand Vision Into{" "}
                        <span className="gradient-text">Content</span>
                    </h1>

                    {/* FIX: `border-3` and `px-8 md:px-25` aren't valid Tailwind
                        utilities (no class is generated for either), so this badge had
                        no visible border and no extra horizontal padding on desktop.
                        Replaced with real values, scaled down for mobile. */}
                    <div className="border-2 sm:border-[3px] border-white/70 rounded-[20px] sm:rounded-[30px] px-5 sm:px-8 md:px-[6.25rem] xl:px-32 4xl:px-40 py-2.5 sm:py-3 md:py-10 xl:py-12 4xl:py-14 mb-7 bg-white/5 backdrop-blur-sm">
                        <span className="text-sm sm:text-base md:text-3xl xl:text-4xl 4xl:text-5xl font-bold text-cyan-400">
                            Copy Writing &amp; Content Creation
                        </span>
                    </div>

                    <p className="text-sm sm:text-base md:text-3xl xl:text-4xl 4xl:text-5xl italic text-white/90 font-medium mb-10">
                        Think It — Create It — Share It
                    </p>

                    {/* Avatar Stack */}
                    <div className="flex flex-col items-center">
                        <div className="flex -space-x-3 mb-4">
                            {[
                                "https://randomuser.me/api/portraits/men/32.jpg",
                                "https://randomuser.me/api/portraits/women/44.jpg",
                                "https://randomuser.me/api/portraits/men/54.jpg",
                                "https://randomuser.me/api/portraits/women/68.jpg",
                                "https://randomuser.me/api/portraits/men/15.jpg",
                                "https://randomuser.me/api/portraits/men/76.jpg",
                            ].map((src, i) => (
                                <div
                                    key={i}
                                    className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 rounded-full border-2 border-slate-950 overflow-hidden"
                                >
                                    <Image src={src} alt={`Reviewer ${i + 1}`} fill className="object-cover" />
                                </div>
                            ))}
                        </div>

                        <span className="text-sm sm:text-base xl:text-lg 4xl:text-xl font-bold text-white">
                            4.9/5 Star Rating
                        </span>

                        <span className="text-xs sm:text-sm xl:text-base 4xl:text-lg text-cyan-400 mt-1">
                            Based on Google Review
                        </span>
                    </div>
                </div>

                {/* CTA CARD */}
                {/* FIX: this whole card used to be `absolute` + `flex justify-between`
                    with one child forced to `absolute left-1/2 -translate-x-1/2`. That
                    only works when all three children (phone icon / centered text /
                    call+button) fit side-by-side, which needs a wide desktop viewport —
                    on mobile the pieces overlapped each other and the nowrap headings
                    inside it overflowed the card. Below lg it's now a normal stacked
                    block sitting in the page flow (no absolute overlap, no clipped
                    text); from lg upward it goes back to the original absolute
                    bottom-overlap treatment. */}
                <div className="relative lg:absolute left-0 right-0 lg:bottom-0 lg:translate-y-1/2 z-20 px-4 sm:px-6 xl:px-10 4xl:px-16 -mt-10 sm:-mt-14 lg:mt-0">
                    <div className="max-w-6xl xl:max-w-7xl 4xl:max-w-[1700px] mx-auto">
                        <div className="relative bg-[#0a0e27] rounded-[2rem] sm:rounded-[2.5rem] px-6 py-8 sm:px-8 md:px-10 md:py-8 xl:px-14 xl:py-10 4xl:px-16 4xl:py-12 flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-4 xl:gap-6 4xl:gap-8 border-2 border-slate-700 shadow-2xl">

                            {/* 1. PHONE ICON */}
                            <div className="flex justify-center shrink-0 scale-75 sm:scale-90 lg:scale-100 xl:scale-110 4xl:scale-125 origin-center lg:translate-x-6">
                                <div className="relative w-32 h-32 flex items-center justify-center">

                                    {/* OUTER RIPPLE 1 */}
                                    <span className="absolute w-32 h-32 rounded-full border-2 border-cyan-400/30 animate-[ripple_2s_ease-out_infinite]" />

                                    {/* OUTER RIPPLE 2 */}
                                    <span className="absolute w-28 h-28 rounded-full border-2 border-cyan-400/40 animate-[ripple_2s_ease-out_0.6s_infinite]" />

                                    {/* OUTER RIPPLE 3 */}
                                    <span className="absolute w-24 h-24 rounded-full border border-cyan-400/50 animate-[ripple_2s_ease-out_1.2s_infinite]" />

                                    {/* DOTTED RING */}
                                    <span className="absolute w-28 h-28 rounded-full border-2 border-dashed border-cyan-400/40 animate-[spin_12s_linear_infinite]" />

                                    {/* SIDE RINGING WAVES - LEFT */}
                                    <span className="absolute -left-3 w-1.5 h-7 rounded-full bg-cyan-400/80 blur-[1px] animate-[wave_1s_ease-in-out_infinite]" />
                                    <span className="absolute -left-6 w-1 h-12 rounded-full bg-cyan-400/50 blur-[1px] animate-[wave_1s_ease-in-out_0.2s_infinite]" />

                                    {/* SIDE RINGING WAVES - RIGHT */}
                                    <span className="absolute -right-3 w-1.5 h-7 rounded-full bg-cyan-400/80 blur-[1px] animate-[wave_1s_ease-in-out_infinite]" />
                                    <span className="absolute -right-6 w-1 h-12 rounded-full bg-cyan-400/50 blur-[1px] animate-[wave_1s_ease-in-out_0.2s_infinite]" />

                                    {/* BIG GLOW */}
                                    <span className="absolute w-28 h-28 rounded-full bg-cyan-400/20 blur-2xl animate-pulse" />

                                    {/* PHONE CIRCLE */}
                                    {/* FIX: w-25/h-25 aren't valid Tailwind sizes, so this
                                        circle had no explicit size at all. Using the real
                                        w-24/h-24 scale value instead. */}
                                    <div className="relative z-10 w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-[0_0_35px_rgba(34,211,238,0.65)]">

                                        <Phone
                                            className="w-12 h-12 animate-[phoneRing_0.8s_ease-in-out_infinite]"
                                            fill="currentColor"
                                        />

                                    </div>
                                </div>
                            </div>

                            {/* 2. CONTENT — centered on mobile, exact-center overlay from lg */}
                            <div className="text-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 -mt-6 lg:mt-0">
                                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-[35px] xl:text-[40px] 4xl:text-[48px] text-white mb-2 whitespace-normal lg:whitespace-nowrap">
                                    Want To Order Content Writing
                                </h2>

                                <p className="text-sm sm:text-base lg:text-[26px] xl:text-[28px] 4xl:text-[36px] text-cyan-400 whitespace-normal lg:whitespace-nowrap">
                                    Get in Touch for a Free Personalized Pricing Plan
                                </p>
                            </div>

                            {/* 3 + 4. CALL US + SAY HELLO */}
                            <div className="lg:ml-auto flex flex-col items-center gap-4 xl:gap-5">
                                <div className="flex flex-col leading-tight text-center">
                                    {/* FIX: this label was text-2xl — bigger than the
                                        phone number it labels. Scaled it down to a
                                        normal small-caps label size. */}
                                    <span className="text-xs sm:text-sm xl:text-base font-semibold uppercase tracking-wider text-slate-400">
                                        Call Us
                                    </span>


                                   <a href="tel:+919929600601"
                                    className="text-base md:text-xl xl:text-2xl 4xl:text-3xl font-extrabold text-white hover:text-cyan-400 transition-colors whitespace-nowrap"
                                    >
                                    +91 - 9929 600 601
                                </a>
                            </div>

                            <button
                                onClick={() => setShowPopup(true)}
                                className="px-6 sm:px-8 xl:px-10 4xl:px-12 py-3 sm:py-3.5 xl:py-4 4xl:py-5 border border-white rounded-[15px] text-base sm:text-lg lg:text-xl xl:text-2xl 4xl:text-3xl font-bold text-white hover:opacity-90 transition-all shadow-lg flex items-center gap-2 4xl:gap-3"
                                style={{ background: "linear-gradient(128deg, #00549B 21%, #F04F25 100%)" }}
                            >
                                Say Hello
                                <span className="flex items-center justify-center">
                                    <img src="/images/video-reel/icons/smile.svg" alt="Smile" className="w-6 h-6 sm:w-7 sm:h-7 xl:w-9 xl:h-9 4xl:w-11 4xl:h-11 brightness-0 invert" />
                                </span>
                            </button>

                            <ContactPopup showPopup={showPopup} setShowPopup={setShowPopup} />
                        </div>

                    </div>
                </div>
            </div>
        </section>



            {/* 3. SERVICES */ }
    {/* FIX: `py-35` isn't a real Tailwind spacing step, so no vertical
                padding was actually applied on any screen size (the huge gap you saw
                was really just the CTA card's mobile margin above). Replaced with a
                real, responsive scale — smaller on mobile, matching the original
                intent on desktop. */}
    <section className="pt-16 sm:pt-20 md:pt-28 lg:pt-[8.75rem] xl:pt-40 4xl:pt-48 pb-16 sm:pb-20 md:pb-28 xl:pb-32 4xl:pb-40 bg-dark-bg">
        <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
            <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-12 md:mb-16 4xl:mb-20">

                <h2 className="font-extrabold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4">
                    Our Content Writing Services
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 xl:gap-8 4xl:gap-10">
                {services.map((s, idx) => (
                    <div key={idx} className="border-4 border-[#007EC3] p-5 sm:p-6 xl:p-7 4xl:p-9 rounded-2xl flex flex-col items-start gap-4 xl:gap-5 bg-slate-900/50">
                        {/* FIX: w-15/h-15 aren't valid Tailwind sizes (no class
                                    generated), which collapsed this icon box to 0×0. */}
                        <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-xl bg-[#007EC3] border-slate-700 flex items-center justify-center shrink-0">
                            <img
                                src={s.image}
                                alt={s.title}
                                className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 4xl:w-16 4xl:h-16 object-contain brightness-0 invert"
                            />
                        </div>
                        <h3 className="font-bold text-lg sm:text-xl xl:text-2xl 4xl:text-3xl text-white">{s.title}</h3>
                        <p className="text-sm sm:text-base xl:text-lg 4xl:text-xl text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>

    {/* 4. WORDS THAT WORK */ }
            <section className="py-16 sm:py-20 md:py-15 4xl:py-32 bg-dark-bg">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 xl:gap-16 4xl:gap-24 items-center">
                        <div className="flex flex-col items-start">
                            <span className="text-base sm:text-lg md:text-xl xl:text-2xl 4xl:text-3xl font-bold uppercase tracking-widest text-cyan-400 mb-4">
                                At Sanyog Media Concepts
                            </span>
                            <h2 className="font-bold text-xl md:text-3xl xl:text-4xl 4xl:text-5xl text-white leading-tight mb-6">
                                Words That Work — Content That Connects
                            </h2>
                            <p className="text-slate-400 text-sm md:text-base xl:text-lg 4xl:text-xl leading-relaxed mb-8">
                                Content writing involves creating written material for digital platforms with the goal of engaging, informing, or converting an audience. This includes blog posts, website copy, product descriptions, social media content, email newsletters, and more. A skilled content writer tailors content to match the brand voice, optimize for search engines (SEO), and meet specific marketing or communication goals.
                            </p>
                            <Link
                                href="/about-us"
                                className="px-8 py-4 xl:px-10 xl:py-5 4xl:px-12 4xl:py-6 rounded-xl font-bold text-slate-300 border border-slate-700 hover:border-white hover:text-white transition-all bg-[#007EC3] backdrop-blur-sm w-fit xl:text-lg 4xl:text-xl"
                            >
                                Know More About Us
                            </Link>
                        </div>

                        <div className="relative aspect-square rounded-3xl overflow-hidden">
                            <Image
                                src="/images/content-writing/1.png"
                                alt="Content Writing"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <Testimonials />

    {/* 6. OUR COMMITMENTS */ }
    {/* FIX: `py-15` isn't a valid Tailwind step either — replaced with a
                real responsive scale. */}
            <section className="bg-dark-bg py-16 sm:py-20 md:py-24 4xl:py-32">
                <div className="max-w-7xl 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto px-4 sm:px-6 xl:px-16 4xl:px-24">
                    <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-12 md:mb-16 4xl:mb-20">
                        <span className="text-sm sm:text-base md:text-lg xl:text-xl 4xl:text-2xl uppercase tracking-widest text-cyan-400">
                            Our Commitments To You
                        </span>
                        {/* FIX: whitespace-nowrap here overflowed on mobile too;
                            now wraps below lg. */}
                        <h2 className="w-full text-center text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-4 whitespace-normal lg:whitespace-nowrap">
                            With Our Content Writing Services
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 xl:gap-8 4xl:gap-10">
                        {commitments.map((c, idx) => (
                            <div key={idx} className="border-2 sm:border-[3px] border-white p-5 sm:p-6 xl:p-7 4xl:p-9 rounded-2xl flex flex-col gap-4 xl:gap-5">
                                {/* FIX: w-15/h-15 → real w-14/h-14 scale value. */}
                                <div className="w-14 h-14 xl:w-16 xl:h-16 4xl:w-20 4xl:h-20 rounded-xl bg-[#007EC3] border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
                                    <img
                                        src={c.image}
                                        alt={c.title}
                                        className="w-9 h-9 sm:w-10 sm:h-10 xl:w-12 xl:h-12 4xl:w-14 4xl:h-14 object-contain brightness-0 invert"
                                    />
                                </div>
                                <h3 className="font-bold text-lg sm:text-xl xl:text-2xl 4xl:text-3xl text-white">{c.title}</h3>
                                <p className="text-sm sm:text-base xl:text-lg 4xl:text-xl text-slate-400 leading-relaxed">{c.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <MarqueeRibbon />



            <FinalCTA />

    {/* Global CSS for marquee animation */ }
    <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        /* EXPANDING CIRCLES */
@keyframes ripple {
    0% {
        transform: scale(0.7);
        opacity: 0.8;
    }

    70% {
        transform: scale(1.35);
        opacity: 0.2;
    }

    100% {
        transform: scale(1.5);
        opacity: 0;
    }
}


/* PHONE RINGING */
@keyframes phoneRing {
    0%,
    100% {
        transform: rotate(0deg);
    }

    15% {
        transform: rotate(-15deg);
    }

    30% {
        transform: rotate(15deg);
    }

    45% {
        transform: rotate(-12deg);
    }

    60% {
        transform: rotate(12deg);
    }

    75% {
        transform: rotate(-6deg);
    }

    90% {
        transform: rotate(6deg);
    }
}


/* SIDE WAVES */
@keyframes wave {
    0%,
    100% {
        opacity: 0.25;
        transform: scaleY(0.6);
    }

    50% {
        opacity: 1;
        transform: scaleY(1.2);
    }
}
      `}</style>

        </main >
    );
}