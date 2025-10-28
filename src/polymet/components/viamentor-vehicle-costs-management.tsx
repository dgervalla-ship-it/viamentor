/**
 * VIAMENTOR - Vehicle Costs Management
 * Gestion coûts avec stats cards, DataTable, Charts Recharts, export
 */

import { useState } from "react";
import {
  type VehicleCost,
  type CostCategory,
} from "@/polymet/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  PlusIcon,
  DownloadIcon,
  FileTextIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

interface VehicleCostsManagementProps {
  costs: VehicleCost[];
  totalKm: number;
  totalHours: number;
  revenue?: number;
  locale?: VehicleDetailLocale;
  onAdd?: () => void;
  onEdit?: (cost: VehicleCost) => void;
  onDelete?: (cost: VehicleCost) => void;
  onExport?: () => void;
}

export function VehicleCostsManagement({
  costs,
  totalKm,
  totalHours,
  revenue,
  locale = "fr",
  onAdd,
  onEdit,
  onDelete,
  onExport,
}: VehicleCostsManagementProps) {
  const t = getVehicleDetailI18n(locale).costs;
  const [period, setPeriod] = useState("all");
  const [filterCategory, setFilterCategory] = useState<CostCategory | "all">(
    "all"
  );

  // Calculate stats
  const filteredCosts = costs.filter(
    (cost) => filterCategory === "all" || cost.category === filterCategory
  );

  const totalCost = filteredCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const costPerKm = totalKm > 0 ? totalCost / totalKm : 0;
  const costPerHour = totalHours > 0 ? totalCost / totalHours : 0;
  const roi = revenue ? ((revenue - totalCost) / totalCost) * 100 : 0;

  // Prepare chart data
  const categoryData = Object.entries(
    costs.reduce(
      (acc, cost) => {
        acc[cost.category] = (acc[cost.category] || 0) + cost.amount;
        return acc;
      },
      {} as Record<string, number>
    )
  ).map(([category, amount]) => ({
    name: t.categories[category as CostCategory],
    value: amount,
  }));

  const COLORS = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  const getCategoryBadgeVariant = (category: CostCategory) => {
    switch (category) {
      case "maintenance":
        return "default";
      case "fuel":
        return "secondary";
      case "insurance":
        return "outline";
      case "tax":
        return "secondary";
      default:
        return "outline";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "CHF",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
      new Date(dateString)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute période</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="quarter">Ce trimestre</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onExport}>
            <DownloadIcon className="h-4 w-4 mr-2" />

            {t.export}
          </Button>
          <Button onClick={onAdd}>
            <PlusIcon className="h-4 w-4 mr-2" />

            {t.add}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.stats.total}</p>
              <p className="text-2xl font-bold">{formatCurrency(totalCost)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.stats.perKm}</p>
              <p className="text-2xl font-bold">{formatCurrency(costPerKm)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{t.stats.perHour}</p>
              <p className="text-2xl font-bold">
                {formatCurrency(costPerHour)}
              </p>
            </div>
          </CardContent>
        </Card>

        {revenue && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{t.stats.roi}</p>
                <p
                  className={`text-2xl font-bold ${roi >= 0 ? "text-green-600" : "text-red-600"}`}
                >
                  {roi.toFixed(1)}%
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart - Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t.charts.distribution}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) =>
                    `${entry.name}: ${((entry.value / totalCost) * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Cumulative */}
        <Card>
          <CardHeader>
            <CardTitle>{t.charts.cumulative}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart
                data={costs.map((cost, idx) => ({
                  date: new Date(cost.date).toLocaleDateString(locale, {
                    month: "short",
                  }),
                  cumulative: costs
                    .slice(0, idx + 1)
                    .reduce((sum, c) => sum + c.amount, 0),
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

                <XAxis dataKey="date" className="text-xs" />

                <YAxis className="text-xs" />

                <Tooltip formatter={(value: number) => formatCurrency(value)} />

                <Line
                  type="monotone"
                  dataKey="cumulative"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Costs Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t.title}</CardTitle>
            <Select
              value={filterCategory}
              onValueChange={(value: any) => setFilterCategory(value)}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder={t.table.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes catégories</SelectItem>
                <SelectItem value="maintenance">
                  {t.categories.maintenance}
                </SelectItem>
                <SelectItem value="fuel">{t.categories.fuel}</SelectItem>
                <SelectItem value="insurance">
                  {t.categories.insurance}
                </SelectItem>
                <SelectItem value="tax">{t.categories.tax}</SelectItem>
                <SelectItem value="other">{t.categories.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.date}</TableHead>
                <TableHead>{t.table.category}</TableHead>
                <TableHead>{t.table.description}</TableHead>
                <TableHead className="text-right">{t.table.amount}</TableHead>
                <TableHead className="text-right">{t.table.km}</TableHead>
                <TableHead>{t.table.invoice}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCosts.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center text-muted-foreground py-8"
                  >
                    {t.noData}
                  </TableCell>
                </TableRow>
              ) : (
                filteredCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>{formatDate(cost.date)}</TableCell>
                    <TableCell>
                      <Badge variant={getCategoryBadgeVariant(cost.category)}>
                        {t.categories[cost.category]}
                      </Badge>
                    </TableCell>
                    <TableCell>{cost.description}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(cost.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {cost.km.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {cost.invoice && (
                        <Button variant="ghost" size="sm">
                          <FileTextIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit?.(cost)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete?.(cost)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
