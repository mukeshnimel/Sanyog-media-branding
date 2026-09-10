"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Priorities from "@/components/Priorities";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import { Award, Zap, UserCheck, DollarSign } from "lucide-react";
import AboutHero from "@/components/AboutHero";
import MarqueeRibbon from "@/components/MarqueeRibbon";

const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

const showcaseImages = [
  "/images/home-slider/4.png",
  "/images/home-slider/5.png",
  "/images/home-slider/6.jpg",
  "/images/home-slider/7.jpg",
  "/images/home-slider/8.jpg",
  "/images/home-slider/9.jpg",
  "/images/home-slider/10.png",
  "/images/home-slider/11.jpg",
  "/images/home-slider/12.jpg",
];

const services = [
  { image: "images/about/vector-icon/1.svg", title: "Exhibition Stall Designing & Fabrication", bg: "bg-sky-600", href: "/services/exhibition-stall" },
  { image: "images/about/vector-icon/2.svg", title: "Logo Design & Branding", bg: "bg-orange-600", href: "/services/logo-design" },
  { image: "images/about/vector-icon/3.svg", title: "Website Design", bg: "bg-green-600", href: "/#services" },
  { image: "images/about/vector-icon/5.svg", title: "Graphics Design", bg: "bg-amber-500", href: "/#services" },
  { image: "images/about/vector-icon/4.svg", title: "Social Media Marketing", bg: "bg-cyan-500", href: "/#services" },
  { image: "images/about/vector-icon/6.svg", title: "Packaging Design", bg: "bg-indigo-600", href: "/#services" },
  { image: "images/about/vector-icon/7.svg", title: "Corporate Event Management", bg: "bg-rose-600", href: "/#services" },
];

function ServiceCard({ service, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={`
        group ${service.bg} rounded-2xl p-6 sm:p-8 xl:p-9 4xl:p-11
        flex flex-col items-center text-center gap-3 sm:gap-4 4xl:gap-5
        min-h-[190px] sm:min-h-[220px] xl:min-h-[250px] 4xl:min-h-[290px]
        justify-center transition-all duration-300 ease-out
        hover:scale-95 hover:shadow-2xl
      `}
    >
      <Image
        src={service.image}
        alt={service.title}
        width={50}
        height={50}
        className="
          w-[48px] h-[48px] sm:w-[60px] sm:h-[60px]
          xl:w-[70px] xl:h-[70px] 4xl:w-[84px] 4xl:h-[84px]
          object-contain brightness-0 invert
          transition-all duration-300
          group-hover:scale-75 group-hover:brightness-100 group-hover:invert-0
        "
      />

      <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
        {service.title}
      </h3>

      {/* ✅ FIX: restored the opening <a tag */}
      <a
        href={service.href}
        className="
          px-4 py-1.5 xl:px-5 xl:py-2 4xl:px-6 4xl:py-2.5
          rounded-full border-2 border-white text-white
          text-xs xl:text-sm 4xl:text-base font-bold
          hover:bg-white hover:text-slate-900 transition-colors
        "
      >
        Know More
      </a>
    </motion.div>
  );
}

export default function RedesignedAboutUsPage() {
  const globeSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);

  const { scrollYProgress: globeScrollProgress } = useScroll({
    target: globeSectionRef,
    offset: ["start end", "end start"],
  });
  const globeBgY = useTransform(globeScrollProgress, [0, 1], ["-10%", "10%"]);

  const { scrollYProgress: servicesScrollYProgress } = useScroll({
    target: servicesSectionRef,
    offset: ["start end", "end start"],
  });
  const servicesBgY = useTransform(servicesScrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <main className="flex-1 bg-dark-bg text-slate-100 overflow-x-hidden">
      <AboutHero />

      {/* 2. OUR STORY */}
      <section id="story" className="py-16 sm:py-20 md:py-24 4xl:py-32 relative border-b border-glass-border">
        <div className={`${CONTAINER} ${CONTAINER_PX}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 xl:gap-20 4xl:gap-28 items-center">
            {/* Left Narrative */}
            <div className="flex flex-col items-start pr-0 lg:pr-8 xl:pr-10 order-2 lg:order-1">
              <span className="text-sm xl:text-base 4xl:text-lg font-bold uppercase tracking-widest text-neon-cyan mb-3 sm:mb-4">
                At Sanyog Media Concepts,
              </span>

              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl xl:text-4xl 4xl:text-6xl text-white leading-tight mb-4 sm:mb-6">
                We Bring Imagination To Life Across Every Touchpoint Of Your Brand
              </h2>

              <p className="text-slate-400 text-[10px] md:text-[12px] xl:text-[15px] 4xl:text-xl leading-relaxed mb-4 sm:mb-5">
                From Bold Exhibition Stall Designs To Compelling Visual Stories,
                Our Mission Is To Transform Ideas Into Powerful Experiences.
                We Specialize In Crafting Captivating Exhibition Stalls,
                Designing Distinctive Logos That Define Your Identity, And
                Creating Eye-Catching Graphic Packaging That Makes Your Product
                Unforgettable On Any Shelf.
              </p>

              <p className="text-slate-400 text-[10px] md:text-[12px] xl:text-[15px] 4xl:text-xl leading-relaxed mb-5 sm:mb-6">
                Our Team Also Delivers Engaging Social Media Creatives,
                Flawlessly Curated Events, And Cohesive Brand Storytelling —
                All Guided By Creativity And Precision. With Every Project,
                We Aim To Not Just Meet Expectations, But Exceed Them —
                Elevating Your Brand With Designs That Speak, Sell, And Stay
                Memorable.
              </p>

              {/* ✅ FIX: restored the opening <a tag */}
              <a
                href="https://sanyogmedia.in/about-sanyog-media-branding-agency/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 sm:px-7 xl:px-8 4xl:px-10 py-2.5 sm:py-3 xl:py-3.5 4xl:py-4 rounded-xl text-sm xl:text-base 4xl:text-lg font-semibold text-white bg-[#0069C2] hover:opacity-90 transition-opacity"
              >
                Know More About Us
              </a>
            </div>

            {/* Right Image */}
            <div className="group relative w-full order-1 lg:order-2">
              <img
                src="/images/about/SMC-Churu-Landing-Page11.png"
                alt="Sanyog Media Concepts creative workspace"
                className="block w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE OFFER */}
      <section className="relative py-16 sm:py-20 md:py-24 4xl:py-32 overflow-hidden border-b border-glass-border">
        <div
          className="absolute inset-0 bg-scroll md:bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about/bg1.jpg')" }}
        />
        <div className="absolute inset-0 bg-slate-950/40" />

        <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 4xl:gap-12">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-slate-600/60 backdrop-blur-sm p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">co_present</span>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl xl:text-3xl 4xl:text-4xl text-white">
                What We Offer
              </h3>
              <p className="text-sm sm:text-base xl:text-lg 4xl:text-xl text-white/90">Why Choose Sanyog Media?</p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-sky-600 p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">diversity_2</span>
              <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
                Your Vision Our Team: Let&apos;s Create Together
              </h3>
              <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                We Are The Experts In Design, Brand Building, And Communication;
                You Are The Experts In Your Market. Let&apos;s Work Together To
                Achieve Your Goals.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-orange-600 p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">recycling</span>
              <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
                A Compelling Experience That Beckons You Back
              </h3>
              <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                This Is Because You&apos;ll Like And Trust Us; Repeat Business And
                Referrals Are The Best Compliments We Receive.
              </p>
            </motion.div>

            {/* Card 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-amber-400 p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">hourglass_check</span>
              <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
                On-Time, Every Time
              </h3>
              <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                We Respect Deadlines As Much As You Do — Fast Turnarounds Without
                Ever Compromising On Quality.
              </p>
            </motion.div>

            {/* Card 5 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-green-600 p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">currency_rupee</span>
              <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
                Transparent, Fair Pricing
              </h3>
              <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                No Hidden Costs, No Surprises — Just Honest Pricing Structured To
                Fit Your Budget.
              </p>
            </motion.div>

            {/* Card 6 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-2xl sm:rounded-3xl border-2 border-white/80 bg-orange-500 p-6 sm:p-8 xl:p-10 4xl:p-12 flex flex-col items-center justify-center text-center gap-3 sm:gap-4 4xl:gap-5 min-h-[280px] sm:min-h-[340px] xl:min-h-[380px] 4xl:min-h-[440px]"
            >
              <span className="material-symbols-outlined">bar_chart_4_bars</span>
              <h3 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-white leading-snug">
                Results You Can Measure
              </h3>
              <p className="text-sm xl:text-base 4xl:text-lg text-white/90 leading-relaxed">
                Every Project Is Tracked And Optimized To Drive Real, Measurable
                Business Growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TRUST & EXPERIENCE SHOWCASE — SWIPER.JS */}
      <section className="py-16 sm:py-20 md:py-24 4xl:py-32 bg-dark-bg relative border-b border-glass-border overflow-hidden">
        <div className={`${CONTAINER} ${CONTAINER_PX}`}>
          <div className="w-full flex justify-center text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-10 sm:mb-16 4xl:mb-20">
            <div className="flex flex-col items-center text-center">
              <span className="text-[1.25rem] xl:text-[1.5rem] 4xl:text-[1.75rem] font-bold text-sky-400">
                Trust &amp; Experience Highlighting
              </span>

              <h2 className="font-display font-bold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mt-3 sm:mt-4 whitespace-nowrap text-center">
                Your Trusted Branding &amp; Marketing Partner
              </h2>
            </div>
          </div>
        </div>

        <div className={`${CONTAINER} ${CONTAINER_PX}`}>
          <Swiper
            modules={[Autoplay]}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
              2560: { slidesPerView: 4, spaceBetween: 40 },
            }}
            speed={700}
            autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
            className="trust-coverflow-swiper !overflow-visible"
          >
            {showcaseImages.map((src, i) => (
              <SwiperSlide key={i}>
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={src}
                    alt={`Showcase ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, (max-width: 2560px) 30vw, 22vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
          .trust-coverflow-swiper { perspective: 1200px; overflow: visible !important; }
          .trust-coverflow-swiper .swiper-wrapper { align-items: center; }
          .trust-coverflow-swiper .swiper-slide { transition: transform 0.6s ease, opacity 0.6s ease; opacity: 0.7; }
          .trust-coverflow-swiper .swiper-slide-active { transform: scale(1); opacity: 1; z-index: 2; }
          .trust-coverflow-swiper .swiper-slide-prev { transform: perspective(1200px) rotateY(18deg) scale(0.92); }
          .trust-coverflow-swiper .swiper-slide-next { transform: perspective(1200px) rotateY(-18deg) scale(0.92); }
          .material-symbols-outlined { font-size: 36px !important; }
          @media (min-width: 640px) { .material-symbols-outlined { font-size: 50px !important; } }
          @media (min-width: 1920px) { .material-symbols-outlined { font-size: 60px !important; } }
        `}</style>
      </section>

      {/* 5. OUR SERVICES */}
      <section ref={servicesSectionRef} className="relative py-16 sm:py-20 md:py-24 4xl:py-32 overflow-hidden border-b border-glass-border">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-scroll md:bg-fixed bg-cover bg-center"
            style={{ backgroundImage: "url('images/about/bg2.jpg')" }}
          />
          <div className="absolute inset-0 bg-slate-950/70" />
        </div>

        <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
          <div className="w-full flex flex-col items-center text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-10 sm:mb-14 4xl:mb-18">

            <span className="text-xs sm:text-sm md:text-base xl:text-[1.5rem] 4xl:text-[1.75rem] font-bold text-sky-400 block mb-2 sm:mb-3">
              Our Services
            </span>

            <h2 className="w-fit font-display font-bold text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl text-white mb-3 sm:mb-4 text-center whitespace-nowrap">
              Elevate Your Brand with Our Diverse Solutions
            </h2>

            <p className="text-sm md:text-base xl:text-lg 4xl:text-xl font-semibold text-white/90 italic text-center">
              &ldquo;Innovative Strategies, Lasting Impressions&rdquo;
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-8 4xl:gap-10 mb-5 sm:mb-6 4xl:mb-8">
            {services.slice(0, 2).map((service, idx) => (
              <ServiceCard key={idx} service={service} delay={idx * 0.08} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 xl:gap-8 4xl:gap-10 mb-5 sm:mb-6 4xl:mb-8">
            {services.slice(2, 5).map((service, idx) => (
              <ServiceCard key={idx} service={service} delay={(idx + 2) * 0.08} />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 xl:gap-8 4xl:gap-10">
            {services.slice(5, 7).map((service, idx) => (
              <ServiceCard key={idx} service={service} delay={(idx + 5) * 0.08} />
            ))}
          </div>
        </div>
      </section>

      <Priorities />

      {/* 7. GLOBAL FABRICATION FOOTPRINT */}
      <section
        ref={globeSectionRef}
        className="relative py-20 sm:py-28 md:py-36 4xl:py-48 overflow-hidden border-b border-glass-border"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-scroll md:bg-fixed bg-cover bg-center"
            style={{ backgroundImage: "url('/images/about/bg3.png')" }}
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="max-w-5xl xl:max-w-6xl 4xl:max-w-7xl mx-auto px-4 sm:px-6 xl:px-10 4xl:px-16 relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base md:text-lg xl:text-xl 4xl:text-2xl font-medium text-lime-200 mb-4 sm:mb-6"
          >
            Our Exhibition Booth Fabrication Services in
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-bold text-white tracking-wide"
          >
            <span className="flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 4xl:gap-x-4 gap-y-2 text-xl sm:text-2xl md:text-4xl xl:text-5xl 4xl:text-6xl">
              <span>INDIA</span>
              <span className="text-white/60">|</span>
              <span>U.A.E</span>
              <span className="text-white/60">|</span>
              <span>GERMANY</span>
              <span className="text-white/60">|</span>
              <span>BANGKOK</span>
              <span className="text-white/60">|</span>
              <span>NEPAL</span>
            </span>
          </motion.h2>
        </div>
      </section>

      <Testimonials />
      <MarqueeRibbon />
      <FinalCTA />
    </main>
  );
}