/**
 * VIAMENTOR - Accountant Page
 * Dashboard Accountant avec ResponsivePageWrapper
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  DownloadIcon,
  FileBarChartIcon,
  RefreshCwIcon,
  CalendarIcon,
  ArrowRightIcon,
  BarChart3Icon,
  ReceiptIcon,
  TrendingUpIcon,
  FileTextIcon,
  FileSpreadsheetIcon,
  FileTextIcon as FilePdfIcon,
  TableIcon,
  CheckIcon,
} from "lucide-react";
import { ResponsivePageWrapper } from "@/polymet/components/viamentor-responsive-page-wrapper";
import { AccountantKPIsSection } from "@/polymet/components/viamentor-accountant-kpis-section";
import { AccountantTransactionsSection } from "@/polymet/components/viamentor-accountant-transactions-section";
import { AccountantChartsSection } from "@/polymet/components/viamentor-accountant-charts-section";
import { AccountantActionsSection } from "@/polymet/components/viamentor-accountant-actions-section";
import {
  ACCOUNTANT_I18N,
  type AccountantLocale,
} from "@/polymet/data/viamentor-accountant-i18n";
import { MOCK_ACCOUNTANT_DASHBOARD } from "@/polymet/data/viamentor-accountant-data";

// ============================================================================
// TYPES
// ============================================================================

interface AccountantPageProps {
  locale?: AccountantLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function AccountantPage({ locale = "fr" }: AccountantPageProps) {
  const t = ACCOUNTANT_I18N[locale];
  const data = MOCK_ACCOUNTANT_DASHBOARD;
  const [period, setPeriod] = useState("month");
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exportSections, setExportSections] = useState({
    kpis: true,
    transactions: true,
    analytics: true,
    actions: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [reportsDialogOpen, setReportsDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState("");
  const [reconcileDialogOpen, setReconcileDialogOpen] = useState(false);
  const [isReconciling, setIsReconciling] = useState(false);

  // Header Actions
  const headerActions = (
    <div className="flex flex-wrap items-center gap-2">
      <Select value={period} onValueChange={setPeriod}>
        <SelectTrigger className="w-[180px]">
          <CalendarIcon className="mr-2 h-4 w-4" />

          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">{t.periods.today}</SelectItem>
          <SelectItem value="week">{t.periods.week}</SelectItem>
          <SelectItem value="month">{t.periods.month}</SelectItem>
          <SelectItem value="quarter">{t.periods.quarter}</SelectItem>
          <SelectItem value="year">{t.periods.year}</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" onClick={() => setExportDialogOpen(true)}>
        <DownloadIcon className="mr-2 h-4 w-4" />

        {t.header.export}
      </Button>
      <Button variant="outline" onClick={() => setReportsDialogOpen(true)}>
        <FileBarChartIcon className="mr-2 h-4 w-4" />

        {t.header.reports}
      </Button>
      <Button onClick={() => setReconcileDialogOpen(true)}>
        <RefreshCwIcon className="mr-2 h-4 w-4" />

        {t.header.reconcile}
      </Button>
    </div>
  );

  // Alertes Section
  const alertsSection = data.alerts.length > 0 && (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {data.alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`${
            alert.severity === "high"
              ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950"
              : alert.severity === "medium"
                ? "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950"
                : "border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950"
          }`}
        >
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  {t.alerts[alert.title as keyof typeof t.alerts]}
                </p>
                {alert.count && (
                  <p className="text-2xl font-bold">{alert.count}</p>
                )}
                {alert.amount && (
                  <p className="text-sm text-muted-foreground">
                    CHF {alert.amount.toLocaleString()}
                  </p>
                )}
              </div>
              <Button size="sm" variant="ghost">
                {t.alerts.view}
                <ArrowRightIcon className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Available Reports
  const availableReports = [
    {
      id: "balance-sheet",
      name: "Bilan comptable",
      description: "État de la situation financière à une date donnée",
      icon: <FileBarChartIcon className="h-5 w-5 text-blue-500" />,

      frequency: "Mensuel",
    },
    {
      id: "income-statement",
      name: "Compte de résultat",
      description: "Revenus et charges sur une période",
      icon: <TrendingUpIcon className="h-5 w-5 text-green-500" />,

      frequency: "Mensuel",
    },
    {
      id: "cash-flow",
      name: "Tableau de flux de trésorerie",
      description: "Mouvements de trésorerie détaillés",
      icon: <ReceiptIcon className="h-5 w-5 text-purple-500" />,

      frequency: "Mensuel",
    },
    {
      id: "vat-report",
      name: "Rapport TVA",
      description: "Déclaration TVA suisse (AFC)",
      icon: <FileTextIcon className="h-5 w-5 text-red-500" />,

      frequency: "Trimestriel",
    },
    {
      id: "aged-receivables",
      name: "Balance âgée clients",
      description: "Créances classées par ancienneté",
      icon: <CalendarIcon className="h-5 w-5 text-orange-500" />,

      frequency: "Hebdomadaire",
    },
    {
      id: "aged-payables",
      name: "Balance âgée fournisseurs",
      description: "Dettes classées par ancienneté",
      icon: <CalendarIcon className="h-5 w-5 text-yellow-500" />,

      frequency: "Hebdomadaire",
    },
  ];

  // Handle Reconciliation
  const handleReconcile = async () => {
    setIsReconciling(true);

    // Simulate reconciliation process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // In real implementation, this would perform bank reconciliation
    console.log("Reconciling accounts for period:", period);

    alert(
      "Réconciliation terminée!\n\n" +
        "- 45 transactions rapprochées\n" +
        "- 3 écarts détectés\n" +
        "- Solde bancaire: CHF 67'200"
    );

    setIsReconciling(false);
    setReconcileDialogOpen(false);
  };

  // Handle Report Generation
  const handleGenerateReport = async () => {
    if (!selectedReport) return;

    const report = availableReports.find((r) => r.id === selectedReport);
    if (!report) return;

    // Simulate report generation
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In real implementation, this would generate and download the report
    console.log("Generating report:", selectedReport);
    console.log("Period:", period);

    alert(`Rapport "${report.name}" généré avec succès!`);

    setReportsDialogOpen(false);
    setSelectedReport("");
  };

  // Handle Export
  const handleExport = async () => {
    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // In real implementation, this would generate and download the file
    console.log("Exporting with format:", exportFormat);
    console.log("Sections to export:", exportSections);
    console.log("Period:", period);

    // Create a mock download
    const fileName = `comptabilite-${period}-${new Date().toISOString().split("T")[0]}.${exportFormat}`;

    // Show success message (in real app, trigger actual download)
    alert(`Export réussi: ${fileName}`);

    setIsExporting(false);
    setExportDialogOpen(false);
  };

  // Toggle section for export
  const toggleSection = (section: keyof typeof exportSections) => {
    setExportSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      {/* Reconciliation Dialog */}
      <Dialog open={reconcileDialogOpen} onOpenChange={setReconcileDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Réconciliation bancaire</DialogTitle>
            <DialogDescription>
              Rapprocher les transactions bancaires avec la comptabilité
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Period Info */}
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Période:</span>
                <span className="font-medium">
                  {period === "today" && "Aujourd'hui"}
                  {period === "week" && "Cette semaine"}
                  {period === "month" && "Ce mois"}
                  {period === "quarter" && "Ce trimestre"}
                  {period === "year" && "Cette année"}
                </span>
              </div>
            </div>

            {/* Reconciliation Info */}
            <div className="space-y-3">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Transactions en attente
                  </span>
                  <Badge variant="secondary">8</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paiements non rapprochés avec les relevés bancaires
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Écarts détectés</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Différences entre comptabilité et banque
                </p>
              </div>

              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Solde bancaire actuel
                  </span>
                  <span className="font-bold">CHF 67'200</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Solde selon dernier relevé importé
                </p>
              </div>
            </div>

            {/* Warning */}
            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-900 p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> La réconciliation peut prendre quelques
                minutes. Assurez-vous d'avoir importé les derniers relevés
                bancaires.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setReconcileDialogOpen(false)}
              disabled={isReconciling}
            >
              Annuler
            </Button>
            <Button onClick={handleReconcile} disabled={isReconciling}>
              {isReconciling ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  Réconciliation en cours...
                </>
              ) : (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4" />
                  Lancer la réconciliation
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reports Dialog */}
      <Dialog open={reportsDialogOpen} onOpenChange={setReportsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Générer un rapport comptable</DialogTitle>
            <DialogDescription>
              Sélectionnez le type de rapport à générer pour la période en cours
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Period Info */}
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Période:</span>
                <span className="font-medium">
                  {period === "today" && "Aujourd'hui"}
                  {period === "week" && "Cette semaine"}
                  {period === "month" && "Ce mois"}
                  {period === "quarter" && "Ce trimestre"}
                  {period === "year" && "Cette année"}
                </span>
              </div>
            </div>

            {/* Reports Grid */}
            <div className="grid gap-3">
              {availableReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all hover:bg-accent/50 ${
                    selectedReport === report.id
                      ? "border-primary bg-accent"
                      : "border-border"
                  }`}
                >
                  <div className="mt-0.5">{report.icon}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{report.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {report.frequency}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.description}
                    </p>
                  </div>
                  {selectedReport === report.id && (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setReportsDialogOpen(false);
                setSelectedReport("");
              }}
            >
              Annuler
            </Button>
            <Button onClick={handleGenerateReport} disabled={!selectedReport}>
              <FileBarChartIcon className="mr-2 h-4 w-4" />
              Générer le rapport
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Exporter les données comptables</DialogTitle>
            <DialogDescription>
              Sélectionnez le format et les sections à inclure dans l'export
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Format Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Format d'export</Label>
              <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
                <div className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="pdf" id="pdf" />

                  <FilePdfIcon className="h-5 w-5 text-red-500" />

                  <Label htmlFor="pdf" className="flex-1 cursor-pointer">
                    <div className="font-medium">PDF</div>
                    <div className="text-xs text-muted-foreground">
                      Rapport formaté pour impression
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="xlsx" id="xlsx" />

                  <FileSpreadsheetIcon className="h-5 w-5 text-green-600" />

                  <Label htmlFor="xlsx" className="flex-1 cursor-pointer">
                    <div className="font-medium">Excel (XLSX)</div>
                    <div className="text-xs text-muted-foreground">
                      Données éditables avec formules
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-border p-3 hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value="csv" id="csv" />

                  <TableIcon className="h-5 w-5 text-blue-500" />

                  <Label htmlFor="csv" className="flex-1 cursor-pointer">
                    <div className="font-medium">CSV</div>
                    <div className="text-xs text-muted-foreground">
                      Format compatible avec tous les logiciels
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Sections Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Sections à inclure</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 rounded-lg border border-border p-3">
                  <Checkbox
                    id="kpis"
                    checked={exportSections.kpis}
                    onCheckedChange={() => toggleSection("kpis")}
                  />

                  <Label htmlFor="kpis" className="flex-1 cursor-pointer">
                    <div className="font-medium">KPIs Financiers</div>
                    <div className="text-xs text-muted-foreground">
                      Revenus, créances, trésorerie, impayés
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-border p-3">
                  <Checkbox
                    id="transactions"
                    checked={exportSections.transactions}
                    onCheckedChange={() => toggleSection("transactions")}
                  />

                  <Label
                    htmlFor="transactions"
                    className="flex-1 cursor-pointer"
                  >
                    <div className="font-medium">Transactions récentes</div>
                    <div className="text-xs text-muted-foreground">
                      Liste détaillée des transactions
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-border p-3">
                  <Checkbox
                    id="analytics"
                    checked={exportSections.analytics}
                    onCheckedChange={() => toggleSection("analytics")}
                  />

                  <Label htmlFor="analytics" className="flex-1 cursor-pointer">
                    <div className="font-medium">Analytics & Graphiques</div>
                    <div className="text-xs text-muted-foreground">
                      Évolution des revenus et statistiques
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 rounded-lg border border-border p-3">
                  <Checkbox
                    id="actions"
                    checked={exportSections.actions}
                    onCheckedChange={() => toggleSection("actions")}
                  />

                  <Label htmlFor="actions" className="flex-1 cursor-pointer">
                    <div className="font-medium">Actions rapides</div>
                    <div className="text-xs text-muted-foreground">
                      Liste des actions comptables disponibles
                    </div>
                  </Label>
                </div>
              </div>
            </div>

            {/* Period Info */}
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Période sélectionnée:
                </span>
                <span className="font-medium">
                  {period === "today" && "Aujourd'hui"}
                  {period === "week" && "Cette semaine"}
                  {period === "month" && "Ce mois"}
                  {period === "quarter" && "Ce trimestre"}
                  {period === "year" && "Cette année"}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setExportDialogOpen(false)}
              disabled={isExporting}
            >
              Annuler
            </Button>
            <Button
              onClick={handleExport}
              disabled={
                isExporting || !Object.values(exportSections).some(Boolean)
              }
            >
              {isExporting ? (
                <>
                  <RefreshCwIcon className="mr-2 h-4 w-4 animate-spin" />
                  Export en cours...
                </>
              ) : (
                <>
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Exporter
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ResponsivePageWrapper
        title={t.header.title}
        description={t.header.subtitle}
        actions={headerActions}
        alerts={alertsSection}
        sections={[
          {
            id: "kpis",
            label: "KPIs",
            icon: <BarChart3Icon className="h-4 w-4" />,

            badge: "6",
            content: <AccountantKPIsSection locale={locale} />,
          },
          {
            id: "transactions",
            label: t.transactions.recent,
            icon: <ReceiptIcon className="h-4 w-4" />,

            content: <AccountantTransactionsSection locale={locale} />,
          },
          {
            id: "analytics",
            label: "Analytics",
            icon: <TrendingUpIcon className="h-4 w-4" />,

            content: <AccountantChartsSection locale={locale} />,
          },
          {
            id: "actions",
            label: t.quickActions.title,
            icon: <FileTextIcon className="h-4 w-4" />,

            content: <AccountantActionsSection locale={locale} />,
          },
        ]}
        mobileTabsEnabled={true}
        mobileTabsBreakpoint="lg"
        swipeEnabled={true}
        layout="stacked"
      />
    </>
  );
}
