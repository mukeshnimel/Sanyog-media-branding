// "use client";

// import { useEffect, useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const stats = [
//   { value: 15, suffix: "+", label: "Years Experience" },
//   { value: 4.9, suffix: "/5", label: "Average Rating", isFloat: true },
//   { value: 450, suffix: "+", label: "Happy Clients" },
//   { value: 20, suffix: "+", label: "Graphics & 3D Designers" },
// ];

// function Counter({ value, suffix, isFloat }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "-100px" });

//   useEffect(() => {
//     if (!isInView) return;

//     let start = 0;
//     const end = parseFloat(value);
//     if (start === end) return;

//     const duration = 2; // seconds
//     const totalFrames = 60 * duration;
//     let frame = 0;

//     const counterInterval = setInterval(() => {
//       frame++;
//       const progress = frame / totalFrames;
//       // Ease out quad
//       const current = end * (progress * (2 - progress));

//       if (frame >= totalFrames) {
//         setCount(end);
//         clearInterval(counterInterval);
//       } else {
//         setCount(isFloat ? Math.round(current * 10) / 10 : Math.floor(current));
//       }
//     }, 1000 / 60);

//     return () => clearInterval(counterInterval);
//   }, [isInView, value, isFloat]);

//   return (
//     <span ref={ref}>
//       {count}
//       {suffix}
//     </span>
//   );
// }

// export default function Metrics() {
//   return (
//     <section className="py-20 relative bg-dark-bg border-t border-b border-glass-border">
//       {/* Decorative gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 via-transparent to-neon-cyan/5 pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
//           {stats.map((stat, idx) => (
//             <motion.div
//               key={idx}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: idx * 0.1 }}
//               className="text-center flex flex-col items-center justify-center p-6 rounded-2xl glass-card border border-glass-border bg-slate-950/20"
//             >
//               <div className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl gradient-text tracking-tight mb-2 select-none">
//                 <Counter value={stat.value} suffix={stat.suffix} isFloat={stat.isFloat} />
//               </div>
//               <p className="text-xs md:text-sm font-semibold tracking-wider text-slate-400 uppercase">
//                 {stat.label}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
