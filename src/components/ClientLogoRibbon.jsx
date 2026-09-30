"use client";

const logos = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `/images/client-logo/${i + 1}.png`,
}));

// Aapki globals.css me keyframe -50% tak jaati hai, iska matlab list EXACTLY 2x
// duplicate honi chahiye (2 copies = ek copy ka width hi 50% hota hai).
// 3x kar dete to har loop me visible "jump" aata, isliye 2x hi rakha hai.
const marqueeLogos = [...logos, ...logos];

export default function ClientLogoRibbon() {
    return (
        <section className="relative bg-dark-bg py-12 md:py-16 4xl:py-24 overflow-hidden">
            <div className="relative z-10 text-center mb-10 md:mb-14 4xl:mb-16 px-4">
                <h2 className="font-alata text-3xl sm:text-4xl md:text-5xl xl:text-6xl 4xl:text-7xl text-white leading-tight">
                    Our Respected Clients
                </h2>
                <p className="font-nunito text-base sm:text-lg xl:text-xl text-sky-400 mt-3">
                    Whose Confidence We Have Rightfully Gained
                </p>
            </div>

            {/* ✅ FIX 1: strip ab patli hai (fixed height), logos apne asli size (h-36...) me hi
                rehte hain aur strip ke upar-neeche se overflow ho jaate hain (overflow-visible ki wajah se) */}
            <div className="relative group bg-[#f8f7f4] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] overflow-visible h-16 sm:h-20 xl:h-24">
                <div className="absolute inset-y-0 left-0 flex w-max items-center animate-marquee group-hover:[animation-play-state:paused] overflow-visible">
                    {marqueeLogos.map((logo, idx) => (
                        <div
                            key={`${logo.id}-${idx}`}
                            className="mx-6 sm:mx-8 xl:mx-10 shrink-0 flex items-center justify-center h-36 sm:h-40 xl:h-44"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo.src}
                                alt={`Client logo ${logo.id}`}
                                className="max-h-full w-auto object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

