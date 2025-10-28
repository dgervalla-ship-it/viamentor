/**
 * VIAMENTOR - Global Reports Page
 * Rapports consolidés multi-tenant pour Platform Admin
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon, DownloadIcon, CalendarIcon } from "lucide-react";

interface GlobalReportsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

const mockReports = [
  {
    id: "1",
    name: "Rapport mensuel revenus",
    date: "Janvier 2025",
    status: "ready",
  },
  {
    id: "2",
    name: "Rapport activité tenants",
    date: "Janvier 2025",
    status: "ready",
  },
  {
    id: "3",
    name: "Rapport utilisation features",
    date: "Janvier 2025",
    status: "processing",
  },
];

export function GlobalReportsPage({ locale = "fr" }: GlobalReportsPageProps) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Rapports Globaux
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Rapports consolidés multi-tenant
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockReports.map((report) => (
          <Card key={report.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileTextIcon className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline">
                  {report.status === "ready" ? "Prêt" : "En cours"}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">{report.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />

                  {report.date}
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-border"
                disabled={report.status !== "ready"}
              >
                <DownloadIcon className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
