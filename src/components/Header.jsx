"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "/#services",
    dropdown: [
      { name: "Logo Design & Branding", href: "/services/logo-design" },
      { name: "Website Design", href: "/services/website-design" },
      { name: "Packaging Design", href: "/services/packaging-design" },
      { name: "Social Media Marketing", href: "/services/Social-Media-Marketing" },
      { name: "Graphics Design", href: "/services/graphic-design" },
      { name: "Video/Reel Editing", href: "/services/video-reel-editing" },
      { name: "Content Creation", href: "/services/content-writing" },
    ],
  },
  { name: "About Us", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact" },
];

const rowVariants = {
  hidden: { opacity: 0, x: -8 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.04 * i, duration: 0.25, ease: "easeOut" },
  }),
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleConnectClick = (e) => {
    if (pathname === "/contact") {
      e.preventDefault();
      setIsOpen(false);
      const formElement = document.getElementById("contact-form");
      if (formElement) formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href.replace("/#", "/"));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 border-b ${scrolled
          ? "bg-black/30 backdrop-blur-xl border-white/10 py-3 4xl:py-4 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.6)]"
          : "bg-black/5 backdrop-blur-sm border-white/0 py-5 4xl:py-7"
          }`}
      >
        {/* Container ab bade screens pe bhi stretch hoga, Hero ke max-width ke consistent */}
        <div className="max-w-[1600px] 2xl:max-w-[1900px] 3xl:max-w-[2200px] 4xl:max-w-[2600px] mx-auto flex min-w-0 items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 3xl:px-20 4xl:px-24">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 shrink-0 items-center">
            <img
              src="/images/logo/SANYOG-MEDIA-CONCEPTS-BRANDING-1-scaled.png"
              alt="Sanyog Media Concepts Logo"
              className="h-9 w-auto max-w-[180px] object-contain sm:h-10 sm:max-w-[200px] md:h-11 md:max-w-none xl:h-12 4xl:h-16"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 xl:gap-6 4xl:gap-8 ml-12 xl:ml-20 4xl:ml-28">
            {navItems.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="group relative flex items-center gap-1.5 py-2 text-[16px] xl:text-[17px] 4xl:text-[21px] font-semibold text-white/90 hover:text-white transition-colors cursor-pointer">
                    <span
                      className={`absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-[2px] origin-center bg-sky-400 transition-transform duration-300 ${dropdownOpen ? "scale-y-100" : "scale-y-0"
                        }`}
                    />
                    {item.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 4xl:w-4 4xl:h-4 transition-transform duration-300 ${dropdownOpen ? "-rotate-180 text-sky-400" : ""
                        }`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, maxHeight: 0 }}
                        animate={{ opacity: 1, maxHeight: 400 }}
                        exit={{ opacity: 0, maxHeight: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 mt-4 w-64 4xl:w-80 z-[100] overflow-hidden rounded-xl border border-black/5 bg-gray-100 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.35)]"
                      >
                        <div>
                          {item.dropdown.map((service, i) => (
                            <motion.div
                              key={service.name}
                              custom={i}
                              variants={rowVariants}
                              initial="hidden"
                              animate="show"
                              className={
                                i !== item.dropdown.length - 1
                                  ? "border-b border-black/10"
                                  : ""
                              }
                            >
                              <Link
                                href={service.href}
                                className="group/row relative flex items-center px-5 py-3 4xl:px-6 4xl:py-4 text-[14px] 4xl:text-[16px] font-medium text-gray-700 transition-colors duration-200 hover:bg-[#07041D] hover:text-white"
                              >
                                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 origin-center scale-y-0 bg-sky-400 transition-transform duration-200 group-hover/row:scale-y-100" />
                                {service.name}
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative inline-flex items-center py-2 text-[16px] xl:text-[17px] 4xl:text-[21px] font-semibold text-white/90 hover:text-white transition-colors"
                >
                  <span
                    className={`absolute -left-3 top-1/2 -translate-y-1/2 h-4 w-[2px] origin-center bg-sky-400 transition-transform duration-300 ${isActive(item.href)
                      ? "scale-y-100"
                      : "scale-y-0 group-hover:scale-y-100"
                      }`}
                  />
                  <span className={isActive(item.href) ? "text-sky-300" : ""}>
                    {item.name}
                  </span>
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:block shrink-0 ml-10 xl:ml-16 4xl:ml-24">
            <Link
              href="/contact"
              onClick={handleConnectClick}
              className="relative inline-block rounded-lg bg-sky-500 px-5 py-2.5 xl:px-6 xl:py-3 4xl:px-8 4xl:py-4 text-sm xl:text-[15px] 4xl:text-lg font-semibold text-white transition-colors hover:bg-sky-400"
            >
              Connect With Us
            </Link>
          </div>

          {/* Morphing hamburger toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md md:hidden"
          >
            <div className="relative flex h-4 w-5 flex-col items-center justify-between">
              <motion.span
                animate={
                  isOpen
                    ? { rotate: 45, y: 7, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] origin-center rounded-full bg-white"
              />
              <motion.span
                animate={
                  isOpen
                    ? { opacity: 0, width: "0px" }
                    : { opacity: 1, width: "14px" }
                }
                transition={{ duration: 0.2 }}
                className="block h-[2px] self-end rounded-full bg-sky-400"
              />
              <motion.span
                animate={
                  isOpen
                    ? { rotate: -45, y: -7, width: "20px" }
                    : { rotate: 0, y: 0, width: "20px" }
                }
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="block h-[2px] origin-center rounded-full bg-white"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {/*
        FIX — this was the cause of the "blink / hang" on mobile:
        the drawer animated `clipPath` from a tiny circle to a huge one
        WHILE the same element also had `backdrop-blur-2xl` covering the
        full screen (`fixed inset-0`). Animating clip-path together with a
        full-screen backdrop-filter every frame is very GPU-expensive, and
        most phone browsers can't composite that combo smoothly — it drops
        frames and reads as the menu freezing/blinking when it opens.

        Fix: swap the clip-path reveal for a cheap opacity + transform
        animation (fully compositor-friendly, no per-frame repaint of a
        blurred surface), and back off the blur strength one notch so it
        stays smooth even on lower-end phones. Also switched the drawer
        logo from a remote URL to the same local file the header already
        uses, so it doesn't pop in late over a slow connection (which read
        as a second "blink").
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] flex flex-col overflow-x-hidden overflow-y-auto bg-[#04060b]/95 backdrop-blur-md md:hidden"
            style={{ willChange: "opacity, transform" }}
          >
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 -left-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative flex items-center justify-between px-5 pt-6 sm:px-6">
              <img
                src="/images/logo/SANYOG-MEDIA-CONCEPTS-BRANDING-1-scaled.png"
                alt="Sanyog Media Concepts Logo"
                className="h-6 w-auto max-w-[150px] object-contain sm:h-7"
              />
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70"
              >
                ✕
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-1 px-5 py-8 sm:px-6">
              {navItems.map((item, idx) =>
                item.dropdown ? (
                  <div key={item.name} className="border-b border-white/10 py-3">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex w-full items-center justify-between text-left"
                    >
                      <motion.span
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + idx * 0.05 }}
                        className="text-2xl font-semibold tracking-tight text-white sm:text-3xl"
                      >
                        {item.name}
                      </motion.span>
                      <ChevronDown
                        className={`h-5 w-5 text-white/50 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-sky-400" : ""
                          }`}
                      />
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pt-4 pb-1">
                            {item.dropdown.map((sub, i) => (
                              <motion.div
                                key={sub.name}
                                custom={i}
                                variants={rowVariants}
                                initial="hidden"
                                animate="show"
                              >
                                <Link
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block rounded-lg px-2 py-2.5 text-[15px] font-medium text-white/60 transition-colors active:bg-white/5 hover:text-white"
                                >
                                  {sub.name}
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + idx * 0.05 }}
                    className="border-b border-white/10 py-3"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-semibold tracking-tight transition-colors sm:text-3xl ${isActive(item.href) ? "text-sky-400" : "text-white"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                )
              )}
            </nav>

            <div className="relative px-5 pb-8 sm:px-6 sm:pb-10">
              <Link
                href="/contact"
                onClick={handleConnectClick}
                className="block w-full rounded-xl bg-sky-500 py-4 text-center text-base font-bold text-white transition-colors hover:bg-sky-400"
              >
                Connect With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}