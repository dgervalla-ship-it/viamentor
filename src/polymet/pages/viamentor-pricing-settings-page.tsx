/**
 * VIAMENTOR - Pricing Settings Page
 * Page principale paramètres tarification
 */

"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
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
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr, de, it, enUS } from "date-fns/locale";
import {
  SaveIcon,
  EyeIcon,
  PlusIcon,
  EditIcon,
  CopyIcon,
  TrashIcon,
  InfoIcon,
  TrendingUpIcon,
  PackageIcon,
  TagIcon,
  PercentIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  AlertTriangleIcon,
  CalculatorIcon,
} from "lucide-react";
import { FlexibleLessonPricing } from "@/polymet/components/viamentor-flexible-lesson-pricing";
import {
  mockPricingSettings,
  calculatePrice90min,
  calculatePackageSavings,
  calculateVAT,
  calculatePriceWithVAT,
  validateSwissVATNumber,
  getCategoryIcon,
  type LessonPrice,
  type LessonPackage,
  type Product,
  type Promotion,
  type VATRate,
  type PaymentMethod,
} from "@/polymet/data/viamentor-pricing-data";
import {
  getPricingTranslation,
  formatCurrency,
  formatPercentage,
  getVATLabel,
  type PricingLocale,
} from "@/polymet/data/viamentor-pricing-i18n";

export interface PricingSettingsPageProps {
  locale?: PricingLocale;
}

export function PricingSettingsPage({
  locale = "fr",
}: PricingSettingsPageProps) {
  const t = getPricingTranslation(locale);
  const [activeTab, setActiveTab] = useState("lessons");
  const [lessonPrices, setLessonPrices] = useState<LessonPrice[]>(
    mockPricingSettings.lessonPrices
  );
  const [packages, setPackages] = useState<LessonPackage[]>(
    mockPricingSettings.packages
  );
  const [products, setProducts] = useState<Product[]>(
    mockPricingSettings.products
  );
  const [promotions, setPromotions] = useState<Promotion[]>(
    mockPricingSettings.promotions
  );
  const [vatConfig, setVatConfig] = useState(mockPricingSettings.vatConfig);
  const [schoolVATNumber, setSchoolVATNumber] = useState(
    mockPricingSettings.schoolVATNumber
  );
  const [isVATRegistered, setIsVATRegistered] = useState(
    mockPricingSettings.isVATRegistered
  );
  const [displayPricesWithVAT, setDisplayPricesWithVAT] = useState(
    mockPricingSettings.displayPricesWithVAT
  );
  const [paymentConditions, setPaymentConditions] = useState(
    mockPricingSettings.paymentConditions
  );
  const [feesConfig, setFeesConfig] = useState(mockPricingSettings.feesConfig);
  const [showVATCalculator, setShowVATCalculator] = useState(false);
  const [vatCalcAmount, setVatCalcAmount] = useState(100);
  const [vatCalcRate, setVatCalcRate] = useState<VATRate>(8.1);

  const handleSave = () => {
    console.log("Saving pricing settings...");
    // TODO: API call
  };

  const handlePreviewInvoice = () => {
    console.log("Previewing invoice...");
    // TODO: Open preview dialog
  };

  const updateLessonPrice = (
    id: string,
    field: keyof LessonPrice,
    value: any
  ) => {
    setLessonPrices((prev) =>
      prev.map((price) => {
        if (price.id === id) {
          const updated = { ...price, [field]: value };
          if (field === "price45min" && updated.autoCalculate90min) {
            updated.price90min = calculatePrice90min(value);
          }
          if (field === "autoCalculate90min" && value) {
            updated.price90min = calculatePrice90min(updated.price45min);
          }
          return updated;
        }
        return price;
      })
    );
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.pageTitle}</h1>
          <p className="text-muted-foreground">{t.pageDescription}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handlePreviewInvoice}>
            <EyeIcon className="mr-2 h-4 w-4" />

            {t.previewInvoice}
          </Button>
          <Button onClick={handleSave}>
            <SaveIcon className="mr-2 h-4 w-4" />

            {t.saveSettings}
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="lessons">{t.tabLessons}</TabsTrigger>
          <TabsTrigger value="packages">{t.tabPackages}</TabsTrigger>
          <TabsTrigger value="services">{t.tabServices}</TabsTrigger>
          <TabsTrigger value="promotions">{t.tabPromotions}</TabsTrigger>
          <TabsTrigger value="vat">{t.tabVAT}</TabsTrigger>
          <TabsTrigger value="conditions">{t.tabConditions}</TabsTrigger>
        </TabsList>

        {/* Tab 1: Lessons Pricing - NOUVELLE VERSION FLEXIBLE */}
        <TabsContent value="lessons" className="space-y-6">
          <FlexibleLessonPricing
            locale={locale}
            onSave={(data) => {
              console.log("Saved flexible pricing:", data);
              // TODO: API call to save
            }}
          />

          {/* ANCIENNE VERSION - Conservée en commentaire pour référence
               <Card data-pol-id="da2tcg">
                <CardHeader data-pol-id="dm56fs">
                  <CardTitle data-pol-id="pyqouc">
                    {t.lessonsPricingTitle}
                  </CardTitle>
                  <CardDescription data-pol-id="xymayx">
                    {t.lessonsPricingDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4" data-pol-id="65gdl0">
                  <Table data-pol-id="ksr2j2">
                    <TableHeader data-pol-id="9frpui">
                      <TableRow data-pol-id="7e4661">
                        <TableHead data-pol-id="6vgz6w">{t.category}</TableHead>
                        <TableHead data-pol-id="vqdtmu">{t.price45min}</TableHead>
                        <TableHead data-pol-id="gxuv6e">{t.price90min}</TableHead>
                        <TableHead data-pol-id="2o8pzl">
                          {t.autoCalculate}
                        </TableHead>
                        <TableHead data-pol-id="0777t3">
                          {t.visibleForBooking}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody data-pol-id="csry6q">
                      {lessonPrices.map((price) => (
                        <TableRow key={price.id} data-pol-id="5afony">
                          <TableCell data-pol-id="x2pasu">
                            <div
                              className="flex items-center gap-2"
                              data-pol-id="24ru68"
                            >
                              <span className="text-xl" data-pol-id="yvghr5">
                                {getCategoryIcon(price.category)}
                              </span>
                              <Badge variant="outline" data-pol-id="n4z2ur">
                                {price.category}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell data-pol-id="xyvznp">
                            <Input
                              type="number"
                              value={price.price45min}
                              onChange={(e) =>
                                updateLessonPrice(
                                  price.id,
                                  "price45min",
                                  parseFloat(e.target.value)
                                )
                              }
                              className="w-32"
                              data-pol-id="pfg948"
                            />
                          </TableCell>
                          <TableCell data-pol-id="q0ve1s">
                            <Input
                              type="number"
                              value={price.price90min}
                              onChange={(e) =>
                                updateLessonPrice(
                                  price.id,
                                  "price90min",
                                  parseFloat(e.target.value)
                                )
                              }
                              disabled={price.autoCalculate90min}
                              className="w-32"
                              data-pol-id="iqovis"
                            />
                          </TableCell>
                          <TableCell data-pol-id="nn5noc">
                            <Switch
                              checked={price.autoCalculate90min}
                              onCheckedChange={(checked) =>
                                updateLessonPrice(
                                  price.id,
                                  "autoCalculate90min",
                                  checked
                                )
                              }
                              data-pol-id="xa84fj"
                            />
                          </TableCell>
                          <TableCell data-pol-id="n3qjy7">
                            <Switch
                              checked={price.visibleForBooking}
                              onCheckedChange={(checked) =>
                                updateLessonPrice(
                                  price.id,
                                  "visibleForBooking",
                                  checked
                                )
                              }
                              data-pol-id="xhingx"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Alert data-pol-id="pmyi40">
                    <InfoIcon className="h-4 w-4" data-pol-id="iwv7m6" />
                     <AlertDescription data-pol-id="6hbz9g">
                      {t.lessonsPricingInfo}
                    </AlertDescription>
                  </Alert>
                </CardContent>
               </Card>
               */}
        </TabsContent>

        {/* Tab 2: Packages */}
        <TabsContent value="packages" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.packagesTitle}</CardTitle>
                  <CardDescription>{t.packagesDescription}</CardDescription>
                </div>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />

                  {t.createPackage}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.packageName}</TableHead>
                    <TableHead>{t.category}</TableHead>
                    <TableHead>{t.lessonCount}</TableHead>
                    <TableHead>{t.totalPrice}</TableHead>
                    <TableHead>{t.unitPrice}</TableHead>
                    <TableHead>{t.savings}</TableHead>
                    <TableHead>{t.soldCount}</TableHead>
                    <TableHead>{t.active}</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{pkg.category}</Badge>
                      </TableCell>
                      <TableCell>{pkg.lessonCount}</TableCell>
                      <TableCell>
                        {formatCurrency(pkg.totalPrice, locale)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(pkg.unitPrice, locale)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
                        >
                          {formatCurrency(pkg.savings, locale)} (
                          {formatPercentage(pkg.savingsPercentage, locale)})
                        </Badge>
                      </TableCell>
                      <TableCell>{pkg.soldCount}</TableCell>
                      <TableCell>
                        <Switch checked={pkg.isActive} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <CopyIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Popular Packages Stats */}
          <Card>
            <CardHeader>
              <CardTitle>{t.popularPackages}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {packages.slice(0, 3).map((pkg) => (
                  <div
                    key={pkg.id}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="text-sm font-medium mb-1">{pkg.name}</div>
                    <div className="text-2xl font-bold">{pkg.soldCount}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.soldCount}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Services */}
        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.productsTitle}</CardTitle>
                  <CardDescription>{t.productsDescription}</CardDescription>
                </div>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />

                  {t.addService}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.productName}</TableHead>
                    <TableHead>{t.description}</TableHead>
                    <TableHead>{t.price}</TableHead>
                    <TableHead>{t.durationHours}</TableHead>
                    <TableHead>{t.vatRate}</TableHead>
                    <TableHead>{t.mandatory}</TableHead>
                    <TableHead>{t.active}</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {product.description}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(product.price, locale)}
                      </TableCell>
                      <TableCell>
                        {product.durationHours
                          ? `${product.durationHours}h`
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getVATLabel(product.vatRate, "short", locale)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.isMandatory && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 dark:bg-orange-900"
                          >
                            {t.mandatory}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch checked={product.isActive} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Promotions */}
        <TabsContent value="promotions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.promotionsTitle}</CardTitle>
                  <CardDescription>{t.promotionsDescription}</CardDescription>
                </div>
                <Button>
                  <PlusIcon className="mr-2 h-4 w-4" />

                  {t.createPromotion}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.promoCode}</TableHead>
                    <TableHead>{t.promoType}</TableHead>
                    <TableHead>{t.promoValue}</TableHead>
                    <TableHead>{t.applicableTo}</TableHead>
                    <TableHead>{t.startDate}</TableHead>
                    <TableHead>{t.endDate}</TableHead>
                    <TableHead>{t.currentUsages}</TableHead>
                    <TableHead>{t.active}</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-mono font-semibold">
                        {promo.code}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {promo.type === "percentage" ? (
                            <PercentIcon className="h-3 w-3 mr-1" />
                          ) : (
                            <DollarSignIcon className="h-3 w-3 mr-1" />
                          )}
                          {t.promotionTypes[promo.type]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {promo.type === "percentage"
                          ? `${promo.value}%`
                          : formatCurrency(promo.value, locale)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {promo.applicableTo.map((item) => (
                            <Badge
                              key={item}
                              variant="secondary"
                              className="text-xs"
                            >
                              {t.applicableToOptions[item]}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(promo.startDate).toLocaleDateString(
                          locale === "fr"
                            ? "fr-CH"
                            : locale === "de"
                              ? "de-CH"
                              : locale === "it"
                                ? "it-CH"
                                : "en-CH"
                        )}
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(promo.endDate).toLocaleDateString(
                          locale === "fr"
                            ? "fr-CH"
                            : locale === "de"
                              ? "de-CH"
                              : locale === "it"
                                ? "it-CH"
                                : "en-CH"
                        )}
                      </TableCell>
                      <TableCell>
                        {promo.currentUsages}
                        {promo.maxUsages && ` / ${promo.maxUsages}`}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={promo.isActive ? "default" : "secondary"}
                        >
                          {promo.isActive ? t.active : "Inactif"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <EditIcon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 5: VAT */}
        <TabsContent value="vat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.vatConfigTitle}</CardTitle>
              <CardDescription>{t.vatConfigDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="vatNumber">{t.vatNumber}</Label>
                  <Input
                    id="vatNumber"
                    value={schoolVATNumber}
                    onChange={(e) => setSchoolVATNumber(e.target.value)}
                    placeholder="CHE-XXX.XXX.XXX"
                  />

                  {schoolVATNumber &&
                    !validateSwissVATNumber(schoolVATNumber) && (
                      <p className="text-sm text-destructive">
                        Format invalide
                      </p>
                    )}
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="vatRegistered">{t.vatRegistered}</Label>
                    <Switch
                      id="vatRegistered"
                      checked={isVATRegistered}
                      onCheckedChange={setIsVATRegistered}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="displayWithVAT">
                      {t.displayPricesWithVAT}
                    </Label>
                    <Switch
                      id="displayWithVAT"
                      checked={displayPricesWithVAT}
                      onCheckedChange={setDisplayPricesWithVAT}
                    />
                  </div>
                </div>
              </div>

              {!isVATRegistered && (
                <Alert>
                  <InfoIcon className="h-4 w-4" />

                  <AlertDescription>
                    Produits facturés sans TVA avec mention "Non assujetti"
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-3 gap-4">
                {vatConfig.map((vat) => (
                  <Card key={vat.rate}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-2xl">{vat.rate}%</CardTitle>
                      <CardDescription>{vat.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        {vat.productCount} {t.productsCount.toLowerCase()}
                      </div>
                      {vat.isDefault && (
                        <Badge variant="secondary" className="mt-2">
                          {t.defaultRate}
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Dialog
                  open={showVATCalculator}
                  onOpenChange={setShowVATCalculator}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <CalculatorIcon className="mr-2 h-4 w-4" />

                      {t.vatCalculator}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t.vatCalculator}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>{t.amountExclVAT}</Label>
                        <Input
                          type="number"
                          value={vatCalcAmount}
                          onChange={(e) =>
                            setVatCalcAmount(parseFloat(e.target.value))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.vatRate}</Label>
                        <Select
                          value={vatCalcRate.toString()}
                          onValueChange={(v) =>
                            setVatCalcRate(parseFloat(v) as VATRate)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="2.5">2.5%</SelectItem>
                            <SelectItem value="8.1">8.1%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t.amountExclVAT}:
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(vatCalcAmount, locale)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            {t.vatAmount}:
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(
                              calculateVAT(vatCalcAmount, vatCalcRate),
                              locale
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">
                            {t.amountInclVAT}:
                          </span>
                          <span className="font-bold">
                            {formatCurrency(
                              calculatePriceWithVAT(vatCalcAmount, vatCalcRate),
                              locale
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 6: Conditions */}
        <TabsContent value="conditions" className="space-y-6">
          {/* Payment Conditions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.paymentConditionsTitle}</CardTitle>
              <CardDescription>
                {t.paymentConditionsDescription}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="paymentTermDays">{t.paymentTermDays}</Label>
                  <Input
                    id="paymentTermDays"
                    type="number"
                    value={paymentConditions.paymentTermDays}
                    onChange={(e) =>
                      setPaymentConditions({
                        ...paymentConditions,
                        paymentTermDays: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t.acceptedMethods}</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {(
                      [
                        "cash",
                        "card",
                        "bank_transfer",
                        "twint",
                        "postfinance",
                      ] as PaymentMethod[]
                    ).map((method) => (
                      <div key={method} className="flex items-center space-x-2">
                        <Checkbox
                          id={method}
                          checked={paymentConditions.acceptedMethods.includes(
                            method
                          )}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setPaymentConditions({
                                ...paymentConditions,
                                acceptedMethods: [
                                  ...paymentConditions.acceptedMethods,
                                  method,
                                ],
                              });
                            } else {
                              setPaymentConditions({
                                ...paymentConditions,
                                acceptedMethods:
                                  paymentConditions.acceptedMethods.filter(
                                    (m) => m !== method
                                  ),
                              });
                            }
                          }}
                        />

                        <Label htmlFor={method} className="text-sm font-normal">
                          {t.paymentMethods[method]}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentInstructions">
                  {t.paymentInstructions}
                </Label>
                <Textarea
                  id="paymentInstructions"
                  value={paymentConditions.paymentInstructions}
                  onChange={(e) =>
                    setPaymentConditions({
                      ...paymentConditions,
                      paymentInstructions: e.target.value,
                    })
                  }
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireImmediatePayment">
                    {t.requireImmediatePayment}
                  </Label>
                  <Switch
                    id="requireImmediatePayment"
                    checked={paymentConditions.requireImmediatePayment}
                    onCheckedChange={(checked) =>
                      setPaymentConditions({
                        ...paymentConditions,
                        requireImmediatePayment: checked,
                      })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowDeposits">{t.allowDeposits}</Label>
                  <Switch
                    id="allowDeposits"
                    checked={paymentConditions.allowDeposits}
                    onCheckedChange={(checked) =>
                      setPaymentConditions({
                        ...paymentConditions,
                        allowDeposits: checked,
                      })
                    }
                  />
                </div>
                {paymentConditions.allowDeposits && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="minimumDepositPercent">
                        {t.minimumDeposit} (%)
                      </Label>
                      <Input
                        id="minimumDepositPercent"
                        type="number"
                        value={paymentConditions.minimumDepositPercent}
                        onChange={(e) =>
                          setPaymentConditions({
                            ...paymentConditions,
                            minimumDepositPercent: parseInt(e.target.value),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minimumDepositAmount">
                        {t.minimumDeposit} (CHF)
                      </Label>
                      <Input
                        id="minimumDepositAmount"
                        type="number"
                        value={paymentConditions.minimumDepositAmount}
                        onChange={(e) =>
                          setPaymentConditions({
                            ...paymentConditions,
                            minimumDepositAmount: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Fees & Penalties */}
          <Card>
            <CardHeader>
              <CardTitle>{t.feesTitle}</CardTitle>
              <CardDescription>{t.feesDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="lateCancellationEnabled">
                    {t.lateCancellationFee}
                  </Label>
                  <Switch
                    id="lateCancellationEnabled"
                    checked={feesConfig.lateCancellationEnabled}
                    onCheckedChange={(checked) =>
                      setFeesConfig({
                        ...feesConfig,
                        lateCancellationEnabled: checked,
                      })
                    }
                  />
                </div>
                {feesConfig.lateCancellationEnabled && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="cancellationGracePeriodHours">
                        {t.cancellationGracePeriod}
                      </Label>
                      <Input
                        id="cancellationGracePeriodHours"
                        type="number"
                        value={feesConfig.cancellationGracePeriodHours}
                        onChange={(e) =>
                          setFeesConfig({
                            ...feesConfig,
                            cancellationGracePeriodHours: parseInt(
                              e.target.value
                            ),
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cancellationFeeAmount">
                        {t.cancellationFeeAmount} (CHF)
                      </Label>
                      <Input
                        id="cancellationFeeAmount"
                        type="number"
                        value={feesConfig.cancellationFeeAmount}
                        onChange={(e) =>
                          setFeesConfig({
                            ...feesConfig,
                            cancellationFeeAmount: parseFloat(e.target.value),
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="latePaymentFeesEnabled">
                    {t.latePaymentFees}
                  </Label>
                  <Switch
                    id="latePaymentFeesEnabled"
                    checked={feesConfig.latePaymentFeesEnabled}
                    onCheckedChange={(checked) =>
                      setFeesConfig({
                        ...feesConfig,
                        latePaymentFeesEnabled: checked,
                      })
                    }
                  />
                </div>
                {feesConfig.latePaymentFeesEnabled && (
                  <div className="space-y-2 pl-6">
                    <Label htmlFor="latePaymentInterestRate">
                      {t.interestRate} (%)
                    </Label>
                    <Input
                      id="latePaymentInterestRate"
                      type="number"
                      value={feesConfig.latePaymentInterestRate}
                      onChange={(e) =>
                        setFeesConfig({
                          ...feesConfig,
                          latePaymentInterestRate: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="termsAndConditions">
                  {t.termsAndConditions}
                </Label>
                <Textarea
                  id="termsAndConditions"
                  value={feesConfig.termsAndConditions}
                  onChange={(e) =>
                    setFeesConfig({
                      ...feesConfig,
                      termsAndConditions: e.target.value,
                    })
                  }
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
