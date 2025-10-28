/**
 * VIAMENTOR - Instructor Detail Analytics
 * Détail performance individuelle moniteur
 */

import {
  TrendingUpIcon,
  TrendingDownIcon,
  MinusIcon,
  StarIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import type {
  InstructorDetailStats,
  PerformanceLocale,
} from "@/polymet/data/viamentor-instructors-performance-data";
import { performanceTranslations } from "@/polymet/data/viamentor-instructors-performance-i18n";

interface InstructorDetailAnalyticsProps {
  instructors: InstructorDetailStats[];
  selectedId: string;
  locale?: PerformanceLocale;
  onSelectInstructor?: (id: string) => void;
}

export function InstructorDetailAnalytics({
  instructors,
  selectedId,
  locale = "fr",
  onSelectInstructor,
}: InstructorDetailAnalyticsProps) {
  const t = performanceTranslations[locale].detail;
  const instructor =
    instructors.find((i) => i.id === selectedId) || instructors[0];

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUpIcon className="h-4 w-4 text-green-600" />;

    if (trend < 0) return <TrendingDownIcon className="h-4 w-4 text-red-600" />;

    return <MinusIcon className="h-4 w-4 text-muted-foreground" />;
  };

  const kpis = [
    {
      label: t.kpis.lessons,
      value: instructor.period.lessonsCount,
      trend: instructor.period.lessonsTrend,
      color: "text-blue-600",
    },
    {
      label: t.kpis.hours,
      value: `${instructor.period.totalHours}h`,
      trend: instructor.period.hoursTrend,
      color: "text-purple-600",
    },
    {
      label: t.kpis.students,
      value: instructor.period.studentsCount,
      trend: instructor.period.studentsTrend,
      color: "text-green-600",
    },
    {
      label: t.kpis.rating,
      value: `${instructor.period.averageRating.toFixed(1)}/5`,
      trend: instructor.period.ratingTrend,
      color: "text-amber-600",
    },
    {
      label: t.kpis.examSuccess,
      value: `${instructor.period.examSuccessRate}%`,
      trend: instructor.period.successTrend,
      color: "text-emerald-600",
    },
    {
      label: t.kpis.occupation,
      value: `${instructor.period.occupationRate}%`,
      trend: instructor.period.occupationTrend,
      color: "text-cyan-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.title}</CardTitle>
            <Select value={selectedId} onValueChange={onSelectInstructor}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder={t.selectInstructor} />
              </SelectTrigger>
              <SelectContent>
                {instructors.map((inst) => (
                  <SelectItem key={inst.id} value={inst.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={inst.avatar} alt={inst.name} />

                        <AvatarFallback>
                          {inst.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{inst.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />

              <AvatarFallback>
                {instructor.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-bold">{instructor.name}</h3>
              <div className="flex gap-2">
                {instructor.categories.map((cat) => (
                  <Badge key={cat} variant="secondary">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPIs Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">{kpi.label}</p>
                <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                <div className="flex items-center gap-1 text-xs">
                  {getTrendIcon(kpi.trend)}
                  <span
                    className={
                      kpi.trend > 0
                        ? "text-green-600"
                        : kpi.trend < 0
                          ? "text-red-600"
                          : "text-muted-foreground"
                    }
                  >
                    {kpi.trend > 0 ? "+" : ""}
                    {kpi.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.activity.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={instructor.activityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="date" className="text-xs" />

                <YAxis className="text-xs" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />

                <Legend />

                <Bar
                  dataKey="hoursB"
                  stackId="a"
                  fill="hsl(var(--chart-1))"
                  name="Cat. B"
                />

                <Bar
                  dataKey="hoursA"
                  stackId="a"
                  fill="hsl(var(--chart-2))"
                  name="Cat. A"
                />

                <Bar
                  dataKey="hoursBE"
                  stackId="a"
                  fill="hsl(var(--chart-3))"
                  name="Cat. BE"
                />

                <Line
                  type="monotone"
                  dataKey="lessonsCount"
                  stroke="hsl(var(--chart-4))"
                  name={t.activity.lessonsPerDay}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Assigned Students */}
      <Card>
        <CardHeader>
          <CardTitle>{t.assignedStudents.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {instructor.assignedStudents.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={student.avatar} alt={student.name} />

                    <AvatarFallback>
                      {student.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.assignedStudents.category}: {student.category}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <p className="font-semibold">{student.lessonsCompleted}</p>
                    <p className="text-muted-foreground">
                      {t.assignedStudents.lessonsCompleted}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold">{student.progressionRate}%</p>
                    <p className="text-muted-foreground">
                      {t.assignedStudents.progression}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 fill-amber-500 text-amber-500" />

                    <span className="font-semibold">
                      {student.ratingGiven.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>{t.reviews.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {instructor.recentReviews.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                {t.reviews.noReviews}
              </p>
            ) : (
              instructor.recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 rounded-lg border border-border space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={review.studentAvatar}
                          alt={review.studentName}
                        />

                        <AvatarFallback>
                          {review.studentName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{review.studentName}</p>
                        <p className="text-sm text-muted-foreground">
                          {review.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                  {review.instructorReply && (
                    <div className="pl-4 border-l-2 border-border">
                      <p className="text-sm font-medium text-muted-foreground">
                        {t.reviews.reply}:
                      </p>
                      <p className="text-sm">{review.instructorReply}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
