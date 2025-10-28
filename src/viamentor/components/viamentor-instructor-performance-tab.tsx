import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  CalendarIcon,
  TrendingUpIcon,
  ClockIcon,
  StarIcon,
  UsersIcon,
  TargetIcon,
  MessageSquareIcon,
  ReplyIcon,
} from "lucide-react";
import type {
  InstructorPerformance,
  InstructorReview,
  InstructorRanking,
} from "@/viamentor/data/viamentor-instructor-detail-data";
import type { InstructorDetailLocale } from "@/viamentor/data/viamentor-instructor-detail-i18n";
import { INSTRUCTOR_DETAIL_I18N } from "@/viamentor/data/viamentor-instructor-detail-i18n";

interface PerformanceTabProps {
  performance: InstructorPerformance;
  reviews: InstructorReview[];
  ranking: InstructorRanking[];
  locale?: InstructorDetailLocale;
  onReplyReview?: (reviewId: string, reply: string) => void;
  onUpdateTarget?: (target: number) => void;
}

export function ViamentorInstructorPerformanceTab({
  performance,
  reviews,
  ranking,
  locale = "fr",
  onReplyReview,
  onUpdateTarget,
}: PerformanceTabProps) {
  const t = INSTRUCTOR_DETAIL_I18N[locale].tabs.performance;
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "1y">("30d");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [newTarget, setNewTarget] = useState(performance.target.toString());

  const CHART_COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const handleReply = (reviewId: string) => {
    if (replyText.trim() && onReplyReview) {
      onReplyReview(reviewId, replyText);
      setReplyingTo(null);
      setReplyText("");
    }
  };

  const handleUpdateTarget = () => {
    const target = parseInt(newTarget);
    if (!isNaN(target) && target > 0 && onUpdateTarget) {
      onUpdateTarget(target);
    }
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{t.title}</h3>
        <Select value={period} onValueChange={(v: any) => setPeriod(v)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">{t.periods["7d"]}</SelectItem>
            <SelectItem value="30d">{t.periods["30d"]}</SelectItem>
            <SelectItem value="90d">{t.periods["90d"]}</SelectItem>
            <SelectItem value="1y">{t.periods["1y"]}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.kpis.lessons}
                </p>
                <p className="text-2xl font-bold">{performance.lessonsCount}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-chart-1" />
            </div>
            <div className="mt-2 flex items-center text-sm">
              <TrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />

              <span className="text-green-500">
                +{performance.lessonsTrend}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.kpis.hours}</p>
                <p className="text-2xl font-bold">{performance.totalHours}h</p>
              </div>
              <ClockIcon className="h-8 w-8 text-chart-2" />
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              {t.kpis.avgPerLesson}:{" "}
              {(performance.totalHours / performance.lessonsCount).toFixed(1)}h
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t.kpis.attendance}
                </p>
                <p className="text-2xl font-bold">
                  {performance.attendanceRate}%
                </p>
              </div>
              <UsersIcon className="h-8 w-8 text-chart-3" />
            </div>
            <div className="mt-2">
              <Progress value={performance.attendanceRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.kpis.rating}</p>
                <p className="text-2xl font-bold">
                  {performance.averageRating.toFixed(1)}/5
                </p>
              </div>
              <StarIcon className="h-8 w-8 text-yellow-500 fill-yellow-500" />
            </div>
            <div className="mt-2 flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(performance.averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-muted"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lessons per Day */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {t.charts.lessonsPerDay}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performance.lessonsPerDay}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis dataKey="date" className="text-xs" />

                <YAxis className="text-xs" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  dot={{ fill: CHART_COLORS[0] }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hours by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              {t.charts.hoursByCategory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={performance.hoursByCategory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis dataKey="category" className="text-xs" />

                <YAxis className="text-xs" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />

                <Bar
                  dataKey="hours"
                  fill={CHART_COLORS[1]}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Lesson Types Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t.charts.lessonTypes}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={performance.lessonTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {performance.lessonTypes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.reviews.title}</CardTitle>
            <div className="flex items-center gap-2">
              <StarIcon className="h-5 w-5 text-yellow-500 fill-yellow-500" />

              <span className="text-xl font-bold">
                {performance.averageRating.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({reviews.length} {t.reviews.count})
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              const percentage =
                reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{stars}★</span>
                  <Progress value={percentage} className="h-2 flex-1" />

                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Reviews List */}
          <div className="space-y-4 mt-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border border-border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.studentAvatar} />

                      <AvatarFallback>
                        {review.studentName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm">{review.comment}</p>
                {review.reply ? (
                  <div className="bg-muted rounded-lg p-3 ml-8">
                    <div className="flex items-center gap-2 mb-2">
                      <ReplyIcon className="h-4 w-4 text-muted-foreground" />

                      <span className="text-sm font-medium">
                        {t.reviews.reply}
                      </span>
                    </div>
                    <p className="text-sm">{review.reply}</p>
                  </div>
                ) : (
                  <div className="ml-8">
                    {replyingTo === review.id ? (
                      <div className="space-y-2">
                        <Textarea
                          placeholder={t.reviews.replyPlaceholder}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[80px]"
                        />

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleReply(review.id)}
                          >
                            {t.reviews.send}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            {t.reviews.cancel}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setReplyingTo(review.id)}
                      >
                        <MessageSquareIcon className="h-4 w-4 mr-2" />

                        {t.reviews.replyButton}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ranking Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>{t.ranking.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {ranking.map((instructor, index) => (
              <div
                key={instructor.id}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  instructor.isCurrent
                    ? "bg-primary/10 border border-primary"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold w-8">#{index + 1}</span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={instructor.avatar} />

                    <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{instructor.name}</span>
                  {instructor.isCurrent && (
                    <Badge variant="default">{t.ranking.you}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-muted-foreground">{t.ranking.lessons}</p>
                    <p className="font-semibold">{instructor.lessonsCount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">{t.ranking.rating}</p>
                    <p className="font-semibold">
                      {instructor.rating.toFixed(1)}★
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>{t.objectives.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                {t.objectives.monthlyTarget}
              </label>
              <Input
                type="number"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                placeholder="120"
              />
            </div>
            <Button onClick={handleUpdateTarget}>
              <TargetIcon className="h-4 w-4 mr-2" />

              {t.objectives.update}
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>{t.objectives.progress}</span>
              <span className="font-semibold">
                {performance.lessonsCount} / {performance.target}{" "}
                {t.objectives.lessons}
              </span>
            </div>
            <Progress
              value={(performance.lessonsCount / performance.target) * 100}
              className="h-3"
            />

            <p className="text-sm text-muted-foreground">
              {performance.target - performance.lessonsCount > 0
                ? `${performance.target - performance.lessonsCount} ${t.objectives.remaining}`
                : t.objectives.achieved}
            </p>
          </div>

          {/* Historical Chart */}
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3">{t.objectives.history}</h4>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={performance.targetHistory}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis dataKey="month" className="text-xs" />

                <YAxis className="text-xs" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="target"
                  stroke={CHART_COLORS[3]}
                  strokeDasharray="5 5"
                  name={t.objectives.target}
                />

                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={2}
                  name={t.objectives.actual}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
