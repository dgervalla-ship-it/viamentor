/**
 * VIAMENTOR - Reminders Templates Tab
 * Tab templates pour module rappels facturation
 */

"use client";

import { Mail, Phone, Edit, Trash2, MoreHorizontal, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import type { ReminderTemplate } from "@/viamentor/data/viamentor-billing-reminders-data";
import { getTypeColor } from "@/viamentor/data/viamentor-billing-reminders-data";
import type { BillingRemindersTranslations } from "@/viamentor/data/viamentor-billing-reminders-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface RemindersTemplatesTabProps {
  templates: ReminderTemplate[];
  translations: BillingRemindersTranslations;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function RemindersTemplatesTab({
  templates,
  translations: t,
}: RemindersTemplatesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t.templates.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.templates.name}</TableHead>
              <TableHead>{t.templates.type}</TableHead>
              <TableHead>{t.templates.delay}</TableHead>
              <TableHead>{t.templates.channels}</TableHead>
              <TableHead>{t.templates.status}</TableHead>
              <TableHead className="text-right">{t.table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={getTypeColor(template.type)}
                  >
                    {t.type[template.type]}
                  </Badge>
                </TableCell>
                <TableCell>{template.delayDays} jours</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {template.channels.includes("email") && (
                      <Badge variant="outline" className="text-xs">
                        <Mail className="h-3 w-3 mr-1" />
                        Email
                      </Badge>
                    )}
                    {template.channels.includes("sms") && (
                      <Badge variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        SMS
                      </Badge>
                    )}
                    {template.channels.includes("phone") && (
                      <Badge variant="outline" className="text-xs">
                        <Phone className="h-3 w-3 mr-1" />
                        Tel
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={template.active ? "default" : "outline"}>
                    {template.active
                      ? t.templates.active
                      : t.templates.inactive}
                  </Badge>
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
                        <Edit className="h-4 w-4 mr-2" />

                        {t.menu.edit}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />

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
  );
}
