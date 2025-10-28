/**
 * VIAMENTOR - Pricing Analysis Section
 * ScatterPlot prix×volume et comparaison concurrence
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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  TrendingUpIcon,
  TrendingDownIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from "lucide-react";
import type {
  FinancialLocale,
  PricingData,
  CompetitorPricing,
} from "@/polymet/data/viamentor-financial-analytics-data";
import { getFinancialTranslations } from "@/polymet/data/viamentor-financial-analytics-i18n";

interface PricingAnalysisSectionProps {
  pricingData: PricingData[];
  competitorPricing: CompetitorPricing[];
  locale?: FinancialLocale;
}

export function PricingAnalysisSection({
  pricingData,
  competitorPricing,
  locale = "fr",
}: PricingAnalysisSectionProps) {
  const t = getFinancialTranslations(locale).pricing;
  const [currentPagePricing, setCurrentPagePricing] = useState(1);
  const [currentPageCompetitor, setCurrentPageCompetitor] = useState(1);
  const itemsPerPage = 5;

  // Pagination logic for pricing data
  const totalPagesPricing = Math.ceil(pricingData.length / itemsPerPage);
  const startIndexPricing = (currentPagePricing - 1) * itemsPerPage;
  const endIndexPricing = startIndexPricing + itemsPerPage;
  const paginatedPricingData = pricingData.slice(
    startIndexPricing,
    endIndexPricing
  );

  // Pagination logic for competitor pricing
  const totalPagesCompetitor = Math.ceil(
    competitorPricing.length / itemsPerPage
  );
  const startIndexCompetitor = (currentPageCompetitor - 1) * itemsPerPage;
  const endIndexCompetitor = startIndexCompetitor + itemsPerPage;
  const paginatedCompetitorPricing = competitorPricing.slice(
    startIndexCompetitor,
    endIndexCompetitor
  );

  // Format data for ScatterPlot
  const scatterData = pricingData.map((item) => ({
    x: item.averagePrice,
    y: item.volume,
    z: item.revenue / 1000, // Size of bubble
    name: item.product,
    elasticity: item.elasticity,
  }));

  // Custom tooltip for ScatterPlot
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-sm mb-2">{data.name}</p>
          <div className="space-y-1 text-xs">
            <p>
              <span className="text-muted-foreground">{t.averagePrice}:</span>{" "}
              <span className="font-medium">CHF {data.x}</span>
            </p>
            <p>
              <span className="text-muted-foreground">{t.volume}:</span>{" "}
              <span className="font-medium">{data.y}</span>
            </p>
            <p>
              <span className="text-muted-foreground">{t.revenue}:</span>{" "}
              <span className="font-medium">
                CHF {(data.z * 1000).toLocaleString()}
              </span>
            </p>
            {data.elasticity && (
              <p>
                <span className="text-muted-foreground">{t.elasticity}:</span>{" "}
                <span className="font-medium">{data.elasticity}</span>
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate price difference vs competitors
  const getPriceDifference = (row: CompetitorPricing) => {
    const competitors = [row.competitorA, row.competitorB, row.competitorC];
    const avgCompetitor =
      competitors.reduce((a, b) => a + b, 0) / competitors.length;
    const diff = ((row.ourPrice - avgCompetitor) / avgCompetitor) * 100;
    return diff;
  };

  const getPriceStatus = (diff: number) => {
    if (diff < -5) return "competitive";
    if (diff > 5) return "expensive";
    return "neutral";
  };

  return (
    <div className="space-y-6">
      {/* ScatterPlot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{t.scatterPlot}</span>
            <Button variant="outline" size="sm">
              {getFinancialTranslations(locale).common.export}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                />

                <XAxis
                  type="number"
                  dataKey="x"
                  name={t.averagePrice}
                  unit=" CHF"
                  className="text-xs"
                />

                <YAxis
                  type="number"
                  dataKey="y"
                  name={t.volume}
                  className="text-xs"
                />

                <Tooltip content={<CustomTooltip />} />

                <Legend />

                <Scatter
                  name={t.averagePrices}
                  data={scatterData}
                  fill="hsl(var(--chart-1))"
                >
                  {scatterData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(var(--chart-${(index % 5) + 1}))`}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend with product names */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {scatterData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`,
                  }}
                />

                <span className="text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pricing Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t.averagePrices}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.product}</TableHead>
                  <TableHead className="text-right">{t.averagePrice}</TableHead>
                  <TableHead className="text-right">{t.volume}</TableHead>
                  <TableHead className="text-right">{t.revenue}</TableHead>
                  <TableHead className="text-right">{t.elasticity}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPricingData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.product}
                    </TableCell>
                    <TableCell className="text-right">
                      CHF {item.averagePrice}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.volume.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      CHF {item.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {item.elasticity ? (
                        <Badge
                          variant={
                            item.elasticity > -0.5 ? "default" : "secondary"
                          }
                        >
                          {item.elasticity}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards for Pricing */}
          <div className="md:hidden space-y-4">
            {paginatedPricingData.map((item, index) => (
              <CardWrapper key={index}>
                <CardContentWrapper className="p-4 space-y-3">
                  <div className="font-semibold text-lg">{item.product}</div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">{t.averagePrice}</p>
                      <p className="font-semibold">CHF {item.averagePrice}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.volume}</p>
                      <p className="font-semibold">
                        {item.volume.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.revenue}</p>
                      <p className="font-semibold">
                        CHF {item.revenue.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">{t.elasticity}</p>
                      {item.elasticity ? (
                        <Badge
                          variant={
                            item.elasticity > -0.5 ? "default" : "secondary"
                          }
                        >
                          {item.elasticity}
                        </Badge>
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </div>
                </CardContentWrapper>
              </CardWrapper>
            ))}
          </div>

          {/* Pagination for Pricing */}
          {totalPagesPricing > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPagePricing(Math.max(1, currentPagePricing - 1))
                    }
                    className={
                      currentPagePricing === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPagesPricing }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPagesPricing ||
                      (page >= currentPagePricing - 1 &&
                        page <= currentPagePricing + 1)
                    ) {
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPagePricing(page)}
                            isActive={currentPagePricing === page}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      page === currentPagePricing - 2 ||
                      page === currentPagePricing + 2
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
                      setCurrentPagePricing(
                        Math.min(totalPagesPricing, currentPagePricing + 1)
                      )
                    }
                    className={
                      currentPagePricing === totalPagesPricing
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>

      {/* Competitor Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>{t.competition.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.product}</TableHead>
                  <TableHead className="text-right">
                    {t.competition.ourPrice}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.competition.competitorA}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.competition.competitorB}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.competition.competitorC}
                  </TableHead>
                  <TableHead className="text-right">
                    {t.competition.difference}
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCompetitorPricing.map((row, index) => {
                  const diff = getPriceDifference(row);
                  const status = getPriceStatus(diff);

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {row.product}
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        CHF {row.ourPrice}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        CHF {row.competitorA}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        CHF {row.competitorB}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        CHF {row.competitorC}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {diff > 0 ? (
                            <TrendingUpIcon className="w-3 h-3 text-destructive" />
                          ) : (
                            <TrendingDownIcon className="w-3 h-3 text-green-600" />
                          )}
                          <span
                            className={
                              diff > 0 ? "text-destructive" : "text-green-600"
                            }
                          >
                            {diff > 0 ? "+" : ""}
                            {diff.toFixed(1)}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {status === "competitive" && (
                          <Badge
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircleIcon className="w-3 h-3 mr-1" />

                            {t.competition.competitive}
                          </Badge>
                        )}
                        {status === "expensive" && (
                          <Badge variant="destructive">
                            <AlertCircleIcon className="w-3 h-3 mr-1" />

                            {t.competition.expensive}
                          </Badge>
                        )}
                        {status === "neutral" && (
                          <Badge variant="secondary">
                            {t.competition.competitive}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile/Tablet Cards for Competitor Comparison */}
          <div className="md:hidden space-y-4">
            {paginatedCompetitorPricing.map((row, index) => {
              const diff = getPriceDifference(row);
              const status = getPriceStatus(diff);

              return (
                <CardWrapper key={index}>
                  <CardContentWrapper className="p-4 space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="font-semibold text-lg">{row.product}</div>
                      {status === "competitive" && (
                        <Badge
                          variant="default"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircleIcon className="w-3 h-3 mr-1" />

                          {t.competition.competitive}
                        </Badge>
                      )}
                      {status === "expensive" && (
                        <Badge variant="destructive">
                          <AlertCircleIcon className="w-3 h-3 mr-1" />

                          {t.competition.expensive}
                        </Badge>
                      )}
                      {status === "neutral" && (
                        <Badge variant="secondary">
                          {t.competition.competitive}
                        </Badge>
                      )}
                    </div>

                    {/* Our Price */}
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-muted-foreground">
                        {t.competition.ourPrice}
                      </p>
                      <p className="text-xl font-bold">CHF {row.ourPrice}</p>
                    </div>

                    {/* Competitors Grid */}
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {t.competition.competitorA}
                        </p>
                        <p className="font-medium">CHF {row.competitorA}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {t.competition.competitorB}
                        </p>
                        <p className="font-medium">CHF {row.competitorB}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          {t.competition.competitorC}
                        </p>
                        <p className="font-medium">CHF {row.competitorC}</p>
                      </div>
                    </div>

                    {/* Difference */}
                    <div className="flex items-center justify-center gap-2 p-2 bg-muted rounded">
                      {diff > 0 ? (
                        <TrendingUpIcon className="w-4 h-4 text-destructive" />
                      ) : (
                        <TrendingDownIcon className="w-4 h-4 text-green-600" />
                      )}
                      <span
                        className={`font-semibold ${
                          diff > 0 ? "text-destructive" : "text-green-600"
                        }`}
                      >
                        {diff > 0 ? "+" : ""}
                        {diff.toFixed(1)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        vs moyenne
                      </span>
                    </div>
                  </CardContentWrapper>
                </CardWrapper>
              );
            })}
          </div>

          {/* Pagination for Competitor Comparison */}
          {totalPagesCompetitor > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setCurrentPageCompetitor(
                        Math.max(1, currentPageCompetitor - 1)
                      )
                    }
                    className={
                      currentPageCompetitor === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from(
                  { length: totalPagesCompetitor },
                  (_, i) => i + 1
                ).map((page) => {
                  if (
                    page === 1 ||
                    page === totalPagesCompetitor ||
                    (page >= currentPageCompetitor - 1 &&
                      page <= currentPageCompetitor + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPageCompetitor(page)}
                          isActive={currentPageCompetitor === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    page === currentPageCompetitor - 2 ||
                    page === currentPageCompetitor + 2
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setCurrentPageCompetitor(
                        Math.min(
                          totalPagesCompetitor,
                          currentPageCompetitor + 1
                        )
                      )
                    }
                    className={
                      currentPageCompetitor === totalPagesCompetitor
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          {/* Recommendations */}
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold text-sm mb-2">
              {t.competition.recommendations}
            </h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                • Leçon A: Prix compétitif (-3.6% vs concurrence) - Maintenir
              </li>
              <li>
                • Forfait 10 leçons B: Prix élevé (+2.3%) - Envisager réduction
                5%
              </li>
              <li>
                • Cours théorique: Prix très compétitif (-6.7%) - Opportunité
                d'augmentation
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PricingAnalysisSection;
