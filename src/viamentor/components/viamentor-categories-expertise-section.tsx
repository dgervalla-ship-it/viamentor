/**
 * VIAMENTOR - Categories Expertise Section
 * Expertise moniteurs par catégories
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type {
  CategoryExpertise,
  PerformanceLocale,
} from "@/viamentor/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/viamentor/data/viamentor-instructors-performance-i18n";

interface CategoriesExpertiseSectionProps {
  expertiseData: CategoryExpertise[];
  selectedId?: string;
  locale?: PerformanceLocale;
  onSelectInstructor?: (id: string) => void;
}

export function CategoriesExpertiseSection({
  expertiseData,
  selectedId,
  locale = "fr",
  onSelectInstructor,
}: CategoriesExpertiseSectionProps) {
  const t = performanceTranslations[locale].expertise;
  const selected =
    expertiseData.find((e) => e.instructorId === selectedId) ||
    expertiseData[0];

  // Prepare radar data
  const radarData = [
    { category: "Catégorie B", score: selected.radarScores.B, fullMark: 100 },
    { category: "Catégorie A", score: selected.radarScores.A, fullMark: 100 },
    { category: "Catégorie BE", score: selected.radarScores.BE, fullMark: 100 },
  ];

  return (
    <div className="space-y-6">
      {/* Expertise Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.table.instructor}</TableHead>
                  <TableHead
                    colSpan={4}
                    className="text-center bg-blue-50 dark:bg-blue-950"
                  >
                    Catégorie B
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="text-center bg-green-50 dark:bg-green-950"
                  >
                    Catégorie A
                  </TableHead>
                  <TableHead
                    colSpan={4}
                    className="text-center bg-purple-50 dark:bg-purple-950"
                  >
                    Catégorie BE
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead></TableHead>
                  {["B", "A", "BE"].map((cat) => (
                    <>
                      <TableHead key={`${cat}-lessons`} className="text-right">
                        {t.table.lessons}
                      </TableHead>
                      <TableHead key={`${cat}-hours`} className="text-right">
                        {t.table.hours}
                      </TableHead>
                      <TableHead key={`${cat}-success`} className="text-right">
                        {t.table.examSuccess}
                      </TableHead>
                      <TableHead key={`${cat}-rating`} className="text-right">
                        {t.table.rating}
                      </TableHead>
                    </>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {expertiseData.map((instructor) => (
                  <TableRow key={instructor.instructorId}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={instructor.avatar}
                            alt={instructor.instructorName}
                          />

                          <AvatarFallback>
                            {instructor.instructorName.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {instructor.instructorName}
                        </span>
                      </div>
                    </TableCell>
                    {(["B", "A", "BE"] as const).map((cat) => {
                      const stats = instructor.categories[cat];
                      if (!stats) {
                        return (
                          <>
                            <TableCell
                              key={`${cat}-lessons`}
                              className="text-right text-muted-foreground"
                            >
                              -
                            </TableCell>
                            <TableCell
                              key={`${cat}-hours`}
                              className="text-right text-muted-foreground"
                            >
                              -
                            </TableCell>
                            <TableCell
                              key={`${cat}-success`}
                              className="text-right text-muted-foreground"
                            >
                              -
                            </TableCell>
                            <TableCell
                              key={`${cat}-rating`}
                              className="text-right text-muted-foreground"
                            >
                              -
                            </TableCell>
                          </>
                        );
                      }
                      return (
                        <>
                          <TableCell
                            key={`${cat}-lessons`}
                            className="text-right"
                          >
                            {stats.lessonsCount}
                          </TableCell>
                          <TableCell
                            key={`${cat}-hours`}
                            className="text-right"
                          >
                            {stats.totalHours}h
                          </TableCell>
                          <TableCell
                            key={`${cat}-success`}
                            className="text-right"
                          >
                            {stats.examSuccessRate}%
                          </TableCell>
                          <TableCell
                            key={`${cat}-rating`}
                            className="text-right"
                          >
                            {stats.averageRating.toFixed(1)}
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.radar.title}</CardTitle>
            <Select
              value={selected.instructorId}
              onValueChange={onSelectInstructor}
            >
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t.radar.selectInstructor} />
              </SelectTrigger>
              <SelectContent>
                {expertiseData.map((inst) => (
                  <SelectItem key={inst.instructorId} value={inst.instructorId}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={inst.avatar}
                          alt={inst.instructorName}
                        />

                        <AvatarFallback>
                          {inst.instructorName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{inst.instructorName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid className="stroke-muted" />

                <PolarAngleAxis dataKey="category" className="text-sm" />

                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 100]}
                  className="text-xs"
                />

                <Radar
                  name={selected.instructorName}
                  dataKey="score"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.6}
                />

                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>
              Score composite: Volume leçons + Note + Taux réussite (normalisé
              0-100)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
