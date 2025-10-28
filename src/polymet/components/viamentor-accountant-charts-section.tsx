/**
 * VIAMENTOR - Accountant Charts Section
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ACCOUNTANT_I18N,
  type AccountantLocale,
} from "@/polymet/data/viamentor-accountant-i18n";
import { MOCK_ACCOUNTANT_DASHBOARD } from "@/polymet/data/viamentor-accountant-data";

interface AccountantChartsSectionProps {
  locale?: AccountantLocale;
}

export function AccountantChartsSection({
  locale = "fr",
}: AccountantChartsSectionProps) {
  const t = ACCOUNTANT_I18N[locale];
  const data = MOCK_ACCOUNTANT_DASHBOARD;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Évolution revenus */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.analytics.revenueEvolution}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueEvolution}>
                  <ChartTooltip content={<ChartTooltipContent />} />

                  <XAxis dataKey="month" />

                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="target"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Répartition revenus */}
        <Card>
          <CardHeader>
            <CardTitle>{t.analytics.revenueBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[200px] w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />

                  <Pie
                    data={data.revenueCategories}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                  >
                    {data.revenueCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="space-y-2">
              {data.revenueCategories.map((cat) => (
                <div key={cat.category} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />

                  <span className="flex-1 text-sm">
                    {
                      t.analytics.categories[
                        cat.category as keyof typeof t.analytics.categories
                      ]
                    }
                  </span>
                  <span className="font-semibold text-sm">
                    {cat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Moyens de paiement */}
      <Card>
        <CardHeader>
          <CardTitle>{t.analytics.paymentMethods}</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.paymentMethods}>
                <ChartTooltip content={<ChartTooltipContent />} />

                <XAxis
                  dataKey="method"
                  tickFormatter={(value) =>
                    t.transactions.methods[
                      value as keyof typeof t.transactions.methods
                    ]
                  }
                />

                <Bar
                  dataKey="percentage"
                  fill="hsl(var(--chart-1))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
