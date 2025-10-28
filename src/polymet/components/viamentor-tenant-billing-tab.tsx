/**
 * VIAMENTOR Tenant Billing Tab
 *
 * Tab Billing avec subscription, invoices et usage
 *
 * @module components/viamentor-tenant-billing-tab
 * @version 1.0.0
 */

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CreditCardIcon,
  DownloadIcon,
  MailIcon,
  EditIcon,
  CheckIcon,
  ClockIcon,
  DatabaseIcon,
  UsersIcon,
  ActivityIcon,
  ArrowUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { TenantInvoice } from "@/polymet/data/viamentor-tenant-detail-data";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface BillingTabProps {
  currentPlan: "Starter" | "Pro" | "Enterprise";
  price: number;
  billingCycle: "Monthly" | "Yearly";
  nextBillingDate: string;
  paymentMethod: {
    last4: string;
    expiry: string;
    brand: string;
  };
  invoices: TenantInvoice[];
  usage: {
    storage: { used: number; quota: number };
    students: { current: number; limit: number };
    apiCalls: number;
    bandwidth: number;
  };
  onChangePlan?: (newPlan: string) => Promise<void>;
  onUpdatePayment?: () => void;
}

export function TenantBillingTab({
  currentPlan,
  price,
  billingCycle,
  nextBillingDate,
  paymentMethod,
  invoices,
  usage,
  onChangePlan,
  onUpdatePayment,
}: BillingTabProps) {
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(currentPlan);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<
    "number" | "date" | "amount" | "status"
  >("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const itemsPerPage = 10;

  const plans = [
    {
      name: "Starter",
      price: 99,
      features: ["Up to 50 students", "2 instructors", "Basic support"],
    },
    {
      name: "Pro",
      price: 199,
      features: ["Up to 200 students", "10 instructors", "Priority support"],
    },
    {
      name: "Enterprise",
      price: null,
      features: ["Unlimited students", "Unlimited instructors", "24/7 support"],
    },
  ];

  const handleChangePlan = async () => {
    await onChangePlan?.(selectedPlan);
    setShowPlanDialog(false);
  };

  const storagePercentage = (usage.storage.used / usage.storage.quota) * 100;
  const studentsPercentage =
    (usage.students.current / usage.students.limit) * 100;

  const sortedInvoices = useMemo(() => {
    let sorted = [...invoices];

    sorted.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortColumn) {
        case "number":
          aValue = a.number.toLowerCase();
          bValue = b.number.toLowerCase();
          break;
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "amount":
          aValue = a.amount;
          bValue = b.amount;
          break;
        case "status":
          aValue = a.status.toLowerCase();
          bValue = b.status.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [invoices, sortColumn, sortDirection]);

  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);
  const paginatedInvoices = sortedInvoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: typeof sortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Subscription Section */}
        <Card>
          <CardHeader>
            <CardTitle>Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-lg px-4 py-1">
                    {currentPlan}
                  </Badge>
                  <div>
                    <p className="text-2xl font-bold">
                      CHF {price.toLocaleString("fr-CH")}/mois
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Billing cycle: {billingCycle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />

                  <span className="text-muted-foreground">
                    Next billing date:
                  </span>
                  <span className="font-medium">
                    {format(new Date(nextBillingDate), "dd MMMM yyyy", {
                      locale: fr,
                    })}
                  </span>
                  <span className="text-muted-foreground">
                    (
                    {formatDistanceToNow(new Date(nextBillingDate), {
                      locale: fr,
                    })}
                    )
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <CreditCardIcon className="h-5 w-5 text-muted-foreground" />

                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {paymentMethod.brand} •••• {paymentMethod.last4}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires {paymentMethod.expiry}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={onUpdatePayment}>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Update
                  </Button>
                </div>
              </div>

              <Button onClick={() => setShowPlanDialog(true)}>
                Change plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Usage Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-4 w-4 text-muted-foreground" />

                  <span className="font-medium">Storage</span>
                </div>
                <span className="text-muted-foreground">
                  {usage.storage.used} GB / {usage.storage.quota} GB
                </span>
              </div>
              <Progress value={storagePercentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-muted-foreground" />

                  <span className="font-medium">Students</span>
                </div>
                <span className="text-muted-foreground">
                  {usage.students.current} / {usage.students.limit}
                </span>
              </div>
              <Progress value={studentsPercentage} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ActivityIcon className="h-4 w-4 text-muted-foreground" />

                  <p className="text-sm font-medium">API Calls</p>
                </div>
                <p className="text-2xl font-bold">
                  {usage.apiCalls.toLocaleString("fr-CH")}
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <DatabaseIcon className="h-4 w-4 text-muted-foreground" />

                  <p className="text-sm font-medium">Bandwidth</p>
                </div>
                <p className="text-2xl font-bold">
                  {(usage.bandwidth / 1024).toFixed(1)} GB
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card>
          <CardHeader>
            <CardTitle>Invoices ({invoices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 font-medium"
                        onClick={() => handleSort("number")}
                      >
                        Invoice #
                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 font-medium"
                        onClick={() => handleSort("date")}
                      >
                        Date
                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 font-medium"
                        onClick={() => handleSort("amount")}
                      >
                        Amount
                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 font-medium"
                        onClick={() => handleSort("status")}
                      >
                        Status
                        <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.number}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.date), "dd MMM yyyy", {
                          locale: fr,
                        })}
                      </TableCell>
                      <TableCell>
                        CHF {invoice.amount.toLocaleString("fr-CH")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "Paid"
                              ? "default"
                              : invoice.status === "Pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {invoice.status === "Paid" && (
                            <CheckIcon className="h-3 w-3 mr-1" />
                          )}
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            PDF
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MailIcon className="h-4 w-4 mr-2" />
                            Resend
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="md:hidden space-y-4">
              {paginatedInvoices.map((invoice) => (
                <Card key={invoice.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-base">
                          {invoice.number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(invoice.date), "dd MMM yyyy", {
                            locale: fr,
                          })}
                        </p>
                      </div>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Pending"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {invoice.status === "Paid" && (
                          <CheckIcon className="h-3 w-3 mr-1" />
                        )}
                        {invoice.status}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Amount:
                      </span>
                      <span className="text-lg font-bold">
                        CHF {invoice.amount.toLocaleString("fr-CH")}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <DownloadIcon className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MailIcon className="h-4 w-4 mr-2" />
                        Resend
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, sortedInvoices.length)}{" "}
                  of {sortedInvoices.length} invoices
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeftIcon className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <div className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(totalPages, p + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Change Plan Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>
              Select a new plan. Changes will be prorated based on your current
              billing cycle.
            </DialogDescription>
          </DialogHeader>

          <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
            <div className="grid grid-cols-3 gap-4 py-4">
              {plans.map((plan) => (
                <div key={plan.name} className="relative">
                  <RadioGroupItem
                    value={plan.name}
                    id={plan.name}
                    className="peer sr-only"
                  />

                  <Label
                    htmlFor={plan.name}
                    className="flex flex-col p-4 border-2 rounded-lg cursor-pointer hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5"
                  >
                    <span className="text-lg font-semibold">{plan.name}</span>
                    <span className="text-2xl font-bold mt-2">
                      {plan.price ? `CHF ${plan.price}` : "Custom"}
                    </span>
                    {plan.price && (
                      <span className="text-sm text-muted-foreground">
                        /mois
                      </span>
                    )}
                    <ul className="mt-4 space-y-2 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckIcon className="h-4 w-4 text-green-600" />

                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          {selectedPlan !== currentPlan && (
            <div className="p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">Prorated calculation:</p>
              <p className="text-muted-foreground">
                You will be charged the difference for the remaining days of
                your current billing cycle.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleChangePlan}
              disabled={selectedPlan === currentPlan}
            >
              Confirm change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
