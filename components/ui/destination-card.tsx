import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { Heart } from "lucide-react";

const cardVariants = cva(
  "relative grid h-full w-full transform-gpu overflow-hidden rounded-xl border shadow-sm transition-all duration-300 ease-in-out group",
  {
    variants: {},
    defaultVariants: {},
  }
);

export interface DestinationCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** The URL for the background image of the card. */
  imageUrl?: string;
  /** The category or region text displayed above the main title. */
  category?: string;
  /** The main title of the destination. */
  title: string;
  /** A callback function to be invoked when the like button is clicked. */
  onLike?: () => void;
  /** Determines if the destination is marked as liked. */
  isLiked?: boolean;
  /** Show like button */
  showLikeButton?: boolean;
  /** Description text below title */
  description?: string;
  /** Button text */
  buttonText?: string;
  /** Button click handler */
  onButtonClick?: () => void;
}

const DestinationCard = React.forwardRef<
  HTMLDivElement,
  DestinationCardProps
>(
  (
    {
      className,
      imageUrl,
      category,
      title,
      onLike,
      isLiked = false,
      showLikeButton = false,
      description,
      buttonText,
      onButtonClick,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ className }))}
        {...props}
      >
        {/* Background Image with Hover Animation */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.src = `https://placehold.co/600x800/2d3748/ffffff?text=Image+Not+Found`;
            }}
          />
        )}

        {/* Dark Overlay for better text readability - only if image exists */}
        {imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        )}

        {/* Like Button */}
        {showLikeButton && (
          <button
            aria-label={isLiked ? "Unlike destination" : "Like destination"}
            onClick={(e) => {
              e.preventDefault(); // Prevent card click events if any
              onLike?.();
            }}
            className={cn(
              "absolute top-4 right-4 z-20 rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all duration-200 hover:bg-white/30 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            )}
          >
            <Heart
              className={cn(
                "h-6 w-6 text-white transition-all",
                isLiked && "fill-red-500 text-red-500"
              )}
            />
          </button>
        )}

        {/* Text Content with Hover Animation */}
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white transition-transform duration-500 ease-in-out group-hover:-translate-y-2">
          {category && (
            <p className="text-sm font-medium uppercase tracking-wider text-gray-200">
              - {category} -
            </p>
          )}
          <h2 className="mt-1 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mt-3 text-sm text-gray-200">
              {description}
            </p>
          )}
          {buttonText && onButtonClick && (
            <button
              onClick={onButtonClick}
              className="mt-6 w-fit bg-white text-slate-900 hover:bg-slate-100 px-6 py-2 rounded-md font-medium transition-colors"
            >
              {buttonText}
            </button>
          )}
        </div>
      </div>
    );
  }
);

DestinationCard.displayName = "DestinationCard";

export { DestinationCard };

