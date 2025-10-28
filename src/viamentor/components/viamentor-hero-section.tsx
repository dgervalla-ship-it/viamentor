/**
 * VIAMENTOR - Hero Section
 * Section hero full-height avec gradient animé, CTA conversion-optimized et mockup dashboard
 */

"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface HeroSectionProps {
  locale?: MarketingLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function HeroSection({
  locale = "fr",
  className = "",
}: HeroSectionProps) {
  const [videoOpen, setVideoOpen] = useState(false);
  const t = getMarketingTranslations(locale);

  return (
    <>
      <section
        className={`relative min-h-screen flex items-center overflow-hidden ${className}`}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950">
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />

          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                  {t.hero.title}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {t.hero.subtitle}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  asChild
                >
                  <Link to="/register">
                    {t.hero.ctaPrimary}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 font-semibold text-lg px-8 py-6 hover:bg-accent"
                  onClick={() => setVideoOpen(true)}
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />

                  {t.hero.ctaSecondary}
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-purple-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    500+ auto-écoles
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm font-medium text-muted-foreground">
                    4.9/5
                  </span>
                </div>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="relative animate-fade-in-up delay-300">
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

                {/* Dashboard Mockup */}
                <div className="relative bg-background rounded-2xl shadow-2xl border border-border overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6">
                    {/* Mock Dashboard Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="h-8 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded" />

                        <div className="flex gap-2">
                          <div className="h-8 w-8 bg-muted rounded" />

                          <div className="h-8 w-8 bg-muted rounded" />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="h-24 bg-card rounded-lg border border-border p-3 space-y-2"
                          >
                            <div className="h-3 w-16 bg-muted rounded" />

                            <div className="h-6 w-12 bg-primary/20 rounded" />
                          </div>
                        ))}
                      </div>
                      <div className="h-48 bg-card rounded-lg border border-border p-4">
                        <div className="h-full bg-gradient-to-t from-blue-100 to-transparent dark:from-blue-900 rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-bounce">
                  <div className="text-center">
                    <div className="text-2xl">+30%</div>
                    <div className="text-xs">Revenus</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Démo Viamentor</DialogTitle>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <Play className="h-16 w-16 mx-auto text-muted-foreground" />

              <p className="text-muted-foreground">
                Vidéo de démonstration (à intégrer)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
