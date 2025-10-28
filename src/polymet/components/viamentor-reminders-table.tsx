/**
 * VIAMENTOR - Reminders Table
 * Table rappels actifs avec filtres et actions
 */

"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  FileText,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Reminder } from "@/polymet/data/viamentor-billing-reminders-data";
import {
  getStatusColor,
  getTypeColor,
  formatDate,
} from "@/polymet/data/viamentor-billing-reminders-data";
import type { BillingRemindersTranslations } from "@/polymet/data/viamentor-billing-reminders-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RemindersTableProps {
  reminders: Reminder[];
  translations: BillingRemindersTranslations;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RemindersTable({
  reminders,
  translations: t,
}: RemindersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filtered reminders
  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reminder.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || reminder.status === statusFilter;
    const matchesType = typeFilter === "all" || reminder.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  placeholder={t.filters.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filters.status} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="pending">{t.status.pending}</SelectItem>
                <SelectItem value="sent">{t.status.sent}</SelectItem>
                <SelectItem value="failed">{t.status.failed}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder={t.filters.type} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.filters.all}</SelectItem>
                <SelectItem value="first">{t.type.first}</SelectItem>
                <SelectItem value="second">{t.type.second}</SelectItem>
                <SelectItem value="final">{t.type.final}</SelectItem>
                <SelectItem value="legal">{t.type.legal}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.table.invoice}</TableHead>
                <TableHead>{t.table.student}</TableHead>
                <TableHead>{t.table.amount}</TableHead>
                <TableHead>{t.table.overdue}</TableHead>
                <TableHead>{t.table.type}</TableHead>
                <TableHead>{t.table.status}</TableHead>
                <TableHead>{t.table.nextReminder}</TableHead>
                <TableHead className="text-right">{t.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReminders.map((reminder) => (
                <TableRow key={reminder.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />

                      <span className="font-medium">
                        {reminder.invoiceNumber}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reminder.student.avatar} />

                        <AvatarFallback>
                          {reminder.student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {reminder.student.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {reminder.student.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">CHF {reminder.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-red-500/10 text-red-500 border-red-500/20"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {reminder.overdueBy} jours
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getTypeColor(reminder.type)}
                    >
                      {t.type[reminder.type]}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className={getStatusColor(reminder.status)}
                      >
                        {t.status[reminder.status]}
                      </Badge>
                      {reminder.sentDate && (
                        <div className="text-xs text-muted-foreground">
                          {formatDate(reminder.sentDate)}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {reminder.nextReminderDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />

                        {formatDate(reminder.nextReminderDate)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Send className="h-4 w-4 mr-2" />

                          {t.menu.send}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />

                          {t.menu.viewInvoice}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />

                          {t.menu.edit}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem className="text-destructive">
                          <XCircle className="h-4 w-4 mr-2" />

                          {t.menu.cancel}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />

                          {t.menu.delete}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
