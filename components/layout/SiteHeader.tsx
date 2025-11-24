"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/agencies", label: "Agencies" },
  { href: "/certification", label: "Certification" },
  { href: "/#ai-search", label: "AI Search" },
];

// Pages that have a dark hero section (navbar should be white initially)
const pagesWithHero = ["/"];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);

  useEffect(() => {
    const hasHero = pagesWithHero.includes(pathname || "/");
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      if (hasHero) {
        // On pages with hero, check if we've scrolled past the hero section
        const heroHeight = window.innerHeight;
        const isOverLightSection = scrollY > heroHeight * 0.8;
        setIsOverLight(isOverLightSection);
      } else {
        // On pages without hero (like /agencies), navbar should be dark from the start
        // since the background is light (bg-slate-50)
        setIsOverLight(true); // Always true for non-hero pages
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  React.useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.addEventListener("keydown", onEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const textColorClass = isOverLight ? "text-slate-900" : "text-white";
  const borderColorClass = isOverLight ? "border-slate-200" : "border-slate-700";
  const navBgClass = isOverLight && isScrolled 
    ? "bg-white/80 backdrop-blur-md" 
    : "bg-transparent";

  return (
    <header className="sticky top-0 z-50 w-full pt-2 pb-2 bg-transparent">
      <nav className={`flex items-center justify-between border mx-auto w-full max-w-7xl px-6 py-3 ${borderColorClass} rounded-full ${textColorClass} text-sm ${navBgClass} transition-all duration-300`}>
        <Link href="/" aria-label="SigmaVendor home" className="flex items-center">
          <span className={`text-xl font-bold ${textColorClass} transition-colors duration-300`}>SigmaVendor</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative overflow-hidden h-6 group ${textColorClass} transition-colors duration-300`}
            >
              <span className="block group-hover:-translate-y-full transition-transform duration-300">
                {label}
              </span>
              <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/#get-matched">
            <button className={`border ${isOverLight ? 'border-slate-300 hover:bg-slate-100' : 'border-slate-600 hover:bg-slate-800'} px-4 py-2 rounded-full text-sm font-medium transition ${textColorClass}`}>
              Get matched
            </button>
          </Link>
          <Link href="/agencies">
            <button className={`${isOverLight ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black'} px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300`}>
              Browse Agencies
            </button>
          </Link>
        </div>

        <button
          aria-label="Open menu"
          className={`md:hidden ${isOverLight ? 'text-slate-700 hover:text-slate-900' : 'text-gray-400 hover:text-gray-200'} transition-colors duration-300`}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div
          role="dialog"
          aria-modal="true"
          className={[
            "fixed inset-0 bg-black/95 backdrop-blur-sm text-base md:hidden flex-col items-center justify-center gap-4 z-50",
            mobileOpen ? "flex" : "hidden",
          ].join(" ")}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-indigo-400"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link href="/#get-matched" onClick={() => setMobileOpen(false)}>
            <button className="border border-slate-600 hover:bg-slate-800 px-4 py-2 rounded-full text-sm font-medium transition">
              Get matched
            </button>
          </Link>
          <Link href="/agencies" onClick={() => setMobileOpen(false)}>
            <button className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-100 transition duration-300">
              Browse Agencies
            </button>
          </Link>
          <button
            aria-label="Close menu"
            className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:bg-white/10"
            onClick={() => setMobileOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
}
