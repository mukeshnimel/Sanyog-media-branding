"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Mohit Garg",
    role: "Local Store Owner, Churu",
    quote:
      "Great pamphlet designs for our local store in Churu. Eye-catching work that boosted foot traffic. Highly recommended for anyone needing quick, quality print design.",
    rating: 5,
  },
  {
    name: "Jay Kishan Singh",
    role: "Co-Founder, Legacy Brands",
    quote:
      "Our experience with their logo design was fantastic. They gave us several options, and each one was impressive. Eventually, the final logo we chose perfectly captured our brand. They truly have a knack for understanding what you need.",
    rating: 5,
  },
  {
    name: "Varsha Shrestha",
    role: "Exhibitor, Cosmoprof Exhibition",
    quote:
      "We used their services for Cosmoprof and they were very professional. Everything was very smooth. Good communication too. Thank you so much for your service.",
    rating: 5,
  },
  {
    name: "Harsh Panwar",
    role: "Co-Founder, Legacy Brands",
    quote:
      "We needed a logo that was both modern and had a touch of our traditional roots. Sanyog Media totally nailed it! The design is unique and we've been getting a lot of compliments. They really understood our vision.",
    rating: 5,
  },
  {
    name: "Govind Sharma",
    role: "Founder, E-Commerce Brand",
    quote:
      "Made our e-commerce online store smooth and conversion-friendly. The whole process was fast, clear, and the results speak for themselves.",
    rating: 5,
  },
];

// Header/Hero/WhyChooseUs/Portfolio/WhatWeDo/Priorities ke container ke saath consistent
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      const w = window.innerWidth;
      if (w < 768) setSlidesToShow(1);
      else if (w < 1024) setSlidesToShow(2);
      else if (w < 2560) setSlidesToShow(3);
      else setSlidesToShow(4); // 4K/QHD pe ek extra card dikhega, warna 3 cards bahut chaudi ho jaatin
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const visible = Array.from({ length: slidesToShow }, (_, i) => reviews[(index + i) % reviews.length]);

  return (
    <section className="py-14 sm:py-20 lg:py-24 4xl:py-32 bg-[#07041D] relative">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[220px] h-[220px] sm:w-[320px] sm:h-[320px] lg:w-[400px] lg:h-[400px] 4xl:w-[560px] 4xl:h-[560px] rounded-full bg-electric-blue/10 blur-[80px] sm:blur-[110px] lg:blur-[130px] pointer-events-none" />
      <div className={`${CONTAINER} ${CONTAINER_PX} relative z-10`}>
        {/* Header */}
        <div className="text-center max-w-3xl xl:max-w-4xl 4xl:max-w-5xl mx-auto mb-10 sm:mb-14 lg:mb-16 4xl:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="block text-xs sm:text-sm xl:text-base 4xl:text-lg font-bold text-sky-400 mb-2"
          >
            Testimonial
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-2xl sm:text-3xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white"
          >
            What Our Client Say About Us
          </motion.h2>
        </div>

        {/* Slider */}
        <div
          className="grid gap-5 sm:gap-6 lg:gap-8 4xl:gap-10"
          style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
        >
          {visible.map((review, slot) => (
            <div key={slot} className="relative h-full">

              {/* Static blue backing */}
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-sky-500" />

              <div className="relative rounded-2xl overflow-hidden h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={review.name}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative bg-slate-100 border-2 border-sky-500 rounded-2xl p-6 pt-7 sm:p-7 sm:pt-8 xl:p-8 xl:pt-9 4xl:p-10 4xl:pt-12 h-[280px] sm:h-[300px] 4xl:h-[360px] flex flex-col"
                  >
                    {/* Quote badge */}
                    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 4xl:w-24 4xl:h-24 bg-sky-500 rounded-tr-2xl rounded-bl-[100px] flex items-center justify-center">
                      <Quote
                        className="w-6 h-6 sm:w-8 sm:h-8 4xl:w-10 4xl:h-10 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h4 className="font-display font-bold text-base sm:text-lg xl:text-xl 4xl:text-2xl text-sky-600 mb-2 pr-12 sm:pr-14 4xl:pr-16">
                      {review.name}
                    </h4>

                    <div className="flex gap-1 mb-3 sm:mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 4xl:w-5 4xl:h-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-sm xl:text-base 4xl:text-lg text-slate-700 leading-relaxed">
                      {review.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 4xl:gap-3 mt-8 sm:mt-10 4xl:mt-14">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 4xl:h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-6 4xl:w-8 bg-sky-500" : "w-2 4xl:w-2.5 bg-slate-600"
                }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}