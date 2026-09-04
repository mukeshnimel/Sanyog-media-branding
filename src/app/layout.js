import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Script from "next/script";

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
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
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

      <body className="min-h-full flex flex-col font-sans bg-dark-bg text-slate-100">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
