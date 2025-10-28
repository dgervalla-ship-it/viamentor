/**
 * VIAMENTOR - Instructors Performance Dashboard
 * Dashboard statistiques performance avec charts et top performers
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  TrophyIcon,
  StarIcon,
  TrendingUpIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import type { PerformanceStats } from "@/polymet/data/viamentor-instructors-availability-data";

interface PerformanceDashboardProps {
  stats: PerformanceStats[];
  locale?: "fr" | "de" | "it" | "en";
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function ViamentorInstructorsPerformanceDashboard({
  stats,
  locale = "fr",
}: PerformanceDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (stats.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <TrophyIcon className="h-16 w-16 text-muted-foreground mb-4" />

          <p className="text-lg font-medium text-muted-foreground">
            Aucune statistique disponible
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Les données de performance apparaîtront ici
          </p>
        </CardContent>
      </Card>
    );
  }

  const topPerformer = stats.reduce((top, current) =>
    current.monthLessons > top.monthLessons ? current : top
  );

  const bestRated = stats.reduce((best, current) =>
    current.averageRating > best.averageRating ? current : best
  );

  const mostPunctual = stats.reduce((best, current) =>
    current.punctualityRate > best.punctualityRate ? current : best
  );

  // Prepare chart data
  const chartData = stats
    .sort((a, b) => b.monthLessons - a.monthLessons)
    .slice(0, 5)
    .map((stat) => ({
      name: stat.instructorName.split(" ")[0],
      lessons: stat.monthLessons,
      hours: stat.monthHours,
      rating: stat.averageRating,
    }));

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-0 hover:bg-transparent"
            >
              <div className="text-left">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUpIcon className="h-5 w-5" />
                  Statistiques de performance
                </CardTitle>
                <CardDescription>Performances du mois en cours</CardDescription>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </CollapsibleTrigger>
        </CardHeader>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Top Performers Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Top Performer */}
              <Card className="border-2 border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-950/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4 text-yellow-600" />
                    Top Moniteur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={topPerformer.avatar} />

                      <AvatarFallback>
                        {topPerformer.instructorName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">
                        {topPerformer.instructorName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {topPerformer.monthLessons} leçons
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {topPerformer.monthHours}h enseignées
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Best Rated */}
              <Card className="border-2 border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-blue-600 fill-blue-600" />
                    Meilleure Note
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={bestRated.avatar} />

                      <AvatarFallback>
                        {bestRated.instructorName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">
                        {bestRated.instructorName}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(bestRated.averageRating)
                                ? "text-yellow-600 fill-yellow-600"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm font-medium mt-1">
                        {bestRated.averageRating}/5
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Most Punctual */}
              <Card className="border-2 border-green-500/20 bg-green-50/50 dark:bg-green-950/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <ClockIcon className="h-4 w-4 text-green-600" />
                    Plus Ponctuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={mostPunctual.avatar} />

                      <AvatarFallback>
                        {mostPunctual.instructorName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold truncate">
                        {mostPunctual.instructorName}
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        {mostPunctual.punctualityRate}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ponctualité
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Comparison Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Comparaison des performances
                </CardTitle>
                <CardDescription>
                  Top 5 moniteurs par nombre de leçons
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={chartData}
                    layout="horizontal"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />

                    <XAxis
                      type="number"
                      stroke="hsl(var(--muted-foreground))"
                    />

                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="hsl(var(--muted-foreground))"
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--popover))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                      labelStyle={{ color: "hsl(var(--popover-foreground))" }}
                      formatter={(value: number, name: string) => {
                        if (name === "lessons") return [value, "Leçons"];
                        if (name === "hours") return [value + "h", "Heures"];
                        if (name === "rating") return [value + "/5", "Note"];
                        return [value, name];
                      }}
                    />

                    <Bar dataKey="lessons" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Detailed Stats Table */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Statistiques détaillées
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stats.map((stat, idx) => (
                    <div
                      key={stat.instructorId}
                      className="p-3 bg-muted rounded-lg"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={stat.avatar} />

                          <AvatarFallback>
                            {stat.instructorName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{stat.instructorName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              <UsersIcon className="h-3 w-3 mr-1" />
                              {stat.studentsCount} élèves
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {stat.monthLessons}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            leçons
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Heures
                          </p>
                          <p className="font-medium">{stat.monthHours}h</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">Note</p>
                          <p className="font-medium">{stat.averageRating}/5</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Complétion
                          </p>
                          <p className="font-medium">{stat.completionRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-xs">
                            Ponctualité
                          </p>
                          <p className="font-medium">{stat.punctualityRate}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
