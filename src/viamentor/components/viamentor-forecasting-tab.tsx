/**
 * Component - Forecasting Tab
 *
 * Tab Forecasting avec prédictions ML 12 mois futurs
 * LineChart historical + predicted, confidence interval, filters
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, RefreshCwIcon, TrendingUpIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";
import { ForecastDataPoint } from "@/viamentor/data/viamentor-analytics-data";
import {
  AnalyticsLocale,
  useAnalyticsTranslations,
  formatCurrency,
  formatPercentage,
} from "@/viamentor/data/viamentor-analytics-i18n";

export interface ForecastingTabProps {
  forecastData: ForecastDataPoint[];
  locale?: AnalyticsLocale;
  onRecalculate?: (includeSeasonality: boolean, growthRate: number) => void;
}

export function ForecastingTab({
  forecastData,
  locale = "fr",
  onRecalculate,
}: ForecastingTabProps) {
  const t = useAnalyticsTranslations(locale);
  const [includeSeasonality, setIncludeSeasonality] = useState(true);
  const [growthRateAdjustment, setGrowthRateAdjustment] = useState([0]);

  // Calculate forecast metrics
  const lastHistorical = forecastData.find(
    (d) => d.historicalMRR && !d.predictedMRR
  );
  const lastPredicted = forecastData[forecastData.length - 1];
  const predictedARR = lastPredicted.predictedMRR
    ? lastPredicted.predictedMRR * 12
    : 0;
  const expectedChurnRate = 3.5; // Mock value
  const estimatedNewMRR =
    lastPredicted.predictedMRR && lastHistorical?.historicalMRR
      ? lastPredicted.predictedMRR - lastHistorical.historicalMRR
      : 0;
  const confidenceScore = 85; // Mock value

  const handleRecalculate = () => {
    onRecalculate?.(includeSeasonality, growthRateAdjustment[0]);
  };

  return (
    <div className="space-y-6">
      {/* Intro */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-primary mt-0.5" />

            <div>
              <p className="text-sm font-medium">{t.forecastingIntro}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Ligne pleine bleue: historique 24 mois. Ligne pointillée:
                prédictions 12 mois. Zone grise: intervalle de confiance ±10%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.predictedARR}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <TrendingUpIcon className="h-4 w-4 text-green-600" />

              <p className="text-2xl font-bold">
                {formatCurrency(predictedARR, locale)}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Fin année 2025</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.expectedChurnRate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatPercentage(expectedChurnRate, locale)}
            </p>
            <Badge variant="secondary" className="mt-1 text-xs">
              Stable
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.estimatedNewMRR}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              +{formatCurrency(estimatedNewMRR, locale)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Sur 12 mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="text-xs">
              {t.confidenceScore}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{confidenceScore}%</p>
            <Badge variant="default" className="mt-1 text-xs bg-green-600">
              Élevé
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.forecastChart}</CardTitle>
          <CardDescription>
            Historique 24 mois + Prédictions 12 mois avec intervalle de
            confiance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

              <XAxis
                dataKey="month"
                className="text-xs"
                angle={-45}
                textAnchor="end"
                height={80}
              />

              <YAxis
                className="text-xs"
                tickFormatter={(value) => formatCurrency(value, locale)}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                }}
                formatter={(value: number) => formatCurrency(value, locale)}
              />

              <Legend />

              {/* Confidence Interval Area */}
              <Area
                type="monotone"
                dataKey="confidenceMax"
                stroke="none"
                fill="hsl(var(--muted))"
                fillOpacity={0.3}
                name="Intervalle confiance"
              />

              <Area
                type="monotone"
                dataKey="confidenceMin"
                stroke="none"
                fill="hsl(var(--background))"
                fillOpacity={1}
              />

              {/* Historical MRR */}
              <Line
                type="monotone"
                dataKey="historicalMRR"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                name={t.historicalMRR}
                dot={{ r: 3 }}
                connectNulls={false}
              />

              {/* Predicted MRR */}
              <Line
                type="monotone"
                dataKey="predictedMRR"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                strokeDasharray="5 5"
                name={t.predictedMRR}
                dot={{ r: 3, fill: "hsl(var(--chart-1))" }}
                connectNulls={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filters & Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Paramètres de Prévision</CardTitle>
          <CardDescription>Ajuster les hypothèses de calcul</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="seasonality">{t.includeSeasonality}</Label>
              <p className="text-xs text-muted-foreground">
                Prendre en compte les variations saisonnières
              </p>
            </div>
            <Switch
              id="seasonality"
              checked={includeSeasonality}
              onCheckedChange={setIncludeSeasonality}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{t.growthRateAssumption}</Label>
              <Badge variant="outline">
                {growthRateAdjustment[0] > 0 ? "+" : ""}
                {growthRateAdjustment[0]}%
              </Badge>
            </div>
            <Slider
              value={growthRateAdjustment}
              onValueChange={setGrowthRateAdjustment}
              min={-50}
              max={50}
              step={5}
              className="w-full"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          <Button onClick={handleRecalculate} className="w-full">
            <RefreshCwIcon className="h-4 w-4 mr-2" />

            {t.recalculateForecast}
          </Button>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription className="text-sm">
          {t.forecastDisclaimer}
        </AlertDescription>
      </Alert>
    </div>
  );
}
