"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface HeroSectionProps {
  backgroundImage?: string;
  logoText?: string;
  navLinks?: NavLink[];
  avatarSrcList?: string[];
  userCount?: number;
  title?: string;
  description?: string;
  quickFilters?: Array<{ label: string; query: string }>;
  footerVersion?: string;
}

const defaultQuickFilters = [
  { label: "Philippines VAs", query: "Philippines" },
  { label: "Spanish-speaking sales VAs", query: "Spanish sales" },
  { label: "24/7 support", query: "24/7" },
];

const defaultNavLinks: NavLink[] = [
  { href: "/agencies", label: "Agencies" },
  { href: "/certification", label: "Certification" },
  { href: "/#ai-search", label: "AI Search" },
];

export default function HeroSection({
  backgroundImage = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
  logoText = "SigmaVendor",
  navLinks = defaultNavLinks,
  avatarSrcList = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
  ],
  userCount = 1000,
  title = "Find and certify the right VA agency, in minutes",
  description = "Browse the directory, or describe what you need and let SigmaVendor AI suggest certified VA agencies. Integrated with SigmaRemote for global payroll.",
  quickFilters = defaultQuickFilters,
  footerVersion = "SigmaVendor v1.0",
}: HeroSectionProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/agencies?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/agencies");
    }
  };

  const handleQuickFilter = (query: string) => {
    router.push(`/agencies?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 p-6 md:p-8 z-[60]">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold text-white hover:text-gray-300 transition-colors">
            {logoText}
          </Link>
          <nav className="hidden md:flex space-x-8 text-sm">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-gray-300 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              aria-label="Search"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Search className="h-6 w-6" />
            </button>
            <Link href="/#get-matched">
              <button
                type="button"
                className="border border-white rounded-full px-6 py-2 text-sm font-medium hover:bg-white hover:text-black transition-colors text-white"
              >
                Get Matched in Minutes
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto min-h-screen flex items-center px-6 md:px-8 relative z-10">
          <div className="w-full md:w-1/2 lg:w-2/5">
            <div className="flex items-center mb-4">
              <div className="flex -space-x-2">
                {avatarSrcList.map((src, idx) => (
                  <img
                    key={idx}
                    className="h-8 w-8 rounded-full ring-2 ring-white/50"
                    src={src}
                    alt={`User avatar ${idx + 1}`}
                  />
                ))}
              </div>
              <p className="ml-3 text-sm text-gray-300">
                &lt;{userCount.toLocaleString()} users have joined
              </p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4 text-white">
              {title}
            </h1>
            <p className="text-md text-gray-300 max-w-md mb-8">
              {description}
            </p>
            <form
              className="flex w-full max-w-2xl mb-6"
              onSubmit={handleSearch}
              aria-label="Search agencies"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search agencies by name, service, or location..."
                  className="pl-10 h-12 text-base rounded-r-none border-0 focus:ring-2 focus:ring-inset focus:ring-white/50 bg-white/95 text-black placeholder:text-gray-500"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 rounded-l-none bg-white text-black font-bold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Search
              </Button>
            </form>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-300">Quick filters:</span>
              {quickFilters.map((filter) => (
                <Badge
                  key={filter.label}
                  variant="outline"
                  className="cursor-pointer hover:bg-white/20 transition-colors text-white border-white/50 hover:border-white"
                  onClick={() => handleQuickFilter(filter.query)}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-[60]">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-sm text-white/80">{footerVersion}</div>
          <button
            type="button"
            aria-label="Open chat"
            className="bg-white/10 backdrop-blur-sm rounded-full h-12 w-12 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              role="img"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>
      </footer>
    </>
  );
}

