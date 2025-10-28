/**
 * VIAMENTOR - Instructor Manager Performance Section
 * Section analytics performance moniteurs
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  INSTRUCTOR_MANAGER_I18N,
  type InstructorManagerLocale,
} from "@/viamentor/data/viamentor-instructor-manager-i18n";
import { MOCK_PERFORMANCE_METRICS } from "@/viamentor/data/viamentor-instructor-manager-data";

interface InstructorManagerPerformanceSectionProps {
  locale?: InstructorManagerLocale;
}

export function InstructorManagerPerformanceSection({
  locale = "fr",
}: InstructorManagerPerformanceSectionProps) {
  const t = INSTRUCTOR_MANAGER_I18N[locale];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.performance.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t.performance.subtitle}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_PERFORMANCE_METRICS.map((metric) => (
            <div key={metric.instructorId} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-medium">{metric.instructorName}</p>
                  <p className="text-sm text-muted-foreground">
                    {metric.lessonsCompleted}{" "}
                    {t.performance.lessonsCompleted.toLowerCase()} •{" "}
                    {metric.successRate}%{" "}
                    {t.performance.avgSuccessRate.toLowerCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{metric.overall}%</p>
                  <p className="text-sm text-muted-foreground">Overall</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.performance.metrics.punctuality}
                  </p>
                  <Progress value={metric.punctuality} />

                  <p className="text-sm font-medium mt-1">
                    {metric.punctuality}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.performance.metrics.pedagogy}
                  </p>
                  <Progress value={metric.pedagogy} />

                  <p className="text-sm font-medium mt-1">{metric.pedagogy}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.performance.metrics.safety}
                  </p>
                  <Progress value={metric.safety} />

                  <p className="text-sm font-medium mt-1">{metric.safety}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t.performance.metrics.communication}
                  </p>
                  <Progress value={metric.communication} />

                  <p className="text-sm font-medium mt-1">
                    {metric.communication}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
