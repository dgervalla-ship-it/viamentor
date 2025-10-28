/**
 * VIAMENTOR - Payment Methods Breakdown Section
 * PieChart distribution et table détaillée
 */

import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Card as CardWrapper,
  CardContent as CardContentWrapper,
} from "@/components/ui/card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import {
  CreditCardIcon,
  BanknoteIcon,
  BuildingIcon,
  SmartphoneIcon,
  AlertCircleIcon,
  TrendingDownIcon,
} from "lucide-react";
import type {
  FinancialLocale,
  PaymentMethodData,
  PaymentMethod,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

interface PaymentMethodsBreakdownSectionProps {
  paymentMethodsData: PaymentMethodData[];
  locale?: FinancialLocale;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function PaymentMethodsBreakdownSection({
  paymentMethodsData,
  locale = "fr",
}: PaymentMethodsBreakdownSectionProps) {
  const t = getFinancialTranslations(locale).payments;
  const common = getFinancialTranslations(locale).common;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(paymentMethodsData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = paymentMethodsData.slice(startIndex, endIndex);

  // Format data for PieChart
  const pieData = paymentMethodsData.map((item) => ({
    name: t.methods[item.method],
    value: item.amount,
    transactions: item.transactions,
    fees: item.fees,
  }));

  // Calculate totals
  const totalAmount = paymentMethodsData.reduce(
    (sum, item) => sum + item.amount,
    0
  );
  const totalFees = paymentMethodsData.reduce(
    (sum, item) => sum + item.fees,
    0
  );
  const totalTransactions = paymentMethodsData.reduce(
    (sum, item) => sum + item.transactions,
    0
  );

  // Custom tooltip for PieChart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalAmount) * 100).toFixed(1);
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{data.name}</p>
          <div className="space-y-1 text-xs">
            <p>
              <span className="text-muted-foreground">{t.amount}:</span>{" "}
              <span className="font-medium">
                CHF {data.value.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">{t.transactions}:</span>{" "}
              <span className="font-medium">
                {data.payload.transactions.toLocaleString()}
              </span>
            </p>
            <p>
              <span className="text-muted-foreground">{t.fees}:</span>{" "}
              <span className="font-medium">
                CHF {data.payload.fees.toLocaleString()}
              </span>
            </p>
            <p className="text-muted-foreground">{percentage}% du total</p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Get icon for payment method
  const getMethodIcon = (method: PaymentMethod) => {
    const iconClass = "w-4 h-4";
    switch (method) {
      case "card":
        return <CreditCardIcon className={iconClass} />;

      case "cash":
        return <BanknoteIcon className={iconClass} />;

      case "transfer":
        return <BuildingIcon className={iconClass} />;

      case "twint":
        return <SmartphoneIcon className={iconClass} />;

      default:
        return <AlertCircleIcon className={iconClass} />;
    }
  };

  // Calculate fee percentage
  const getFeePercentage = (fees: number, amount: number) => {
    return ((fees / amount) * 100).toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Distribution PieChart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t.distribution}</span>
            <Button variant="outline" size="sm">
              {common.export}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* PieChart */}
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            {/* Summary Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {common.total} {t.amount}
                  </p>
                  <p className="text-2xl font-bold">
                    CHF {totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">
                    {common.total} {t.transactions}
                  </p>
                  <p className="text-2xl font-bold">
                    {totalTransactions.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircleIcon className="w-4 h-4 text-destructive" />

                  <p className="text-sm font-semibold text-destructive">
                    {common.total} {t.fees}
                  </p>
                </div>
                <p className="text-2xl font-bold text-destructive">
                  CHF {totalFees.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {((totalFees / totalAmount) * 100).toFixed(2)}% du montant
                  total
                </p>
              </div>

              {/* Legend */}
              <div className="space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />

                    <span className="flex-1">{item.name}</span>
                    <span className="font-medium">
                      {((item.value / totalAmount) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.method}</TableHead>
                  <TableHead className="text-right">{t.transactions}</TableHead>
                  <TableHead className="text-right">{t.amount}</TableHead>
                  <TableHead className="text-right">{t.fees}</TableHead>
                  <TableHead className="text-right">% {t.fees}</TableHead>
                  <TableHead className="text-right">{t.averageDelay}</TableHead>
                  <TableHead className="text-right">
                    {common.average} / transaction
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(item.method)}
                        <span className="font-medium">
                          {t.methods[item.method]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.transactions.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      CHF {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.fees > 0 ? (
                        <span className="text-destructive">
                          CHF {item.fees.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-green-600">CHF 0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.fees > 0 ? (
                        <Badge variant="destructive">
                          {getFeePercentage(item.fees, item.amount)}%
                        </Badge>
                      ) : (
                        <Badge
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          0%
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.averageDelay > 0 ? (
                        <span className="text-muted-foreground">
                          {item.averageDelay} {t.days}
                        </span>
                      ) : (
                        <Badge variant="secondary">Immédiat</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      CHF {(item.amount / item.transactions).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Row */}
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell>{common.total}</TableCell>
                  <TableCell className="text-right">
                    {totalTransactions.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    CHF {totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-destructive">
                    CHF {totalFees.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant="destructive">
                      {((totalFees / totalAmount) * 100).toFixed(2)}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">-</TableCell>
                  <TableCell className="text-right">
                    CHF {(totalAmount / totalTransactions).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="md:hidden space-y-4">
            {paginatedData.map((item, index) => (
              <CardWrapper key={index}>
                <CardContentWrapper className="p-4 space-y-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getMethodIcon(item.method)}
                      <span className="font-semibold">
                        {t.methods[item.method]}
                      </span>
                    </div>
                    {item.fees > 0 ? (
                      <Badge variant="destructive">
                        {getFeePercentage(item.fees, item.amount)}%
                      </Badge>
                    ) : (
                      <Badge
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        0%
                      </Badge>
                    )}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t.transactions}</p>
                      <p className="font-semibold">
                        {item.transactions.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.amount}</p>
                      <p className="font-semibold">
                        CHF {item.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.fees}</p>
                      {item.fees > 0 ? (
                        <p className="font-semibold text-destructive">
                          CHF {item.fees.toLocaleString()}
                        </p>
                      ) : (
                        <p className="font-semibold text-green-600">CHF 0</p>
                      )}
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.averageDelay}</p>
                      {item.averageDelay > 0 ? (
                        <p className="font-semibold">
                          {item.averageDelay} {t.days}
                        </p>
                      ) : (
                        <Badge variant="secondary">Immédiat</Badge>
                      )}
                    </div>
                  </div>

                  {/* Average per transaction */}
                  <div className="p-2 bg-muted rounded text-center">
                    <p className="text-xs text-muted-foreground">
                      {common.average} / transaction
                    </p>
                    <p className="font-semibold">
                      CHF {(item.amount / item.transactions).toFixed(2)}
                    </p>
                  </div>
                </CardContentWrapper>
              </CardWrapper>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      );
                    }
                    return null;
                  }
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* Recommendations */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-start gap-2 mb-2">
              <TrendingDownIcon className="w-4 h-4 text-green-600 mt-0.5" />

              <h4 className="font-semibold text-sm">{t.recommendations}</h4>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground ml-6">
              <li>
                • Encourager les virements bancaires (0% frais,{" "}
                {totalFees > 0
                  ? `économie potentielle CHF ${(totalAmount * 0.015).toFixed(0)}`
                  : "pas de frais"}
                )
              </li>
              <li>
                • Réduire l'usage carte bancaire (1.5% frais) en proposant
                réduction 2% pour virement
              </li>
              <li>
                • Twint: frais 1% - Alternative intéressante à la carte pour
                petits montants
              </li>
              <li>
                • Cash: Pas de frais mais risques sécurité - Limiter montants
                acceptés
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentMethodsBreakdownSection;
