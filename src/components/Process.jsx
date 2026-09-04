// "use client";

// import { motion } from "framer-motion";
// import { Sparkles, Image as ImageIcon } from "lucide-react";

// const steps = [
//   {
//     number: "01",
//     title: "Define Brand Vision",
//     desc: "Submit your design brief, target audience specifications, and color values."
//   },
//   {
//     number: "02",
//     title: "Deep Competitor Research",
//     desc: "We research competing industry visual assets and draft data-backed design blueprints."
//   },
//   {
//     number: "03",
//     title: "Drafting & Presentation Layouts",
//     desc: "Analyze drafts, suggest modifications, and fine-tune aesthetics with your dedicated designer."
//   },
//   {
//     number: "04",
//     title: "Approve, Fabricate & Launch",
//     desc: "Complete the copyright transfer, collect all high-definition source files, and launch."
//   }
// ];

// export default function Process() {
//   return (
//     <section className="py-24 bg-slate-950 border-t border-b border-glass-border relative">
//       <div className="max-w-7xl mx-auto px-6">
        
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto mb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-glass-border bg-slate-900/60 backdrop-blur-md mb-4"
//           >
//             <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
//             <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-neon-cyan">
//               Process Flow
//             </span>
//           </motion.div>

//           <motion.h2
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ delay: 0.1 }}
//             className="font-display font-bold text-3xl md:text-5xl text-white mb-6"
//           >
//             Our Operational Roadmap
//           </motion.h2>
          
//           <motion.p
//             initial={{ opacity: 0, y: 15 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ delay: 0.2 }}
//             className="text-base text-slate-400"
//           >
//             How Sanyog Media Concepts makes it easy to bring your ideas to life.
//           </motion.p>
//         </div>

//         {/* Steps Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {steps.map((step, idx) => (
//             <div key={idx} className="flex flex-col items-start relative group cursor-default">
              
//               {/* Step visual placeholder */}
//               <div className="w-full aspect-[2/1] rounded-xl border border-glass-border bg-slate-900/40 mb-6 flex items-center justify-center p-3">
//                 <ImageIcon className="w-4 h-4 text-slate-500 group-hover:text-neon-cyan transition-colors mr-2" />
//                 <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
//                   Step Graphic [2:1]
//                 </span>
//               </div>

//               <div className="font-display font-black text-5xl md:text-6xl text-white/[0.04] group-hover:text-neon-cyan/10 transition-colors mb-2 select-none">
//                 {step.number}
//               </div>
              
//               <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-neon-cyan transition-colors">
//                 {step.title}
//               </h3>
              
//               <p className="text-xs text-slate-400 leading-relaxed">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }
