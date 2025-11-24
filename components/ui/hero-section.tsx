"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const quickFilters = [
  { label: "Philippines", query: "Philippines" },
  { label: "SDR Teams", query: "SDR" },
  { label: "24/7 Support", query: "24/7" },
  { label: "SigmaVerified", query: "SigmaVerified" },
];

// Company logos using Simple Icons CDN (transparent SVGs that will be filtered to white)
const companyLogos = [
  { 
    name: "Google", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/google.svg",
    fallback: "Google"
  },
  { 
    name: "Amazon", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/amazon.svg",
    fallback: "Amazon"
  },
  { 
    name: "Meta", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/meta.svg",
    fallback: "Meta"
  },
  { 
    name: "Netflix", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/netflix.svg",
    fallback: "Netflix"
  },
  { 
    name: "Salesforce", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/salesforce.svg",
    fallback: "Salesforce"
  },
  { 
    name: "Shopify", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/shopify.svg",
    fallback: "Shopify"
  },
  { 
    name: "Stripe", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/stripe.svg",
    fallback: "Stripe"
  },
  { 
    name: "Adobe", 
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/adobe.svg",
    fallback: "Adobe"
  },
];

export default function HeroSection() {
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
    <section
      className="relative flex flex-col items-center justify-start 
                 w-full min-h-screen bg-black text-white 
                 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] 
                 bg-center bg-cover pb-16 pt-20 -mt-20 overflow-hidden"
    >

      <div className="relative z-10 flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-sm mt-16 md:mt-24 mx-auto">
        <p>New: AI-powered agency matching now available</p>
        <Link href="/#ai-search" className="flex items-center gap-1 font-medium">
          Try it now
          <svg
            className="mt-0.5"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M3.959 9.5h11.083m0 0L9.501 3.96m5.541 5.54-5.541 5.542"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      <h1 className="relative z-10 text-4xl md:text-6xl text-center font-semibold max-w-3xl mt-5 px-4 leading-relaxed py-2">
        <span className="bg-gradient-to-r from-white via-white to-[#748298] bg-clip-text text-transparent inline-block" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '0.25rem' }}>
          Find and certify the right VA agency, in minutes
        </span>
      </h1>
      <p className="relative z-10 text-slate-300 md:text-base max-md:px-2 text-center max-w-2xl mt-3 px-4">
        Instantly match with verified outsourcing partners. AI-powered search. SigmaRemote integrated.
      </p>

      <form onSubmit={handleSearch} className="relative z-10 max-w-2xl mx-auto mt-8 w-full px-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by service, region, or certification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/15"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            className="h-12 px-8 bg-white text-black hover:bg-slate-100 font-medium"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Animated Image Marquee */}
      <div 
        aria-label="Trusted by leading companies"
        className="relative lg:absolute lg:bottom-0 left-0 w-full h-32 md:h-40 lg:h-2/5 mt-8 lg:mt-0 [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)]"
      >
        <motion.div
          className="flex gap-4"
          initial={{ x: 0 }}
          animate={{
            x: "-50%",
            transition: {
              ease: "linear",
              duration: 40,
              repeat: Infinity,
            },
          }}
        >
          {[
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=735&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=687&auto=format&fit=crop",
          ]
            .concat([
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=735&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=687&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=687&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1546961329-78bef0414d7c?q=80&w=687&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?q=80&w=764&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=687&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?q=80&w=687&auto=format&fit=crop",
            ])
            .map((src, index) => {
              // Cycle through company logos
              const company = companyLogos[index % companyLogos.length];
              
              return (
                <div
                  key={index}
                  className="relative aspect-[3/4] h-32 md:h-40 lg:h-48 xl:h-64 flex-shrink-0 group"
                  style={{
                    rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                  }}
                >
                  <img
                    src={src}
                    alt={`Team member ${index + 1}`}
                    className="w-full h-full object-cover rounded-2xl shadow-md"
                  />
                  <div
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 
                    flex items-center justify-center
                    px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg 
                    bg-black/85 backdrop-blur-md shadow-lg
                    transition-all duration-300 
                    group-hover:bg-black/95 group-hover:scale-110 group-hover:shadow-xl
                    border border-white/20 min-w-[60px] sm:min-w-[70px]"
                    title={`This team has past experience working with ${company.name}.`}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-3.5 sm:h-4 md:h-5 w-auto object-contain max-w-[50px] sm:max-w-[60px]"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                      onError={(e) => {
                        // Fallback to text if logo fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.fallback-text')) {
                          const fallback = document.createElement('span');
                          fallback.className = 'fallback-text text-white text-[10px] sm:text-xs font-medium whitespace-nowrap';
                          fallback.textContent = company.fallback;
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </motion.div>
      </div>
    </section>
  );
}

