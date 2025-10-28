/**
 * VIAMENTOR - School Admin Charts Section
 * Section Charts pour dashboard School Admin
 *
 * FEATURES:
 * - Graphique revenus (Area Chart)
 * - Graphique taux de réussite (Bar Chart)
 * - Responsive grid
 * - Recharts integration
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
} from "recharts";
import { DollarSign, Award } from "lucide-react";
import { type SchoolAdminLocale } from "@/viamentor/data/viamentor-school-admin-data";

// ============================================================================
// TYPES
// ============================================================================

interface SchoolAdminChartsSectionProps {
  locale?: SchoolAdminLocale;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const revenueData = [
  { month: "Jan", revenue: 45000, target: 50000 },
  { month: "Fév", revenue: 52000, target: 50000 },
  { month: "Mar", revenue: 48000, target: 50000 },
  { month: "Avr", revenue: 61000, target: 55000 },
  { month: "Mai", revenue: 55000, target: 55000 },
  { month: "Juin", revenue: 67000, target: 60000 },
];

const successRateData = [
  { month: "Jan", theory: 85, practical: 72 },
  { month: "Fév", theory: 88, practical: 75 },
  { month: "Mar", theory: 82, practical: 78 },
  { month: "Avr", theory: 90, practical: 80 },
  { month: "Mai", theory: 87, practical: 82 },
  { month: "Juin", theory: 92, practical: 85 },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function ViamentorSchoolAdminChartsSection({
  locale = "fr",
}: SchoolAdminChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Graphique Revenus */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Évolution des revenus
          </CardTitle>
          <CardDescription>Comparaison objectif vs réalisé</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.3}
                  />

                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />

              <YAxis stroke="hsl(var(--muted-foreground))" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                fill="url(#colorRevenue)"
                name="Revenus"
              />

              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--chart-2))"
                strokeDasharray="5 5"
                name="Objectif"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Graphique Taux de réussite */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-600" />
            Taux de réussite examens
          </CardTitle>
          <CardDescription>Théorie vs Pratique</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={successRateData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />

              <YAxis stroke="hsl(var(--muted-foreground))" />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Legend />

              <Bar
                dataKey="theory"
                fill="hsl(var(--chart-3))"
                name="Théorie"
                radius={[4, 4, 0, 0]}
              />

              <Bar
                dataKey="practical"
                fill="hsl(var(--chart-4))"
                name="Pratique"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default ViamentorSchoolAdminChartsSection;
