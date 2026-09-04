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

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth < 768) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
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
    <section className="py-24 bg-[#07041D] relative">
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-electric-blue/10 blur-[130px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="block text-sm font-bold text-sky-400 mb-2"
          >
            Testimonial
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-3xl md:text-5xl text-white"
          >
            What Our Client Say About Us
          </motion.h2>
        </div>

        {/* Slider */}
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${slidesToShow}, minmax(0, 1fr))` }}
        >
          {visible.map((review, slot) => (
            <div key={slot} className="relative">
              {/* Static blue backing — stays in place while the card content slides */}
              <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-2xl bg-sky-500" />

              <div className="relative rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={review.name}
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative bg-slate-100 border-2 border-sky-500 rounded-2xl p-7 pt-8 min-h-[280px] flex flex-col"
                  >
                    {/* Quote badge */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-sky-500 rounded-tr-2xl rounded-bl-[100px] flex items-center justify-center">
                      <Quote
                        className="w-8 h-8 text-white"
                        strokeWidth={1.5}
                      />
                    </div>
                    <h4 className="font-display font-bold text-lg text-sky-600 mb-2 pr-14">
                      {review.name}
                    </h4>

                    <div className="flex gap-1 mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {review.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-sky-500" : "w-2 bg-slate-600"
                }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}