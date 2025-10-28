/**
 * VIAMENTOR - Testimonials Carousel
 * Carousel témoignages clients avec autoplay et logos partenaires
 */

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getMarketingTranslations,
  type MarketingLocale,
} from "@/viamentor/data/viamentor-marketing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface TestimonialsCarouselProps {
  locale?: MarketingLocale;
  className?: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  school: string;
  avatar: string;
  rating: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const testimonials: Testimonial[] = [
  {
    quote:
      "Viamentor a transformé notre gestion quotidienne. Nous gagnons 15h par semaine et nos élèves sont plus satisfaits.",
    author: "Sophie Martin",
    role: "Directrice",
    school: "Auto-École Lausanne",
    avatar: "https://github.com/yusufhilmi.png",
    rating: 5,
  },
  {
    quote:
      "Le planning intelligent et les QR-factures automatiques sont un game-changer. Notre chiffre d'affaires a augmenté de 30%.",
    author: "Marc Dubois",
    role: "Gérant",
    school: "École de Conduite Genève",
    avatar: "https://github.com/kdrnp.png",
    rating: 5,
  },
  {
    quote:
      "Interface intuitive, support réactif, conformité suisse parfaite. Je recommande à toutes les auto-écoles.",
    author: "Laura Schneider",
    role: "Propriétaire",
    school: "Fahrschule Zürich",
    avatar: "https://github.com/yahyabedirhan.png",
    rating: 5,
  },
];

const clientLogos = [
  "Auto-École Lausanne",
  "École de Conduite Genève",
  "Fahrschule Zürich",
  "Scuola Guida Lugano",
  "Auto-École Fribourg",
  "École de Conduite Neuchâtel",
];

// ============================================================================
// COMPONENT
// ============================================================================

export function TestimonialsCarousel({
  locale = "fr",
  className = "",
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const t = getMarketingTranslations(locale);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className={`py-24 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            {t.socialProof.title}
          </h2>
        </div>

        {/* Client Logos */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clientLogos.map((logo, index) => (
              <div
                key={index}
                className="grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-200"
              >
                <div className="h-12 px-6 flex items-center justify-center bg-card rounded-lg border border-border">
                  <span className="text-sm font-semibold text-muted-foreground">
                    {logo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-xl">
            {/* Quote */}
            <div className="mb-8">
              <svg
                className="h-12 w-12 text-primary/20 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
              </svg>
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={currentTestimonial.avatar}
                alt={currentTestimonial.author}
                className="w-16 h-16 rounded-full border-2 border-border"
              />

              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {currentTestimonial.author}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.role} • {currentTestimonial.school}
                </p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: currentTestimonial.rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
