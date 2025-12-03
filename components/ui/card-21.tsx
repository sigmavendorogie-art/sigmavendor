import * as React from "react";

import { cn } from "@/lib/utils";


// Define the props for the PartneredSolutionCard component
interface PartneredSolutionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl: string;
  title: string;
  description: string;
  href?: string;
  themeColor: string; // e.g., "150 50% 25%" for a deep green
}

const PartneredSolutionCard = React.forwardRef<HTMLDivElement, PartneredSolutionCardProps>(
  ({ className, imageUrl, title, description, href = "#", themeColor, ...props }, ref) => {
    return (
      // The 'group' class enables hover effects on child elements
      <div
        ref={ref}
        style={{
          // @ts-ignore - CSS custom properties are valid
          "--theme-color": themeColor,
        } as React.CSSProperties}
        className={cn("group w-full h-full", className)}
        {...props}
      >
        <a
          href={href}
          className="relative block w-full h-full rounded-2xl overflow-hidden shadow-lg 
                     transition-all duration-500 ease-in-out 
                     group-hover:scale-105 group-hover:shadow-[0_0_60px_-15px_hsl(var(--theme-color)/0.6)]"
          aria-label={`Learn more about ${title}`}
          style={{
             boxShadow: `0 0 40px -15px hsl(var(--theme-color) / 0.5)`
          }}
        >
          {/* Background Image with Parallax Zoom */}
          <div
            className="absolute inset-0 bg-cover bg-center 
                       transition-transform duration-500 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${imageUrl})` }}
          />

          {/* Themed Gradient Overlay - much stronger at bottom where text is */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, hsl(var(--theme-color) / 0.98), hsl(var(--theme-color) / 0.85) 25%, hsl(var(--theme-color) / 0.5) 45%, transparent 65%)`,
            }}
          />
          
          {/* Content */}
          <div className="relative flex flex-col justify-end h-full px-6 pb-8 pt-6 text-white z-10">
            <h3 className="text-3xl font-bold tracking-tight">
              {title}
            </h3>
            <p className="text-sm text-white/80 mt-2 font-medium">{description}</p>
          </div>
        </a>
      </div>
    );
  }
);

PartneredSolutionCard.displayName = "PartneredSolutionCard";

export { PartneredSolutionCard };

