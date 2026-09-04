"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = [
  "Logo Design & Branding",
  "Website Design",
  "Packaging Design",
  "Social Media Marketing",
  "Graphics Design",
];

const portfolioData = {
  "Logo Design & Branding": [
    {
      type: "image",
      src: "/images/home/logo-design-branding/1.jpg",
      // overlayText: "Nuvos",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/2.jpg",
      // overlayText: "Korelle",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/3.jpg",
      // overlayText: "GreenSprout",
      aspect: "aspect-[16/10]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/5.jpg",
      // overlayText: "Vantra",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/4.png",
      // overlayText: "Orbix",
      aspect: "aspect-[4/5]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/6.png",
      // overlayText: "Petalo",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/7.jpg",
      // overlayText: "Brand Identity",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/8.png",
      // overlayText: "Logo Design",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/9.jpg",
      // overlayText: "Creative Branding",
      aspect: "aspect-[4/3]"
    },
    {
      type: "image",
      src: "/images/home/logo-design-branding/10.jpg",
      // overlayText: "Brand Concept",
      aspect: "aspect-[4/3]"
    },
  ],
  "Website Design": [
    { type: "image", src: "/images/home/web-design/1.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/2.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/3.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/4.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/5.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/6.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/7.png", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/web-design/8.png", aspect: "aspect-[16/10]" },
  ],
  "Packaging Design": [
    { type: "image", src: "/images/home/packaging-design/1.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/packaging-design/2.png", aspect: "aspect-[4/5]" },
    { type: "image", src: "/images/home/packaging-design/3.jpg", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/packaging-design/4.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/packaging-design/5.jpg", aspect: "aspect-[4/5]" },
    { type: "image", src: "/images/home/packaging-design/6.jpg", aspect: "aspect-[16/10]" },
  ],
  "Social Media Marketing": [
    {
      type: "image",
      src: "/images/home/Social-Media-Marketing/1.png",
      aspect: "aspect-square"
    },
    { type: "image", src: "/images/home/Social-Media-Marketing/2.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/3.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/4.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/5.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/6.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/7.png", aspect: "aspect-square" },
    { type: "image", src: "/images/home/Social-Media-Marketing/8.png", aspect: "aspect-square" },
  ],
  "Graphics Design": [
    { type: "image", src: "/images/home/graphics-design/1.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/2.png", aspect: "aspect-[27/40]" },
      { type: "image", src: "/images/home/graphics-design/12.png", aspect: "aspect-[1600/620]" },
    { type: "image", src: "/images/home/graphics-design/3.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/4.png", aspect: "aspect-[27/40]" },
  
    { type: "image", src: "/images/home/graphics-design/5.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/6.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/7.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/8.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/14.png", aspect: "aspect-[1600/620]" },
    { type: "image", src: "/images/home/graphics-design/9.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/10.png", aspect: "aspect-[27/40]" },
    { type: "image", src: "/images/home/graphics-design/11.png", aspect: "aspect-[27/40]" },
    
    { type: "image", src: "/images/home/graphics-design/13.png", aspect: "aspect-[1600/620]" },
    
  ],
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const items = portfolioData[activeCategory];

  return (
    <section id="portfolio" className="py-24 bg-[#07041D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-display font-bold text-2xl md:text-4xl text-white mb-4"
          >
            &ldquo;Your Brand Is a Story Unfolding Across All Customer
            Touchpoints&rdquo;
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-base font-medium text-sky-400"
          >
            Check Out These Samples Of Our Work
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="border-t border-b border-white py-5 mb-10">
          <div className="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-5 py-2.5 rounded-full text-x font-semibold transition-all duration-200 ${isActive
                    ? "bg-sky-500 text-white"
                    : "text-slate-300 hover:text-sky-400"
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Image Grid — changes with selected category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]"
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`relative w-full ${item.aspect} rounded-2xl overflow-hidden mb-6 break-inside-avoid border border-white/10`}
              >
                {item.type === "logo" ? (
                  <div
                    className={`w-full h-full flex items-center justify-center ${item.bg}`}
                  >
                    <span className={`text-3xl md:text-4xl ${item.nameClass}`}>
                      {item.name}
                    </span>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.src}
                      alt={`${activeCategory} sample`}
                      fill
                      className="object-cover"
                    />
                    {item.overlayText && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                          {item.overlayText}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}