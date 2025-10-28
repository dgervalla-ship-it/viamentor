/**
 * VIAMENTOR - Pricing Management Page
 * Page complète gestion tarifs avec tous les composants
 */

"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DollarSignIcon,
  PackageIcon,
  ShoppingBagIcon,
  TicketIcon,
  PercentIcon,
  FileTextIcon,
  SaveIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  EyeIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  CalendarIcon,
  UsersIcon,
  BarChart3Icon,
  HistoryIcon,
  ReceiptIcon,
} from "lucide-react";

import { CreatePackageWizard } from "@/viamentor/components/viamentor-create-package-wizard";
import { CreatePromotionWizard } from "@/viamentor/components/viamentor-create-promotion-wizard";
import { InvoicePreviewDialog } from "@/viamentor/components/viamentor-invoice-preview-dialog";
import { PriceHistoryTimeline } from "@/viamentor/components/viamentor-price-history-timeline";
import { PromotionsAnalyticsDashboard } from "@/viamentor/components/viamentor-promotions-analytics-dashboard";

import {
  mockPricingSettings,
  type LessonPrice,
  type LessonPackage,
  type Product,
  type Promotion,
  type VATConfig,
  type PricingLocale,
} from "@/viamentor/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  formatPercentage,
  getVATLabel,
} from "@/viamentor/data/viamentor-pricing-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PricingManagementPageProps {
  locale?: PricingLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function PricingManagementPage({
  locale = "fr",
}: PricingManagementPageProps) {
  const t = getPricingTranslation(locale);
  const [settings, setSettings] = useState(mockPricingSettings);
  const [activeTab, setActiveTab] = useState("lessons");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Wizards state
  const [packageWizardOpen, setPackageWizardOpen] = useState(false);
  const [promotionWizardOpen, setPromotionWizardOpen] = useState(false);

  // Dialogs state
  const [invoicePreviewOpen, setInvoicePreviewOpen] = useState(false);
  const [priceHistoryOpen, setPriceHistoryOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Handlers
  const handleSave = () => {
    console.log("Saving pricing settings:", settings);
    // API call here
  };

  const handleEditLesson = (lesson: LessonPrice) => {
    setEditingItem(lesson);
    setDialogOpen(true);
  };

  const handleEditPackage = (pkg: LessonPackage) => {
    setEditingItem(pkg);
    setDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingItem(product);
    setDialogOpen(true);
  };

  const handleEditPromotion = (promo: Promotion) => {
    setEditingItem(promo);
    setDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.pageTitle}</h1>
          <p className="text-muted-foreground mt-1">{t.pageDescription}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setPriceHistoryOpen(true)}
            variant="outline"
            size="lg"
          >
            <HistoryIcon className="h-4 w-4 mr-2" />

            {t.priceHistory || "Historique"}
          </Button>
          <Button
            onClick={() => setAnalyticsOpen(true)}
            variant="outline"
            size="lg"
          >
            <BarChart3Icon className="h-4 w-4 mr-2" />

            {t.analytics || "Analytics"}
          </Button>
          <Button
            onClick={() => setInvoicePreviewOpen(true)}
            variant="outline"
            size="lg"
          >
            <ReceiptIcon className="h-4 w-4 mr-2" />

            {t.previewInvoice || "Aperçu facture"}
          </Button>
          <Button onClick={handleSave} size="lg">
            <SaveIcon className="h-4 w-4 mr-2" />

            {t.saveSettings}
          </Button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="lessons" className="flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4" />

            {t.tabLessons}
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-2">
            <PackageIcon className="h-4 w-4" />

            {t.tabPackages}
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <ShoppingBagIcon className="h-4 w-4" />
            Cours en salle
          </TabsTrigger>
          <TabsTrigger value="promotions" className="flex items-center gap-2">
            <TicketIcon className="h-4 w-4" />

            {t.tabPromotions}
          </TabsTrigger>
          <TabsTrigger value="vat" className="flex items-center gap-2">
            <PercentIcon className="h-4 w-4" />

            {t.tabVAT}
          </TabsTrigger>
          <TabsTrigger value="conditions" className="flex items-center gap-2">
            <FileTextIcon className="h-4 w-4" />

            {t.tabConditions}
          </TabsTrigger>
        </TabsList>

        {/* Tab: Lessons Pricing */}
        <TabsContent value="lessons" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {t.lessonsPricingTitle}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {t.lessonsPricingDescription}
                </p>
              </div>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.category}</TableHead>
                    <TableHead className="text-right">Prix 40min</TableHead>
                    <TableHead className="text-right">{t.price45min}</TableHead>
                    <TableHead className="text-right">Prix 50min</TableHead>
                    <TableHead className="text-right">Prix 60min</TableHead>
                    <TableHead className="text-right">Prix 75min</TableHead>
                    <TableHead className="text-right">{t.price90min}</TableHead>
                    <TableHead className="text-center">
                      {t.autoCalculate}
                    </TableHead>
                    <TableHead className="text-center">
                      {t.visibleForBooking}
                    </TableHead>
                    <TableHead className="text-right">{t.edit}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.lessonPrices.map((lesson) => {
                    // Calcul des prix pour toutes les durées
                    const price40min =
                      Math.round((lesson.price45min / 45) * 40 * 100) / 100;
                    const price50min =
                      Math.round((lesson.price45min / 45) * 50 * 100) / 100;
                    const price60min =
                      Math.round((lesson.price45min / 45) * 60 * 100) / 100;
                    const price75min =
                      Math.round((lesson.price45min / 45) * 75 * 100) / 100;

                    return (
                      <TableRow key={lesson.id}>
                        <TableCell className="font-medium">
                          <Badge variant="outline">
                            {t.categories[lesson.category]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(price40min, locale)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(lesson.price45min, locale)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(price50min, locale)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(price60min, locale)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(price75min, locale)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {formatCurrency(lesson.price90min, locale)}
                        </TableCell>
                        <TableCell className="text-center">
                          {lesson.autoCalculate90min ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <AlertCircleIcon className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {lesson.visibleForBooking ? (
                            <CheckCircleIcon className="h-4 w-4 text-green-600 mx-auto" />
                          ) : (
                            <AlertCircleIcon className="h-4 w-4 text-muted-foreground mx-auto" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditLesson(lesson)}
                          >
                            <EditIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground flex items-start gap-2">
                <AlertCircleIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />

                {t.lessonsPricingInfo}
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Packages */}
        <TabsContent value="packages" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{t.packagesTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.packagesDescription}
                </p>
              </div>
              <Button onClick={() => setPackageWizardOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.createPackage}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {settings.packages.map((pkg) => (
                <Card
                  key={pkg.id}
                  className={`p-4 ${!pkg.isActive ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{pkg.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {t.categories[pkg.category]}
                      </Badge>
                    </div>
                    {pkg.isActive && (
                      <Badge variant="default" className="bg-green-600">
                        {t.active}
                      </Badge>
                    )}
                  </div>

                  {pkg.isCombined && (
                    <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs text-blue-700 dark:text-blue-300">
                      {pkg.combinedDescription}
                    </div>
                  )}

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.lessonCount}:
                      </span>
                      <span className="font-medium">{pkg.lessonCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t.unitPrice}:
                      </span>
                      <span className="font-medium">
                        {formatCurrency(pkg.unitPrice, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        {t.totalPrice}:
                      </span>
                      <span className="font-bold text-lg">
                        {formatCurrency(pkg.totalPrice, locale)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                        {t.savings}
                      </span>
                      <div className="text-right">
                        <div className="font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(pkg.savings, locale)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ({formatPercentage(pkg.savingsPercentage, locale)})
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">
                      <UsersIcon className="h-3 w-3 inline mr-1" />
                      {pkg.soldCount} {t.soldCount}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPackage(pkg)}
                      >
                        <EditIcon className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <CopyIcon className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrashIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Services */}
        <TabsContent value="services" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{t.productsTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.productsDescription}
                </p>
              </div>
              <Button onClick={() => setDialogOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.addService}
              </Button>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.productName}</TableHead>
                    <TableHead>{t.description}</TableHead>
                    <TableHead className="text-center">
                      {t.durationHours}
                    </TableHead>
                    <TableHead className="text-right">{t.price}</TableHead>
                    <TableHead className="text-center">{t.vatRate}</TableHead>
                    <TableHead className="text-center">{t.mandatory}</TableHead>
                    <TableHead className="text-right">{t.edit}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                        {product.isMandatory && (
                          <Badge variant="destructive" className="ml-2 text-xs">
                            {t.mandatory}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                        {product.description}
                      </TableCell>
                      <TableCell className="text-center">
                        {product.durationHours
                          ? `${product.durationHours}h`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatCurrency(product.price, locale)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {getVATLabel(product.vatRate, "short", locale)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {product.isMandatory ? (
                          <CheckCircleIcon className="h-4 w-4 text-orange-600 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <EditIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Promotions */}
        <TabsContent value="promotions" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{t.promotionsTitle}</h2>
                <p className="text-sm text-muted-foreground">
                  {t.promotionsDescription}
                </p>
              </div>
              <Button onClick={() => setPromotionWizardOpen(true)}>
                <PlusIcon className="h-4 w-4 mr-2" />

                {t.createPromotion}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {settings.promotions.map((promo) => (
                <Card
                  key={promo.id}
                  className={`p-4 ${!promo.isActive ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-muted rounded text-sm font-mono font-semibold">
                          {promo.code}
                        </code>
                        {promo.isActive && (
                          <Badge variant="default" className="bg-green-600">
                            {t.active}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">
                        {promo.type === "percentage"
                          ? `${promo.value}% ${t.promotionTypes.percentage.toLowerCase()}`
                          : `${formatCurrency(promo.value, locale)} ${t.promotionTypes.fixed_amount.toLowerCase()}`}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditPromotion(promo)}
                      >
                        <EditIcon className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <TrashIcon className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.applicableTo}:
                      </span>
                      <span className="font-medium">
                        {promo.applicableTo
                          .map((item) => t.applicableToOptions[item])
                          .join(", ")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.startDate}:
                      </span>
                      <span>
                        {new Date(promo.startDate).toLocaleDateString(locale)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {t.endDate}:
                      </span>
                      <span>
                        {new Date(promo.endDate).toLocaleDateString(locale)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-border">
                      <span className="text-muted-foreground">
                        {t.redemptions}:
                      </span>
                      <div className="text-right">
                        <span className="font-bold">
                          {promo.currentUsages}
                          {promo.maxUsages && ` / ${promo.maxUsages}`}
                        </span>
                        {promo.maxUsages && (
                          <div className="w-24 h-1.5 bg-muted rounded-full mt-1">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{
                                width: `${(promo.currentUsages / promo.maxUsages) * 100}%`,
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Tab: VAT */}
        <TabsContent value="vat" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">{t.vatConfigTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {t.vatConfigDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label>{t.vatNumber}</Label>
                  <Input
                    value={settings.schoolVATNumber}
                    placeholder="CHE-123.456.789"
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t.vatRegistered}</Label>
                  <Switch checked={settings.isVATRegistered} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t.displayPricesWithVAT}</Label>
                  <Switch checked={settings.displayPricesWithVAT} />
                </div>
              </div>

              <Card className="p-4 bg-muted">
                <h3 className="font-semibold mb-3">{t.vatCalculator}</h3>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs">{t.amountExclVAT}</Label>
                    <Input
                      type="number"
                      placeholder="100.00"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-xs">{t.vatRate}</Label>
                    <Select defaultValue="8.1">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0%</SelectItem>
                        <SelectItem value="2.5">2.5%</SelectItem>
                        <SelectItem value="8.1">8.1%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">
                        {t.vatAmount}:
                      </span>
                      <span className="font-semibold">CHF 8.10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">{t.amountInclVAT}:</span>
                      <span className="font-bold text-lg">CHF 108.10</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.vatRate}</TableHead>
                    <TableHead>{t.defaultRate}</TableHead>
                    <TableHead className="text-right">
                      {t.productsCount}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settings.vatConfig.map((vat) => (
                    <TableRow key={vat.rate}>
                      <TableCell className="font-medium">
                        {getVATLabel(vat.rate, "long", locale)}
                      </TableCell>
                      <TableCell>
                        {vat.isDefault && (
                          <Badge variant="default">{t.defaultRate}</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{vat.productCount}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        {/* Tab: Conditions */}
        <TabsContent value="conditions" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">
                {t.paymentConditionsTitle}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t.paymentConditionsDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <Label>{t.paymentTermDays}</Label>
                  <Input
                    type="number"
                    value={settings.paymentConditions.paymentTermDays}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t.requireImmediatePayment}</Label>
                  <Switch
                    checked={settings.paymentConditions.requireImmediatePayment}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>{t.allowDeposits}</Label>
                  <Switch checked={settings.paymentConditions.allowDeposits} />
                </div>
                {settings.paymentConditions.allowDeposits && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">% {t.minimumDeposit}</Label>
                      <Input
                        type="number"
                        value={settings.paymentConditions.minimumDepositPercent}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CHF {t.minimumDeposit}</Label>
                      <Input
                        type="number"
                        value={settings.paymentConditions.minimumDepositAmount}
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Label>{t.paymentInstructions}</Label>
                <Textarea
                  value={settings.paymentConditions.paymentInstructions}
                  rows={10}
                  className="mt-1 font-mono text-xs"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-1">{t.feesTitle}</h2>
              <p className="text-sm text-muted-foreground">
                {t.feesDescription}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t.lateCancellationFee}</Label>
                  <Switch
                    checked={settings.feesConfig.lateCancellationEnabled}
                  />
                </div>
                {settings.feesConfig.lateCancellationEnabled && (
                  <>
                    <div>
                      <Label>{t.cancellationGracePeriod}</Label>
                      <Input
                        type="number"
                        value={settings.feesConfig.cancellationGracePeriodHours}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>{t.cancellationFeeAmount}</Label>
                      <Input
                        type="number"
                        value={settings.feesConfig.cancellationFeeAmount}
                        className="mt-1"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>{t.latePaymentFees}</Label>
                  <Switch
                    checked={settings.feesConfig.latePaymentFeesEnabled}
                  />
                </div>
                {settings.feesConfig.latePaymentFeesEnabled && (
                  <div>
                    <Label>{t.interestRate} (%)</Label>
                    <Input
                      type="number"
                      value={settings.feesConfig.latePaymentInterestRate}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>{t.termsAndConditions}</Label>
              <Textarea
                value={settings.feesConfig.termsAndConditions}
                rows={12}
                className="mt-1 text-sm"
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Wizards */}
      <CreatePackageWizard
        open={packageWizardOpen}
        onOpenChange={setPackageWizardOpen}
        locale={locale}
        onSuccess={(data) => {
          console.log("Package created:", data);
          setPackageWizardOpen(false);
        }}
      />

      <CreatePromotionWizard
        open={promotionWizardOpen}
        onOpenChange={setPromotionWizardOpen}
        locale={locale}
        onSuccess={(data) => {
          console.log("Promotion created:", data);
          setPromotionWizardOpen(false);
        }}
      />

      {/* Dialogs */}
      <Dialog open={priceHistoryOpen} onOpenChange={setPriceHistoryOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HistoryIcon className="h-5 w-5" />

              {t.priceHistory || "Historique des Prix"}
            </DialogTitle>
            <DialogDescription>
              {t.priceHistoryDescription ||
                "Timeline complète des changements de prix avec audit trail"}
            </DialogDescription>
          </DialogHeader>
          <PriceHistoryTimeline
            locale={locale}
            onExport={() => console.log("Export history")}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <BarChart3Icon className="h-5 w-5" />

              {t.promotionsAnalytics || "Analytics Promotions"}
            </DialogTitle>
            <DialogDescription>
              {t.promotionsAnalyticsDescription ||
                "Analyse d'impact et ROI des codes promotionnels"}
            </DialogDescription>
          </DialogHeader>
          <PromotionsAnalyticsDashboard
            locale={locale}
            onExport={() => console.log("Export analytics")}
          />
        </DialogContent>
      </Dialog>

      <InvoicePreviewDialog
        open={invoicePreviewOpen}
        onOpenChange={setInvoicePreviewOpen}
        locale={locale}
        items={[
          {
            id: "1",
            description: "Pack réussite 20 leçons (Catégorie B)",
            quantity: 1,
            unitPrice: 1620,
            vatRate: 8.1,
            total: 1620,
          },
          {
            id: "2",
            description: "Cours sensibilisation 8h",
            quantity: 1,
            unitPrice: 250,
            vatRate: 8.1,
            total: 250,
          },
        ]}
        studentName="Sophie Martin"
        promotionCode="BIENVENUE2024"
        onDownload={() => console.log("Download PDF")}
        onPrint={() => console.log("Print")}
        onSendEmail={() => console.log("Send email")}
      />
    </div>
  );
}
