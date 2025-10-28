/**
 * VIAMENTOR - Assignment Analytics
 * Analytics et statistiques attributions
 */

"use client";

import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";
import type {
  AssignmentAnalytics,
  AssignmentLocale,
} from "@/polymet/data/viamentor-assignments-data";
import { ASSIGNMENTS_TRANSLATIONS } from "@/polymet/data/viamentor-assignments-data";

// ============================================================================
// TYPES
// ============================================================================

interface AssignmentAnalyticsProps {
  analytics: AssignmentAnalytics;
  locale?: AssignmentLocale;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AssignmentAnalytics({
  analytics,
  locale = "fr",
  className,
}: AssignmentAnalyticsProps) {
  const t = ASSIGNMENTS_TRANSLATIONS[locale];

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className={className}>
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.assignmentHistory.metrics.averageDuration}
              </p>
              <p className="text-2xl font-bold mt-1">
                {analytics.metrics.averageDuration}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.assignmentHistory.days}
              </p>
            </div>
            <ClockIcon className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.assignmentHistory.metrics.reassignmentRate}
              </p>
              <p className="text-2xl font-bold mt-1">
                {analytics.metrics.reassignmentRate}%
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {locale === "fr"
                  ? "Objectif < 10%"
                  : locale === "de"
                    ? "Ziel < 10%"
                    : locale === "it"
                      ? "Obiettivo < 10%"
                      : "Target < 10%"}
              </p>
            </div>
            {analytics.metrics.reassignmentRate < 10 ? (
              <TrendingDownIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
            ) : (
              <TrendingUpIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            )}
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.assignmentHistory.metrics.satisfactionAfterAssignment}
              </p>
              <p className="text-2xl font-bold mt-1">
                {analytics.metrics.studentSatisfactionAfterAssignment.toFixed(
                  1
                )}
                /10
              </p>
              <p className="text-xs text-muted-foreground mt-1">NPS Score</p>
            </div>
            <UsersIcon className="w-8 h-8 text-primary" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.assignmentHistory.metrics.timeToAssignment}
              </p>
              <p className="text-2xl font-bold mt-1">
                {analytics.metrics.medianTimeToAssignment}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.assignmentHistory.hours}
              </p>
            </div>
            <ClockIcon className="w-8 h-8 text-primary" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assignments Per Month */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.assignmentHistory.assignmentsPerMonth}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.assignmentsPerMonth}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Line
                type="monotone"
                dataKey="count"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Instructors */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.assignmentHistory.topInstructors}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.topInstructors} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                type="number"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis
                type="category"
                dataKey="instructorName"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                width={100}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Bar
                dataKey="assignmentCount"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Reassignment Reasons */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {t.assignmentHistory.reassignmentReasons}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analytics.reassignmentReasons}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ reason, percentage }) => `${reason} ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
              >
                {analytics.reassignmentReasons.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Satisfaction Comparison */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {locale === "fr"
              ? "Satisfaction élèves"
              : locale === "de"
                ? "Schülerzufriedenheit"
                : locale === "it"
                  ? "Soddisfazione allievi"
                  : "Student Satisfaction"}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                {
                  name: t.assignmentHistory.metrics.satisfactionAfterAssignment,
                  value: analytics.metrics.studentSatisfactionAfterAssignment,
                },
                {
                  name: t.assignmentHistory.metrics
                    .satisfactionAfterReassignment,
                  value: analytics.metrics.studentSatisfactionAfterReassignment,
                },
              ]}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />

              <XAxis
                dataKey="name"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />

              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 10]}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />

              <Bar
                dataKey="value"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
