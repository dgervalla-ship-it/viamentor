/**
 * VIAMENTOR - Planning Import History Page
 * Page historique des imports ICS avec timeline et métriques
 */

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ImportHistoryTimeline } from "@/viamentor/components/viamentor-import-history-timeline";
import { RollbackImportDialog } from "@/viamentor/components/viamentor-rollback-import-dialog";
import {
  CalendarIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  BarChartIcon,
} from "lucide-react";
import {
  getICSImportTranslation,
  type ICSImportLocale,
} from "@/viamentor/data/viamentor-ics-import-i18n";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

// ============================================================================
// TYPES
// ============================================================================

interface PlanningImportHistoryPageProps {
  locale?: ICSImportLocale;
}

interface ImportRecord {
  id: string;
  filename: string;
  fileSize: string;
  importedAt: Date;
  importedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats: {
    created: number;
    skipped: number;
    errors: number;
  };
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockImports: ImportRecord[] = [
  {
    id: "imp-001",
    filename: "google-calendar-export.ics",
    fileSize: "2.4 MB",
    importedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    importedBy: {
      id: "user-001",
      name: "Marie Dupont",
      avatar: "https://github.com/yusufhilmi.png",
    },
    stats: {
      created: 18,
      skipped: 3,
      errors: 3,
    },
  },
  {
    id: "imp-002",
    filename: "outlook-calendar.ics",
    fileSize: "1.8 MB",
    importedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    importedBy: {
      id: "user-002",
      name: "Pierre Dubois",
      avatar: "https://github.com/kdrnp.png",
    },
    stats: {
      created: 24,
      skipped: 0,
      errors: 0,
    },
  },
  {
    id: "imp-003",
    filename: "apple-calendar.ics",
    fileSize: "3.1 MB",
    importedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    importedBy: {
      id: "user-003",
      name: "Sophie Martin",
      avatar: "https://github.com/yahyabedirhan.png",
    },
    stats: {
      created: 32,
      skipped: 2,
      errors: 1,
    },
  },
];

const mockSourcesData = [
  { name: "Google", value: 60, color: "hsl(var(--chart-1))" },
  { name: "Outlook", value: 35, color: "hsl(var(--chart-2))" },
  { name: "Apple", value: 5, color: "hsl(var(--chart-3))" },
];

const mockEvolutionData = [
  { month: "Jul", imports: 3 },
  { month: "Aug", imports: 5 },
  { month: "Sep", imports: 4 },
  { month: "Oct", imports: 7 },
  { month: "Nov", imports: 6 },
  { month: "Dec", imports: 8 },
  { month: "Jan", imports: 9 },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function PlanningImportHistoryPage({
  locale = "fr",
}: PlanningImportHistoryPageProps) {
  const t = getICSImportTranslation(locale).history;

  // State
  const [rollbackImportId, setRollbackImportId] = useState<string | null>(null);
  const [rollbackDialogOpen, setRollbackDialogOpen] = useState(false);

  // Calculate metrics
  const totalImports = mockImports.length;
  const totalEvents = mockImports.reduce(
    (sum, imp) => sum + imp.stats.created,
    0
  );
  const totalErrors = mockImports.reduce(
    (sum, imp) => sum + imp.stats.errors,
    0
  );
  const errorRate =
    totalEvents > 0 ? ((totalErrors / totalEvents) * 100).toFixed(1) : "0.0";
  const avgEvents =
    totalImports > 0 ? Math.round(totalEvents / totalImports) : 0;

  // Handlers
  const handleRollback = (importId: string) => {
    setRollbackImportId(importId);
    setRollbackDialogOpen(true);
  };

  const handleConfirmRollback = async (data: any) => {
    console.log("Rollback confirmed:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Refresh imports list
  };

  const rollbackImport = mockImports.find((imp) => imp.id === rollbackImportId);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">{t.page.breadcrumb.home}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink href="/planning">
              {t.page.breadcrumb.planning}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.page.breadcrumb.history}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.page.title}</h1>
        <p className="text-muted-foreground mt-2">{t.page.description}</p>
      </div>

      <Separator />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.metrics.totalImports}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalImports}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.metrics.totalEvents}
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.metrics.errorRate}
            </CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{errorRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.metrics.avgEvents}
            </CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgEvents}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sources Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t.metrics.sources}</CardTitle>
            <CardDescription>
              Google Calendar, Outlook, Apple Calendar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockSourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockSourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Evolution */}
        <Card>
          <CardHeader>
            <CardTitle>{t.metrics.evolution}</CardTitle>
            <CardDescription>
              {locale === "fr"
                ? "Derniers 7 mois"
                : locale === "de"
                  ? "Letzte 7 Monate"
                  : locale === "it"
                    ? "Ultimi 7 mesi"
                    : "Last 7 months"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockEvolutionData}>
                  <XAxis dataKey="month" />

                  <YAxis />

                  <ChartTooltip />

                  <Line
                    type="monotone"
                    dataKey="imports"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{t.timeline.title}</h2>
        <ImportHistoryTimeline
          imports={mockImports}
          locale={locale}
          onRollback={handleRollback}
        />
      </div>

      {/* Rollback Dialog */}
      {rollbackImport && (
        <RollbackImportDialog
          open={rollbackDialogOpen}
          onOpenChange={setRollbackDialogOpen}
          importId={rollbackImport.id}
          eventsCount={rollbackImport.stats.created}
          locale={locale}
          onConfirm={handleConfirmRollback}
        />
      )}
    </div>
  );
}
