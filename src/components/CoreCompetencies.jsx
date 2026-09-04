'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  Package, 
  Share2, 
  Layout, 
  Video, 
  PenTool, 
  ArrowUpRight 
} from 'lucide-react';

const competencies = [
  {
    id: '01',
    title: 'Logo Design',
    description: 'Crafting timeless, memorable visual identities and logos that embody your brand essence.',
    icon: Palette,
    accent: 'from-blue-500 to-cyan-400',
  },
  {
    id: '02',
    title: 'Website Design',
    description: 'High-converting, responsive UI/UX designs built with modern web technologies.',
    icon: Globe,
    accent: 'from-cyan-500 to-teal-400',
  },
  {
    id: '03',
    title: 'Packaging Design',
    description: 'Artful, shelf-topping product packaging solutions that captivate customer attention.',
    icon: Package,
    accent: 'from-indigo-500 to-blue-400',
  },
  {
    id: '04',
    title: 'Social Media Marketing',
    description: 'Data-driven campaigns and creative content strategies to grow digital presence.',
    icon: Share2,
    accent: 'from-sky-500 to-blue-600',
  },
  {
    id: '05',
    title: 'Graphics Design',
    description: 'Brochures, posters, flyers, and promotional creatives engineered for impact.',
    icon: Layout,
    accent: 'from-blue-600 to-indigo-500',
  },
  {
    id: '06',
    title: 'Video Editing',
    description: 'High-retention reels, ads, and promotional video edits tailored for conversions.',
    icon: Video,
    accent: 'from-teal-400 to-blue-500',
  },
  {
    id: '07',
    title: 'Content Writing',
    description: 'Persuasive copywriting and strategic story building designed to boost engagement.',
    icon: PenTool,
    accent: 'from-cyan-400 to-indigo-400',
  },
];

// Framer Motion Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
};

export default function CoreCompetencies() {
  return (
    <section className="relative bg-[#0b0f19] text-white py-24 px-6 md:px-12 overflow-hidden">
      {/* Background Ambient Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-4 py-1.5 rounded-full mb-4"
          >
            What We Do Best
          </motion.span>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300">Competencies</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            End-to-end design, branding, and digital execution crafted to scale your business footprint.
          </motion.p>
        </div>

        {/* Competencies Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {competencies.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 hover:shadow-[0_10px_30px_rgba(0,102,255,0.15)] transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Gradient Glow on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />

                <div>
                  {/* Top Bar: Icon & Number */}
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-3.5 rounded-xl bg-gradient-to-br ${item.accent} bg-opacity-10 text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-mono font-semibold text-gray-500 group-hover:text-cyan-400 transition-colors">
                      {item.id}
                    </span>
                  </div>

                  {/* Card Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Action Icon */}
                <div className="flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Explore Service</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
