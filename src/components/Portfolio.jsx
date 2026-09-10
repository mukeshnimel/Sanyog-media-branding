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
    { type: "image", src: "/images/home/logo-design-branding/1.jpg", aspect: "aspect-[4/5]" },
    { type: "image", src: "/images/home/logo-design-branding/2.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/3.jpg", aspect: "aspect-[16/10]" },
    { type: "image", src: "/images/home/logo-design-branding/5.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/4.png", aspect: "aspect-[4/5]" },
    { type: "image", src: "/images/home/logo-design-branding/6.png", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/7.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/8.png", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/9.jpg", aspect: "aspect-[4/3]" },
    { type: "image", src: "/images/home/logo-design-branding/10.jpg", aspect: "aspect-[4/3]" },
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
    { type: "image", src: "/images/home/Social-Media-Marketing/1.png", aspect: "aspect-square" },
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

// Header/Hero/WhyChooseUs ke container ke saath consistent
const CONTAINER =
  "max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto";
const CONTAINER_PX = "px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const items = portfolioData[activeCategory];

  return (
    <section id="portfolio" className="py-14 sm:py-20 lg:py-24 4xl:py-32 bg-[#07041D]">
      <div className={`${CONTAINER} ${CONTAINER_PX}`}>
        {/* Header */}
        {/* Header */}
        <div className="w-full max-w-4xl xl:max-w-5xl 4xl:max-w-6xl mx-auto mb-8 sm:mb-10 4xl:mb-14">

          <div className="w-full flex justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="whitespace-nowrap font-display font-bold text-center text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 4xl:text-5xl text-white mb-3 sm:mb-4 leading-snug"
            >
              &ldquo;Your Brand Is a Story Unfolding Across All Customer Touchpoints&rdquo;
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="w-full text-center text-sm sm:text-base xl:text-[1.25rem] 4xl:text-[2rem] font-medium text-sky-400"
          >
            Check Out These Samples Of Our Work
          </motion.p>

        </div>

        {/* Category Tabs — horizontal scroll is intentional here (contained, not page-level) */}
        <div className="border-t border-b border-white py-4 sm:py-5 4xl:py-6 mb-8 sm:mb-10 4xl:mb-14">
          <div className="flex items-center gap-2 sm:justify-center sm:gap-3 4xl:gap-4 overflow-x-auto scrollbar-hide px-1">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 sm:px-5 sm:py-2.5 xl:px-6 xl:py-3 4xl:px-7 4xl:py-3.5 rounded-full text-xs sm:text-base xl:text-lg 4xl:text-xl font-semibold transition-all duration-200 ${isActive
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
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-3 3xl:columns-4 4xl:columns-4 gap-4 sm:gap-6 4xl:gap-8 [column-fill:_balance]"
          >
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`relative w-full ${item.aspect} rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 4xl:mb-8 break-inside-avoid border border-white/10`}
              >
                {item.type === "logo" ? (
                  <div
                    className={`w-full h-full flex items-center justify-center ${item.bg}`}
                  >
                    <span className={`text-2xl sm:text-3xl md:text-4xl 4xl:text-5xl ${item.nameClass}`}>
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1920px) 33vw, 25vw"
                    />
                    {item.overlayText && (
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <span className="text-lg sm:text-2xl md:text-3xl 4xl:text-4xl font-bold text-white drop-shadow-lg">
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