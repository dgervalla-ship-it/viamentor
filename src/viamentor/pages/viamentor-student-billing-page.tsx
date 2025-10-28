/**
 * VIAMENTOR - Student Billing Page
 * Page principale facturation élève
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  CreditCardIcon,
  FileTextIcon,
  CalendarIcon,
  TrendingUpIcon,
  AlertCircleIcon,
  PackageIcon,
  WalletIcon,
  DownloadIcon,
  EyeIcon,
  PrinterIcon,
} from "lucide-react";
import {
  mockStudentInvoices,
  mockLessonPackages,
  mockBillingStats,
  mockAccountBalance,
  getInvoiceStatusColor,
  getDaysUntilDue,
  isInvoiceOverdue,
  getOverdueDays,
  type StudentInvoice,
  type LessonPackage,
} from "@/viamentor/data/viamentor-student-billing-data";
import {
  getBillingTranslation,
  type BillingLocale,
} from "@/viamentor/data/viamentor-student-billing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface StudentBillingPageProps {
  locale?: BillingLocale;
}

type InvoiceFilter = "all" | "unpaid" | "paid";

// ============================================================================
// COMPONENT
// ============================================================================

export function StudentBillingPage({ locale = "fr" }: StudentBillingPageProps) {
  const t = getBillingTranslation(locale);
  const [filter, setFilter] = useState<InvoiceFilter>("all");
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  // Filter invoices
  const filteredInvoices = mockStudentInvoices.filter((inv) => {
    if (filter === "unpaid")
      return (
        inv.status === "unpaid" ||
        inv.status === "overdue" ||
        inv.status === "partial"
      );

    if (filter === "paid") return inv.status === "paid";
    return true;
  });

  // Calculate unpaid total
  const unpaidTotal = mockStudentInvoices
    .filter((inv) => inv.status !== "paid")
    .reduce((sum, inv) => sum + (inv.total - inv.paidAmount), 0);

  const hasOverdueInvoices = mockStudentInvoices.some(
    (inv) => inv.status === "overdue"
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="text-muted-foreground">{t.balance.title}</p>
      </div>

      {/* Overdue Alert */}
      {hasOverdueInvoices && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />

          <AlertDescription className="flex items-center justify-between">
            <span>
              {t.alerts.overdueInvoices
                .replace("{count}", mockBillingStats.unpaidInvoices.toString())
                .replace("{amount}", unpaidTotal.toFixed(2))}
            </span>
            <Button variant="outline" size="sm">
              {t.alerts.payNow}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.accountBalance}
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${mockBillingStats.accountBalance < 0 ? "text-red-600" : "text-green-600"}`}
            >
              CHF {mockBillingStats.accountBalance.toFixed(2)}
            </div>
            <Badge
              variant={
                mockBillingStats.accountBalance < 0 ? "destructive" : "default"
              }
              className="mt-2"
            >
              {mockBillingStats.accountBalance < 0 ? "Dette" : "Crédit"}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.unpaidInvoices}
            </CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBillingStats.unpaidInvoices}
            </div>
            {mockBillingStats.unpaidInvoices > 0 && (
              <Badge variant="destructive" className="mt-2">
                Urgent
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.lastInvoice}
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Date(mockBillingStats.lastInvoiceDate).toLocaleDateString(
                locale
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Il y a{" "}
              {Math.floor(
                (Date.now() -
                  new Date(mockBillingStats.lastInvoiceDate).getTime()) /
                  (1000 * 60 * 60 * 24)
              )}{" "}
              jours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t.stats.totalPaid}
            </CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              CHF {mockBillingStats.totalPaidLifetime.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Lifetime</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.table.invoice}s</CardTitle>
              <CardDescription>
                {filteredInvoices.length}{" "}
                {filter === "all" ? t.tabs.all.toLowerCase() : ""}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "table" ? "cards" : "table")
                }
              >
                {viewMode === "table" ? "Cards" : "Table"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as InvoiceFilter)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
              <TabsTrigger value="unpaid">{t.tabs.unpaid}</TabsTrigger>
              <TabsTrigger value="paid">{t.tabs.paid}</TabsTrigger>
            </TabsList>

            <TabsContent value={filter} className="space-y-4 mt-4">
              {filteredInvoices.length === 0 ? (
                <div className="text-center py-12">
                  <FileTextIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />

                  <p className="text-lg font-medium">
                    {filter === "paid" ? t.empty.allPaid : t.empty.noInvoices}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredInvoices.map((invoice) => (
                    <InvoiceCard
                      key={invoice.id}
                      invoice={invoice}
                      locale={locale}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Lesson Packages */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{t.packages.title}</CardTitle>
              <CardDescription>
                {mockAccountBalance.availableLessons.total}{" "}
                {t.packages.lessonsRemaining.toLowerCase()}
              </CardDescription>
            </div>
            <Button>
              <PackageIcon className="h-4 w-4 mr-2" />

              {t.packages.buyPackage}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockLessonPackages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} locale={locale} t={t} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Account Balance */}
      <Card>
        <CardHeader>
          <CardTitle>{t.balance.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">
                {t.balance.availableLessons}
              </p>
              <p className="text-2xl font-bold">
                {mockAccountBalance.availableLessons.total}
              </p>
              <p className="text-xs text-muted-foreground">
                {mockAccountBalance.availableLessons.fromPackages}{" "}
                {t.balance.fromPackages} +{" "}
                {mockAccountBalance.availableLessons.fromSingle}{" "}
                {t.balance.fromSingle}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.balance.financialCredits}
              </p>
              <p className="text-2xl font-bold">
                CHF {mockAccountBalance.financialCredits.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.balance.unpaidInvoices}
              </p>
              <p className="text-2xl font-bold text-red-600">
                CHF {mockAccountBalance.unpaidInvoices.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {t.balance.netBalance}
              </p>
              <p
                className={`text-2xl font-bold ${mockAccountBalance.netBalance < 0 ? "text-red-600" : "text-green-600"}`}
              >
                CHF {mockAccountBalance.netBalance.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// INVOICE CARD
// ============================================================================

function InvoiceCard({
  invoice,
  locale,
  t,
}: {
  invoice: StudentInvoice;
  locale: BillingLocale;
  t: any;
}) {
  const daysUntilDue = getDaysUntilDue(invoice.dueDate);
  const overdue = isInvoiceOverdue(invoice.dueDate);
  const overdueDays = getOverdueDays(invoice.dueDate);

  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <FileTextIcon className="h-5 w-5 text-muted-foreground" />

          <div>
            <p className="font-semibold">{invoice.number}</p>
            <p className="text-sm text-muted-foreground">
              {invoice.description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span>{new Date(invoice.date).toLocaleDateString(locale)}</span>
          {invoice.status !== "paid" && (
            <span className={overdue ? "text-red-600 font-medium" : ""}>
              {overdue
                ? `${t.detail.overdueSince.replace("{days}", overdueDays.toString())}`
                : `${t.detail.daysUntilDue.replace("{days}", daysUntilDue.toString())}`}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-bold">CHF {invoice.total.toFixed(2)}</p>
          {invoice.status === "partial" && (
            <p className="text-sm text-muted-foreground">
              Payé: CHF {invoice.paidAmount.toFixed(2)}
            </p>
          )}
        </div>
        <Badge className={getInvoiceStatusColor(invoice.status)}>
          {t.status[invoice.status]}
        </Badge>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          {invoice.status !== "paid" && (
            <Button size="sm">
              <CreditCardIcon className="h-4 w-4 mr-2" />

              {t.actions.pay}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PACKAGE CARD
// ============================================================================

function PackageCard({
  package: pkg,
  locale,
  t,
}: {
  package: LessonPackage;
  locale: BillingLocale;
  t: any;
}) {
  const daysUntilExpiry = getDaysUntilDue(pkg.expiryDate);
  const expired = pkg.status === "expired" || daysUntilExpiry < 0;

  return (
    <div className="p-4 border border-border rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold">{pkg.name}</h3>
          <p className="text-sm text-muted-foreground">
            CHF {pkg.price.toFixed(2)} • CHF {pkg.pricePerLesson.toFixed(2)}
            /leçon
          </p>
        </div>
        {pkg.isPopular && <Badge variant="default">{t.packages.popular}</Badge>}
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>{t.packages.lessonsRemaining}</span>
            <span className="font-medium">
              {pkg.lessonsRemaining}/{pkg.lessonsIncluded}
            </span>
          </div>
          <Progress
            value={(pkg.lessonsRemaining / pkg.lessonsIncluded) * 100}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t.packages.validity}</span>
          <div className="flex items-center gap-2">
            <span>{new Date(pkg.expiryDate).toLocaleDateString(locale)}</span>
            {!expired && daysUntilExpiry < 30 && (
              <Badge variant="destructive" className="text-xs">
                {t.packages.expiresIn.replace(
                  "{days}",
                  daysUntilExpiry.toString()
                )}
              </Badge>
            )}
          </div>
        </div>

        <Badge variant={pkg.status === "active" ? "default" : "secondary"}>
          {pkg.status}
        </Badge>
      </div>
    </div>
  );
}
