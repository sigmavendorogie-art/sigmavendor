"use client";

import { CertificationBadge } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getBadgeMetadata } from "@/lib/certification";

export function CertificationBadgesRow({
  certifications,
}: {
  certifications: CertificationBadge[];
}) {
  if (certifications.length === 0) return null;

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {certifications.map((cert) => {
          const metadata = getBadgeMetadata(cert);
          const Icon = metadata.icon;

          return (
            <Tooltip key={cert}>
              <TooltipTrigger asChild>
                <Badge
                  variant="outline"
                  className={`${metadata.color} border flex items-center gap-1.5 cursor-help px-2.5 py-1 text-xs font-medium transition-all hover:shadow-sm`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {metadata.label}
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-semibold mb-1">{metadata.label}</p>
                <p className="text-xs text-slate-600">{metadata.explanation}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

