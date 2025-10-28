/**
 * VIAMENTOR - Invoice History
 * Historique modifications audit trail avec timeline, JSON diff, export
 */

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DownloadIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  FileTextIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  InfoIcon,
} from "lucide-react";
import { useState } from "react";
import {
  INVOICE_DETAIL_I18N,
  type InvoiceDetailLocale,
} from "@/viamentor/data/viamentor-invoice-detail-i18n";
import type { InvoiceAuditLog } from "@/viamentor/data/viamentor-invoice-detail-data";

interface InvoiceHistoryProps {
  auditLogs: InvoiceAuditLog[];
  locale?: InvoiceDetailLocale;
  onExportLogs?: () => void;
}

export function InvoiceHistory({
  auditLogs,
  locale = "fr",
  onExportLogs,
}: InvoiceHistoryProps) {
  const t = INVOICE_DETAIL_I18N[locale];
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  const toggleLog = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "created":
        return <FileTextIcon className="w-4 h-4 text-blue-500" />;

      case "status_changed":
        return <AlertCircleIcon className="w-4 h-4 text-orange-500" />;

      case "payment_recorded":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />;

      default:
        return <InfoIcon className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderChangeValue = (value: any) => {
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold">{t.auditTrail}</h5>
        <Button variant="outline" size="sm" onClick={onExportLogs}>
          <DownloadIcon className="w-4 h-4 mr-2" />

          {t.exportLogs}
        </Button>
      </div>

      <div className="space-y-4">
        {auditLogs.map((log, index) => (
          <div key={log.id}>
            <div className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center">
                  {getActionIcon(log.action)}
                </div>
                {index < auditLogs.length - 1 && (
                  <div className="w-0.5 h-full bg-border mt-2" />
                )}
              </div>

              {/* Log Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-medium">{log.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {log.userName}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Changes Details */}
                {log.changes && log.changes.length > 0 && (
                  <Collapsible
                    open={expandedLogs.has(log.id)}
                    onOpenChange={() => toggleLog(log.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-auto p-0 text-xs"
                      >
                        {expandedLogs.has(log.id) ? (
                          <>
                            <ChevronUpIcon className="w-3 h-3 mr-1" />
                            Masquer les détails
                          </>
                        ) : (
                          <>
                            <ChevronDownIcon className="w-3 h-3 mr-1" />
                            Voir les modifications ({log.changes.length})
                          </>
                        )}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <Card className="p-4 bg-muted/50">
                        <div className="space-y-3">
                          {log.changes.map((change, idx) => (
                            <div key={idx}>
                              <div className="text-xs font-semibold text-muted-foreground mb-2">
                                {change.field}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                  <div className="text-muted-foreground mb-1">
                                    Ancienne valeur
                                  </div>
                                  <div className="p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded">
                                    <pre className="whitespace-pre-wrap font-mono">
                                      {renderChangeValue(change.oldValue)}
                                    </pre>
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground mb-1">
                                    Nouvelle valeur
                                  </div>
                                  <div className="p-2 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded">
                                    <pre className="whitespace-pre-wrap font-mono">
                                      {renderChangeValue(change.newValue)}
                                    </pre>
                                  </div>
                                </div>
                              </div>
                              {idx < log.changes!.length - 1 && (
                                <Separator className="my-3" />
                              )}
                            </div>
                          ))}
                        </div>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {auditLogs.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <FileTextIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />

          <p>Aucun historique disponible</p>
        </div>
      )}
    </Card>
  );
}
