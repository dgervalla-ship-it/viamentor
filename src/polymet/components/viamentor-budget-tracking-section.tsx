/**
 * VIAMENTOR - Budget Tracking Section
 * Progress bars avec alertes et table détaillée
 */

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertTriangleIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  SettingsIcon,
  ArrowRightLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import type {
  FinancialLocale,
  BudgetCategory,
  ExpenseCategory,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

interface BudgetTrackingSectionProps {
  budgetCategories: BudgetCategory[];
  locale?: FinancialLocale;
  onAdjustBudget?: (category: ExpenseCategory) => void;
  onTransferBudget?: (from: ExpenseCategory, to: ExpenseCategory) => void;
}

export function BudgetTrackingSection({
  budgetCategories,
  locale = "fr",
  onAdjustBudget,
  onTransferBudget,
}: BudgetTrackingSectionProps) {
  const t = getFinancialTranslations(locale).budget;
  const expenseT = getFinancialTranslations(locale).profitability.expenses;
  const common = getFinancialTranslations(locale).common;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(budgetCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = budgetCategories.slice(startIndex, endIndex);

  // Get status based on percentage used
  const getStatus = (percentUsed: number) => {
    if (percentUsed >= 100) return "exceeded";
    if (percentUsed >= 95) return "critical";
    if (percentUsed >= 80) return "warning";
    return "good";
  };

  // Get color based on status
  const getProgressColor = (percentUsed: number) => {
    if (percentUsed >= 100) return "bg-destructive";
    if (percentUsed >= 95) return "bg-orange-500";
    if (percentUsed >= 80) return "bg-yellow-500";
    return "bg-green-600";
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "exceeded":
        return (
          <Badge variant="destructive" className="gap-1">
            <AlertCircleIcon className="w-3 h-3" />

            {t.alert}
          </Badge>
        );

      case "critical":
        return (
          <Badge className="gap-1 bg-orange-500 hover:bg-orange-600">
            <AlertTriangleIcon className="w-3 h-3" />

            {t.warning}
          </Badge>
        );

      case "warning":
        return (
          <Badge variant="secondary" className="gap-1">
            <AlertTriangleIcon className="w-3 h-3" />

            {t.warning}
          </Badge>
        );

      default:
        return (
          <Badge
            variant="default"
            className="gap-1 bg-green-600 hover:bg-green-700"
          >
            <CheckCircleIcon className="w-3 h-3" />
            OK
          </Badge>
        );
    }
  };

  // Calculate totals
  const totalAllocated = budgetCategories.reduce(
    (sum, cat) => sum + cat.allocated,
    0
  );
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalRemaining = budgetCategories.reduce(
    (sum, cat) => sum + cat.remaining,
    0
  );
  const totalPercentUsed = (totalSpent / totalAllocated) * 100;

  // Get categories with alerts
  const criticalCategories = budgetCategories.filter(
    (cat) => cat.percentUsed >= 95
  );
  const warningCategories = budgetCategories.filter(
    (cat) => cat.percentUsed >= 80 && cat.percentUsed < 95
  );

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {criticalCategories.length > 0 && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />

          <AlertDescription>
            <span className="font-semibold">
              {criticalCategories.length} catégorie(s) en alerte:
            </span>{" "}
            {criticalCategories.map((cat) => expenseT[cat.category]).join(", ")}{" "}
            - Budget dépassé ou critique (&gt;95%)
          </AlertDescription>
        </Alert>
      )}

      {warningCategories.length > 0 && (
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangleIcon className="h-4 w-4 text-yellow-600" />

          <AlertDescription>
            <span className="font-semibold text-yellow-600">
              {warningCategories.length} catégorie(s) en attention:
            </span>{" "}
            {warningCategories.map((cat) => expenseT[cat.category]).join(", ")}{" "}
            - Budget utilisé à plus de 80%
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t.title}</span>
            <Button variant="outline" size="sm">
              {common.export}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                {t.allocated}
              </p>
              <p className="text-2xl font-bold">
                CHF {totalAllocated.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">{t.spent}</p>
              <p className="text-2xl font-bold">
                CHF {totalSpent.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalPercentUsed.toFixed(1)}% utilisé
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-1">
                {t.remaining}
              </p>
              <p className="text-2xl font-bold">
                CHF {totalRemaining.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="space-y-4">
            {budgetCategories.map((cat, index) => {
              const status = getStatus(cat.percentUsed);
              const progressColor = getProgressColor(cat.percentUsed);

              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">
                        {expenseT[cat.category]}
                      </span>
                      {getStatusBadge(status)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {cat.percentUsed.toFixed(1)}%
                    </span>
                  </div>

                  <div className="relative -mx-1">
                    <Progress
                      value={Math.min(cat.percentUsed, 100)}
                      className="h-3"
                    />

                    <div
                      className={`absolute top-0 left-0 h-3 rounded-full transition-all ${progressColor}`}
                      style={{ width: `${Math.min(cat.percentUsed, 100)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      CHF {cat.spent.toLocaleString()} / CHF{" "}
                      {cat.allocated.toLocaleString()}
                    </span>
                    <span>Restant: CHF {cat.remaining.toLocaleString()}</span>
                  </div>

                  {/* Projection warning */}
                  {cat.projectedEnd > cat.allocated && (
                    <div className="flex items-start gap-2 p-2 bg-destructive/10 border border-destructive/20 rounded text-xs">
                      <TrendingUpIcon className="w-3 h-3 text-destructive mt-0.5" />

                      <span className="text-destructive">
                        Projection fin période: CHF{" "}
                        {cat.projectedEnd.toLocaleString()} (dépassement de CHF{" "}
                        {(cat.projectedEnd - cat.allocated).toLocaleString()})
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>{common.details}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table - Hidden on mobile/tablet */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.category}</TableHead>
                  <TableHead className="text-right">{t.allocated}</TableHead>
                  <TableHead className="text-right">{t.spent}</TableHead>
                  <TableHead className="text-right">{t.remaining}</TableHead>
                  <TableHead className="text-right">{t.percentUsed}</TableHead>
                  <TableHead className="text-right">{t.projectedEnd}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((cat, index) => {
                  const status = getStatus(cat.percentUsed);
                  const isOverBudget = cat.projectedEnd > cat.allocated;

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {expenseT[cat.category]}
                      </TableCell>
                      <TableCell className="text-right">
                        CHF {cat.allocated.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        CHF {cat.spent.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            cat.remaining < 0 ? "text-destructive" : ""
                          }
                        >
                          CHF {cat.remaining.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {getStatusBadge(status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={isOverBudget ? "text-destructive" : ""}
                        >
                          CHF {cat.projectedEnd.toLocaleString()}
                        </span>
                        {isOverBudget && (
                          <div className="text-xs text-destructive">
                            +
                            {(
                              ((cat.projectedEnd - cat.allocated) /
                                cat.allocated) *
                              100
                            ).toFixed(1)}
                            %
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onAdjustBudget?.(cat.category)}
                          >
                            <SettingsIcon className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onTransferBudget?.(cat.category, "other")
                            }
                          >
                            <ArrowRightLeftIcon className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {/* Total Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell>{common.total}</TableCell>
                  <TableCell className="text-right">
                    CHF {totalAllocated.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    CHF {totalSpent.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    CHF {totalRemaining.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStatusBadge(getStatus(totalPercentUsed))}
                  </TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell className="text-right">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards - Visible on mobile/tablet only */}
          <div className="lg:hidden space-y-4">
            {currentItems.map((cat, index) => {
              const status = getStatus(cat.percentUsed);
              const isOverBudget = cat.projectedEnd > cat.allocated;

              return (
                <Card key={index} className="border-2">
                  <CardContent className="p-4 space-y-3">
                    {/* Header with category and status */}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-base">
                        {expenseT[cat.category]}
                      </h3>
                      {getStatusBadge(status)}
                    </div>

                    {/* Budget info grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm">
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {t.allocated}
                        </p>
                        <p className="font-semibold truncate">
                          CHF {cat.allocated.toLocaleString()}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {t.spent}
                        </p>
                        <p className="font-semibold truncate">
                          CHF {cat.spent.toLocaleString()}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {t.remaining}
                        </p>
                        <p
                          className={`font-semibold truncate ${cat.remaining < 0 ? "text-destructive" : ""}`}
                        >
                          CHF {cat.remaining.toLocaleString()}
                        </p>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground mb-0.5">
                          {t.percentUsed}
                        </p>
                        <p className="font-semibold truncate">
                          {cat.percentUsed.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Projection */}
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">
                        {t.projectedEnd}
                      </p>
                      <p
                        className={`font-semibold text-sm ${isOverBudget ? "text-destructive" : ""}`}
                      >
                        CHF {cat.projectedEnd.toLocaleString()}
                        {isOverBudget && (
                          <span className="ml-2 text-xs">
                            (+
                            {(
                              ((cat.projectedEnd - cat.allocated) /
                                cat.allocated) *
                              100
                            ).toFixed(1)}
                            %)
                          </span>
                        )}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 px-2"
                        onClick={() => onAdjustBudget?.(cat.category)}
                      >
                        <SettingsIcon className="w-3 h-3 mr-1" />
                        Ajuster
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 px-2"
                        onClick={() =>
                          onTransferBudget?.(cat.category, "other")
                        }
                      >
                        <ArrowRightLeftIcon className="w-3 h-3 mr-1" />
                        Transférer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Total Card */}
            <Card className="border-2 border-primary bg-muted/30">
              <CardContent className="p-4 space-y-3">
                <h3 className="font-bold text-base">{common.total}</h3>
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {t.allocated}
                    </p>
                    <p className="font-bold truncate">
                      CHF {totalAllocated.toLocaleString()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {t.spent}
                    </p>
                    <p className="font-bold truncate">
                      CHF {totalSpent.toLocaleString()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      {t.remaining}
                    </p>
                    <p className="font-bold truncate">
                      CHF {totalRemaining.toLocaleString()}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">
                      Statut
                    </p>
                    <div>{getStatusBadge(getStatus(totalPercentUsed))}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Page {currentPage} sur {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-9"
                >
                  <ChevronLeftIcon className="w-4 h-4" />

                  <span className="hidden sm:inline ml-1">Précédent</span>
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-9 h-9 p-0"
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="h-9"
                >
                  <span className="hidden sm:inline mr-1">Suivant</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default BudgetTrackingSection;
