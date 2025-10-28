/**
 * VIAMENTOR - Demo Video Component
 * Vidéo démo avec chapitres et player responsive
 */

"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayIcon, ClockIcon } from "lucide-react";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/polymet/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface DemoVideoProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function DemoVideo({ locale = "fr", className }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = getMarketingTranslations(locale);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`space-y-8 ${className || ""}`}>
      {/* Video Player */}
      <Card className="relative aspect-video overflow-hidden bg-muted">
        {!isPlaying ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <Button
              size="lg"
              className="h-20 w-20 rounded-full"
              onClick={handlePlay}
            >
              <PlayIcon className="h-8 w-8" />
            </Button>
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="ViaMenutor Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </Card>

      {/* Chapters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {t.demo.video.chapters.map((chapter, index) => (
          <Card
            key={index}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <ClockIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground font-medium">
                  {chapter.time}
                </div>
                <div className="text-sm font-medium">{chapter.title}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
