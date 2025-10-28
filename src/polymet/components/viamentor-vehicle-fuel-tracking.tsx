/**
 * VIAMENTOR - Vehicle Fuel Tracking
 * Suivi carburant avec form quick add, calcul L/100km, history table, stats, chart
 */

import { useState } from "react";
import {
  type FuelEntry,
  type FuelType,
  type PaymentMethod,
} from "@/polymet/data/viamentor-vehicle-detail-data";
import {
  getVehicleDetailI18n,
  type VehicleDetailLocale,
} from "@/polymet/data/viamentor-vehicle-detail-i18n";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FuelIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  PencilIcon,
  TrashIcon,
  FileTextIcon,
  DownloadIcon,
} from "lucide-react";

interface VehicleFuelTrackingProps {
  entries: FuelEntry[];
  currentKm: number;
  locale?: VehicleDetailLocale;
  onAdd?: (entry: Omit<FuelEntry, "id" | "consumption">) => void;
  onEdit?: (entry: FuelEntry) => void;
  onDelete?: (entry: FuelEntry) => void;
}

export function VehicleFuelTracking({
  entries,
  currentKm,
  locale = "fr",
  onAdd,
  onEdit,
  onDelete,
}: VehicleFuelTrackingProps) {
  const t = getVehicleDetailI18n(locale).fuel;
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    km: currentKm.toString(),
    liters: "",
    amount: "",
    type: "gasoline" as FuelType,
    receipt: null as File | null,
    paymentMethod: "card" as PaymentMethod,
  });

  // Calculate stats
  const avgConsumption =
    entries.length > 0
      ? entries.reduce((sum, e) => sum + (e.consumption || 0), 0) /
        entries.length
      : 0;
  const totalLiters = entries.reduce((sum, e) => sum + e.liters, 0);
  const totalCost = entries.reduce((sum, e) => sum + e.amount, 0);
  const ecoTarget = 6.5; // L/100km target

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      onAdd({
        date: formData.date,
        km: parseInt(formData.km),
        liters: parseFloat(formData.liters),
        amount: parseFloat(formData.amount),
        type: formData.type,
        receipt: formData.receipt
          ? `/receipts/${formData.receipt.name}`
          : undefined,
        paymentMethod: formData.paymentMethod,
      });
      // Reset form
      setFormData({
        date: new Date().toISOString().split("T")[0],
        km: currentKm.toString(),
        liters: "",
        amount: "",
        type: "gasoline",
        receipt: null,
        paymentMethod: "card",
      });
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

  // Prepare chart data
  const chartData = entries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(locale, {
      month: "short",
      day: "numeric",
    }),
    consumption: entry.consumption || 0,
  }));

  return (
    <div className="space-y-6">
      {/* Quick Add Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FuelIcon className="h-5 w-5" />

            {t.quickAdd.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">{t.quickAdd.date}</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="km">{t.quickAdd.km}</Label>
                <Input
                  id="km"
                  type="number"
                  value={formData.km}
                  onChange={(e) =>
                    setFormData({ ...formData, km: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="liters">{t.quickAdd.liters}</Label>
                <Input
                  id="liters"
                  type="number"
                  step="0.1"
                  value={formData.liters}
                  onChange={(e) =>
                    setFormData({ ...formData, liters: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">{t.quickAdd.amount}</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">{t.quickAdd.type}</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: FuelType) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gasoline">{t.types.gasoline}</SelectItem>
                    <SelectItem value="diesel">{t.types.diesel}</SelectItem>
                    <SelectItem value="electric">{t.types.electric}</SelectItem>
                    <SelectItem value="hybrid">{t.types.hybrid}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* New row for receipt and payment method */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receipt">{t.quickAdd.receipt}</Label>
                <Input
                  id="receipt"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      receipt: e.target.files?.[0] || null,
                    })
                  }
                  className="cursor-pointer"
                />

                {formData.receipt && (
                  <p className="text-xs text-muted-foreground">
                    {formData.receipt.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">
                  {t.quickAdd.paymentMethod}
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value: PaymentMethod) =>
                    setFormData({ ...formData, paymentMethod: value })
                  }
                >
                  <SelectTrigger id="paymentMethod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">
                      {t.paymentMethods.cash}
                    </SelectItem>
                    <SelectItem value="card">
                      {t.paymentMethods.card}
                    </SelectItem>
                    <SelectItem value="fuel_card">
                      {t.paymentMethods.fuel_card}
                    </SelectItem>
                    <SelectItem value="invoice">
                      {t.paymentMethods.invoice}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              {t.quickAdd.save}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.avgConsumption}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">
                  {avgConsumption.toFixed(1)}
                </p>
                <span className="text-sm text-muted-foreground">L/100km</span>
              </div>
              {avgConsumption <= ecoTarget ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <TrendingDownIcon className="h-3 w-3" />

                  {t.stats.target}
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-orange-600">
                  <TrendingUpIcon className="h-3 w-3" />
                  Au-dessus cible
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.totalLiters}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{totalLiters.toFixed(0)}</p>
                <span className="text-sm text-muted-foreground">L</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {t.stats.totalCost}
              </p>
              <p className="text-2xl font-bold">{formatCurrency(totalCost)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Prix moyen/L</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalLiters > 0 ? totalCost / totalLiters : 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t.chart.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />

              <XAxis dataKey="date" className="text-xs" />

              <YAxis
                className="text-xs"
                label={{ value: "L/100km", angle: -90, position: "insideLeft" }}
              />

              <Tooltip
                formatter={(value: number) => `${value.toFixed(1)} L/100km`}
              />

              <Line
                type="monotone"
                dataKey="consumption"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                data={chartData.map((d) => ({ ...d, target: ecoTarget }))}
                dataKey="target"
                stroke="hsl(var(--chart-2))"
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des pleins</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.date}</TableHead>
                <TableHead className="text-right">{t.table.km}</TableHead>
                <TableHead className="text-right">{t.table.liters}</TableHead>
                <TableHead className="text-right">{t.table.amount}</TableHead>
                <TableHead className="text-right">
                  {t.table.consumption}
                </TableHead>
                <TableHead className="text-center">{t.table.receipt}</TableHead>
                <TableHead className="text-center">
                  {t.table.paymentMethod}
                </TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center text-muted-foreground py-8"
                  >
                    {t.noData}
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{formatDate(entry.date)}</TableCell>
                    <TableCell className="text-right">
                      {entry.km.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.liters.toFixed(1)} L
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(entry.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.consumption ? (
                        <span
                          className={
                            entry.consumption <= ecoTarget
                              ? "text-green-600 font-medium"
                              : "text-orange-600 font-medium"
                          }
                        >
                          {entry.consumption.toFixed(1)}
                        </span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {entry.receipt ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(entry.receipt, "_blank")}
                        >
                          <FileTextIcon className="h-4 w-4 mr-1" />

                          <DownloadIcon className="h-3 w-3" />
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {entry.paymentMethod ? (
                        <span className="text-sm">
                          {t.paymentMethods[entry.paymentMethod]}
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit?.(entry)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete?.(entry)}
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
