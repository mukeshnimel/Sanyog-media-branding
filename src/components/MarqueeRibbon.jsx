"use client";

import Image from "next/image";

export default function MarqueeRibbon() {
    return (
        <section className="py-0 bg-slate-950 relative overflow-hidden">
            <div className="bg-[#fff0] bg-[linear-gradient(180deg,#007EC373_0%,#07ADD01A_100%)] py-5">
                
                <div className="marquee-track flex items-center gap-16 whitespace-nowrap">
                    {[...Array(2)].map((_, setIdx) => (
                        <div
                            key={setIdx}
                            className="flex items-center gap-16 shrink-0"
                        >
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-4 shrink-0"
                                >
                                    {/* ICON */}
                                    <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                                        <Image
                                            src="https://sanyogmedia.in/wp-content/uploads/2024/11/SMC-Churu-Landing-Page-2.png"
                                            alt="Sanyog Media Icon"
                                            width={40}
                                            height={40}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* TEXT */}
                                    <span className="font-display font-bold text-2xl md:text-3xl text-white tracking-wide">
                                        We Build Brand
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            </div>

            <style jsx global>{`
                .marquee-track {
                    width: max-content;
                    animation: marquee-scroll 25s linear infinite;
                }

                @keyframes marquee-scroll {
                    0% {
                        transform: translateX(0);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
}