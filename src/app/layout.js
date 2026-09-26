import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Nunito } from "next/font/google";

import { Playfair_Display } from "next/font/google";


import { Plus_Jakarta_Sans } from "next/font/google";

import { Alata } from "next/font/google";

const alata = Alata({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alata",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});




const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});


const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});


export const metadata = {
  title: "Sanyog Media Concepts | Top-Rated Creative Branding & Digital Agency",
  description: "Top-Rated Creative Branding Agency for Logo, Web & Design Solutions. Crafting complete brand design solutions and powerful visual stories.",
  keywords: "Logo Design, Website Design, Packaging Design, Social Media Marketing, Graphics Design, Video Editing, Content Writing, Sanyog Media, Churu, Mumbai",
  openGraph: {
    title: "Sanyog Media Concepts | Top-Rated Creative Branding & Digital Agency",
    description: "Top-Rated Creative Branding Agency for Logo, Web & Design Solutions. Crafting complete brand design solutions and powerful visual stories.",
    images: [
      {
        url: "https://sanyogmedia.in/wp-content/uploads/2025/03/SANYOG-MEDIA-CONCEPTS-BRANDING-1-2048x291.png",
        width: 1200,
        height: 630,
        alt: "Sanyog Media Concepts",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} ${jakarta.variable} ${playfair.variable} ${nunito.variable} ${alata.variable} h-full  antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />

        {/* <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        /> */}
      </head>

      <body className={`${inter.variable} min-h-full flex flex-col font-sans bg-dark-bg text-slate-100`}>
        <Header />
        {children}

        {/* Call Icon - Mobile Only */}

        <a href="tel:+917226966902"
          className="floating-icon call-icon"
          aria-label="Call Us"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </a>

        {/* WhatsApp Icon - Mobile Only */}

        <a href="https://wa.me/919929600601"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
        >
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M16 0C7.164 0 0 7.163 0 16c0 2.822.738 5.587 2.14 8.03L0 32l8.16-2.11A15.92 15.92 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.27a13.22 13.22 0 0 1-6.75-1.85l-.484-.288-4.84 1.252 1.293-4.72-.316-.484A13.24 13.24 0 1 1 29.24 16 13.26 13.26 0 0 1 16 29.27z" />
            <path fill="#FFFFFF" d="M23.57 19.13c-.4-.2-2.37-1.17-2.74-1.3-.37-.14-.63-.2-.9.2-.27.4-1.03 1.3-1.26 1.57-.23.27-.46.3-.86.1-.4-.2-1.7-.63-3.24-2.01-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.62.18-.82.18-.18.4-.46.6-.7.2-.23.27-.4.4-.66.13-.27.07-.5-.03-.7-.1-.2-.9-2.17-1.24-2.97-.33-.79-.66-.68-.9-.7-.23-.01-.5-.01-.77-.01s-.7.1-1.07.5c-.37.4-1.4 1.37-1.4 3.34s1.44 3.87 1.64 4.14c.2.27 2.83 4.32 6.86 6.06.96.42 1.71.66 2.29.85.96.3 1.84.26 2.53.16.77-.12 2.37-.97 2.7-1.9.34-.94.34-1.74.24-1.9-.1-.17-.37-.27-.77-.47z" />
          </svg>
        </a>
        <Footer />
      </body >
    </html >
  );
}
