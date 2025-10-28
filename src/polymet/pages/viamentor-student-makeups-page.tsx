/**
 * VIAMENTOR - Student Makeups Page
 * Page dashboard rattrapages élève
 */

"use client";

import { useState } from "react";
import { ChevronRight, AlertCircle, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  studentMakeupsTranslations,
  type StudentMakeupsLocale,
} from "@/polymet/data/viamentor-student-makeups-i18n";
import {
  MOCK_MAKEUP_CREDITS,
  type MakeupCredit,
} from "@/polymet/data/viamentor-makeups-data";

/**
 * Props
 */
interface StudentMakeupsPageProps {
  locale?: StudentMakeupsLocale;
  featureMakeupsEnabled?: boolean;
}

/**
 * Page principale
 */
export default function StudentMakeupsPage({
  locale = "fr",
  featureMakeupsEnabled = true,
}: StudentMakeupsPageProps) {
  const t = studentMakeupsTranslations[locale];

  // Mock: Filter credits for current student
  const [credits] = useState<MakeupCredit[]>(
    MOCK_MAKEUP_CREDITS.filter((c) => c.studentId === "student-1")
  );

  const availableCount = credits.filter((c) => c.status === "available").length;

  // Feature flag check
  if (!featureMakeupsEnabled) {
    return null; // Section invisible si feature disabled
  }

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{t.breadcrumb.dashboard}</span>
        <ChevronRight className="w-4 h-4" />

        <span className="text-foreground font-medium">
          {t.breadcrumb.makeups}
        </span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
      </div>

      {/* Alert disponibles */}
      {availableCount > 0 && (
        <Alert className="border-orange-500 bg-orange-50 dark:bg-orange-950">
          <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />

          <AlertDescription className="text-orange-900 dark:text-orange-100">
            {availableCount === 1
              ? t.alert.available.replace("{count}", String(availableCount))
              : t.alert.availablePlural.replace(
                  "{count}",
                  String(availableCount)
                )}
          </AlertDescription>
        </Alert>
      )}

      {/* DataTable */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
          <CardDescription>
            {credits.length} {credits.length === 1 ? "crédit" : "crédits"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {credits.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />

              <div>
                <h3 className="text-lg font-semibold">{t.table.empty.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.table.empty.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {credits.map((credit) => (
                <div
                  key={credit.id}
                  className="border border-border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {t.table.columns.originalLesson}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(credit.originalDate).toLocaleDateString(
                          locale
                        )}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          credit.status === "available"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : credit.status === "booked"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : credit.status === "used"
                                ? "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
                                : credit.status === "expired"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                                  : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100"
                        }`}
                      >
                        {t.status[credit.status]}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">
                        {t.table.columns.reason}
                      </div>
                      <div className="font-medium">
                        {t.reasons[credit.reason]}
                      </div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">
                        {t.table.columns.expiresIn}
                      </div>
                      <div className="font-medium">
                        {new Date(credit.expiresAt).toLocaleDateString(locale)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      disabled={credit.status !== "available"}
                      className={
                        credit.status === "available"
                          ? ""
                          : "cursor-not-allowed opacity-50"
                      }
                    >
                      {credit.status === "available"
                        ? t.table.actions.book
                        : credit.status === "booked"
                          ? t.table.actions.booked
                          : credit.status === "used"
                            ? t.table.actions.used
                            : credit.status === "expired"
                              ? t.table.actions.expired
                              : t.table.actions.pending}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
