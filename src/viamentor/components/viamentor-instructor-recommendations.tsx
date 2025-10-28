/**
 * VIAMENTOR - Instructor Recommendations
 * Liste recommandations moniteurs triés par score avec stats détaillées
 */

"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  UserIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon,
  AlertTriangleIcon,
  CheckCircle2Icon,
} from "lucide-react";
import type {
  AssignmentRecommendation,
  AssignmentLocale,
} from "@/viamentor/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/viamentor/data/viamentor-assignments-data";
import {
  getLanguageFlag,
  getScoreColor,
} from "@/viamentor/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorRecommendationsProps {
  recommendations: AssignmentRecommendation[];
  locale?: AssignmentLocale;
  onAssign: (instructorId: string) => void;
  onViewProfile: (instructorId: string) => void;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function InstructorRecommendations({
  recommendations,
  locale = "fr",
  onAssign,
  onViewProfile,
  className,
}: InstructorRecommendationsProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];

  if (recommendations.length === 0) {
    return (
      <Card className="p-8 text-center">
        <AlertTriangleIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />

        <p className="text-muted-foreground">
          {locale === "fr"
            ? "Aucun moniteur disponible pour cette catégorie"
            : locale === "de"
              ? "Kein Fahrlehrer für diese Kategorie verfügbar"
              : locale === "it"
                ? "Nessun istruttore disponibile per questa categoria"
                : "No instructor available for this category"}
        </p>
      </Card>
    );
  }

  return (
    <div className={className}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{t.recommendations}</h3>
        <p className="text-sm text-muted-foreground">
          {t.recommendationsSubtitle}
        </p>
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation) => {
          const { instructor, score, rank, reasons, warnings } = recommendation;
          const utilization =
            (instructor.activeStudents / instructor.maxCapacity) * 100;
          const availableHours =
            instructor.availableHours - instructor.weeklyHours;

          return (
            <Card
              key={instructor.instructorId}
              className="p-6 hover:shadow-lg transition-all duration-200 hover:-translate-y-1 relative"
            >
              {/* Rank Badge */}
              {rank === 1 && (
                <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                  <CheckCircle2Icon className="w-3 h-3 mr-1" />

                  {locale === "fr"
                    ? "Recommandé"
                    : locale === "de"
                      ? "Empfohlen"
                      : locale === "it"
                        ? "Raccomandato"
                        : "Recommended"}
                </Badge>
              )}

              <div className="flex items-start gap-4">
                {/* Avatar */}
                <Avatar className="w-16 h-16">
                  <AvatarImage src={instructor.instructorAvatar} />

                  <AvatarFallback>
                    {instructor.instructorName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div>
                    <h4 className="text-lg font-bold">
                      {instructor.instructorName}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      {instructor.categories.map((cat) => (
                        <Badge key={cat} variant="outline">
                          {cat}
                        </Badge>
                      ))}
                      <div className="flex items-center gap-1 ml-2">
                        {instructor.languages.map((lang) => (
                          <span key={lang} className="text-lg">
                            {getLanguageFlag(lang)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Active Students */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <UserIcon className="w-4 h-4" />

                        <span>{t.activeStudents}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">
                            {instructor.activeStudents}/{instructor.maxCapacity}
                          </span>
                          <span className="text-muted-foreground">
                            {utilization.toFixed(0)}%
                          </span>
                        </div>
                        <Progress value={utilization} className="h-2" />
                      </div>
                    </div>

                    {/* Weekly Hours */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ClockIcon className="w-4 h-4" />

                        <span>{t.weeklyHours}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-semibold">
                            {instructor.weeklyHours}h/
                            {instructor.availableHours}h
                          </span>
                          <span className="text-muted-foreground">
                            {availableHours}h
                          </span>
                        </div>
                        <Progress
                          value={
                            (instructor.weeklyHours /
                              instructor.availableHours) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>

                    {/* Score */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <StarIcon className="w-4 h-4" />

                        <span>{t.availabilityScore}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          style={{
                            backgroundColor: getScoreColor(score),
                            color: "white",
                          }}
                          className="text-lg font-bold"
                        >
                          {score}/100
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <StarIcon className="w-3 h-3 fill-yellow-500 text-yellow-500" />

                          <span>{instructor.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reasons */}
                  {reasons.length > 0 && (
                    <div className="space-y-1">
                      {reasons.map((reason, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2Icon className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />

                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Warnings */}
                  {warnings.length > 0 && (
                    <div className="space-y-1">
                      {warnings.map((warning, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-orange-600 dark:text-orange-400"
                        >
                          <AlertTriangleIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />

                          <span>{warning}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Location */}
                  {instructor.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPinIcon className="w-4 h-4" />

                      <span>{instructor.location.city}</span>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <Button
                      onClick={() => onAssign(instructor.instructorId)}
                      className="flex-1"
                    >
                      {t.assignThisInstructor}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => onViewProfile(instructor.instructorId)}
                    >
                      {t.viewProfile}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
