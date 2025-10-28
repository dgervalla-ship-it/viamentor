/**
 * Component - Cohorts Analysis Tab
 *
 * Tab Cohorts avec heatmap retention matrix, table metrics LTV
 * Gradient 0% rouge → 100% vert, export CSV
 */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DownloadIcon, InfoIcon } from "lucide-react";
import {
  CohortData,
  getRetentionColor,
} from "@/polymet/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
  formatCurrency,
} from "@/polymet/data/viamentor-analytics-i18n";

export interface CohortsAnalysisTabProps {
  cohorts: CohortData[];
  locale?: AnalyticsLocale;
  onExportCSV?: () => void;
}

export function CohortsAnalysisTab({
  cohorts,
  locale = "fr",
  onExportCSV,
}: CohortsAnalysisTabProps) {
  const t = useAnalyticsTranslations(locale);

  // Extract all unique months for heatmap columns
  const allMonths =
    cohorts.length > 0 ? Object.keys(cohorts[0].retentionByMonth).sort() : [];

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-primary mt-0.5" />

            <div>
              <p className="text-sm font-medium">
                Analyse rétention par cohorte d'inscription
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Chaque ligne représente un mois d'inscription. Les cellules
                montrent le % de tenants encore actifs après X mois. Gradient:{" "}
                <span className="font-medium text-red-600">0% rouge</span> →{" "}
                <span className="font-medium text-orange-600">50% orange</span>{" "}
                → <span className="font-medium text-green-600">100% vert</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Heatmap Matrix */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.retentionHeatmap}</CardTitle>
              <CardDescription>
                Matrice de rétention par cohorte
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onExportCSV}>
              <DownloadIcon className="h-4 w-4 mr-2" />

              {t.downloadCSV}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">{t.cohortMonth}</TableHead>
                  <TableHead className="text-center">{t.initialSize}</TableHead>
                  {allMonths.map((month) => (
                    <TableHead key={month} className="text-center min-w-[60px]">
                      {month}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cohorts.map((cohort) => (
                  <TableRow key={cohort.cohortMonth}>
                    <TableCell className="font-medium">
                      {cohort.cohortMonth}
                    </TableCell>
                    <TableCell className="text-center">
                      {cohort.initialSize}
                    </TableCell>
                    {allMonths.map((month) => {
                      const rate = cohort.retentionByMonth[month];
                      if (rate === undefined) {
                        return (
                          <TableCell
                            key={month}
                            className="text-center bg-muted/30"
                          >
                            —
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={month}
                          className="text-center font-medium cursor-pointer hover:opacity-80 transition-opacity"
                          style={{
                            backgroundColor: getRetentionColor(rate),
                            color: rate < 60 ? "white" : "black",
                          }}
                          title={`${cohort.cohortMonth} - ${month}: ${rate}% retention (${Math.round((cohort.initialSize * rate) / 100)}/${cohort.initialSize} tenants)`}
                        >
                          {rate}%
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Cohort Metrics Table */}
      <Card>
        <CardHeader>
          <CardTitle>Métriques par Cohorte</CardTitle>
          <CardDescription>
            Calculs LTV, rétention et churn médian
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.cohort}</TableHead>
                <TableHead className="text-right">{t.initialSize}</TableHead>
                <TableHead className="text-right">{t.currentActive}</TableHead>
                <TableHead className="text-right">{t.retentionRate}</TableHead>
                <TableHead className="text-right">{t.averageLTV}</TableHead>
                <TableHead className="text-right">{t.churnMonth}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cohorts.map((cohort) => (
                <TableRow key={cohort.cohortMonth}>
                  <TableCell className="font-medium">
                    {cohort.cohortMonth}
                  </TableCell>
                  <TableCell className="text-right">
                    {cohort.initialSize}
                  </TableCell>
                  <TableCell className="text-right">
                    {cohort.currentActive}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      style={{
                        backgroundColor: getRetentionColor(
                          cohort.retentionRate
                        ),
                        color: cohort.retentionRate < 60 ? "white" : "black",
                        borderColor: "transparent",
                      }}
                    >
                      {cohort.retentionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(cohort.averageLTV, locale)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">
                      M{cohort.medianChurnMonth}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              Total Tenants (All Cohorts)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {cohorts.reduce((sum, c) => sum + c.initialSize, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              Currently Active
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {cohorts.reduce((sum, c) => sum + c.currentActive, 0)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              Avg Retention Rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {(
                cohorts.reduce((sum, c) => sum + c.retentionRate, 0) /
                cohorts.length
              ).toFixed(1)}
              %
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">Avg LTV</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(
                cohorts.reduce((sum, c) => sum + c.averageLTV, 0) /
                  cohorts.length,
                locale
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
