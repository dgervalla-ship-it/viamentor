/**
 * VIAMENTOR - School Admin Goals Section
 * Section Objectifs du mois pour dashboard School Admin
 *
 * FEATURES:
 * - Objectifs mensuels avec progress bars
 * - Indicateurs de progression
 * - Status on-track/off-track
 * - Grid responsive
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle, AlertCircle } from "lucide-react";
import { type SchoolAdminLocale } from "@/polymet/data/viamentor-school-admin-data";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminGoalsSectionProps {
  locale?: SchoolAdminLocale;
}

interface MonthlyGoal {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const monthlyGoals: MonthlyGoal[] = [
  { id: "1", label: "Nouveaux élèves", current: 28, target: 35, unit: "" },
  { id: "2", label: "Taux de réussite", current: 85, target: 90, unit: "%" },
  { id: "3", label: "Revenus", current: 67000, target: 75000, unit: "CHF" },
  { id: "4", label: "Satisfaction", current: 4.6, target: 4.8, unit: "/5" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ViaMenutorSchoolAdminGoalsSection({
  locale = "fr",
}: SchoolAdminGoalsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Objectifs du mois
        </CardTitle>
        <CardDescription>
          Progression vers les objectifs mensuels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {monthlyGoals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isOnTrack = percentage >= 80;
            return (
              <div key={goal.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {goal.label}
                  </span>
                  {isOnTrack ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">
                      {goal.current.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {goal.unit}
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Objectif: {goal.target.toLocaleString()}
                      {goal.unit}
                    </span>
                    <span
                      className={
                        percentage >= 100 ? "text-green-600" : "text-orange-600"
                      }
                    >
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ViaMenutorSchoolAdminGoalsSection;
