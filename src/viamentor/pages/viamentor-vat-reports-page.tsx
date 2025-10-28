/**
 * VIAMENTOR - VAT Reports Page
 * Page rapports TVA suisses conformes AFC avec déclarations et exports
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
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FileTextIcon,
  DownloadIcon,
  InfoIcon,
  TrendingUpIcon,
  DollarSignIcon,
  MinusCircleIcon,
  AlertCircleIcon,
} from "lucide-react";
import {
  getFinanceDashboardTranslations,
  type FinanceDashboardLocale,
} from "@/viamentor/data/viamentor-finance-dashboard-i18n";
import {
  mockVATTransactions,
  mockVATStats,
  vatRates,
  formatCurrency,
  formatPercentage,
  getVATRatePercentage,
  type VATRate,
  type ExportFormat,
  type AccountPlan,
} from "@/viamentor/data/viamentor-finance-dashboard-data";

// ============================================================================
// TYPES
// ============================================================================

interface VATReportsPageProps {
  locale?: FinanceDashboardLocale;
}

type VATQuarter = "q1" | "q2" | "q3" | "q4";

// ============================================================================
// COMPONENT
// ============================================================================

export function VATReportsPage({ locale = "fr" }: VATReportsPageProps) {
  const t = getFinanceDashboardTranslations(locale);
  const [selectedQuarter, setSelectedQuarter] = useState<VATQuarter>("q1");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("excel");
  const [accountPlan, setAccountPlan] = useState<AccountPlan>("pme");
  const [anonymize, setAnonymize] = useState(false);

  // Stats Cards
  const statsCards = [
    {
      title: t.vat.stats.turnover,
      value: formatCurrency(mockVATStats.turnover),
      icon: DollarSignIcon,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: t.vat.stats.collected,
      value: formatCurrency(mockVATStats.collected),
      icon: TrendingUpIcon,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: t.vat.stats.deductible,
      value: formatCurrency(mockVATStats.deductible),
      icon: MinusCircleIcon,
      color: "text-orange-600 dark:text-orange-400",
    },
    {
      title: t.vat.stats.toPay,
      value: formatCurrency(mockVATStats.toPay),
      icon: AlertCircleIcon,
      color: "text-red-600 dark:text-red-400",
    },
  ];

  const handleGenerateDeclaration = () => {
    console.log("Generating VAT declaration for", selectedQuarter);
    // Logique de génération du PDF AFC Form 1000
  };

  const handleExport = () => {
    console.log(
      "Exporting with format:",
      exportFormat,
      "plan:",
      accountPlan,
      "anonymize:",
      anonymize
    );
    // Logique d'export
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{t.vat.title}</h1>
        <p className="text-sm text-muted-foreground">{t.vat.description}</p>
      </div>

      {/* Alert Info */}
      <Alert>
        <InfoIcon className="h-4 w-4" />

        <AlertDescription>{t.vat.alert}</AlertDescription>
      </Alert>

      {/* Period Selector */}
      <Card>
        <CardHeader>
          <CardTitle>{t.vat.period.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedQuarter}
            onValueChange={(v) => setSelectedQuarter(v as VATQuarter)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1">{t.vat.period.q1}</SelectItem>
              <SelectItem value="q2">{t.vat.period.q2}</SelectItem>
              <SelectItem value="q3">{t.vat.period.q3}</SelectItem>
              <SelectItem value="q4">{t.vat.period.q4}</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.vat.table.date}</CardTitle>
              <CardDescription>Détail des transactions TVA</CardDescription>
            </div>
            <Button onClick={handleGenerateDeclaration}>
              <FileTextIcon className="mr-2 h-4 w-4" />

              {t.vat.actions.generate}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.vat.table.date}</TableHead>
                  <TableHead>{t.vat.table.client}</TableHead>
                  <TableHead className="text-right">
                    {t.vat.table.amountHT}
                  </TableHead>
                  <TableHead>{t.vat.table.vatRate}</TableHead>
                  <TableHead className="text-right">
                    {t.vat.table.vatAmount}
                  </TableHead>
                  <TableHead>{t.vat.table.category}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockVATTransactions.map((transaction) => {
                  const ratePercentage = getVATRatePercentage(
                    transaction.vatRate
                  );
                  return (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString("fr-CH")}
                      </TableCell>
                      <TableCell className="font-medium">
                        {transaction.client}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(transaction.amountHT)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {formatPercentage(ratePercentage)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(transaction.vatAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {t.vat.categories[transaction.category]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Exports Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t.exports.title}</CardTitle>
          <CardDescription>{t.exports.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>{t.exports.format.label}</Label>
              <Select
                value={exportFormat}
                onValueChange={(v) => setExportFormat(v as ExportFormat)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">
                    {t.exports.format.excel}
                  </SelectItem>
                  <SelectItem value="csv">{t.exports.format.csv}</SelectItem>
                  <SelectItem value="datev">
                    {t.exports.format.datev}
                  </SelectItem>
                  <SelectItem value="banana">
                    {t.exports.format.banana}
                  </SelectItem>
                  <SelectItem value="sap">{t.exports.format.sap}</SelectItem>
                  <SelectItem value="sage">{t.exports.format.sage}</SelectItem>
                  <SelectItem value="bexio">
                    {t.exports.format.bexio}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>{t.exports.accounts.label}</Label>
              <Select
                value={accountPlan}
                onValueChange={(v) => setAccountPlan(v as AccountPlan)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pme">{t.exports.accounts.pme}</SelectItem>
                  <SelectItem value="gaap">
                    {t.exports.accounts.gaap}
                  </SelectItem>
                  <SelectItem value="ifrs">
                    {t.exports.accounts.ifrs}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymize"
              checked={anonymize}
              onCheckedChange={(checked) => setAnonymize(checked as boolean)}
            />

            <Label htmlFor="anonymize" className="cursor-pointer">
              {t.exports.anonymize}
            </Label>
          </div>

          <Button onClick={handleExport} className="w-full">
            <DownloadIcon className="mr-2 h-4 w-4" />

            {t.actions.export}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
