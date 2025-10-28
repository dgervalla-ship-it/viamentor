/**
 * VIAMENTOR - Instructor Earnings Page
 * Page revenus moniteur
 */

"use client";

import { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  CalendarIcon,
  DownloadIcon,
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================

interface InstructorEarningsPageProps {
  locale?: "fr" | "de" | "it" | "en";
}

type TimePeriod = "week" | "month" | "quarter" | "year";

interface Payment {
  id: string;
  date: string;
  amount: number;
  type: "salary" | "bonus" | "commission";
  status: "paid" | "pending" | "processing";
  reference: string;
}

// ============================================================================
// TRANSLATIONS
// ============================================================================

const translations = {
  fr: {
    breadcrumb: {
      instructor: "Moniteur",
      earnings: "Mes Revenus",
    },
    title: "Mes Revenus",
    description: "Suivez vos revenus et vos paiements",
    periods: {
      week: "Cette semaine",
      month: "Ce mois",
      quarter: "Ce trimestre",
      year: "Cette année",
    },
    tabs: {
      overview: "Vue d'ensemble",
      history: "Historique",
      breakdown: "Détails",
    },
    kpis: {
      totalEarnings: "Revenus totaux",
      thisMonth: "Ce mois",
      pending: "En attente",
      avgPerLesson: "Moyenne par leçon",
      hoursWorked: "Heures travaillées",
      nextPayment: "Prochain paiement",
    },
    actions: {
      export: "Exporter",
      download: "Télécharger",
      viewInvoice: "Voir facture",
    },
    table: {
      date: "Date",
      amount: "Montant",
      type: "Type",
      status: "Statut",
      reference: "Référence",
      actions: "Actions",
    },
    types: {
      salary: "Salaire",
      bonus: "Prime",
      commission: "Commission",
    },
    status: {
      paid: "Payé",
      pending: "En attente",
      processing: "En traitement",
    },
    breakdown: {
      title: "Répartition des revenus",
      byType: "Par type",
      byMonth: "Par mois",
    },
  },
  de: {
    breadcrumb: {
      instructor: "Fahrlehrer",
      earnings: "Meine Einnahmen",
    },
    title: "Meine Einnahmen",
    description: "Verfolgen Sie Ihre Einnahmen und Zahlungen",
    periods: {
      week: "Diese Woche",
      month: "Dieser Monat",
      quarter: "Dieses Quartal",
      year: "Dieses Jahr",
    },
    tabs: {
      overview: "Übersicht",
      history: "Verlauf",
      breakdown: "Details",
    },
    kpis: {
      totalEarnings: "Gesamteinnahmen",
      thisMonth: "Dieser Monat",
      pending: "Ausstehend",
      avgPerLesson: "Durchschnitt pro Lektion",
      hoursWorked: "Arbeitsstunden",
      nextPayment: "Nächste Zahlung",
    },
    actions: {
      export: "Exportieren",
      download: "Herunterladen",
      viewInvoice: "Rechnung anzeigen",
    },
    table: {
      date: "Datum",
      amount: "Betrag",
      type: "Typ",
      status: "Status",
      reference: "Referenz",
      actions: "Aktionen",
    },
    types: {
      salary: "Gehalt",
      bonus: "Bonus",
      commission: "Provision",
    },
    status: {
      paid: "Bezahlt",
      pending: "Ausstehend",
      processing: "In Bearbeitung",
    },
    breakdown: {
      title: "Einnahmenverteilung",
      byType: "Nach Typ",
      byMonth: "Nach Monat",
    },
  },
  it: {
    breadcrumb: {
      instructor: "Istruttore",
      earnings: "I miei Guadagni",
    },
    title: "I miei Guadagni",
    description: "Monitora i tuoi guadagni e i tuoi pagamenti",
    periods: {
      week: "Questa settimana",
      month: "Questo mese",
      quarter: "Questo trimestre",
      year: "Quest'anno",
    },
    tabs: {
      overview: "Panoramica",
      history: "Storico",
      breakdown: "Dettagli",
    },
    kpis: {
      totalEarnings: "Guadagni totali",
      thisMonth: "Questo mese",
      pending: "In attesa",
      avgPerLesson: "Media per lezione",
      hoursWorked: "Ore lavorate",
      nextPayment: "Prossimo pagamento",
    },
    actions: {
      export: "Esporta",
      download: "Scarica",
      viewInvoice: "Vedi fattura",
    },
    table: {
      date: "Data",
      amount: "Importo",
      type: "Tipo",
      status: "Stato",
      reference: "Riferimento",
      actions: "Azioni",
    },
    types: {
      salary: "Stipendio",
      bonus: "Bonus",
      commission: "Commissione",
    },
    status: {
      paid: "Pagato",
      pending: "In attesa",
      processing: "In elaborazione",
    },
    breakdown: {
      title: "Ripartizione dei guadagni",
      byType: "Per tipo",
      byMonth: "Per mese",
    },
  },
  en: {
    breadcrumb: {
      instructor: "Instructor",
      earnings: "My Earnings",
    },
    title: "My Earnings",
    description: "Track your earnings and payments",
    periods: {
      week: "This week",
      month: "This month",
      quarter: "This quarter",
      year: "This year",
    },
    tabs: {
      overview: "Overview",
      history: "History",
      breakdown: "Breakdown",
    },
    kpis: {
      totalEarnings: "Total earnings",
      thisMonth: "This month",
      pending: "Pending",
      avgPerLesson: "Average per lesson",
      hoursWorked: "Hours worked",
      nextPayment: "Next payment",
    },
    actions: {
      export: "Export",
      download: "Download",
      viewInvoice: "View invoice",
    },
    table: {
      date: "Date",
      amount: "Amount",
      type: "Type",
      status: "Status",
      reference: "Reference",
      actions: "Actions",
    },
    types: {
      salary: "Salary",
      bonus: "Bonus",
      commission: "Commission",
    },
    status: {
      paid: "Paid",
      pending: "Pending",
      processing: "Processing",
    },
    breakdown: {
      title: "Earnings breakdown",
      byType: "By type",
      byMonth: "By month",
    },
  },
};

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_STATS = {
  totalEarnings: 8450,
  thisMonth: 3200,
  pending: 850,
  avgPerLesson: 54,
  hoursWorked: 234,
  nextPayment: "2024-01-15",
  trends: {
    total: 12,
    thisMonth: 8,
    pending: -5,
  },
};

const MOCK_PAYMENTS: Payment[] = [
  {
    id: "1",
    date: "2024-01-01",
    amount: 3200,
    type: "salary",
    status: "paid",
    reference: "SAL-2024-01",
  },
  {
    id: "2",
    date: "2023-12-15",
    amount: 500,
    type: "bonus",
    status: "paid",
    reference: "BON-2023-12",
  },
  {
    id: "3",
    date: "2023-12-01",
    amount: 2950,
    type: "salary",
    status: "paid",
    reference: "SAL-2023-12",
  },
  {
    id: "4",
    date: "2024-01-15",
    amount: 850,
    type: "commission",
    status: "pending",
    reference: "COM-2024-01",
  },
  {
    id: "5",
    date: "2023-11-01",
    amount: 3100,
    type: "salary",
    status: "paid",
    reference: "SAL-2023-11",
  },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function InstructorEarningsPage({
  locale = "fr",
}: InstructorEarningsPageProps) {
  const t = translations[locale];

  const [period, setPeriod] = useState<TimePeriod>("month");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const getStatusBadge = (status: Payment["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
          >
            <CheckCircle2Icon className="w-3 h-3 mr-1" />

            {t.status.paid}
          </Badge>
        );

      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          >
            <AlertCircleIcon className="w-3 h-3 mr-1" />

            {t.status.pending}
          </Badge>
        );

      case "processing":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          >
            <ClockIcon className="w-3 h-3 mr-1" />

            {t.status.processing}
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/instructor/dashboard">
              {t.breadcrumb.instructor}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage>{t.breadcrumb.earnings}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          <p className="text-muted-foreground mt-1">{t.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={period}
            onValueChange={(v) => setPeriod(v as TimePeriod)}
          >
            <SelectTrigger className="w-[180px]">
              <CalendarIcon className="w-4 h-4 mr-2" />

              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t.periods.week}</SelectItem>
              <SelectItem value="month">{t.periods.month}</SelectItem>
              <SelectItem value="quarter">{t.periods.quarter}</SelectItem>
              <SelectItem value="year">{t.periods.year}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <DownloadIcon className="w-4 h-4 mr-2" />

            {t.actions.export}
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Earnings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.totalEarnings}
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(MOCK_STATS.totalEarnings)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {MOCK_STATS.trends.total > 0 ? (
                <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs ${
                  MOCK_STATS.trends.total > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {MOCK_STATS.trends.total > 0 ? "+" : ""}
                {MOCK_STATS.trends.total}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* This Month */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.thisMonth}
            </CardTitle>
            <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(MOCK_STATS.thisMonth)}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {MOCK_STATS.trends.thisMonth > 0 ? (
                <TrendingUpIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
              ) : (
                <TrendingDownIcon className="w-4 h-4 text-red-600 dark:text-red-400" />
              )}
              <span
                className={`text-xs ${
                  MOCK_STATS.trends.thisMonth > 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {MOCK_STATS.trends.thisMonth > 0 ? "+" : ""}
                {MOCK_STATS.trends.thisMonth}%
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.pending}
            </CardTitle>
            <AlertCircleIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(MOCK_STATS.pending)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t.kpis.nextPayment}: {formatDate(MOCK_STATS.nextPayment)}
            </p>
          </CardContent>
        </Card>

        {/* Average Per Lesson */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.avgPerLesson}
            </CardTitle>
            <DollarSignIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {formatCurrency(MOCK_STATS.avgPerLesson)}
            </div>
          </CardContent>
        </Card>

        {/* Hours Worked */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.kpis.hoursWorked}
            </CardTitle>
            <ClockIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {MOCK_STATS.hoursWorked}h
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="history">{t.tabs.history}</TabsTrigger>
          <TabsTrigger value="breakdown">{t.tabs.breakdown}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des revenus</CardTitle>
              <CardDescription>
                Évolution mensuelle de vos revenus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart placeholder - Recharts Area Chart
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des paiements</CardTitle>
              <CardDescription>Liste complète de vos paiements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.table.date}</TableHead>
                    <TableHead>{t.table.amount}</TableHead>
                    <TableHead>{t.table.type}</TableHead>
                    <TableHead>{t.table.status}</TableHead>
                    <TableHead>{t.table.reference}</TableHead>
                    <TableHead className="text-right">
                      {t.table.actions}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PAYMENTS.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(payment.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{t.types[payment.type]}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="font-mono text-xs">
                        {payment.reference}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileTextIcon className="w-4 h-4 mr-2" />

                          {t.actions.viewInvoice}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.breakdown.byType}</CardTitle>
                <CardDescription>
                  Répartition par type de revenu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Recharts Pie Chart
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.breakdown.byMonth}</CardTitle>
                <CardDescription>Répartition mensuelle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Chart placeholder - Recharts Bar Chart
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
