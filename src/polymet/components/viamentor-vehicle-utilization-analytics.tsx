/**
 * VIAMENTOR - Vehicle Utilization Analytics
 * Analytics utilisation avec heatmap jours×heures, top moniteurs/élèves, recommandations
 */

import { type UtilizationData } from "@/polymet/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangleIcon,
  TrendingUpIcon,
  ClockIcon,
  UserIcon,
} from "lucide-react";

interface VehicleUtilizationAnalyticsProps {
  data: UtilizationData;
  locale?: VehicleDetailLocale;
}

export function VehicleUtilizationAnalytics({
  data,
  locale = "fr",
}: VehicleUtilizationAnalyticsProps) {
  const t = getVehicleDetailI18n(locale).analytics;

  // Get max count for heatmap color intensity
  const maxCount = Math.max(...data.heatmap.map((d) => d.count), 1);

  // Generate heatmap grid
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h to 19h
  const days = [1, 2, 3, 4, 5, 6, 0]; // Mon-Sun

  const getHeatmapColor = (count: number) => {
    if (count === 0) return "bg-muted";
    const intensity = Math.ceil((count / maxCount) * 5);
    switch (intensity) {
      case 1:
        return "bg-green-100 dark:bg-green-950";
      case 2:
        return "bg-green-200 dark:bg-green-900";
      case 3:
        return "bg-green-300 dark:bg-green-800";
      case 4:
        return "bg-green-400 dark:bg-green-700";
      case 5:
        return "bg-green-500 dark:bg-green-600";
      default:
        return "bg-muted";
    }
  };

  const getCountForCell = (day: number, hour: number) => {
    const cell = data.heatmap.find((d) => d.day === day && d.hour === hour);
    return cell ? cell.count : 0;
  };

  return (
    <div className="space-y-6">
      {/* Inactive Days Alert */}
      {data.inactiveDays > 7 && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />

          <AlertDescription>
            <div className="space-y-1">
              <p className="font-semibold">
                {t.inactive.warning}: {data.inactiveDays} {t.inactive.days}
              </p>
              <p className="text-sm">{t.inactive.recommendation}</p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClockIcon className="h-5 w-5" />

            {t.heatmap.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Days labels */}
            <div className="flex gap-2">
              <div className="w-16" /> {/* Spacer for hours column */}
              {days.map((day) => (
                <div
                  key={day}
                  className="flex-1 text-center text-xs font-medium"
                >
                  {t.heatmap.days[day === 0 ? 6 : day - 1]}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {hours.map((hour) => (
              <div key={hour} className="flex gap-2">
                <div className="w-16 text-xs text-muted-foreground flex items-center">
                  {hour}h-{hour + 1}h
                </div>
                {days.map((day) => {
                  const count = getCountForCell(day, hour);
                  return (
                    <div
                      key={`${day}-${hour}`}
                      className={`flex-1 aspect-square rounded ${getHeatmapColor(count)} flex items-center justify-center text-xs font-medium transition-colors hover:ring-2 hover:ring-primary cursor-pointer`}
                      title={`${t.heatmap.days[day === 0 ? 6 : day - 1]} ${hour}h: ${count} leçons`}
                    >
                      {count > 0 && count}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Legend */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <span className="text-xs text-muted-foreground">Moins</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded ${level === 0 ? "bg-muted" : `bg-green-${level}00 dark:bg-green-${10 - level}00`}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Plus</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Instructors & Students */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Instructors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="h-5 w-5" />

              {t.topInstructors.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Moniteur</TableHead>
                  <TableHead className="text-right">
                    {t.topInstructors.hours}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.topInstructors.lessons}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topInstructors.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-muted-foreground py-8"
                    >
                      {t.noData}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.topInstructors.map((instructor, index) => (
                    <TableRow key={instructor.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <Badge
                              variant="default"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              1
                            </Badge>
                          )}
                          {index === 1 && (
                            <Badge
                              variant="secondary"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                          )}
                          {index === 2 && (
                            <Badge
                              variant="outline"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              3
                            </Badge>
                          )}
                          <span className="font-medium">{instructor.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.hours}h
                      </TableCell>
                      <TableCell className="text-right">
                        {instructor.lessons}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUpIcon className="h-5 w-5" />

              {t.topStudents.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead className="text-right">
                    {t.topStudents.lessons}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topStudents.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      className="text-center text-muted-foreground py-8"
                    >
                      {t.noData}
                    </TableCell>
                  </TableRow>
                ) : (
                  data.topStudents.map((student, index) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {index === 0 && (
                            <Badge
                              variant="default"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              1
                            </Badge>
                          )}
                          {index === 1 && (
                            <Badge
                              variant="secondary"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              2
                            </Badge>
                          )}
                          {index === 2 && (
                            <Badge
                              variant="outline"
                              className="h-5 w-5 p-0 flex items-center justify-center"
                            >
                              3
                            </Badge>
                          )}
                          <span className="font-medium">{student.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {student.lessons}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Inactive Days Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">{t.inactive.title}</p>
              <p className="text-xs text-muted-foreground">
                Dernière période d'inactivité
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">{data.inactiveDays}</p>
              <p className="text-xs text-muted-foreground">{t.inactive.days}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
