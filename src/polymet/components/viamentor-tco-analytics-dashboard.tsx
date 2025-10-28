/**
 * VIAMENTOR - TCO Analytics Dashboard
 * Dashboard analytics TCO et prédictions ML
 */

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  DollarSignIcon,
  ActivityIcon,
  ZapIcon,
} from "lucide-react";
import {
  mockTCOAnalyses,
  mockMaintenancePredictions,
  mockVehicleHealthScores,
  compareTCO,
  type TCOAnalysis,
  type MaintenancePrediction,
} from "@/polymet/data/viamentor-maintenance-tco-analytics";

// ============================================================================
// TYPES
// ============================================================================

interface TCOAnalyticsDashboardProps {
  vehicleIds?: string[];
}

// ============================================================================
// COMPONENT
// ============================================================================

export function TCOAnalyticsDashboard({
  vehicleIds,
}: TCOAnalyticsDashboardProps) {
  const [selectedTab, setSelectedTab] = useState("tco");

  const comparison = compareTCO(mockTCOAnalyses);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold mb-1">Analytics Avancées</h3>
        <p className="text-sm text-muted-foreground">
          TCO, prédictions ML et scores de santé véhicules
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tco">
            <DollarSignIcon className="h-4 w-4 mr-2" />
            TCO
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <ZapIcon className="h-4 w-4 mr-2" />
            Prédictions ML
          </TabsTrigger>
          <TabsTrigger value="health">
            <ActivityIcon className="h-4 w-4 mr-2" />
            Santé
          </TabsTrigger>
        </TabsList>

        {/* TCO Tab */}
        <TabsContent value="tco" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Coût moyen/km
                </div>
                <div className="text-2xl font-bold">
                  CHF {comparison.averageCostPerKm.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Coût total flotte
                </div>
                <div className="text-2xl font-bold">
                  CHF {comparison.totalFleetCost.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-sm text-muted-foreground mb-1">
                  Véhicules analysés
                </div>
                <div className="text-2xl font-bold">
                  {mockTCOAnalyses.length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* TCO Details */}
          <div className="space-y-4">
            {mockTCOAnalyses.map((tco) => (
              <Card key={tco.vehicleId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {tco.vehicleName}
                    </CardTitle>
                    <Badge
                      variant={
                        tco.efficiency === "excellent" ||
                        tco.efficiency === "good"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {tco.efficiency}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-muted-foreground">Total</div>
                      <div className="text-lg font-bold">
                        CHF {tco.totalCost.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Par km
                      </div>
                      <div className="text-lg font-bold">
                        CHF {tco.costPerKm}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Par jour
                      </div>
                      <div className="text-lg font-bold">
                        CHF {tco.costPerDay}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Par leçon
                      </div>
                      <div className="text-lg font-bold">
                        CHF {tco.costPerLesson}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[
                      { label: "Maintenance", value: tco.maintenanceCost },
                      { label: "Carburant", value: tco.fuelCost },
                      { label: "Dépréciation", value: tco.depreciationCost },
                      { label: "Assurance", value: tco.insuranceCost },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="font-medium">
                          CHF {item.value.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          {mockMaintenancePredictions.map((pred) => (
            <Card key={pred.vehicleId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {pred.vehicleName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        pred.riskScore > 70 ? "destructive" : "secondary"
                      }
                    >
                      Risque: {pred.riskScore}%
                    </Badge>
                    <Badge variant="outline">
                      CHF {pred.estimatedCostNextYear.toLocaleString()} / an
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Predictions */}
                <div className="space-y-3">
                  {pred.predictions.map((p, idx) => (
                    <div
                      key={idx}
                      className="bg-muted/50 rounded-lg p-3 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{p.component}</div>
                        <Badge
                          variant={
                            p.severity === "critical"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {p.probability}%
                        </Badge>
                      </div>
                      <Progress value={p.probability} className="h-2" />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(p.estimatedDate).toLocaleDateString(
                            "fr-CH"
                          )}
                        </span>
                        <span>CHF {p.estimatedCost}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="space-y-2">
                  <div className="text-sm font-medium">
                    Actions recommandées:
                  </div>
                  {pred.recommendedActions.map((action, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      {action.includes("⚠️") ? (
                        <AlertTriangleIcon className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      )}
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Health Tab */}
        <TabsContent value="health" className="space-y-4">
          {mockVehicleHealthScores.map((score) => (
            <Card key={score.vehicleId}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    Véhicule {score.vehicleId}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">
                      {score.overallScore}
                    </div>
                    {score.trend === "improving" ? (
                      <TrendingUpIcon className="h-5 w-5 text-green-500" />
                    ) : score.trend === "declining" ? (
                      <TrendingDownIcon className="h-5 w-5 text-red-500" />
                    ) : null}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Maintenance", value: score.maintenanceScore },
                  { label: "Fiabilité", value: score.reliabilityScore },
                  { label: "Efficacité", value: score.efficiencyScore },
                  { label: "Conformité", value: score.complianceScore },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
