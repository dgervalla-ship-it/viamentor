/**
 * VIAMENTOR - Billing Quick Stats Section
 * Tabs Hero UI avec charts Recharts, actions requises, échéances
 * Limite: 235 lignes
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  AlertCircleIcon,
  BellIcon,
  CheckCircleIcon,
  FileTextIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  type BillingLocale,
  billingTranslations,
} from "@/polymet/data/viamentor-billing-i18n";
import {
  type RevenueDataPoint,
  type ActionRequired,
  type UpcomingDue,
  type RevenueByCategoryData,
  type ProductTypeData,
  type TopProduct,
  type PaymentMethodStats,
  type ReminderStats,
} from "@/polymet/data/viamentor-billing-data";

interface QuickStatsSectionProps {
  locale?: BillingLocale;
  revenueData: RevenueDataPoint[];
  actionsRequired: ActionRequired[];
  upcomingDues: UpcomingDue[];
  revenueByCategoryData: RevenueByCategoryData[];
  productTypeData: ProductTypeData[];
  topProducts: TopProduct[];
  paymentMethodStats: PaymentMethodStats[];
  reminderStats: ReminderStats[];
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function BillingQuickStatsSection({
  locale = "fr",
  revenueData,
  actionsRequired,
  upcomingDues,
  revenueByCategoryData,
  productTypeData,
  topProducts,
  paymentMethodStats,
  reminderStats,
}: QuickStatsSectionProps) {
  const t = billingTranslations[locale];
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat(
      locale === "de"
        ? "de-CH"
        : locale === "it"
          ? "it-CH"
          : locale === "en"
            ? "en-CH"
            : "fr-CH",
      {
        style: "currency",
        currency: "CHF",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }
    ).format(amount);
    return locale === "fr" ? formatted.replace(/\s/g, "'") : formatted;
  };

  const getDueBadgeColor = (days: number) => {
    if (days <= 1)
      return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400";
    if (days <= 3)
      return "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400";
  };

  return (
    <>
      {/* Desktop: Tabs (>= 1024px) */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="hidden lg:block space-y-4"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">{t.tabs.overview}</TabsTrigger>
          <TabsTrigger value="revenue">{t.tabs.revenue}</TabsTrigger>
          <TabsTrigger value="payments">{t.tabs.payments}</TabsTrigger>
          <TabsTrigger value="reminders">{t.tabs.reminders}</TabsTrigger>
        </TabsList>

        {/* Tab Overview */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t.overview.revenueChart}</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={revenueData}
                    margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />

                    <XAxis
                      dataKey="month"
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                    />

                    <YAxis
                      yAxisId="left"
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                      width={60}
                    />

                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      className="text-xs"
                      tick={{ fontSize: 11 }}
                      width={60}
                    />

                    <ChartTooltip />

                    <Legend wrapperStyle={{ fontSize: "12px" }} />

                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={2}
                      name={t.overview.revenue}
                      dot={{ r: 3 }}
                    />

                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="payments"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      name={t.overview.paymentsReceived}
                      dot={{ r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Actions Required */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  {t.overview.actionsRequired}
                </CardTitle>
                <Button size="sm" variant="outline">
                  {t.overview.processAll}
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {actionsRequired.map((action, idx) => (
                  <Alert key={idx} className="py-3">
                    <AlertCircleIcon className="h-4 w-4" />

                    <AlertDescription className="flex items-center justify-between">
                      <span className="text-sm">{action.label}</span>
                      <Badge variant="secondary">{action.count}</Badge>
                    </AlertDescription>
                  </Alert>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Dues */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.overview.upcomingDues}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t.overview.nextDays}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingDues.slice(0, 5).map((due) => (
                  <div
                    key={due.id}
                    className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted/50"
                  >
                    <Link
                      to={`/students/${due.student.id}`}
                      className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={due.student.avatar} />

                        <AvatarFallback>
                          {due.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {due.student.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCurrency(due.amount)}
                        </p>
                      </div>
                    </Link>
                    <Badge className={getDueBadgeColor(due.daysUntilDue)}>
                      {due.daysUntilDue} {t.overview.daysUntilDue}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab Revenue */}
        <TabsContent value="revenue" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.revenue.byCategory}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueByCategoryData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />

                      <XAxis dataKey="category" className="text-xs" />

                      <YAxis className="text-xs" />

                      <ChartTooltip />

                      <Legend />

                      <Bar
                        dataKey="B"
                        stackId="a"
                        fill="hsl(var(--chart-1))"
                        radius={[0, 0, 0, 0]}
                      />

                      <Bar
                        dataKey="A"
                        stackId="a"
                        fill="hsl(var(--chart-2))"
                        radius={[0, 0, 0, 0]}
                      />

                      <Bar
                        dataKey="BE"
                        stackId="a"
                        fill="hsl(var(--chart-3))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.revenue.byProductType}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={productTypeData}
                        dataKey="amount"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label
                      >
                        {productTypeData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {t.revenue.topProducts}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topProducts.map((product) => (
                  <div
                    key={product.rank}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        {product.rank}
                      </Badge>
                      <div>
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.count} ×{" "}
                          {formatCurrency(product.total / product.count)}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">
                      {formatCurrency(product.total)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Payments */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.payments.byMethod}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentMethodStats.map((method) => (
                  <div key={method.method} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {t.paymentMethods[method.method]}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {method.percentage}%
                      </span>
                    </div>
                    <Progress value={method.percentage} className="h-2" />

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {method.count} {t.payments.method}
                      </span>
                      <span>{formatCurrency(method.amount)}</span>
                      <span>
                        {method.averageDelay} {t.payments.days}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Reminders */}
        <TabsContent value="reminders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{t.reminders.byLevel}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminderStats.map((stat) => (
                  <div key={stat.level} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            stat.level === 1
                              ? "secondary"
                              : stat.level === 2
                                ? "outline"
                                : "destructive"
                          }
                        >
                          {t.reminders.level} {stat.level}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {stat.sent} {t.reminders.sent} • {stat.paid}{" "}
                          {t.reminders.paid}
                        </span>
                      </div>
                      <span className="text-sm font-semibold">
                        {stat.successRate.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={stat.successRate} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mobile & Tablet: Accordion (< 1024px) */}
      <Accordion
        type="single"
        collapsible
        defaultValue="overview"
        className="lg:hidden space-y-3"
      >
        {/* Accordion Item: Overview */}
        <AccordionItem value="overview" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg transition-colors duration-300 [&[data-state=open]]:bg-muted/50">
            <span className="text-base font-semibold">{t.tabs.overview}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t.overview.revenueChart}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueData}
                      margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />

                      <XAxis
                        dataKey="month"
                        className="text-xs"
                        tick={{ fontSize: 11 }}
                      />

                      <YAxis
                        yAxisId="left"
                        className="text-xs"
                        tick={{ fontSize: 11 }}
                        width={60}
                      />

                      <YAxis
                        yAxisId="right"
                        orientation="right"
                        className="text-xs"
                        tick={{ fontSize: 11 }}
                        width={60}
                      />

                      <ChartTooltip />

                      <Legend wrapperStyle={{ fontSize: "12px" }} />

                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        name={t.overview.revenue}
                        dot={{ r: 3 }}
                      />

                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="payments"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name={t.overview.paymentsReceived}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {/* Actions Required */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-base">
                    {t.overview.actionsRequired}
                  </CardTitle>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/invoices">{t.overview.processAll}</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {actionsRequired.map((action, idx) => (
                    <Alert key={idx} className="py-3">
                      <AlertCircleIcon className="h-4 w-4" />

                      <AlertDescription className="flex items-center justify-between">
                        <span className="text-sm">{action.label}</span>
                        <Badge variant="secondary">{action.count}</Badge>
                      </AlertDescription>
                    </Alert>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Dues */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t.overview.upcomingDues}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {t.overview.nextDays}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3">
                  {upcomingDues.slice(0, 5).map((due) => (
                    <div
                      key={due.id}
                      className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-muted/50 min-h-[48px]"
                    >
                      <Link
                        to={`/students/${due.student.id}`}
                        className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition-opacity"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={due.student.avatar} />

                          <AvatarFallback>
                            {due.student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {due.student.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatCurrency(due.amount)}
                          </p>
                        </div>
                      </Link>
                      <Badge className={getDueBadgeColor(due.daysUntilDue)}>
                        {due.daysUntilDue} {t.overview.daysUntilDue}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Accordion Item: Revenue */}
        <AccordionItem value="revenue" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg transition-colors duration-300 [&[data-state=open]]:bg-muted/50">
            <span className="text-base font-semibold">{t.tabs.revenue}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t.revenue.byCategory}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueByCategoryData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          className="stroke-muted"
                        />

                        <XAxis dataKey="category" className="text-xs" />

                        <YAxis className="text-xs" />

                        <ChartTooltip />

                        <Legend />

                        <Bar
                          dataKey="B"
                          stackId="a"
                          fill="hsl(var(--chart-1))"
                          radius={[0, 0, 0, 0]}
                        />

                        <Bar
                          dataKey="A"
                          stackId="a"
                          fill="hsl(var(--chart-2))"
                          radius={[0, 0, 0, 0]}
                        />

                        <Bar
                          dataKey="BE"
                          stackId="a"
                          fill="hsl(var(--chart-3))"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    {t.revenue.byProductType}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{}} className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={productTypeData}
                          dataKey="amount"
                          nameKey="type"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {productTypeData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.revenue.topProducts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {topProducts.map((product) => (
                    <div
                      key={product.rank}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 min-h-[48px]"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          className="w-8 h-8 flex items-center justify-center"
                        >
                          {product.rank}
                        </Badge>
                        <div>
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.count} ×{" "}
                            {formatCurrency(product.total / product.count)}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatCurrency(product.total)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Accordion Item: Payments */}
        <AccordionItem value="payments" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg transition-colors duration-300 [&[data-state=open]]:bg-muted/50">
            <span className="text-base font-semibold">{t.tabs.payments}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.payments.byMethod}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {paymentMethodStats.map((method) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {t.paymentMethods[method.method]}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {method.percentage}%
                        </span>
                      </div>
                      <Progress value={method.percentage} className="h-2" />

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {method.count} {t.payments.method}
                        </span>
                        <span>{formatCurrency(method.amount)}</span>
                        <span>
                          {method.averageDelay} {t.payments.days}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Accordion Item: Reminders */}
        <AccordionItem value="reminders" className="border rounded-lg">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-t-lg transition-colors duration-300 [&[data-state=open]]:bg-muted/50">
            <span className="text-base font-semibold">{t.tabs.reminders}</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  {t.reminders.byLevel}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reminderStats.map((stat) => (
                    <div key={stat.level} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              stat.level === 1
                                ? "secondary"
                                : stat.level === 2
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {t.reminders.level} {stat.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {stat.sent} {t.reminders.sent} • {stat.paid}{" "}
                            {t.reminders.paid}
                          </span>
                        </div>
                        <span className="text-sm font-semibold">
                          {stat.successRate.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={stat.successRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
