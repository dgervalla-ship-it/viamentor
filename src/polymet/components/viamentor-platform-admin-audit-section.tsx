/**
 * VIAMENTOR - Platform Admin Audit Section
 * Section audit logs avec historique actions administrateur
 */

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2Icon, XCircleIcon } from "lucide-react";
import {
  mockAuditLogs,
  type PlatformAdminLocale,
} from "@/polymet/data/viamentor-platform-admin-data";
import { getPlatformAdminTranslations } from "@/polymet/data/viamentor-platform-admin-i18n";

// ============================================================================
// TYPES
// ============================================================================

interface PlatformAdminAuditSectionProps {
  locale?: PlatformAdminLocale;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function ViaMenutorPlatformAdminAuditSection({
  locale = "fr",
}: PlatformAdminAuditSectionProps) {
  const t = getPlatformAdminTranslations(locale);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t.audit.title}</CardTitle>
          <CardDescription>
            Historique des actions administrateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.audit.timestamp}</TableHead>
                <TableHead>{t.audit.actor}</TableHead>
                <TableHead>{t.audit.action}</TableHead>
                <TableHead>{t.audit.tenant}</TableHead>
                <TableHead>{t.audit.result}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-xs">
                    {new Date(log.timestamp).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {log.actor.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {log.actor.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {t.audit.actions[
                        log.action as keyof typeof t.audit.actions
                      ] || log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {log.tenantName && (
                      <p className="text-sm text-foreground">
                        {log.tenantName}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    {log.result === "success" ? (
                      <Badge className="text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-950">
                        <CheckCircle2Icon className="h-3 w-3 mr-1" />

                        {t.audit.success}
                      </Badge>
                    ) : (
                      <Badge className="text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-950">
                        <XCircleIcon className="h-3 w-3 mr-1" />

                        {t.audit.failure}
                      </Badge>
                    )}
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

export default ViaMenutorPlatformAdminAuditSection;
